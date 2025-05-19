
import { format } from "date-fns";
import { mockBookedAppointments, mockTimeSlots } from "@/components/appointments/mockData";

export interface AvailabilityDataProps {
  selectedDate: Date | undefined; 
  selectedProvider: string;
}

export interface AvailabilityDataReturn {
  getDisabledDays: () => (date: Date) => boolean;
  getAvailableTimeSlots: () => string[];
}

export const useAvailabilityData = ({
  selectedDate,
  selectedProvider
}: AvailabilityDataProps): AvailabilityDataReturn => {
  // Filter available dates based on provider availability
  const getDisabledDays = () => {
    if (!selectedProvider) return () => false;
    
    // In a real app, this would query the provider's availability
    // For now, we're just using mock data
    return (date: Date) => {
      // This is a simplified example - in real app this would check
      // against actual provider availability
      const day = date.getDay();
      // Assuming weekends are disabled for this example
      return day === 0 || day === 6;
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

  return {
    getDisabledDays,
    getAvailableTimeSlots
  };
};
