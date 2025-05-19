
import React from "react";
import { 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  CheckCircle, 
  RefreshCw, 
  UserCircle
} from "lucide-react";

const featureItems = [
  {
    icon: <Calendar className="h-10 w-10 mb-4 text-blue-500" />,
    title: "AI Appointment Optimization",
    description: "Smart scheduling with no-show predictions to maximize your clinic's efficiency.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    shadowColor: "shadow-blue-100"
  },
  {
    icon: <CreditCard className="h-10 w-10 mb-4 text-green-500" />,
    title: "Integrated Billing & Coding",
    description: "Streamlined billing workflows with automatic coding suggestions and compliance checks.",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    shadowColor: "shadow-green-100"
  },
  {
    icon: <MessageSquare className="h-10 w-10 mb-4 text-purple-500" />,
    title: "HIPAA-Compliant Messaging",
    description: "Secure communication between providers, staff, and patients.",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    shadowColor: "shadow-purple-100"
  },
  {
    icon: <CheckCircle className="h-10 w-10 mb-4 text-indigo-500" />,
    title: "Real-Time Insurance Verification",
    description: "Verify patient insurance eligibility in seconds, not minutes.",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    shadowColor: "shadow-indigo-100"
  },
  {
    icon: <RefreshCw className="h-10 w-10 mb-4 text-amber-500" />,
    title: "EHR/Lab/Pharmacy Integration",
    description: "Seamlessly connect with all your existing healthcare systems.",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    shadowColor: "shadow-amber-100"
  },
  {
    icon: <UserCircle className="h-10 w-10 mb-4 text-teal-500" />,
    title: "Patient Self-Service Portal",
    description: "Empower patients with online scheduling, bill pay, and record access.",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    shadowColor: "shadow-teal-100"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-healthcare-dark">
            Powerful Features for Modern Practice Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to run a successful healthcare practice, all in one platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index}
              className={`p-8 rounded-2xl border ${feature.borderColor} ${feature.bgColor} ${feature.shadowColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
