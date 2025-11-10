import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface LeaveApplication {
  id: string;
  leave_type: {
    name: string;
  };
}

interface CancelLeaveDialogProps {
  leave: LeaveApplication;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CancelLeaveDialog = ({ leave, open, onOpenChange, onSuccess }: CancelLeaveDialogProps) => {
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!remarks.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide remarks for cancellation",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('leave_applications')
        .update({ 
          status: 'Cancelled',
          comments: `${remarks} [Cancellation requested]`
        })
        .eq('id', leave.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Leave cancelled successfully"
      });

      onSuccess();
      onOpenChange(false);
      setRemarks("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Leave Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to cancel your <strong>{leave.leave_type.name}</strong> application?
          </p>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks *</Label>
            <Textarea
              id="remarks"
              placeholder="Please provide reason for cancellation"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            No, Keep It
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={loading}>
            {loading ? "Cancelling..." : "Yes, Cancel Leave"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelLeaveDialog;
