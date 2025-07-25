"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, HelpCircle, ArrowRight } from "lucide-react"
import type { Screen } from "@/app/page"

interface UpworkConnectModalProps {
  onNavigate: (screen: Screen) => void
  onConnectAndLogin: () => void
}

export function UpworkConnectModal({ onNavigate, onConnectAndLogin }: UpworkConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleUpworkConnect = () => {
    setIsConnecting(true)
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnecting(false)
      // This will authenticate the user and redirect to dashboard
      onConnectAndLogin()
    }, 2000)
  }

  const benefits = [
    "Get personalized job recommendations",
    "Auto-sync your profile and portfolio",
    "Track proposal success rates",
    "Access advanced AI features",
  ]

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-bounce-in">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.002-2.439-5.453-5.439-5.453z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">Connect your Upwork account</CardTitle>
          <p className="text-muted-foreground">
            Unlock the full power of UpGenie by connecting your Upwork profile
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Benefits */}
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Connect Button */}
          <Button
            onClick={handleUpworkConnect}
            disabled={isConnecting}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 hover-lift"
          >
            {isConnecting ? (
              "Connecting..."
            ) : (
              <>
                Connect to Upwork
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {/* Skip Option */}
          <div className="text-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => onNavigate("help")}
              className="text-xs text-muted-foreground"
            >
              <HelpCircle className="h-3 w-3 mr-1" />
              Need help connecting?
            </Button>
          </div>

          {/* Security Note */}
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted/50 rounded-lg">
            🔒 Your Upwork credentials are never stored. We use secure OAuth authentication.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
