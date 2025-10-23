import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Activity, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";

interface PerformanceSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PerformanceSummaryDialog = ({ open, onOpenChange }: PerformanceSummaryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Performance Update & Insights</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Overall Achievement Summary */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Overall Achievement Summary</h4>
                <p className="text-sm text-muted-foreground">
                  You've achieved <span className="font-bold text-primary">84%</span> of your monthly target as of today.
                </p>
              </div>
            </div>
          </div>

          {/* Growth vs. Last Month */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Growth vs. Last Month</h4>
                <p className="text-sm text-muted-foreground">
                  Your overall growth <span className="font-bold text-success">+8%</span> vs. September
                </p>
              </div>
            </div>
          </div>

          {/* Doctor Coverage Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-info" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Doctor Coverage Summary</h4>
                <p className="text-sm text-muted-foreground">
                  You've met <span className="font-bold text-info">92%</span> of your A-segment doctors this month.
                </p>
              </div>
            </div>
          </div>

          {/* Dormant Doctor Reactivation */}
          <div className="bg-gradient-to-r from-success/10 to-success/5 rounded-lg p-4 border border-success/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Dormant Doctor Reactivation</h4>
                <p className="text-sm text-muted-foreground">
                  3 inactive doctors - <span className="font-medium">Dr Ameer Patil, Dr Amaan Khan and Dr Kapil K</span> have started prescribing again
                </p>
              </div>
            </div>
          </div>

          {/* Call Performance */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Avg. <span className="font-bold text-primary">12 calls/day</span> vs. target 10 — excellent coverage.
                </p>
              </div>
            </div>
          </div>

          {/* High-Value Opportunity */}
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4 border border-accent/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">High-Value Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Visit <span className="font-medium">Dr. Mehta</span> next week — potential <span className="font-bold text-accent">+₹10K</span> uplift.
                </p>
              </div>
            </div>
          </div>

          {/* Risk Alert */}
          <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-lg p-4 border border-destructive/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Attention Required</h4>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Dr. S. Deshmukh's</span> engagement dropped <span className="font-bold text-destructive">40%</span> — risk of churn
                </p>
              </div>
            </div>
          </div>

          {/* Cross-Therapy Insight */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-purple" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Cross-Therapy Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Doctors prescribing <span className="font-medium">Budamate</span> are also likely to prescribe <span className="font-medium">Cetil</span> — promote both together
                </p>
              </div>
            </div>
          </div>

          {/* Action Point */}
          <div className="bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg p-4 border border-warning/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Action Point</h4>
                <p className="text-sm text-muted-foreground">
                  Doctor Patel had asked for <span className="font-medium">Cidmus patient leaflets</span> - confirm if delivered
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Got it, Thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
