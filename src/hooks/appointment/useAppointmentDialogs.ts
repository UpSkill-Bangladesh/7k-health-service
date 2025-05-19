
import { useState } from "react";

export interface AppointmentDialogsReturn {
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
}

export const useAppointmentDialogs = (): AppointmentDialogsReturn => {
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [calendarIntegrationOpen, setCalendarIntegrationOpen] = useState(false);
  
  // Selected appointment state for operations
  const [selectedAppointmentToCancel, setSelectedAppointmentToCancel] = useState<string | null>(null);
  const [selectedAppointmentToReschedule, setSelectedAppointmentToReschedule] = useState<string | null>(null);

  return {
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
    setSelectedAppointmentToReschedule
  };
};
