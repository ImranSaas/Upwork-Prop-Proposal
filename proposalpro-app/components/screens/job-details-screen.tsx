"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Bookmark, DollarSign, Clock, MapPin, Star, ArrowLeft, Send } from "lucide-react"
import type { Screen } from "@/app/page"
import { useState } from "react"

interface JobDetailsScreenProps {
  job: any | null
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function JobDetailsScreen({ job, onNavigate, onGoBack }: JobDetailsScreenProps) {
  const [activeTab, setActiveTab] = useState<'original' | 'ai'>('original')

  if (!job) {
    return <div className="p-8 text-center text-muted-foreground">No job selected.</div>;
  }

  // Fallbacks for missing fields
  const jobDetails = {
    title: job.title || "Job Title",
    client: job.client?.name || "Client Name",
    budget: job.budget || "N/A",
    timeline: job.duration || "N/A",
    location: job.client?.location || "N/A",
    matchPercentage: job.matchScore || 0,
    description: job.description || "No description provided.",
    skills: job.skills || [],
    clientRating: job.client?.rating || 0,
    ai: job.ai || {
      summary: "No AI summary provided.",
      deliverables: [],
      approach: [],
    },
    deliveryDate: job.deliveryDate || null,
    howToApply: job.howToApply || null,
    highlights: job.highlights || null,
  }

  // Helper to parse description into paragraphs and bullet lists
  function renderDescription(desc: string) {
    const lines = desc.split(/\r?\n/).map(line => line.trim()).filter(Boolean)
    const elements = []
    let listItems: string[] = []
    lines.forEach((line, idx) => {
      if (/^[-*•\d+\.]/.test(line)) {
        listItems.push(line.replace(/^[-*•\d+\.]+\s*/, ""))
      } else {
        if (listItems.length) {
          elements.push(<ul className="list-disc pl-6 mb-2" key={`ul-${idx}`}>{listItems.map((item, i) => <li key={i}>{item}</li>)}</ul>)
          listItems = []
        }
        elements.push(<p className="mb-2" key={`p-${idx}`}>{line}</p>)
      }
    })
    if (listItems.length) {
      elements.push(<ul className="list-disc pl-6 mb-2" key={`ul-end`}>{listItems.map((item, i) => <li key={i}>{item}</li>)}</ul>)
    }
    return elements
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
        {/* Tabs */}
        <div className="w-full flex border-b border-border mb-2">
          <button
            className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${activeTab === 'original' ? 'border-b-2 border-primary text-primary bg-accent/30' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('original')}
          >
            Original Post
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${activeTab === 'ai' ? 'border-b-2 border-primary text-primary bg-accent/30' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('ai')}
          >
            AI Insights
          </button>
        </div>
        <div className="relative min-h-[320px]">
          {/* Slide animation */}
          <div className="w-full transition-transform duration-500" style={{ transform: `translateX(${activeTab === 'original' ? '0%' : '-100%'})`, display: 'flex' }}>
            {/* Original Post Tab */}
            <div className="w-full flex-shrink-0" style={{ minWidth: '100%' }}>
              <div className="overflow-y-auto max-h-72 p-4 space-y-6">
                {/* Project Overview / Highlights */}
                {jobDetails.highlights && (
                  <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <CardContent className="p-4">
                      <h2 className="font-semibold text-lg mb-2">Project Overview</h2>
                      <div className="text-base text-muted-foreground whitespace-pre-line">{jobDetails.highlights}</div>
                    </CardContent>
                  </Card>
                )}
                {/* Delivery Date */}
                {jobDetails.deliveryDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span><b>Delivery Date:</b> {jobDetails.deliveryDate}</span>
                  </div>
                )}
                {/* Description (parsed) */}
                <Card className="animate-slide-up" style={{ animationDelay: '150ms' }}>
                  <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-2">Job Description</h2>
                    <div className="text-base text-muted-foreground">
                      {renderDescription(jobDetails.description)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* AI Insights Tab */}
            <div className="w-full flex-shrink-0" style={{ minWidth: '100%' }}>
              <div className="overflow-y-auto max-h-72 p-4 space-y-8">
                {/* Job Summary */}
                <div>
                  <div className="font-bold text-[18px] mb-2">Job Summary</div>
                  <div className="text-[16px]">{jobDetails.ai.summary}</div>
                </div>
                {/* Deliverables */}
                <div>
                  <div className="font-bold text-[18px] mb-2">Deliverables</div>
                  <ul className="pl-4 space-y-2">
                    {jobDetails.ai.deliverables.map((item: string, idx: number) => (
                      <li key={idx} className="text-[16px] list-disc">{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Best Approach */}
                <div>
                  <div className="font-bold text-[18px] mb-2">Best Approach</div>
                  <ol className="pl-4 space-y-3">
                    {jobDetails.ai.approach.map((step: any, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="font-bold text-[16px]">{idx + 1}.</span>
                        <div>
                          <span className="font-bold text-[16px]">{step.title}:</span>
                          <span className="block text-[14px] ml-1">{step.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Required Skills */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {jobDetails.skills.map((skill: string, index: number) => (
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
        {/* Quick Stats: Budget, Timeline, Match Score */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in mt-6">
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
          <Card>
            <CardContent className="p-4 text-center">
              <span className="flex items-center justify-center mb-2">
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">{jobDetails.matchPercentage}%</span>
              </span>
              <p className="text-sm text-muted-foreground">Match Score</p>
              <Progress value={jobDetails.matchPercentage} className="h-3 mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Excellent match! Your skills align perfectly with this job.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border flex justify-end">
        <Button
          onClick={() => onNavigate("proposal-editor")}
          size="sm"
          className="hover-lift"
        >
          <Send className="h-4 w-4 mr-2" />
            Generate Proposal
          </Button>
      </div>
    </div>
  )
}
