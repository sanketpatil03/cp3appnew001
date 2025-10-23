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
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-2xl font-bold">Nudge Center</SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered insights to help you excel
              </p>
            </div>
            <Badge variant="secondary" className="h-8 px-3">
              {nudges.length} Active
            </Badge>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-6 space-y-4">
            {nudges.map((nudge) => {
              const Icon = nudge.icon;
              return (
                <Card 
                  key={nudge.id} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4"
                  style={{
                    borderLeftColor: nudge.priority === "high" ? "hsl(var(--destructive))" : 
                                    nudge.priority === "medium" ? "hsl(var(--warning))" : 
                                    "hsl(var(--primary))"
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          nudge.priority === "high" ? "bg-destructive/10" :
                          nudge.priority === "medium" ? "bg-warning/10" :
                          "bg-primary/10"
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            nudge.priority === "high" ? "text-destructive" :
                            nudge.priority === "medium" ? "text-warning" :
                            "text-primary"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base font-semibold">
                            {nudge.module}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {nudge.timestamp}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-medium border ${getPriorityColor(nudge.priority)}`}
                      >
                        {nudge.priority}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-foreground">
                      {nudge.message}
                    </p>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <Button 
                        className="flex-1"
                        size="default"
                      >
                        {nudge.ctaText}
                      </Button>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-9 w-9 transition-colors ${
                            feedback[nudge.id] === "like" 
                              ? "bg-primary/10 text-primary hover:bg-primary/20" 
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleFeedback(nudge.id, "like")}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-9 w-9 transition-colors ${
                            feedback[nudge.id] === "dislike" 
                              ? "bg-destructive/10 text-destructive hover:bg-destructive/20" 
                              : "hover:bg-muted"
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
