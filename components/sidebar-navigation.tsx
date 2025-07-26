"use client"

import { Home, Briefcase, FileText, MessageSquare, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Screen } from "@/app/page"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface SidebarNavigationProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function SidebarNavigation({ currentScreen, onNavigate }: SidebarNavigationProps) {
  const navItems = [
    { id: "dashboard" as Screen, icon: Home, label: "Home", badge: null },
    { id: "job-alerts" as Screen, icon: Briefcase, label: "Jobs", badge: 3 },
    { id: "proposals" as Screen, icon: FileText, label: "Proposals", badge: null },
    { id: "messaging" as Screen, icon: MessageSquare, label: "Messages", badge: 1 },
    { id: "settings" as Screen, icon: Settings, label: "Settings", badge: null },
  ]

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <svg viewBox="0 0 64 64" width="24" height="24" aria-label="UpGenie Logo" className="inline-block align-middle">
              <path d="M8 16v16c0 13 20 13 20 0V16" fill="none" stroke="url(#ug-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 32c0 13 20 13 20 0 0-8-8-8-8 0 0 8-8 8-8 0V16" fill="none" stroke="url(#ug-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="ug-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22c55e" />
                  <stop offset="1" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentScreen === item.id

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.label}
                    className={`relative ${
                      isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

export function MobileSidebarTrigger() {
  return (
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}
