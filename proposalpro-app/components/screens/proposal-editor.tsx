"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Save, ArrowLeft } from "lucide-react"
import type { Screen } from "@/app/page"

interface ProposalEditorProps {
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function ProposalEditor({ onNavigate, onGoBack }: ProposalEditorProps) {
  const [proposalText, setProposalText] = useState(`Hi there!

I'm excited about your React Developer position. With 5+ years of experience building e-commerce platforms, I can help you create a modern, scalable solution.

My approach:
• Modern React with TypeScript
• Responsive design for all devices
• Performance optimization
• Secure payment integration

I recently built a similar platform that increased client sales by 40%. I'd love to discuss how I can bring the same results to your project.

Best regards,
[Your Name]`)

  const [selectedTone, setSelectedTone] = useState("professional")

  const tones = [
    { id: "professional", label: "Professional" },
    { id: "friendly", label: "Friendly" },
    { id: "direct", label: "Direct" },
  ]

  const jobDetails = {
    title: "React Developer for E-commerce Platform",
    client: "TechCorp Inc.",
    budget: "$5,000 - $8,000",
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
            <div>
              <h1 className="font-semibold">Write Proposal</h1>
              <p className="text-sm text-muted-foreground">{jobDetails.client}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Job Details */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">{jobDetails.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{jobDetails.client}</span>
                <Badge variant="secondary">{jobDetails.budget}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tone Selection */}
        <div className="space-y-3 animate-slide-up">
          <h3 className="font-medium">Tone</h3>
          <div className="flex gap-2">
            {tones.map((tone) => (
              <Button
                key={tone.id}
                variant={selectedTone === tone.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTone(tone.id)}
                className="tap-target"
              >
                {tone.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Proposal Text */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h3 className="font-medium">Your Proposal</h3>
          <Textarea
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            className="min-h-[400px] text-base leading-relaxed resize-none"
            placeholder="Write your proposal here..."
          />
        </div>

        {/* Submit Button */}
        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Button className="w-full h-12 tap-target" size="lg">
            <Send className="h-5 w-5 mr-2" />
            Submit Proposal
          </Button>
        </div>
      </div>
    </div>
  )
}
