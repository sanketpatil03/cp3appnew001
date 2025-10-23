import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown, Lightbulb, Calendar, FileText, TrendingUp, MapPin } from "lucide-react";

interface Nudge {
  id: string;
  module: string;
  icon: React.ElementType;
  message: string;
  ctaText: string;
  ctaAction: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
}

interface NudgeCenterOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const nudges: Nudge[] = [
  {
    id: "1",
    module: "Tour Planning",
    icon: MapPin,
    message: "You haven't met Dr. Prakash Patil (High Potential, Cardio) in the last 32 days. Consider planning him in Week 1 to maintain relationship continuity.",
    ctaText: "Plan on 3rd Nov",
    ctaAction: "plan-doctor",
    priority: "high",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    module: "Territory Management",
    icon: TrendingUp,
    message: "2 new doctors Dr Rakesh J and Dr Ameer Patil were added in your territory this month. Schedule first calls to establish early engagement.",
    ctaText: "Plan on 4th Nov",
    ctaAction: "schedule-calls",
    priority: "medium",
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    module: "Pre-Call Planning",
    icon: FileText,
    message: "Dr. Sharma has shown increased interest in diabetes management. Prepare product samples and latest clinical data for your next visit.",
    ctaText: "View Details",
    ctaAction: "view-precall",
    priority: "medium",
    timestamp: "1 day ago"
  },
  {
    id: "4",
    module: "Tour Planning",
    icon: Calendar,
    message: "You've scheduled 2 calls on a national holiday (26th Jan). Please recheck your tour plan to avoid invalid scheduling.",
    ctaText: "Review Schedule",
    ctaAction: "review-schedule",
    priority: "high",
    timestamp: "1 day ago"
  },
  {
    id: "5",
    module: "Reporting",
    icon: Lightbulb,
    message: "Your DCR completion rate is at 95% this month. Complete 2 more pending reports to achieve 100% and earn bonus points.",
    ctaText: "Complete Reports",
    ctaAction: "complete-dcr",
    priority: "low",
    timestamp: "2 days ago"
  }
];

export const NudgeCenterOverlay = ({ open, onOpenChange }: NudgeCenterOverlayProps) => {
  const [feedback, setFeedback] = useState<Record<string, "like" | "dislike" | null>>({});

  const handleFeedback = (nudgeId: string, type: "like" | "dislike") => {
    setFeedback(prev => ({
      ...prev,
      [nudgeId]: prev[nudgeId] === type ? null : type
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-3xl p-0 flex flex-col">
        <SheetHeader className="px-6 pt-8 pb-6 border-b bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nudge Center
              </SheetTitle>
              <p className="text-sm text-muted-foreground">
                AI-powered insights tailored for your success
              </p>
            </div>
            <Badge 
              variant="secondary" 
              className="h-9 px-4 text-sm font-semibold shadow-sm bg-primary/10 text-primary border border-primary/20"
            >
              {nudges.length} Active Nudges
            </Badge>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-5">
            {nudges.map((nudge) => {
              const Icon = nudge.icon;
              return (
                <Card 
                  key={nudge.id} 
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border-l-[6px] bg-card/50 backdrop-blur"
                  style={{
                    borderLeftColor: nudge.priority === "high" ? "hsl(var(--destructive))" : 
                                    nudge.priority === "medium" ? "hsl(var(--warning))" : 
                                    "hsl(var(--primary))"
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${
                          nudge.priority === "high" ? "bg-gradient-to-br from-destructive/20 to-destructive/10" :
                          nudge.priority === "medium" ? "bg-gradient-to-br from-warning/20 to-warning/10" :
                          "bg-gradient-to-br from-primary/20 to-primary/10"
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            nudge.priority === "high" ? "text-destructive" :
                            nudge.priority === "medium" ? "text-warning" :
                            "text-primary"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold">
                            {nudge.module}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            {nudge.timestamp}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-semibold uppercase tracking-wider border-2 px-3 py-1 ${getPriorityColor(nudge.priority)}`}
                      >
                        {nudge.priority}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="bg-gradient-to-r from-muted/50 to-muted/20 rounded-lg p-4 border border-muted">
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {nudge.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <Button 
                        className="flex-1 h-11 font-semibold shadow-sm hover:shadow-md transition-all"
                        size="default"
                      >
                        {nudge.ctaText}
                      </Button>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-9 w-9 rounded-full transition-all ${
                            feedback[nudge.id] === "like" 
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
                              : "hover:bg-background"
                          }`}
                          onClick={() => handleFeedback(nudge.id, "like")}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-9 w-9 rounded-full transition-all ${
                            feedback[nudge.id] === "dislike" 
                              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm" 
                              : "hover:bg-background"
                          }`}
                          onClick={() => handleFeedback(nudge.id, "dislike")}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
