"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, MessageSquare } from "lucide-react"
import type { Screen } from "@/app/page"

interface PipelineReminderModalProps {
  onClose: () => void
  onNavigate: (screen: Screen) => void
}

export function PipelineReminderModal({ onClose, onNavigate }: PipelineReminderModalProps) {
  const handleFollowUp = () => {
    onNavigate("messaging")
    onClose()
  }

  const handleDismiss = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-sm animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-xl">Follow Up Reminder</CardTitle>
          <p className="text-muted-foreground">No response from TechCorp Inc. in 3 days</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="space-y-1">
                <h3 className="font-medium text-sm">React E-commerce Platform</h3>
                <p className="text-xs text-muted-foreground">TechCorp Inc.</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Last contact: 3 days ago
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={handleFollowUp} className="w-full h-12 tap-target">
              <MessageSquare className="h-5 w-5 mr-2" />
              Send Follow Up
            </Button>
            <Button variant="outline" onClick={handleDismiss} className="w-full h-12 tap-target">
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
