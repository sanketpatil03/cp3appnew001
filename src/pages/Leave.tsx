import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/components/AppSidebar";
import LeaveBalance from "@/components/leave/LeaveBalance";
import AppliedLeaves from "@/components/leave/AppliedLeaves";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Leave = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  // Check authentication and fetch user data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name);
      } else {
        setUserName(session.user.email?.split('@')[0] || 'User');
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Leave Management</h1>
                <p className="text-white/90 text-lg">Welcome, {userName}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-white/80 text-sm">Current Year</p>
                <p className="text-white text-2xl font-bold">{new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-white shadow-md h-12 p-1">
            <TabsTrigger 
              value="balance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
            >
              Leave Balance
            </TabsTrigger>
            <TabsTrigger 
              value="applied"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
            >
              Applied Leaves
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="balance">
            <LeaveBalance />
          </TabsContent>
          
          <TabsContent value="applied">
            <AppliedLeaves />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leave;
