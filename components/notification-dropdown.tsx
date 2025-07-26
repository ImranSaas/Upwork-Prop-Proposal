"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, X, Eye, BarChart3, FileText, Clock } from "lucide-react"
import type { Screen } from "@/app/page"

interface NotificationDropdownProps {
  onNavigate: (screen: Screen) => void
}

export function NotificationDropdown({ onNavigate }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "job-alert",
      title: "New job alert: Senior React Developer",
      description: "FinTech startup - $8,000-$12,000 budget",
      time: "5 min ago",
      unread: true,
      icon: Bell,
    },
    {
      id: 2,
      type: "pipeline",
      title: "Pipeline reminder: TechCorp Inc.",
      description: "Client hasn't responded in 3 days",
      time: "2 hours ago",
      unread: true,
      icon: BarChart3,
    },
    {
      id: 3,
      type: "proposal",
      title: "Proposal viewed: E-commerce Platform",
      description: "StartupXYZ viewed your proposal",
      time: "1 day ago",
      unread: false,
      icon: FileText,
    },
    {
      id: 4,
      type: "job-alert",
      title: "New job alert: Full-Stack Developer",
      description: "Remote position - $6,000-$9,000 budget",
      time: "2 days ago",
      unread: false,
      icon: Bell,
    },
    {
      id: 5,
      type: "activity",
      title: "Profile view: Marketing Agency",
      description: "DigitalBoost Agency viewed your profile",
      time: "3 days ago",
      unread: false,
      icon: Eye,
    },
    {
      id: 6,
      type: "activity",
      title: "Proposal submitted successfully",
      description: "Your proposal for Mobile App Development",
      time: "4 days ago",
      unread: false,
      icon: FileText,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const getNavigationScreen = (type: string): Screen => {
    switch (type) {
      case "job-alert":
        return "job-alerts"
      case "pipeline":
        return "pipeline"
      case "proposal":
        return "proposals"
      default:
        return "dashboard"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground notification-pulse">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 animate-slide-in-from-top">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-auto p-1">
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="max-h-96 overflow-y-auto">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.slice(0, 4).map((notification) => {
                  const Icon = notification.icon
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                        notification.unread ? "bg-primary/5 border border-primary/20" : ""
                      }`}
                      onClick={() => {
                        markAsRead(notification.id)
                        onNavigate(getNavigationScreen(notification.type))
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-1.5 rounded-full ${
                            notification.unread ? "bg-primary/20" : "bg-muted"
                          } flex-shrink-0`}
                        >
                          <Icon
                            className={`h-3 w-3 ${notification.unread ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                        </div>

                        {notification.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-3 border-t">
          <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate("notifications")}>
            <Eye className="h-4 w-4 mr-2" />
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
