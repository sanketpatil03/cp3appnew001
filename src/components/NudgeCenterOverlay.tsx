import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Mic, Send, Sparkles, Download, Gift, AlertTriangle, Plus, ThumbsUp, ThumbsDown } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  message: string;
  icon?: any;
  ctaText?: string;
}

interface NudgeCenterOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    type: "assistant",
    message: "📥 You have 21 new content items to download.",
    icon: Download,
    ctaText: "Download"
  },
  {
    id: "2",
    type: "assistant",
    message: "🎁 Please have 25 qty of samples for Brand (x, y and z) for the day for distribution.",
    icon: Gift
  },
  {
    id: "user-1",
    type: "user",
    message: "What's my plan for today?"
  },
  {
    id: "3",
    type: "assistant",
    message: "You have 8 doctor visits scheduled today. Starting with Dr. Sharma at 10 AM, followed by Dr. Patel at 11:30 AM. Would you like to see the complete schedule?"
  },
  {
    id: "4",
    type: "assistant",
    message: "⚠️ 12 Action points are overdue for the doctors planned today. Please check.",
    icon: AlertTriangle
  },
  {
    id: "user-2",
    type: "user",
    message: "Show me insights for Dr. Sharma"
  },
  {
    id: "5",
    type: "assistant",
    message: "Dr. Sharma prefers Brand X and Y. Last visit: 15 days ago. Recommended talking points: New clinical study results for Brand X. Remember to follow up on the sample request from last visit."
  },
  {
    id: "6",
    type: "assistant",
    message: "✨ New brand (Z1) has been added and Promotogram has changed for (Cardiologist) - please review their playlist.",
    icon: Plus,
    ctaText: "Review Playlist"
  }
];

export const NudgeCenterOverlay = ({ open, onOpenChange }: NudgeCenterOverlayProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
          onClick={() => onOpenChange(false)}
        />
      )}
      
      {/* Compact Chat Overlay */}
      {open && (
        <div 
          className="fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-white dark:bg-gray-950 shadow-2xl animate-slide-in-right flex flex-col border-l border-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Compact Header */}
          <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-blue-50/50 to-purple-50/30 dark:from-blue-950/30 dark:to-purple-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Hey Phyzii</h3>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages - Compact */}
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-3 pb-2">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col gap-1.5">
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                          : 'bg-gray-100 dark:bg-gray-900 text-foreground border border-border shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                      {msg.ctaText && (
                        <Button 
                          size="sm"
                          className="mt-2 h-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-semibold shadow-md"
                        >
                          {msg.ctaText}
                        </Button>
                      )}
                    </div>
                    {msg.type === 'assistant' && (
                      <div className="flex items-center gap-2 px-2">
                        <button 
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                          aria-label="Like this message"
                        >
                          <ThumbsUp className="h-3.5 w-3.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" />
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                          aria-label="Dislike this message"
                        >
                          <ThumbsDown className="h-3.5 w-3.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Footer - High Contrast */}
          <div className="px-4 py-3 border-t-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-400 dark:border-gray-600 shadow-sm focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium px-4 text-base"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRecording(!isRecording)}
                className={`h-11 w-11 rounded-xl border-2 shadow-sm transition-all ${
                  isRecording 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30 animate-pulse' 
                    : 'border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Mic className={`h-5 w-5 ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`} />
                {isRecording && (
                  <span className="absolute inset-0 rounded-xl border-2 border-red-500 animate-ping opacity-75" />
                )}
              </Button>
              <Button
                size="icon"
                className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            {isRecording && (
              <div className="mt-2 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-medium">
                <div className="flex gap-1">
                  <span className="w-1 h-3 bg-red-500 rounded animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-1 h-3 bg-red-500 rounded animate-[pulse_0.8s_ease-in-out_0.2s_infinite]" />
                  <span className="w-1 h-3 bg-red-500 rounded animate-[pulse_0.8s_ease-in-out_0.4s_infinite]" />
                </div>
                Recording...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button - Refined & Polished */}
      {!open && (
        <Button
          onClick={() => onOpenChange(true)}
          className="fixed bottom-8 right-8 h-[68px] w-[68px] rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300 z-40 p-0 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 group overflow-visible ring-4 ring-white dark:ring-gray-950"
          aria-label="Open Hey Phyzii"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Animated pulse ring */}
            <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
            
            {/* Inner circle for depth */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600 to-purple-700" />
            
            {/* Icon */}
            <Sparkles className="h-8 w-8 text-white relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Badge with better positioning */}
            <span className="absolute -top-1.5 -right-1.5 h-6 w-6 bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg z-20 ring-3 ring-white dark:ring-gray-950 animate-pulse">
              4
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 animate-[shimmer_2s_infinite]" />
            
            {/* Tooltip */}
            <div className="absolute -top-14 right-0 bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Hey Phyzii
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </div>
        </Button>
      )}
    </>
  );
};
