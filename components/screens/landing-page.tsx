"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Moon, Sun, Facebook, Instagram, Linkedin, Twitter, Chrome, Bell, FileText, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import type { Screen } from "@/app/page"

interface LandingPageProps {
  onNavigate: (screen: Screen) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { theme, setTheme } = useTheme()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  // For swipe gesture
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  // For sliding animation
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    // Stagger card animations
    const timer1 = setTimeout(() => setVisibleCards([0]), 300)
    const timer2 = setTimeout(() => setVisibleCards([0, 1]), 500)
    const timer3 = setTimeout(() => setVisibleCards([0, 1, 2]), 700)
    const timer4 = setTimeout(() => setVisibleCards([0, 1, 2, 3]), 900)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  useEffect(() => {
    // Auto-rotate How It Works cards for mobile
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % 4)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const howItWorksSteps = [
    {
      title: "Install the Chrome Extension",
      description: "Easily add the UPGENIE extension to Chrome. It lives inside your Upwork tab, quietly syncing your jobs, proposals, and conversations  no  API needed.",
      icon: Chrome,
    },
    {
      title: "Get Smart Job Alerts",
      description: "Get AI-picked jobs that match your skills and win history sent directly to your email or as alerts, with short summaries that save time and boost your chances.",
      icon: Bell,
    },
    {
      title: "Generate Proposals",
      description: "AI crafts personalized proposals that match the client's tone, job description, and your own voice and gets smarter with each job you apply for.",
      icon: FileText,
    },
    {
      title: "Learns What Wins",
      description: "UpGenie studies which proposals lead to replies, interviews, or hires then fine-tunes your future applications automatically.",
      icon: Sparkles,
    },
  ]

  const whyChoosePoints = [
    {
      title: "Land More Jobs, With Less Effort",
      description: "UpGenie writes smarter proposals and finds better-fit jobs you just focus on delivering.",
    },
    {
      title: "Feels Like a Personal Assistant",
      description: "Connects to your Upwork, learns how you work, and helps you act faster automatically.",
    },
    {
      title: "Smart, Not Generic",
      description: "Every alert, every draft is tailored to your Upwork profile, your strengths, and the job's needs.",
    },
    {
      title: "Be First. Be Relevant. Be Hired",
      description: "Get job alerts with summaries before others see them. Apply with proposals tailored to win.",
    },
    {
      title: "Freelancers Say It Pays for Itself",
      description: "Just one extra job a month can cover the entire subscription and then some.",
    },
  ]

  const handleStepNavigation = (direction: "prev" | "next") => {
    setSlideDirection(direction === "next" ? 'left' : 'right')
    if (direction === "prev") {
      setCurrentStepIndex((prev) => (prev - 1 + 4) % 4)
    } else {
      setCurrentStepIndex((prev) => (prev + 1) % 4)
    }
  }

  // Swipe handlers for mobile carousel
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX)
    setTouchEndX(null)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX
      if (Math.abs(distance) > 50) { // Minimum swipe distance
        if (distance > 0) {
          // Swiped left
          setSlideDirection('left')
          handleStepNavigation("next")
        } else {
          // Swiped right
          setSlideDirection('right')
          handleStepNavigation("prev")
        }
      }
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  // Reset slide direction after animation
  useEffect(() => {
    if (slideDirection) {
      const timeout = setTimeout(() => setSlideDirection(null), 350)
      return () => clearTimeout(timeout)
    }
  }, [slideDirection, currentStepIndex])

