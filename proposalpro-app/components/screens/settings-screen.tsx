"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { supabase } from "@/lib/supabaseClient"
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SettingsScreenProps {
  onLogout: () => void | Promise<void>
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

export function SettingsScreen({ onLogout }: SettingsScreenProps) {
  // Theme is handled by the system
  // Fetch user data from Supabase
  const [user, setUser] = useState<{ name: string; email: string }>({ name: "", email: "" })
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  // Upwork connection
  const [upworkConnected, setUpworkConnected] = useState(true)
  // Notification toggles (handled locally)
  const [emailJobAlerts, setEmailJobAlerts] = useState(true)
  const [aiTips, setAiTips] = useState(false)
  const [allowLearning, setAllowLearning] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(true);

  // Job preferences state
  const [keywords, setKeywords] = useState<string[]>([]);
  const [hourlyMin, setHourlyMin] = useState<string>("");
  const [fixedMin, setFixedMin] = useState<string>("");
  const [experience, setExperience] = useState<string[]>([]);
  const [clientVerified, setClientVerified] = useState(false);
  const [minClientSpend, setMinClientSpend] = useState<string>("");
  const [minClientRating, setMinClientRating] = useState<string>("");


  const experienceLevels = ["Entry", "Intermediate", "Expert"];

  const keywordSuggestions = [
    "React", "Copywriting", "AI", "Shopify", "Figma", "UX Design", "Web Development", "SEO", "Branding", "Python", "Data Analysis", "Marketing", "Content Writing", "Project Management", "WordPress", "Mobile Apps"
  ];

  const minClientSpendLabel = (value: string) => {
    switch (value) {
      case "100": return "$0 - $100";
      case "200": return "$100 - $200";
      case "500": return "$200 - $500";
      case "1000": return "$500 - $1,000";
      case "10000": return "$1,000 - $10,000";
      case "10001": return "$10,000+";
      default: return "Any";
    }
  };

  // Load user preferences from Supabase
  const loadUserPreferences = async (userId: string) => {
    try {
      const { data: preferences, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        throw error;
      }

      if (preferences) {
        setKeywords(preferences.keywords || []);
        setHourlyMin(preferences.hourly_rate_min?.toString() || '');
        setFixedMin(preferences.fixed_price_min?.toString() || '');
        setExperience(preferences.experience_levels || []);
        setClientVerified(preferences.client_verified_only || false);
        setMinClientSpend(preferences.min_client_spend?.toString() || '');
        setMinClientRating(preferences.min_client_rating?.toString() || '');
        // Notification and privacy preferences are now handled locally
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
      // Continue with default values if there's an error
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        if (user) {
          const userName = user.user_metadata?.full_name || user.user_metadata?.name || 'User';
          const userEmail = user.email || '';
          
          setUser({ name: userName, email: userEmail });
          setEditName(userName);
          setEditEmail(userEmail);
          
          // Load user preferences
          await loadUserPreferences(user.id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to default values if there's an error
        setUser({ name: 'User', email: '' });
        setEditName('User');
        setEditEmail('');
      } finally {
        setLoadingPreferences(false);
      }
    };

    fetchUserData();
  }, []);

  // Billing
  const currentPlan = "$19.99/mo"

  // Handlers
  const handleEditProfile = () => {
    setUser({ name: editName, email: editEmail })
  }

  const handleSavePreferences = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      console.log('Starting to save preferences...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('User not authenticated:', userError);
        throw new Error('User not authenticated');
      }

      console.log('User authenticated, preparing preferences data...');
      const preferences = {
        id: user.id, // Make sure we include the primary key for upsert
        user_id: user.id,
        keywords: keywords,
        hourly_rate_min: hourlyMin ? parseFloat(hourlyMin) : null,
        fixed_price_min: fixedMin ? parseFloat(fixedMin) : null,
        experience_levels: experience,
        client_verified_only: clientVerified,
        min_client_spend: minClientSpend ? parseFloat(minClientSpend) : null,
        min_client_rating: minClientRating ? parseFloat(minClientRating) : null
      };

      console.log('Preferences data prepared:', preferences);

      // First try to insert, if it fails with unique violation, then update
      console.log('Attempting to upsert preferences...');
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert([preferences], { onConflict: 'id' })
        .select();

      console.log('Upsert response:', { data, error });

      if (error) {
        console.error('Detailed error from Supabase:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      console.log('Preferences saved successfully:', data);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error in handleSavePreferences:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : ''
      });
      setSaveError(`Failed to save preferences: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
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
              <CardDescription>Update your display name</CardDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="editName">Display Name</Label>
                <Input
                  id="editName"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email}
                  readOnly
                  disabled
                  className="opacity-70 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
            </div>
            <DialogFooter className="flex gap-2 pt-2">
              <Button onClick={handleEditProfile} className="bg-primary hover:bg-primary/90">Save Changes</Button>
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
            <div className="bg-muted/60 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Minimum Budget Requirements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Hourly Rate Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-foreground">Minimum Hourly Rate</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={0}
                      placeholder="50"
                      value={hourlyMin}
                      onChange={e => setHourlyMin(e.target.value)}
                      className="pl-7 pr-12 h-11 text-base font-medium rounded-lg border-primary/20 focus:border-primary bg-white dark:bg-zinc-900 shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">/hr</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Set your minimum hourly rate for job alerts</p>
                </div>

                {/* Fixed Price Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-foreground">Minimum Fixed Price</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={0}
                      placeholder="500"
                      value={fixedMin}
                      onChange={e => setFixedMin(e.target.value)}
                      className="pl-7 pr-4 h-11 text-base font-medium rounded-lg border-primary/20 focus:border-primary bg-white dark:bg-zinc-900 shadow-sm"
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Set your minimum project budget for job alerts</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">Tip:</span> Setting appropriate minimums helps filter out jobs that don't match your rate requirements
                </p>
              </div>
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
            {/* Client Requirements */}
            <div className="bg-muted/60 rounded-xl p-4 space-y-4">
              <label className="block text-sm font-semibold mb-1">Client Requirements</label>
              <div className="flex flex-col sm:flex-row gap-4 mt-2 flex-wrap">
                <label className="flex items-center gap-2 text-sm font-medium bg-primary/10 px-3 py-1 rounded-full cursor-pointer hover:bg-primary/20 transition">
                  <Checkbox checked={clientVerified} onCheckedChange={checked => setClientVerified(!!checked)} />
                  Verified Payment Only
                </label>
                {/* In the Client Requirements section, update the minimum client spend dropdown to match the rounded-full style of the client rating dropdown, and remove the badge. */}
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Minimum client spend</span>
                  <select
                    className="w-32 rounded-full border border-primary/20 focus:border-primary bg-white dark:bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition hover:bg-primary/5 appearance-none cursor-pointer"
                    value={minClientSpend}
                    onChange={e => setMinClientSpend(e.target.value)}
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
