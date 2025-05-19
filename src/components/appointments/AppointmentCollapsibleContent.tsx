
import React from "react";
import { Location } from "./LocationSelector";
import { AppointmentType } from "./AppointmentTypeSelector";

interface AppointmentCollapsibleContentProps {
  location: Location | undefined;
  appointmentType: AppointmentType | undefined;
  notes?: string;
}

const AppointmentCollapsibleContent: React.FC<AppointmentCollapsibleContentProps> = ({
  location,
  appointmentType,
  notes
}) => {
  return (
    <div className="pt-4 space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium">Location</h4>
          <p className="text-sm text-muted-foreground">{location?.name}</p>
          <p className="text-xs text-muted-foreground">{location?.address}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Appointment Type</h4>
          <p className="text-sm text-muted-foreground">{appointmentType?.name}</p>
          <p className="text-xs text-muted-foreground">{appointmentType?.description}</p>
        </div>
        {notes && (
          <div className="col-span-2">
            <h4 className="text-sm font-medium">Notes</h4>
            <p className="text-sm text-muted-foreground">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCollapsibleContent;
