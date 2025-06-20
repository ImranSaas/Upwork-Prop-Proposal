"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Bookmark, DollarSign, Clock, MapPin, Star, ArrowLeft } from "lucide-react"
import type { Screen } from "@/app/page"

interface JobDetailsScreenProps {
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function JobDetailsScreen({ onNavigate, onGoBack }: JobDetailsScreenProps) {
  const jobDetails = {
    title: "Senior React Developer - Fintech Startup",
    client: "FinanceFlow Inc.",
    budget: "$8,000 - $12,000",
    timeline: "8-10 weeks",
    location: "Remote (US Timezone)",
    matchPercentage: 95,
    description: `We're building the next generation of financial tools for small businesses. Looking for a senior React developer to help us build beautiful, intuitive user interfaces.

Key Responsibilities:
• Build responsive React components using TypeScript
• Implement data visualization using D3.js
• Integrate with REST APIs and GraphQL endpoints
• Collaborate with design team for pixel-perfect UIs

What We Offer:
• Competitive compensation
• Flexible working hours and fully remote work
• Cutting-edge fintech technologies
• Small team with significant impact`,
    skills: ["React", "TypeScript", "Node.js", "AWS", "D3.js", "GraphQL"],
    clientRating: 4.8,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onGoBack && (
              <Button variant="ghost" size="icon" onClick={onGoBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex-1">
              <h1 className="font-semibold text-lg leading-tight">{jobDetails.title}</h1>
              <p className="text-sm text-muted-foreground">{jobDetails.client}</p>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-5 w-5 mx-auto mb-2 text-green-600 dark:text-green-400" />
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-semibold">{jobDetails.budget}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-muted-foreground">Timeline</p>
              <p className="font-semibold">{jobDetails.timeline}</p>
            </CardContent>
          </Card>
        </div>

        {/* Match Score */}
        <Card className="animate-slide-up">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Match Score</span>
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {jobDetails.matchPercentage}%
                </span>
              </div>
              <Progress value={jobDetails.matchPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Excellent match! Your skills align perfectly with this job.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium">Job Description</h3>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {jobDetails.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Required Skills */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {jobDetails.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Info */}
        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">About the Client</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(jobDetails.clientRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{jobDetails.clientRating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {jobDetails.location}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex gap-3">
          <Button onClick={() => onNavigate("proposal-editor")} className="flex-1 h-12 tap-target" size="lg">
            <FileText className="h-5 w-5 mr-2" />
            Generate Proposal
          </Button>
          <Button variant="outline" className="h-12 tap-target">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
