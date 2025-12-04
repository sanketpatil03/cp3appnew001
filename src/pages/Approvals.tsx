import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X, Eye, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: {
    name: string;
  };
  from_date: string;
  to_date: string;
  days: number;
  status: string;
  applied_on: string;
  comments: string;
  from_session: string;
  to_session: string;
  employee_name?: string;
}

const Approvals = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [actionComments, setActionComments] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }

      // Check if user is a manager
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'manager')
        .maybeSingle();

      if (!roleData) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive"
        });
        navigate("/dashboard");
        return;
      }

      setIsManager(true);

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name);
      }

      fetchLeaveRequests(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchLeaveRequests = async (managerId: string) => {
    try {
      // Get employees under this manager
      const { data: hierarchy, error: hierarchyError } = await supabase
        .from('manager_hierarchy')
        .select('employee_id')
        .eq('manager_id', managerId);

      if (hierarchyError) throw hierarchyError;

      const employeeIds = hierarchy?.map(h => h.employee_id) || [];

      if (employeeIds.length === 0) {
        setRequests([]);
        setLoading(false);
        return;
      }

      // Fetch leave applications for these employees
      const { data: leaves, error: leavesError } = await supabase
        .from('leave_applications')
        .select(`
          id,
          user_id,
          from_date,
          to_date,
          days,
          status,
          applied_on,
          comments,
          from_session,
          to_session,
          leave_types:leave_type_id (name)
        `)
        .in('user_id', employeeIds)
        .order('applied_on', { ascending: false });

      if (leavesError) throw leavesError;

      // Fetch employee names
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', employeeIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p.full_name]) || []);

      const formattedData = leaves?.map(item => ({
        ...item,
        leave_type: Array.isArray(item.leave_types) ? item.leave_types[0] : item.leave_types,
        employee_name: profileMap.get(item.user_id) || 'Unknown Employee'
      })) || [];

      setRequests(formattedData);
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

  const handleAction = (request: LeaveRequest, type: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(type);
    setActionComments("");
    setActionDialogOpen(true);
  };

  const processAction = async () => {
    if (!selectedRequest) return;

    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const newStatus = actionType === 'approve' ? 'Approved' : 'Rejected';

      // Update leave application status
      const { error: updateError } = await supabase
        .from('leave_applications')
        .update({ status: newStatus })
        .eq('id', selectedRequest.id);

      if (updateError) throw updateError;

      // Record the approval action
      const { error: approvalError } = await supabase
        .from('leave_approvals')
        .insert({
          application_id: selectedRequest.id,
          approver_id: user.id,
          action: newStatus,
          comments: actionComments,
          level: 1
        });

      if (approvalError) throw approvalError;

      toast({
        title: `Leave ${newStatus}`,
        description: `The leave request has been ${newStatus.toLowerCase()} successfully.`
      });

      // Refresh the list
      fetchLeaveRequests(user.id);
      setActionDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

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

  if (!isManager) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Leave Approvals</h1>
                <p className="text-white/90 text-lg">Welcome, {userName}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-white/80 text-sm">Pending Requests</p>
                <p className="text-white text-2xl font-bold">
                  {requests.filter(r => r.status === 'Pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="text-center py-8">Loading requests...</div>
        ) : requests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No leave requests found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-lg">{request.employee_name}</span>
                        </div>
                        <Badge variant="outline">{request.leave_type?.name}</Badge>
                        <Badge className={cn("text-white", getStatusColor(request.status))}>
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Duration:</span>{" "}
                          {format(new Date(request.from_date), 'dd MMM yyyy')} - {format(new Date(request.to_date), 'dd MMM yyyy')}
                        </div>
                        <div>
                          <span className="font-medium">Days:</span> {request.days}
                        </div>
                        <div>
                          <span className="font-medium">Applied:</span> {format(new Date(request.applied_on), 'dd MMM yyyy')}
                        </div>
                      </div>

                      {request.comments && (
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">Reason:</span>{" "}
                          <span className="text-foreground">{request.comments}</span>
                        </div>
                      )}
                    </div>

                    {request.status === 'Pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleAction(request, 'approve')}
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleAction(request, 'reject')}
                          className="gap-2"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Dialog */}
        <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === 'approve' ? 'Approve' : 'Reject'} Leave Request
              </DialogTitle>
              <DialogDescription>
                {selectedRequest && (
                  <>
                    {selectedRequest.employee_name} - {selectedRequest.leave_type?.name}
                    <br />
                    {format(new Date(selectedRequest.from_date), 'dd MMM yyyy')} to{' '}
                    {format(new Date(selectedRequest.to_date), 'dd MMM yyyy')} ({selectedRequest.days} days)
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="comments">Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Add any comments..."
                  value={actionComments}
                  onChange={(e) => setActionComments(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={processAction}
                disabled={processing}
                className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
                variant={actionType === 'reject' ? 'destructive' : 'default'}
              >
                {processing ? 'Processing...' : actionType === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Approvals;