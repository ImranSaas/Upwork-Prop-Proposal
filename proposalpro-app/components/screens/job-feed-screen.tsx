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

interface JobFeedScreenProps {
  onNavigate: (screen: Screen) => void
}

export function JobFeedScreen({ onNavigate }: JobFeedScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const jobs = [
    {
      id: 1,
      title: "Build a React.js E-commerce Platform with Advanced Features",
      description:
        "I'm looking for an experienced React.js developer to build a comprehensive e-commerce platform. The project includes user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Must have experience with modern React patterns, state management, and API integration.",
      aiSummary:
        "🎯 **Perfect Match**: E-commerce platform using React.js with full-stack features. Requires 3+ years React experience, payment integration skills, and modern development practices. Great for developers with e-commerce background.",
      budget: "$3,000 - $5,000",
      budgetType: "Fixed price",
      client: {
        name: "TechCorp Solutions",
        location: "United States",
        rating: 4.9,
        reviewCount: 127,
        totalSpent: "$50K+",
        verified: true,
        memberSince: "2019",
      },
      skills: ["React", "JavaScript", "Node.js", "MongoDB", "Stripe API", "Redux"],
      proposals: 15,
      timePosted: "2 hours ago",
      duration: "1 to 3 months",
      experienceLevel: "Intermediate",
      category: "Web Development",
      featured: true,
      urgent: false,
      connectsRequired: 6,
    },
    {
      id: 2,
      title: "Mobile App Development - React Native for Healthcare Platform",
      description:
        "We need a skilled React Native developer to create a healthcare mobile application. The app will include patient management, appointment scheduling, telemedicine features, and secure messaging. HIPAA compliance knowledge is preferred.",
      aiSummary:
        "🏥 **Healthcare Focus**: React Native mobile app with telemedicine features. Requires healthcare/HIPAA experience, real-time messaging, and appointment systems. High-value project with growth potential.",
      budget: "$40 - $60/hr",
      budgetType: "Hourly",
      client: {
        name: "HealthTech Innovations",
        location: "Canada",
        rating: 4.8,
        reviewCount: 89,
        totalSpent: "$100K+",
        verified: true,
        memberSince: "2020",
      },
      skills: ["React Native", "TypeScript", "Firebase", "WebRTC", "HIPAA", "Socket.io"],
      proposals: 8,
      timePosted: "4 hours ago",
      duration: "3 to 6 months",
      experienceLevel: "Expert",
      category: "Mobile Development",
      featured: false,
      urgent: true,
      connectsRequired: 8,
    },
    {
      id: 3,
      title: "Full-Stack Developer Needed for SaaS Dashboard",
      description:
        "Looking for a full-stack developer to build a comprehensive SaaS dashboard. The project includes user management, analytics, billing integration, and real-time data visualization. Experience with modern frameworks and cloud deployment required.",
      aiSummary:
        "📊 **SaaS Opportunity**: Full-stack dashboard with analytics and billing. Needs cloud deployment experience, data visualization skills, and SaaS architecture knowledge. Long-term partnership potential.",
      budget: "$4,500 - $7,500",
      budgetType: "Fixed price",
      client: {
        name: "StartupXYZ",
        location: "United Kingdom",
        rating: 4.7,
        reviewCount: 45,
        totalSpent: "$25K+",
        verified: false,
        memberSince: "2022",
      },
      skills: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe", "Chart.js"],
      proposals: 23,
      timePosted: "6 hours ago",
      duration: "1 to 3 months",
      experienceLevel: "Intermediate",
      category: "Web Development",
      featured: false,
      urgent: false,
      connectsRequired: 4,
    },
    {
      id: 4,
      title: "WordPress Website Redesign with Custom Theme Development",
      description:
        "We need a WordPress expert to redesign our existing website with a custom theme. The project includes responsive design, SEO optimization, performance improvements, and custom post types. Must have strong design and development skills.",
      aiSummary:
        "🎨 **Design + Dev**: WordPress redesign with custom theme development. Requires design skills, SEO knowledge, and performance optimization. Good for WordPress specialists with design background.",
      budget: "$1,500 - $3,000",
      budgetType: "Fixed price",
      client: {
        name: "Digital Marketing Pro",
        location: "Australia",
        rating: 4.6,
        reviewCount: 67,
        totalSpent: "$15K+",
        verified: true,
        memberSince: "2021",
      },
      skills: ["WordPress", "PHP", "CSS", "JavaScript", "SEO", "Figma"],
      proposals: 31,
      timePosted: "8 hours ago",
      duration: "Less than 1 month",
      experienceLevel: "Intermediate",
      category: "Web Development",
      featured: false,
      urgent: false,
      connectsRequired: 2,
    },
    {
      id: 5,
      title: "AI-Powered Data Analytics Platform Development",
      description:
        "Seeking an experienced developer to build an AI-powered data analytics platform. The project involves machine learning integration, data visualization, real-time processing, and API development. Strong Python and ML experience required.",
      aiSummary:
        "🤖 **AI/ML Project**: Data analytics platform with machine learning integration. Requires Python expertise, ML knowledge, and data visualization skills. High-tech project with cutting-edge technologies.",
      budget: "$60 - $80/hr",
      budgetType: "Hourly",
      client: {
        name: "DataFlow Analytics",
        location: "Germany",
        rating: 4.9,
        reviewCount: 156,
        totalSpent: "$200K+",
        verified: true,
        memberSince: "2018",
      },
      skills: ["Python", "Machine Learning", "TensorFlow", "React", "PostgreSQL", "Docker"],
      proposals: 12,
      timePosted: "1 day ago",
      duration: "3 to 6 months",
      experienceLevel: "Expert",
      category: "Data Science",
      featured: true,
      urgent: false,
      connectsRequired: 10,
    },
  ]

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
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
                          <span className="text-xs font-semibold text-primary">{job.client.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{job.client.name}</span>
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
                      </div>
                    </div>

                    {/* Job Stats and Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{job.proposals} proposals</span>
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
                        Apply Now
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
