"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type { Screen } from "@/app/page"

interface LandingPageProps {
  onNavigate: (screen: Screen) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { theme, setTheme } = useTheme()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

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
      title: "Links to Your Upwork",
      description: "Grabs your profile and job listings instantly.",
    },
    {
      title: "AI Writes Proposals",
      description: "Creates job-winning bids tailored to each client.",
    },
    {
      title: "Edit with Ease",
      description: "Tweak bids in a simple app and pick your tone.",
    },
    {
      title: "Smarter Every Job",
      description: "Gets better by learning what wins you jobs.",
    },
  ]

  const whyChoosePoints = [
    {
      title: "Save Hours",
      description: "Skip tedious proposal writing and job searches.",
    },
    {
      title: "Works with Upwork",
      description: "Connects right to your account for instant use.",
    },
    {
      title: "Try Risk-Free",
      description: "14-day money-back guarantee to start winning.",
    },
  ]

  const handleStepNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentStepIndex((prev) => (prev - 1 + 4) % 4)
    } else {
      setCurrentStepIndex((prev) => (prev + 1) % 4)
    }
  }

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
      <section className="relative px-4 py-16 md:py-24 text-center bg-gradient-to-br from-primary/5 via-background to-emerald-50/50 dark:from-gray-900 dark:via-background dark:to-gray-800">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 animate-bounce-in">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="font-extrabold text-3xl md:text-4xl text-white">UG</span>
            </div>
            <span className="text-3xl md:text-4xl font-bold">UpGenie</span>
          </div>

          {/* Hero Messaging */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              Win Upwork Jobs Faster with{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                AI for $19.99/Month
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Imagine landing your dream jobs faster. UpGenie uses AI to write winning proposals, find perfect jobs,
              and manage clients—all for less than your daily coffee.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <Button
              size="lg"
              className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 hover-lift shadow-xl transform transition-all duration-200 hover:scale-105 touch-target cta-pulse"
              onClick={() => onNavigate("login")}
            >
              Start Winning Today
              <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-semibold hover-lift border-2 border-primary/20 hover:border-primary touch-target"
              onClick={() => onNavigate("login")}
            >
              Sign In
            </Button>
          </div>

          {/* Value Badge */}
          <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2">
              ☕ Less than your daily coffee
            </Badge>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12 md:mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-base md:text-lg px-4 md:px-6 py-2 md:py-3">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">How You'll Win with UpGenie</h2>
            <p className="text-lg md:text-xl text-primary font-semibold max-w-2xl mx-auto">
              Work smarter, win more, stress less.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                        <CheckCircle className="h-10 w-10 text-primary" />
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
              <div className="overflow-hidden rounded-lg">
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
                              <CheckCircle className="h-12 w-12 text-primary" />
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
              <div className="flex justify-between items-center mt-6">
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
      <section className="px-4 py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12 md:mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-base md:text-lg px-4 md:px-6 py-2 md:py-3">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Why Freelancers Love UpGenie</h2>
          </div>

          <div className="space-y-6 md:space-y-8 mb-12">
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
              className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 hover-lift shadow-xl transform transition-all duration-200 hover:scale-105 touch-target cta-pulse"
              onClick={() => onNavigate("login")}
            >
              Start Winning for $19.99/Month
              <CheckCircle className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              Your next big client is waiting • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-16 md:py-20 bg-gradient-to-r from-primary/10 to-emerald-50/50 dark:from-primary/5 dark:to-emerald-950/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            Ready to win jobs in half the time?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop writing proposals from scratch. Start winning with AI that works.
          </p>
          <Button
            size="lg"
            className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 hover-lift shadow-xl transform transition-all duration-200 hover:scale-105 touch-target cta-pulse"
            onClick={() => onNavigate("login")}
          >
            Get UpGenie Now
            <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <div className="space-y-2">
            <p className="text-base md:text-lg font-semibold text-primary">
              Just $19.99/month • Less than your daily coffee
            </p>
            <p className="text-muted-foreground">14-day money-back guarantee • No setup fees</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 md:py-12 border-t bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-extrabold text-lg text-white">UG</span>
              </div>
              <span className="font-bold text-xl">UpGenie</span>
            </div>
            <div className="flex gap-6 md:gap-8">
              <Button
                variant="link"
                className="p-0 h-auto text-base md:text-lg text-primary hover:text-primary/80 hover:underline touch-target"
                onClick={() => onNavigate("help")}
              >
                Help
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-base md:text-lg text-primary hover:text-primary/80 hover:underline touch-target"
              >
                Privacy
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-base md:text-lg text-primary hover:text-primary/80 hover:underline touch-target"
              >
                Terms
              </Button>
            </div>
          </div>
          <div className="text-center text-muted-foreground mt-6 md:mt-8 pt-6 md:pt-8 border-t">
            <p className="text-base md:text-lg font-medium mb-2">
              Your next big client is waiting. Join UpGenie today.
            </p>
            <p className="text-sm md:text-base">© 2024 UpGenie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
