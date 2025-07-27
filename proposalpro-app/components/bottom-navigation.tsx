"use client"

import { Home, Briefcase, FileText, MessageSquare, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Screen } from "@/app/page"

interface BottomNavigationProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "dashboard" as Screen, icon: Home, label: "Home", badge: null },
    { id: "job-alerts" as Screen, icon: Briefcase, label: "Jobs", badge: 3 },
    { id: "proposals" as Screen, icon: FileText, label: "Proposals", badge: null },
    { id: "messaging" as Screen, icon: MessageSquare, label: "Messages", badge: 1 },
    { id: "settings" as Screen, icon: Settings, label: "Settings", badge: null },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border bottom-nav-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 h-auto py-3 px-4 relative tap-target transition-colors ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground border-0">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
