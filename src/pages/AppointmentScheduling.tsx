
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import ProviderSelector, { Provider } from "@/components/appointments/ProviderSelector";
import LocationSelector, { Location } from "@/components/appointments/LocationSelector";
import AppointmentTypeSelector, { AppointmentType } from "@/components/appointments/AppointmentTypeSelector";
import { Calendar as CalendarIcon, Calendar as CalendarClock, Check, ChevronDown } from "lucide-react";

// Mock data for providers
const mockProviders = [
  { id: "1", name: "Dr. James Smith", specialty: "Cardiology", location: "Main Hospital", availableDays: [1, 2, 3] },
  { id: "2", name: "Dr. Emily Brown", specialty: "Neurology", location: "North Clinic", availableDays: [2, 3, 4] },
  { id: "3", name: "Dr. Maria Rodriguez", specialty: "Family Medicine", location: "South Clinic", availableDays: [0, 4, 5] },
  { id: "4", name: "Dr. Robert Johnson", specialty: "Dermatology", location: "West Medical Center", availableDays: [1, 3, 5] },
];

// Mock data for locations
const mockLocations = [
  { id: "1", name: "Main Hospital", address: "123 Main Street, Cityville" },
  { id: "2", name: "North Clinic", address: "456 North Avenue, Townsville" },
  { id: "3", name: "South Clinic", address: "789 South Boulevard, Villageton" },
  { id: "4", name: "West Medical Center", address: "321 West Road, Boroughford" },
];

// Mock data for appointment types
const mockAppointmentTypes = [
  { id: "1", name: "New Patient Consultation", duration: 60, description: "Initial consultation for new patients" },
  { id: "2", name: "Follow-up Visit", duration: 30, description: "Regular follow-up appointment" },
  { id: "3", name: "Annual Exam", duration: 45, description: "Yearly comprehensive examination" },
  { id: "4", name: "Urgent Care", duration: 30, description: "Immediate care for non-emergency issues" },
  { id: "5", name: "Specialist Consultation", duration: 60, description: "Consultation with a specialist" },
];

// Mock data for available time slots
const mockTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

// Mock data for booked appointments
const mockBookedAppointments = [
  { 
    id: "1", 
    patientId: "p1", 
    patientName: "John Doe",
    providerId: "1", 
    locationId: "1", 
    date: "2025-05-21", 
    time: "09:00 AM", 
    typeId: "1", 
    status: "confirmed",
    notes: "First visit for heart palpitations"
  },
  {
    id: "2",
    patientId: "p2",
    patientName: "Jane Smith",
    providerId: "2",
    locationId: "2",
    date: "2025-05-22",
    time: "10:30 AM",
    typeId: "3",
    status: "confirmed",
    notes: "Annual check-up"
  }
];

