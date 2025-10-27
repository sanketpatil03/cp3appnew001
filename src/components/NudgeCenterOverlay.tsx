import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown, Bell, X, Mic, Send, Sparkles } from "lucide-react";

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
    title: "Download Content",
    message: "You have 21 new content to download.",
    ctaText: undefined
  },
  {
    id: "2",
    title: "Sample Distribution",
    message: "Please have 25 qty of samples for Brand (x, y and z) for the day for distribution.",
    ctaText: undefined
  },
  {
    id: "3",
    title: "Action Points Overdue",
    message: "12 Action points are overdue for the doctors planned today. Please check.",
    ctaText: undefined
  },
  {
    id: "4",
    title: "New Brand Added",
    message: "New brand (Z1) has been added and Promotogram has changed for (Cardiologist) ((Dr Naresh and Harish)) - please review their playlist.",
    ctaText: undefined
  }
];

export const NudgeCenterOverlay = ({ open, onOpenChange }: NudgeCenterOverlayProps) => {
  const [feedback, setFeedback] = useState<Record<string, "like" | "dislike" | null>>({});
  const [message, setMessage] = useState("");

  const handleFeedback = (nudgeId: string, type: "like" | "dislike") => {
    setFeedback(prev => ({
      ...prev,
      [nudgeId]: prev[nudgeId] === type ? null : type
    }));
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Overlay Panel */}
      <div 
        className="fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-background shadow-2xl animate-slide-in-right flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-primary" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Nudge Center</h2>
              <p className="text-xs text-muted-foreground">AI-powered insights</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nudges List */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {nudges.map((nudge) => (
              <Card 
                key={nudge.id} 
                className="border border-border/50 bg-card hover:shadow-md transition-all duration-300"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-base text-foreground leading-tight">
                      {nudge.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {nudge.message}
                  </p>

                  {/* Action Row */}
                  <div className="flex items-center justify-between pt-2">
                    {nudge.ctaText && (
                      <Button 
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
                      >
                        {nudge.ctaText}
                      </Button>
                    )}
                    
                    {/* Feedback Icons */}
                    <div className="flex items-center gap-1 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-full transition-all ${
                          feedback[nudge.id] === "like" 
                            ? "bg-success/20 text-success hover:bg-success/30" 
                            : "text-muted-foreground hover:bg-success/10 hover:text-success"
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
                            ? "bg-destructive/20 text-destructive hover:bg-destructive/30" 
                            : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        }`}
                        onClick={() => handleFeedback(nudge.id, "dislike")}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-muted-foreground hover:bg-info/10 hover:text-info transition-all"
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Input Footer */}
        <div className="p-6 border-t bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pr-10 h-11 bg-background"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-full hover:bg-primary/10 hover:text-primary flex-shrink-0"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="h-11 w-11 rounded-full bg-primary hover:bg-primary/90 flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Button - Positioned separately */}
      {!open && (
        <Button
          onClick={() => onOpenChange(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40 p-0 bg-gradient-to-br from-primary to-secondary group overflow-visible"
          aria-label="Open Nudge Center"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-primary-foreground animate-pulse" />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              4
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </Button>
      )}
    </>
  );
};
