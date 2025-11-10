import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SeedDataButtonProps {
  onSuccess: () => void;
}

const SeedDataButton = ({ onSuccess }: SeedDataButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleSeedData = async () => {
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "Please log in first",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('seed-leave-data', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: data.message || "Dummy data created successfully"
      });

      onSuccess();
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

  return (
    <Button
      onClick={handleSeedData}
      disabled={loading}
      variant="outline"
      className="gap-2"
    >
      <Database className="w-4 h-4" />
      {loading ? "Creating Data..." : "Load Demo Data"}
    </Button>
  );
};

export default SeedDataButton;
