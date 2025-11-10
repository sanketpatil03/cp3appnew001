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
import { CalendarIcon, Upload, Info, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface ApplyLeaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface LeaveType {
  id: string;
  name: string;
}

interface LeaveBalance {
  balance: number;
  granted: number;
  availed: number;
}

interface ImagePreview {
  file: File;
  preview: string;
}

const ApplyLeaveDialog = ({ open, onOpenChange, onSuccess }: ApplyLeaveDialogProps) => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [fromSession, setFromSession] = useState<string>("Session 1");
  const [toSession, setToSession] = useState<string>("Session 1");
  const [leaveTypeId, setLeaveTypeId] = useState<string>("");
  const [comments, setComments] = useState("");
  const [attachments, setAttachments] = useState<ImagePreview[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);
  const [reportingManager, setReportingManager] = useState<string>("Manager Name");
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance | null>(null);

  useEffect(() => {
    if (open) {
      fetchLeaveTypes();
      fetchUserProfile();
    }
  }, [open]);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('reporting_manager')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data?.reporting_manager) {
        setReportingManager(data.reporting_manager);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

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

  const fetchLeaveBalance = async (leaveTypeId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const currentYear = new Date().getFullYear();
      const { data, error } = await supabase
        .from('leave_balances')
        .select('balance, granted, availed')
        .eq('user_id', user.id)
        .eq('leave_type_id', leaveTypeId)
        .eq('year', currentYear)
        .single();

      if (error) throw error;
      setLeaveBalance(data);
    } catch (error: any) {
      console.error('Error fetching leave balance:', error);
      setLeaveBalance(null);
    }
  };

  const handleLeaveTypeChange = (value: string) => {
    setLeaveTypeId(value);
    if (value) {
      fetchLeaveBalance(value);
    } else {
      setLeaveBalance(null);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (attachments.length + files.length > 5) {
      toast({
        title: "Too many files",
        description: "You can upload a maximum of 5 images",
        variant: "destructive"
      });
      return;
    }

    const newPreviews: ImagePreview[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setAttachments(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setAttachments(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
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

      // Upload attachments if present
      const attachmentUrls: string[] = [];
      if (attachments.length > 0) {
        for (const { file } of attachments) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('leave-attachments')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('leave-attachments')
            .getPublicUrl(fileName);

          attachmentUrls.push(publicUrl);
        }
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
          attachment_url: attachmentUrls.length > 0 ? JSON.stringify(attachmentUrls) : null,
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
    attachments.forEach(({ preview }) => URL.revokeObjectURL(preview));
    setAttachments([]);
    setLeaveBalance(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-primary-light/30">
        <DialogHeader className="border-b border-primary/20 pb-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Apply for Leave
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Leave Type with Balance */}
          <div className="space-y-3">
            <Label htmlFor="leave-type">Leave Type *</Label>
            <Select value={leaveTypeId} onValueChange={handleLeaveTypeChange}>
              <SelectTrigger className="h-11">
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
            
            {leaveBalance && (
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 p-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {leaveBalance.balance} days
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>Granted: {leaveBalance.granted}</p>
                    <p>Used: {leaveBalance.availed}</p>
                  </div>
                </div>
              </Card>
            )}
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
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Applying for:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {calculateDays()} days
                </span>
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

          {/* Attachments */}
          <div className="space-y-3">
            <Label htmlFor="attachment" className="flex items-center justify-between">
              <span>Attach Images</span>
              <span className="text-xs text-muted-foreground font-normal">
                {attachments.length}/5 images
              </span>
            </Label>
            
            {attachments.length < 5 && (
              <>
                <Input
                  id="attachment"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('attachment')?.click()}
                  className="w-full gap-2 border-dashed border-2 border-primary/30 hover:border-primary/50 h-20"
                >
                  <Upload className="w-5 h-5 text-primary" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Upload Images</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG (Max 5 images)</p>
                  </div>
                </Button>
              </>
            )}
            
            {attachments.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {attachments.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary/20 bg-muted">
                      <img 
                        src={item.preview} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-primary/20 pt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-primary/30 hover:bg-primary/5"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary shadow-md"
          >
            {loading ? "Submitting..." : "Submit Leave Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyLeaveDialog;
