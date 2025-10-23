import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Maximize2, X, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

interface CustomerProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: {
    name: string;
    specialty: string;
  };
}

export const CustomerProfileDialog = ({ open, onOpenChange, customer }: CustomerProfileDialogProps) => {
  const [showNudge, setShowNudge] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] p-0 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-background px-6 py-3 flex items-center border-b flex-shrink-0">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">04-Jul, Thursday</p>
            <DialogTitle className="text-xl font-bold mt-1">{customer.name}</DialogTitle>
            <p className="text-xs text-muted-foreground mt-1">
              LDV : 23-Jun, Monday | NPD: 29-Jul, Tuesday
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content - Scrollable if needed but optimized to fit */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          {/* Information Sections Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Current Playlist */}
            <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-[11px] font-bold text-cyan-500 uppercase tracking-wide">Current Playlist</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted flex-shrink-0">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P1</span>
                  <span className="font-medium">NexaWare</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P2</span>
                  <span className="font-medium">EcoVibe</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P3</span>
                  <span className="font-medium">UrbanZen</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P4</span>
                  <span className="font-medium">AquaPure</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P5</span>
                  <span className="font-medium">BrightLeaf</span>
                </div>
              </div>
            </div>

            {/* Last Detailing Session */}
            <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-[11px] font-bold text-cyan-500 uppercase tracking-wide">Last Detailing Session</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted flex-shrink-0">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P1</span>
                  <span className="font-medium">BlueHorizon</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P2</span>
                  <span className="font-medium">GreenNest</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P3</span>
                  <span className="font-medium">SwiftPulse</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P4</span>
                  <span className="font-medium">NovaLux</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P5</span>
                  <span className="font-medium">OptiFlow</span>
                </div>
              </div>
            </div>

            {/* Action Point */}
            <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-[11px] font-bold text-green-500 uppercase tracking-wide">Action Point</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted flex-shrink-0">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">Study Material requested</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Brand</span>
                  <span className="font-medium">Bprox</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Assigned to</span>
                  <span className="font-medium">Amaan Khan</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium text-xs">Customer has requested...</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">31 May 2024</span>
                </div>
              </div>
            </div>

            {/* Focus Brands */}
            <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-[11px] font-bold text-cyan-500 uppercase tracking-wide">Focus Brands</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted flex-shrink-0">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold text-muted-foreground pb-1 border-b">
                  <span>Brand</span>
                  <span className="text-center">Current</span>
                  <span className="text-center">Goal</span>
                </div>
                {[
                  { name: "Telma", current: "RP", goal: "BL" },
                  { name: "Aprox", current: "OP", goal: "RP" },
                  { name: "Bprox", current: "NP", goal: "RP" },
                  { name: "Cprox", current: "RP", goal: "BL" },
                ].map((brand, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 text-sm">
                    <span className="font-medium">{brand.name}</span>
                    <span className="text-center font-semibold">{brand.current}</span>
                    <span className="text-center font-semibold">{brand.goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-[11px] font-bold text-cyan-500 uppercase tracking-wide">Personal Details</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted flex-shrink-0">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{customer.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Qualification</span>
                  <span className="font-medium">MBBS, MD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Speciality by Qualification</span>
                  <span className="font-medium">Cardiologist</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gender</span>
                  <span className="font-medium">Male</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Address</span>
                  <span className="font-medium text-right text-xs">123 Green Avenue</span>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-[11px] font-bold text-green-500 uppercase tracking-wide">Business Details</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted flex-shrink-0">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class</span>
                  <span className="font-medium">A</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Visit Frequency</span>
                  <span className="font-medium">Weekly</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Speciality by Practice</span>
                  <span className="font-medium">Diabetologist</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">Premium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rx Potential</span>
                  <span className="font-medium">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Menu */}
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              className="h-11 font-medium text-sm"
              style={{ 
                backgroundColor: '#21BFD01A',
                borderColor: '#21BFD080'
              }}
            >
              Profile
            </Button>
            <Popover open={showNudge} onOpenChange={setShowNudge}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-11 font-medium text-sm"
                  style={{ 
                    backgroundColor: '#21BFD01A',
                    borderColor: '#21BFD080'
                  }}
                  onClick={() => setShowNudge(true)}
                >
                  Detailing
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-4 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2"
                side="top"
                align="start"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1.5">
                        <h4 className="font-semibold text-sm">Smart Insight</h4>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 -mt-1 -mr-1 hover:bg-muted"
                          onClick={() => setShowNudge(false)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Dr. Prakash prescribes Cetil— Add Cetil pages in your playlist accordingly.
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="w-full h-10 text-sm gap-2 group shadow-sm"
                    onClick={() => {
                      setShowNudge(false);
                      // Navigate to playlist editing screen
                      console.log("Navigate to playlist editor");
                    }}
                  >
                    Edit Playlist Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button 
              variant="outline" 
              className="h-11 font-medium text-sm"
              style={{ 
                backgroundColor: '#21BFD01A',
                borderColor: '#21BFD080'
              }}
            >
              Reporting
            </Button>
            <Button 
              variant="outline" 
              className="h-11 font-medium text-sm"
              style={{ 
                backgroundColor: '#21BFD01A',
                borderColor: '#21BFD080'
              }}
            >
              Rehearse
            </Button>
            
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              Edit Playlist
            </Button>
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              History
            </Button>
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              Skip
            </Button>
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              Reschedule
            </Button>
            
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              View Playlist
            </Button>
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              Video Streaming
            </Button>
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              Consent
            </Button>
            <Button variant="outline" className="h-11 bg-card hover:bg-muted/50 font-medium text-sm">
              Check In
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
