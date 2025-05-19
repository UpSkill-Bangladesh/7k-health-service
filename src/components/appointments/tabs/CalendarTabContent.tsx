
import React from "react";
import AppointmentCalendarView from "@/components/appointments/AppointmentCalendarView";
import NoShowPrediction from "@/components/appointments/NoShowPrediction";
import { Provider } from "@/components/appointments/ProviderSelector";
import { Location } from "@/components/appointments/LocationSelector";
import { AppointmentType } from "@/components/appointments/AppointmentTypeSelector";
import { Patient } from "@/components/appointments/PatientSelector";

interface CalendarTabContentProps {
  mockProviders: Provider[];
  mockLocations: Location[];
  mockAppointmentTypes: AppointmentType[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedAppointmentType: string;
  setSelectedAppointmentType: (type: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (timeSlot: string) => void;
  appointmentNotes: string;
  setAppointmentNotes: (notes: string) => void;
  appointmentReminder: string;
  setAppointmentReminder: (reminder: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  handleBookAppointment: () => void;
  getDisabledDays: () => (date: Date) => boolean;
  getAvailableTimeSlots: () => string[];
  setCalendarIntegrationOpen: (open: boolean) => void;
  user: any;
  selectedPatient?: Patient | null;
}

const CalendarTabContent: React.FC<CalendarTabContentProps> = (props) => {
  const { user, mockProviders, mockLocations, mockAppointmentTypes } = props;
  const isAdminOrDoctor = user?.role === "admin" || user?.role === "doctor";
  
  // Ensure data arrays are defined
  const safeProviders = Array.isArray(mockProviders) ? mockProviders : [];
  const safeLocations = Array.isArray(mockLocations) ? mockLocations : [];
  const safeAppointmentTypes = Array.isArray(mockAppointmentTypes) ? mockAppointmentTypes : [];

  // Log for debugging
  console.log('CalendarTabContent props:', {
    providers: safeProviders,
    locations: safeLocations,
    appointmentTypes: safeAppointmentTypes
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <AppointmentCalendarView 
          {...props}
          mockProviders={safeProviders}
          mockLocations={safeLocations}
          mockAppointmentTypes={safeAppointmentTypes}
        />
      </div>
      {isAdminOrDoctor && (
        <div className="lg:col-span-1">
          <NoShowPrediction />
        </div>
      )}
    </div>
  );
};

export default CalendarTabContent;
