import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp,
  TrendingDown,
  Users,
  Package,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="" alt="Prakash" />
            <AvatarFallback className="bg-primary-dark text-primary-foreground">P</AvatarFallback>
          </Avatar>
          <span className="text-lg font-medium">Prakash</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-dark">
            <Power className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-dark">
            <Mail className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-dark">
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-dark">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-dark relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-dark">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-secondary/30 border-r border-border p-4 space-y-4">
          {/* Calendar Header */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">July 2023</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">AZ</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              04-Jul Thursday (5)
            </div>
          </Card>

          {/* Doctor List */}
          <div className="space-y-2 overflow-y-auto max-h-[600px]">
            {[
              { name: "Dr. Prakash Patil", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Austin Berg", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Jalen Tindel", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Lindsey Stack", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
              { name: "Dr. Cesar Amadon", specialty: "Dentist - A/VF-1", time: "10:04 AM" },
            ].map((doctor, idx) => (
              <Card key={idx} className="p-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {doctor.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{doctor.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-6 h-6 rounded border border-border bg-muted/50" />
                    ))}
                  </div>
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            ))}

            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              05-Jul Friday (2)
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Reminder Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reminder</p>
                  <p className="text-3xl font-bold">03</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Secondary Sales Pending</p>
                  <p className="text-xs text-muted-foreground">14 July 2023</p>
                </div>
                <div>
                  <p className="font-medium">Create MTP : July 23</p>
                  <p className="text-xs text-muted-foreground">25 July 2023</p>
                </div>
              </div>
            </Card>

            {/* Action Points Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-destructive rounded-full" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Action Points</p>
                  <p className="text-3xl font-bold">03</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Study Material for Aprox</p>
                  <p className="text-xs text-muted-foreground">Dr. Austin Berg</p>
                </div>
                <div>
                  <p className="font-medium">Conduct & Event for Bprox</p>
                  <p className="text-xs text-muted-foreground">Dr. Jalen Tindel</p>
                </div>
              </div>
            </Card>

            {/* Events Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-success rounded-full" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Events</p>
                  <p className="text-3xl font-bold">10</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Doctor Meet</p>
                  <p className="text-xs text-muted-foreground">15 July 2023</p>
                </div>
                <div>
                  <p className="font-medium">Annual Celebration</p>
                  <p className="text-xs text-muted-foreground">16 July 2023</p>
                </div>
              </div>
            </Card>

            {/* Leaves & Holidays Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leaves & Holidays</p>
                  <p className="text-3xl font-bold">03</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Independence Day</p>
                  <p className="text-xs text-muted-foreground">15 August 2024 - Thu</p>
                </div>
                <div>
                  <p className="font-medium">Gandhi Jayanti</p>
                  <p className="text-xs text-muted-foreground">2 October 2024 - Wed</p>
                </div>
              </div>
            </Card>

            {/* Approval Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approval</p>
                  <p className="text-3xl font-bold">05</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Mtp for June 2023</p>
                  <p className="text-xs text-success">Approved by Final Approval</p>
                </div>
                <div>
                  <p className="font-medium">Request for CME</p>
                  <p className="text-xs text-destructive">Rejected by admin</p>
                </div>
              </div>
            </Card>

            {/* Sync Status Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Sync Status</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">15 Days ago</p>
                  <p className="text-xs text-muted-foreground">50 Records Pending</p>
                  <p className="text-sm font-medium mt-3">Last Upload</p>
                  <p className="text-xs">06 July 2023</p>
                  <p className="text-xs text-muted-foreground">11:30 AM</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">10 Days ago</p>
                  <p className="text-xs text-muted-foreground">01 Records Pending</p>
                  <p className="text-sm font-medium mt-3">Last Download</p>
                  <p className="text-xs">06 July 2023</p>
                  <p className="text-xs text-muted-foreground">11:30 AM</p>
                </div>
              </div>
            </Card>

            {/* Sales Trend Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <p className="text-sm text-muted-foreground mb-2">Sales Trend</p>
              <p className="text-4xl font-bold mb-4">50000</p>
              <div className="h-16 flex items-end gap-1">
                <div className="flex-1 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t" style={{ height: "60%" }} />
                <div className="flex-1 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t" style={{ height: "40%" }} />
                <div className="flex-1 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t" style={{ height: "80%" }} />
                <div className="flex-1 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t" style={{ height: "50%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Jun 23</p>
            </Card>

            {/* Efforts Trend Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <p className="text-sm text-muted-foreground mb-2">Efforts Trend</p>
              <p className="text-4xl font-bold mb-4">93%</p>
              <div className="h-16 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 40">
                  <path
                    d="M 0 30 Q 25 20 50 25 T 100 15"
                    stroke="currentColor"
                    className="text-success"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Jun 23</p>
            </Card>

            {/* Geo Fence Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <p className="text-sm text-muted-foreground mb-2">Geo Fence</p>
              <p className="text-4xl font-bold mb-4">93%</p>
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    className="text-muted"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251"
                    strokeDashoffset="25"
                  />
                </svg>
              </div>
            </Card>

            {/* Business Plan Card */}
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
              <p className="text-sm text-muted-foreground mb-2">Business Plan</p>
              <p className="text-2xl font-bold mb-4">1,00,000</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="h-20 bg-success/20 rounded-t flex flex-col justify-end">
                    <div className="bg-success h-16 rounded-t" />
                  </div>
                  <p className="text-xs text-center mt-1">Plan</p>
                  <p className="text-sm font-medium text-center">94,000</p>
                </div>
                <div className="flex-1">
                  <div className="h-20 bg-purple-200 rounded-t flex flex-col justify-end">
                    <div className="bg-purple-500 h-14 rounded-t" />
                  </div>
                  <p className="text-xs text-center mt-1">RCPA</p>
                  <p className="text-sm font-medium text-center">-</p>
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
