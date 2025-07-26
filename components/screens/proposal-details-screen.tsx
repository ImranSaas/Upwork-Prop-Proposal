import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle, Info } from "lucide-react";

interface ProposalDetailsScreenProps {
  proposal: {
    jobTitle?: string;
    clientName?: string;
    aiSummary?: string; // UpGenie AI-generated summary
    proposalText: string;
    status: string; // Sent, Viewed, Replied, Hired, Ghosted
    aiFeedback?: string; // Optional AI feedback
  };
  onGoBack?: () => void;
}

const statusColors: Record<string, string> = {
  Sent: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  Viewed: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  Replied: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  Hired: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
  Ghosted: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
};

export function ProposalDetailsScreen({ proposal, onGoBack }: ProposalDetailsScreenProps) {
  // Fallback for legacy data
  const jobTitle = proposal.jobTitle || "Job Title";
  const aiSummary = proposal.aiSummary ||
    "This is a software development job post seeking an experienced engineer to build, maintain, or improve a technical product. The role likely involves coding, collaborating with a team, and delivering solutions that meet client or business needs.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 to-white dark:from-background/80 dark:to-background/60 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 md:px-8 py-4 shadow-sm flex items-center gap-4">
        {onGoBack && (
          <button className="rounded-full p-2 hover:bg-muted transition-colors" onClick={onGoBack} aria-label="Go back">
            <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary/80" />
            <h1 className="font-extrabold text-lg md:text-2xl leading-tight tracking-tight text-foreground drop-shadow-sm">
              {jobTitle}
            </h1>
            <Badge className={`ml-2 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full ${statusColors[proposal.status] || "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300"}`}>{proposal.status}</Badge>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 w-full max-w-2xl md:max-w-5xl mx-auto px-2 md:px-0 py-6 flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Job Summary Section */}
          <div className="w-full md:w-1/2 min-w-0">
            <Card className="rounded-2xl shadow border-0 bg-gradient-to-br from-white/95 to-muted/60 dark:from-muted/80 dark:to-background/60 transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Sparkles className="h-5 w-5 text-primary/80" />
                <CardTitle className="text-base md:text-lg font-bold tracking-tight text-foreground">Job Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {aiSummary}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Submitted Proposal Section */}
          <div className="w-full md:w-1/2 min-w-0">
            <Card className="rounded-2xl shadow border-0 bg-white/95 dark:bg-muted/80 transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <CheckCircle className="h-5 w-5 text-primary/80" />
                <CardTitle className="text-base md:text-lg font-bold tracking-tight text-foreground">Submitted Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-sm md:text-base text-foreground whitespace-pre-line font-medium max-h-64 md:max-h-80 overflow-y-auto px-1 py-2 rounded-md border border-muted/30 bg-muted/10">
                  {proposal.proposalText}
                </div>
                {/* AI Feedback (Optional) */}
                {proposal.aiFeedback && (
                  <div className="mt-4 flex items-start gap-2 text-xs md:text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-md px-3 py-2">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{proposal.aiFeedback}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}