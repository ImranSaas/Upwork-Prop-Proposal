"use client"

<<<<<<< HEAD:components/screens/dashboard-screen.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
>>>>>>> parent of a9def25 (Project Added):proposalpro-app/components/screens/dashboard-screen.tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Bell, Briefcase, TrendingUp, Clock, DollarSign, ExternalLink, MapPin, Star, Check } from "lucide-react"
import type { Screen } from "@/app/page"

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const stats = [
    {
      title: "Recent Proposals",
      value: "12",
      change: "+3 this week",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "New Alerts",
      value: "8",
      change: "2 high priority",
      icon: Bell,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Pipeline Value",
      value: "$15,420",
      change: "+12% this month",
      icon: DollarSign,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
      title: "Win Rate",
      value: "68%",
      change: "+5% improvement",
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const jobFeed = [
    {
      id: 1,
      title: "React Developer for E-commerce Platform",
      summary: "The client is looking for someone who can build a modern e-commerce platform with advanced filtering, real-time inventory management, and seamless payment integration. You'll need strong TypeScript skills and experience with state management libraries to create a scalable shopping experience.",
      budget: "$2,500 - $5,000",
      type: "Fixed Price",
      client: "TechCorp Solutions",
      rating: 4.9,
      location: "United States",
      posted: "2 hours ago",
      matchScore: 95,
    },
    {
      id: 2,
      title: "Full-Stack Developer - B2B SaaS Platform",
      summary: "The client is looking for someone who can help build a B2B SaaS platform from the ground up. You'll be working on user authentication, subscription management, analytics dashboard, and API development. Experience with Node.js, React, and cloud deployment is essential for this role.",
      budget: "$30 - $50/hr",
      type: "Hourly",
      client: "StartupXYZ",
      rating: 4.7,
      location: "Canada",
      posted: "4 hours ago",
      matchScore: 88,
    },
    {
      id: 3,
      title: "Mobile App Development - React Native",
      summary: "The client is looking for someone who can create a cross-platform mobile app for a fitness startup. You'll be building user profiles, workout tracking, social features, and push notifications. Experience with mobile app deployment and performance optimization will be crucial for success.",
      budget: "$3,000 - $8,000",
      type: "Fixed Price",
      client: "InnovateLab",
      rating: 4.8,
      location: "United Kingdom",
      posted: "6 hours ago",
      matchScore: 92,
    },
  ]

  const recentActivity = [
    {
      type: "proposal",
      title: "React Developer - E-commerce Platform",
      status: "sent",
      time: "2 hours ago",
      priority: "high",
    },
    {
      type: "alert",
      title: "Full-Stack Developer - SaaS Startup",
      status: "new",
      time: "4 hours ago",
      priority: "medium",
    },
    {
      type: "pipeline",
      title: "Mobile App Development",
      status: "interview",
      time: "1 day ago",
      priority: "high",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "new":
        return "bg-primary/20 text-primary dark:bg-primary/10"
      case "interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400"
    if (score >= 80) return "text-blue-600 dark:text-blue-400"
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-gray-600 dark:text-gray-400"
  }

  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Try to get first name from user_metadata or full_name
        let name = user.user_metadata?.full_name || user.user_metadata?.name || user.email;
        if (name) {
          // Use only the first part if full name
          setFirstName(name.split(" ")[0]);
        } else {
          setFirstName(user.email ?? "");
        }
      }
    };
    fetchUser();
  }, []);

  return (
<<<<<<< HEAD:components/screens/dashboard-screen.tsx
    <div className="flex flex-col gap-6 sm:gap-8 p-2 sm:p-4 md:p-6 max-w-full mx-auto animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* Greeting Section */}
      <Card className="bg-white/80 dark:bg-zinc-900/80 shadow-lg rounded-2xl border-none backdrop-blur-md px-0 animate-fade-in">
        <CardHeader className="pb-2 border-none bg-gradient-to-r from-primary/10 to-emerald-100/30 rounded-t-2xl">
          <div className="flex flex-col gap-1 pt-3 sm:pt-4 px-4 sm:px-8">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-primary animate-bounce" />
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Good morning {firstName ? firstName : "!"} 👋</span>
            </h1>
            <span className="text-base sm:text-lg text-muted-foreground font-light mt-1">Let's win some jobs today!</span>
          </div>
        </CardHeader>
      </Card>
=======
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold animate-fade-in">Good morning! 👋</h1>
        <p className="text-muted-foreground animate-fade-in">Here's what's happening with your proposals today.</p>
      </div>
>>>>>>> parent of a9def25 (Project Added):proposalpro-app/components/screens/dashboard-screen.tsx

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="animate-fade-in hover-lift cursor-pointer transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Simplified Job Feed */}
      <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Perfect Job Matches
              </CardTitle>
              <CardDescription>AI-curated jobs that match your skills</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobFeed.map((job, index) => (
            <div
              key={job.id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer hover-lift"
              onClick={() => onNavigate("job-details")}
            >
              <div className="space-y-3">
                {/* Simplified Job Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-2">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{job.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-medium text-primary text-lg">{job.budget}</span>
                      <span>{job.type}</span>
                      <Badge className={`${getMatchScoreColor(job.matchScore)} bg-transparent border-current`}>
                        {job.matchScore}% match
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Simplified Client Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 fill-green-600 text-green-600" />
                      </div>
                      <span className="font-medium">Payment Verified</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <Button size="sm" className="hover-lift">
                    Generate Proposal
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* See More Jobs Button */}
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full h-12 hover-lift" onClick={() => onNavigate("job-alerts")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              See More Jobs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Your latest proposals and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer hover-lift swipe-indicator"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${activity.priority === "high" ? "bg-primary" : "bg-muted-foreground"}`}
                />
                <div>
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
