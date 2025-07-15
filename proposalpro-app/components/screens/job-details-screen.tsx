"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Bookmark, DollarSign, Clock, MapPin, Star, ArrowLeft, Send } from "lucide-react"
import type { Screen } from "@/app/page"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useIsMobile } from "@/hooks/use-mobile"

interface JobDetailsScreenProps {
  job: any | null
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function JobDetailsScreen({ job, onNavigate, onGoBack }: JobDetailsScreenProps) {
  const [activeTab, setActiveTab] = useState<'original' | 'ai'>('original')
  const [notes, setNotes] = useState("")
  const isMobile = useIsMobile();

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/60">
      {/* Header */}
      <div className={`sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border shadow ${isMobile ? 'p-3' : 'p-6'}`}>
        <div className="flex items-center gap-4">
          {onGoBack && (
            <Button variant="ghost" size="icon" onClick={onGoBack} className={isMobile ? 'h-8 w-8' : ''}>
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
          <h1 className={`font-extrabold ${isMobile ? 'text-xl' : 'text-4xl'} leading-tight tracking-tight flex-1 text-foreground drop-shadow-sm text-balance`} style={{wordBreak: 'break-word'}}>
            {jobDetails.title}
          </h1>
        </div>
      </div>
      {/* Main Content */}
      <div className={`${isMobile ? 'p-2 pb-32' : 'p-6 md:p-12 pb-32'} relative`}>
        <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex flex-col md:flex-row gap-12'}`}>
          {/* Left Column: Upwork Job Details */}
          <div className="flex-1 min-w-0 space-y-4 md:space-y-10">
            {/* Job Description (collapsible on mobile) */}
            {isMobile ? (
              <Accordion type="single" collapsible defaultValue="job-desc">
                <AccordionItem value="job-desc">
                  <AccordionTrigger className="rounded-xl bg-gradient-to-br from-muted/60 to-background px-3 py-2 border border-border shadow-md text-lg font-bold text-foreground">Job Description</AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <Card className="rounded-xl shadow-md border-0 bg-white/95 dark:bg-muted/90">
                      <CardContent className="pt-4 pb-3 px-3">
                        <div className="max-h-64 overflow-y-auto text-base text-muted-foreground leading-relaxed">
                          {renderDescription(jobDetails.description)}
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
            <Card className="rounded-2xl shadow-md border-0 bg-white/90 dark:bg-muted/80">
              <CardContent className="pt-8 pb-6 px-8">
                <div className="max-h-64 overflow-y-auto text-base text-muted-foreground leading-relaxed">
                  {renderDescription(jobDetails.description)}
                </div>
              </CardContent>
            </Card>
            )}
            {/* AI Panel for mobile: collapsible, with nested collapsible cards */}
            {isMobile && (
              <Accordion type="single" collapsible defaultValue="ai-panel">
                <AccordionItem value="ai-panel">
                  <AccordionTrigger className="rounded-xl bg-gradient-to-br from-muted/60 to-background px-3 py-2 border border-border shadow-md text-lg font-bold text-foreground">AI Insights</AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 space-y-3">
                    {/* AI Summary (collapsible) */}
                    <Accordion type="single" collapsible defaultValue="ai-summary">
                      <AccordionItem value="ai-summary">
                        <AccordionTrigger className="rounded-xl bg-gradient-to-br from-muted/60 to-background px-2 py-1 border border-border shadow text-base font-bold text-foreground">AI Summary</AccordionTrigger>
                        <AccordionContent className="pt-2 pb-2">
                          <div className="rounded-xl bg-gradient-to-br from-muted/60 to-background p-3 border border-border shadow-md mb-3">
                            <div className="font-bold text-base mb-2 text-foreground">AI Summary</div>
                            <div className="text-muted-foreground text-sm leading-relaxed mb-2">{jobDetails.ai.summary}</div>
                          </div>
                          <UpGenieQA job={job} placeholder="Ask UpGenie anything about this project." />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    {/* How to Approach (collapsible) */}
                    <Accordion type="single" collapsible defaultValue="ai-approach">
                      <AccordionItem value="ai-approach">
                        <AccordionTrigger className="rounded-xl bg-gradient-to-br from-muted/60 to-background px-2 py-1 border border-border shadow text-base font-bold text-foreground">How to Approach This Project</AccordionTrigger>
                        <AccordionContent className="pt-2 pb-2">
                          <Card className="rounded-xl shadow-md border-0 bg-white/95 dark:bg-muted/90 mb-3">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base font-bold text-foreground">How to Approach This Job</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3 px-3">
                              <ol className="list-decimal pl-5 space-y-2 text-sm text-foreground">
                                {(jobDetails.ai.approach && jobDetails.ai.approach.length > 0)
                                  ? jobDetails.ai.approach.map((step: any, idx: number) => (
                                      <li key={idx}><span className="font-medium">{step.title ? `${step.title}: ` : ""}</span>{step.desc || step}</li>
                                    ))
                                  : <li>Review the job description and client info carefully.</li>}
                              </ol>
                            </CardContent>
                          </Card>
                          <UpGenieQA job={job} placeholder="Ask UpGenie for advice on how to approach this project." />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            {/* Client Info */}
            <Card className={`rounded-xl shadow-md border-0 ${isMobile ? 'bg-white/95 dark:bg-muted/90' : 'bg-white/90 dark:bg-muted/80'}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold tracking-tight text-foreground">Client Info</CardTitle>
              </CardHeader>
              <CardContent className={`${isMobile ? 'pt-0 pb-3 px-3' : 'pt-0 pb-6 px-8'}`}>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-green-500" /><span className="font-medium">Payment Verified:</span> <span className="text-foreground font-semibold">{job.client?.paymentVerified ? "Yes" : "No"}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-500" /><span className="font-medium">Location:</span> <span className="text-foreground">{jobDetails.location}</span></div>
                  <div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /><span className="font-medium">Rating:</span> <span className="text-foreground">{jobDetails.clientRating}</span></div>
                  <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /><span className="font-medium">Total Hires/Reviews:</span> <span className="text-foreground">{job.client?.reviewsCount ?? "N/A"}</span></div>
                </div>
              </CardContent>
            </Card>
            {/* Metadata Card */}
            <Card className={`rounded-xl shadow-md border-0 ${isMobile ? 'bg-muted/30' : 'bg-muted/40'}`}>
              <CardContent className={`${isMobile ? 'py-3 px-3' : 'py-6 px-8'}`}>
                <div className="grid grid-cols-2 gap-3 md:gap-6 text-sm">
                  <div><span className="font-medium text-muted-foreground">Budget</span><div className="font-semibold text-foreground">{jobDetails.budget}</div></div>
                  <div><span className="font-medium text-muted-foreground">Experience Level</span><div className="font-semibold text-foreground">{job.experienceLevel || "N/A"}</div></div>
                  <div className="col-span-2"><span className="font-medium text-muted-foreground">Skills Required</span><div className="flex flex-wrap gap-2 mt-1">{jobDetails.skills.map((skill: string, idx: number) => (<Badge key={idx} variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{skill}</Badge>))}</div></div>
                  <div><span className="font-medium text-muted-foreground">Date Posted</span><div className="font-semibold text-foreground">{job.datePosted || "N/A"}</div></div>
                </div>
              </CardContent>
            </Card>
            {/* Open in Upwork link */}
            <div className="pt-1 md:pt-2">
              <Button variant="link" asChild className="px-0 text-green-600 hover:text-green-700 font-semibold transition-colors text-base">
                <a href={job.upworkUrl || "#"} target="_blank" rel="noopener noreferrer">Open in Upwork</a>
              </Button>
            </div>
          </div>
          {/* Right Column: UpGenie AI Panel (desktop only) */}
          {!isMobile && (
            <div className="w-full md:w-[370px] flex-shrink-0 space-y-10 md:sticky md:top-24">
              {/* AI Summary */}
              <div className="rounded-2xl bg-gradient-to-br from-muted/60 to-background p-7 border border-border shadow-md">
                <div className="font-bold text-2xl mb-2 text-foreground">AI Summary</div>
                <div className="text-muted-foreground text-base leading-relaxed mb-4">{jobDetails.ai.summary}</div>
                {/* UpGenieQA input under AI Summary */}
                <UpGenieQA job={job} placeholder="Ask UpGenie anything about this project." />
              </div>
              {/* How to Approach This Job */}
              <Card className="rounded-2xl shadow-md border-0 bg-white/90 dark:bg-muted/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-foreground">How to Approach This Job</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-6 px-8">
                  <ol className="list-decimal pl-5 space-y-3 text-base text-foreground">
                    {(jobDetails.ai.approach && jobDetails.ai.approach.length > 0)
                      ? jobDetails.ai.approach.map((step: any, idx: number) => (
                          <li key={idx}><span className="font-medium">{step.title ? `${step.title}: ` : ""}</span>{step.desc || step}</li>
                        ))
                      : <li>Review the job description and client info carefully.</li>}
                  </ol>
                  {/* UpGenieQA input under How to Approach */}
                  <div className="mt-6">
                    <UpGenieQA job={job} placeholder="Ask UpGenie for advice on how to approach this project." />
                  </div>
                </CardContent>
              </Card>
              <Separator />
            </div>
          )}
        </div>
        {/* Sticky Generate Proposal button for desktop (like mobile) */}
        {!isMobile && (
          <div className="absolute bottom-0 left-0 right-0 w-full p-3 z-30">
            <Button
              className="flex items-center gap-2 w-full font-bold text-base py-3 sm:py-4 rounded-xl shadow-md bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-600 text-white justify-center"
              onClick={() => onNavigate("proposal-editor")}
            >
              <Send className="h-5 w-5 mr-2" />
              Generate Proposal
            </Button>
          </div>
        )}
      </div>
      {/* Sticky CTA for mobile */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 w-full p-2 z-30 md:hidden">
          <Button
            className="flex items-center gap-2 w-full font-bold text-base py-3 rounded-xl shadow-md bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-600 text-white justify-center"
            onClick={() => onNavigate("proposal-editor")}
          >
            <Send className="h-5 w-5 mr-2" />
            Generate Proposal
          </Button>
        </div>
      )}
    </div>
  )
}

function UpGenieQA({ job, placeholder }: { job: any, placeholder?: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dummy AI response logic (replace with real API call as needed)
  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    // Simulate API call
    setTimeout(() => {
      setAnswer(`(AI): This is a helpful answer to: "${question}"`);
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-muted/60 to-background p-5 border border-border shadow mt-2">
      <form onSubmit={handleAsk} className="flex flex-col gap-3">
        <textarea
          ref={inputRef as any}
          className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground resize-none min-h-[48px] max-h-40 transition"
          placeholder={placeholder || "Ask UpGenie anything about this job…"}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          disabled={loading}
          rows={2}
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" className="px-5 py-2 font-semibold rounded-lg shadow bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition" disabled={loading || !question.trim()}>
            {loading ? "…" : "Ask"}
          </Button>
        </div>
      </form>
      {answer && (
        <div className="mt-4 p-4 rounded-lg bg-white/80 dark:bg-muted/70 text-muted-foreground text-base leading-relaxed border border-border">
          {answer}
        </div>
      )}
    </div>
  );
}
