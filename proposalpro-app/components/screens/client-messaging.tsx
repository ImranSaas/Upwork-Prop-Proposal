"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, ArrowLeft } from "lucide-react"
import type { Screen } from "@/app/page"

interface ClientMessagingProps {
  onNavigate: (screen: Screen) => void
  onGoBack?: () => void
}

export function ClientMessaging({ onNavigate, onGoBack }: ClientMessagingProps) {
  const [messageText, setMessageText] = useState("")
  const [selectedTone, setSelectedTone] = useState("professional")

  const tones = [
    { id: "professional", label: "Professional" },
    { id: "friendly", label: "Friendly" },
  ]

  const messageHistory = [
    {
      id: 1,
      sender: "client",
      message: "Thanks for your proposal! Can we schedule a call to discuss the project timeline?",
      timestamp: "2 days ago",
      avatar: "TC",
    },
    {
      id: 2,
      sender: "you",
      message: "I'm available this week for a call. What time works best for you?",
      timestamp: "2 days ago",
      avatar: "YN",
    },
    {
      id: 3,
      sender: "client",
      message: "How about Thursday at 2 PM EST? Also, I'd like to discuss adding a mobile app component.",
      timestamp: "1 day ago",
      avatar: "TC",
    },
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Send message logic here
      setMessageText("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3">
          {onGoBack && (
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="font-semibold">TechCorp Inc.</h1>
            <p className="text-sm text-muted-foreground">React Developer Project</p>
          </div>
        </div>
      </div>

      {/* Message History */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {messageHistory.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === "you" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                  msg.sender === "you" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {msg.sender === "you" ? <User className="h-4 w-4" /> : msg.avatar}
              </div>
              <div className={`flex-1 max-w-[80%] ${msg.sender === "you" ? "text-right" : ""}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    msg.sender === "you" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Composer */}
      <div className="border-t border-border p-4 space-y-4 bg-background">
        {/* Tone Selection */}
        <div className="flex gap-2">
          {tones.map((tone) => (
            <Button
              key={tone.id}
              variant={selectedTone === tone.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTone(tone.id)}
            >
              {tone.label}
            </Button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[44px] max-h-32 resize-none text-base"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            size="icon"
            className="h-11 w-11 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
