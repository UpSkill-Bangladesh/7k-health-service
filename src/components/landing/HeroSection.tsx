
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
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <div className="mb-6 inline-block">
              <div className="flex items-center gap-2 bg-blue-50 text-healthcare-primary px-4 py-2 rounded-full">
                <Shield size={16} />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthcare-dark leading-tight mb-4">
              Smarter Healthcare Operations Start Here
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              An AI-powered Practice Management System for modern clinics in NY, NJ & PA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDemoRequest}
                size="lg" 
                className="bg-healthcare-primary hover:bg-healthcare-accent px-8"
              >
                Request a Free Demo
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
                className="border-healthcare-primary text-healthcare-primary hover:bg-blue-50"
              >
                Login to Your Account
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
              <img 
                src="/hero-dashboard.svg" 
                alt="HealthProvide Dashboard" 
                className="relative z-10 rounded-xl shadow-2xl border border-gray-100 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
