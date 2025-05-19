
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const AppointmentHistoryView: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment History</CardTitle>
        <CardDescription>
          {user?.role === "patient" 
            ? "View your past appointments" 
            : user?.role === "doctor"
              ? "View your patients' past appointments"
              : "View all past appointments"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-10">
          No past appointments found in the system.
        </p>
      </CardContent>
    </Card>
  );
};

export default AppointmentHistoryView;
