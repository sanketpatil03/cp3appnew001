import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ApplyLeaveDialog from "./ApplyLeaveDialog";
import SeedDataButton from "./SeedDataButton";

interface LeaveBalance {
  id: string;
  leave_type: {
    id: string;
    name: string;
    description: string;
  };
  granted: number;
  availed: number;
  balance: number;
}

const LeaveBalance = () => {
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  const fetchLeaveBalances = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const currentYear = new Date().getFullYear();

      // Fetch leave balances with leave types
      const { data, error } = await supabase
        .from('leave_balances')
        .select(`
          id,
          granted,
          availed,
          balance,
          leave_types:leave_type_id (
            id,
            name,
            description
          )
        `)
        .eq('user_id', user.id)
        .eq('year', currentYear);

      if (error) throw error;

      const formattedData = data?.map(item => ({
        id: item.id,
        leave_type: Array.isArray(item.leave_types) ? item.leave_types[0] : item.leave_types,
        granted: item.granted,
        availed: item.availed,
        balance: item.balance
      })) || [];

      setLeaveBalances(formattedData);
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
    fetchLeaveBalances();
  }, []);

  const getProgressPercentage = (availed: number, granted: number) => {
    if (granted === 0) return 0;
    return (availed / granted) * 100;
  };

  if (loading) {
    return <div className="text-center py-8">Loading leave balances...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SeedDataButton onSuccess={fetchLeaveBalances} />
        <Button onClick={() => setIsApplyDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Apply Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaveBalances.map((leave) => (
          <Card key={leave.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{leave.leave_type.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    Granted: {leave.granted}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{leave.balance}</div>
                <div className="text-sm text-muted-foreground">Balance</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{leave.availed} of {leave.granted} Consumed</span>
                </div>
                <Progress value={getProgressPercentage(leave.availed, leave.granted)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leaveBalances.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No leave balances found for the current year.</p>
        </div>
      )}

      <ApplyLeaveDialog 
        open={isApplyDialogOpen} 
        onOpenChange={setIsApplyDialogOpen}
        onSuccess={fetchLeaveBalances}
      />
    </div>
  );
};

export default LeaveBalance;
