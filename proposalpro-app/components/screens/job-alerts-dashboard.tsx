"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, X, DollarSign, Clock, Settings } from "lucide-react"
import type { Screen } from "@/app/page"

interface JobAlertsDashboardProps {
  onNavigate: (screen: Screen) => void
}

export function JobAlertsDashboard({ onNavigate }: JobAlertsDashboardProps) {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior React Developer",
      client: "FinanceFlow Inc.",
      budget: "$8,000 - $12,000",
      timeline: "8-10 weeks",
      matchPercentage: 95,
      skills: ["React", "TypeScript", "Node.js"],
      postedTime: "2 hours ago",
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      client: "EduTech Solutions",
      budget: "$6,000 - $9,000",
      timeline: "6-8 weeks",
      matchPercentage: 88,
      skills: ["React", "Node.js", "MongoDB"],
      postedTime: "4 hours ago",
    },
    {
      id: 3,
      title: "Mobile App Developer",
      client: "WellnessApp Co.",
      budget: "$10,000 - $15,000",
      timeline: "10-12 weeks",
      matchPercentage: 82,
      skills: ["React Native", "Firebase"],
      postedTime: "6 hours ago",
    },
  ])

  const dismissJob = (jobId: number) => {
    setJobs(jobs.filter((job) => job.id !== jobId))
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 dark:text-green-400"
    if (percentage >= 75) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="p-4 space-y-6 content-with-nav">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold">New Jobs</h1>
          <p className="text-muted-foreground">{jobs.length} matching jobs</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => onNavigate("job-alert-settings")}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <Card
            key={job.id}
            className="card-interactive animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-base">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.client}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      dismissJob(job.id)
                    }}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Match Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Match</span>
                    <span className={`text-sm font-semibold ${getMatchColor(job.matchPercentage)}`}>
                      {job.matchPercentage}%
                    </span>
                  </div>
                  <Progress value={job.matchPercentage} className="h-2" />
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.budget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{job.timeline}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button onClick={() => onNavigate("proposal-editor")} className="flex-1 h-10 tap-target">
                    <FileText className="h-4 w-4 mr-2" />
                    Apply
                  </Button>
                  <Button variant="outline" onClick={() => onNavigate("job-details")} className="h-10 tap-target">
                    View
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">Posted {job.postedTime}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && (
        <Card className="animate-slide-up">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No new jobs available</p>
            <Button onClick={() => onNavigate("job-alert-settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Adjust Settings
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
