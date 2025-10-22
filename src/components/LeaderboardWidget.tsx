import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Info, ChevronUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  repName: string;
  points: number;
  salesPerformance: number;
  badge: string;
  isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, repName: "Rakesh", points: 300, salesPerformance: 120000, badge: "🏆" },
  { rank: 2, repName: "Priya", points: 260, salesPerformance: 105000, badge: "🥈" },
  { rank: 3, repName: "You", points: 220, salesPerformance: 95000, badge: "🥉", isCurrentUser: true },
  { rank: 4, repName: "Amit", points: 200, salesPerformance: 88000, badge: "" },
  { rank: 5, repName: "Sneha", points: 180, salesPerformance: 80000, badge: "" },
  { rank: 6, repName: "Nikhil", points: 175, salesPerformance: 78000, badge: "" },
  { rank: 7, repName: "Kavita", points: 170, salesPerformance: 75000, badge: "" },
  { rank: 8, repName: "Rohan", points: 165, salesPerformance: 73000, badge: "" },
  { rank: 9, repName: "Anjali", points: 160, salesPerformance: 70000, badge: "" },
  { rank: 10, repName: "Arjun", points: 155, salesPerformance: 68000, badge: "" },
  { rank: 11, repName: "Priyanka", points: 150, salesPerformance: 65000, badge: "" },
  { rank: 12, repName: "Sanjay", points: 145, salesPerformance: 63000, badge: "" },
  { rank: 13, repName: "Divya", points: 140, salesPerformance: 60000, badge: "" },
  { rank: 14, repName: "Varun", points: 135, salesPerformance: 58000, badge: "" },
  { rank: 15, repName: "Meera", points: 130, salesPerformance: 55000, badge: "" },
  { rank: 16, repName: "Kiran", points: 125, salesPerformance: 53000, badge: "" },
  { rank: 17, repName: "Shalini", points: 120, salesPerformance: 50000, badge: "" },
  { rank: 18, repName: "Rohit", points: 115, salesPerformance: 48000, badge: "" },
  { rank: 19, repName: "Snehal", points: 110, salesPerformance: 45000, badge: "" },
  { rank: 20, repName: "Deepak", points: 105, salesPerformance: 43000, badge: "" },
];

const scoringCriteria = [
  { activity: "Daily activity completion", points: 5, icon: "✅" },
  { activity: "Achieving 100% doctor coverage", points: 10, icon: "📈" },
  { activity: "Campaign participation", points: 15, icon: "💡" },
  { activity: "Order fulfillment accuracy", points: 5, icon: "🧾" },
  { activity: "Positive feedback from manager", points: 10, icon: "💬" },
];

export const LeaderboardWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "team" | "zone" | "bu">("all");
  const [filterValue, setFilterValue] = useState("all");

  const currentUser = leaderboardData.find((entry) => entry.isCurrentUser);
  const nextRank = leaderboardData.find((entry) => entry.rank === (currentUser?.rank || 0) - 1);
  const progressToNextRank = nextRank
    ? ((currentUser?.points || 0) / nextRank.points) * 100
    : 100;

  // Always sort by points (can be extended to filter by team/zone/bu)
  const sortedData = [...leaderboardData].sort((a, b) => b.points - a.points);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🏆";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };

  return (
    <>
      {/* Large Widget */}
      <Card
        className="w-[320px] h-[200px] p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-2 border-amber-200 dark:border-amber-800 shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
        onClick={() => setIsExpanded(true)}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 dark:from-amber-700/20 dark:to-orange-700/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <Badge variant="secondary" className="text-xs bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100">
              Leaderboard
            </Badge>
          </div>

          <div className="flex-1 flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                {currentUser?.badge || "🏅"}
              </div>
              <div className="text-4xl font-bold text-foreground">#{currentUser?.rank || 0}</div>
              <div className="text-sm text-muted-foreground mt-1">Your Rank</div>
            </div>

            <div className="flex-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Points</span>
                  <span className="text-xl font-bold text-foreground">{currentUser?.points || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sales</span>
                  <span className="text-lg font-semibold text-foreground">₹{((currentUser?.salesPerformance || 0) / 1000).toFixed(0)}K</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">Progress to Rank {nextRank?.rank || 1}</span>
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <Progress value={progressToNextRank} className="h-2 bg-amber-100 dark:bg-amber-900" />
                <p className="text-xs text-muted-foreground mt-2">
                  {nextRank ? `${nextRank.points - (currentUser?.points || 0)} pts needed` : "Top rank!"}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-bounce" />
          </div>
        </div>
      </Card>

      {/* Expanded Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Leaderboard
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
                className="ml-auto"
              >
                <Info className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* How It Works Section */}
          {showInfo && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4 border border-border">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                How It Works - Scoring System
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {scoringCriteria.map((criteria, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs bg-background rounded p-2"
                  >
                    <span className="text-lg">{criteria.icon}</span>
                    <span className="flex-1">{criteria.activity}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      +{criteria.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Select value={filterType} onValueChange={(v) => setFilterType(v as "all" | "team" | "zone" | "bu")}>
              <SelectTrigger className="w-36 h-9 text-xs">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leaderboard</SelectItem>
                <SelectItem value="team">My Team</SelectItem>
                <SelectItem value="zone">Zone</SelectItem>
                <SelectItem value="bu">BU</SelectItem>
              </SelectContent>
            </Select>

            {filterType === "zone" && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-32 h-9 text-xs">
                  <SelectValue placeholder="Select Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
            )}

            {filterType === "bu" && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-32 h-9 text-xs">
                  <SelectValue placeholder="Select BU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All BUs</SelectItem>
                  <SelectItem value="bu1">BU 1</SelectItem>
                  <SelectItem value="bu2">BU 2</SelectItem>
                  <SelectItem value="bu3">BU 3</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Leaderboard Table */}
          <div className="flex-1 overflow-auto border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted sticky top-0 z-10">
                <tr>
                  <th className="text-left p-3 text-xs font-semibold">Rank</th>
                  <th className="text-left p-3 text-xs font-semibold">Rep Name</th>
                  <th className="text-right p-3 text-xs font-semibold">Points</th>
                  <th className="text-right p-3 text-xs font-semibold">Sales</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((entry, index) => {
                  const displayRank = index + 1;
                  return (
                    <tr
                      key={entry.rank}
                      className={cn(
                        "border-b transition-colors hover:bg-muted/50",
                        entry.isCurrentUser &&
                          "bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50 border-l-4 border-l-amber-500"
                      )}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getRankBadge(displayRank)}</span>
                          <span
                            className={cn(
                              "text-sm font-bold",
                              entry.isCurrentUser && "text-amber-600 dark:text-amber-400"
                            )}
                          >
                            #{displayRank}
                          </span>
                          {entry.isCurrentUser && (
                            <Badge variant="secondary" className="text-[9px]">
                              YOU
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            entry.isCurrentUser && "font-bold"
                          )}
                        >
                          {entry.repName}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className="text-sm font-semibold">{entry.points}</span>
                      </td>
                      <td className="p-3 text-right">
                        <span className="text-sm">₹{(entry.salesPerformance / 1000).toFixed(0)}K</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* User Progress Summary */}
          {currentUser && (
            <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-sm">Your Progress</h4>
                  <p className="text-xs text-muted-foreground">Keep up the great work!</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {currentUser.points}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </div>
              </div>
              <Progress value={progressToNextRank} className="h-2 bg-amber-100 dark:bg-amber-900" />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {nextRank
                  ? `${nextRank.points - currentUser.points} points needed to reach Rank ${nextRank.rank}`
                  : "You're at the top! Keep it up! 🎉"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
