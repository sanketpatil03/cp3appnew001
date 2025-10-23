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
    id: "doctor-coverage-gap",
    title: "Doctor Coverage Gap",
    description: "You haven't met Dr. R. Shah (High potential, Cardio) in the last 32 days - include him in Week 1.",
    category: "Planning - Before Plan"
  },
  {
    id: "newly-added-doctors",
    title: "Newly Added Doctors",
    description: "2 new doctors Dr Rakesh J and Dr Ameer Patil were added in your territory this month - schedule first call.",
    category: "Planning - Before Plan"
  },
  {
    id: "missed-high-potential",
    title: "Missed High-Potential Doctor",
    description: "Dr. Patel (Top 10 prescriber in your zone) not planned for this month.",
    category: "Planning - On Submit"
  },
  {
    id: "leave-conflict",
    title: "Leave Conflict",
    description: "You've scheduled 2 calls on a national holiday — please recheck.",
    category: "Planning - On Submit"
  },
  {
    id: "submission-reward",
    title: "Submission Reward",
    description: "You've submitted your MTP before the due date — +10 performance points earned",
    category: "Planning - After Submit"
  }
];

const PopupDesigns = () => {
  const navigate = useNavigate();
  const [selectedNudge, setSelectedNudge] = useState<NudgeType | null>(null);

  const renderNudgePopup = (nudgeId: string) => {
    switch (nudgeId) {
      case "doctor-coverage-gap":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Doctor Coverage Gap</h4>
                <p className="text-sm text-muted-foreground">
                  You haven't met Dr. R. Shah (High potential, Cardio) in the last 32 days - include him in Week 1.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">How it helps</p>
              <p className="text-sm">Promotes timely and complete coverage.</p>
            </div>

            <Button className="w-full">
              Add to Week 1 Plan
            </Button>
          </div>
        );
      
      case "newly-added-doctors":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Newly Added Doctors</h4>
                <p className="text-sm text-muted-foreground">
                  2 new doctors Dr Rakesh J and Dr Ameer Patil were added in your territory this month - schedule first call.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">New Doctors</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">1</span>
                  </div>
                  <span className="text-sm">Dr Rakesh J</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">2</span>
                  </div>
                  <span className="text-sm">Dr Ameer Patil</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">How it helps</p>
              <p className="text-sm">Drives early engagement.</p>
            </div>

            <Button className="w-full">
              Schedule First Calls
            </Button>
          </div>
        );

      case "missed-high-potential":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Missed High-Potential Doctor</h4>
                <p className="text-sm text-muted-foreground">
                  Dr. Patel (Top 10 prescriber in your zone) not planned for this month.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">How it helps</p>
              <p className="text-sm">Avoids missing key influencers.</p>
            </div>

            <Button className="w-full">
              Add Dr. Patel to Plan
            </Button>
          </div>
        );

      case "leave-conflict":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Leave Conflict Detected</h4>
                <p className="text-sm text-muted-foreground">
                  You've scheduled 2 calls on a national holiday — please recheck.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">How it helps</p>
              <p className="text-sm">Prevents invalid scheduling.</p>
            </div>

            <Button className="w-full">
              Review Schedule
            </Button>
          </div>
        );

      case "submission-reward":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Early Submission Reward</h4>
                <p className="text-sm text-muted-foreground">
                  You've submitted your MTP before the due date — +10 performance points earned
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">How it helps</p>
              <p className="text-sm">Rewards discipline.</p>
            </div>

            <Button className="w-full bg-success hover:bg-success/90">
              View Performance Dashboard
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
