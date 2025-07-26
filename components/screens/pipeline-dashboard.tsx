"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, DollarSign, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import type { Screen } from "@/app/page"

interface PipelineDashboardProps {
  onNavigate: (screen: Screen) => void
}

export function PipelineDashboard({ onNavigate }: PipelineDashboardProps) {
  const [selectedColumn, setSelectedColumn] = useState(0)

  const columns = [
    { id: "applied", title: "Applied", count: 8 },
    { id: "interviewed", title: "Interviewed", count: 3 },
    { id: "won", title: "Won", count: 4 },
  ]

  const proposals = {
    applied: [
      { id: 1, title: "React E-commerce Platform", client: "TechCorp", value: 8500, days: 2 },
      { id: 2, title: "Mobile App Development", client: "StartupXYZ", value: 12000, days: 1 },
      { id: 3, title: "WordPress Redesign", client: "Local Biz", value: 3500, days: 5 },
    ],
    interviewed: [
      { id: 4, title: "Fintech Platform", client: "FinanceFlow", value: 15000, days: 1 },
      { id: 5, title: "Healthcare App", client: "MedTech", value: 11000, days: 4 },
    ],
    won: [
      { id: 6, title: "CRM System", client: "SalesPro", value: 9000, days: 30 },
      { id: 7, title: "Inventory Management", client: "RetailCorp", value: 6500, days: 45 },
    ],
  }

  const getProposalsForColumn = (columnId: string) => {
    return proposals[columnId as keyof typeof proposals] || []
  }

  const totalValue = Object.values(proposals)
    .flat()
    .reduce((sum, proposal) => sum + proposal.value, 0)

  return (
    <div className="p-4 space-y-6 content-with-nav">
      {/* Header */}
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold">Pipeline</h1>
          <p className="text-muted-foreground">Track your proposal progress</p>
        </div>

        {/* Pipeline Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-xl font-semibold">${totalValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-semibold">{columns.reduce((sum, col) => sum + col.count, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Column Navigation */}
      <div className="flex items-center justify-between animate-slide-up">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedColumn(Math.max(0, selectedColumn - 1))}
          disabled={selectedColumn === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 mx-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-center">
                {columns[selectedColumn].title}
                <Badge variant="secondary" className="ml-2">
                  {columns[selectedColumn].count}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedColumn(Math.min(columns.length - 1, selectedColumn + 1))}
          disabled={selectedColumn === columns.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Proposals List */}
      <div className="space-y-3">
        {getProposalsForColumn(columns[selectedColumn].id).map((proposal, index) => (
          <Card
            key={proposal.id}
            className="card-interactive animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-base">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground">{proposal.client}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>${proposal.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{proposal.days}d ago</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => onNavigate("messaging")}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {getProposalsForColumn(columns[selectedColumn].id).length === 0 && (
        <Card className="animate-slide-up">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No proposals in this stage</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
