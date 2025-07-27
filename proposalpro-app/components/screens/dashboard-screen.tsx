"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Bell, Briefcase, TrendingUp, Clock, DollarSign, ExternalLink, MapPin, Star, Check, Mail, Edit, CheckCircle, Users, Calendar, Sparkles, Send, Verified, ArrowRight } from "lucide-react"
import type { Screen } from "@/app/page"
import { JobCard } from "@/components/ui/job-card"

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void
  setSelectedJob: (job: any) => void
}

export function DashboardScreen({ onNavigate, setSelectedJob }: DashboardScreenProps) {
  const stats = [
    {
      title: "New Jobs Found",
      value: "12",
      change: "+3 this week",
      icon: Mail,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Proposals Sent",
      value: "Sent: 3 proposals this week",
      change: "2 high priority",
      icon: Edit,
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
      title: "Hires",
      value: "1 client hired you 🎉",
      change: "+5% improvement",
      icon: CheckCircle,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
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

  // Job Feed Data (copied from job alerts dashboard)
  const jobFeed = [
    {
      id: 1,
      matchScore: 95,
      title: "Unity 2D Mobile Game Developer (Mario Party-inspired App Game)",
      description: "Build a 2D mobile game inspired by Mario Party, including a main map, themed worlds, and simple mini-games. The developer will handle the full app, from core gameplay to mini-game integration, using Unity and ready-made assets where possible.",
      aiSummary: "Develop a 2D mobile game inspired by Mario Party for a global audience. You will build the main map, themed worlds, turn-based movement, and integrate several short, fun mini-games. The project requires handling the entire app lifecycle, from core gameplay to player progression, using Unity and leveraging existing assets to optimize cost and speed.",
      budget: "$2,000 - $4,000",
      budgetType: "Fixed price",
      client: {
        location: "United States",
        rating: 4.8,
        reviewCount: 54,
        totalSpent: "$30K+",
        verified: true,
        memberSince: "2020",
      },
      skills: ["Unity", "C#", "2D Game Development", "Mobile", "Game Design"],
      proposals: 12,
      timePosted: "1 hour ago",
      duration: "1 to 3 months",
      experienceLevel: "Intermediate",
      featured: true,
      urgent: false,
      connectsRequired: 6,
    },
    {
      id: 2,
      matchScore: 90,
      title: "Development of a 2D web based animated 'car delivery' game",
      description: "Create a simple, animated 2D car delivery game for tablets, designed to engage event attendees. The game should work offline, focus on city navigation and deliveries, and be ready by October 1, 2025.",
      aiSummary: "Build a 2D animated car delivery game for use on event stand tablets. The game should engage attendees by letting them navigate city streets and make as many deliveries as possible in a fixed time. It must be fully animated, work offline, and highlight the key selling points of the vehicles.",
      budget: "$3,000 - $6,000",
      budgetType: "Fixed price",
      client: {
        location: "United Kingdom",
        rating: 4.7,
        reviewCount: 32,
        totalSpent: "$12K+",
        verified: true,
        memberSince: "2018",
      },
      skills: ["JavaScript", "HTML5", "2D Animation", "Game Development", "Tablet Apps"],
      proposals: 8,
      timePosted: "3 hours ago",
      duration: "Less than 1 month",
      experienceLevel: "Intermediate",
      featured: false,
      urgent: false,
      connectsRequired: 4,
    },
    {
      id: 3,
      matchScore: 87,
      title: "React Developer for SaaS Dashboard UI Overhaul",
      description: "Redesign a SaaS dashboard UI using React and Tailwind CSS. You'll implement Figma designs, ensure responsiveness, and integrate with REST APIs.",
      aiSummary: "Overhaul the UI of an existing SaaS dashboard using React and Tailwind CSS. You'll implement new designs from Figma, ensure the dashboard is responsive and accessible, and integrate with REST APIs for dynamic data. The focus is on modern design, usability, and performance.",
      budget: "$2,000 - $3,500",
      budgetType: "Fixed price",
      client: {
        location: "Canada",
        rating: 4.9,
        reviewCount: 40,
        totalSpent: "$20K+",
        verified: true,
        memberSince: "2019",
      },
      skills: ["React", "Tailwind CSS", "Figma", "REST API", "UI/UX"],
      proposals: 10,
      timePosted: "5 hours ago",
      duration: "1 to 3 months",
      experienceLevel: "Expert",
      featured: false,
      urgent: false,
      connectsRequired: 5,
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
      // Try to get first name from user_metadata or full_name
      // let name = user.user_metadata?.full_name || user.user_metadata?.name || user.email;
      // if (name) {
      //   // Use only the first part if full name
      //   setFirstName(name.split(" ")[0]);
      // } else {
      //   setFirstName(user.email ?? "");
      // }
    };
    fetchUser();
  }, []);

  return (
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

      {/* Stats Grid */}
      <Card className="bg-white/80 dark:bg-zinc-900/80 shadow-lg rounded-2xl border-none backdrop-blur-md px-0 animate-fade-in">
        <CardHeader className="pb-0 border-none">
          <CardTitle className="text-lg sm:text-xl font-bold px-4 sm:px-8 pt-3 sm:pt-4">Your Weekly Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-3 sm:p-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="flex flex-col items-start gap-2 bg-gradient-to-br from-primary/5 to-emerald-50 dark:from-background/60 dark:to-background/40 rounded-xl p-4 sm:p-5 shadow-sm transition-transform hover:scale-[1.03] hover:shadow-md cursor-pointer border-none w-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-100/40 mb-2`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.title}</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{stat.change}</div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Job Feed Section (already premium) */}
      <Card className="animate-fade-in mt-6 sm:mt-10 bg-white/80 dark:bg-zinc-900/80 shadow-lg rounded-2xl border-none backdrop-blur-md px-0">
        <CardHeader className="pb-0 border-none bg-gradient-to-r from-primary/10 to-emerald-100/30 rounded-t-2xl">
          <div className="flex flex-col gap-1 pt-3 sm:pt-4 px-4 sm:px-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Job Feed</span>
            </h2>
            <span className="text-sm sm:text-base text-muted-foreground font-light mt-1">Handpicked jobs just for you, powered by AI</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8 pt-4 sm:pt-6 pb-2 px-2 sm:px-4 md:px-8">
          {jobFeed.slice(0, 3).map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              onProposal={() => onNavigate("proposal-editor")}
              onClick={(job) => { setSelectedJob(job); onNavigate("job-details"); }}
            />
          ))}
        </CardContent>
        <CardFooter className="pt-0 pb-4 sm:pb-6 px-4 sm:px-8">
          <Button
            variant="default"
            className="flex items-center gap-2 w-full font-bold text-base py-3 sm:py-4 rounded-xl shadow-md bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-600 transition-all"
            onClick={() => onNavigate("job-feed")}
          >
            See more jobs
            <ArrowRight className="h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/80 dark:bg-zinc-900/80 shadow-lg rounded-2xl border-none backdrop-blur-md px-0 animate-fade-in">
        <CardHeader className="pb-0 border-none">
          <CardTitle className="text-lg sm:text-xl font-bold px-4 sm:px-8 pt-3 sm:pt-4">Recent Activity</CardTitle>
          <CardDescription className="px-4 sm:px-8">Your latest proposals and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-xl shadow-sm bg-gradient-to-r from-muted/40 to-white dark:from-background/60 dark:to-background/40 transition-transform hover:scale-[1.01] hover:shadow-md cursor-pointer border-none gap-3 sm:gap-4 ${activity.priority === "high" ? "ring-2 ring-primary/40" : ""}`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${activity.priority === "high" ? "bg-primary animate-pulse" : "bg-muted-foreground"}`}
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base leading-tight mb-0.5">{activity.title}</p>
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
