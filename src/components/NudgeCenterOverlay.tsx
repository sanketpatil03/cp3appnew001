import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Bell, X, Mic, Send, Sparkles, CheckCircle2 } from "lucide-react";

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
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md animate-fade-in"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Overlay Panel */}
      <div 
        className="fixed top-0 right-0 z-50 h-full w-full max-w-[480px] bg-gradient-to-br from-background via-background to-primary/5 shadow-2xl animate-slide-in-right flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Enhanced with gradient and better spacing */}
        <div className="relative px-8 py-6 border-b border-border/50">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  4
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Hey Phyzii</h2>
                <p className="text-sm text-muted-foreground">Your AI Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Nudges List - Enhanced cards with better visual hierarchy */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-4">
            {nudges.map((nudge, index) => (
              <Card 
                key={nudge.id} 
                className="group relative overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Subtle gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                
                <div className="p-6 space-y-4">
                  {/* Header with badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                          Nudge #{index + 1}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg text-foreground leading-tight">
                        {nudge.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Message */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {nudge.message}
                  </p>

                  {/* Action Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    {nudge.ctaText && (
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-md rounded-xl px-4"
                      >
                        {nudge.ctaText}
                      </Button>
                    )}
                    
                    {/* Feedback Icons - Enhanced design */}
                    <div className="flex items-center gap-2 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-xl transition-all ${
                          feedback[nudge.id] === "like" 
                            ? "bg-success/20 text-success hover:bg-success/30 shadow-sm" 
                            : "text-muted-foreground hover:bg-success/10 hover:text-success"
                        }`}
                        onClick={() => handleFeedback(nudge.id, "like")}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-xl transition-all ${
                          feedback[nudge.id] === "dislike" 
                            ? "bg-destructive/20 text-destructive hover:bg-destructive/30 shadow-sm" 
                            : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        }`}
                        onClick={() => handleFeedback(nudge.id, "dislike")}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-info/10 hover:text-info transition-all"
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

        {/* Input Footer - Enhanced with glassmorphism */}
        <div className="relative px-6 py-5 border-t border-border/50">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent backdrop-blur-sm" />
          
          <div className="relative flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-12 rounded-xl bg-card border-border/50 shadow-sm focus-visible:ring-primary/50 pr-12"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-xl hover:bg-primary/10 hover:text-primary flex-shrink-0 transition-all"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex-shrink-0 shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Button - Enhanced with better animation and design */}
      {!open && (
        <Button
          onClick={() => onOpenChange(true)}
          className="fixed bottom-8 right-8 h-20 w-20 rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-110 transition-all duration-300 z-40 p-0 bg-gradient-to-br from-primary via-secondary to-accent group overflow-hidden"
          aria-label="Open Hey Phyzii"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Animated background pulse */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 animate-pulse" />
            
            {/* Icon */}
            <Sparkles className="h-8 w-8 text-primary-foreground relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Badge */}
            <span className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse z-20 border-2 border-background">
              4
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
            
            {/* Tooltip text */}
            <div className="absolute -top-14 right-0 bg-foreground text-background text-sm font-semibold px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Hey Phyzii
              <div className="absolute -bottom-1 right-8 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </div>
        </Button>
      )}
    </>
  );
};
