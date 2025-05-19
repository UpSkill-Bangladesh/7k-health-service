
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";

interface CalendarViewHeaderProps {
  calendarView: 'day' | 'week' | 'month';
  setCalendarView: (view: 'day' | 'week' | 'month') => void;
  setCalendarIntegrationOpen: (open: boolean) => void;
  userRole?: UserRole;
}

const CalendarViewHeader: React.FC<CalendarViewHeaderProps> = ({
  calendarView,
  setCalendarView,
  setCalendarIntegrationOpen,
  userRole
}) => {
  const isAdmin = userRole === "admin";
  const isDoctor = userRole === "doctor";
  const isPatient = userRole === "patient";

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-healthcare-accent mb-1">
          {isAdmin ? "Appointment Management" : 
           isDoctor ? "My Appointments" : 
           "Book an Appointment"}
        </h2>
        <p className="text-muted-foreground">
          {isAdmin ? "Manage schedules across all providers" :
           isDoctor ? "View your upcoming appointments" :
           "Find available appointment slots"}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {(isAdmin || isDoctor) && (
          <Tabs defaultValue={calendarView} onValueChange={(v) => setCalendarView(v as 'day' | 'week' | 'month')} className="w-auto">
            <TabsList className="bg-muted/60">
              <TabsTrigger value="day" className="text-sm">Day</TabsTrigger>
              <TabsTrigger value="week" className="text-sm">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-sm">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        
        {isAdmin && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCalendarIntegrationOpen(true)}
            className="flex items-center gap-1 ml-2"
          >
            <CalendarClock className="h-4 w-4" />
            <span className="hidden sm:inline">Connect Calendar</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CalendarViewHeader;
