"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import type { Screen } from "@/app/page"

interface ProposalSuccessModalProps {
  onNavigate: (screen: Screen) => void
  onClose: () => void
}

export function ProposalSuccessModal({ onNavigate, onClose }: ProposalSuccessModalProps) {
  const [feedback, setFeedback] = useState<"won" | "lost" | null>(null)

  const handleSubmitFeedback = () => {
    // Submit feedback logic here
    onClose()
    onNavigate("proposals")
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-sm animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-xl">Proposal Sent!</CardTitle>
          <p className="text-muted-foreground">Your proposal has been submitted successfully</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium text-center">Did you win this job?</h3>
            <div className="flex gap-3">
              <Button
                variant={feedback === "won" ? "default" : "outline"}
                onClick={() => setFeedback("won")}
                className="flex-1 h-12 tap-target"
              >
                <ThumbsUp className="h-5 w-5 mr-2" />
                Yes
              </Button>
              <Button
                variant={feedback === "lost" ? "default" : "outline"}
                onClick={() => setFeedback("lost")}
                className="flex-1 h-12 tap-target"
              >
                <ThumbsDown className="h-5 w-5 mr-2" />
                No
              </Button>
            </div>
          </div>

          <Button onClick={handleSubmitFeedback} disabled={!feedback} className="w-full h-12 tap-target">
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
