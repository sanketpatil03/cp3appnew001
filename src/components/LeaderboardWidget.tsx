import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Info, ChevronUp, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import medalGold from "@/assets/medal-gold.png";
import medalSilver from "@/assets/medal-silver.png";
import medalBronze from "@/assets/medal-bronze.png";

interface LeaderboardEntry {
  rank: number;
  repName: string;
  points: number;
  territory: string;
  badge: string;
  isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, repName: "Rakesh Sharma", points: 300, territory: "Mumbai-OT40017", badge: "🏆" },
  { rank: 2, repName: "Priya Joshi", points: 260, territory: "Noida-OT10076", badge: "🥈" },
  { rank: 3, repName: "You", points: 220, territory: "Mumbai-OT40012", badge: "🥉", isCurrentUser: true },
  { rank: 4, repName: "Amit Kumar", points: 200, territory: "Delhi-OT30045", badge: "" },
  { rank: 5, repName: "Sneha Patel", points: 180, territory: "Pune-OT20089", badge: "" },
  { rank: 6, repName: "Nikhil Desai", points: 175, territory: "Bangalore-OT50123", badge: "" },
  { rank: 7, repName: "Kavita Singh", points: 170, territory: "Hyderabad-OT60034", badge: "" },
  { rank: 8, repName: "Rohan Mehta", points: 165, territory: "Chennai-OT70056", badge: "" },
  { rank: 9, repName: "Anjali Verma", points: 160, territory: "Kolkata-OT80078", badge: "" },
  { rank: 10, repName: "Arjun Reddy", points: 155, territory: "Ahmedabad-OT90012", badge: "" },
  { rank: 11, repName: "Priyanka Shah", points: 150, territory: "Surat-OT25045", badge: "" },
  { rank: 12, repName: "Sanjay Gupta", points: 145, territory: "Jaipur-OT35067", badge: "" },
  { rank: 13, repName: "Divya Nair", points: 140, territory: "Lucknow-OT45089", badge: "" },
  { rank: 14, repName: "Varun Kapoor", points: 135, territory: "Indore-OT55012", badge: "" },
  { rank: 15, repName: "Meera Iyer", points: 130, territory: "Bhopal-OT65034", badge: "" },
  { rank: 16, repName: "Kiran Rao", points: 125, territory: "Nagpur-OT75056", badge: "" },
  { rank: 17, repName: "Shalini Chopra", points: 120, territory: "Vadodara-OT85078", badge: "" },
  { rank: 18, repName: "Rohit Sharma", points: 115, territory: "Kanpur-OT95012", badge: "" },
  { rank: 19, repName: "Snehal Banerjee", points: 110, territory: "Gurgaon-OT15045", badge: "" },
  { rank: 20, repName: "Deepak Malhotra", points: 105, territory: "Thane-OT40089", badge: "" },
];

const scoringCriteria = [
  { activity: "MTP done properly (on time & complete)", points: 10, icon: "📋" },
  { activity: "Pre-call planning done", points: 10, icon: "📝" },
  { activity: "Detailing done", points: 20, icon: "💼" },
  { activity: "Doctor Rx conversions", points: 50, icon: "💊" },
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

  const getRankMedalImage = (rank: number) => {
    if (rank === 1) return medalGold;
    if (rank === 2) return medalSilver;
    if (rank === 3) return medalBronze;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🏆";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };

  return (
    <>
      {/* Compact Widget */}
      <Card
        className="w-[315px] h-[155px] p-4 bg-card border shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Phyzii Points
            </span>
          </div>

          <div className="flex-1 flex items-center gap-4">
          <div className="flex flex-col items-center justify-center">
              {currentUser?.rank && currentUser.rank <= 3 ? (
                <img 
                  src={getRankMedalImage(currentUser.rank) || undefined}
                  alt={`Rank ${currentUser.rank} medal`}
                  className="w-12 h-12 mb-1"
                />
              ) : (
                <div className="text-4xl font-bold text-primary mb-1">
                  🏅
                </div>
              )}
              <div className="text-2xl font-bold text-foreground">#{currentUser?.rank || 0}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Your Rank</div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Points</span>
                <span className="text-lg font-bold text-foreground">{currentUser?.points || 0}</span>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-semibold text-muted-foreground">To Rank {nextRank?.rank || 1}</span>
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <Progress value={progressToNextRank} className="h-1.5" />
                <p className="text-[8px] text-muted-foreground mt-1">
                  {nextRank ? `${nextRank.points - (currentUser?.points || 0)} pts needed` : "Top rank!"}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronUp className="w-4 h-4 text-primary animate-bounce" />
          </div>
        </div>
      </Card>

      {/* Expanded Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Phyzii Points
              <Badge variant="secondary" className="ml-2 text-xs">Respi</Badge>
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
                <SelectItem value="team">Team</SelectItem>
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
          <div className="flex-1 overflow-auto border rounded-lg scrollbar-hide">
            <table className="w-full">
              <thead className="bg-muted sticky top-0 z-10">
                <tr>
                  <th className="text-left p-3 pl-4 text-xs font-semibold">Rank</th>
                  <th className="text-left p-3 text-xs font-semibold">Name</th>
                  <th className="text-center p-3 text-xs font-semibold">Points</th>
                  <th className="text-left p-3 text-xs font-semibold">Territory</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((entry, index) => {
                  const displayRank = index + 1;
                  const medalImage = getRankMedalImage(displayRank);
                  return (
                    <tr
                      key={entry.rank}
                      className={cn(
                        "border-b transition-colors hover:bg-muted/50",
                        entry.isCurrentUser &&
                          "bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50 border-l-4 border-l-amber-500"
                      )}
                    >
                      <td className="p-3 pl-4">
                        <div className="flex items-center gap-2">
                          {medalImage ? (
                            <img 
                              src={medalImage}
                              alt={`Rank ${displayRank} medal`}
                              className="w-7 h-7"
                            />
                          ) : (
                            <span
                              className={cn(
                                "text-sm font-bold",
                                entry.isCurrentUser && "text-amber-600 dark:text-amber-400"
                              )}
                            >
                              #{displayRank}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-left">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            entry.isCurrentUser && "font-bold"
                          )}
                        >
                          {entry.repName}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-sm font-semibold">{entry.points}</span>
                      </td>
                      <td className="p-3 text-left">
                        <span className="text-sm text-muted-foreground">{entry.territory}</span>
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
