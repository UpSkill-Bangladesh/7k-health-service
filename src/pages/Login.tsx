
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Sample credentials for demo
  const demoCredentials = [
    { role: "Administrator", email: "admin@healthprovider.com" },
    { role: "Front Office", email: "frontoffice@healthprovider.com" },
    { role: "Back Office", email: "backoffice@healthprovider.com" },
    { role: "Doctor", email: "doctor@healthprovider.com" },
    { role: "Patient", email: "patient@example.com" },
  ];

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password"); // In a real app, you wouldn't do this
  };

  return (
    <div className="min-h-screen bg-healthcare-light flex flex-col justify-center">
      <div className="healthcare-container max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-healthcare-primary rounded-full mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mt-4 text-healthcare-dark">HealthProvide</h1>
          <p className="text-gray-600 mt-2">Healthcare Service Provider Platform</p>
        </div>

        <div className="healthcare-card bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-healthcare-dark">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="healthcare-input"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-healthcare-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="healthcare-input"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-healthcare-primary hover:bg-healthcare-accent text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4 text-center">For demo purposes, choose one of these users:</p>
            
            <div className="grid grid-cols-1 gap-2">
              {demoCredentials.map((cred) => (
                <Button 
                  key={cred.email} 
                  variant="outline" 
                  size="sm"
                  className="text-xs justify-start"
                  onClick={() => handleDemoLogin(cred.email)}
                >
                  <span className="truncate">{cred.role}: {cred.email}</span>
                </Button>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">Any password will work for demo purposes</p>
            </div>
          </div>
        </div>

        <div className="healthcare-hipaa-footer mt-6">
          <p className="text-xs text-gray-500 text-center">
            HIPAA Compliant • Secure • {new Date().getFullYear()} © HealthProvide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
