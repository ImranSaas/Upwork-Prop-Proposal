"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import {
  User,
  Bell,
  CreditCard,
  LogOut,
  Check,
  XCircle,
  RefreshCw,
  Edit2,
  Mail,
  Sparkles,
  Lock,
  HelpCircle,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface SettingsScreenProps {
  onLogout: () => void
  onNavigate?: (screen: string) => void
}

export function SettingsScreen({ onLogout, onNavigate }: SettingsScreenProps) {
  const { theme, setTheme } = useTheme()
  // Simulated user data
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" })
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(user.name)
  const [editEmail, setEditEmail] = useState(user.email)
  // Upwork connection
  const [upworkConnected, setUpworkConnected] = useState(true)
  // Notification toggles
  const [emailJobAlerts, setEmailJobAlerts] = useState(true)
  const [aiTips, setAiTips] = useState(false)
  // Privacy toggle
  const [allowLearning, setAllowLearning] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)

  // Billing
  const currentPlan = "$19.99/mo"

  // Handlers
  const handleEditProfile = () => {
    setUser({ name: editName, email: editEmail })
    setEditing(false)
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8 p-2 sm:p-4 md:p-6 max-w-full mx-auto animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* Account Info */}
      <section className="space-y-2 animate-slide-in-from-top">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 rounded-full mb-2">Account Info</Badge>
        <Card className="bg-white/80 dark:bg-background/80 shadow-lg rounded-2xl border-none backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold"><User className="h-5 w-5 text-green-400" /> Profile</CardTitle>
            <CardDescription>Manage your name and email</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <div className="font-semibold text-lg text-foreground">{user.name}</div>
              <div className="text-muted-foreground text-base">{user.email}</div>
      </div>
            <Button size="icon" variant="outline" onClick={() => setShowEditModal(true)} aria-label="Edit profile" className="hover:bg-primary/10">
              <Edit2 className="h-4 w-4 text-green-400" />
            </Button>
          </CardContent>
        </Card>
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <input
                className="input w-full bg-background border rounded p-2"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Name"
              />
              <input
                className="input w-full bg-background border rounded p-2"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                placeholder="Email"
              />
              </div>
            <DialogFooter className="flex gap-2 pt-2">
              <Button onClick={handleEditProfile} className="bg-primary hover:bg-primary/90">Save</Button>
              <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
      <Separator />
      {/* Upwork Connection */}
      <section className="space-y-2 animate-slide-in-from-top">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 rounded-full mb-2">Upwork Connection</Badge>
        <Card className="bg-white/80 dark:bg-background/80 shadow-lg rounded-2xl border-none backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold"><Check className="h-5 w-5 text-green-400" /> Upwork</CardTitle>
            <CardDescription>Manage your Upwork OAuth connection</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              {upworkConnected ? (
                <Check className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
              <span className="font-medium text-lg text-foreground">
                {upworkConnected ? "Connected" : "Not Connected"}
              </span>
            </div>
            <div className="flex gap-2">
              {upworkConnected ? (
                <Button size="sm" variant="outline" onClick={() => setUpworkConnected(false)} className="hover:bg-destructive/10">Disconnect</Button>
              ) : (
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setUpworkConnected(true)}>Reconnect</Button>
              )}
          </div>
        </CardContent>
      </Card>
      </section>
      <Separator />
      {/* Notifications */}
      <section className="space-y-2 animate-slide-in-from-top">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 rounded-full mb-2">Notifications</Badge>
        <Card className="bg-white/80 dark:bg-background/80 shadow-lg rounded-2xl border-none backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold"><Bell className="h-5 w-5 text-green-400" /> Notifications</CardTitle>
            <CardDescription>Control how you receive alerts and tips</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
                <div className="flex items-center justify-between">
              <span className="text-base">Email me new job alerts</span>
              <Switch checked={emailJobAlerts} onCheckedChange={setEmailJobAlerts} />
                    </div>
            <div className="flex items-center justify-between">
              <span className="text-base">Send me AI proposal improvement tips</span>
              <Switch checked={aiTips} onCheckedChange={setAiTips} />
                    </div>
          </CardContent>
        </Card>
      </section>
      <Separator />
      {/* Privacy & AI Settings */}
      <section className="space-y-2 animate-slide-in-from-top">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 rounded-full mb-2">Privacy & AI Settings</Badge>
        <Card className="bg-white/80 dark:bg-background/80 shadow-lg rounded-2xl border-none backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold"><Lock className="h-5 w-5 text-green-400" /> Privacy & AI</CardTitle>
            <CardDescription>Control how your data is used for personalization</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-base">Allow UpGenie to learn from my proposals to improve personalization</span>
              <Switch checked={allowLearning} onCheckedChange={setAllowLearning} />
                  </div>
            <div className="text-xs text-muted-foreground mt-2">
              Your data is only used to help you win more jobs.
                </div>
              </CardContent>
            </Card>
      </section>
      <Separator />
      {/* Subscription & Billing */}
      <section className="space-y-2 animate-slide-in-from-top">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 rounded-full mb-2">Subscription & Billing</Badge>
        <Card className="bg-white/80 dark:bg-background/80 shadow-lg rounded-2xl border-none backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold"><CreditCard className="h-5 w-5 text-green-400" /> Billing</CardTitle>
            <CardDescription>Manage your plan and payment methods</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-base">Current plan</span>
              <span className="font-semibold text-lg text-foreground">{currentPlan}</span>
      </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button size="sm" className="bg-primary hover:bg-primary/90">Update Payment Method</Button>
            <Button size="sm" variant="outline">Cancel Subscription</Button>
          </CardFooter>
        </Card>
      </section>
      <Separator />
      {/* Help & Support */}
      <section className="space-y-2 animate-slide-in-from-top">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 rounded-full mb-2">Help & Support</Badge>
        <Card className="bg-white/80 dark:bg-background/80 shadow-lg rounded-2xl border-none backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold"><HelpCircle className="h-5 w-5 text-green-400" /> Support</CardTitle>
            <CardDescription>Find answers or get in touch</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 py-4">
            <a href="#" className="flex items-center gap-2 text-primary hover:underline"><ExternalLink className="h-4 w-4" /> Help Center</a>
            <a href="#" className="flex items-center gap-2 text-primary hover:underline"><Mail className="h-4 w-4" /> Contact Support</a>
            <a href="#" className="flex items-center gap-2 text-primary hover:underline"><ExternalLink className="h-4 w-4" /> Terms</a>
            <a href="#" className="flex items-center gap-2 text-primary hover:underline"><ExternalLink className="h-4 w-4" /> Privacy Policy</a>
          </CardContent>
        </Card>
      </section>
      <Separator />
      {/* Sign Out */}
      <div className="pt-4 animate-fade-in">
        <Button variant="destructive" onClick={onLogout} className="w-full h-12 tap-target text-lg font-semibold rounded-xl shadow-md hover:bg-destructive/90">
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
