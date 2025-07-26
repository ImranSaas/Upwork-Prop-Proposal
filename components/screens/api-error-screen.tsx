"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, HelpCircle } from "lucide-react"
import type { Screen } from "@/app/page"

interface ApiErrorScreenProps {
  onNavigate: (screen: Screen) => void
}

export function ApiErrorScreen({ onNavigate }: ApiErrorScreenProps) {
  const handleReconnect = () => {
    // Simulate reconnection
    setTimeout(() => {
      onNavigate("dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm animate-scale-in">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Connection Failed</h1>
            <p className="text-muted-foreground">
              We're having trouble connecting to your Upwork account. Please try reconnecting.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleReconnect} className="w-full h-12 tap-target">
              <RefreshCw className="h-5 w-5 mr-2" />
              Reconnect to Upwork
            </Button>

            <Button variant="outline" onClick={() => onNavigate("help")} className="w-full h-12 tap-target">
              <HelpCircle className="h-5 w-5 mr-2" />
              Get Help
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Common solutions:</p>
            <ul className="text-left mt-2 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Clear your browser cache</li>
              <li>• Try reconnecting your account</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
