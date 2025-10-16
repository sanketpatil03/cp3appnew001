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
  Clock,
  AlignLeft,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary/80">
      {/* Top Navigation */}
      <div className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-white/30">
            <AvatarImage src="" alt="Prakash" />
            <AvatarFallback className="bg-primary-dark text-primary-foreground">P</AvatarFallback>
          </Avatar>
          <span className="text-base font-medium">Prakash</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-9 w-9">
            <Power className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-9 w-9">
            <Mail className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-9 w-9">
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-9 w-9">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-9 w-9 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-9 w-9">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-secondary/60 backdrop-blur-sm p-3 space-y-3 min-h-[calc(100vh-56px)]">
          {/* Calendar Header */}
          <Card className="p-3 shadow-card bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm">July 2023</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Search className="w-4 h-4" />
                </Button>
                <span className="text-xs font-medium px-2 py-1 bg-muted rounded">AZ</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              04-Jul Thursday (5)
            </div>
          </Card>

          {/* Doctor List */}
          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {[
              { name: "Dr. Prakash Patil", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Austin Berg", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Jalen Tindel", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Lindsey Stack", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Cesar Amadon", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
            ].map((doctor, idx) => (
              <Card key={idx} className="p-3 hover:shadow-lg transition-all bg-white/95 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {doctor.name.split(" ").slice(1).map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm leading-tight">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{doctor.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-5 h-5 rounded border border-border bg-muted/30" />
                    ))}
                  </div>
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
              </Card>
            ))}

            <Button className="w-full bg-primary/80 hover:bg-primary text-primary-foreground" variant="default" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              05-Jul Friday (2)
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[1400px]">
            {/* Reminder Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <AlignLeft className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Reminder</p>
                  <p className="text-4xl font-bold leading-none mt-1">03</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="border-l-2 border-accent pl-3">
                  <p className="font-medium text-sm leading-tight">Secondary Sales Pending</p>
                  <p className="text-xs text-muted-foreground mt-0.5">14 July 2023</p>
                </div>
                <div className="border-l-2 border-accent pl-3">
                  <p className="font-medium text-sm leading-tight">Create MTP : July 23</p>
                  <p className="text-xs text-muted-foreground mt-0.5">25 July 2023</p>
                </div>
              </div>
            </Card>

            {/* Action Points Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-destructive rounded-full" />
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-purple/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Action Points</p>
                  <p className="text-4xl font-bold leading-none mt-1">03</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="border-l-2 border-purple pl-3">
                  <p className="font-medium text-sm leading-tight">Study Material for Aprox</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Dr. Austin Berg</p>
                </div>
                <div className="border-l-2 border-purple pl-3">
                  <p className="font-medium text-sm leading-tight">Conduct & Event for Bprox</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Dr. Jalen Tindel</p>
                </div>
                <div className="border-l-2 border-purple pl-3">
                  <p className="font-medium text-sm leading-tight">Study Material for Cprox</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Dr. Cesar Amadon</p>
                </div>
              </div>
            </Card>

            {/* Events Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-success rounded-full" />
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Events</p>
                  <p className="text-4xl font-bold leading-none mt-1">10</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="border-l-2 border-success pl-3">
                  <p className="font-medium text-sm leading-tight">Doctor Meet</p>
                  <p className="text-xs text-muted-foreground mt-0.5">15 July 2023</p>
                </div>
                <div className="border-l-2 border-success pl-3">
                  <p className="font-medium text-sm leading-tight">Annual Celebration</p>
                  <p className="text-xs text-muted-foreground mt-0.5">16 July 2023</p>
                </div>
                <div className="border-l-2 border-success pl-3">
                  <p className="font-medium text-sm leading-tight">Aprox Camp</p>
                  <p className="text-xs text-muted-foreground mt-0.5">07 August 2023</p>
                </div>
              </div>
            </Card>

            {/* Leaves & Holidays Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Leaves & Holidays</p>
                  <p className="text-4xl font-bold leading-none mt-1">03</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="border-l-2 border-teal pl-3">
                  <p className="font-medium text-sm leading-tight">Independence Day</p>
                  <p className="text-xs text-muted-foreground mt-0.5">15 August 2024 - Thu</p>
                </div>
                <div className="border-l-2 border-teal pl-3">
                  <p className="font-medium text-sm leading-tight">Casual Leave</p>
                  <p className="text-xs text-muted-foreground mt-0.5">3 September 2024 - Thu</p>
                </div>
                <div className="border-l-2 border-teal pl-3">
                  <p className="font-medium text-sm leading-tight">Gandhi Jayanti</p>
                  <p className="text-xs text-muted-foreground mt-0.5">2 October 2024 - Wed</p>
                </div>
              </div>
            </Card>

            {/* Approval Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Approval</p>
                  <p className="text-4xl font-bold leading-none mt-1">05</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="border-l-2 border-info pl-3">
                  <p className="font-medium text-sm leading-tight">Mtp for June 2023</p>
                  <p className="text-xs text-success mt-0.5">Approved by Final Approval</p>
                </div>
                <div className="border-l-2 border-info pl-3">
                  <p className="font-medium text-sm leading-tight">Expense for June 2023</p>
                  <p className="text-xs text-destructive mt-0.5">Rejected by admin</p>
                </div>
                <div className="border-l-2 border-info pl-3">
                  <p className="font-medium text-sm leading-tight">Request for CME</p>
                  <p className="text-xs text-destructive mt-0.5">Rejected by admin</p>
                </div>
              </div>
            </Card>

            {/* Sync Status Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="mb-3">
                <p className="text-xs text-muted-foreground font-medium">Sync Status</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-lg font-bold mb-0.5">15 Days ago</p>
                  <p className="text-xs text-muted-foreground">50 Records Pending</p>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-semibold mb-1">Last Upload</p>
                    <p className="text-sm font-medium">06 July 2023</p>
                    <p className="text-xs text-muted-foreground">11:30 AM</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold mb-0.5">10 Days ago</p>
                  <p className="text-xs text-muted-foreground">01 Records Pending</p>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-semibold mb-1">Last Download</p>
                    <p className="text-sm font-medium">06 July 2023</p>
                    <p className="text-xs text-muted-foreground">11:30 AM</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sales Trend Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <p className="text-xs text-muted-foreground font-medium mb-1">Sales Trend</p>
              <p className="text-4xl font-bold mb-4">50000</p>
              <div className="h-20 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                  <path
                    d="M 0 40 L 20 30 L 40 45 L 60 25 L 80 35 L 100 20"
                    stroke="#F43F5E"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-right">Jun 23</p>
            </Card>

            {/* Efforts Trend Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <p className="text-xs text-muted-foreground font-medium mb-1">Efforts Trend</p>
              <p className="text-4xl font-bold mb-4">93%</p>
              <div className="h-20 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                  <path
                    d="M 0 40 Q 20 25 40 30 T 80 20 L 100 25"
                    stroke="#22C55E"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-right">Jun 23</p>
            </Card>

            {/* Geo Fence Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl flex flex-col items-center">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <div className="w-full">
                <p className="text-xs text-muted-foreground font-medium mb-1">Geo Fence</p>
                <p className="text-4xl font-bold mb-4">93%</p>
              </div>
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="#3B82F6"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="264"
                    strokeDashoffset="26"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </Card>

            {/* Business Plan Card */}
            <Card className="p-4 relative shadow-widget bg-white rounded-2xl">
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full" />
              <p className="text-xs text-muted-foreground font-medium mb-1">Business Plan</p>
              <p className="text-2xl font-bold mb-4">1,00,000</p>
              <div className="flex gap-4 items-end justify-center h-24">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-success/20 rounded-t-lg flex flex-col justify-end" style={{ height: '80px' }}>
                    <div className="bg-success w-full rounded-t-lg" style={{ height: '64px' }} />
                  </div>
                  <p className="text-xs font-medium mt-2">Plan</p>
                  <p className="text-sm font-semibold">94,000</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-purple/20 rounded-t-lg flex flex-col justify-end" style={{ height: '80px' }}>
                    <div className="bg-purple w-full rounded-t-lg" style={{ height: '56px' }} />
                  </div>
                  <p className="text-xs font-medium mt-2">RCPA</p>
                  <p className="text-sm font-semibold">-</p>
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
