import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock, FileText, User } from "lucide-react";

interface LeaveApplication {
  id: string;
  leave_type: {
    name: string;
  };
  from_date: string;
  to_date: string;
  from_session: string;
  to_session: string;
  days: number;
  status: string;
  applied_on: string;
  comments: string;
  attachment_url: string | null;
  reporting_manager: string;
}

interface LeaveDetailsDialogProps {
  leave: LeaveApplication;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeaveDetailsDialog = ({ leave, open, onOpenChange }: LeaveDetailsDialogProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Approved':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Leave Application Details
            <Badge className={`${getStatusColor(leave.status)} text-white`}>
              {leave.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Leave Type */}
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Leave Type</div>
              <div className="font-medium">{leave.leave_type.name}</div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-medium">
                {format(new Date(leave.from_date), 'dd MMM yyyy')} ({leave.from_session})
                {' '}-{' '}
                {format(new Date(leave.to_date), 'dd MMM yyyy')} ({leave.to_session})
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Total Days: {leave.days}
              </div>
            </div>
          </div>

          {/* Applied On */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Applied On</div>
              <div className="font-medium">
                {format(new Date(leave.applied_on), 'dd MMM yyyy, hh:mm a')}
              </div>
            </div>
          </div>

          {/* Reporting Manager */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Reporting Manager</div>
              <div className="font-medium">{leave.reporting_manager}</div>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Reason</div>
            <div className="p-3 bg-muted rounded-md text-sm">
              {leave.comments}
            </div>
          </div>

          {/* Attachment */}
          {leave.attachment_url && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Attachment</div>
              <a
                href={leave.attachment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View Attachment
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveDetailsDialog;
