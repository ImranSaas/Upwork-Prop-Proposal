"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Heart,
  Send,
  Filter,
  Verified,
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  Loader2,
} from "lucide-react"
import type { Screen } from "@/app/page"
import { useToast } from "@/components/ui/use-toast"
import { useIsMobile } from "@/components/ui/use-mobile"
import { JobCard } from "@/components/ui/job-card"

interface Job {
  id: number;
  matchScore: number;
  title: string;
  highlights: string;
  description: string;
  aiSummary: string;
  howToApply: string | null;
  budget: string;
  budgetType: string;
  client: {
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    totalSpent: string;
    verified: boolean;
    memberSince: string;
  };
  skills: string[];
  proposals: number;
  timePosted: string;
  duration: string;
  experienceLevel: string;
  category: string;
  featured: boolean;
  urgent: boolean;
  connectsRequired: number;
  isUnread: boolean;
  deliveryDate: string | null;
}

interface JobFeedScreenProps {
  onNavigate: (screen: Screen) => void
  setSelectedJob: (job: any) => void
}

export function JobFeedScreen({ onNavigate, setSelectedJob }: JobFeedScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayedJobs, setDisplayedJobs] = useState(5)
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      matchScore: 95,
      title: "Unity 2D Mobile Game Developer (Mario Party-inspired App Game)",
      highlights: "Develop a 2D mobile game inspired by Mario Party for a global audience. Includes main map, themed worlds, turn-based movement, and mini-games.",
      description: `We're developing a 2D mobile game inspired by Mario Party, targeting a global audience. The game will include:\n\n- A main map with multiple themed worlds\n- Turn-based movement through each world (like Mario Party, but without stars)\n- Players advance by rolling, moving through steps, and playing short mini-games to earn points\n- Mini-games are simple, fun, and take less than 3 minutes to play\n\nWe're looking for a Unity developer to build the entire app, not just the mini-games. This includes the core game loop, world navigation, player progression, and integration of multiple mini-games. Ideally, you'll use existing Unity assets or plugins to reduce cost and speed up development.\n\nExample mini-games: Puzzle, Memory Flip, Rope Pull\nWe're cost-conscious — please suggest ready-made or simple mini-game templates where possible.\n\nIf you're interested, send your portfolio`,
      aiSummary: "Build a 2D mobile game inspired by Mario Party, including a main map, themed worlds, and simple mini-games. The developer will handle the full app, from core gameplay to mini-game integration, using Unity and ready-made assets where possible.",
      howToApply: "Send your portfolio",
      budget: "$2,000 - $4,000",
      budgetType: "Fixed price",
      client: {
        name: "GameStudioX",
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
      category: "Game Development",
      featured: true,
      urgent: false,
      connectsRequired: 6,
      isUnread: true,
      deliveryDate: null as string | null,
    },
    {
      id: 2,
      matchScore: 90,
      title: "Development of a 2D web based animated 'car delivery' game",
      highlights: "Develop a 2D web-based animated car delivery game for an event stand. Engage attendees with a simple, offline-enabled tablet game.",
      description: `I have a potential project to develop a 2D based, tablet game for use on an event stand to engage attendees.\n\nThe delivery date is 1st October 2025.\n\nLonger description:\nWe're looking for ways to engage people on the stand, and one idea that they're keen to explore is a relatively simple online game that people can play on tablets on the exhibition stand. It would be more as a way of engaging guests and helping people to really understand and remember the key selling points of the vehicles.\n\nOur working idea for the game is that it'd be based around navigating city streets, aiming to make as many deliveries as possible in a fixed time e.g. 2 minutes.\n\nIt would need to be fully animated and offline enabled for tablet use.\n\nCurrently we are are looking for a ballpark cost to guide the client and set expectations.`,
      aiSummary: "Create a simple, animated 2D car delivery game for tablets, designed to engage event attendees. The game should work offline, focus on city navigation and deliveries, and be ready by October 1, 2025.",
      howToApply: null as string | null,
      budget: "$3,000 - $6,000",
      budgetType: "Fixed price",
      client: {
        name: "EventGamesCo",
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
      category: "Game Development",
      featured: false,
      urgent: false,
      connectsRequired: 4,
      isUnread: true,
      deliveryDate: "1st October 2025",
    },
  ].map((job, idx) => ({
    ...job,
    isUnread: idx < 2 // Only first two jobs are unread
  })))

  const { toast } = useToast()
  const isMobile = useIsMobile()

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => {
      const isSaved = prev.includes(jobId)
      const newSaved = isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId]
      toast({
        title: isSaved ? "Job removed from saved" : "Job saved!",
        description: isSaved
          ? "This job has been removed from your saved list."
          : "You can view your saved jobs in your dashboard.",
      })
      return newSaved
    })
  }

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case "Entry":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Expert":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || job.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const jobsToShow = filteredJobs.slice(0, displayedJobs)

  const loadMoreJobs = async () => {
    setIsLoading(true)
    const delay = Math.floor(Math.random() * 2000) + 2000
    await new Promise(resolve => setTimeout(resolve, delay))
    const nextId = jobs.length + 1
    const newJobs: Job[] = Array.from({ length: 5 }).map((_, i) => {
      const title = `New Job ${nextId + i}`
      const description = "This is a newly loaded job. The project is looking for a skilled developer."
      return {
        id: nextId + i,
        matchScore: Math.floor(Math.random() * 30) + 70,
        title,
        highlights: "A new opportunity for developers.",
        description,
        aiSummary: `Quick summary: ${title} - ${description}`,
        howToApply: null,
        budget: "$1,000 - $2,000",
        budgetType: "Fixed price",
        client: {
          name: "New Client",
          location: "Remote",
          rating: 4.5,
          reviewCount: 10,
          totalSpent: "$5K+",
          verified: false,
          memberSince: "2023",
        },
        skills: ["JavaScript", "React"],
        proposals: Math.floor(Math.random() * 50),
        timePosted: "just now",
        duration: "1 to 3 months",
        experienceLevel: "Intermediate",
        category: "Web Development",
        featured: false,
        urgent: false,
        connectsRequired: 2,
        isUnread: true,
        deliveryDate: null,
      }
    })
    setJobs((prev: Job[]) => [...prev, ...newJobs])
    setDisplayedJobs(prev => prev + 5)
    setIsLoading(false)
  }

  return (
    <div className={`flex flex-col gap-6 sm:gap-8 p-2 sm:p-4 md:p-6 max-w-full mx-auto animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen`}>
      {/* Header Section */}
      <div className={isMobile ? "animate-fade-in mb-3" : "animate-fade-in mb-6"}>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-extrabold tracking-tight flex items-center gap-2`}>
          <Sparkles className={`${isMobile ? 'h-5 w-5' : 'h-7 w-7'} text-primary animate-bounce`} />
          <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Job Feed</span>
        </h1>
        <span className={`${isMobile ? 'text-base' : 'text-lg'} text-muted-foreground font-light mt-1`}>Browse the latest jobs curated for you</span>
      </div>

      {/* Results Header */}
      <div className={`flex items-center justify-between pt-2 ${isMobile ? 'text-xs' : ''}`}>
        <p className="text-sm text-muted-foreground">{jobs.length} jobs found</p>
        {/* No sort/filter controls for a cleaner look */}
      </div>

      {/* Job Cards */}
      <div className="flex flex-col items-center w-full gap-6 sm:gap-8">
        {jobs.slice(0, displayedJobs).map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            index={index}
            onProposal={() => onNavigate("proposal-editor")}
            isMobile={isMobile}
            onClick={(job) => { setSelectedJob(job); onNavigate("job-details"); }}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" className={`w-full sm:w-auto rounded-xl animate-fade-in ${isMobile ? 'text-base py-2' : ''}`} onClick={loadMoreJobs} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Load More Jobs
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
