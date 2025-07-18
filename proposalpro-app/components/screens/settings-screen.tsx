"use client"

import { useEffect, useState } from "react"
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
  CheckCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SettingsScreenProps {
  onLogout: () => void
  onNavigate?: (screen: string) => void
}

// Tag input component for keywords and categories with suggestions
function TagInput({ label, placeholder, value, setValue, suggestions = [] }: { label: string, placeholder: string, value: string[], setValue: (v: string[]) => void, suggestions?: string[] }) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s)
  ).slice(0, 5);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement> | undefined, tag?: string) => {
    if ((e && (e.key === "Enter" || e.key === ",")) || tag) {
      e && e.preventDefault();
      const newTag = tag || input.trim();
      if (newTag && !value.includes(newTag)) {
        setValue([...value, newTag]);
      }
      setInput("");
      setShowSuggestions(false);
    }
  };
  const removeTag = (tag: string) => setValue(value.filter(t => t !== tag));
  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md min-h-[44px]">
        {value.map((tag, i) => (
          <span key={i} className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {tag}
            <button type="button" className="ml-1 text-primary hover:text-red-500" onClick={() => removeTag(tag)}>&times;</button>
          </span>
        ))}
        <input
          className="flex-1 min-w-[120px] bg-transparent outline-none border-none text-sm px-1 py-0.5"
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={e => addTag(e)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-10 bg-white dark:bg-background border border-primary/20 rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
          {filteredSuggestions.map((s, i) => (
            <div
              key={i}
              className="px-3 py-2 cursor-pointer hover:bg-primary/10 text-sm"
              onMouseDown={() => addTag(undefined, s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SettingsScreen({ onLogout, onNavigate }: SettingsScreenProps) {
  const { theme, setTheme } = useTheme()
  // Fetch user data from Supabase
  const [user, setUser] = useState<{ name: string; email: string }>({ name: "", email: "" })
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  // Upwork connection
  const [upworkConnected, setUpworkConnected] = useState(true)
  // Notification toggles
  const [emailJobAlerts, setEmailJobAlerts] = useState(true)
  const [aiTips, setAiTips] = useState(false)
  // Privacy toggle
  const [allowLearning, setAllowLearning] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(true);

  const [keywords, setKeywords] = useState<string[]>([]); // No default keywords
  const [budgetType, setBudgetType] = useState<"hourly" | "fixed">("hourly");
  const [hourlyMin, setHourlyMin] = useState<string>("");
  const [hourlyMax, setHourlyMax] = useState<number | "">("");
  const [fixedMin, setFixedMin] = useState<string>("");
  const [fixedMax, setFixedMax] = useState<number | "">("");
  const [experience, setExperience] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [clientVerified, setClientVerified] = useState(false);
  const [minClientSpend, setMinClientSpend] = useState<string>("");
  const [minClientRating, setMinClientRating] = useState<string>("");
  const [minClientHireRate, setMinClientHireRate] = useState<string>("");
  const clientHireRateOptions = [
    { label: "Any", value: "" },
    { label: "50%+", value: "50" },
    { label: "70%+", value: "70" },
    { label: "90%+", value: "90" },
    { label: "100%", value: "100" },
  ];

  const jobCategories = [
    "Web Development", "Design", "Sales & Marketing", "Writing", "AI", "Mobile Apps", "Data Science", "Admin Support"
  ];
  const experienceLevels = ["Entry", "Intermediate", "Expert"];

  const keywordSuggestions = [
    "React", "Copywriting", "AI", "Shopify", "Figma", "UX Design", "Web Development", "SEO", "Branding", "Python", "Data Analysis", "Marketing", "Content Writing", "Project Management", "WordPress", "Mobile Apps"
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || "";
        setUser({ name: name ?? '', email: user.email ?? '' });
        setEditName(name ?? '');
        setEditEmail(user.email ?? '');

        // Fetch job alert preferences
        const { data: prefs, error } = await supabase
          .from("job_alert_preferences")
          .select("*")
          .eq("user_id", user.id)
          .single();
        if (prefs) {
          setKeywords(prefs.keywords ? prefs.keywords.split(",") : []);
          setBudgetType(prefs.budget_type || "hourly");
          setHourlyMin(prefs.hourly_min !== null && prefs.hourly_min !== undefined ? String(prefs.hourly_min) : "");
          setFixedMin(prefs.fixed_min !== null && prefs.fixed_min !== undefined ? String(prefs.fixed_min) : "");
          setExperience(prefs.experience_levels ? prefs.experience_levels.split(",") : []);
          setCategories(prefs.categories ? prefs.categories.split(",") : []);
          setClientVerified(!!prefs.client_verified);
          setMinClientSpend(prefs.min_client_spend !== null && prefs.min_client_spend !== undefined ? String(prefs.min_client_spend) : "");
          setMinClientRating(prefs.min_client_rating !== null && prefs.min_client_rating !== undefined ? String(prefs.min_client_rating) : "");
          setMinClientHireRate(prefs.min_client_hire_rate !== null && prefs.min_client_hire_rate !== undefined ? String(prefs.min_client_hire_rate) : "");
        }
        setLoadingPreferences(false);
      } else {
        setLoadingPreferences(false);
      }
    };
    fetchUser();
  }, []);

  // Billing
  const currentPlan = "$19.99/mo"

  // Handlers
  const handleEditProfile = () => {
    setUser({ name: editName, email: editEmail })
    setEditing(false)
  }

  const handleSavePreferences = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    // 1. Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setSaveError("Could not get user info.");
      setSaving(false);
      return;
    }

    // 2. Prepare the data
    const preferences = {
      user_id: user.id,
      keywords: Array.isArray(keywords) ? keywords.join(",") : keywords, // store as comma-separated string
      budget_type: budgetType,
      hourly_min: budgetType === "hourly" ? Number(hourlyMin) || null : null,
      fixed_min: budgetType === "fixed" ? Number(fixedMin) || null : null,
      experience_levels: Array.isArray(experience) ? experience.join(",") : experience,
      categories: Array.isArray(categories) ? categories.join(",") : categories,
      client_verified: clientVerified,
      min_client_spend: minClientSpend ? Number(minClientSpend) : null,
      min_client_rating: minClientRating ? Number(minClientRating) : null,
      min_client_hire_rate: minClientHireRate ? Number(minClientHireRate) : null,
    };

    // 3. Upsert (insert or update) the preferences
    const { error } = await supabase
      .from("job_alert_preferences")
      .upsert([preferences], { onConflict: "user_id" }); // onConflict ensures one row per user

    if (error) {
      setSaveError("Failed to save preferences: " + error.message);
    } else {
      setSaveSuccess(true);
    }
    setSaving(false);
  };

  if (loadingPreferences) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="w-full max-w-xs">
          <div className="bg-white dark:bg-background shadow-lg rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
            <div className="text-lg font-semibold text-primary">Loading your preferences...</div>
            <div className="text-sm text-muted-foreground text-center">
              Please wait while we fetch your personalized settings.
            </div>
          </div>
        </div>
      </div>
    );
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
      {/* Job Alert Preferences */}
      <section className="space-y-2 animate-slide-in-from-top">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2 rounded-full mb-2">Job Alert Preferences</Badge>
        <Card className="bg-gradient-to-br from-white/95 to-emerald-50/60 dark:from-background/95 dark:to-gray-900/60 shadow-2xl rounded-2xl border-none backdrop-blur-md mt-10">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-3 mb-1">
              <Bell className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-bold text-primary">Job Alert Preferences</CardTitle>
            </div>
            <p className="text-base text-muted-foreground font-normal mb-2">Personalize your job alerts to match your ideal opportunities.</p>
            <div className="h-px w-full bg-gradient-to-r from-primary/20 via-emerald-200/30 to-transparent my-2" />
          </CardHeader>
          <CardContent className="space-y-8 pt-2 pb-8 px-2 sm:px-6 md:px-10">
            {/* Preferred Keywords */}
            <div className="space-y-1">
              <TagInput
                label="Preferred Keywords / Topics"
                placeholder='e.g. "UX Design", "Figma", "Upwork Profile Optimization"'
                value={keywords}
                setValue={setKeywords}
                suggestions={keywordSuggestions}
              />
              <p className="text-xs text-muted-foreground ml-1">Used to match job titles and descriptions</p>
            </div>
            {/* Budget Type & Range */}
            <div className="bg-muted/60 rounded-xl p-4 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">Budget Type</label>
                  <RadioGroup value={budgetType} onValueChange={v => setBudgetType(v as "hourly" | "fixed")}
                    className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <span className="text-sm">Hourly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <span className="text-sm">Fixed Price</span>
                    </label>
                  </RadioGroup>
                </div>
                {budgetType === "hourly" ? (
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">Min Hourly Rate</label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={0}
                      placeholder="$ / hr e.g. 50"
                      value={hourlyMin}
                      onChange={e => setHourlyMin(e.target.value)}
                      className="rounded-lg border border-primary/20 focus:border-primary"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">Min Fixed Price</label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={0}
                      placeholder="$ e.g. 500"
                      value={fixedMin}
                      onChange={e => setFixedMin(e.target.value)}
                      className="rounded-lg border border-primary/20 focus:border-primary"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground ml-1 mt-1">Set your preferred price range for jobs</p>
            </div>
            {/* Experience Level */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold mb-1">Experience Level</label>
              <div className="flex gap-4 flex-wrap mt-2">
                {experienceLevels.map(level => (
                  <label key={level} className="flex items-center gap-2 text-sm font-medium bg-primary/10 px-3 py-1 rounded-full cursor-pointer hover:bg-primary/20 transition">
                    <Checkbox checked={experience.includes(level)} onCheckedChange={checked => {
                      setExperience(!!checked ? [...experience, level] : experience.filter(l => l !== level));
                    }} />
                    {level}
                  </label>
                ))}
              </div>
            </div>
            {/* Job Categories */}
            <div className="space-y-1">
              <TagInput
                label="Job Categories"
                placeholder='e.g. "Web Development", "Design"'
                value={categories}
                setValue={setCategories}
              />
              <p className="text-xs text-muted-foreground ml-1">Choose categories to focus your job alerts</p>
            </div>
            {/* Client Requirements */}
            <div className="bg-muted/60 rounded-xl p-4 space-y-4">
              <label className="block text-sm font-semibold mb-1">Client Requirements</label>
              <div className="flex flex-col sm:flex-row gap-4 mt-2 flex-wrap">
                <label className="flex items-center gap-2 text-sm font-medium bg-primary/10 px-3 py-1 rounded-full cursor-pointer hover:bg-primary/20 transition">
                  <Checkbox checked={clientVerified} onCheckedChange={checked => setClientVerified(!!checked)} />
                  Verified Payment Only
                </label>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Minimum client spend</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={0}
                    placeholder="$ e.g. 1000"
                    className="w-28 rounded-md border border-primary/20 focus:border-primary"
                    value={minClientSpend}
                    onChange={e => setMinClientSpend(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Minimum client rating</span>
                  <select
                    className="w-28 rounded-full border border-primary/30 bg-white dark:bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition hover:bg-primary/5 appearance-none cursor-pointer"
                    value={minClientRating}
                    onChange={e => setMinClientRating(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="3.0">3.0+</option>
                    <option value="4.0">4.0+</option>
                    <option value="4.5">4.5+</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Minimum client hire rate</span>
                  <select
                    className="w-28 rounded-full border border-primary/30 bg-white dark:bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition hover:bg-primary/5 appearance-none cursor-pointer"
                    value={minClientHireRate}
                    onChange={e => setMinClientHireRate(e.target.value)}
                  >
                    {clientHireRateOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-muted-foreground ml-1 mt-1">Set minimum client spend or rating to filter for quality clients</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center pb-6">
            <Button
              className="h-10 px-8 text-base font-semibold bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-600 rounded-full shadow-lg transition-all flex items-center gap-2 mt-4"
              onClick={handleSavePreferences}
              disabled={saving}
            >
              <CheckCircle className="h-5 w-5" />
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
            {saveError && (
              <div className="mt-3 w-full max-w-md">
                <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-4 shadow-sm">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-700 dark:text-red-300 font-medium">{saveError}</span>
                </div>
              </div>
            )}
            {saveSuccess && (
              <div className="mt-3 w-full max-w-md">
                <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-4 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">Preferences saved!</span>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      </section>
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
