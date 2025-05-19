
import { mockBookedAppointments } from "@/components/appointments/mockData";
import { UserRole } from "@/contexts/AuthContext";

export interface AppointmentDataReturn {
  myAppointments: any[];
  getAvailableTabs: () => string[];
}

export const useAppointmentData = (user: any): AppointmentDataReturn => {
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
    myAppointments,
    getAvailableTabs
  };
};
