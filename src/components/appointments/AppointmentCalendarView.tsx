
import React, { useState, useEffect } from "react";
import CalendarViewHeader from "./views/CalendarViewHeader";
import AppointmentSidebar from "./views/AppointmentSidebar";
import CalendarViewMain from "./views/CalendarViewMain";
import { Provider } from "./ProviderSelector";
import { Location } from "./LocationSelector";
import { AppointmentType } from "./AppointmentTypeSelector";
import { UserRole } from "@/contexts/AuthContext";

interface AppointmentCalendarViewProps {
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
}

const AppointmentCalendarView: React.FC<AppointmentCalendarViewProps> = ({
  mockProviders,
  mockLocations,
  mockAppointmentTypes,
  selectedDate,
  setSelectedDate,
  selectedProvider,
  setSelectedProvider,
  selectedLocation,
  setSelectedLocation,
  selectedAppointmentType,
  setSelectedAppointmentType,
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
  setCalendarIntegrationOpen,
  user
}) => {
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('week');
  
  // Get user role
  const userRole = user?.role as UserRole;
  
  // Ensure data arrays are defined
  const safeProviders = Array.isArray(mockProviders) ? mockProviders : [];
  const safeLocations = Array.isArray(mockLocations) ? mockLocations : [];
  const safeAppointmentTypes = Array.isArray(mockAppointmentTypes) ? mockAppointmentTypes : [];
  
  // Log for debugging
  console.log('AppointmentCalendarView props:', {
    providers: safeProviders,
    locations: safeLocations,
    appointmentTypes: safeAppointmentTypes
  });

  // Ensure mock data is loaded
  useEffect(() => {
    console.log("Calendar view initialized with data:", {
      providers: safeProviders.length,
      locations: safeLocations.length,
      appointmentTypes: safeAppointmentTypes.length
    });
  }, [safeProviders, safeLocations, safeAppointmentTypes]);

  return (
    <div className="flex flex-col gap-6">
      {/* Calendar View Header */}
      <CalendarViewHeader
        calendarView={calendarView}
        setCalendarView={setCalendarView}
        setCalendarIntegrationOpen={setCalendarIntegrationOpen}
        userRole={userRole}
      />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar: Filters & Selection */}
        <div className="md:col-span-1 space-y-4">
          <AppointmentSidebar
            providers={safeProviders}
            locations={safeLocations}
            appointmentTypes={safeAppointmentTypes}
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedAppointmentType={selectedAppointmentType}
            setSelectedAppointmentType={setSelectedAppointmentType}
            selectedDate={selectedDate}
            userRole={userRole}
            calendarView={calendarView}
          />
        </div>
        
        {/* Main Calendar Area */}
        <div className="md:col-span-2">
          <CalendarViewMain
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedProvider={selectedProvider}
            selectedLocation={selectedLocation}
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
            getDisabledDays={getDisabledDays}
            getAvailableTimeSlots={getAvailableTimeSlots}
            calendarView={calendarView}
            providers={safeProviders}
            locations={safeLocations}
            appointmentTypes={safeAppointmentTypes}
            userRole={userRole}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendarView;
