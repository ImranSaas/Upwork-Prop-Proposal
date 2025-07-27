"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Home } from "lucide-react"
import type { Screen } from "@/app/page"

interface ErrorScreenProps {
  onNavigate: (screen: Screen) => void
}

export function ErrorScreen({ onNavigate }: ErrorScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm animate-scale-in">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Page Not Found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          </div>

          <Button onClick={() => onNavigate("dashboard")} className="w-full h-12 tap-target">
            <Home className="h-5 w-5 mr-2" />
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
