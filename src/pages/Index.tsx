import { useState } from "react";
import { NudgeCenterOverlay } from "@/components/NudgeCenterOverlay";

const Index = () => {
  const [isNudgeOpen, setIsNudgeOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
      </div>
      <NudgeCenterOverlay open={isNudgeOpen} onOpenChange={setIsNudgeOpen} />
    </div>
  );
};

export default Index;
