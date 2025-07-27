import React from "react"

export function PaywallScreen({ onSubscribe }: { onSubscribe?: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-center">Unlock UpGenie Pro for $19.99/month</h1>
        <p className="text-muted-foreground text-center mb-6">
          Start winning jobs faster with AI-generated proposals, job alerts, and smart tracking.
        </p>
        <div className="bg-card rounded-xl shadow-lg p-6 w-full flex flex-col items-center mb-6">
          <ul className="space-y-3 mb-6 w-full">
            <li className="flex items-center gap-2 text-base">
              <span className="text-green-600">✅</span> Personalized job feed
            </li>
            <li className="flex items-center gap-2 text-base">
              <span className="text-green-600">✅</span> AI-written proposals
            </li>
            <li className="flex items-center gap-2 text-base">
              <span className="text-green-600">✅</span> Simple CRM & smart tracking
            </li>
            <li className="flex items-center gap-2 text-base">
              <span className="text-green-600">✅</span> 14-day money-back guarantee
            </li>
          </ul>
          <div className="flex flex-col items-center mb-4 w-full">
            <span className="text-4xl font-extrabold mb-1">$19.99<span className="text-lg font-medium">/month</span></span>
            <span className="text-sm text-muted-foreground mb-4">Cancel anytime</span>
            <button
              className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-semibold text-lg shadow hover:bg-primary/90 transition mb-2 w-full"
              onClick={onSubscribe}
            >
              Start Winning Now
            </button>
            {/* Stripe checkout button placeholder */}
            <button
              className="border border-primary text-primary rounded-lg px-6 py-2 font-medium text-base hover:bg-primary/5 transition w-full"
              onClick={() => alert('Stripe checkout coming soon!')}
            >
              Pay with Stripe
            </button>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          <span className="bg-muted px-3 py-1 rounded-full">No trials — real results or your money back</span>
        </div>
      </div>
    </div>
  )
} 