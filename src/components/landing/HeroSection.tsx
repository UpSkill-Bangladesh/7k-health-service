
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleDemoRequest = () => {
    // Scroll to demo form
    document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <div className="mb-6 inline-block animate-fade-in">
              <div className="flex items-center gap-2 bg-blue-50 text-healthcare-primary px-4 py-2 rounded-full border border-blue-200">
                <Shield size={16} className="text-healthcare-accent" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthcare-dark leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-healthcare-accent via-healthcare-primary to-teal-500">
              Smarter Healthcare Operations Start Here
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              An AI-powered Practice Management System for modern clinics in NY, NJ & PA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDemoRequest}
                size="lg" 
                className="bg-gradient-to-r from-healthcare-primary to-healthcare-accent hover:from-healthcare-accent hover:to-healthcare-primary shadow-lg hover:shadow-xl transition-all duration-300 text-white px-8"
              >
                Request a Free Demo
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
                className="border-healthcare-primary text-healthcare-primary hover:bg-blue-50 shadow-md hover:shadow-lg transition-all"
              >
                Login to Your Account
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-20 h-20 bg-indigo-100 rounded-full opacity-30"></div>
              <img 
                src="/hero-dashboard.svg" 
                alt="HealthProvide Dashboard" 
                className="relative z-10 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] border border-white bg-white transform hover:scale-[1.02] transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
