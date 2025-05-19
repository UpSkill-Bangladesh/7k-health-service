
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format, addDays, startOfWeek, startOfMonth } from "date-fns";
import { CalendarClock, Calendar as CalendarIcon, Clock, Users, MapPin } from "lucide-react";
import AppointmentCalendar from "./AppointmentCalendar";
import ProviderSelector, { Provider } from "./ProviderSelector";
import LocationSelector, { Location } from "./LocationSelector";
import AppointmentTypeSelector, { AppointmentType } from "./AppointmentTypeSelector";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/contexts/AuthContext";

interface AppointmentCalendarViewProps {
  mockProviders: Provider[];
  mockLocations: Location[];
  mockAppointmentTypes: AppointmentType[];
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
  handleBookAppointment: () => void;
  getDisabledDays: () => (date: Date) => boolean;
  getAvailableTimeSlots: () => string[];
  setCalendarIntegrationOpen: (open: boolean) => void;
  user: any;
}

const AppointmentCalendarView: React.FC<AppointmentCalendarViewProps> = ({
  mockProviders,
  mockLocations,
  mockAppointmentTypes,
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
  handleBookAppointment,
  getDisabledDays,
  getAvailableTimeSlots,
  setCalendarIntegrationOpen,
  user
}) => {
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('week');
  const { toast } = useToast();

  // Role-based UI visibility
  const isAdmin = user?.role === "admin";
  const isDoctor = user?.role === "doctor";
  const isPatient = user?.role === "patient";
  
  // Get current date range description based on view
  const getDateRangeText = () => {
    if (!selectedDate) return "";
    
    switch(calendarView) {
      case 'day':
        return format(selectedDate, "MMMM d, yyyy");
      case 'week': {
        const weekStart = startOfWeek(selectedDate);
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
      }
      case 'month':
        return format(selectedDate, "MMMM yyyy");
      default:
        return format(selectedDate, "MMMM d, yyyy");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Calendar View Selector */}
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar: Filters & Selection */}
        <div className="md:col-span-1 space-y-4">
          {/* Provider/Location/Type Selection Card */}
          <Card className="bg-white shadow-sm border-healthcare-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="h-5 w-5 mr-2 text-healthcare-primary" />
                {isPatient ? "Book Your Appointment" : "Appointment Options"}
              </CardTitle>
              <CardDescription>
                {isPatient ? "Select your preferences to find available slots" : 
                 isDoctor ? "Filter your appointments" :
                 "Configure appointment settings"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Provider Selection */}
              <div className="space-y-2">
                <Label htmlFor="provider" className="font-medium">
                  Healthcare Provider
                </Label>
                <ProviderSelector 
                  providers={mockProviders} 
                  selectedProvider={selectedProvider}
                  onSelectProvider={setSelectedProvider}
                />
              </div>
              
              {/* Location Selection */}
              {(isAdmin || isPatient) && (
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-medium">
                    Location
                  </Label>
                  <LocationSelector 
                    locations={mockLocations}
                    selectedLocation={selectedLocation}
                    onSelectLocation={setSelectedLocation}
                  />
                </div>
              )}
              
              {/* Appointment Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="appointmentType" className="font-medium">
                  Appointment Type
                </Label>
                <AppointmentTypeSelector 
                  appointmentTypes={mockAppointmentTypes}
                  selectedType={selectedAppointmentType}
                  onSelectType={setSelectedAppointmentType}
                />
              </div>

              {/* Status filter for admin/doctor */}
              {(isAdmin || isDoctor) && (
                <div className="space-y-2 pt-2">
                  <Label className="font-medium">Status</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer">Confirmed</Badge>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer">Pending</Badge>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer">Canceled</Badge>
                  </div>
                </div>
              )}

              {/* Date range display */}
              <div className="pt-4 text-center">
                <div className="text-sm text-muted-foreground">{getDateRangeText()}</div>
              </div>
            </CardContent>
          </Card>
          
          {/* Help Card for Patients */}
          {isPatient && (
            <Card className="bg-healthcare-primary/5 border-healthcare-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If you can't find a suitable appointment time or need special accommodations, 
                  please call our office at (555) 123-4567.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Main Calendar Area */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-healthcare-primary" />
              {isAdmin ? "Appointment Calendar" : 
               isDoctor ? "Your Schedule" : 
               "Available Time Slots"}
            </CardTitle>
            <CardDescription>
              {selectedProvider 
                ? `${isPatient ? "Select a date to see available times with " : ""}${mockProviders.find(p => p.id === selectedProvider)?.name}` 
                : "Please select a provider first"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentCalendar 
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              disabled={getDisabledDays()}
              view={calendarView}
            />
          </CardContent>
          <CardFooter>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  disabled={!selectedProvider || !selectedLocation || !selectedAppointmentType || !selectedDate} 
                  className="w-full bg-healthcare-primary hover:bg-healthcare-accent transition-colors"
                >
                  {isPatient ? "Book Appointment" : "Schedule Appointment"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {isPatient ? "Book Your Appointment" : "Schedule Appointment"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedProvider && selectedLocation && selectedDate ? 
                      `Schedule ${isPatient ? "your" : "an"} appointment with ${mockProviders.find(p => p.id === selectedProvider)?.name} at ${mockLocations.find(l => l.id === selectedLocation)?.name} on ${format(selectedDate, "PPPP")}` :
                      "Select a provider, location, and date to book an appointment"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeSlot" className="font-medium">Available Time Slots</Label>
                    <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                      <SelectTrigger id="timeSlot" className="w-full">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableTimeSlots().map((time) => (
                          <SelectItem key={time} value={time} className="cursor-pointer">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-healthcare-primary" />
                              {time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="font-medium">Reminder Preference</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="email" 
                          value="email" 
                          checked={appointmentReminder === "email"} 
                          onChange={() => setAppointmentReminder("email")}
                          className="mr-2"
                        />
                        <Label htmlFor="email">Email</Label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="sms" 
                          value="sms" 
                          checked={appointmentReminder === "sms"} 
                          onChange={() => setAppointmentReminder("sms")}
                          className="mr-2"
                        />
                        <Label htmlFor="sms">SMS</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="font-medium">Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder={isPatient ? "Reason for visit or special requests" : "Additional appointment details"}
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      className="resize-none"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleBookAppointment}
                    className="bg-healthcare-primary hover:bg-healthcare-accent transition-colors"
                  >
                    {isPatient ? "Confirm Booking" : "Schedule Appointment"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentCalendarView;
