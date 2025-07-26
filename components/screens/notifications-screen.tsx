"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Bell, BarChart3, FileText, Eye, Clock, X } from "lucide-react"
import type { Screen } from "@/app/page"

interface NotificationsScreenProps {
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function NotificationsScreen({ onNavigate, onGoBack }: NotificationsScreenProps) {
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
      type: "job-alert",
      title: "New job alert: Full-Stack Developer",
      description: "Remote position - $6,000-$9,000 budget",
      time: "2 hours ago",
      unread: true,
      icon: Bell,
    },
    {
      id: 3,
      type: "job-alert",
      title: "New job alert: Mobile App Developer",
      description: "Health & Wellness app - $10,000-$15,000 budget",
      time: "1 day ago",
      unread: false,
      icon: Bell,
    },
    {
      id: 4,
      type: "activity",
      title: "Pipeline reminder: TechCorp Inc.",
      description: "Client hasn't responded in 3 days",
      time: "2 hours ago",
      unread: true,
      icon: BarChart3,
    },
    {
      id: 5,
      type: "activity",
      title: "Proposal viewed: E-commerce Platform",
      description: "StartupXYZ viewed your proposal",
      time: "1 day ago",
      unread: false,
      icon: FileText,
    },
    {
      id: 6,
      type: "activity",
      title: "Profile view: Marketing Agency",
      description: "DigitalBoost Agency viewed your profile",
      time: "3 days ago",
      unread: false,
      icon: Eye,
    },
    {
      id: 7,
      type: "activity",
      title: "Proposal submitted successfully",
      description: "Your proposal for Mobile App Development",
      time: "4 days ago",
      unread: false,
      icon: FileText,
    },
  ])

  const jobAlerts = notifications.filter((n) => n.type === "job-alert")
  const activities = notifications.filter((n) => n.type === "activity")

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
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

  const renderNotificationList = (notificationList: typeof notifications) => (
    <ScrollArea className="h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-2 p-4">
        {notificationList.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications in this category</p>
          </div>
        ) : (
          notificationList.map((notification) => {
            const Icon = notification.icon
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent/50 ${
                  notification.unread ? "bg-primary/5 border-primary/20" : "bg-card"
                }`}
                onClick={() => {
                  markAsRead(notification.id)
                  onNavigate(getNavigationScreen(notification.type))
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${notification.unread ? "bg-primary/20" : "bg-muted"} flex-shrink-0`}
                  >
                    <Icon className={`h-4 w-4 ${notification.unread ? "text-primary" : "text-muted-foreground"}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-sm font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          dismissNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>

                  {notification.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                </div>
              </div>
            )
          })
        )}
      </div>
    </ScrollArea>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3">
          {onGoBack && (
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {notifications.filter((n) => n.unread).length} unread notifications
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              All Activity
              {activities.filter((n) => n.unread).length > 0 && (
                <Badge className="h-4 w-4 p-0 flex items-center justify-center text-xs">
                  {activities.filter((n) => n.unread).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Job Alerts
              {jobAlerts.filter((n) => n.unread).length > 0 && (
                <Badge className="h-4 w-4 p-0 flex items-center justify-center text-xs">
                  {jobAlerts.filter((n) => n.unread).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {renderNotificationList(activities)}
          </TabsContent>

          <TabsContent value="jobs" className="mt-4">
            {renderNotificationList(jobAlerts)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
