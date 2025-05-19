
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface AppointmentListViewProps {
  myAppointments: Appointment[];
  mockProviders: Provider[];
  mockLocations: Location[];
  mockAppointmentTypes: AppointmentType[];
  handleRescheduleAppointment: (appointmentId: string) => void;
  handleCancelAppointment: (appointmentId: string) => void;
  user?: { role?: string };
}

const AppointmentListView: React.FC<AppointmentListViewProps> = ({
  myAppointments,
  mockProviders,
  mockLocations,
  mockAppointmentTypes,
  handleRescheduleAppointment,
  handleCancelAppointment,
  user
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>View and manage your scheduled appointments</CardDescription>
        </div>
        
        {user?.role !== "patient" && (
          <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
            Export Schedule
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {myAppointments.length > 0 ? (
          <div className="space-y-4">
            {myAppointments.map((appointment) => {
              const provider = mockProviders.find(p => p.id === appointment.providerId);
              const location = mockLocations.find(l => l.id === appointment.locationId);
              const appointmentType = mockAppointmentTypes.find(t => t.id === appointment.typeId);
              
              return (
                <Collapsible key={appointment.id} className="border rounded-lg p-4">
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
                        onClick={() => handleRescheduleAppointment(appointment.id)}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50" 
                        onClick={() => handleCancelAppointment(appointment.id)}
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
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">
            No upcoming appointments scheduled. Use the Calendar View to book a new appointment.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentListView;
