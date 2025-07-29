"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronLeft, ChevronRight, Sparkles, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const keywordSuggestions = [
  "React", "Copywriting", "AI", "Shopify", "Figma", "UX Design", "Web Development", "SEO", "Branding", "Python", "Data Analysis", "Marketing", "Content Writing", "Project Management", "WordPress", "Mobile Apps"
];
const experienceLevels = ["Entry", "Intermediate", "Expert"];

interface JobPreferencesOnboardingProps {
  onComplete: (prefs: any) => Promise<void>;
}

export function JobPreferencesOnboarding({ onComplete }: JobPreferencesOnboardingProps) {
  const [step, setStep] = useState(0);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [hourlyMin, setHourlyMin] = useState("");
  const [fixedMin, setFixedMin] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [minClientSpend, setMinClientSpend] = useState("");
  const [clientVerified, setClientVerified] = useState(false);
  const [minClientRating, setMinClientRating] = useState("");

  const steps = [
    "Keywords",
    "Budget",
    "Experience",
    "Minimum Client Spend",
    "Review"
  ];

  const progress = ((step + 1) / steps.length) * 100;

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (kw: string) => setKeywords(keywords.filter(k => k !== kw));
  const handleToggleExperience = (level: string) => setExperience(
    experience.includes(level) ? experience.filter(e => e !== level) : [...experience, level]
  );

  const handleNext = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      // 1. Get the current user from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error(userError?.message || 'User not authenticated');
      }

      // 2. Prepare the data
      const preferences = {
        user_id: user.id,
        keywords: Array.isArray(keywords) ? keywords.join(",") : keywords,
        hourly_min: hourlyMin !== "" ? Number(hourlyMin) : null,
        fixed_min: fixedMin !== "" ? Number(fixedMin) : null,
        experience_levels: Array.isArray(experience) ? experience.join(",") : experience,
        min_client_spend: minClientSpend ? Number(minClientSpend) : null,
        client_verified: clientVerified,
        min_client_rating: minClientRating ? Number(minClientRating) : null
      };

      console.log('Saving preferences:', preferences);

      // 3. Upsert (insert or update) the preferences
      const { data, error: upsertError } = await supabase
        .from('job_alert_preferences')
        .upsert(
          [preferences],
          { onConflict: 'user_id' }
        )
        .select();

      if (upsertError) {
        console.error('Failed to save preferences:', upsertError);
        throw new Error(upsertError.message);
      }

      console.log('Preferences saved successfully:', data);
      
      // Show success message first
      setShowSuccess(true);
      
      // Wait a moment for the user to see the success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Then call the onComplete callback which will handle the navigation
      await onComplete({
        keywords,
        hourlyMin,
        fixedMin,
        experience,
        minClientSpend,
        clientVerified,
        minClientRating,
      });
    } catch (e: any) {
      setError(e.message || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-emerald-50/80 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-6">
      <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-8 z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-1 text-center drop-shadow-lg">Train AI for Specific Job Alerts</h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl mb-4">Help UpGenie learn your preferences so you get alerted for the types of jobs you want.</p>
      </div>
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl border-none bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md p-0 animate-fade-in mt-32">
        <CardHeader className="mb-2 pt-8 pb-4 flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-emerald-400 rounded-2xl flex items-center justify-center mb-2 animate-bounce-in">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <Progress value={progress} className="h-2 rounded-full bg-primary/10 mb-4 w-full transition-all duration-500" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-1 text-center">
            {step === 0 && "Add Your Keywords"}
            {step === 1 && "Set Your Budget"}
            {step === 2 && "Your Experience Level"}
            {step === 3 && "Minimum Client Spend"}
            {step === 4 && "Review & Finish"}
          </h2>
          <p className="text-muted-foreground text-base text-center max-w-md">
            {step === 0 && "Add keywords to help us match you with the best jobs. You can add as many as you like."}
            {step === 1 && "Choose your preferred budget type and minimum rate."}
            {step === 2 && "Select all experience levels that apply to you."}
            {step === 3 && "Set the minimum amount of client spend for jobs you want to see."}
            {step === 4 && "Review your preferences. You can always update these later in Settings."}
          </p>
        </CardHeader>
        <CardContent className="space-y-8 px-4 sm:px-8 pb-8 pt-2">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4 animate-bounce-in">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">You're all set!</h3>
              <p className="text-base text-muted-foreground text-center">Your preferences have been saved. Welcome to your personalized dashboard!</p>
            </div>
          ) : (
            <>
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="absolute top-4 left-4 flex items-center gap-2 text-primary hover:underline font-medium text-base z-10"
                  aria-label="Go back"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
              )}
              {step === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2 justify-center">
                    {keywords.map((kw) => (
                      <Badge key={kw} className="bg-gradient-to-r from-primary to-emerald-400 text-white font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-all cursor-pointer" onClick={() => handleRemoveKeyword(kw)}>
                        {kw} <span className="ml-1">&times;</span>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Input
                      value={keywordInput}
                      onChange={e => setKeywordInput(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddKeyword(); }}}
                      placeholder="e.g. React, Copywriting"
                      className="flex-1 max-w-xs"
                    />
                    <Button onClick={handleAddKeyword} disabled={!keywordInput.trim()} className="rounded-full px-6">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {keywordSuggestions.map(s => (
                      <Button key={s} variant="outline" size="sm" className="rounded-full border-primary/30 text-primary/90 hover:bg-primary/10 transition-all" onClick={() => { setKeywordInput(s); handleAddKeyword(); }}>{s}</Button>
                    ))}
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="relative">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Set Your Rate Requirements</h2>
                    <p className="text-muted-foreground">Define your minimum rates to receive relevant job matches</p>
                  </div>

                  <div className="space-y-6">
                    {/* Hourly Rate Input */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-foreground">Minimum Hourly Rate</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                    <Input
                      type="number"
                      min={0}
                          placeholder="50"
                      value={hourlyMin}
                      onChange={e => setHourlyMin(e.target.value)}
                          className="pl-7 pr-12 h-12 text-lg font-medium rounded-lg border-primary/20 focus:border-primary bg-white dark:bg-zinc-900 shadow-sm text-center"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">/hr</span>
                        </div>
                      </div>
                    </div>

                    {/* Fixed Price Input */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-foreground">Minimum Fixed Price</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                    <Input
                      type="number"
                      min={0}
                          placeholder="500"
                      value={fixedMin}
                      onChange={e => setFixedMin(e.target.value)}
                          className="pl-7 pr-4 h-12 text-lg font-medium rounded-lg border-primary/20 focus:border-primary bg-white dark:bg-zinc-900 shadow-sm text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-center text-muted-foreground">
                      <span className="text-primary font-medium">Tip:</span> Setting appropriate minimums helps filter out jobs that don't match your rate requirements
                    </p>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="relative">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {experienceLevels.map(level => (
                      <Button
                        key={level}
                        variant={experience.includes(level) ? "default" : "outline"}
                        onClick={() => handleToggleExperience(level)}
                        className={`rounded-full px-8 py-3 text-lg font-semibold shadow transition-all ${experience.includes(level) ? "bg-gradient-to-r from-primary to-emerald-400 text-white" : "bg-white dark:bg-zinc-900 border-primary/20 text-primary/90"}`}
                      >
                        {level} {experience.includes(level) && <Check className="h-4 w-4 ml-1" />}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="relative w-full max-w-md mx-auto">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Minimum Client Spend</h2>
                    <p className="text-muted-foreground">Filter jobs by the minimum amount a client has spent on Upwork</p>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="minClientSpend" className="block text-sm font-medium mb-2 text-foreground">Select Minimum Client Spend</label>
                    <select
                      id="minClientSpend"
                      value={minClientSpend}
                      onChange={e => setMinClientSpend(e.target.value)}
                      className="w-full h-12 rounded-lg border border-primary/20 focus:border-primary bg-white dark:bg-zinc-900 text-base font-medium px-4 shadow-sm"
                    >
                      <option value="">Any</option>
                      <option value="100">$0 - $100</option>
                      <option value="200">$100 - $200</option>
                      <option value="500">$200 - $500</option>
                      <option value="1000">$500 - $1,000</option>
                      <option value="10000">$1,000 - $10,000</option>
                      <option value="10001">$10,000+</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="clientVerified"
                        checked={clientVerified}
                        onChange={e => setClientVerified(e.target.checked)}
                        className="accent-primary h-5 w-5 rounded border-primary/30"
                      />
                      <label htmlFor="clientVerified" className="text-base font-medium text-primary flex items-center gap-2">
                      Verified Payment Only
                      </label>
                    </div>
                  <div className="mb-4">
                    <label htmlFor="minClientRating" className="block text-sm font-medium mb-2 text-foreground">Minimum Client Rating</label>
                      <select
                        id="minClientRating"
                        value={minClientRating}
                        onChange={e => setMinClientRating(e.target.value)}
                      className="w-full h-12 rounded-lg border border-primary/20 focus:border-primary bg-white dark:bg-zinc-900 text-base font-medium px-4 shadow-sm"
                      >
                        <option value="">Any</option>
                        <option value="3.0">3.0+</option>
                        <option value="4.0">4.0+</option>
                        <option value="4.5">4.5+</option>
                      </select>
                    </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-center text-muted-foreground">
                      <span className="text-primary font-medium">Tip:</span> Higher client spend and rating often means more reliable clients and larger projects.
                    </p>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="relative">
                  <div className="w-full max-w-md mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-4 flex flex-col items-center border border-primary/10">
                      <div className="mb-2 flex items-center gap-2 text-primary font-bold text-lg">
                        <Sparkles className="h-5 w-5" /> Keywords
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {keywords.length ? keywords.map((kw) => (
                          <Badge key={kw} className="bg-gradient-to-r from-primary to-emerald-400 text-white font-semibold px-3 py-1 rounded-full shadow">
                            {kw}
                          </Badge>
                        )) : <span className="text-muted-foreground">None</span>}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-4 flex flex-col items-center border border-primary/10">
                      <div className="mb-2 flex items-center gap-2 text-primary font-bold text-lg">
                        <Check className="h-5 w-5" /> Budget
                      </div>
                      <div className="text-base font-medium text-center space-y-2">
                        {hourlyMin && (
                          <div className="bg-primary/10 rounded-full px-4 py-2">
                            Hourly Rate: <span className="text-primary">${hourlyMin}/hr</span> minimum
                          </div>
                        )}
                        {fixedMin && (
                          <div className="bg-primary/10 rounded-full px-4 py-2">
                            Fixed Price: <span className="text-primary">${fixedMin}</span> minimum
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-4 flex flex-col items-center border border-primary/10">
                      <div className="mb-2 flex items-center gap-2 text-primary font-bold text-lg">
                        <CheckCircle className="h-5 w-5" /> Experience
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {experience.length ? experience.map((exp) => (
                          <Badge key={exp} className="bg-gradient-to-r from-primary to-emerald-400 text-white font-semibold px-3 py-1 rounded-full shadow">
                            {exp}
                          </Badge>
                        )) : <span className="text-muted-foreground">None</span>}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-4 flex flex-col items-center border border-primary/10 col-span-1 sm:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-primary font-bold text-lg">
                        <Check className="h-5 w-5" /> Minimum Client Spend
                      </div>
                      <div className="text-base font-medium text-center">
                        {minClientSpend ? `$${minClientSpend}` : <span className="text-muted-foreground">None</span>}
                        {clientVerified && (
                          <span className="ml-2 inline-flex items-center text-green-600 font-semibold"><Check className="h-4 w-4 mr-1" />Verified Payment</span>
                        )}
                        {minClientRating && (
                          <span className="ml-2 inline-flex items-center text-yellow-600 font-semibold"><Check className="h-4 w-4 mr-1" />Min Rating: {minClientRating}+</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                </div>
              )}
              <div className="flex justify-between mt-8">
                {step > 0 && (
                <Button variant="outline" onClick={handleBack} disabled={step === 0} className="h-12 rounded-full px-8 text-base font-semibold">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button onClick={handleNext} className="h-12 rounded-full px-8 text-base font-semibold bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg hover:from-primary/90 hover:to-emerald-500 transition-all" disabled={
                    (step === 0 && keywords.length === 0) ||
                    (step === 1 && (!hourlyMin || !fixedMin)) ||
                    (step === 2 && experience.length === 0) ||
                    (step === 3 && !minClientSpend)
                  }>
                    Next <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="h-12 rounded-full px-8 text-base font-semibold bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg hover:from-primary/90 hover:to-emerald-500 transition-all" disabled={saving}>
                    {saving ? "Saving..." : "Finish"}
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
 
 
 
 
 
 
 
 
 
 