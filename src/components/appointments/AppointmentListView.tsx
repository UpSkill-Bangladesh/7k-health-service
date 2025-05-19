
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppointmentListHeader from "./AppointmentListHeader";
import AppointmentListItem from "./AppointmentListItem";
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
  const isAdmin = user?.role !== "patient";
  
  return (
    <Card>
      <CardHeader>
        <AppointmentListHeader showExportButton={isAdmin} />
      </CardHeader>
      <CardContent>
        {myAppointments.length > 0 ? (
          <div className="space-y-4">
            {myAppointments.map((appointment) => {
              const provider = mockProviders.find(p => p.id === appointment.providerId);
              const location = mockLocations.find(l => l.id === appointment.locationId);
              const appointmentType = mockAppointmentTypes.find(t => t.id === appointment.typeId);
              
              return (
                <AppointmentListItem
                  key={appointment.id}
                  appointment={appointment}
                  provider={provider}
                  location={location}
                  appointmentType={appointmentType}
                  onReschedule={handleRescheduleAppointment}
                  onCancel={handleCancelAppointment}
                />
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
