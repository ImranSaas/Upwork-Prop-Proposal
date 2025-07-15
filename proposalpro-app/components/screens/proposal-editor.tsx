"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Save, ArrowLeft, Copy, CheckCircle2 } from "lucide-react"
import type { Screen } from "@/app/page"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface ProposalEditorProps {
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function ProposalEditor({ onNavigate, onGoBack }: ProposalEditorProps) {
  const [proposalText, setProposalText] = useState(`Hi there!\n\nI'm excited about your React Developer position. With 5+ years of experience building e-commerce platforms, I can help you create a modern, scalable solution.\n\nMy approach:\n• Modern React with TypeScript\n• Responsive design for all devices\n• Performance optimization\n• Secure payment integration\n\nI recently built a similar platform that increased client sales by 40%. I'd love to discuss how I can bring the same results to your project.\n\nBest regards,\n[Your Name]`)
  const [selectedTab, setSelectedTab] = useState<'proposal' | 'insights'>('proposal')
  const [followupPrompt, setFollowupPrompt] = useState("")
  const [refinedProposal, setRefinedProposal] = useState<string | null>(null)
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [tone, setTone] = useState<'Professional' | 'Friendly' | 'Confident'>('Professional')
  const [addIntro, setAddIntro] = useState(false)
  const [mentionPortfolio, setMentionPortfolio] = useState(false)
  const [includeFollowUp, setIncludeFollowUp] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'refine' | 'insights'>('refine')
  const [refinePrompt, setRefinePrompt] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const jobDetails = {
    title: "React Developer for E-commerce Platform",
    aiSummary: "Redesign a SaaS dashboard UI using React and Tailwind CSS. You'll implement Figma designs, ensure responsiveness, and integrate with REST APIs.",
    budget: "$5,000 - $8,000",
  }

  // Simulate loading state on mount
  useState(() => {
    const delay = Math.floor(Math.random() * 2000) + 1000
    const timeout = setTimeout(() => setIsLoading(false), delay)
    return () => clearTimeout(timeout)
  })

  // Mock strengths, feedback, and A/B variations
  const strengths = [
    "Highlights direct experience with similar projects",
    "Addresses all client requirements",
    "Uses a professional, confident tone"
  ]
  const feedback = [
    "Consider adding a question to engage the client.",
    "Highlight your experience with similar projects more explicitly."
  ]
  const abIntros = [
    "Hello! I'm excited to apply for your project.",
    "Hi there! I believe I'm a great fit for your needs."
  ]

  // Handler for updating proposal with prompt
  const handleRefine = () => {
    setIsLoading(true)
    setTimeout(() => {
      setProposalText(`[AI-refined: ${refinePrompt}]\n` + proposalText)
      setIsLoading(false)
      setRefinePrompt("")
    }, 1200)
  }

  // Handler for A/B intro swap
  const handleSwapIntro = (intro: string) => {
    setProposalText(intro + proposalText.substring(proposalText.indexOf("\n")))
  }

  // Copy to clipboard handler (with fallback)
  const handleCopy = async () => {
    const text = refinedProposal || proposalText
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      // fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
      } catch {}
      document.body.removeChild(textArea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-muted/40 to-white dark:from-background/80 dark:to-background/60">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
        <div className="text-lg font-medium text-muted-foreground">Crafting your winning proposal…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 to-white dark:from-background/80 dark:to-background/60 flex flex-col">
      {/* Top Section */}
      <div className="w-full px-2 sm:px-4 pt-6 sm:pt-8 pb-3 sm:pb-4 flex flex-col items-center border-b border-border bg-background/80 sticky top-0 z-30">
        <div className="w-full flex items-center mb-1">
          {onGoBack && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={onGoBack}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <span className="text-xl sm:text-2xl font-extrabold text-primary animate-fade-in flex-1 text-center">
            {jobDetails.title}
          </span>
        </div>
        <span className="text-sm sm:text-base text-muted-foreground font-light mb-2 animate-fade-in text-center w-full">{jobDetails.aiSummary}</span>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full px-1 sm:px-6 py-2 sm:py-8 gap-2 sm:gap-8 animate-fade-in md:w-full md:max-w-none md:mx-0">
        {/* Mobile: Tabs for Proposal/Insights */}
        <div className="block md:hidden w-full">
          <Tabs defaultValue="proposal" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-1 rounded-xl bg-muted/60 dark:bg-muted/80">
              <TabsTrigger value="proposal" className="text-base py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow font-semibold dark:data-[state=active]:bg-zinc-900/90 dark:data-[state=active]:text-foreground">Proposal</TabsTrigger>
              <TabsTrigger value="insights" className="text-base py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow font-semibold dark:data-[state=active]:bg-zinc-900/90 dark:data-[state=active]:text-foreground">Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="proposal">
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <div className="mb-1">
                    <div className="text-xs font-semibold text-muted-foreground mb-1">AI-generated proposal</div>
                  </div>
                  <div className="w-full min-h-[180px] text-base leading-relaxed rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-border shadow p-3 whitespace-pre-line select-text text-foreground">
                    {proposalText}
                  </div>
                  {/* Refine with AI input */}
                  <div className="flex flex-col gap-2 mt-3">
                    <input
                      type="text"
                      value={refinePrompt}
                      onChange={e => setRefinePrompt(e.target.value)}
                      className="border border-border rounded-lg px-3 py-2 text-base bg-background dark:bg-zinc-900/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm placeholder:text-muted-foreground"
                      placeholder="e.g. Make it more casual"
                      style={{ minHeight: 44 }}
                    />
                    <Button
                      className="w-full mt-0.5 min-h-[44px] text-base font-semibold"
                      onClick={handleRefine}
                      disabled={!refinePrompt.trim()}
                    >
                      Update Proposal
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="insights">
              <div className="w-full">
                <div className="font-bold text-base mb-2 mt-1 text-foreground">Proposal Insights</div>
                <div className="flex flex-col gap-3 mt-1">
                  <div>
                    <div className="font-semibold text-xs mb-1 text-muted-foreground">Why This Proposal Will Succeed</div>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-0.5">
                      {strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-xs mb-1 text-muted-foreground">Real-Time Feedback</div>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-0.5">
                      {feedback.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Desktop: Proposal + Sidebar */}
        <div className="hidden md:flex flex-row w-full gap-8">
          {/* Center: Proposal Display */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <div className="mb-2">
                <div className="text-xs font-semibold text-muted-foreground mb-1">AI-generated proposal</div>
              </div>
              <div className="w-full min-h-[320px] text-base leading-relaxed rounded-lg bg-white/80 dark:bg-zinc-900/90 border border-border shadow-md p-6 whitespace-pre-line select-text text-foreground">
                {proposalText}
              </div>
              {/* Refine with AI input, always visible below proposal */}
              <div className="flex flex-col gap-3 mt-6">
                <input
                  type="text"
                  value={refinePrompt}
                  onChange={e => setRefinePrompt(e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-base bg-background dark:bg-zinc-900/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                  placeholder="e.g. Make it more casual"
                />
                <Button
                  className="w-full mt-1"
                  onClick={handleRefine}
                  disabled={!refinePrompt.trim()}
                >
                  Update Proposal
                </Button>
              </div>
            </div>
          </div>
          {/* Right Sidebar: Only Proposal Insights */}
          <div className="w-80 flex flex-col gap-6 justify-start items-stretch">
            <div className="w-full">
              <div className="font-bold text-lg mb-4 text-foreground">Proposal Insights</div>
              <div className="flex flex-col gap-6 mt-4">
                <div>
                  <div className="font-semibold text-sm mb-1 text-muted-foreground">Why This Proposal Will Succeed</div>
                  <ul className="list-disc pl-6 text-base text-muted-foreground space-y-1">
                    {strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1 text-muted-foreground">Real-Time Feedback</div>
                  <ul className="list-disc pl-6 text-base text-muted-foreground space-y-1">
                    {feedback.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Button Row: Sticky CTA, always visible, vertical on mobile */}
      <div className="w-full sticky bottom-0 left-0 right-0 bg-background/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 px-1 sm:px-4 py-2 sm:py-4 z-50 shadow-lg animate-fade-in transition-all">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-center">
          <Button
            variant="secondary"
            className="rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto min-h-[44px] text-base"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </div>
        <a
          href="https://www.upwork.com/ab/proposals/job"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline text-sm font-semibold hover:text-emerald-600 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto justify-center sm:justify-start min-h-[44px]"
        >
          <ArrowLeft className="inline h-4 w-4 mr-1" />
          Open in Upwork
        </a>
      </div>
    </div>
  )
}
