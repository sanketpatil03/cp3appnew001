import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NudgeCenterButtonProps {
  onClick: () => void;
  nudgeCount: number;
}

export const NudgeCenterButton = ({ onClick, nudgeCount }: NudgeCenterButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        size="lg"
        className="relative h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary to-secondary animate-pulse hover:animate-none"
        style={{
          animation: nudgeCount > 0 ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
        }}
      >
        <Bell className="h-6 w-6" />
        {nudgeCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground border-2 border-background"
          >
            {nudgeCount}
          </Badge>
        )}
        {nudgeCount > 0 && (
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        )}
      </Button>
    </div>
  );
};
