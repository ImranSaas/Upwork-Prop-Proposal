"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, ArrowLeft } from "lucide-react"

interface BillingScreenProps {
  onGoBack?: () => void
}

export function BillingScreen({ onGoBack }: BillingScreenProps) {
  return (
    <div className="p-4 space-y-6 content-with-nav">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        {onGoBack && (
          <Button variant="ghost" size="icon" onClick={onGoBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-semibold">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription</p>
        </div>
      </div>

      {/* Current Plan */}
      <Card className="border-primary animate-slide-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Pro Plan</CardTitle>
              <p className="text-muted-foreground">Unlimited proposals and features</p>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold">$19.99</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
            <div className="space-y-2">
              {["Unlimited proposals", "Priority job alerts", "Advanced AI features", "Pipeline management"].map(
                (feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
        <CardHeader>
          <CardTitle className="text-lg">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle className="text-lg">Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Jan 1, 2024", amount: "$19.99" },
              { date: "Dec 1, 2023", amount: "$19.99" },
              { date: "Nov 1, 2023", amount: "$19.99" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.amount}</p>
                  <Badge variant="secondary" className="text-xs">
                    Paid
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Button */}
      <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
        <Button className="w-full h-12 tap-target">Manage Subscription</Button>
      </div>
    </div>
  )
}
