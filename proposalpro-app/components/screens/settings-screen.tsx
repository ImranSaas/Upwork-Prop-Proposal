"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { User, Bell, CreditCard, Moon, Sun, LogOut, ChevronRight, Check } from "lucide-react"

interface SettingsScreenProps {
  onLogout: () => void
  onNavigate?: (screen: string) => void
}

export function SettingsScreen({ onLogout, onNavigate }: SettingsScreenProps) {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)

  const settingsItems = [
    {
      id: "profile",
      icon: User,
      title: "Profile",
      subtitle: "john@example.com",
      action: "edit",
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications",
      subtitle: notifications ? "Enabled" : "Disabled",
      action: "toggle",
    },
    {
      id: "billing",
      icon: CreditCard,
      title: "Billing",
      subtitle: "Pro Plan - $19.99/month",
      action: "view",
    },
    {
      id: "theme",
      icon: theme === "dark" ? Moon : Sun,
      title: "Dark Mode",
      subtitle: theme === "dark" ? "Enabled" : "Disabled",
      action: "toggle-theme",
    },
  ]

  const handleItemAction = (item: any) => {
    switch (item.action) {
      case "toggle":
        setNotifications(!notifications)
        break
      case "toggle-theme":
        setTheme(theme === "dark" ? "light" : "dark")
        break
      case "view":
        onNavigate?.("billing")
        break
      default:
        break
    }
  }

  return (
    <div className="p-4 space-y-6 content-with-nav">
      {/* Header */}
      <div className="space-y-2 animate-fade-in">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Upwork Connection Status */}
      <Card className="animate-slide-up border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Upwork Connected</h3>
                <p className="text-sm text-muted-foreground">@john_freelancer</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings List */}
      <div className="space-y-3">
        {settingsItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Card
              key={item.id}
              className="card-interactive animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleItemAction(item)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                  {item.action.includes("toggle") ? (
                    <Switch
                      checked={item.action === "toggle" ? notifications : theme === "dark"}
                      onCheckedChange={() => handleItemAction(item)}
                    />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Sign Out */}
      <div className="pt-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <Button variant="destructive" onClick={onLogout} className="w-full h-12 tap-target">
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
