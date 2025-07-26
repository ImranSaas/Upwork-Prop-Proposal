"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Calendar, DollarSign } from "lucide-react"
import type { Screen } from "@/app/page"

interface ProposalDashboardProps {
  onNavigate: (screen: Screen) => void
}

export function ProposalDashboard({ onNavigate }: ProposalDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const proposals = [
    {
      id: 1,
      title: "React E-commerce Platform",
      client: "TechCorp Inc.",
      status: "sent",
      date: "2024-01-15",
      budget: "$5,000",
    },
    {
      id: 2,
      title: "SaaS Dashboard Development",
      client: "StartupXYZ",
      status: "viewed",
      date: "2024-01-14",
      budget: "$8,500",
    },
    {
      id: 3,
      title: "Mobile App Development",
      client: "MobileFirst Co.",
      status: "won",
      date: "2024-01-12",
      budget: "$12,000",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "status-won"
      case "sent":
        return "status-applied"
      case "viewed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-4 space-y-6 content-with-nav">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold">Proposals</h1>
          <p className="text-muted-foreground">{proposals.length} total proposals</p>
        </div>
        <Button onClick={() => onNavigate("proposal-editor")} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative animate-slide-up">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search proposals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Filter */}
      <div className="flex gap-2 animate-slide-up overflow-x-auto">
        {["all", "sent", "viewed", "won"].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(status)}
            className="capitalize whitespace-nowrap"
          >
            {status === "all" ? "All" : status}
          </Button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-3">
        {filteredProposals.map((proposal, index) => (
          <Card
            key={proposal.id}
            className="card-interactive animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onNavigate("proposal-editor")}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-base">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground">{proposal.client}</p>
                  </div>
                  <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(proposal.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {proposal.budget}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <Card className="animate-slide-up">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No proposals found</p>
            <Button onClick={() => onNavigate("proposal-editor")}>
              <Plus className="h-4 w-4 mr-2" />
              Write Your First Proposal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
