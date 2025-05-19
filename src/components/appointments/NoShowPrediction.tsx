
import React from "react";
import { AlertTriangle, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NoShowPredictionProps {
  patientId?: string;
  upcomingAppointmentId?: string;
  className?: string;
}

const NoShowPrediction: React.FC<NoShowPredictionProps> = ({
  patientId,
  upcomingAppointmentId,
  className,
}) => {
  // In a real app, this would fetch prediction data from an API
  // This is a mock implementation for demonstration purposes
  
  // Mock prediction data
  const noShowRisk = 35; // percentage risk of no-show
  const factorsContributing = [
    { factor: "Previous no-shows", impact: 40 },
    { factor: "Appointment day (Monday)", impact: 30 },
    { factor: "Time of day (Morning)", impact: 20 },
    { factor: "Weather forecast (Rain)", impact: 10 },
  ];
  
  // Mock overbooking recommendations
  const overbookingRecommendation = noShowRisk > 30 ? "Consider overbooking by 1 patient in this time slot" : "Overbooking not recommended";

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-healthcare-primary" />
            No-Show Prediction
          </CardTitle>
          <div className={`rounded-full px-2 py-1 text-xs font-medium ${
            noShowRisk > 50 ? "bg-red-100 text-red-800" : 
            noShowRisk > 30 ? "bg-yellow-100 text-yellow-800" : 
            "bg-green-100 text-green-800"
          }`}>
            {noShowRisk}% Risk
          </div>
        </div>
        <CardDescription>
          AI-powered prediction based on historical data and contextual factors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Risk Level</h4>
            <Progress value={noShowRisk} className="h-2" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Contributing Factors</h4>
            <ul className="space-y-2">
              {factorsContributing.map((factor, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{factor.factor}</span>
                  <span className="text-muted-foreground">{factor.impact}% impact</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium mb-1">Recommendation</h4>
            <p className="text-sm flex items-start">
              <AlertTriangle className="h-4 w-4 mr-1 mt-0.5 text-yellow-500" />
              {overbookingRecommendation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoShowPrediction;
