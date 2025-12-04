import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Database, Loader2 } from "lucide-react";

export const SeedDemoButton = () => {
  const [loading, setLoading] = useState(false);

  const seedDemoData = async () => {
    setLoading(true);
    try {
      // First create manager account
      const { data: managerResult, error: managerError } = await supabase.functions.invoke('create-manager');
      
      if (managerError) {
        console.error('Manager creation error:', managerError);
      } else {
        console.log('Manager result:', managerResult);
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be logged in to seed demo data');
      }

      // Seed demo leaves for current user
      const { data: leavesResult, error: leavesError } = await supabase.functions.invoke('seed-demo-leaves', {
        body: { userId: user.id }
      });

      if (leavesError) {
        throw leavesError;
      }

      toast({
        title: "Demo Data Created",
        description: "Manager account and demo leave applications have been created successfully. Manager login: manager@demo.com / aaaa"
      });

    } catch (error: any) {
      console.error('Seed error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to seed demo data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={seedDemoData}
      disabled={loading}
      className="gap-2"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Database className="w-4 h-4" />
      )}
      Seed Demo Data
    </Button>
  );
};