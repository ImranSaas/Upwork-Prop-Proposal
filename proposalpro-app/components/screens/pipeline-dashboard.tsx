"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock, Search, Filter, Move, Send, Eye, Users, CheckCircle, XCircle, Briefcase } from "lucide-react"
import type { Screen } from "@/app/page"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { addDays, subMonths, subYears, isAfter, parseISO } from "date-fns"
import { Separator } from "@/components/ui/separator"

interface PipelineDashboardProps {
  onNavigate: (screen: Screen) => void
  setSelectedProposal: (proposal: any) => void
}

interface Job {
  id: number
  title: string
  client: string
  value: number
  date: string
  status: string
  aiNudge?: string | null
}

export function PipelineDashboard({ onNavigate, setSelectedProposal }: PipelineDashboardProps) {
  const columns = [
    { id: "applied", title: "Applied", color: "bg-blue-50 border-blue-200" },
    { id: "viewed", title: "Viewed", color: "bg-yellow-50 border-yellow-200" },
    { id: "interviewing", title: "Interviewing", color: "bg-green-50 border-green-200" },
    { id: "hired", title: "Hired", color: "bg-emerald-50 border-emerald-200" },
    { id: "ghosted", title: "Ghosted/Lost", color: "bg-red-50 border-red-200" },
  ]

  const [jobs, setJobs] = useState<Record<string, Job[]>>({
    applied: [
      { id: 1, title: "React E-commerce Platform", client: "TechCorp", value: 8500, date: "2024-06-01", status: "Applied", aiNudge: "Tip: Follow up in 2 days" },
      { id: 2, title: "Mobile App Development", client: "StartupXYZ", value: 12000, date: "2024-06-03", status: "Applied", aiNudge: null },
    ],
    viewed: [
      { id: 3, title: "WordPress Redesign", client: "Local Biz", value: 3500, date: "2024-06-02", status: "Viewed", aiNudge: "This proposal had high fit." },
    ],
    interviewing: [
      { id: 4, title: "Fintech Platform", client: "FinanceFlow", value: 15000, date: "2024-06-04", status: "Interviewing", aiNudge: "Great! They're interested in your proposal." },
    ],
    hired: [
      { id: 5, title: "CRM System", client: "SalesPro", value: 9000, date: "2024-05-20", status: "Hired", aiNudge: "Congratulations! You got the job!" },
    ],
    ghosted: [
      { id: 6, title: "Inventory Management", client: "RetailCorp", value: 6500, date: "2024-05-15", status: "Ghosted", aiNudge: null },
    ],
  })

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [draggedJob, setDraggedJob] = useState<{ job: Job; sourceColumn: string } | null>(null)

  const filterByDateRange = (job: Job) => {
    if (dateRange === "all") return true
    const today = new Date()
    const jobDate = parseISO(job.date)
    switch (dateRange) {
      case "7d":
        return isAfter(jobDate, addDays(today, -7))
      case "30d":
        return isAfter(jobDate, addDays(today, -30))
      case "3m":
        return isAfter(jobDate, subMonths(today, 3))
      case "6m":
        return isAfter(jobDate, subMonths(today, 6))
      case "1y":
        return isAfter(jobDate, subYears(today, 1))
      case "2024":
        return job.date.startsWith("2024")
      default:
        return true
    }
  }

  const getFilteredJobs = (columnId: string) => {
    return (jobs[columnId] || []).filter((job) => {
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.client.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || job.status === statusFilter
      const matchesDateRange = filterByDateRange(job)
      return matchesSearch && matchesStatus && matchesDateRange
    })
  }

  const handleDragStart = (e: React.DragEvent, job: Job, sourceColumn: string) => {
    setDraggedJob({ job, sourceColumn })
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault()
    if (!draggedJob) return

    const { job, sourceColumn } = draggedJob
    if (sourceColumn === targetColumn) return

    // Update job status
    const updatedJob = { ...job, status: targetColumn.charAt(0).toUpperCase() + targetColumn.slice(1) }

    // Remove from source column
    setJobs(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(j => j.id !== job.id)
    }))

    // Add to target column
    setJobs(prev => ({
      ...prev,
      [targetColumn]: [...(prev[targetColumn] || []), updatedJob]
    }))

    setDraggedJob(null)
  }

  const analytics = {
    applied: 14,
    viewed: 3,
    interviewing: 2,
    hired: 1,
    ghosted: 1,
  }

  const columnIcons: Record<string, React.ReactNode> = {
    applied: <Send className="h-5 w-5 text-blue-400" />,
    viewed: <Eye className="h-5 w-5 text-yellow-400" />,
    interviewing: <Users className="h-5 w-5 text-green-400" />,
    hired: <CheckCircle className="h-5 w-5 text-emerald-400" />,
    ghosted: <XCircle className="h-5 w-5 text-red-300" />,
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8 p-2 sm:p-4 md:p-6 max-w-full mx-auto animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* Header Section */}
      <div className="mb-2 sm:mb-4 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2">
          <Users className="h-6 w-6 sm:h-7 sm:w-7 text-primary animate-bounce" />
          <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Freelance Pipeline</span>
        </h1>
        <span className="text-base sm:text-lg text-muted-foreground font-light mt-1">Track every job you've applied to and manage your freelance journey</span>
      </div>

      {/* Search & Filters */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-800 p-3 sm:p-4 flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center sticky top-0 z-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-zinc-500 h-4 w-4" />
          <Input
            placeholder="Search jobs or clients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 border-gray-100 dark:border-zinc-700 focus:border-primary focus:ring-primary dark:bg-zinc-900 dark:text-zinc-100 rounded-lg shadow-sm h-10 sm:h-11 text-sm sm:text-base"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 md:w-48 border-gray-100 dark:border-zinc-700 focus:border-primary focus:ring-primary dark:bg-zinc-900 dark:text-zinc-100 rounded-lg h-10 sm:h-11 text-sm sm:text-base">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {columns.map(col => (
              <SelectItem key={col.id} value={col.title}>{col.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-full sm:w-40 md:w-48 border-gray-100 dark:border-zinc-700 focus:border-primary focus:ring-primary dark:bg-zinc-900 dark:text-zinc-100 rounded-lg h-10 sm:h-11 text-sm sm:text-base">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last 1 year</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main pipeline row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6 w-full mb-8">
        {columns.filter(col => col.id !== "ghosted").map(col => (
          <div
            key={col.id}
            className={`flex flex-col gap-3 sm:gap-4 rounded-2xl p-0 min-h-[340px] sm:min-h-[420px] md:min-h-[500px] bg-white/80 dark:bg-zinc-900/80 shadow-lg border border-transparent hover:shadow-xl transition-all duration-200 relative ${draggedJob && draggedJob.sourceColumn !== col.id ? 'ring-2 ring-primary/30' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-zinc-900/90 rounded-t-2xl px-4 sm:px-6 pt-4 sm:pt-6 pb-2 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                {columnIcons[col.id]}
                <h3 className="font-semibold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 tracking-tight">{col.title}</h3>
                <Badge variant="secondary" className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 font-medium">
                  {getFilteredJobs(col.id).length}
                </Badge>
              </div>
            </div>
            <Separator className="my-0 dark:bg-zinc-800" />
            <div className="flex-1 space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6 pt-2 overflow-y-auto">
              {getFilteredJobs(col.id).length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-zinc-500 text-sm py-8">
                  <div className="text-center">
                    <Move className="h-8 w-8 mx-auto mb-2 text-gray-200 dark:text-zinc-700" />
                    <p>No jobs</p>
                  </div>
                </div>
              ) : (
                getFilteredJobs(col.id).map((job) => (
                  <Card
                    key={job.id}
                    className="shadow-md border border-gray-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 rounded-xl hover:shadow-xl transition-all duration-200 cursor-move group relative"
                    draggable
                    onDragStart={(e) => handleDragStart(e, job, col.id)}
                  >
                    <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 truncate group-hover:text-primary transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 truncate">{job.client}</p>
                        </div>
                        <Badge variant="outline" className="ml-2 flex-shrink-0 text-xs px-2 py-0.5 border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200">
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">${job.value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.date}</span>
                        </div>
                      </div>
                      <div className="flex pt-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs sm:text-sm rounded-md border-gray-200 dark:border-zinc-700 min-h-[40px]"
                          onClick={() => { setSelectedProposal(job); onNavigate('proposal-details'); }}
                        >
                          View Proposal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Ghosted/Lost row below Applied */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6 w-full mb-8">
        {columns.filter(col => col.id === "ghosted").map(col => (
          <div
            key={col.id}
            className={`flex flex-col gap-3 sm:gap-4 rounded-2xl p-0 min-h-[340px] sm:min-h-[420px] md:min-h-[500px] bg-white/80 dark:bg-zinc-900/80 shadow-lg border border-red-100 dark:border-red-900 hover:shadow-xl transition-all duration-200 relative ${draggedJob && draggedJob.sourceColumn !== col.id ? 'ring-2 ring-primary/30' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="sticky top-0 z-10 bg-red-50/90 dark:bg-zinc-900/90 rounded-t-2xl px-4 sm:px-6 pt-4 sm:pt-6 pb-2 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                {columnIcons[col.id]}
                <h3 className="font-semibold text-base sm:text-lg text-red-500 dark:text-red-400 tracking-tight">{col.title}</h3>
                <Badge variant="secondary" className="bg-white/80 dark:bg-zinc-800 text-red-500 dark:text-red-400 font-medium">
                  {getFilteredJobs(col.id).length}
                </Badge>
              </div>
            </div>
            <Separator className="my-0 dark:bg-red-900" />
            <div className="flex-1 space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6 pt-2 overflow-y-auto">
              {getFilteredJobs(col.id).length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-red-300 dark:text-red-700 text-sm py-8">
                  <div className="text-center">
                    <XCircle className="h-8 w-8 mx-auto mb-2 text-red-200 dark:text-red-900" />
                    <p>No jobs</p>
                  </div>
                </div>
              ) : (
                getFilteredJobs(col.id).map((job) => (
                  <Card
                    key={job.id}
                    className="shadow-md border border-red-100 dark:border-red-900 bg-white/95 dark:bg-zinc-900/95 rounded-xl hover:shadow-xl transition-all duration-200 cursor-move group relative"
                    draggable
                    onDragStart={(e) => handleDragStart(e, job, col.id)}
                  >
                    <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base sm:text-lg text-red-600 dark:text-red-400 truncate group-hover:text-red-700 transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 truncate">{job.client}</p>
                        </div>
                        <Badge variant="outline" className="ml-2 flex-shrink-0 text-xs px-2 py-0.5 border-red-100 dark:border-red-900 bg-red-50 dark:bg-zinc-800 text-red-500 dark:text-red-400">
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 dark:text-zinc-500">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">${job.value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.date}</span>
                        </div>
                      </div>
                      <div className="flex pt-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs sm:text-sm rounded-md border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 min-h-[40px]"
                          onClick={() => { setSelectedProposal(job); onNavigate('proposal-details'); }}
                        >
                          View Proposal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Widget */}
      <Card className="bg-white/90 dark:bg-zinc-900/90 shadow-lg border border-gray-100 dark:border-zinc-800 rounded-2xl mt-4">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-2">
              <span className="text-xs text-blue-600 font-semibold">Applied</span>
              <span className="text-xl font-bold text-blue-700 dark:text-blue-300">{analytics.applied}</span>
            </div>
            <div className="flex flex-col items-center bg-yellow-50 dark:bg-yellow-900/20 rounded-xl px-4 py-2">
              <span className="text-xs text-yellow-600 font-semibold">Viewed</span>
              <span className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{analytics.viewed}</span>
            </div>
            <div className="flex flex-col items-center bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-2">
              <span className="text-xs text-green-600 font-semibold">Interviewing</span>
              <span className="text-xl font-bold text-green-700 dark:text-green-300">{analytics.interviewing}</span>
            </div>
            <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-4 py-2">
              <span className="text-xs text-emerald-600 font-semibold">Hired</span>
              <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{analytics.hired}</span>
            </div>
            <div className="flex flex-col items-center bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
              <span className="text-xs text-red-600 font-semibold">Ghosted</span>
              <span className="text-xl font-bold text-red-700 dark:text-red-300">{analytics.ghosted}</span>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Response Rate</span>
              <span>{Math.round(((analytics.viewed + analytics.interviewing) / analytics.applied) * 100)}%</span>
            </div>
            <Progress 
              value={((analytics.viewed + analytics.interviewing) / analytics.applied) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

