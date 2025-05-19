
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShieldCheck } from "lucide-react";

const complianceBadges = [
  {
    name: "HIPAA Compliant",
    description: "Meets all Health Insurance Portability and Accountability Act requirements for protecting patient data",
    icon: <ShieldCheck className="h-8 w-8" />,
  },
  {
    name: "HITECH Certified",
    description: "Complies with Health Information Technology for Economic and Clinical Health Act standards",
    icon: <ShieldCheck className="h-8 w-8" />,
  },
  {
    name: "SOC 2 Type II",
    description: "Audited security controls confirming secure management of customer data",
    icon: <ShieldCheck className="h-8 w-8" />,
  },
  {
    name: "PCI-DSS Compliant",
    description: "Follows Payment Card Industry Data Security Standards for secure payment processing",
    icon: <ShieldCheck className="h-8 w-8" />,
  },
  {
    name: "ONC Certified",
    description: "Meets Office of the National Coordinator for Health IT certification requirements",
    icon: <ShieldCheck className="h-8 w-8" />,
  },
];

const TrustBar: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-white border-y border-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-healthcare-dark">
            Industry-Leading Security & Compliance
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {complianceBadges.map((badge, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center cursor-help">
                    <div className="text-healthcare-primary mb-2">
                      {badge.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{badge.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
