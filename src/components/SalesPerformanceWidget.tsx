import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface SalesPerformanceWidgetProps {
  onClick: () => void;
}

export const SalesPerformanceWidget = ({ onClick }: SalesPerformanceWidgetProps) => {
  const ytdTarget = 850000;
  const ytdActual = 820000;
  const ytdAchievement = ((ytdActual / ytdTarget) * 100).toFixed(1);

  return (
    <Card 
      className="w-[315px] h-[155px] p-4 relative shadow-lg bg-card border-0 rounded-2xl cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full" />
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Sales Performance</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">YTD Target</span>
          <span className="text-sm font-bold">₹{ytdTarget.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">YTD Actual</span>
          <span className="text-sm font-bold text-primary">₹{ytdActual.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">YTD Achievement%</span>
          <span className="text-sm font-bold text-success">{ytdAchievement}%</span>
        </div>
      </div>
    </Card>
  );
};
