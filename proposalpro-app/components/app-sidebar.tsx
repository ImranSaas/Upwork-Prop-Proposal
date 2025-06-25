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
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function AppSidebar({ currentScreen, onNavigate }: AppSidebarProps) {
  const navItems = [
    { id: "dashboard" as Screen, icon: Home, label: "Dashboard", badge: null },
    { id: "job-alerts" as Screen, icon: Bell, label: "Job Alerts", badge: 3 },
    { id: "job-feed" as Screen, icon: Briefcase, label: "Job Feed", badge: null },
    { id: "proposals" as Screen, icon: FileText, label: "Proposals", badge: 2 },
    { id: "messaging" as Screen, icon: MessageSquare, label: "Messages", badge: 1 },
    { id: "settings" as Screen, icon: Settings, label: "Settings", badge: null },
  ]

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold text-primary">
              <span className="font-extrabold text-xl text-white">UG</span>
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
                  onClick={() => onNavigate(item.id)}
                  tooltip={item.label}
                  className={`
                    relative h-12 px-4 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-primary-foreground" : ""}`} />
                  <span className="group-data-[collapsible=icon]:hidden font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge
                      className={`
                        ml-auto h-6 w-6 p-0 flex items-center justify-center text-xs font-semibold
                        group-data-[collapsible=icon]:hidden
                        ${
                          isActive
                            ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                            : "bg-primary text-primary-foreground"
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
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Pro Plan</span>
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
