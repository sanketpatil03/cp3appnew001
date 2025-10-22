import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Lightbulb,
  Calendar,
  Users,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock,
  Filter,
  Pill,
  MapPin,
  FileText,
  Trophy,
  AlertCircle,
} from "lucide-react";

type NudgeCategory = "pre-month" | "pre-call" | "during-call" | "post-call" | "prescription" | "behavioral" | "all";
type NudgePriority = "high" | "medium" | "low";

interface Nudge {
  id: string;
  category: NudgeCategory;
  priority: NudgePriority;
  title: string;
  insight: string;
  action: string;
  cta: string;
  icon: any;
  timestamp: string;
  isDone: boolean;
}

const NudgeCenter = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<NudgeCategory>("all");
  const [nudges, setNudges] = useState<Nudge[]>([
    // Pre-Month Planning
    {
      id: "1",
      category: "pre-month",
      priority: "high",
      title: "5 top doctors missing from monthly plan",
      insight: "These high-potential doctors haven't been included in this month's tour plan. Missing them could impact your coverage targets.",
      action: "Add them to your tour plan to ensure comprehensive territory coverage and hit your monthly targets.",
      cta: "Add to Plan",
      icon: Calendar,
      timestamp: "2 hours ago",
      isDone: false,
    },
    {
      id: "2",
      category: "pre-month",
      priority: "high",
      title: "Dr. Kapil's prescriptions for Brand Aprox rising",
      insight: "Dr. Kapil has shown a 35% increase in Aprox prescriptions over the last month. He's becoming a high-value prescriber.",
      action: "Prioritize Dr. Kapil in your monthly plan to maintain and grow this positive trend.",
      cta: "Prioritize Doctor",
      icon: TrendingUp,
      timestamp: "3 hours ago",
      isDone: false,
    },
    {
      id: "3",
      category: "pre-month",
      priority: "medium",
      title: "High competitor activity in Zone 3",
      insight: "Competitor visits have increased by 40% in Zone 3. Your Brand Cprox market share is at risk.",
      action: "Schedule extra visits to Zone 3 doctors to retain Brand Cprox market share and counter competition.",
      cta: "Plan Visits",
      icon: AlertCircle,
      timestamp: "5 hours ago",
      isDone: false,
    },
    {
      id: "4",
      category: "pre-month",
      priority: "medium",
      title: "Dr. Rao - 60 days without engagement",
      insight: "Dr. Rao, a key prescriber, hasn't been contacted in 60 days. Long gaps can reduce influence and prescription volumes.",
      action: "Plan a call this month to re-establish connection and maintain your influence.",
      cta: "Schedule Call",
      icon: Clock,
      timestamp: "1 day ago",
      isDone: false,
    },

    // Pre-Call Planning
    {
      id: "5",
      category: "pre-call",
      priority: "high",
      title: "Dr. Prakash prefers short visual presentations",
      insight: "Based on past interactions, Dr. Prakash engages better with concise, visual content rather than lengthy details.",
      action: "Prepare a 2-page visual playlist focusing on key charts and images for quick impact.",
      cta: "Prepare Content",
      icon: FileText,
      timestamp: "30 minutes ago",
      isDone: false,
    },
    {
      id: "6",
      category: "pre-call",
      priority: "high",
      title: "Dr. Mehta requested clinical comparison data",
      insight: "In the last visit, Dr. Mehta specifically asked for comparative clinical data. Arriving without it may disappoint.",
      action: "Ensure the updated clinical comparison sheet is downloaded and available on your tablet.",
      cta: "Download Data",
      icon: FileText,
      timestamp: "1 hour ago",
      isDone: false,
    },
    {
      id: "7",
      category: "pre-call",
      priority: "medium",
      title: "Dr. Sharma showing interest in Brand Cprox",
      insight: "Dr. Sharma's engagement scores for Cprox have increased. This is an opportunity to deepen the relationship.",
      action: "Plan to discuss Cprox differentiators, new benefits, and latest clinical evidence during the call.",
      cta: "View Brand Details",
      icon: Pill,
      timestamp: "2 hours ago",
      isDone: false,
    },
    {
      id: "8",
      category: "pre-call",
      priority: "low",
      title: "Dr. Rao wants sample availability confirmed",
      insight: "Dr. Rao's last feedback indicated he won't prescribe without sample availability. Stock confirmation is critical.",
      action: "Confirm sample stock availability with your stockist before visiting Dr. Rao.",
      cta: "Check Stock",
      icon: AlertCircle,
      timestamp: "3 hours ago",
      isDone: false,
    },

    // During Detailing / Call Execution
    {
      id: "9",
      category: "during-call",
      priority: "high",
      title: "Dr. Wadhwa engages with patient stories",
      insight: "Analysis shows Dr. Wadhwa responds positively when presentations start with real patient case studies.",
      action: "Open your presentation with a relatable patient story to capture attention and build connection.",
      cta: "Start with Story",
      icon: Users,
      timestamp: "Just now",
      isDone: false,
    },
    {
      id: "10",
      category: "during-call",
      priority: "medium",
      title: "Dr. Roy prefers quick statistics",
      insight: "Dr. Roy has a busy schedule and prefers concise, data-driven interactions with key statistics.",
      action: "Focus on one key statistic per brand rather than detailed explanations to respect his time.",
      cta: "Show Key Stats",
      icon: Target,
      timestamp: "Just now",
      isDone: false,
    },
    {
      id: "11",
      category: "during-call",
      priority: "medium",
      title: "Dr. Kapil is comparing competitors",
      insight: "Dr. Kapil has mentioned competitor products in recent visits, indicating he's evaluating options.",
      action: "Emphasize the unique benefits and competitive advantages your brand offers over alternatives.",
      cta: "Show Comparison",
      icon: TrendingUp,
      timestamp: "Just now",
      isDone: false,
    },

    // Post-Detailing / Activity Completion
    {
      id: "12",
      category: "post-call",
      priority: "high",
      title: "Missing notes for Dr. Wadhwa's visit",
      insight: "Your last visit with Dr. Wadhwa is missing detailed notes. This data is crucial for your next visit strategy.",
      action: "Update your call notes immediately while the conversation details are still fresh.",
      cta: "Update Notes",
      icon: FileText,
      timestamp: "10 minutes ago",
      isDone: false,
    },
    {
      id: "13",
      category: "post-call",
      priority: "medium",
      title: "Dr. Sharma upgraded to High Potential",
      insight: "Dr. Sharma's prescription behavior and engagement levels now qualify him as a High Potential doctor.",
      action: "Log this milestone change in your system for accurate reporting and future planning.",
      cta: "Update Status",
      icon: Trophy,
      timestamp: "1 hour ago",
      isDone: false,
    },
    {
      id: "14",
      category: "post-call",
      priority: "medium",
      title: "Brand A share dropped for Dr. Kumar",
      insight: "Dr. Kumar's prescriptions for Brand A have decreased by 25% over the last two visits.",
      action: "Schedule a follow-up visit with a focused visual comparison to address concerns and regain share.",
      cta: "Schedule Follow-up",
      icon: AlertCircle,
      timestamp: "2 hours ago",
      isDone: false,
    },

    // Prescription Capture & Conversion
    {
      id: "15",
      category: "prescription",
      priority: "high",
      title: "Brand X prescriptions are low",
      insight: "Brand X has only 3 prescriptions this month, significantly below target and potential.",
      action: "Plan sample visits to targeted doctors to boost Brand X awareness and prescription uptake.",
      cta: "Plan Sample Visits",
      icon: Pill,
      timestamp: "4 hours ago",
      isDone: false,
    },
    {
      id: "16",
      category: "prescription",
      priority: "high",
      title: "Dr. Y moved to High Potential - Act Fast",
      insight: "Dr. Y's engagement and prescription indicators show he's now a High Potential prescriber.",
      action: "Follow up within a week to convert this opportunity quickly before momentum is lost.",
      cta: "Schedule Visit",
      icon: TrendingUp,
      timestamp: "5 hours ago",
      isDone: false,
    },
    {
      id: "17",
      category: "prescription",
      priority: "medium",
      title: "Two doctors away from top zone rank",
      insight: "Converting just two more doctors this week will push you into the top zone rank for your territory.",
      action: "Focus on quick-win doctors who are close to prescription thresholds for immediate conversions.",
      cta: "View Targets",
      icon: Trophy,
      timestamp: "6 hours ago",
      isDone: false,
    },

    // Behavioral & Motivational
    {
      id: "18",
      category: "behavioral",
      priority: "high",
      title: "One visit away from weekly target!",
      insight: "You've completed 9 out of 10 planned visits for this week. You're so close to hitting your target.",
      action: "Complete your last visit today to achieve 100% weekly target completion.",
      cta: "View Last Visit",
      icon: Target,
      timestamp: "30 minutes ago",
      isDone: false,
    },
    {
      id: "19",
      category: "behavioral",
      priority: "medium",
      title: "Three high-likelihood doctors today",
      insight: "Today's schedule includes three doctors with the highest prescribing likelihood based on AI analysis.",
      action: "Prioritize these doctors in order: Dr. Mehta, Dr. Roy, Dr. Kapil for maximum conversion potential.",
      cta: "View Order",
      icon: Users,
      timestamp: "1 hour ago",
      isDone: false,
    },
    {
      id: "20",
      category: "behavioral",
      priority: "medium",
      title: "90% monthly goal achieved - Push forward!",
      insight: "You've hit 90% of your monthly goal with 5 days remaining. A strong finish will secure your incentive.",
      action: "A few more strategic calls will help you cross the finish line and maximize your monthly reward.",
      cta: "View Progress",
      icon: Trophy,
      timestamp: "1 day ago",
      isDone: false,
    },
  ]);

  const getPriorityColor = (priority: NudgePriority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
    }
  };

  const getPriorityBgColor = (priority: NudgePriority) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 border-destructive/20";
      case "medium":
        return "bg-info/10 border-info/20";
      case "low":
        return "bg-success/10 border-success/20";
    }
  };

  const getCategoryLabel = (category: NudgeCategory) => {
    const labels: Record<NudgeCategory, string> = {
      "pre-month": "Pre-Month Planning",
      "pre-call": "Pre-Call Planning",
      "during-call": "During Call",
      "post-call": "Post-Call",
      prescription: "Prescription & Conversion",
      behavioral: "Behavioral & Motivational",
      all: "All Nudges",
    };
    return labels[category];
  };

  const filteredNudges = activeCategory === "all" 
    ? nudges 
    : nudges.filter(n => n.category === activeCategory);

  const handleMarkAsDone = (id: string) => {
    setNudges(nudges.map(n => n.id === id ? { ...n, isDone: !n.isDone } : n));
  };

  const categoryStats = {
    "pre-month": nudges.filter(n => n.category === "pre-month").length,
    "pre-call": nudges.filter(n => n.category === "pre-call").length,
    "during-call": nudges.filter(n => n.category === "during-call").length,
    "post-call": nudges.filter(n => n.category === "post-call").length,
    prescription: nudges.filter(n => n.category === "prescription").length,
    behavioral: nudges.filter(n => n.category === "behavioral").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Nudge Center</h1>
                <p className="text-sm text-primary-foreground/80">AI-powered insights for smarter field decisions</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {filteredNudges.filter(n => !n.isDone).length} Active
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as NudgeCategory)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 h-auto">
            <TabsTrigger value="all" className="flex flex-col gap-1 py-3">
              <span className="text-xs font-semibold">All</span>
              <span className="text-lg font-bold">{nudges.length}</span>
            </TabsTrigger>
            <TabsTrigger value="pre-month" className="flex flex-col gap-1 py-3">
              <span className="text-xs font-semibold text-center">Pre-Month</span>
              <span className="text-lg font-bold">{categoryStats["pre-month"]}</span>
            </TabsTrigger>
            <TabsTrigger value="pre-call" className="flex flex-col gap-1 py-3">
              <span className="text-xs font-semibold text-center">Pre-Call</span>
              <span className="text-lg font-bold">{categoryStats["pre-call"]}</span>
            </TabsTrigger>
            <TabsTrigger value="during-call" className="flex flex-col gap-1 py-3">
              <span className="text-xs font-semibold text-center">During Call</span>
              <span className="text-lg font-bold">{categoryStats["during-call"]}</span>
            </TabsTrigger>
            <TabsTrigger value="post-call" className="flex flex-col gap-1 py-3">
              <span className="text-xs font-semibold text-center">Post-Call</span>
              <span className="text-lg font-bold">{categoryStats["post-call"]}</span>
            </TabsTrigger>
            <TabsTrigger value="prescription" className="flex flex-col gap-1 py-3">
              <span className="text-xs font-semibold text-center">Prescription</span>
              <span className="text-lg font-bold">{categoryStats.prescription}</span>
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="flex flex-col gap-1 py-3">
              <span className="text-xs font-semibold text-center">Behavioral</span>
              <span className="text-lg font-bold">{categoryStats.behavioral}</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-4 pr-4">
              {filteredNudges.length === 0 ? (
                <Card className="p-12 text-center">
                  <Lightbulb className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No nudges in this category</h3>
                  <p className="text-muted-foreground">Check other categories for AI-driven insights</p>
                </Card>
              ) : (
                filteredNudges.map((nudge) => {
                  const Icon = nudge.icon;
                  return (
                    <Card
                      key={nudge.id}
                      className={`transition-all duration-200 ${
                        nudge.isDone ? "opacity-50" : "hover:shadow-lg"
                      } ${getPriorityBgColor(nudge.priority)}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              nudge.priority === "high" ? "bg-destructive/20" :
                              nudge.priority === "medium" ? "bg-info/20" : "bg-success/20"
                            }`}>
                              <Icon className={`w-6 h-6 ${
                                nudge.priority === "high" ? "text-destructive" :
                                nudge.priority === "medium" ? "text-info" : "text-success"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-base font-bold">{nudge.title}</CardTitle>
                                <Badge variant={getPriorityColor(nudge.priority)} className="text-xs">
                                  {nudge.priority}
                                </Badge>
                              </div>
                              <Badge variant="outline" className="text-xs mb-2">
                                {getCategoryLabel(nudge.category)}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{nudge.timestamp}</span>
                            {nudge.isDone && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="bg-info/10 border-l-4 border-info p-3 rounded-r">
                            <p className="text-xs font-semibold text-info mb-1">💡 Contextual Insight</p>
                            <p className="text-sm text-foreground/90">{nudge.insight}</p>
                          </div>
                          <div className="bg-success/10 border-l-4 border-success p-3 rounded-r">
                            <p className="text-xs font-semibold text-success mb-1">✓ Actionable Suggestion</p>
                            <p className="text-sm text-foreground/90">{nudge.action}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            disabled={nudge.isDone}
                          >
                            {nudge.cta}
                          </Button>
                          <Button
                            size="sm"
                            variant={nudge.isDone ? "default" : "outline"}
                            onClick={() => handleMarkAsDone(nudge.id)}
                          >
                            {nudge.isDone ? "Undo" : "Mark as Done"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
};

export default NudgeCenter;
