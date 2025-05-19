
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AppointmentHistoryView: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment History</CardTitle>
        <CardDescription>View your past appointments</CardDescription>
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
