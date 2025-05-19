
import { useState, useEffect } from "react";
import { mockProviders } from "@/components/appointments/mockData";

export interface AppointmentStateReturn {
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
}

export const useAppointmentState = (user: any): AppointmentStateReturn => {
  // Core appointment state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [appointmentNotes, setAppointmentNotes] = useState<string>("");
  const [appointmentReminder, setAppointmentReminder] = useState<string>("email");
  
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
    setAppointmentReminder
  };
};
