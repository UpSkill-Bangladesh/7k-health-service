
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AppointmentCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  selectedDate,
  onSelectDate,
  disabled
}) => {
  // Function to disable past dates
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Combine the passed disabled function with past date check
    const isPastDate = date < today;
    
    if (disabled) {
      return isPastDate || disabled(date);
    }
    
    return isPastDate;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        {selectedDate && (
          <p className="text-lg font-medium">
            Selected: <span className="text-healthcare-primary">{format(selectedDate, "PPPP")}</span>
          </p>
        )}
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        disabled={disabledDays}
        className={cn("rounded-md border", "p-3 pointer-events-auto")}
        initialFocus
      />
    </div>
  );
};

export default AppointmentCalendar;
