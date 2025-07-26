"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Save, Bell } from "lucide-react"

interface JobAlertSettingsModalProps {
  onClose: () => void
  onSave: (settings: any) => void
}

export function JobAlertSettingsModal({ onClose, onSave }: JobAlertSettingsModalProps) {
  const [frequency, setFrequency] = useState([3])
  const [selectedSkills, setSelectedSkills] = useState(["React", "JavaScript", "Node.js"])

  const availableSkills = [
    "React",
    "JavaScript",
    "Node.js",
    "TypeScript",
    "Python",
    "PHP",
    "WordPress",
    "Vue.js",
    "Angular",
    "React Native",
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleSave = () => {
    onSave({ frequency: frequency[0], skills: selectedSkills })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-md animate-slide-up sm:animate-scale-in">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Job Alert Settings</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Frequency */}
          <div className="space-y-4">
            <h3 className="font-medium">Alert Frequency</h3>
            <div className="space-y-3">
              <Slider value={frequency} onValueChange={setFrequency} max={10} min={1} step={1} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1 alert/day</span>
                <span className="font-medium text-primary">{frequency[0]} alerts/day</span>
                <span>10 alerts/day</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="font-medium">Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableSkills.map((skill) => (
                <Button
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSkill(skill)}
                  className="h-10 text-sm"
                >
                  {skill}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <div className="border-t p-4 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </Card>
    </div>
  )
}