const AppointmentScheduling: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [appointmentNotes, setAppointmentNotes] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appointmentReminder, setAppointmentReminder] = useState<string>("email");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointmentToCancel, setSelectedAppointmentToCancel] = useState<string | null>(null);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedAppointmentToReschedule, setSelectedAppointmentToReschedule] = useState<string | null>(null);
  const [calendarIntegrationOpen, setCalendarIntegrationOpen] = useState(false);

  // Filter available dates based on provider availability
  const getDisabledDays = () => {
    if (!selectedProvider) return () => false;
    
    const provider = mockProviders.find(p => p.id === selectedProvider);
    if (!provider) return () => false;
    
    return (date: Date) => {
      const day = date.getDay();
      return !provider.availableDays.includes(day);
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

    // In a real app, we would navigate to a confirmation page or refresh the calendar
    // For now, we'll just close the dialog
  };

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

  const handleCalendarIntegration = () => {
    // In a real app, this would handle OAuth flow for Google Calendar or Outlook
    toast({
      title: "Calendar Integration",
      description: "Your calendar has been successfully connected. Appointments will be synchronized automatically.",
    });
    setCalendarIntegrationOpen(false);
  };

  // Filter appointments based on user role
  const myAppointments = mockBookedAppointments.filter(appointment => {
    if (user?.role === "patient") {
      return appointment.patientId === user.id;
    } else {
      return true; // Staff can see all appointments
    }
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-healthcare-primary mb-6">Appointment Scheduling</h1>
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="history">Appointment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Provider and Location Selection */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Schedule an Appointment</CardTitle>
                  <CardDescription>Select your preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider">Healthcare Provider</Label>
                    <ProviderSelector 
                      providers={mockProviders} 
                      selectedProvider={selectedProvider}
                      onSelectProvider={setSelectedProvider}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <LocationSelector 
                      locations={mockLocations}
                      selectedLocation={selectedLocation}
                      onSelectLocation={setSelectedLocation}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">Appointment Type</Label>
                    <AppointmentTypeSelector 
                      appointmentTypes={mockAppointmentTypes}
                      selectedType={selectedAppointmentType}
                      onSelectType={setSelectedAppointmentType}
                    />
                  </div>

                  {/* Calendar Integration Button */}
                  {(user?.role === "admin" || user?.role === "clinicalStaff") && (
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCalendarIntegrationOpen(true)}
                      >
                        <CalendarClock className="mr-2 h-4 w-4" />
                        Connect Calendar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Calendar */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Available Appointments</CardTitle>
                  <CardDescription>
                    {selectedProvider 
                      ? `Select a date to see available times for ${mockProviders.find(p => p.id === selectedProvider)?.name}` 
                      : "Please select a provider first"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AppointmentCalendar 
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    disabled={getDisabledDays()}
                  />
                </CardContent>
                <CardFooter>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        disabled={!selectedProvider || !selectedLocation || !selectedAppointmentType || !selectedDate} 
                        className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
                      >
                        Book Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>
                          {selectedProvider && selectedLocation && selectedDate ? 
                            `Schedule an appointment with ${mockProviders.find(p => p.id === selectedProvider)?.name} at ${mockLocations.find(l => l.id === selectedLocation)?.name} on ${format(selectedDate, "PPPP")}` :
                            "Select a provider, location, and date to book an appointment"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="timeSlot">Available Time Slots</Label>
                          <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                            <SelectTrigger id="timeSlot">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableTimeSlots().map((time) => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Reminder Preference</Label>
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
                          <Label htmlFor="notes">Notes (optional)</Label>
                          <Textarea 
                            id="notes" 
                            placeholder="Reason for visit or special requests"
                            value={appointmentNotes}
                            onChange={(e) => setAppointmentNotes(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          type="submit" 
                          onClick={handleBookAppointment}
                          className="bg-healthcare-primary hover:bg-healthcare-accent"
                        >
                          Confirm Booking
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>View and manage your scheduled appointments</CardDescription>
                </div>
                
                {user?.role !== "patient" && (
                  <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                    Export Schedule
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {myAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {myAppointments.map((appointment) => {
                      const provider = mockProviders.find(p => p.id === appointment.providerId);
                      const location = mockLocations.find(l => l.id === appointment.locationId);
                      const appointmentType = mockAppointmentTypes.find(t => t.id === appointment.typeId);
                      
                      return (
                        <Collapsible key={appointment.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <div className="font-medium flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2 text-healthcare-primary" />
                                {appointment.date} at {appointment.time}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {provider?.name} - {appointmentType?.name}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleRescheduleAppointment(appointment.id)}
                              >
                                Reschedule
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 hover:text-red-600 hover:bg-red-50" 
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                Cancel
                              </Button>
                              <CollapsibleTrigger className="p-2">
                                <ChevronDown className="h-4 w-4" />
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <CollapsibleContent className="pt-4 space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium">Location</h4>
                                <p className="text-sm text-muted-foreground">{location?.name}</p>
                                <p className="text-xs text-muted-foreground">{location?.address}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Appointment Type</h4>
                                <p className="text-sm text-muted-foreground">{appointmentType?.name}</p>
                                <p className="text-xs text-muted-foreground">{appointmentType?.description}</p>
                              </div>
                              {appointment.notes && (
                                <div className="col-span-2">
                                  <h4 className="text-sm font-medium">Notes</h4>
                                  <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-10">
                    No upcoming appointments scheduled. Use the Calendar View to book a new appointment.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Appointment History</CardTitle>
                <CardDescription>View your past appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-10">
                  No past appointments found in the system.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Appointment Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Appointment
            </Button>
            <Button 
              onClick={confirmCancelAppointment}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Appointment Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time for your appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <AppointmentCalendar 
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              disabled={getDisabledDays()}
            />
            <div className="space-y-2">
              <Label htmlFor="rescheduleTime">Available Time Slots</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger id="rescheduleTime">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTimeSlots().map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmRescheduleAppointment}
              className="bg-healthcare-primary hover:bg-healthcare-accent"
            >
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calendar Integration Dialog */}
      <Dialog open={calendarIntegrationOpen} onOpenChange={setCalendarIntegrationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Calendar</DialogTitle>
            <DialogDescription>
              Connect your calendar to sync appointments automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button className="w-full justify-start" onClick={handleCalendarIntegration}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2V8H18V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 8V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 8V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Connect Google Calendar
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={handleCalendarIntegration}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Connect Outlook Calendar
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCalendarIntegrationOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AppointmentScheduling;
