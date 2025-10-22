import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { LeaderboardWidget } from "@/components/LeaderboardWidget";
import { useState } from "react";
import {
  Power,
  Mail,
  RefreshCw,
  Settings,
  Bell,
  Menu,
  Calendar,
  Search,
  Plus,
  MapPin,
  CheckCircle2,
  AlignLeft,
  Users,
  ChevronLeft,
  ChevronRight,
  Lock,
  PhoneOff,
  Phone,
  FileText,
  UserPlus,
  UserMinus,
  TrendingUp,
  Package,
  Target,
  Activity,
  Cake,
  Gift,
  Pill,
  ClipboardList,
  BarChart3,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  const [isProductFocusOpen, setIsProductFocusOpen] = useState(false);
  
  const customers = [
    { name: "Dr. Prakash Patil", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Austin Berg", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Jalen Tindel", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Lindsey Stack", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Cesar Amadon", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
  ];
  
  // Focus brands data with launch dates
  const focusBrands = [
    { name: "Aprox", launchDate: new Date("2024-03-15") }, // Newly launched
    { name: "Bprox", launchDate: new Date("2024-03-20") }, // Newly launched
    { name: "Cprox", launchDate: new Date("2023-06-10") },
    { name: "Dprox", launchDate: new Date("2023-09-05") },
    { name: "Eprox", launchDate: new Date("2024-03-01") },
    { name: "Fprox", launchDate: new Date("2023-08-15") },
    { name: "Gprox", launchDate: new Date("2024-01-10") },
  ];
  
  // Helper function to check if a brand is new (launched within last 3 months)
  const isNewBrand = (launchDate: Date) => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return launchDate > threeMonthsAgo;
  };
  
  // Get top 3 brands for display
  const topBrands = focusBrands.slice(0, 3);

  const lockedDates = [
    "05-Jul, Friday (2)",
    "07-Jul, Saturday (5)",
    "08-Jul, Sunday (0)",
    "09-Jul, Monday (0)",
    "10-Jul, Tuesday (0)",
    "11-Jul, Wednesday (0)",
    "12-Jul, Thursday (0)",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-white/40">
            <AvatarImage src="" alt="Prakash" />
            <AvatarFallback className="bg-primary-dark text-primary-foreground font-semibold">P</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold">Prakash</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-10 w-10">
            <Power className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-10 w-10">
            <Mail className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-10 w-10">
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-10 w-10">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-10 w-10 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-10 w-10">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Calendar View - Fixed */}
        <div className="w-[374px] bg-gradient-to-br from-primary to-secondary p-4 flex flex-col h-full">
          {/* Calendar Header - Fixed */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-white flex-shrink-0" />
              <ChevronLeft className="w-5 h-5 text-white cursor-pointer hover:opacity-80 flex-shrink-0" />
              <span className="font-semibold text-white text-sm">July 2023</span>
              <ChevronRight className="w-5 h-5 text-white cursor-pointer hover:opacity-80 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                <Search className="w-4 h-4" />
              </Button>
              <div className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-md backdrop-blur-sm">
                AZ
              </div>
            </div>
          </div>

          {/* Scrollable Date Section */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {/* Date Strip */}
            <div className="bg-primary-dark/40 backdrop-blur-sm rounded-lg px-4 py-2.5 flex items-center justify-between flex-shrink-0">
              <span className="text-white font-medium text-xs">04-Jul, Thursday (5)</span>
              <Button size="icon" className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white border-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Customer Cards */}
            <div className="space-y-2">
              {customers.map((customer, idx) => (
                <Card key={idx} className="w-[330px] h-[75px] p-3 bg-white/95 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <Avatar className="w-12 h-12 border-2 border-primary/20 flex-shrink-0">
                        <AvatarImage src="" alt={customer.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary text-xs font-semibold">
                          {customer.name.split(" ").slice(1).map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs leading-tight text-foreground truncate">{customer.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{customer.specialty}</p>
                        <div className="flex gap-1 mt-1.5">
                          {customer.status.map((s, i) => (
                            <div key={i} className="w-5 h-5 rounded border border-border bg-muted/50 flex items-center justify-center text-[9px] font-medium text-muted-foreground">
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 ml-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">{customer.time}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-primary font-medium">Andheri</span>
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Next Date - Collapsible */}
            <div className="bg-primary-dark/40 backdrop-blur-sm rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-primary-dark/50 transition-colors">
              <span className="text-white font-medium text-xs">05-Jul, Friday (2)</span>
              <Button size="icon" className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white border-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Locked Dates */}
            {lockedDates.slice(1).map((date, idx) => (
              <div key={idx} className="bg-primary-dark/30 backdrop-blur-sm rounded-lg px-4 py-2.5 flex items-center justify-between opacity-60">
                <span className="text-white font-medium text-xs">{date}</span>
                <Lock className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Widgets - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="flex flex-col gap-4 max-w-[660px] p-4 pb-8">
            {/* Row 1: Large Widgets */}
            <div className="flex gap-4">
              {/* Reminder Card */}
              <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-card border-0 rounded-2xl flex flex-col">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <AlignLeft className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Reminder</p>
                  <p className="text-3xl font-bold leading-none mt-0.5">03</p>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 overflow-hidden">
                <div className="border-l-2 border-accent pl-2.5">
                  <p className="font-medium text-xs leading-tight truncate">Secondary Sales Pending</p>
                  <p className="text-[10px] text-muted-foreground">14 July 2023</p>
                </div>
                <div className="border-l-2 border-accent pl-2.5">
                  <p className="font-medium text-xs leading-tight truncate">Create MTP : July 23</p>
                  <p className="text-[10px] text-muted-foreground">25 July 2023</p>
                </div>
              </div>
              </Card>

              {/* Action Points Card */}
              <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-card border-0 rounded-2xl flex flex-col">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-destructive rounded-full" />
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Action Points</p>
                  <p className="text-3xl font-bold leading-none mt-0.5">03</p>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 overflow-hidden">
                <div className="border-l-2 border-purple pl-2.5">
                  <p className="font-medium text-xs leading-tight truncate">Study Material for Aprox</p>
                  <p className="text-[10px] text-muted-foreground truncate">Dr. Austin Berg</p>
                </div>
                <div className="border-l-2 border-purple pl-2.5">
                  <p className="font-medium text-xs leading-tight truncate">Conduct & Event for Bprox</p>
                  <p className="text-[10px] text-muted-foreground truncate">Dr. Jalen Tindel</p>
                </div>
              </div>
              </Card>
            </div>

            {/* Row 2: Large Widgets */}
            <div className="flex gap-4">
              {/* Events Card */}
              <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-success rounded-full" />
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Events</p>
                  <p className="text-3xl font-bold leading-none mt-0.5">10</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="border-l-2 border-success pl-2.5">
                  <p className="font-medium text-xs leading-tight">Doctor Meet</p>
                  <p className="text-[10px] text-muted-foreground">15 July 2023</p>
                </div>
                <div className="border-l-2 border-success pl-2.5">
                  <p className="font-medium text-xs leading-tight">Annual Celebration</p>
                  <p className="text-[10px] text-muted-foreground">16 July 2023</p>
                </div>
              </div>
              </Card>

              {/* Leaves & Holidays Card */}
              <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Leaves & Holidays</p>
                  <p className="text-3xl font-bold leading-none mt-0.5">03</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="border-l-2 border-teal pl-2.5">
                  <p className="font-medium text-xs leading-tight">Independence Day</p>
                  <p className="text-[10px] text-muted-foreground">15 August 2024 - Thu</p>
                </div>
                <div className="border-l-2 border-teal pl-2.5">
                  <p className="font-medium text-xs leading-tight">Casual Leave</p>
                  <p className="text-[10px] text-muted-foreground">5 September 2024 - Thu</p>
                </div>
              </div>
              </Card>
            </div>

            {/* Row 3: Large Widgets */}
            <div className="flex gap-4">
              {/* Approval Card */}
              <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Approval</p>
                  <p className="text-3xl font-bold leading-none mt-0.5">05</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="border-l-2 border-info pl-2.5">
                  <p className="font-medium text-xs leading-tight">Mtp for June 2023</p>
                  <p className="text-[10px] text-success">Approved by Final Approval</p>
                </div>
                <div className="border-l-2 border-info pl-2.5">
                  <p className="font-medium text-xs leading-tight">Expense for June 2023</p>
                  <p className="text-[10px] text-destructive">Rejected by admin</p>
                </div>
              </div>
              </Card>

              {/* Sync Status Card */}
              <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="mb-2">
                <p className="text-xs text-muted-foreground font-medium">Sync Status</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-lg font-bold mb-0.5">15 Days ago</p>
                  <p className="text-[10px] text-muted-foreground">50 Records Pending</p>
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-[10px] font-semibold mb-0.5">Last Upload</p>
                    <p className="text-xs font-medium">06 July 2023</p>
                    <p className="text-[10px] text-muted-foreground">11:30 AM</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold mb-0.5">10 Days ago</p>
                  <p className="text-[10px] text-muted-foreground">01 Records Pending</p>
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-[10px] font-semibold mb-0.5">Last Download</p>
                    <p className="text-xs font-medium">06 July 2023</p>
                    <p className="text-[10px] text-muted-foreground">11:30 AM</p>
                  </div>
                </div>
              </div>
              </Card>
            </div>

            {/* Row 4: Small Widgets Paired Together */}
            <div className="flex gap-4">
              <div className="flex gap-4">
                {/* Sales Trend Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <p className="text-xs text-muted-foreground font-medium mb-1">Sales Trend</p>
              <p className="text-3xl font-bold mb-3">50000</p>
              <div className="h-14 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path
                    d="M 0 35 L 20 25 L 40 40 L 60 20 L 80 30 L 100 15"
                    stroke="#F43F5E"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="100" cy="15" r="3" fill="#F43F5E" />
                </svg>
              </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-right">Jun 23</p>
                </Card>

                {/* Efforts Trend Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <p className="text-xs text-muted-foreground font-medium mb-1">Efforts Trend</p>
              <p className="text-3xl font-bold mb-3">93%</p>
              <div className="h-14 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path
                    d="M 0 35 Q 20 20 40 25 T 80 15 L 100 20"
                    stroke="#84CC16"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="20" r="3" fill="#84CC16" />
                </svg>
              </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-right">Jun 23</p>
                </Card>
              </div>

              <div className="flex gap-4">
                {/* Geo Fence Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl flex flex-col">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <p className="text-xs text-muted-foreground font-medium mb-1">Geo Fence</p>
              <p className="text-3xl font-bold mb-2">93%</p>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#3B82F6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="220"
                      strokeDashoffset="22"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-info" />
                  </div>
                </div>
                  </div>
                </Card>

                {/* Business Plan Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl flex flex-col">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <p className="text-xs text-muted-foreground font-medium mb-2">Business Plan</p>
              <div className="flex-1 flex items-end justify-center gap-3 pb-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-16 bg-success rounded-t-lg"></div>
                  <p className="text-[10px] font-medium text-muted-foreground">Plan</p>
                  <p className="text-xs font-semibold">1,00,000</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-20 bg-purple rounded-t-lg"></div>
                  <p className="text-[10px] font-medium text-muted-foreground">RCPA</p>
                  <p className="text-xs font-semibold">94,000</p>
                </div>
              </div>
                </Card>
              </div>
            </div>

            {/* Row 5: New Pharma Widgets - Compliance & Geo Tagging */}
            <div className="flex gap-4">
              <div className="flex gap-4">
                {/* Phyzii Compliance Card */}
                <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <p className="text-xs text-muted-foreground font-medium mb-3">Phyzii Compliance</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-destructive mb-1">50<span className="text-2xl text-muted-foreground">/100</span></p>
                      <p className="text-xs text-muted-foreground">Limit Exceeded</p>
                    </div>
                    <div className="border-l border-border pl-4 text-center">
                      <p className="text-5xl font-bold text-success mb-1">20<span className="text-2xl text-muted-foreground">/100</span></p>
                      <p className="text-xs text-muted-foreground">Near Limit</p>
                    </div>
                  </div>
                </Card>

                {/* Geo Tagging Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <p className="text-xs text-muted-foreground font-medium mb-2">Geo Tagging</p>
                  <p className="text-4xl font-bold text-center mb-2">20<span className="text-xl text-muted-foreground">/100</span></p>
                  <div className="flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          stroke="#F43F5E" 
                          strokeWidth="6" 
                          fill="none"
                          strokeDasharray="176"
                          strokeDashoffset="140"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-destructive" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Special Occasions Card */}
              <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-card border-0 rounded-2xl flex flex-col">
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                <p className="text-[10px] text-muted-foreground font-semibold mb-3 uppercase tracking-wide">Special Occasions</p>
                <div className="space-y-2.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Cake className="w-5 h-5 text-pink-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">Dr. Rama Sane</p>
                      <p className="text-[10px] text-primary font-semibold">13 July 2023</p>
                    </div>
                  </div>
                  <div className="h-px bg-border/50 my-2" />
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">Dr. Jay Mishra</p>
                      <p className="text-[10px] text-primary font-semibold">15 July 2023</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Row 6: Call Tracking Widgets */}
            <div className="flex gap-4">
              <div className="flex gap-4">
                {/* Missed Calls Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                      <PhoneOff className="w-4 h-4 text-destructive" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Missed Calls</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">VF-3</span>
                      <span className="text-xs text-muted-foreground">20/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">VF-2</span>
                      <span className="text-xs text-muted-foreground">15/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">VF-1</span>
                      <span className="text-xs text-muted-foreground">15/100</span>
                    </div>
                  </div>
                </Card>

                {/* Today's Activity Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Todays Activity</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Pending Calls</span>
                      <span className="text-xs font-semibold text-primary">04/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">NCA</span>
                      <span className="text-xs font-semibold text-muted-foreground">0/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Draft</span>
                      <span className="text-xs font-semibold text-muted-foreground">0/4</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex gap-4">
                {/* Customers Add/Drop Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-card border-0 rounded-2xl flex flex-col">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <p className="text-xs text-muted-foreground font-semibold mb-3">Customers Add/Drop</p>
                  <div className="grid grid-cols-2 gap-3 text-center flex-1">
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center justify-center mb-2">
                        <UserPlus className="w-6 h-6 text-success" />
                      </div>
                      <p className="text-3xl font-bold text-success mb-1">+2</p>
                      <p className="text-[10px] text-muted-foreground">Added</p>
                    </div>
                    <div className="border-l-2 border-border/50 flex flex-col justify-center">
                      <div className="flex items-center justify-center mb-2">
                        <UserMinus className="w-6 h-6 text-destructive" />
                      </div>
                      <p className="text-3xl font-bold text-destructive mb-1">-1</p>
                      <p className="text-[10px] text-muted-foreground">Removed</p>
                    </div>
                  </div>
                </Card>

                {/* Call Average Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <p className="text-xs text-muted-foreground font-medium mb-1">Call Average</p>
                  <div className="h-16 flex items-end mb-2">
                    <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="callGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 40 L 20 35 L 40 25 L 60 30 L 80 20 L 100 15 L 100 50 L 0 50 Z"
                        fill="url(#callGradient)"
                      />
                      <path
                        d="M 0 40 L 20 35 L 40 25 L 60 30 L 80 20 L 100 15"
                        stroke="#F43F5E"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="100" cy="15" r="4" fill="#F43F5E" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-3xl font-bold">10</p>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </Card>
              </div>
            </div>

            {/* Row 7: Coverage & Customer Breakdown */}
            <div className="flex gap-4">
              <div className="flex gap-4">
                {/* Leaderboard Widget */}
                <LeaderboardWidget />

                {/* Coverage Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <p className="text-xs text-muted-foreground font-medium mb-2">Coverage</p>
                  <div className="h-16 flex items-center justify-center mb-2">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="coverageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#A855F7" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 20 Q 10 15 20 18 Q 30 22 40 16 Q 50 10 60 14 Q 70 18 80 12 Q 90 6 100 10 L 100 40 L 0 40 Z"
                        fill="url(#coverageGradient)"
                      />
                      <path
                        d="M 0 20 Q 10 15 20 18 Q 30 22 40 16 Q 50 10 60 14 Q 70 18 80 12 Q 90 6 100 10"
                        stroke="#A855F7"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-3xl font-bold text-purple">35%</p>
                    <TrendingUp className="w-4 h-4 text-purple" />
                  </div>
                </Card>

                {/* Total Customers Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-card border-0 rounded-2xl flex flex-col">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-purple" />
                    <p className="text-xs text-muted-foreground font-semibold">Total Customers</p>
                  </div>
                  <p className="text-4xl font-bold mb-3">450</p>
                  <div className="space-y-1.5 text-[10px] flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Doctors</span>
                      <span className="font-bold text-xs">150</span>
                    </div>
                    <div className="text-muted-foreground text-[9px] pl-2">A: 50  |  B: 50  |  C: 50</div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Chemists</span>
                      <span className="font-bold text-xs">150</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Stockists</span>
                      <span className="font-bold text-xs">150</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex gap-4">
                {/* Inventory Card */}
                <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <p className="text-xs text-muted-foreground font-medium mb-3">Inventory</p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
                          <Package className="w-6 h-6 text-info" />
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-info mb-1">30</p>
                      <p className="text-xs text-muted-foreground">Samples</p>
                    </div>
                    <div className="border-l border-border pl-8 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
                          <ClipboardList className="w-6 h-6 text-teal" />
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-teal mb-1">25</p>
                      <p className="text-xs text-muted-foreground">Inputs</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Row 8: Additional MR-Relevant Widgets */}
            <div className="flex gap-4">
              <div className="flex gap-4">
                {/* Target vs Achievement Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-success" />
                    <p className="text-xs text-muted-foreground font-medium">Target vs Actual</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-muted-foreground">Monthly Target</span>
                        <span className="text-xs font-semibold">₹50L</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: "75%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-muted-foreground">Achievement</span>
                        <span className="text-xs font-semibold text-success">₹37.5L</span>
                      </div>
                      <p className="text-center text-2xl font-bold text-success">75%</p>
                    </div>
                  </div>
                </Card>

                {/* Focus Brands Card */}
                <Card 
                  className="w-[150px] h-[155px] p-3 relative shadow-lg bg-card border-0 rounded-2xl cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setIsProductFocusOpen(true)}
                >
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-3">
                    <Pill className="w-4 h-4 text-purple" />
                    <p className="text-xs text-muted-foreground font-medium">Focus Brands</p>
                  </div>
                  <div className="space-y-3">
                    {topBrands.map((brand) => (
                      <div key={brand.name} className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{brand.name}</span>
                        {isNewBrand(brand.launchDate) && (
                          <Badge className="bg-destructive text-white text-[8px] px-1.5 py-0.5 h-4 rounded">
                            NEW
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="flex gap-4">
                {/* Doctor Coverage Insights Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-card border-0 rounded-2xl flex flex-col">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5 text-teal" />
                    <p className="text-xs text-muted-foreground font-semibold">Doctor Coverage</p>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold">A-Class</span>
                        <span className="text-xs font-bold text-success">42/50</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: "84%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold">B-Class</span>
                        <span className="text-xs font-bold text-info">38/50</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-info rounded-full" style={{ width: "76%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold">C-Class</span>
                        <span className="text-xs font-bold text-accent">30/50</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Sample Distribution Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-card border-0 rounded-2xl flex flex-col">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-info" />
                    <p className="text-xs text-muted-foreground font-semibold">Sample Distribution</p>
                  </div>
                  <div className="text-center mb-3">
                    <p className="text-4xl font-bold mb-1">127</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Distributed Today</p>
                  </div>
                  <div className="space-y-1.5 text-[10px] flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Aprox</span>
                      <span className="font-bold text-xs">52</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bprox</span>
                      <span className="font-bold text-xs">45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Cprox</span>
                      <span className="font-bold text-xs">30</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Row 9: Prescription Tracking & Alerts */}
            <div className="flex gap-4">
              <div className="flex gap-4">
                {/* RCPA Tracking Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple" />
                    <p className="text-xs text-muted-foreground font-medium">RCPA Status</p>
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="35" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="35" 
                          stroke="#A855F7" 
                          strokeWidth="6" 
                          fill="none"
                          strokeDasharray="220"
                          strokeDashoffset="55"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xl font-bold text-purple">75%</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground">32/42 Pending</p>
                </Card>

                {/* Daily Call Performance Card */}
                <Card className="w-[150px] h-[155px] p-3 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-success" />
                    <p className="text-xs text-muted-foreground font-medium">Daily Calls</p>
                  </div>
                  <div className="text-center mb-2">
                    <p className="text-4xl font-bold text-success">18</p>
                    <p className="text-[10px] text-muted-foreground">Calls Completed</p>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Productive:</span>
                      <span className="font-semibold text-success">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Non-Productive:</span>
                      <span className="font-semibold text-muted-foreground">3</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex gap-4">
                {/* Territory Alerts Card */}
                <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <p className="text-xs text-muted-foreground font-medium">Territory Alerts</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-2 bg-destructive/10 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold">3 High Priority Doctors Not Met</p>
                        <p className="text-[10px] text-muted-foreground">Last visit: 45+ days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-accent/10 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold">Low Sample Stock Alert</p>
                        <p className="text-[10px] text-muted-foreground">Restock needed for 2 products</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Focus Dialog */}
      <Dialog open={isProductFocusOpen} onOpenChange={setIsProductFocusOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-purple" />
              Focus Brands
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="space-y-3">
              {focusBrands.map((brand, index) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <span className="font-medium text-sm">{brand.name}</span>
                  </div>
                  {isNewBrand(brand.launchDate) && (
                    <Badge className="bg-destructive text-white text-xs px-2 py-0.5 rounded">
                      NEW
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              {focusBrands.filter(b => isNewBrand(b.launchDate)).length} newly launched brand(s) (last 3 months)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
