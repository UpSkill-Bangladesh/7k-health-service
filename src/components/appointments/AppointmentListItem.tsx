
import React from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Provider } from "./ProviderSelector";
import { Location } from "./LocationSelector";
import { AppointmentType } from "./AppointmentTypeSelector";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  locationId: string;
  date: string;
  time: string;
  typeId: string;
  status: string;
  notes?: string;
}

interface AppointmentListItemProps {
  appointment: Appointment;
  provider: Provider | undefined;
  location: Location | undefined;
  appointmentType: AppointmentType | undefined;
  onReschedule: (appointmentId: string) => void;
  onCancel: (appointmentId: string) => void;
}

const AppointmentListItem: React.FC<AppointmentListItemProps> = ({
  appointment,
  provider,
  location,
  appointmentType,
  onReschedule,
  onCancel
}) => {
  return (
    <Collapsible className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="font-medium flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-healthcare-primary" />
            {appointment.date} at {appointment.time}
          </div>
          <div className="text-sm text-muted-foreground">
            {provider?.name} - {appointmentType?.name}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onReschedule(appointment.id)}
          >
            Reschedule
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500 hover:text-red-600 hover:bg-red-50" 
            onClick={() => onCancel(appointment.id)}
          >
            Cancel
          </Button>
          <CollapsibleTrigger className="p-2">
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
      </div>
      
      <CollapsibleContent className="pt-4 space-y-2">
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
          {appointment.notes && (
            <div className="col-span-2">
              <h4 className="text-sm font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AppointmentListItem;
