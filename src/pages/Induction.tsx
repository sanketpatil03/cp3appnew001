import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";

const inductionItems = [
  "I have read and understood the Company's Policies and Code of Conduct.",
  "I have completed Regulatory and Compliance Training including Ethics, Anti-bribery, and Pharmacovigilance.",
  "I am familiar with the Product Portfolio, including key brands, indications, and market positioning.",
  "I have reviewed the Therapy Areas and Disease Knowledge relevant to my assigned products.",
  "I understand the Standard Operating Procedures for field reporting, order booking, and call documentation.",
  "I am trained to use the CRM and mobile application effectively.",
  "I know the Sales Call Objectives and Best Practices.",
  "I understand Customer Segmentation and Mapping including Doctors, Chemists, and Stockists.",
  "I am aware of current Marketing Campaigns and Promotional Schemes.",
  "I have completed KYC and police verification processes.",
  "I understand my Territory and Customer Coverage Plan.",
  "I have gone through Sample Handling and Distribution Guidelines.",
  "I am equipped to handle Frequently Asked Questions and Objections.",
  "I acknowledge that this induction training is complete and ready for Manager Approval.",
];

const Induction = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(inductionItems.length).fill(false));
  const navigate = useNavigate();

  const allChecked = checkedItems.every((item) => item);
  const progress = Math.round((checkedItems.filter(Boolean).length / inductionItems.length) * 100);

  const handleCheckItem = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const handleSubmit = () => {
    if (!allChecked) {
      toast.error("Please complete all induction items before submitting.");
      return;
    }

    // Submit for manager approval
    localStorage.setItem("inductionSubmitted", "true");
    toast.success("Induction submitted for manager approval!");
    
    // Simulate manager approval after 2 seconds
    setTimeout(() => {
      localStorage.setItem("inductionComplete", "true");
      toast.success("Induction approved! Welcome to Phyzii 3!");
      navigate("/onboarding");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-light mb-2">Welcome to Phyzii 3</h1>
          <p className="text-lg opacity-90">New User Induction Module</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Progress Bar */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Induction Progress</h2>
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary rounded-full h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {checkedItems.filter(Boolean).length} of {inductionItems.length} items completed
          </p>
        </Card>

        {/* Induction Checklist */}
        <Card className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Induction Checklist</h2>
            <p className="text-muted-foreground">
              Please review and acknowledge the following induction parameters. Once completed, submit for manager approval.
            </p>
          </div>

          <div className="space-y-4">
            {inductionItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    id={`item-${index}`}
                    checked={checkedItems[index]}
                    onCheckedChange={() => handleCheckItem(index)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`item-${index}`}
                    className="text-sm leading-relaxed cursor-pointer flex-1"
                  >
                    <span className="font-medium text-muted-foreground mr-2">{index + 1}.</span>
                    {item}
                  </label>
                </div>
                {checkedItems[index] && (
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                )}
                {!checkedItems[index] && (
                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  By submitting, you acknowledge completion of all induction requirements.
                </p>
                <p className="text-xs text-muted-foreground">
                  Your submission will be sent to your reporting manager for approval.
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!allChecked}
                size="lg"
                className="ml-4"
              >
                Submit for Approval
              </Button>
            </div>
          </div>
        </Card>

        {/* Help Card */}
        <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-primary mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            If you have any questions about the induction process, please contact your reporting manager or HR department.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Induction;
