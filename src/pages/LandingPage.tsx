
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavigationBar from "@/components/landing/NavigationBar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustBar from "@/components/landing/TrustBar";
import DemoFormSection from "@/components/landing/DemoFormSection";
import FooterSection from "@/components/landing/FooterSection";

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to their dashboard
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "doctor":
          navigate("/provider-dashboard");
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavigationBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <TrustBar />
      <DemoFormSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
