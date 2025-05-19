
import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import AppointmentCalendarView from "@/components/appointments/AppointmentCalendarView";
import AppointmentListView from "@/components/appointments/AppointmentListView";
import AppointmentHistoryView from "@/components/appointments/AppointmentHistoryView";
import CalendarIntegrationDialog from "@/components/appointments/dialogs/CalendarIntegrationDialog";
import CancelAppointmentDialog from "@/components/appointments/dialogs/CancelAppointmentDialog";
import RescheduleAppointmentDialog from "@/components/appointments/dialogs/RescheduleAppointmentDialog";
import { mockProviders, mockLocations, mockAppointmentTypes, mockTimeSlots, mockBookedAppointments } from "@/components/appointments/mockData";
import NoShowPrediction from "@/components/appointments/NoShowPrediction";

const AppointmentScheduling: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [appointmentNotes, setAppointmentNotes] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appointmentReminder, setAppointmentReminder] = useState<string>("email");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointmentToCancel, setSelectedAppointmentToCancel] = useState<string | null>(null);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedAppointmentToReschedule, setSelectedAppointmentToReschedule] = useState<string | null>(null);
  const [calendarIntegrationOpen, setCalendarIntegrationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");

  // Set defaults based on user role
  useEffect(() => {
    if (user?.role === "doctor") {
      // Pre-select the logged-in doctor for doctor users
      const doctorProvider = mockProviders.find(p => p.id === user.id);
      if (doctorProvider) {
        setSelectedProvider(doctorProvider.id);
      }
    } else if (user?.role === "patient") {
      // For patients, we default to calendar view to let them book
      setActiveTab("calendar");
    }
  }, [user]);

  // Filter available dates based on provider availability
  const getDisabledDays = () => {
    if (!selectedProvider) return () => false;
    
    const provider = mockProviders.find(p => p.id === selectedProvider);
    if (!provider) return () => false;
    
    return (date: Date) => {
      const day = date.getDay();
      return !provider.availableDays.includes(day);
    };
  };

  // Get available time slots based on selected date and provider
  const getAvailableTimeSlots = () => {
    if (!selectedDate || !selectedProvider) return mockTimeSlots;
    
    // In a real app, this would filter based on provider availability
    // and existing appointments for the selected date
    const dateString = format(selectedDate, "yyyy-MM-dd");
    const bookedTimes = mockBookedAppointments
      .filter(apt => apt.providerId === selectedProvider && apt.date === dateString)
      .map(apt => apt.time);
    
    return mockTimeSlots.filter(time => !bookedTimes.includes(time));
  };

  // Handlers
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedProvider || !selectedLocation || !selectedAppointmentType || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    const provider = mockProviders.find(p => p.id === selectedProvider);
    const location = mockLocations.find(l => l.id === selectedLocation);
    const appointmentType = mockAppointmentTypes.find(t => t.id === selectedAppointmentType);

    // In a real app, this would send data to an API
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${provider?.name} at ${location?.name} on ${format(selectedDate, "PPPP")} at ${selectedTimeSlot} has been scheduled. ${appointmentReminder === "email" ? "Email" : "SMS"} reminder will be sent.`,
    });

    // Reset form
    setSelectedTimeSlot("");
    setAppointmentNotes("");
    setDialogOpen(false);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setSelectedAppointmentToCancel(appointmentId);
    setCancelDialogOpen(true);
  };

  const confirmCancelAppointment = () => {
    if (!selectedAppointmentToCancel) return;

    // In a real app, this would send a cancellation request to the API
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been successfully cancelled.",
    });

    setCancelDialogOpen(false);
    setSelectedAppointmentToCancel(null);
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    setSelectedAppointmentToReschedule(appointmentId);
    setRescheduleDialogOpen(true);
  };

  const confirmRescheduleAppointment = () => {
    if (!selectedAppointmentToReschedule || !selectedDate || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a new date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send a reschedule request to the API
    toast({
      title: "Appointment Rescheduled",
      description: `Your appointment has been rescheduled to ${format(selectedDate, "PPPP")} at ${selectedTimeSlot}.`,
    });

    setRescheduleDialogOpen(false);
    setSelectedAppointmentToReschedule(null);
  };

  const handleCalendarIntegration = () => {
    // In a real app, this would handle OAuth flow for Google Calendar or Outlook
    toast({
      title: "Calendar Integration",
      description: "Your calendar has been successfully connected. Appointments will be synchronized automatically.",
    });
    setCalendarIntegrationOpen(false);
  };

  // Filter appointments based on user role
  const myAppointments = mockBookedAppointments.filter(appointment => {
    if (user?.role === "patient") {
      return appointment.patientId === user.id;
    } else if (user?.role === "doctor") {
      return appointment.providerId === user.id;
    } else {
      return true; // Admin can see all appointments
    }
  });

  // Determine which tabs should be available based on role
  const getAvailableTabs = () => {
    if (user?.role === "admin") {
      return ["calendar", "list", "history"];
    } else if (user?.role === "doctor") {
      return ["calendar", "list"];
    } else {
      return ["calendar", "history"];
    }
  };

  const availableTabs = getAvailableTabs();

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-healthcare-primary to-healthcare-accent bg-clip-text text-transparent mb-6">
          {user?.role === "admin" ? "Appointment Management" :
           user?.role === "doctor" ? "My Schedule" :
           "Schedule an Appointment"}
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {availableTabs.includes("calendar") && (
              <TabsTrigger value="calendar" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
                Calendar View
              </TabsTrigger>
            )}
            {availableTabs.includes("list") && (
              <TabsTrigger value="list" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
                List View
              </TabsTrigger>
            )}
            {availableTabs.includes("history") && (
              <TabsTrigger value="history" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
                Appointment History
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <AppointmentCalendarView 
                  mockProviders={mockProviders}
                  mockLocations={mockLocations}
                  mockAppointmentTypes={mockAppointmentTypes}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedProvider={selectedProvider}
                  setSelectedProvider={setSelectedProvider}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedAppointmentType={selectedAppointmentType}
                  setSelectedAppointmentType={setSelectedAppointmentType}
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
                  setCalendarIntegrationOpen={setCalendarIntegrationOpen}
                  user={user}
                />
              </div>
              {(user?.role === "admin" || user?.role === "doctor") && (
                <div className="lg:col-span-1">
                  <NoShowPrediction />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <AppointmentListView 
              myAppointments={myAppointments}
              mockProviders={mockProviders}
              mockLocations={mockLocations}
              mockAppointmentTypes={mockAppointmentTypes}
              handleRescheduleAppointment={handleRescheduleAppointment}
              handleCancelAppointment={handleCancelAppointment}
              user={user}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <AppointmentHistoryView />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <CancelAppointmentDialog 
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        confirmCancelAppointment={confirmCancelAppointment}
      />

      <RescheduleAppointmentDialog 
        open={rescheduleDialogOpen}
        onOpenChange={setRescheduleDialogOpen}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onSelectTimeSlot={setSelectedTimeSlot}
        getDisabledDays={getDisabledDays}
        getAvailableTimeSlots={getAvailableTimeSlots}
        confirmRescheduleAppointment={confirmRescheduleAppointment}
      />

      <CalendarIntegrationDialog 
        open={calendarIntegrationOpen}
        onOpenChange={setCalendarIntegrationOpen}
        handleCalendarIntegration={handleCalendarIntegration}
      />
    </DashboardLayout>
  );
};

export default AppointmentScheduling;
