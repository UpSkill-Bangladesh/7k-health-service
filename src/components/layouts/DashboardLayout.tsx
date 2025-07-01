
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-healthcare-primary text-white"
          : "hover:bg-healthcare-light text-gray-700 hover:text-healthcare-primary"
      }`}
    >
      <div>{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define navigation based on user role
  const getNavigation = () => {
    const baseNavigation = [
      { name: "Dashboard", to: "/dashboard", icon: <FileText size={20} /> },
      { name: "Appointments", to: "/appointments", icon: <Calendar size={20} /> },
    ];

    // Add patient management link for admin users
    if (user?.role === "admin") {
      baseNavigation.push(
        { name: "Patient Management", to: "/admin/patients", icon: <Users size={20} /> }
      );
    } else if (user?.role === "doctor") {
      baseNavigation.push(
        { name: "Patients", to: "/patients", icon: <Users size={20} /> }
      );
    }

    // Add common items
    baseNavigation.push(
      { name: "Profile", to: "/profile", icon: <User size={20} /> },
      { name: "Settings", to: "/settings", icon: <Settings size={20} /> }
    );

    return baseNavigation;
  };

  const navigation = getNavigation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-all duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            {/* Logo and sidebar header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-healthcare-primary"></div>
                <span className="ml-3 text-lg font-bold text-healthcare-dark">
                  UpCare MediConnect
                </span>
              </div>
              <button
                className="md:hidden rounded-md p-1 text-gray-500 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-2 py-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <SidebarItem
                    key={item.name}
                    icon={item.icon}
                    label={item.name}
                    to={item.to}
                    active={location.pathname === item.to}
                  />
                ))}
              </div>
            </nav>
          </div>

          {/* User profile and logout */}
          <div className="border-t border-gray-200 px-4 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-healthcare-secondary flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={logout} variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 md:block hidden">
                {navigation.find((item) => item.to === location.pathname)?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 hidden sm:block">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="healthcare-container">{children}</div>
        </main>
        
        {/* HIPAA compliance footer */}
        <footer className="healthcare-hipaa-footer">
          <p>Protected by HIPAA Compliance Standards • {new Date().getFullYear()} © UpCare MediConnect</p>
        </footer>
      </div>

      {/* Backdrop overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
