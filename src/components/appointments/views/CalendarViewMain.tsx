
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import AppointmentCalendar from "../AppointmentCalendar";
import AppointmentBookingDialog from "./AppointmentBookingDialog";
import { Provider } from "../ProviderSelector";
import { Location } from "../LocationSelector";
import { AppointmentType } from "../AppointmentTypeSelector";
import { UserRole } from "@/contexts/AuthContext";

interface CalendarViewMainProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  selectedProvider: string;
  selectedLocation: string;
  selectedAppointmentType: string;
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
  calendarView: 'day' | 'week' | 'month';
  providers: Provider[];
  locations: Location[];
  appointmentTypes: AppointmentType[];
  userRole?: UserRole;
}

const CalendarViewMain: React.FC<CalendarViewMainProps> = ({
  selectedDate,
  onSelectDate,
  selectedProvider,
  selectedLocation,
  selectedAppointmentType,
  selectedTimeSlot,
  setSelectedTimeSlot,
  appointmentNotes,
  setAppointmentNotes,
  appointmentReminder,
  setAppointmentReminder,
  dialogOpen,
  setDialogOpen,
  handleBookAppointment,
  getDisabledDays,
  getAvailableTimeSlots,
  calendarView,
  providers,
  locations,
  appointmentTypes,
  userRole
}) => {
  const isDoctor = userRole === "doctor";
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-healthcare-primary" />
          {userRole === "admin" ? "Appointment Calendar" : 
           isDoctor ? "Your Schedule" : 
           "Available Time Slots"}
        </CardTitle>
        <CardDescription>
          {selectedProvider 
            ? `Select a date to see available times with ${providers.find(p => p.id === selectedProvider)?.name}` 
            : "Please select a provider first"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AppointmentCalendar 
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          disabled={getDisabledDays()}
          view={calendarView}
        />
      </CardContent>
      <CardFooter>
        <AppointmentBookingDialog
          selectedProvider={selectedProvider}
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
          selectedAppointmentType={selectedAppointmentType}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          appointmentNotes={appointmentNotes}
          setAppointmentNotes={setAppointmentNotes}
          appointmentReminder={appointmentReminder}
          setAppointmentReminder={setAppointmentReminder}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          handleBookAppointment={handleBookAppointment}
          getAvailableTimeSlots={getAvailableTimeSlots}
          providers={providers}
          locations={locations}
          userRole={userRole}
        />
      </CardFooter>
    </Card>
  );
};

export default CalendarViewMain;
