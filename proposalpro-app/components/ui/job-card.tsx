import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Calendar, Verified, Send } from "lucide-react";
import { Sparkles } from "lucide-react";
import React from "react";

interface JobCardProps {
  job: any;
  index?: number;
  onProposal?: (job: any) => void;
  isMobile?: boolean;
  onClick?: (job: any) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, index = 0, onProposal, isMobile = false, onClick }) => (
  <div
    className="w-full relative group bg-white/90 dark:bg-background/90 rounded-xl shadow-md p-3 sm:p-6 flex flex-col gap-4 items-start transition-transform hover:scale-[1.02] hover:shadow-xl border-none overflow-hidden min-h-[160px] sm:min-h-[180px]"
    style={{ animationDelay: `${index * 80}ms` }}
    onClick={() => onClick && onClick(job)}
  >
    {/* Left Accent Bar */}
    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-emerald-400 rounded-l-xl" />
    <div className="flex-1 z-10 w-full flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        {job.featured && (
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>
      <h3 className="text-base sm:text-xl font-bold mb-1 hover:text-primary transition-colors leading-tight">{job.title}</h3>
      <div className="flex flex-wrap gap-2 items-center mb-1">
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">Match: {job.matchScore}%</Badge>
        <span className="text-xs text-muted-foreground font-medium">{job.budget} ({job.budgetType})</span>
        {job.duration && (
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1"><Clock className="h-4 w-4" />{job.duration}</span>
        )}
        {job.experienceLevel && (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">{job.experienceLevel}</Badge>
        )}
      </div>
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-2 sm:p-4 border border-primary/10 mb-1">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-primary mb-1">AI Job Summary</p>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{job.aiSummary}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-1">
        {job.skills && job.skills.map((skill: string, skillIndex: number) => (
          <Badge key={skillIndex} variant="secondary" className="text-xs px-2 py-0.5 rounded-full bg-muted/60 border-none font-medium">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 items-center text-xs text-muted-foreground mt-1">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{job.client?.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{job.client?.rating}</span>
          <span>({job.client?.reviewCount})</span>
        </div>
        <span>{job.client?.totalSpent} spent</span>
        <span>Connects: {job.connectsRequired}</span>
        <span>Member since {job.client?.memberSince}</span>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{job.timePosted}</span>
        </div>
        {job.client?.verified && <Verified className="h-3 w-3 text-blue-500" />}
      </div>
    </div>
    <div className="flex flex-col gap-2 z-10 w-full">
      <Button
        size="sm"
        className="hover-lift bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold shadow-md w-full px-3 sm:px-4 py-2 mt-2"
        onClick={e => {
          e.stopPropagation();
          if (onProposal) onProposal(job);
        }}
      >
        <Send className="h-4 w-4 mr-2" />
        Generate Proposal
      </Button>
    </div>
  </div>
); 