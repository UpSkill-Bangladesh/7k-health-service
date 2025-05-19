
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { mockProviders, mockLocations, mockAppointmentTypes } from "@/components/appointments/mockData";

export interface AppointmentActionsProps {
  selectedDate: Date | undefined;
  selectedProvider: string;
  selectedLocation: string;
  selectedAppointmentType: string;
  selectedTimeSlot: string;
  appointmentReminder: string;
  appointmentNotes: string;
  setSelectedTimeSlot: (timeSlot: string) => void;
  setAppointmentNotes: (notes: string) => void;
  setDialogOpen: (open: boolean) => void;
  setCancelDialogOpen: (open: boolean) => void;
  setRescheduleDialogOpen: (open: boolean) => void;
  setCalendarIntegrationOpen: (open: boolean) => void;
  setSelectedAppointmentToCancel: (appointmentId: string | null) => void;
  setSelectedAppointmentToReschedule: (appointmentId: string | null) => void;
  selectedAppointmentToCancel: string | null;
  selectedAppointmentToReschedule: string | null;
}

export interface AppointmentActionsReturn {
  handleBookAppointment: () => void;
  handleCancelAppointment: (appointmentId: string) => void;
  confirmCancelAppointment: () => void;
  handleRescheduleAppointment: (appointmentId: string) => void;
  confirmRescheduleAppointment: () => void;
  handleCalendarIntegration: () => void;
}

export const useAppointmentActions = ({
  selectedDate,
  selectedProvider,
  selectedLocation,
  selectedAppointmentType,
  selectedTimeSlot,
  appointmentReminder,
  appointmentNotes,
  setSelectedTimeSlot,
  setAppointmentNotes,
  setDialogOpen,
  setCancelDialogOpen,
  setRescheduleDialogOpen,
  setCalendarIntegrationOpen,
  setSelectedAppointmentToCancel,
  setSelectedAppointmentToReschedule,
  selectedAppointmentToCancel,
  selectedAppointmentToReschedule
}: AppointmentActionsProps): AppointmentActionsReturn => {
  const { toast } = useToast();

  // Appointment booking handler
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

  // Appointment cancellation handlers
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

  // Appointment rescheduling handlers
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

  // Calendar integration handler
  const handleCalendarIntegration = () => {
    // In a real app, this would handle OAuth flow for Google Calendar or Outlook
    toast({
      title: "Calendar Integration",
      description: "Your calendar has been successfully connected. Appointments will be synchronized automatically.",
    });
    setCalendarIntegrationOpen(false);
  };

  return {
    handleBookAppointment,
    handleCancelAppointment,
    confirmCancelAppointment,
    handleRescheduleAppointment,
    confirmRescheduleAppointment,
    handleCalendarIntegration
  };
};
