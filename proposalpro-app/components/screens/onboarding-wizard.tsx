"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, User, Link, Briefcase } from "lucide-react"

interface OnboardingWizardProps {
  onComplete: () => void
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    skills: [] as string[],
    experience: "",
  })

  const steps = [
    { id: "profile", title: "Profile", icon: User },
    { id: "upwork", title: "Upwork Connect", icon: Link },
    { id: "preferences", title: "Job Preferences", icon: Briefcase },
  ]

  const availableSkills = ["React", "JavaScript", "Node.js", "TypeScript", "Python", "PHP"]

  const experienceLevels = ["Beginner", "Intermediate", "Expert"]

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Set up your profile</h2>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-12 text-base"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Connect to Upwork</h2>
              <p className="text-muted-foreground">Link your account for personalized job recommendations</p>
            </div>
            <div className="p-6 border-2 border-dashed border-border rounded-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <Button className="w-full h-12">Connect Upwork Account</Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Job Preferences</h2>
              <p className="text-muted-foreground">Choose your skills and experience level</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Skills</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSkills.map((skill) => (
                    <Button
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSkillToggle(skill)}
                      className="h-10"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label>Experience Level</Label>
                <div className="grid grid-cols-1 gap-2">
                  {experienceLevels.map((level) => (
                    <Button
                      key={level}
                      variant={formData.experience === level ? "default" : "outline"}
                      onClick={() => setFormData((prev) => ({ ...prev, experience: level }))}
                      className="h-12 justify-start"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader>
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="font-medium">{Math.round(progress)}% Complete</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {renderStepContent()}

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="h-12">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button onClick={handleNext} className="h-12">
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
              {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
