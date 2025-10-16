import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Users, FileText, BarChart3, Package, MapPin } from "lucide-react";

const onboardingSteps = [
  {
    icon: Calendar,
    title: "Customer Management",
    description: "Learn how to manage your doctor visits, track interactions, and maintain customer relationships effectively.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Planning & Scheduling",
    description: "Master the tour planning tools to organize your daily visits, optimize routes, and manage your territory efficiently.",
    color: "text-accent",
  },
  {
    icon: FileText,
    title: "Reporting & Documentation",
    description: "Understand how to submit visit reports, expense claims, and maintain accurate call documentation.",
    color: "text-success",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your sales trends, effort metrics, and business performance through interactive dashboards.",
    color: "text-purple-500",
  },
  {
    icon: Package,
    title: "Brand Detailing",
    description: "Access product information, promotional materials, and digital detailing aids for effective customer engagement.",
    color: "text-orange-500",
  },
  {
    icon: MapPin,
    title: "Territory Coverage",
    description: "View your assigned territory, customer mapping, and geo-fence tracking for field activity monitoring.",
    color: "text-pink-500",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="max-w-3xl w-full p-12">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6 ${step.color}`}>
            <Icon className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-semibold mb-3">{step.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {step.description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep
                  ? "bg-primary w-8"
                  : index < currentStep
                  ? "bg-success"
                  : "bg-muted"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleSkip}>
            Skip Tour
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {onboardingSteps.length}
            </span>
            <Button onClick={handleNext} size="lg">
              {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Quick Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Context-Sensitive Help</p>
                <p className="text-xs text-muted-foreground">
                  Look for tooltip icons throughout the app for instant guidance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Smart Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive timely prompts for important tasks and updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
