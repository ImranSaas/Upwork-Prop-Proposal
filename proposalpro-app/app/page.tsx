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
import { OnboardingWizard } from "@/components/screens/onboarding-wizard"
import { BillingScreen } from "@/components/screens/billing-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { UpworkConnectModal } from "@/components/screens/upwork-connect-modal"
import { ApiErrorScreen } from "@/components/screens/api-error-screen"
import { LandingPage } from "@/components/screens/landing-page"
import { NotificationsScreen } from "@/components/screens/notifications-screen"
import { JobFeedScreen } from "@/components/screens/job-feed-screen"
import { ProposalDetailsScreen } from "@/components/screens/proposal-details-screen"
import AccountVerificationScreen from "@/components/screens/account-verification-screen"
import { JobPreferencesOnboarding } from "@/components/screens/job-preferences-onboarding";
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
  const [showUpworkModal, setShowUpworkModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [showJobPrefsOnboarding, setShowJobPrefsOnboarding] = useState(false)
  const [showExtensionModal, setShowExtensionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [canGoBack, setCanGoBack] = useState(false)

  // Direct login without onboarding steps
  const handleLogin = async () => {
    setCurrentScreen("dashboard");
    setNavigationHistory(["dashboard"]);
  };

  useEffect(() => {
    let currentSession: any = null;
    let isMounted = true;

    const handleAuthStateChange = async (event: string, session: any) => {
      if (!isMounted) return;
      
      const isNewSession = (!currentSession && session) || 
                         (currentSession && !session) || 
                         (currentSession?.user?.id !== session?.user?.id);
      
      currentSession = session;
      
      if (isNewSession || event === 'INITIAL_SESSION') {
        if (session) {
          // User is signed in, go directly to dashboard
          if (isMounted) {
            setCurrentScreen("dashboard");
            setNavigationHistory(["dashboard"]);
          }
        } else {
          // User is signed out, go to landing page
          if (isMounted) {
            setCurrentScreen("landing");
            setNavigationHistory(["landing"]);
            setSelectedJob(null);
            setSelectedProposal(null);
          }
        }
      }
      
      if (isMounted) {
        setIsLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Initial auth check
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await handleAuthStateChange('INITIAL_SESSION', session);
      } catch (error) {
        console.error('Error checking auth status:', error);
        if (isMounted) {
          setCurrentScreen("landing");
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [])

  // Navigation handlers
  const handleNavigate = (screen: Screen) => {
    setNavigationHistory(prev => [...prev, currentScreen!]);
    setCurrentScreen(screen);
    setCanGoBack(navigationHistory.length > 0);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
      setCanGoBack(navigationHistory.length > 1);
    }
  };

  // Simple handlers for auth flows
  const handleSignupSuccess = () => {
    setCurrentScreen("dashboard");
    setNavigationHistory(["dashboard"]);
  };

  const handleSignupShowJobPreferences = () => {
    // Skip job preferences, go directly to dashboard
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
      setShowUpworkModal(false);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handleShowUpworkModal = () => {
    setShowUpworkModal(true)
  }

  const handleCloseUpworkModal = () => {
    setShowUpworkModal(false)
  }

  const handleChromeExtensionComplete = () => {
    setCurrentScreen("job-preferences-onboarding");
  };

  const handleVerificationComplete = () => {
    // Go directly to dashboard after verification
    setCurrentScreen("dashboard");
    setNavigationHistory(["dashboard"]);
  };

  const checkOnboardingStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('job_preferences_set')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data || { job_preferences_set: false };
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return { job_preferences_set: false };
    }
  };

  const handleJobPrefsComplete = async (prefs?: any) => {
    try {
      // If there are preferences to save, you can handle them here
      if (prefs) {
        // Add logic to save preferences if needed
      }
      setShowJobPrefsOnboarding(false);
      setCurrentScreen("dashboard");
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving job preferences:', error);
      return Promise.reject(error);
    }
  };

  const handleUpworkConnect = async () => {
    setShowUpworkModal(false);
    
    // After connecting Upwork, check if we need to show job prefs
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const onboardingStatus = await checkOnboardingStatus(user.id);
      if (!onboardingStatus.job_preferences_set) {
        setShowJobPrefsOnboarding(true);
        setCurrentScreen("job-preferences-onboarding");
      } else {
        setCurrentScreen("dashboard");
      }
    }
  }

  // Screens accessible from the sidebar
  const sidebarScreens: Screen[] = [
    "dashboard",
    "job-alerts",
    "job-feed",
    "pipeline",
    "settings"
  ];

  // Show landing page, login screen, or verification screen without sidebar
  if (currentScreen && ["landing", "login", "verification"].includes(currentScreen)) {
    return (
      <div className="min-h-screen bg-background">
        {currentScreen === "landing" && <LandingPage onNavigate={handleNavigate} />}
        {currentScreen === "login" && (
          <LoginScreen 
            onNavigate={handleNavigate} 
            onLogin={() => setCurrentScreen("dashboard")}
            onSignupWithUpworkConnect={handleShowUpworkModal}
            onSignupSuccess={handleSignupSuccess}
            onSignupShowJobPreferences={handleSignupShowJobPreferences}
          />
        )}
        {currentScreen === "verification" && (
          <AccountVerificationScreen 
            onVerificationComplete={handleVerificationComplete}
            onGoBack={canGoBack ? handleGoBack : undefined}
          />
        )}
        {showUpworkModal && <UpworkConnectModal onNavigate={handleNavigate} onConnectAndLogin={handleChromeExtensionComplete} />}
      </div>
    )
  }

  // Show onboarding wizard if needed
  if (currentScreen === "job-preferences-onboarding") {
    return <JobPreferencesOnboarding onComplete={handleJobPrefsComplete} />;
  }

  // Show loading state while checking auth or if currentScreen is not set yet
  if (isLoading || currentScreen === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }


  const renderScreen = () => {
    // Type guard to ensure currentScreen is not null
    if (!currentScreen) {
      return <DashboardScreen onNavigate={handleNavigate} setSelectedJob={() => {}} />;
    }
    
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen onNavigate={handleNavigate} setSelectedJob={setSelectedJob} />
      case "proposals":
        return <ProposalDashboard onNavigate={handleNavigate} />
      case "proposal-editor":
        return <ProposalEditor onNavigate={handleNavigate} onGoBack={!sidebarScreens.includes(currentScreen) && canGoBack ? handleGoBack : undefined} />
      case "proposal-success":
        return <ProposalSuccessModal onNavigate={handleNavigate} onClose={() => {}} />
      case "job-alerts":
        return <JobAlertsDashboard onNavigate={handleNavigate} setSelectedJob={setSelectedJob} />
      case "job-details":
        return <JobDetailsScreen job={selectedJob} onNavigate={handleNavigate} onGoBack={!sidebarScreens.includes(currentScreen) && canGoBack ? handleGoBack : undefined} />
      case "job-alert-settings":
        return <JobAlertSettingsModal onClose={() => {}} onSave={async () => { return Promise.resolve(); }} />
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
        return <OnboardingWizard onComplete={() => {}} />
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
};