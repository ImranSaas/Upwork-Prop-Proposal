"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"
import { HelpScreen } from "@/components/screens/help-screen"
import { ErrorScreen } from "@/components/screens/error-screen"
import { ProposalDashboard } from "@/components/screens/proposal-dashboard"
import { ProposalEditor } from "@/components/screens/proposal-editor"
import { ProposalSuccessModal } from "@/components/screens/proposal-success-modal"
import { JobAlertsDashboard } from "@/components/screens/job-alerts-dashboard"
import { JobDetailsScreen } from "@/components/screens/job-details-screen"
import { JobAlertSettingsModal } from "@/components/screens/job-alert-settings-modal"
import { PipelineDashboard } from "@/components/screens/pipeline-dashboard"
import { ClientMessaging } from "@/components/screens/client-messaging"
import { PipelineReminderModal } from "@/components/screens/pipeline-reminder-modal"
import { BillingScreen } from "@/components/screens/billing-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { ApiErrorScreen } from "@/components/screens/api-error-screen"
import { LandingPage } from "@/components/screens/landing-page"
import { NotificationsScreen } from "@/components/screens/notifications-screen"
import { JobFeedScreen } from "@/components/screens/job-feed-screen"
import { ProposalDetailsScreen } from "@/components/screens/proposal-details-screen"
import { supabase } from "@/lib/supabaseClient";

export type Screen =
  | "landing"
  | "login"
  | "verification"
  | "onboarding"
  | "dashboard"
  | "job-feed"
  | "proposals"
  | "proposal-editor"
  | "proposal-success"
  | "job-alerts"
  | "job-details"
  | "job-alert-settings"
  | "pipeline"
  | "messaging"
  | "pipeline-reminder"
  | "billing"
  | "settings"
  | "help"
  | "error"
  | "api-error"
  | "upwork-connect"
  | "notifications"
  | "proposal-details"
  | "job-preferences-onboarding";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen | null>(null)
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // Only update screen if we're not already on a valid screen
          setCurrentScreen(current => {
            // If current screen is null or one of the auth screens, go to dashboard
            if (!current || ["landing", "login"].includes(current)) {
              return "dashboard";
            }
            // Otherwise, keep the current screen
            return current;
          });
          
          // Only reset navigation history if we're coming from an auth screen
          setNavigationHistory(prev => {
            if (prev.length === 0 || ["landing", "login"].includes(prev[prev.length - 1])) {
              return ["dashboard"];
            }
            return prev;
          });
        } else {
          // User is signed out - reset to landing
          setCurrentScreen("landing");
          setNavigationHistory(["landing"]);
          setSelectedJob(null);
          setSelectedProposal(null);
        }
        setIsLoading(false);
      }
    );

    // Initial check
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // On initial load, only set to dashboard if we don't have a current screen
          setCurrentScreen(current => current || "dashboard");
          setNavigationHistory(prev => prev.length > 0 ? prev : ["dashboard"]);
        } else {
          setCurrentScreen("landing");
          setNavigationHistory(["landing"]);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setCurrentScreen("error");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Navigation handlers
  const handleNavigate = (screen: Screen | 'crm-pipeline') => {
    const mappedScreen: Screen = screen === 'crm-pipeline' ? 'pipeline' : screen as Screen;
    setNavigationHistory((prev) => [...prev, currentScreen as Screen]);
    setCurrentScreen(mappedScreen);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  const canGoBack = navigationHistory.length > 0;

  const handleLogin = () => {
    setCurrentScreen("dashboard");
    setNavigationHistory(["dashboard"]);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
        return;
      }
      setCurrentScreen("landing");
      setNavigationHistory([]);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  // Screens accessible from the sidebar
  const sidebarScreens: Screen[] = [
    "dashboard",
    "job-alerts",
    "job-feed",
    "pipeline",
    "settings"
  ];

  // Show landing page or login screen without sidebar
  if (["landing", "login"].includes(currentScreen || "")) {
    return (
      <div className="min-h-screen bg-background">
        {currentScreen === "landing" && <LandingPage onNavigate={handleNavigate} />}
        {currentScreen === "login" && (
          <LoginScreen 
            onNavigate={handleNavigate} 
            onLogin={handleLogin}
          />
        )}
      </div>
    )
  }

  // Show loading state while checking auth or if currentScreen is not set yet
  if (isLoading || currentScreen === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // No-op handlers for required props
  const noop = () => {};

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen onNavigate={handleNavigate} setSelectedJob={setSelectedJob} />
      case "proposals":
        return <ProposalDashboard onNavigate={handleNavigate} />
      case "proposal-editor":
        return <ProposalEditor onNavigate={handleNavigate} onGoBack={!sidebarScreens.includes(currentScreen) && canGoBack ? handleGoBack : undefined} />
      case "proposal-success":
        return <ProposalSuccessModal onNavigate={handleNavigate} onClose={noop} />
      case "job-alerts":
        return <JobAlertsDashboard onNavigate={handleNavigate} setSelectedJob={setSelectedJob} />
      case "job-details":
        return <JobDetailsScreen job={selectedJob} onNavigate={handleNavigate} onGoBack={!sidebarScreens.includes(currentScreen) && canGoBack ? handleGoBack : undefined} />
      case "job-alert-settings":
        return <JobAlertSettingsModal onClose={noop} onSave={noop} />
      case "pipeline":
        return <PipelineDashboard onNavigate={handleNavigate} setSelectedProposal={setSelectedProposal} />
      case "messaging":
        return <ClientMessaging onNavigate={handleNavigate} onGoBack={!sidebarScreens.includes(currentScreen) && canGoBack ? handleGoBack : undefined} />
      case "pipeline-reminder":
        return <PipelineReminderModal onClose={noop} onNavigate={handleNavigate} />
      case "billing":
        return <BillingScreen onGoBack={!sidebarScreens.includes(currentScreen) && canGoBack ? handleGoBack : undefined} />
      case "settings":
        return <SettingsScreen onLogout={handleLogout} />
      case "help":
        return <HelpScreen />
      case "error":
        return <ErrorScreen onNavigate={handleNavigate} />
      case "api-error":
        return <ApiErrorScreen onNavigate={handleNavigate} />
      
      case "notifications":
        return <NotificationsScreen onNavigate={handleNavigate} onGoBack={!sidebarScreens.includes(currentScreen) && canGoBack ? handleGoBack : undefined} />
      case "job-feed":
        return <JobFeedScreen onNavigate={handleNavigate} setSelectedJob={setSelectedJob} />
      case "proposal-details":
        return selectedProposal ? (
          <ProposalDetailsScreen proposal={selectedProposal} onGoBack={canGoBack ? handleGoBack : undefined} />
        ) : null
      default:
        return <DashboardScreen onNavigate={handleNavigate} setSelectedJob={() => {}} />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentScreen={currentScreen} onNavigate={handleNavigate} />
        <SidebarInset className="flex-1">
          <TopBar 
            onNavigate={handleNavigate}
          />
          <main className="flex-1 overflow-auto relative">
            <div className="container mx-auto">{renderScreen()}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}