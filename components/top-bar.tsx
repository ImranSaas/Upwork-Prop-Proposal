"use client"

import { Moon, Sun, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { Screen } from "@/app/page"

interface TopBarProps {
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function TopBar({ onNavigate, onGoBack }: TopBarProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 flex h-20 shrink-0 items-center gap-4 bg-white/80 dark:bg-background/80 shadow-lg rounded-2xl border-none backdrop-blur-md px-6 mt-2 mb-4 mx-2 animate-fade-in">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        {onGoBack && (
          <Button variant="ghost" size="icon" onClick={onGoBack} className="hover-lift rounded-full bg-gradient-to-r from-primary/10 to-emerald-100/30 shadow-md">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover-lift rounded-full bg-gradient-to-r from-primary/10 to-emerald-100/30 shadow-md">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <div className="rounded-full bg-gradient-to-r from-primary/10 to-emerald-100/30 shadow-md">
          <NotificationDropdown onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  )
}
