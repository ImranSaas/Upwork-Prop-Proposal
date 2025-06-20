"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Check, X, ArrowLeft } from "lucide-react"
import type { Screen } from "@/app/page"

interface LoginScreenProps {
  onLogin: () => void
  onNavigate?: (screen: Screen) => void
  onGoBack?: () => void
  onSignupWithUpworkConnect?: () => void
}

interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

export function LoginScreen({ onLogin, onNavigate, onGoBack, onSignupWithUpworkConnect }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const passwordRequirements: PasswordRequirement[] = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "Contains uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "Contains lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "Contains number", test: (pwd) => /\d/.test(pwd) },
    { label: "Contains special character", test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ]

  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    const passedRequirements = passwordRequirements.filter((req) => req.test(password)).length
    const score = (passedRequirements / passwordRequirements.length) * 100

    if (score === 0) return { score: 0, label: "", color: "" }
    if (score < 40) return { score, label: "Weak", color: "bg-red-500" }
    if (score < 80) return { score, label: "Medium", color: "bg-yellow-500" }
    return { score, label: "Strong", color: "bg-green-500" }
  }

  const isPasswordValid = () => {
    return passwordRequirements.every((req) => req.test(password))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate email
    if (!email) {
      setError("Please enter your email address")
      setLoading(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    // Validate password
    if (!password) {
      setError("Please enter your password")
      setLoading(false)
      return
    }

    // For sign up, check password strength
    if (isSignUp && !isPasswordValid()) {
      setError("Please ensure your password meets all requirements")
      setLoading(false)
      return
    }

    setTimeout(() => {
      if (isSignUp) {
        // For signup, show Upwork connect modal
        if (onSignupWithUpworkConnect) {
          onSignupWithUpworkConnect()
        }
      } else {
        // For signin, go directly to dashboard
        onLogin()
      }
      setLoading(false)
    }, 1000)
  }

  const handleGoogleSignIn = () => {
    setLoading(true)
    // Simulate Google OAuth
    setTimeout(() => {
      if (isSignUp) {
        // For signup with Google, show Upwork connect modal
        if (onSignupWithUpworkConnect) {
          onSignupWithUpworkConnect()
        }
      } else {
        // For signin with Google, go directly to dashboard
        onLogin()
      }
      setLoading(false)
    }, 1500)
  }

  const handleAppleSignIn = () => {
    setLoading(true)
    // Simulate Apple OAuth
    setTimeout(() => {
      if (isSignUp) {
        // For signup with Apple, show Upwork connect modal
        if (onSignupWithUpworkConnect) {
          onSignupWithUpworkConnect()
        }
      } else {
        // For signin with Apple, go directly to dashboard
        onLogin()
      }
      setLoading(false)
    }, 1500)
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-emerald-50/50 dark:from-gray-900 dark:to-gray-800">
      {/* Back Button */}
      {onGoBack && (
        <Button variant="ghost" size="icon" onClick={onGoBack} className="fixed top-4 left-4 z-50 hover-lift">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
      )}

      <Card className="w-full max-w-md animate-bounce-in">
        <CardHeader className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl md:text-3xl">PP</span>
          </div>
          <CardTitle className="text-2xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Start generating winning proposals today" : "Sign in to your ProposalPro account"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="animate-slide-in-from-top">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-12 w-12 hover-lift"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              {/* Password Strength Indicator for Sign Up */}
              {isSignUp && password && (
                <div className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Password strength</span>
                      <span
                        className={`font-medium ${passwordStrength.score >= 80 ? "text-green-600" : passwordStrength.score >= 40 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <Progress value={passwordStrength.score} className="h-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.score}%` }}
                      />
                    </Progress>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Password must contain:</p>
                    <div className="space-y-1">
                      {passwordRequirements.map((requirement, index) => {
                        const isValid = requirement.test(password)
                        return (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {isValid ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span className={isValid ? "text-green-600" : "text-muted-foreground"}>
                              {requirement.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 hover-lift"
              disabled={loading || (isSignUp && !isPasswordValid())}
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In */}
          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium hover-lift"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Apple Sign-In */}
          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium hover-lift"
            onClick={handleAppleSignIn}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Continue with Apple
          </Button>

          <div className="text-center space-y-2">
            <Button
              variant="link"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </Button>

            {!isSignUp && (
              <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                Forgot your password?
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
