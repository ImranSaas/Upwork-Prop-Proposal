"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronUp, MessageSquare } from "lucide-react"

export function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does AI proposal generation work?",
      answer:
        "Our AI analyzes job descriptions and creates personalized proposals that match your skills and the client's needs.",
    },
    {
      question: "Can I edit generated proposals?",
      answer:
        "Yes, all proposals are fully editable. You can modify tone, add personal touches, and adjust content before sending.",
    },
    {
      question: "How accurate are job alerts?",
      answer: "Job alerts use advanced matching based on your skills and preferences to ensure high relevance.",
    },
    {
      question: "What's included in the Pro plan?",
      answer:
        "Pro plan includes unlimited proposals, priority job alerts, advanced AI features, and pipeline management.",
    },
    {
      question: "How do I connect my Upwork account?",
      answer: "Go to Settings and tap 'Connect Upwork'. You'll be redirected to Upwork's secure authentication.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-4 space-y-6 content-with-nav">
      {/* Header */}
      <div className="space-y-2 animate-fade-in">
        <h1 className="text-2xl font-semibold">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions</p>
      </div>

      {/* Search */}
      <div className="relative animate-slide-up">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <Card
            key={index}
            className="card-interactive animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-left flex-1 pr-4">{faq.question}</h3>
                {expandedFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </div>
              {expandedFaq === index && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <div className="pt-4 animate-slide-up" style={{ animationDelay: "500ms" }}>
        <Button className="w-full h-12 tap-target">
          <MessageSquare className="h-5 w-5 mr-2" />
          Contact Support
        </Button>
      </div>
    </div>
  )
}
