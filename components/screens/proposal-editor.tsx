"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Save, ArrowLeft, Copy, CheckCircle2 } from "lucide-react"
import type { Screen } from "@/app/page"
import { useToast } from "@/components/ui/use-toast"

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

  const jobDetails = {
    title: "React Developer for E-commerce Platform",
    budget: "$5,000 - $8,000",
  }

  // Mock A/B variations
  const abVariations = [
    proposalText,
    proposalText.replace("Hi there!", "Hello!"),
  ]

  // Mock feedback
  const feedback = [
    "Strong opening and clear value proposition.",
    "Consider adding a question to engage the client.",
    "Highlight your experience with similar projects more explicitly.",
  ]

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header: Job Title and Budget */}
      <div className="w-full sticky top-0 z-30 bg-background border-b border-border flex flex-col">
        <div className="flex flex-col items-center justify-center px-4 pt-4 pb-2">
          <span className="text-xl sm:text-2xl font-bold text-center mb-1">{jobDetails.title}</span>
          <span className="inline-block bg-primary/10 text-primary font-semibold rounded px-3 py-1 text-sm mb-1">{jobDetails.budget}</span>
        </div>
        {/* Tab Switcher */}
        <div className="flex border-b border-border bg-background">
          <button
            className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${selectedTab === 'proposal' ? 'border-b-2 border-primary text-primary bg-accent/30' : 'text-muted-foreground'}`}
            onClick={() => setSelectedTab('proposal')}
          >
            Proposal
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${selectedTab === 'insights' ? 'border-b-2 border-primary text-primary bg-accent/30' : 'text-muted-foreground'}`}
            onClick={() => setSelectedTab('insights')}
          >
            Proposal Insights
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-0 sm:px-4 pb-24">
        {selectedTab === 'proposal' ? (
          <div className="flex flex-col flex-1 w-full justify-end">
            {/* Chat-like Proposal Bubble, full width */}
            <div className="flex flex-col gap-2 px-0 py-8 w-full">
              <div className="flex items-start gap-2 w-full">
                <div className="flex-1 bg-background border border-primary/10 rounded-2xl p-6 shadow-sm whitespace-pre-line text-base leading-relaxed font-sans chat-bubble-proposal">
                  {(refinedProposal || proposalText)}
                </div>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-10 w-10 p-0 mt-2"
                  size="icon"
                  onClick={handleCopy}
                  aria-label="Copy proposal"
                >
                  <span className="relative inline-block w-5 h-5">
                    <CheckCircle2
                      className={`absolute inset-0 transition-all duration-300 ease-in-out ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} text-green-600`}
                      style={{ pointerEvents: 'none' }}
                    />
                    <Copy
                      className={`absolute inset-0 transition-all duration-300 ease-in-out ${!copied ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                      style={{ pointerEvents: 'none' }}
                    />
                  </span>
                </Button>
              </div>
            </div>
            {/* Chat Input for follow-up prompt, full width at the bottom */}
            <div className="sticky bottom-0 left-0 right-0 bg-background/95 pt-6 pb-2 px-0 flex flex-col gap-2 w-full border-t border-border z-10">
              <div className="flex gap-2 w-full max-w-2xl mx-auto px-2">
                <input
                  type="text"
                  value={followupPrompt}
                  onChange={e => setFollowupPrompt(e.target.value)}
                  className="flex-1 border rounded-full px-4 py-3 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Send a follow-up prompt to refine the proposal..."
                  onKeyDown={e => {
                    if (e.key === 'Enter' && followupPrompt.trim()) {
                      setRefinedProposal((refinedProposal || proposalText) + '\n\n[Refined: ' + followupPrompt + ']')
                      setFollowupPrompt("")
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in w-full max-w-2xl mx-auto px-2 py-8">
            <div>
              <h3 className="font-medium mb-2">Why This Proposal Will Succeed</h3>
              <ul className="list-disc pl-6 text-base text-muted-foreground space-y-1">
                <li>Highlights direct experience with similar projects</li>
                <li>Addresses all client requirements</li>
                <li>Uses a professional, confident tone</li>
                <li>Mentions measurable results ("increased client sales by 40%")</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Real-Time Feedback</h3>
              <ul className="list-disc pl-6 text-base text-muted-foreground space-y-1">
                {feedback.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">A/B Variations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {abVariations.map((variation, idx) => (
                  <div key={idx} className="bg-muted/50 rounded-2xl p-4">
                    <div className="text-xs text-muted-foreground mb-2">Variation {String.fromCharCode(65 + idx)}</div>
                    <Textarea
                      value={variation}
                      readOnly
                      className="min-h-[180px] text-base leading-relaxed resize-none bg-muted/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
