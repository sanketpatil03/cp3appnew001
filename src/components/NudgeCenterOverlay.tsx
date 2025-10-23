import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Nudge {
  id: string;
  title: string;
  message: string;
  ctaText?: string;
}

interface NudgeCenterOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const nudges: Nudge[] = [
  {
    id: "1",
    title: "Doctor Coverage Gap",
    message: "You haven't met Dr. Prakash Patil (High Potential, Cardio) in the last 32 days, plan him in week 1.",
    ctaText: "Plan it on 3rd Nov"
  },
  {
    id: "2",
    title: "Newly Added Doctors",
    message: "2 new doctors Dr Rakesh J and Dr Ameer Patil were added in your territory this month - schedule first call.",
    ctaText: "Plan it on 4th Nov"
  },
  {
    id: "3",
    title: "Planning Done on Holiday",
    message: "You've scheduled 2 calls on a national holiday, please recheck.",
    ctaText: undefined
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

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20"
      onClick={() => onOpenChange(false)}
    >
      <div 
        className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-md space-y-3 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {nudges.map((nudge) => (
          <Card key={nudge.id} className="border-2 border-border">
            <div className="p-4 space-y-3">
              <h3 className="font-bold text-base text-foreground border-b border-border pb-2">
                {nudge.title}
              </h3>
              
              <p className="text-sm text-foreground leading-relaxed">
                {nudge.message}
              </p>

              <div className="flex items-center justify-between pt-2">
                {nudge.ctaText && (
                  <Button 
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {nudge.ctaText}
                  </Button>
                )}
                
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${
                      feedback[nudge.id] === "like" 
                        ? "bg-primary/20 text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => handleFeedback(nudge.id, "like")}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${
                      feedback[nudge.id] === "dislike" 
                        ? "bg-destructive/20 text-destructive" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => handleFeedback(nudge.id, "dislike")}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
