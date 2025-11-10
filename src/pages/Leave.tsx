import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/components/AppSidebar";
import LeaveBalance from "@/components/leave/LeaveBalance";
import AppliedLeaves from "@/components/leave/AppliedLeaves";

const Leave = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
        </div>

        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="balance">Leave Balance</TabsTrigger>
            <TabsTrigger value="applied">Applied Leaves</TabsTrigger>
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
