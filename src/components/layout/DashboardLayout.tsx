
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  User,
  Calendar,
  MessageSquare,
  Bell,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layout as LayoutIcon,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, text, to, isActive, isCollapsed }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-mentor-primary text-white" 
          : "text-gray-700 hover:bg-mentor-light"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && <span className="text-sm">{text}</span>}
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType?: 'mentor' | 'mentee';
}

export function DashboardLayout({ children, userType = 'mentee' }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const mentorItems = [
    { icon: <Home size={20} />, text: "Dashboard", to: "/dashboard" },
    { icon: <Calendar size={20} />, text: "Schedule", to: "/schedule" },
    { icon: <User size={20} />, text: "Mentees", to: "/mentees" },
    { icon: <MessageSquare size={20} />, text: "Messages", to: "/messages" },
    { icon: <Bell size={20} />, text: "Notifications", to: "/notifications" },
    { icon: <Settings size={20} />, text: "Settings", to: "/settings" },
  ];

  const menteeItems = [
    { icon: <Home size={20} />, text: "Dashboard", to: "/dashboard" },
    { icon: <Search size={20} />, text: "Find Mentors", to: "/discover" },
    { icon: <Calendar size={20} />, text: "My Sessions", to: "/sessions" },
    { icon: <MessageSquare size={20} />, text: "Messages", to: "/messages" },
    { icon: <Bell size={20} />, text: "Notifications", to: "/notifications" },
    { icon: <Settings size={20} />, text: "Settings", to: "/settings" },
  ];

  const items = userType === 'mentor' ? mentorItems : menteeItems;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "border-r border-gray-200 bg-white transition-all duration-300 flex flex-col",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-mentor-primary to-mentor-secondary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-gray-900">Elevate</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="mx-auto h-8 w-8 bg-gradient-to-r from-mentor-primary to-mentor-secondary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <div className="py-4 flex-1 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {items.map((item) => (
              <SidebarItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                to={item.to}
                isActive={currentPath === item.to}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-mentor-secondary flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {userType === 'mentor' ? 'John Mentor' : 'Jane Mentee'}
                </p>
                <p className="text-xs text-gray-500">{userType === 'mentor' ? 'Mentor' : 'Mentee'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
