import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Shield, Info, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have been logged in successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Updated demo credentials to reflect new roles
  const demoCredentials = [{
    role: "Administrator",
    email: "admin@healthprovider.com"
  }, {
    role: "Doctor",
    email: "doctor@healthprovider.com"
  }, {
    role: "Patient",
    email: "patient@example.com"
  }];
  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password"); // In a real app, you wouldn't do this
  };
  return <div className="min-h-screen bg-healthcare-light flex flex-col justify-center px-4">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-healthcare-primary rounded-full mx-auto flex items-center justify-center">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-healthcare-dark">HealthCare360
        </h1>
          <p className="text-gray-600 mt-2">Healthcare Service Provider Platform</p>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
              HIPAA Compliant
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
              NY • NJ • PA
            </Badge>
          </div>
        </div>

        <Card className="shadow-lg border-t-4 border-t-healthcare-primary">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-healthcare-dark">
              Secure Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Access your secure healthcare portal
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="healthcare-input" required autoComplete="username" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-healthcare-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="healthcare-input" required autoComplete="current-password" />
              </div>
              
              <Button type="submit" className="w-full bg-healthcare-primary hover:bg-healthcare-accent text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-4 w-4 text-gray-500" />
                <p className="text-sm text-gray-500">Demo accounts:</p>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {demoCredentials.map(cred => <Button key={cred.email} variant="outline" size="sm" className="text-xs justify-start" onClick={() => handleDemoLogin(cred.email)}>
                    <span className="truncate">{cred.role}: {cred.email}</span>
                  </Button>)}
              </div>
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">Any password will work for demo purposes</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-xs text-gray-500">
            <div className="flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" />
              <p>This system is for authorized personnel only</p>
            </div>
            <p>All activity is monitored and recorded for compliance purposes</p>
            <p className="text-xs">HIPAA Compliant • Secure • {new Date().getFullYear()} © HealthProvide</p>
          </CardFooter>
        </Card>
      </div>
    </div>;
};
export default Login;