  // Add X (Twitter) icon SVG
  const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l16 16M4 20L20 4" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover-lift">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-emerald-50/50 dark:from-gray-900 dark:via-background dark:to-gray-800">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 animate-bounce-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
              <span className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">UG</span>
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary">UpGenie</span>
          </div>
          {/* Headline */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance mb-2">
              Land More Upwork Jobs. <span className="text-primary bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Less Stress. More Wins.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-prose mx-auto leading-relaxed">
              UpGenie writes custom proposals, finds the best jobs, with AI that learns you so you can focus on what you do best. All for just $19.99/month.
            </p>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button
              size="lg"
              className="h-14 sm:h-16 px-8 sm:px-10 md:px-16 text-lg sm:text-xl font-extrabold rounded-full bg-primary hover:bg-primary/90 hover-lift shadow-2xl transform transition-all duration-200 hover:scale-105 cta-pulse"
              onClick={() => onNavigate("login")}
            >
              Start Winning Today
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 sm:h-16 px-8 sm:px-10 md:px-16 text-lg sm:text-xl font-semibold rounded-full border-2 border-primary/20 hover:border-primary hover-lift shadow-md"
              onClick={() => onNavigate("login")}
            >
              Sign In
            </Button>
          </div>
          {/* Guarantee Line */}
          <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <p className="text-sm sm:text-base text-muted-foreground font-medium mt-2">🕐 No trial. 14-day money-back guarantee.</p>
          </div>
          {/* Value Badge */}
          <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-base px-4 sm:px-5 py-2 rounded-full shadow-sm">
              ☕ Less than your daily coffee
            </Badge>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 md:mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 py-2 md:py-3">
              How It Works
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">How You'll Win with UpGenie</h2>
            <p className="text-base sm:text-lg md:text-xl text-primary font-semibold max-w-2xl mx-auto">
              Work smarter, win more, stress less.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {howItWorksSteps.map((step, index) => {
              const isVisible = visibleCards.includes(index)

              return (
                <Card
                  key={index}
                  className={`hover-lift transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary hover:shadow-lg ${
                    isVisible ? "animate-fade-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-6 space-y-4 text-center">
                    <div className="flex justify-center">
                      <div className="p-4 rounded-xl bg-primary/10 w-fit">
                        {step.icon && (
                          <step.icon className="h-10 w-10 text-primary" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Mobile Swipeable Cards */}
          <div className="md:hidden">
            <div className="relative">
              <div
                className={`overflow-hidden rounded-lg ${slideDirection === 'left' ? 'animate-slide-left' : ''} ${slideDirection === 'right' ? 'animate-slide-right' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentStepIndex * 100}%)` }}
                >
                  {howItWorksSteps.map((step, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <Card className="border-l-4 border-l-primary/20">
                        <CardContent className="p-6 space-y-4 text-center">
                          <div className="flex justify-center">
                            <div className="p-4 rounded-xl bg-primary/10 w-fit">
                              {step.icon && (
                                <step.icon className="h-12 w-12 text-primary" />
                              )}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                              {index + 1}
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-4 sm:mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleStepNavigation("prev")}
                  className="h-12 w-12 rounded-full touch-target"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {howItWorksSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStepIndex(index)}
                      className={`w-4 h-4 rounded-full transition-colors touch-target ${
                        index === currentStepIndex ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleStepNavigation("next")}
                  className="h-12 w-12 rounded-full touch-target"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          
          
        </div>
      </section>

      {/* Why Choose UpGenie Section */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 md:mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 py-2 md:py-3">
              Why Choose Us
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Why Freelancers Love UpGenie</h2>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-12">
            {whyChoosePoints.map((point, index) => (
              <Card
                key={index}
                className="hover-lift animate-fade-in border-l-4 border-l-primary/20 hover:border-l-primary"
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="p-3 md:p-4 rounded-xl bg-primary/10 flex-shrink-0">
                      <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold">{point.title}</h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA in Why Choose Section */}
          <div className="text-center">
            <Button
              size="lg"
              className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-12 text-base sm:text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 hover-lift shadow-xl transform transition-all duration-200 hover:scale-105 touch-target cta-pulse"
              onClick={() => onNavigate("login")}
            >
              Start Winning for $19.99/Month
              <CheckCircle className="ml-2 sm:ml-2.5 md:ml-3 h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <p className="text-muted-foreground mt-2 sm:mt-4 text-sm sm:text-base md:text-lg">
              Your next big client is waiting • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 bg-gradient-to-r from-primary/10 to-emerald-50/50 dark:from-primary/5 dark:to-emerald-950/20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-balance mb-2 sm:mb-4 tracking-tight">
            Start Winning for $19.99/month
          </h2>
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white/90 via-background/80 to-emerald-50/80 dark:from-gray-900/90 dark:via-background/80 dark:to-emerald-950/40 backdrop-blur-xl rounded-3xl">
              <CardContent className="py-8 sm:py-12 px-4 sm:px-6 md:px-16 flex flex-col items-center gap-6 sm:gap-8">
                <div className="text-2xl md:text-3xl font-extrabold text-primary flex items-center gap-3 mb-2 tracking-tight">
                  <span role="img" aria-label="money">💰</span> Just $19.99/month
                  <span className="text-base font-semibold text-muted-foreground ml-2">Less than your daily coffee</span>
                </div>
                <ul className="space-y-4 text-lg md:text-xl text-muted-foreground font-medium w-full max-w-md mx-auto text-left">
                  <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '100ms' }}><CheckCircle className="h-6 w-6 text-emerald-500 animate-pulse" /> Cancel anytime</li>
                  <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '200ms' }}><CheckCircle className="h-6 w-6 text-emerald-500 animate-pulse" /> 14-day money-back guarantee</li>
                  <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}><CheckCircle className="h-6 w-6 text-emerald-500 animate-pulse" /> AI-powered job feed + proposals</li>
                  <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '400ms' }}><CheckCircle className="h-6 w-6 text-emerald-500 animate-pulse" /> Connects instantly to Upwork</li>
                </ul>
                <div className="w-full flex justify-center my-4">
                  <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-5 py-2 rounded-full shadow-sm">
                  No Trial — Real Results or Money Back
                </Badge>
                <Button
                  size="lg"
                  className="h-16 px-12 text-xl font-extrabold bg-primary hover:bg-primary/90 hover:shadow-primary/40 hover:shadow-2xl hover:brightness-110 focus-visible:ring-4 focus-visible:ring-primary/30 rounded-full shadow-xl transform transition-all duration-200 hover:scale-105 cta-pulse mt-4 animate-fade-in"
                  onClick={() => onNavigate("login")}
                  style={{ boxShadow: '0 4px 32px 0 rgba(16, 185, 129, 0.15)' }}
                >
                  Start Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-1 sm:space-y-2 mt-4 sm:mt-8">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-primary">
              Your next big client is waiting • Cancel anytime
            </p>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">14-day money-back guarantee </p>
          </div>
        </div>
      </section>

      {/* New Features Notification Section */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-background border-t border-muted/30">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 sm:gap-10">
          <Card className="w-full max-w-3xl border-0 shadow-xl bg-gradient-to-br from-white/90 via-background/80 to-emerald-50/80 dark:from-gray-900/90 dark:via-background/80 dark:to-emerald-950/40 backdrop-blur-xl rounded-3xl">
            <CardContent className="py-8 sm:py-10 px-4 sm:px-6 md:px-12 flex flex-col items-center gap-4 sm:gap-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-1 tracking-tight">Be the First to Use Our New Features</h2>
              <p className="text-base md:text-lg text-muted-foreground text-center mb-1 font-medium">Enter your email to be notified when new features drop</p>
              <p className="text-sm md:text-base text-muted-foreground text-center mb-2 font-normal">Agent Copilot, AI Messaging Assistant, Smart CRM, Chrome Extension & Mobile app</p>
              <form className="w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2" onSubmit={e => { e.preventDefault(); /* handle submit here */ }}>
                <div className="relative w-full sm:w-auto flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9m-5 5v2m0 4h.01"/></svg>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    className="pl-10 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-muted-foreground/20 bg-background text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition w-full shadow-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-bold bg-primary hover:bg-primary/90 hover:shadow-primary/30 hover:shadow-lg rounded-lg transition shadow-md"
                >
                  Notify Me
                </Button>
              </form>
              <div className="w-full flex justify-center my-2">
                <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </div>
              <p className="text-sm text-muted-foreground mt-0">Get early access discounts</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-14 border-t bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6 sm:gap-10 md:gap-0">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-center md:justify-start mb-2 sm:mb-4 md:mb-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-extrabold text-base sm:text-lg text-white">UG</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-primary">UpGenie</span>
          </div>
          {/* Center: Nav Links and Socials */}
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-10 w-full md:w-auto justify-center">
            <div className="flex gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg font-medium text-primary">
              <a href="#" className="hover:underline transition" target="_blank" rel="noopener noreferrer">Help</a>
              <a href="#" className="hover:underline transition" target="_blank" rel="noopener noreferrer">Privacy</a>
              <a href="#" className="hover:underline transition" target="_blank" rel="noopener noreferrer">Terms</a>
            </div>
            {/* Social Icons with divider */}
            <div className="flex gap-4 sm:gap-6 mt-2 sm:mt-4 md:mt-0 md:border-l border-muted/20 md:pl-6 sm:pl-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary transition" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary transition" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary transition" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="flex items-center justify-center"><XIcon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary transition font-bold" /></a>
            </div>
          </div>
          {/* Right: Copyright */}
          <div className="w-full md:w-auto flex justify-center md:justify-end mt-4 sm:mt-6 md:mt-0">
            <span className="text-xs sm:text-sm md:text-base text-muted-foreground">© 2025 UpGenie. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

