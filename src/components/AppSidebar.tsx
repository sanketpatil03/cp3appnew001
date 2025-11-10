import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  Users, 
  Presentation, 
  ClipboardCheck,
  Plus,
  LogOut,
  Palette,
  ChevronDown,
  CalendarDays
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Reports", url: "/my-reports", icon: FileText },
  { title: "Action Point View", url: "/action-point-view", icon: Target },
  { title: "Monthly RCPA", url: "/monthly-rcpa", icon: ClipboardList },
  { title: "Doctor Sales Planning", url: "/doctor-sales-planning", icon: Users },
  { 
    title: "Planning", 
    url: "/planning", 
    icon: Calendar,
    hasSubmenu: true,
    submenu: []
  },
  { title: "Doctor Feedback", url: "/doctor-feedback", icon: MessageSquare },
  { title: "RHS Detailing", url: "/rhs-detailing", icon: Presentation },
  { 
    title: "Survey", 
    url: "/survey", 
    icon: ClipboardCheck,
    hasSubmenu: true,
    submenu: []
  },
  { title: "Event", url: "/event", icon: Calendar },
  { title: "Day Check Out", url: "/day-check-out", icon: ClipboardList },
  { 
    title: "Customer Addition", 
    url: "/customer-addition", 
    icon: Plus,
    hasSubmenu: true,
    submenu: []
  },
  { title: "Leave", url: "/leave", icon: CalendarDays },
  { title: "Pop-up Designs", url: "/popup-designs", icon: Palette },
];

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[320px] p-0 flex flex-col">
        {/* User Profile Section */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 flex items-center gap-3">
          <Avatar className="w-14 h-14 border-2 border-white/40">
            <AvatarImage src="" alt="Prakash" />
            <AvatarFallback className="bg-primary-dark text-primary-foreground font-semibold text-lg">
              P
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-semibold text-lg">Prakash</p>
            <p className="text-white/80 text-sm">Sales Representative</p>
          </div>
        </div>

        {/* Menu Items - Scrollable */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              if (item.hasSubmenu) {
                return (
                  <Collapsible
                    key={item.title}
                    open={openMenus.includes(item.title)}
                    onOpenChange={() => toggleSubmenu(item.title)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="flex-1 text-left text-sm font-medium">
                          {item.title}
                        </span>
                        <ChevronDown 
                          className={`w-4 h-4 text-muted-foreground transition-transform ${
                            openMenus.includes(item.title) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-11 pr-3">
                      {item.submenu?.map((subItem) => (
                        <NavLink
                          key={subItem}
                          to="#"
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {subItem}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <NavLink
                  key={item.title}
                  to={item.url}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive(item.url)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Button - Fixed at Bottom */}
        <div className="p-4 border-t border-border">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => {
              // Handle logout logic here
              console.log("Logging out...");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            LOGOUT
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
