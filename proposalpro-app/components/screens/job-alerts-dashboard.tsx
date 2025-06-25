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

interface JobAlertsDashboardProps {
  onNavigate: (screen: Screen) => void
  setSelectedJob: (job: any) => void
}

// Add Job type
interface Job {
  id: number;
  matchScore: number;
  title: string;
  highlights: string;
  description: string;
  aiSummary: string;
  ai: {
    summary: string;
    deliverables: string[];
    approach: { title: string; desc: string }[];
  };
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

export function JobAlertsDashboard({ onNavigate, setSelectedJob }: JobAlertsDashboardProps) {
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
      ai: {
        summary: "Develop a 2D mobile game inspired by Mario Party for a global audience. You will build the main map, themed worlds, turn-based movement, and integrate several short, fun mini-games. The project requires handling the entire app lifecycle, from core gameplay to player progression, using Unity and leveraging existing assets to optimize cost and speed.",
        deliverables: [
          "Fully functional 2D mobile game app (iOS & Android)",
          "Main map with multiple themed worlds",
          "Turn-based movement system",
          "Integration of at least 3 mini-games (e.g., Puzzle, Memory Flip, Rope Pull)",
          "Player progression and scoring system",
          "Use of ready-made Unity assets/plugins where possible"
        ],
        approach: [
          { title: "Project Planning", desc: "Review requirements, select Unity assets, and outline the game structure." },
          { title: "Core Game Loop", desc: "Develop the main map, world navigation, and turn-based movement system." },
          { title: "Mini-Game Integration", desc: "Design and integrate at least 3 mini-games, ensuring each is simple and fun." },
          { title: "Player Progression", desc: "Implement scoring, progression, and reward systems." },
          { title: "Testing & Optimization", desc: "Test gameplay, optimize performance, and ensure a smooth user experience." },
          { title: "Deployment", desc: "Prepare builds for iOS and Android, and assist with app store submission if needed." }
        ]
      },
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
      ai: {
        summary: "Build a 2D animated car delivery game for use on event stand tablets. The game should engage attendees by letting them navigate city streets and make as many deliveries as possible in a fixed time. It must be fully animated, work offline, and highlight the key selling points of the vehicles.",
        deliverables: [
          "2D web-based car delivery game, tablet-ready",
          "Animated city map and delivery routes",
          "Timed delivery gameplay (e.g., 2 minutes per session)",
          "Offline functionality for exhibition use",
          "Engagement features to highlight vehicle selling points"
        ],
        approach: [
          { title: "Requirements Gathering", desc: "Clarify event goals, delivery mechanics, and key vehicle features to highlight." },
          { title: "Game Design", desc: "Design city map, delivery routes, and user interface for tablets." },
          { title: "Animation & Offline Support", desc: "Implement animations and ensure the game works without internet." },
          { title: "Gameplay Mechanics", desc: "Develop delivery logic, scoring, and time limits." },
          { title: "Testing & Feedback", desc: "Test on tablets, gather feedback, and refine gameplay." },
          { title: "Deployment", desc: "Prepare the game for event use and provide support during the exhibition." }
        ]
      },
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
    // Add 3 more realistic jobs
    {
      id: 3,
      matchScore: 87,
      title: "React Developer for SaaS Dashboard UI Overhaul",
      highlights: "Redesign and implement a modern UI for an existing SaaS dashboard using React and Tailwind CSS.",
      description: `We're seeking a React developer to overhaul the UI of our SaaS dashboard.\n\n- Implement new designs from Figma\n- Ensure responsive and accessible layouts\n- Integrate with existing REST APIs\n- Optimize for performance and usability\n\nExperience with Tailwind CSS and Figma required.`,
      aiSummary: "Redesign a SaaS dashboard UI using React and Tailwind CSS. You'll implement Figma designs, ensure responsiveness, and integrate with REST APIs.",
      ai: {
        summary: "Overhaul the UI of an existing SaaS dashboard using React and Tailwind CSS. You'll implement new designs from Figma, ensure the dashboard is responsive and accessible, and integrate with REST APIs for dynamic data. The focus is on modern design, usability, and performance.",
        deliverables: [
          "Redesigned SaaS dashboard UI in React",
          "Responsive layouts for desktop and mobile",
          "Integration with REST APIs for live data",
          "Implementation of Figma design specs",
          "Performance and accessibility improvements"
        ],
        approach: [
          { title: "Design Review", desc: "Analyze Figma files and plan component structure." },
          { title: "Component Development", desc: "Build reusable React components with Tailwind CSS." },
          { title: "API Integration", desc: "Connect UI components to REST APIs for dynamic content." },
          { title: "Testing & QA", desc: "Test responsiveness, accessibility, and performance." },
          { title: "Deployment", desc: "Deploy the new UI and monitor user feedback." }
        ]
      },
      howToApply: "Share your portfolio and relevant React projects",
      budget: "$1,500 - $2,500",
      budgetType: "Fixed price",
      client: {
        name: "SaaSify Inc.",
        location: "Canada",
        rating: 4.9,
        reviewCount: 40,
        totalSpent: "$20K+",
        verified: true,
        memberSince: "2019",
      },
      skills: ["React", "Tailwind CSS", "Figma", "REST API", "UI/UX"],
      proposals: 18,
      timePosted: "2 hours ago",
      duration: "1 to 3 months",
      experienceLevel: "Intermediate",
      category: "Web Development",
      featured: false,
      urgent: false,
      connectsRequired: 4,
      isUnread: false,
      deliveryDate: null,
    },
    {
      id: 4,
      matchScore: 92,
      title: "Python Data Engineer for ETL Pipeline Automation",
      highlights: "Automate ETL pipelines for a fintech company using Python and cloud services.",
      description: `Looking for a data engineer to automate ETL pipelines.\n\n- Build and maintain data ingestion scripts\n- Work with AWS Lambda and S3\n- Ensure data quality and reliability\n- Collaborate with analytics team\n\nExperience with Python, AWS, and ETL best practices required.`,
      aiSummary: "Automate ETL pipelines for a fintech company using Python and AWS. Maintain scripts, ensure data quality, and collaborate with analytics.",
      ai: {
        summary: "Automate and maintain ETL pipelines for a fintech company using Python and AWS. You'll build data ingestion scripts, ensure data quality, and collaborate with the analytics team to deliver reliable data for business insights.",
        deliverables: [
          "Automated ETL pipelines in Python",
          "Data ingestion scripts for AWS Lambda and S3",
          "Documentation for pipeline processes",
          "Data quality and reliability reports"
        ],
        approach: [
          { title: "Requirements Analysis", desc: "Gather ETL requirements and define data sources and targets." },
          { title: "Pipeline Development", desc: "Develop and test Python scripts for data ingestion and transformation." },
          { title: "Cloud Integration", desc: "Deploy ETL processes using AWS Lambda and S3." },
          { title: "Quality Assurance", desc: "Implement data validation and monitoring." },
          { title: "Documentation & Handover", desc: "Document the pipeline and train the analytics team." }
        ]
      },
      howToApply: "Send your resume and ETL project examples",
      budget: "$2,000 - $3,500",
      budgetType: "Fixed price",
      client: {
        name: "FinData Solutions",
        location: "Germany",
        rating: 4.8,
        reviewCount: 28,
        totalSpent: "$18K+",
        verified: true,
        memberSince: "2021",
      },
      skills: ["Python", "AWS Lambda", "ETL", "S3", "Data Engineering"],
      proposals: 10,
      timePosted: "4 hours ago",
      duration: "1 to 3 months",
      experienceLevel: "Expert",
      category: "Data Science",
      featured: false,
      urgent: false,
      connectsRequired: 5,
      isUnread: false,
      deliveryDate: null,
    },
    {
      id: 5,
      matchScore: 85,
      title: "WordPress Developer for Membership Site Customization",
      highlights: "Customize a WordPress membership site with new features and payment integration.",
      description: `Need a WordPress developer to add features to a membership site.\n\n- Integrate Stripe payments\n- Add member-only content areas\n- Improve site speed and SEO\n- Provide ongoing support\n\nExperience with WordPress plugins and Stripe required.`,
      aiSummary: "Customize a WordPress membership site, add Stripe payments, member content, and improve speed/SEO.",
      ai: {
        summary: "Customize and enhance a WordPress membership site by adding new features, integrating Stripe payments, and improving site speed and SEO. The project includes creating member-only content areas and providing ongoing support.",
        deliverables: [
          "Customized WordPress membership site",
          "Stripe payment integration",
          "Member-only content areas",
          "Improved site speed and SEO",
          "Ongoing support documentation"
        ],
        approach: [
          { title: "Requirements Gathering", desc: "Discuss desired features and payment flows with the client." },
          { title: "Plugin & Payment Integration", desc: "Integrate Stripe and configure necessary plugins." },
          { title: "Content & Access Control", desc: "Set up member-only content and access rules." },
          { title: "Performance & SEO", desc: "Optimize site speed and implement SEO best practices." },
          { title: "Support & Handover", desc: "Provide documentation and support for ongoing maintenance." }
        ]
      },
      howToApply: "Include WordPress membership sites you've built",
      budget: "$1,000 - $2,000",
      budgetType: "Fixed price",
      client: {
        name: "EduWeb Group",
        location: "Australia",
        rating: 4.6,
        reviewCount: 22,
        totalSpent: "$8K+",
        verified: true,
        memberSince: "2017",
      },
      skills: ["WordPress", "Stripe", "SEO", "PHP", "Performance"],
      proposals: 15,
      timePosted: "5 hours ago",
      duration: "Less than 1 month",
      experienceLevel: "Intermediate",
      category: "Web Development",
      featured: false,
      urgent: false,
      connectsRequired: 3,
      isUnread: false,
      deliveryDate: null,
    },
  ])

  // Sort jobs so unread jobs appear first
  const sortedJobs = jobs.slice().sort((a, b) => (a.isUnread === b.isUnread) ? 0 : a.isUnread ? -1 : 1)

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

  const filteredJobs = sortedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || job.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  // Load more jobs logic
  const loadMoreJobs = async () => {
    setIsLoading(true)
    const delay = Math.floor(Math.random() * 2000) + 2000
    await new Promise(resolve => setTimeout(resolve, delay))
    const nextId = jobs.length + 1
    const moreJobs: Job[] = [
      {
        id: nextId,
        matchScore: 88,
        title: "Vue.js Frontend Developer for E-commerce Platform",
        highlights: "Develop new features and maintain a large-scale e-commerce frontend using Vue.js.",
        description: `Join our frontend team to build and maintain a Vue.js e-commerce platform.\n\n- Implement new UI components\n- Optimize for performance\n- Collaborate with backend team\n\nExperience with Vue.js and large-scale apps required.`,
        aiSummary: "Work on a Vue.js e-commerce frontend, build UI components, and optimize performance.",
        ai: {
          summary: "Develop a large-scale e-commerce frontend using Vue.js. You'll implement new UI components, optimize for performance, and collaborate with the backend team to deliver a seamless shopping experience.",
          deliverables: [
            "Fully functional Vue.js e-commerce frontend",
            "New UI components for enhanced user experience",
            "Optimized performance for large-scale applications",
            "Collaboration with backend team for seamless integration"
          ],
          approach: [
            { title: "Requirements Gathering", desc: "Clarify e-commerce platform requirements and user needs." },
            { title: "Component Development", desc: "Develop new UI components and optimize existing ones." },
            { title: "Performance Optimization", desc: "Implement performance improvements and integrate with backend APIs." },
            { title: "Collaboration", desc: "Collaborate with backend team to ensure seamless integration and user experience." },
            { title: "Testing & Deployment", desc: "Test components, optimize performance, and deploy updates." }
          ]
        },
        howToApply: "Share your Vue.js portfolio",
        budget: "$2,200 - $3,000",
        budgetType: "Fixed price",
        client: {
          name: "ShopTech",
          location: "France",
          rating: 4.7,
          reviewCount: 35,
          totalSpent: "$15K+",
          verified: true,
          memberSince: "2018",
        },
        skills: ["Vue.js", "JavaScript", "Frontend", "E-commerce", "UI Components"],
        proposals: 13,
        timePosted: "6 hours ago",
        duration: "1 to 3 months",
        experienceLevel: "Intermediate",
        category: "Web Development",
        featured: false,
        urgent: false,
        connectsRequired: 4,
        isUnread: false,
        deliveryDate: null,
      },
      {
        id: nextId + 1,
        matchScore: 91,
        title: "iOS Swift Developer for Fitness App Enhancements",
        highlights: "Enhance a fitness tracking app with new features and Apple Health integration.",
        description: `Looking for an iOS developer to add features to our fitness app.\n\n- Integrate Apple HealthKit\n- Add workout tracking and analytics\n- Improve UI/UX\n\nSwift and HealthKit experience required.`,
        aiSummary: "Enhance a fitness app with Apple HealthKit, workout tracking, and analytics.",
        ai: {
          summary: "Enhance a fitness app with Apple HealthKit, workout tracking, and analytics. The project includes integrating Apple HealthKit for workout tracking and analytics, improving UI/UX, and adding new features for enhanced user experience.",
          deliverables: [
            "Enhanced fitness app with Apple HealthKit integration",
            "Workout tracking and analytics",
            "Improved UI/UX",
            "New features for enhanced user experience"
          ],
          approach: [
            { title: "Requirements Gathering", desc: "Clarify fitness app requirements and user needs." },
            { title: "HealthKit Integration", desc: "Integrate Apple HealthKit for workout tracking and analytics." },
            { title: "UI/UX Improvement", desc: "Improve user interface and user experience." },
            { title: "Feature Addition", desc: "Add new features for enhanced user experience." },
            { title: "Testing & Deployment", desc: "Test the app, gather feedback, and deploy updates." }
          ]
        },
        howToApply: "Send your iOS app portfolio",
        budget: "$2,500 - $4,000",
        budgetType: "Fixed price",
        client: {
          name: "FitTech",
          location: "United States",
          rating: 4.9,
          reviewCount: 60,
          totalSpent: "$40K+",
          verified: true,
          memberSince: "2016",
        },
        skills: ["iOS", "Swift", "HealthKit", "UI/UX", "Analytics"],
        proposals: 11,
        timePosted: "7 hours ago",
        duration: "1 to 3 months",
        experienceLevel: "Expert",
        category: "Mobile Development",
        featured: false,
        urgent: false,
        connectsRequired: 5,
        isUnread: false,
        deliveryDate: null,
      },
      {
        id: nextId + 2,
        matchScore: 86,
        title: "Shopify Developer for Custom Theme & App Integration",
        highlights: "Customize Shopify themes and integrate third-party apps for a growing online store.",
        description: `Need a Shopify expert to customize our store.\n\n- Develop custom themes\n- Integrate third-party apps\n- Optimize for conversions\n\nShopify and Liquid experience required.`,
        aiSummary: "Customize Shopify themes, integrate apps, and optimize for conversions.",
        ai: {
          summary: "Customize Shopify themes and integrate third-party apps for a growing online store. The project includes developing custom themes, integrating third-party apps, and optimizing for conversions to increase sales and customer engagement.",
          deliverables: [
            "Customized Shopify themes",
            "Integrated third-party apps",
            "Optimized for conversions",
            "Increased sales and customer engagement"
          ],
          approach: [
            { title: "Requirements Gathering", desc: "Clarify store customization requirements and customer needs." },
            { title: "Theme Development", desc: "Develop custom themes and integrate third-party apps." },
            { title: "Optimization", desc: "Optimize themes and apps for conversions and customer engagement." },
            { title: "Testing & Deployment", desc: "Test the store, gather feedback, and deploy updates." },
            { title: "Support & Handover", desc: "Provide documentation and support for ongoing maintenance." }
          ]
        },
        howToApply: "Share Shopify stores you've built",
        budget: "$1,800 - $2,800",
        budgetType: "Fixed price",
        client: {
          name: "TrendShop",
          location: "United Kingdom",
          rating: 4.8,
          reviewCount: 25,
          totalSpent: "$10K+",
          verified: true,
          memberSince: "2020",
        },
        skills: ["Shopify", "Liquid", "App Integration", "Theme Development", "E-commerce"],
        proposals: 9,
        timePosted: "8 hours ago",
        duration: "Less than 1 month",
        experienceLevel: "Intermediate",
        category: "E-commerce",
        featured: false,
        urgent: false,
        connectsRequired: 3,
        isUnread: false,
        deliveryDate: null,
      },
    ];
    // Add 4 more random jobs to reach 10
    const randomJobs = Array.from({ length: 4 }).map((_, i) => {
      const id = nextId + 3 + i;
      const title = `Remote Developer Opportunity #${id}`;
      const description = "Join our team for a variety of remote development projects. Flexible hours and competitive pay.";
      return {
        id,
        matchScore: Math.floor(Math.random() * 30) + 70,
        title,
        highlights: "Remote developer role for various projects.",
        description,
        aiSummary: `Remote dev role: ${description}`,
        ai: {
          summary: "Remote developer role for various projects. Join our team for a variety of remote development projects. Flexible hours and competitive pay.",
          deliverables: [
            "Contributions to multiple remote projects",
            "Collaboration with distributed teams",
            "Timely delivery of assigned tasks"
          ],
          approach: [
            { title: "Onboarding", desc: "Join the team, set up your environment, and review project documentation." },
            { title: "Task Execution", desc: "Work on assigned tasks, communicate progress, and collaborate as needed." },
            { title: "Review & Delivery", desc: "Submit work for review, address feedback, and deliver final outputs." }
          ]
        },
        howToApply: "Apply with your resume and GitHub.",
        budget: "$1,500 - $3,000",
        budgetType: "Fixed price",
        client: {
          name: "RemoteWorks",
          location: "Global",
          rating: 4.7,
          reviewCount: 50,
          totalSpent: "$25K+",
          verified: true,
          memberSince: "2015",
        },
        skills: ["Remote", "Full Stack", "Agile", "Communication", "Collaboration"],
        proposals: Math.floor(Math.random() * 50),
        timePosted: "just now",
        duration: "1 to 3 months",
        experienceLevel: "Intermediate",
        category: "Remote Work",
        featured: false,
        urgent: false,
        connectsRequired: 2,
        isUnread: false,
        deliveryDate: null,
      };
    });
    const newJobs = [
      ...moreJobs,
      ...randomJobs
    ];
    setJobs(prev => [...prev, ...newJobs]);
    setDisplayedJobs(prev => prev + newJobs.length);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Job Alerts</h1>
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
          {filteredJobs.slice(0, displayedJobs).map((job, index) => (
            <Card
              key={job.id}
              className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
                job.featured ? "border-primary/50 bg-primary/5" : ""
              } ${job.isUnread ? "bg-green-100/40 dark:bg-green-700/15" : "bg-white dark:bg-background"}`}
              onClick={() => {
                if (job.isUnread) {
                  setJobs(prevJobs => prevJobs.map(j => j.id === job.id ? { ...j, isUnread: false } : j))
                }
                setSelectedJob(job)
                onNavigate("job-details")
              }}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Job Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {job.isUnread && (
                          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500" />
                        )}
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
                      <h3 className={`text-lg mb-2 hover:text-primary transition-colors ${job.isUnread ? "font-bold" : "font-normal"}`}>{job.title}</h3>
                      {/* Match Score (Job Alerts only) */}
                      <div className="mb-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">Match Score: {job.matchScore}%</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{job.budget}</span>
                          <span>({job.budgetType})</span>
                        </div>
                        {job.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.duration}</span>
                          </div>
                        )}
                        {job.experienceLevel && (
                          <Badge className={getExperienceBadgeColor(job.experienceLevel)}>{job.experienceLevel}</Badge>
                        )}
                      </div>
                    </div>
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
                        {job.proposals && (
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
                        )}
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
          <Button variant="outline" className="w-full sm:w-auto" onClick={loadMoreJobs} disabled={isLoading}>
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
    </div>
  )
}
