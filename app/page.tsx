"use client"

import { useState } from "react"
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
import { OnboardingWizard } from "@/components/screens/onboarding-wizard"
import { BillingScreen } from "@/components/screens/billing-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { UpworkConnectModal } from "@/components/screens/upwork-connect-modal"
import { ApiErrorScreen } from "@/components/screens/api-error-screen"
import { LandingPage } from "@/components/screens/landing-page"
import { NotificationsScreen } from "@/components/screens/notifications-screen"
import { JobFeedScreen } from "@/components/screens/job-feed-screen"
import { ProposalDetailsScreen } from "@/components/screens/proposal-details-screen"
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export type Screen =
  | "landing"
  | "login"
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

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([])
  const [showUpworkModal, setShowUpworkModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true);

  // Session check on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setIsAuthenticated(true);
        setCurrentScreen("dashboard");
      } else {
        setIsAuthenticated(false);
        setCurrentScreen("landing");
      }
      setCheckingSession(false);
    };
    checkSession();
  }, []);

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-emerald-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md animate-bounce-in shadow-lg">
          <div className="bg-white/90 dark:bg-background/90 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center mb-2 animate-pulse">
              <span className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">UG</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-lg font-semibold text-primary">Loading your workspace...</span>
              <span className="text-sm text-muted-foreground">Please wait while we check your session</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleNavigate = (screen: Screen | 'crm-pipeline') => {
    // Map 'crm-pipeline' to 'pipeline' for sidebar navigation
    const mappedScreen: Screen = screen === 'crm-pipeline' ? 'pipeline' : screen
    setNavigationHistory((prev) => [...prev, currentScreen])
    setCurrentScreen(mappedScreen)
  }

  const handleGoBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1]
      setNavigationHistory((prev) => prev.slice(0, -1))
      setCurrentScreen(previousScreen)
    }
  }

  const canGoBack = navigationHistory.length > 0

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
    setNavigationHistory([])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false)
    setCurrentScreen("landing")
    setNavigationHistory([])
  }

  const handleShowUpworkModal = () => {
    setShowUpworkModal(true)
  }

  const handleCloseUpworkModal = () => {
    setShowUpworkModal(false)
  }

  const handleUpworkConnect = () => {
    setShowUpworkModal(false)
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
    setNavigationHistory([])
  }

  // Screens accessible from the sidebar
  const sidebarScreens: Screen[] = [
    "dashboard",
    "job-alerts",
    "job-feed",
    "pipeline",
    "settings"
  ];

  // Show landing page or login screen without sidebar
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {currentScreen === "landing" && <LandingPage onNavigate={handleNavigate} />}
        {currentScreen === "login" && (
          <LoginScreen onNavigate={handleNavigate} onLogin={handleLogin} onSignupWithUpworkConnect={handleShowUpworkModal} />
        )}
        {showUpworkModal && <UpworkConnectModal onNavigate={handleNavigate} onConnectAndLogin={handleUpworkConnect} />}
      </div>
    )
  }

  // No-op handlers for required props
  const noop = () => {}

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
      case "onboarding":
        return <OnboardingWizard onComplete={noop} />
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
      {showUpworkModal && <UpworkConnectModal onNavigate={handleNavigate} onConnectAndLogin={handleUpworkConnect} />}
    </SidebarProvider>
  )
}
