"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, User, Loader2 } from "lucide-react"
import type { Screen } from "@/app/page"
import React from "react"

interface FallbackScreenProps {
  type: "404" | "error" | "loading"
  onNavigate?: (screen: Screen) => void
  onRetry?: () => void
}

const ICONS = {
  "404": <Rocket className="h-10 w-10 text-primary" />,
  error: <User className="h-10 w-10 text-primary animate-bounce" />,
  loading: <Loader2 className="h-10 w-10 text-primary animate-spin" />,
}

const HEADERS = {
  "404": "Oops! You're lost in the freelance galaxy.",
  error: "Something went wrong — but don't worry, we've sent a genie.",
  loading: "Loading your UpGenie magic...",
}

const SUBTEXT = {
  "404": "The page you're looking for doesn't exist or has been moved.",
  error: "Try again in a moment. If the problem persists, our genie support is on it!",
  loading: "Hang tight while we conjure your workspace.",
}

export function FallbackScreen({ type, onNavigate, onRetry }: FallbackScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm animate-scale-in shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            {ICONS[type]}
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">{HEADERS[type]}</h1>
            <p className="text-muted-foreground">{SUBTEXT[type]}</p>
          </div>
          {type === "404" && onNavigate && (
            <Button onClick={() => onNavigate("dashboard")} className="w-full h-12 tap-target mt-4">
              Back to Dashboard
            </Button>
          )}
          {type === "error" && onRetry && (
            <Button onClick={onRetry} className="w-full h-12 tap-target mt-4">
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 