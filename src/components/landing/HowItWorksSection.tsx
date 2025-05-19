
import React from "react";

const steps = [
  {
    number: "01",
    title: "Sign Up and Onboard Your Team",
    description: "Quick setup with guided onboarding. Import your patient data, customize your schedule, and add providers in minutes.",
  },
  {
    number: "02",
    title: "Manage Everything from One Dashboard",
    description: "Access appointments, billing, patient records, and communications from a unified, intuitive interface.",
  },
  {
    number: "03",
    title: "Optimize Care and Revenue with Smart AI Tools",
    description: "Leverage AI insights to reduce no-shows, optimize scheduling, and maximize reimbursements automatically.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-healthcare-primary font-semibold uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-healthcare-dark">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get your practice up and running with our streamlined implementation process
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-between relative">
          {/* Connector line */}
          <div className="absolute top-24 left-24 right-24 hidden lg:block">
            <div className="h-1 bg-gray-200 w-full"></div>
          </div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative z-10">
              <div className="flex flex-col items-center">
                <div className="bg-healthcare-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl text-center font-semibold mb-3 text-healthcare-dark">{step.title}</h3>
                <p className="text-center text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
