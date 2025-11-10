import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CreateDemoUserButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-demo-user');

      if (error) throw error;

      toast({
        title: "Demo User Created Successfully! ✓",
        description: (
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="font-bold">Email:</span> {data.email}
            </div>
            <div>
              <span className="font-bold">Password:</span> {data.password}
            </div>
            <div>
              <span className="font-bold">Name:</span> {data.name}
            </div>
            <p className="pt-2 text-xs">You can now login with these credentials</p>
          </div>
        ),
        duration: 15000
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCreateUser}
      disabled={loading}
      variant="outline"
      className="w-full h-[52px] text-base font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all gap-2"
    >
      <UserPlus className="w-5 h-5" />
      {loading ? "Creating Demo User..." : "Create Demo User (Amaan Khan)"}
    </Button>
  );
};

export default CreateDemoUserButton;
