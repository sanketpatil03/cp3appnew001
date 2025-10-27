import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, Bell, X, Mic, Send, Sparkles, CheckCircle2, Download, Gift, AlertTriangle, Plus } from "lucide-react";

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
    ctaText: "Download"
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
    ctaText: "Review Playlist"
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

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
          onClick={() => onOpenChange(false)}
        />
      )}
      
      {/* Overlay Panel - Zoom AI Companion Inspired */}
      {open && (
        <div 
          className="fixed top-0 right-0 z-50 h-full w-full max-w-[520px] bg-gradient-to-br from-white via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 shadow-2xl animate-slide-in-right flex flex-col border-l-2 border-primary/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Clean & Modern */}
          <div className="px-8 py-6 border-b border-border/30 bg-gradient-to-r from-blue-50/50 to-purple-50/30 dark:from-blue-950/30 dark:to-purple-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-pulse ring-2 ring-white dark:ring-gray-950">
                    4
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Get more done with
                  </h2>
                  <h3 className="text-3xl font-bold mt-1">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Hey </span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Phyzii</span>
                  </h3>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Introduction Card - What is Hey Phyzii? */}
          <div className="px-8 py-6 bg-gradient-to-br from-blue-50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/10 border-b border-border/30">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-lg">Hey Phyzii</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                I'm Hey Phyzii, your personal CRM assistant. I can help you with:
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Managing your daily schedule and doctor visits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Tracking action points and pending tasks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Monitoring sample distribution and inventory</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Alerting you about important updates and deadlines</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4 font-medium">
                Let me know how I can assist you!
              </p>
            </div>
          </div>

          {/* Nudges List - Clean Card Design */}
          <ScrollArea className="flex-1 px-8 py-6">
            <div className="space-y-4">
              {nudges.map((nudge, index) => (
                <div 
                  key={nudge.id} 
                  className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                      {index === 0 && <Download className="h-5 w-5 text-blue-600" />}
                      {index === 1 && <Gift className="h-5 w-5 text-purple-600" />}
                      {index === 2 && <AlertTriangle className="h-5 w-5 text-orange-600" />}
                      {index === 3 && <Plus className="h-5 w-5 text-green-600" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-base mb-2">
                        {nudge.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {nudge.message}
                      </p>
                      
                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/30">
                        {nudge.ctaText && (
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-sm rounded-lg px-4 h-9"
                          >
                            {nudge.ctaText}
                          </Button>
                        )}
                        
                        <div className="flex items-center gap-1.5 ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-lg ${
                              feedback[nudge.id] === "like" 
                                ? "bg-green-100 text-green-600 dark:bg-green-900/30" 
                                : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => handleFeedback(nudge.id, "like")}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-lg ${
                              feedback[nudge.id] === "dislike" 
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30" 
                                : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => handleFeedback(nudge.id, "dislike")}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <Bell className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Footer - Clean Design */}
          <div className="px-8 py-5 border-t border-border/30 bg-gradient-to-t from-gray-50/50 dark:from-gray-900/50">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button - Modern & Prominent */}
      {!open && (
        <Button
          onClick={() => onOpenChange(true)}
          className="fixed bottom-8 right-8 h-[72px] w-[72px] rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)] hover:scale-110 transition-all duration-300 z-40 p-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 group overflow-hidden"
          aria-label="Open Hey Phyzii"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Animated pulse ring */}
            <div className="absolute inset-0 rounded-full bg-blue-400/40 animate-ping" />
            
            {/* Icon */}
            <Sparkles className="h-9 w-9 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Badge */}
            <span className="absolute -top-2 -right-2 h-7 w-7 bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg z-20 ring-4 ring-white">
              4
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
            
            {/* Tooltip */}
            <div className="absolute -top-16 right-0 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Hey Phyzii
              <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-gray-900 rotate-45" />
            </div>
          </div>
        </Button>
      )}
    </>
  );
};
