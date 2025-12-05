import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import LeaveDetailsDialog from "./LeaveDetailsDialog";
import CancelLeaveDialog from "./CancelLeaveDialog";

interface LeaveApplication {
  id: string;
  leave_type: {
    name: string;
  };
  from_date: string;
  to_date: string;
  days: number;
  status: string;
  applied_on: string;
  comments: string;
  attachment_url: string | null;
  from_session: string;
  to_session: string;
  reporting_manager: string;
  approval_remarks?: string;
  approved_by?: string;
}

const AppliedLeaves = () => {
  const [applications, setApplications] = useState<LeaveApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('leave_applications')
        .select(`
          id,
          from_date,
          to_date,
          days,
          status,
          applied_on,
          comments,
          attachment_url,
          from_session,
          to_session,
          reporting_manager,
          leave_types:leave_type_id (
            name
          )
        `)
        .eq('user_id', user.id)
        .order('applied_on', { ascending: false });

      if (error) throw error;

      // Fetch approval remarks for each application
      const applicationIds = data?.map(d => d.id) || [];
      const { data: approvals } = await supabase
        .from('leave_approvals')
        .select('application_id, comments, approver_id')
        .in('application_id', applicationIds);

      // Fetch approver names
      const approverIds = [...new Set(approvals?.map(a => a.approver_id).filter(Boolean) || [])];
      const { data: approverProfiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', approverIds);

      const approverMap = new Map(approverProfiles?.map(p => [p.id, p.full_name]) || []);
      const approvalMap = new Map(approvals?.map(a => [
        a.application_id, 
        { remarks: a.comments, approver: approverMap.get(a.approver_id) || 'Manager' }
      ]) || []);

      const formattedData = data?.map(item => ({
        ...item,
        leave_type: Array.isArray(item.leave_types) ? item.leave_types[0] : item.leave_types,
        approval_remarks: approvalMap.get(item.id)?.remarks,
        approved_by: approvalMap.get(item.id)?.approver
      })) || [];

      setApplications(formattedData);
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

  useEffect(() => {
    fetchApplications();
  }, []);

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

  const canCancel = (leave: LeaveApplication) => {
    const fromDate = new Date(leave.from_date);
    const today = new Date();
    return (leave.status === 'Pending' || leave.status === 'Approved') && fromDate > today;
  };

  const handleViewDetails = (leave: LeaveApplication) => {
    setSelectedLeave(leave);
    setIsDetailsOpen(true);
  };

  const handleCancelClick = (leave: LeaveApplication) => {
    setSelectedLeave(leave);
    setIsCancelOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  return (
    <div className="space-y-4">
      {applications.map((leave) => (
        <Card key={leave.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{leave.leave_type.name}</h3>
                  <Badge className={cn("text-white", getStatusColor(leave.status))}>
                    {leave.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {format(new Date(leave.from_date), 'dd MMM yyyy')} - {format(new Date(leave.to_date), 'dd MMM yyyy')}
                  </div>
                  <div>
                    <span className="font-medium">Days:</span> {leave.days}
                  </div>
                  <div>
                    <span className="font-medium">Applied:</span> {format(new Date(leave.applied_on), 'dd MMM yyyy')}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(leave)}
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                
                {canCancel(leave) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelClick(leave)}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {applications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No leave applications found.</p>
        </div>
      )}

      {selectedLeave && (
        <>
          <LeaveDetailsDialog
            leave={selectedLeave}
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          />
          <CancelLeaveDialog
            leave={selectedLeave}
            open={isCancelOpen}
            onOpenChange={setIsCancelOpen}
            onSuccess={fetchApplications}
          />
        </>
      )}
    </div>
  );
};

export default AppliedLeaves;
