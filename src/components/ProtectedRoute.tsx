
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "../contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectPath?: string;
  showToastOnRedirect?: boolean;
  adminRedirectOverride?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles, 
  redirectPath = "/login", 
  showToastOnRedirect = true,
  adminRedirectOverride
}) => {
  const { isAuthenticated, user, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-healthcare-primary"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    if (showToastOnRedirect) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
    }
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If user is admin, allow access to all routes (unrestricted access)
  // But prevent access to patient-specific routes by redirecting to admin dashboard
  if (user?.role === "admin") {
    // If this is a patient-specific route and we have an override, redirect admin to their dashboard
    if (adminRedirectOverride && location.pathname.includes('/patient-')) {
      return <Navigate to={adminRedirectOverride} replace />;
    }
    return <>{children}</>;
  }

  // For non-admin users: If specific roles are required, check if user has one of them
  if (allowedRoles && !hasRole(allowedRoles)) {
    // Simplified role-based redirection
    const redirectTo = user?.role === "patient" 
      ? "/patient-dashboard" 
      : user?.role === "doctor"
        ? "/provider-dashboard"
        : "/unauthorized";
    
    if (showToastOnRedirect) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
    
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated and has required role (if any)
  return <>{children}</>;
};

export default ProtectedRoute;
