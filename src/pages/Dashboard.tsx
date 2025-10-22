import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";

const Dashboard = () => {
  const customers = [
    { name: "Dr. Prakash Patil", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Austin Berg", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Jalen Tindel", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Lindsey Stack", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
    { name: "Dr. Cesar Amadon", specialty: "Dentist - A/VF-1", time: "10:04 AM", status: ["s", "c", "i", "r", "p"] },
  ];

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

      <div className="flex">
        {/* Left Panel - Calendar View */}
        <div className="w-[374px] bg-gradient-to-br from-primary to-secondary p-4 space-y-3 min-h-[calc(100vh-64px)] overflow-y-auto">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-white" />
              <ChevronLeft className="w-5 h-5 text-white cursor-pointer hover:opacity-80" />
              <span className="font-semibold text-white text-base">July 2023</span>
              <ChevronRight className="w-5 h-5 text-white cursor-pointer hover:opacity-80" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                <Search className="w-5 h-5" />
              </Button>
              <div className="bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-md backdrop-blur-sm">
                AZ
              </div>
            </div>
          </div>

          {/* Date Strip */}
          <div className="bg-primary-dark/40 backdrop-blur-sm rounded-lg px-4 py-2.5 flex items-center justify-between">
            <span className="text-white font-medium text-sm">04-Jul, Thursday (5)</span>
            <Button size="icon" className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white border-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Customer Cards */}
          <div className="space-y-2">
            {customers.map((customer, idx) => (
              <Card key={idx} className="w-[330px] h-[75px] p-3 bg-white/95 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center gap-2.5 flex-1">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src="" alt={customer.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary text-sm font-semibold">
                        {customer.name.split(" ").slice(1).map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight text-foreground truncate">{customer.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{customer.specialty}</p>
                      <div className="flex gap-1 mt-1.5">
                        {customer.status.map((s, i) => (
                          <div key={i} className="w-5 h-5 rounded border border-border bg-muted/50 flex items-center justify-center text-[9px] font-medium text-muted-foreground">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 ml-2">
                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{customer.time}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-primary font-medium">Andheri</span>
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Next Date - Collapsible */}
          <div className="bg-primary-dark/40 backdrop-blur-sm rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-primary-dark/50 transition-colors">
            <span className="text-white font-medium text-sm">05-Jul, Friday (2)</span>
            <Button size="icon" className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white border-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Locked Dates */}
          {lockedDates.slice(1).map((date, idx) => (
            <div key={idx} className="bg-primary-dark/30 backdrop-blur-sm rounded-lg px-4 py-2.5 flex items-center justify-between opacity-60">
              <span className="text-white font-medium text-sm">{date}</span>
              <Lock className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>

        {/* Right Panel - Widgets */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 max-w-[660px]">
            {/* Row 1: Large Widgets */}
            {/* Reminder Card */}
            <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <AlignLeft className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Reminder</p>
                  <p className="text-3xl font-bold leading-none mt-0.5">03</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="border-l-2 border-accent pl-2.5">
                  <p className="font-medium text-xs leading-tight">Secondary Sales Pending</p>
                  <p className="text-[10px] text-muted-foreground">14 July 2023</p>
                </div>
                <div className="border-l-2 border-accent pl-2.5">
                  <p className="font-medium text-xs leading-tight">Create MTP : July 23</p>
                  <p className="text-[10px] text-muted-foreground">25 July 2023</p>
                </div>
              </div>
            </Card>

            {/* Action Points Card */}
            <Card className="w-[315px] h-[155px] p-4 relative shadow-lg bg-white border-0 rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-destructive rounded-full" />
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-purple" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Action Points</p>
                  <p className="text-3xl font-bold leading-none mt-0.5">03</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="border-l-2 border-purple pl-2.5">
                  <p className="font-medium text-xs leading-tight">Study Material for Aprox</p>
                  <p className="text-[10px] text-muted-foreground">Dr. Austin Berg</p>
                </div>
                <div className="border-l-2 border-purple pl-2.5">
                  <p className="font-medium text-xs leading-tight">Conduct & Event for Bprox</p>
                  <p className="text-[10px] text-muted-foreground">Dr. Jalen Tindel</p>
                </div>
              </div>
            </Card>

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

            {/* Row 2: Small Widgets */}
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
      </div>
    </div>
  );
};

export default Dashboard;
