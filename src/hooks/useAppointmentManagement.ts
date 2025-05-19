
import { useAppointmentState } from './appointment/useAppointmentState';
import { useAppointmentDialogs } from './appointment/useAppointmentDialogs';
import { useAppointmentActions } from './appointment/useAppointmentActions';
import { useAvailabilityData } from './appointment/useAvailabilityData';
import { useAppointmentData } from './appointment/useAppointmentData';

export interface AppointmentHookReturn {
  // State properties
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
  
  // Dialog state
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
  
  // Data
  myAppointments: any[];
  
  // Actions
  handleBookAppointment: () => void;
  handleCancelAppointment: (appointmentId: string) => void;
  confirmCancelAppointment: () => void;
  handleRescheduleAppointment: (appointmentId: string) => void;
  confirmRescheduleAppointment: () => void;
  handleCalendarIntegration: () => void;
  
  // Utility functions
  getDisabledDays: () => (date: Date) => boolean;
  getAvailableTimeSlots: () => string[];
  getAvailableTabs: () => string[];
}

export const useAppointmentManagement = (user: any): AppointmentHookReturn => {
  // Use the smaller hooks
  const appointmentState = useAppointmentState(user);
  const appointmentDialogs = useAppointmentDialogs();
  const availabilityData = useAvailabilityData({
    selectedDate: appointmentState.selectedDate,
    selectedProvider: appointmentState.selectedProvider
  });
  const appointmentData = useAppointmentData(user);
  
  // Combine props for the actions hook
  const appointmentActions = useAppointmentActions({
    ...appointmentState,
    ...appointmentDialogs
  });

  // Combine all the hooks' return values into a single object
  return {
    ...appointmentState,
    ...appointmentDialogs,
    ...appointmentActions,
    ...availabilityData,
    ...appointmentData
  };
};
