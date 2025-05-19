
import React from "react";
import { Calendar, CreditCard, MessageSquare, FileText, User, ShieldCheck, ChartBar } from "lucide-react";

const features = [
  {
    icon: <ChartBar className="h-8 w-8 text-healthcare-primary" />,
    title: "AI Appointment Optimization",
    description: "Reduce no-shows by 35% with predictive analytics that identify at-risk appointments"
  },
  {
    icon: <CreditCard className="h-8 w-8 text-healthcare-primary" />,
    title: "Integrated Billing & Coding",
    description: "Streamline claims with automated coding suggestions and real-time eligibility checks"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-healthcare-primary" />,
    title: "HIPAA-Compliant Messaging",
    description: "Secure patient-provider communication with end-to-end encryption"
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-healthcare-primary" />,
    title: "Real-Time Insurance Verification",
    description: "Instantly verify coverage and reduce claim denials before appointments"
  },
  {
    icon: <FileText className="h-8 w-8 text-healthcare-primary" />,
    title: "EHR/Lab/Pharmacy Integration",
    description: "Seamlessly connect with major EHR platforms, labs, and pharmacy systems"
  },
  {
    icon: <User className="h-8 w-8 text-healthcare-primary" />,
    title: "Patient Self-Service Portal",
    description: "Empower patients to schedule, pay, and access records 24/7"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-healthcare-primary font-semibold uppercase tracking-wider">Core Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-healthcare-dark">
            Everything You Need in One Platform
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive practice management solution combines powerful tools with intuitive design to transform your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4 group-hover:bg-healthcare-primary group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-healthcare-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
