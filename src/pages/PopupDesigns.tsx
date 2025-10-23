import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Lightbulb, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NudgeType {
  id: string;
  title: string;
  description: string;
  category: string;
}

const nudgeTypes: NudgeType[] = [
  {
    id: "detailing",
    title: "Detailing",
    description: "Smart recommendations for doctor detailing sessions based on preferences",
    category: "Sales"
  },
  {
    id: "post-call",
    title: "Post-Call",
    description: "Immediate action items and follow-ups after doctor visits",
    category: "Follow-up"
  },
  {
    id: "planning",
    title: "Planning",
    description: "Territory and visit planning suggestions based on performance data",
    category: "Strategy"
  },
  {
    id: "product-focus",
    title: "Product Focus",
    description: "Targeted product promotion recommendations for specific doctors",
    category: "Sales"
  },
  {
    id: "event-reminder",
    title: "Event Reminder",
    description: "Timely reminders for upcoming events and activities",
    category: "Engagement"
  },
  {
    id: "performance",
    title: "Performance",
    description: "Real-time performance insights and improvement suggestions",
    category: "Analytics"
  }
];

const PopupDesigns = () => {
  const navigate = useNavigate();
  const [selectedNudge, setSelectedNudge] = useState<NudgeType | null>(null);

  const renderNudgePopup = (nudgeId: string) => {
    switch (nudgeId) {
      case "detailing":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Smart Detailing Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Dr. Prakash prefers short, visual presentations — prepare a 2-page playlist for quick impact
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">Recommendations</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>Focus on visual aids and infographics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>Keep presentation under 5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>Highlight key clinical data points</span>
                </li>
              </ul>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Playlist Now
            </Button>
          </div>
        );
      
      case "post-call":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Post-Call Action</h4>
                <p className="text-sm text-muted-foreground">
                  Dr. Austin Berg requested study materials for Aprox. Send them within 24 hours for best impact.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Action Items</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-success/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-success">1</span>
                  </div>
                  <span className="text-sm">Email study materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-success/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-success">2</span>
                  </div>
                  <span className="text-sm">Schedule follow-up call</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-success hover:bg-success/90">
              Complete Actions
            </Button>
          </div>
        );

      case "planning":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-info" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Planning Suggestion</h4>
                <p className="text-sm text-muted-foreground">
                  3 high-value doctors in Andheri haven't been visited in 2 weeks. Schedule visits to maintain engagement.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Priority Doctors</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Dr. Sharma</span>
                  <span className="text-xs text-destructive">14 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dr. Mehta</span>
                  <span className="text-xs text-destructive">15 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dr. Kapoor</span>
                  <span className="text-xs text-destructive">16 days</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-info hover:bg-info/90">
              Schedule Visits
            </Button>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-purple" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{selectedNudge?.title} Nudge</h4>
                <p className="text-sm text-muted-foreground">
                  This is a sample nudge popup for {selectedNudge?.title}. The actual design will be customized based on specific requirements.
                </p>
              </div>
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90">
              Take Action
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-4 flex items-center gap-4 shadow-md">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-white/20"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Pop-up Designs</h1>
          <p className="text-sm text-primary-foreground/80">
            Preview and explore all nudge popup designs
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground mb-6">
            Click on any nudge card to preview its popup design and interaction flow.
          </p>

          {/* Grid of Nudge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nudgeTypes.map((nudge) => (
              <Card
                key={nudge.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
                onClick={() => setSelectedNudge(nudge)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {nudge.category}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{nudge.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {nudge.description}
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                  >
                    Preview Design
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Nudge Preview Dialog */}
      <Dialog open={!!selectedNudge} onOpenChange={() => setSelectedNudge(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedNudge?.title} Nudge Preview</DialogTitle>
          </DialogHeader>
          
          {selectedNudge && renderNudgePopup(selectedNudge.id)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupDesigns;
