
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { mockProviders, mockLocations, mockAppointmentTypes, mockTimeSlots, mockBookedAppointments } from "@/components/appointments/mockData";
import { UserRole } from "@/contexts/AuthContext";

export interface AppointmentHookReturn {
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
  cancelDialogOpen: boolean;
  setCancelDialogOpen: (open: boolean) => void;
  rescheduleDialogOpen: boolean;
  setRescheduleDialogOpen: (open: boolean) => void;
  calendarIntegrationOpen: boolean;
  setCalendarIntegrationOpen: (open: boolean) => void;
  selectedAppointmentToCancel: string | null;
  setSelectedAppointmentToCancel: (appointmentId: string | null) => void;
  selectedAppointmentToReschedule: string | null;
  setSelectedAppointmentToReschedule: (appointmentId: string | null) => void;
  myAppointments: any[];
  handleBookAppointment: () => void;
  handleCancelAppointment: (appointmentId: string) => void;
  confirmCancelAppointment: () => void;
  handleRescheduleAppointment: (appointmentId: string) => void;
  confirmRescheduleAppointment: () => void;
  handleCalendarIntegration: () => void;
  getDisabledDays: () => (date: Date) => boolean;
  getAvailableTimeSlots: () => string[];
  getAvailableTabs: () => string[];
}

export const useAppointmentManagement = (user: any): AppointmentHookReturn => {
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

  // Set defaults based on user role
  useEffect(() => {
    if (user?.role === "doctor") {
      // Pre-select the logged-in doctor for doctor users
      const doctorProvider = mockProviders.find(p => p.id === user.id);
      if (doctorProvider) {
        setSelectedProvider(doctorProvider.id);
      }
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

  return {
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
    cancelDialogOpen,
    setCancelDialogOpen,
    rescheduleDialogOpen,
    setRescheduleDialogOpen,
    calendarIntegrationOpen,
    setCalendarIntegrationOpen,
    selectedAppointmentToCancel,
    setSelectedAppointmentToCancel,
    selectedAppointmentToReschedule,
    setSelectedAppointmentToReschedule,
    myAppointments,
    handleBookAppointment,
    handleCancelAppointment,
    confirmCancelAppointment,
    handleRescheduleAppointment,
    confirmRescheduleAppointment,
    handleCalendarIntegration,
    getDisabledDays,
    getAvailableTimeSlots,
    getAvailableTabs
  };
};
