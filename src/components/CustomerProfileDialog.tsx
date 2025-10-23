import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";

interface CustomerProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: {
    name: string;
    specialty: string;
  };
}

export const CustomerProfileDialog = ({ open, onOpenChange, customer }: CustomerProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[1008px] h-[748px] overflow-y-auto p-0">
        {/* Header - 1008px x 90px */}
        <div className="sticky top-0 bg-background z-10 h-[90px] px-6 flex items-center border-b">
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

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Information Sections Grid - 314px x 175px cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Current Playlist */}
            <div className="w-[314px] h-[175px] border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-info/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-info uppercase">Current Playlist</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
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
            <div className="w-[314px] h-[175px] border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-info/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-info uppercase">Last Detailing</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
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
            <div className="w-[314px] h-[175px] border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-success uppercase">Action Point</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
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
            <div className="w-[314px] h-[175px] border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-purple uppercase">Focus Brands</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground pb-1 border-b">
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
            <div className="w-[314px] h-[175px] border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-info/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-info uppercase">Personal Details</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
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
            <div className="w-[314px] h-[175px] border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-success uppercase">Business Details</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
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

          {/* Action Menu - 231px x 50px buttons */}
          <div className="grid grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="w-[231px] h-[50px] border"
              style={{ 
                backgroundColor: '#21BFD01A',
                borderColor: '#21BFD080'
              }}
            >
              Profile
            </Button>
            <Button 
              variant="outline" 
              className="w-[231px] h-[50px] border"
              style={{ 
                backgroundColor: '#21BFD01A',
                borderColor: '#21BFD080'
              }}
            >
              Detailing
            </Button>
            <Button 
              variant="outline" 
              className="w-[231px] h-[50px] border"
              style={{ 
                backgroundColor: '#21BFD01A',
                borderColor: '#21BFD080'
              }}
            >
              Reporting
            </Button>
            <Button 
              variant="outline" 
              className="w-[231px] h-[50px] border"
              style={{ 
                backgroundColor: '#21BFD01A',
                borderColor: '#21BFD080'
              }}
            >
              Rehearse
            </Button>
            
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              Edit Playlist
            </Button>
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              History
            </Button>
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              Skip
            </Button>
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              Reschedule
            </Button>
            
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              View Playlist
            </Button>
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              Video Streaming
            </Button>
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              Consent
            </Button>
            <Button variant="outline" className="w-[231px] h-[50px] bg-card hover:bg-muted/50">
              Check In
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
