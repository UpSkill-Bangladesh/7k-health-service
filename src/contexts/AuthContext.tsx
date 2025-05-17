
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "admin" | "frontOffice" | "backOffice" | "clinicalStaff" | "patient";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  facilityId?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes - in a real app, this would be authenticated against a backend
const mockUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin@healthprovider.com", role: "admin" },
  { id: "2", name: "Front Office Staff", email: "frontoffice@healthprovider.com", role: "frontOffice" },
  { id: "3", name: "Back Office Staff", email: "backoffice@healthprovider.com", role: "backOffice" },
  { id: "4", name: "Dr. Smith", email: "doctor@healthprovider.com", role: "clinicalStaff" },
  { id: "5", name: "John Patient", email: "patient@example.com", role: "patient" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("healthcareUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      // In a real app, we would validate the password here
      // For demo purposes, we'll accept any password
      
      setUser(foundUser);
      localStorage.setItem("healthcareUser", JSON.stringify(foundUser));
      
      // Redirect based on role
      if (foundUser.role === "patient") {
        navigate("/patient-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("healthcareUser");
    navigate("/login");
  };

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
