import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ApplyLeaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface LeaveType {
  id: string;
  name: string;
}

const ApplyLeaveDialog = ({ open, onOpenChange, onSuccess }: ApplyLeaveDialogProps) => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [fromSession, setFromSession] = useState<string>("Session 1");
  const [toSession, setToSession] = useState<string>("Session 1");
  const [leaveTypeId, setLeaveTypeId] = useState<string>("");
  const [comments, setComments] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);
  const reportingManager = "Manager Name"; // This should come from user profile

  useEffect(() => {
    if (open) {
      fetchLeaveTypes();
    }
  }, [open]);

  const fetchLeaveTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('leave_types')
        .select('id, name');

      if (error) throw error;
      setLeaveTypes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const calculateDays = (): number => {
    if (!fromDate || !toDate) return 0;

    const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Adjust for half days
    let totalDays = daysDiff;
    if (fromSession === "Session 2") totalDays -= 0.5;
    if (toSession === "Session 1") totalDays -= 0.5;

    return Math.max(totalDays, 0);
  };

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !leaveTypeId || !comments) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (fromDate > toDate) {
      toast({
        title: "Validation Error",
        description: "From date cannot be after To date",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Upload attachment if present
      let attachmentUrl = null;
      if (attachment) {
        const fileExt = attachment.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('leave-attachments')
          .upload(fileName, attachment);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('leave-attachments')
          .getPublicUrl(fileName);

        attachmentUrl = publicUrl;
      }

      const days = calculateDays();

      const { error } = await supabase
        .from('leave_applications')
        .insert({
          user_id: user.id,
          leave_type_id: leaveTypeId,
          from_date: format(fromDate, 'yyyy-MM-dd'),
          from_session: fromSession,
          to_date: format(toDate, 'yyyy-MM-dd'),
          to_session: toSession,
          days,
          comments,
          attachment_url: attachmentUrl,
          reporting_manager: reportingManager,
          status: 'Pending'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Leave applied successfully"
      });

      onSuccess();
      onOpenChange(false);
      resetForm();
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

  const resetForm = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setFromSession("Session 1");
    setToSession("Session 1");
    setLeaveTypeId("");
    setComments("");
    setAttachment(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Leave Type */}
          <div className="space-y-2">
            <Label htmlFor="leave-type">Leave Type *</Label>
            <Select value={leaveTypeId} onValueChange={setLeaveTypeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                {leaveTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* From Date and Session */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Session *</Label>
              <Select value={fromSession} onValueChange={setFromSession}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Session 1">Session 1</SelectItem>
                  <SelectItem value="Session 2">Session 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* To Date and Session */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>To Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Session *</Label>
              <Select value={toSession} onValueChange={setToSession}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Session 1">Session 1</SelectItem>
                  <SelectItem value="Session 2">Session 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Days Calculation */}
          {fromDate && toDate && (
            <div className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Applying for:</span>
                <span className="text-lg font-bold">{calculateDays()} days</span>
              </div>
            </div>
          )}

          {/* Reporting Manager */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Leave Approval
              <Info className="w-4 h-4 text-muted-foreground" />
            </Label>
            <Input value={reportingManager} disabled />
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Reason *</Label>
            <Textarea
              id="comments"
              placeholder="Enter reason for leave"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          {/* Attachment */}
          <div className="space-y-2">
            <Label htmlFor="attachment">Attach File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="attachment"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('attachment')?.click()}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                {attachment ? attachment.name : "Choose File"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              File Types: .pdf, .jpg, .png (Max 5MB)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyLeaveDialog;
