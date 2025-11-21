import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, User, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LeaveDetailsDialog from "@/components/leave/LeaveDetailsDialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface LeaveApplication {
  id: string;
  user_id: string;
  from_date: string;
  to_date: string;
  from_session: string;
  to_session: string;
  days: number;
  status: string;
  applied_on: string;
  comments: string;
  attachment_url: string | null;
  approval_level: number;
  escalated_at: string | null;
  reporting_manager: string;
  leave_type: {
    id: string;
    name: string;
  };
  profiles: {
    full_name: string;
    employee_id: string | null;
  };
  user_balance?: {
    balance: number;
    granted: number;
    availed: number;
  };
}

const Approvals = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingApplications, setPendingApplications] = useState<LeaveApplication[]>([]);
  const [processedApplications, setProcessedApplications] = useState<LeaveApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [actionComments, setActionComments] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/");
      return;
    }

    // Check if user is manager or admin
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id);

    const isManagerOrAdmin = roles?.some(r => r.role === 'manager' || r.role === 'admin');
    
    if (!isManagerOrAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    fetchApplications(session.user.id);
  };

  const fetchApplications = async (userId: string) => {
    setLoading(true);
    try {
      // Fetch pending applications - profiles joined via user_id matching profiles.id
      const { data: rawPending, error: pendingError } = await supabase
        .from('leave_applications')
        .select(`
          *,
          leave_type:leave_types!leave_applications_leave_type_id_fkey(id, name)
        `)
        .eq('current_approver_id', userId)
        .eq('status', 'Pending')
        .order('applied_on', { ascending: false });

      if (pendingError) throw pendingError;

      // Manually fetch profiles for each application
      const pending: LeaveApplication[] = [];
      if (rawPending) {
        for (const app of rawPending) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, employee_id')
            .eq('id', app.user_id)
            .single();

          pending.push({
            ...app,
            profiles: profile || { full_name: 'Unknown', employee_id: null }
          } as LeaveApplication);
        }
      }

      // Fetch processed applications (approved/rejected by current user)
      const { data: rawProcessed, error: processedError } = await supabase
        .from('leave_approvals')
        .select(`
          application_id,
          leave_applications!leave_approvals_application_id_fkey(
            *,
            leave_type:leave_types!leave_applications_leave_type_id_fkey(id, name)
          )
        `)
        .eq('approver_id', userId)
        .in('action', ['approved', 'rejected'])
        .order('created_at', { ascending: false })
        .limit(50);

      if (processedError) throw processedError;

      // Manually fetch profiles for processed applications
      const processed: LeaveApplication[] = [];
      if (rawProcessed) {
        for (const item of rawProcessed) {
          const app = item.leave_applications;
          if (!app) continue;

          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, employee_id')
            .eq('id', app.user_id)
            .single();

          processed.push({
            ...app,
            profiles: profile || { full_name: 'Unknown', employee_id: null }
          } as LeaveApplication);
        }
      }

      // Fetch balance for each pending application
      if (pending) {
        for (const app of pending) {
          const { data: balance } = await supabase
            .from('leave_balances')
            .select('balance, granted, availed')
            .eq('user_id', app.user_id)
            .eq('leave_type_id', (app as any).leave_type_id)
            .eq('year', new Date().getFullYear())
            .single();

          if (balance) {
            app.user_balance = balance;
          }
        }
      }

      setPendingApplications(pending);
      setProcessedApplications(processed);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leave applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (application: LeaveApplication) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Update application status
      const { error: updateError } = await supabase
        .from('leave_applications')
        .update({ 
          status: 'Approved',
          current_approver_id: null,
        })
        .eq('id', application.id);

      if (updateError) throw updateError;

      // Create approval record
      const { error: approvalError } = await supabase
        .from('leave_approvals')
        .insert({
          application_id: application.id,
          approver_id: session.user.id,
          action: 'approved',
          level: application.approval_level,
          comments: actionComments[application.id] || null,
        });

      if (approvalError) throw approvalError;

      toast({
        title: "Leave Approved",
        description: `Leave application for ${application.profiles.full_name} has been approved`,
      });

      // Refresh data
      fetchApplications(session.user.id);
      setActionComments(prev => {
        const newComments = { ...prev };
        delete newComments[application.id];
        return newComments;
      });
    } catch (error: any) {
      console.error('Error approving leave:', error);
      toast({
        title: "Error",
        description: "Failed to approve leave application",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (application: LeaveApplication) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Update application status
      const { error: updateError } = await supabase
        .from('leave_applications')
        .update({ 
          status: 'Rejected',
          current_approver_id: null,
        })
        .eq('id', application.id);

      if (updateError) throw updateError;

      // Create approval record
      const { error: approvalError } = await supabase
        .from('leave_approvals')
        .insert({
          application_id: application.id,
          approver_id: session.user.id,
          action: 'rejected',
          level: application.approval_level,
          comments: actionComments[application.id] || null,
        });

      if (approvalError) throw approvalError;

      toast({
        title: "Leave Rejected",
        description: `Leave application for ${application.profiles.full_name} has been rejected`,
      });

      // Refresh data
      fetchApplications(session.user.id);
      setActionComments(prev => {
        const newComments = { ...prev };
        delete newComments[application.id];
        return newComments;
      });
    } catch (error: any) {
      console.error('Error rejecting leave:', error);
      toast({
        title: "Error",
        description: "Failed to reject leave application",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-500';
      case 'Rejected': return 'bg-red-500';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderApplicationCard = (application: LeaveApplication, showActions: boolean = false) => (
    <Card key={application.id} className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-4 h-4" />
              {application.profiles.full_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {application.profiles.employee_id && `ID: ${application.profiles.employee_id}`}
            </p>
          </div>
          <Badge className={getStatusColor(application.status)}>
            {application.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Leave Type
            </p>
            <p className="text-sm text-muted-foreground">{application.leave_type.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Days</p>
            <p className="text-sm text-muted-foreground">{application.days} day(s)</p>
          </div>
          <div>
            <p className="text-sm font-medium">From</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(application.from_date)} ({application.from_session})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">To</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(application.to_date)} ({application.to_session})
            </p>
          </div>
        </div>

        {application.user_balance && (
          <div className="bg-muted p-3 rounded-lg mb-4">
            <p className="text-sm font-medium mb-1">Employee Leave Balance</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Granted</p>
                <p className="font-semibold">{application.user_balance.granted}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Availed</p>
                <p className="font-semibold">{application.user_balance.availed}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Available</p>
                <p className="font-semibold text-primary">{application.user_balance.balance}</p>
              </div>
            </div>
          </div>
        )}

        {application.escalated_at && (
          <div className="flex items-center gap-2 text-sm text-orange-600 mb-3">
            <Clock className="w-4 h-4" />
            Escalated on {formatDate(application.escalated_at)}
          </div>
        )}

        {application.comments && (
          <div className="mb-4">
            <p className="text-sm font-medium flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Reason
            </p>
            <p className="text-sm text-muted-foreground">{application.comments}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedLeave(application);
              setIsDetailsOpen(true);
            }}
          >
            View Details
          </Button>

          {showActions && (
            <>
              <div className="flex-1" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReject(application)}
              >
                Reject
              </Button>
              <Button
                size="sm"
                onClick={() => handleApprove(application)}
              >
                Approve
              </Button>
            </>
          )}
        </div>

        {showActions && (
          <div className="mt-4">
            <Label htmlFor={`comments-${application.id}`}>Comments (Optional)</Label>
            <Textarea
              id={`comments-${application.id}`}
              placeholder="Add comments for approval/rejection..."
              value={actionComments[application.id] || ''}
              onChange={(e) => setActionComments(prev => ({
                ...prev,
                [application.id]: e.target.value
              }))}
              className="mt-1"
              rows={2}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold text-white mb-2">Leave Approvals</h1>
            <p className="text-white/90 text-lg">Review and manage leave requests</p>
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-white shadow-md h-12 p-1">
            <TabsTrigger 
              value="pending"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
            >
              Pending ({pendingApplications.length})
            </TabsTrigger>
            <TabsTrigger 
              value="processed"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
            >
              Processed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : pendingApplications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No pending leave applications
                </CardContent>
              </Card>
            ) : (
              pendingApplications.map(app => renderApplicationCard(app, true))
            )}
          </TabsContent>

          <TabsContent value="processed">
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : processedApplications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No processed applications
                </CardContent>
              </Card>
            ) : (
              processedApplications.map(app => renderApplicationCard(app, false))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedLeave && (
        <LeaveDetailsDialog
          leave={selectedLeave}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  );
};

export default Approvals;
