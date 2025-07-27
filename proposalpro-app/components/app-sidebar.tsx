"use client"

import { Home, Briefcase, FileText, MessageSquare, Settings, Zap, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Screen } from "@/app/page"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function AppSidebar({ currentScreen, onNavigate }: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const navItems = [
    { id: "dashboard" as Screen, icon: Home, label: "Dashboard", badge: null },
    { id: "job-alerts" as Screen, icon: Bell, label: "Job Alerts", badge: 3 },
    { id: "job-feed" as Screen, icon: Briefcase, label: "Job Feed", badge: null },
    { id: "crm-pipeline" as Screen, icon: Zap, label: "CRM Pipeline", badge: null },
    { id: "settings" as Screen, icon: Settings, label: "Settings", badge: null },
  ]

  const handleNavigate = (id: Screen) => {
    onNavigate(id);
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r bg-white dark:bg-background shadow-sm rounded-xl m-2 overflow-hidden">
      <SidebarHeader className="p-6 border-b bg-white dark:bg-background rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold text-primary">
              <span className="font-extrabold text-xl text-primary">UG</span>
            </h2>
            <p className="text-xs text-muted-foreground">AI-Powered Proposals</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarMenu className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentScreen === item.id

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => handleNavigate(item.id)}
                  tooltip={item.label}
                  className={`
                    relative h-12 px-4 rounded-lg transition-colors group font-medium text-base flex items-center gap-3
                    ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/20"
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                  <span className="group-data-[collapsible=icon]:hidden font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge
                      className={`
                        ml-auto h-6 w-6 p-0 flex items-center justify-center text-xs font-semibold
                        group-data-[collapsible=icon]:hidden
                        ${
                          isActive
                            ? "bg-primary/20 text-primary border-none"
                            : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-4">
        <div className="group-data-[collapsible=icon]:hidden">
          <div className="bg-muted rounded-lg p-3 border border-muted-foreground/10 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-semibold text-primary">Pro Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Unlimited AI proposals</p>
            <div className="text-xs text-muted-foreground">$19.99/month</div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
