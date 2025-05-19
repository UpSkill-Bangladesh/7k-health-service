
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, eachDayOfInterval } from "date-fns";

interface AppointmentCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  view?: 'day' | 'week' | 'month';
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  selectedDate,
  onSelectDate,
  disabled,
  view = 'month'
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

  // For week view, get all days of current week
  const getWeekDays = () => {
    if (!selectedDate) return [];
    
    const weekStart = startOfWeek(selectedDate);
    return eachDayOfInterval({ 
      start: weekStart, 
      end: addDays(weekStart, 6) 
    });
  };

  // Render time slots for day view
  const renderDayTimeSlots = () => {
    const timeSlots = [
      "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
      "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
      "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
    ];
    
    return (
      <div className="mt-4 border rounded-md overflow-hidden">
        <div className="text-center py-2 bg-muted/30 border-b font-medium">
          {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a date"}
        </div>
        <div className="divide-y">
          {timeSlots.map((time) => (
            <div key={time} className="p-2 hover:bg-muted/20 cursor-pointer flex items-center transition-colors">
              <div className="w-20 text-sm text-muted-foreground">{time}</div>
              <div className="flex-1 h-8 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render week view with days as columns
  const renderWeekView = () => {
    const weekDays = getWeekDays();
    
    return (
      <div className="mt-4 border rounded-md overflow-hidden">
        <div className="grid grid-cols-7 text-center py-2 bg-muted/30 border-b font-medium">
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="text-xs sm:text-sm">
              <div>{format(day, "EEE")}</div>
              <div className="text-healthcare-primary">{format(day, "d")}</div>
            </div>
          ))}
        </div>
        
        <div className="h-64 overflow-y-auto grid grid-cols-7">
          {weekDays.map((day) => (
            <div 
              key={day.toISOString()} 
              className={cn(
                "border-r last:border-r-0 cursor-pointer transition-colors",
                selectedDate && day.toDateString() === selectedDate.toDateString() 
                  ? "bg-healthcare-primary/10" 
                  : "hover:bg-muted/10"
              )}
              onClick={() => onSelectDate(day)}
            >
              {/* This is where appointments would render */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {view === 'month' && (
        <>
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
        </>
      )}
      
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayTimeSlots()}
    </div>
  );
};

export default AppointmentCalendar;
