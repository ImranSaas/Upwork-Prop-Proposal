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
} from "lucide-react"
import type { Screen } from "@/app/page"
import { useToast } from "@/components/ui/use-toast"

interface JobFeedScreenProps {
  onNavigate: (screen: Screen) => void
}

export function JobFeedScreen({ onNavigate }: JobFeedScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [jobs, setJobs] = useState([
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
      deliveryDate: null,
    },
    {
      id: 2,
      matchScore: 90,
      title: "Development of a 2D web based animated 'car delivery' game",
      highlights: "Develop a 2D web-based animated car delivery game for an event stand. Engage attendees with a simple, offline-enabled tablet game.",
      description: `I have a potential project to develop a 2D based, tablet game for use on an event stand to engage attendees.\n\nThe delivery date is 1st October 2025.\n\nLonger description:\nWe're looking for ways to engage people on the stand, and one idea that they're keen to explore is a relatively simple online game that people can play on tablets on the exhibition stand. It would be more as a way of engaging guests and helping people to really understand and remember the key selling points of the vehicles.\n\nOur working idea for the game is that it'd be based around navigating city streets, aiming to make as many deliveries as possible in a fixed time e.g. 2 minutes.\n\nIt would need to be fully animated and offline enabled for tablet use.\n\nCurrently we are are looking for a ballpark cost to guide the client and set expectations.`,
      aiSummary: "Create a simple, animated 2D car delivery game for tablets, designed to engage event attendees. The game should work offline, focus on city navigation and deliveries, and be ready by October 1, 2025.",
      howToApply: null,
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
  ])

  const { toast } = useToast()

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

  const loadMoreJobs = async () => {
    setIsLoading(true)
    const delay = Math.floor(Math.random() * 2000) + 2000
    await new Promise(resolve => setTimeout(resolve, delay))
    const nextId = jobs.length + 1
    const newJobs = Array.from({ length: 5 }).map((_, i) => {
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
    setJobs(prev => [...prev, ...newJobs])
    setDisplayedJobs(prev => prev + 5)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Job Feed</h1>
            <p className="text-muted-foreground">Discover opportunities that match your skills</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="proposals">Proposals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <Card
              key={job.id}
              className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
                job.featured ? "border-primary/50 bg-primary/5" : ""
              }`}
              onClick={() => onNavigate("job-details")}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Job Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {job.featured && (
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{job.budget}</span>
                          <span>({job.budgetType})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.duration}</span>
                        </div>
                        <Badge className={getExperienceBadgeColor(job.experienceLevel)}>{job.experienceLevel}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveJob(job.id)
                      }}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Heart className={`h-5 w-5 ${savedJobs.includes(job.id) ? "fill-current text-red-500" : ""}`} />
                    </Button>
                  </div>

                  {/* AI Summary */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-primary mb-1">AI Job Summary</p>
                        <p className="text-sm leading-relaxed">{job.aiSummary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{job.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Separator />

                  {/* Client Info and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Client Info */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          {/* Removed client name */}
                        </div>
                        {job.client && (
                        <div>
                          <div className="flex items-center gap-1">
                              {/* Removed client name */}
                            {job.client.verified && <Verified className="h-3 w-3 text-blue-500" />}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{job.client.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{job.client.rating}</span>
                              <span>({job.client.reviewCount})</span>
                            </div>
                            <span>{job.client.totalSpent} spent</span>
                          </div>
                        </div>
                        )}
                      </div>
                    </div>

                    {/* Job Stats and Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{(() => {
                            if (job.proposals < 5) return 'Less than 5';
                            if (job.proposals < 10) return '5 to 10';
                            if (job.proposals < 15) return '10 to 15';
                            if (job.proposals < 50) return '20 to 50';
                            return '50+';
                          })()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{job.timePosted}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onNavigate("proposal-editor")
                        }}
                        className="hover-lift"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Generate Proposal
                      </Button>
                    </div>
                  </div>

                  {/* Connects Required */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 rounded p-2">
                    <span>Connects required: {job.connectsRequired}</span>
                    <span>Member since {job.client.memberSince}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-6">
          <Button variant="outline" className="w-full sm:w-auto">
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  )
}
