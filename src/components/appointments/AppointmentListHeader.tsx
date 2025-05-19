
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AppointmentListHeaderProps {
  showExportButton: boolean;
}

const AppointmentListHeader: React.FC<AppointmentListHeaderProps> = ({ showExportButton }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>View and manage your scheduled appointments</CardDescription>
      </div>
      
      {showExportButton && (
        <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
          Export Schedule
        </Button>
      )}
    </div>
  );
};

export default AppointmentListHeader;
