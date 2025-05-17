
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
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import ProviderSelector from "@/components/appointments/ProviderSelector";

// Mock data for providers
const mockProviders = [
  { id: "1", name: "Dr. James Smith", specialty: "Cardiology", availableDays: [1, 2, 3] },
  { id: "2", name: "Dr. Emily Brown", specialty: "Neurology", availableDays: [2, 3, 4] },
  { id: "3", name: "Dr. Maria Rodriguez", specialty: "Family Medicine", availableDays: [0, 4, 5] },
  { id: "4", name: "Dr. Robert Johnson", specialty: "Dermatology", availableDays: [1, 3, 5] },
];

// Mock data for available time slots
const mockTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

const AppointmentScheduling: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [appointmentNotes, setAppointmentNotes] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedProvider || !selectedTimeSlot || !appointmentType) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send data to an API
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${mockProviders.find(p => p.id === selectedProvider)?.name} on ${format(selectedDate, "PPPP")} at ${selectedTimeSlot} has been scheduled.`,
    });

    // Reset form
    setSelectedTimeSlot("");
    setAppointmentNotes("");
    setDialogOpen(false);

    // In a real app, we would navigate to a confirmation page or refresh the calendar
    // For now, we'll just close the dialog
  };

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
              {/* Provider Selector */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Select Provider</CardTitle>
                  <CardDescription>Choose a healthcare provider to view their availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProviderSelector 
                    providers={mockProviders} 
                    selectedProvider={selectedProvider}
                    onSelectProvider={setSelectedProvider}
                  />
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
                        disabled={!selectedProvider || !selectedDate} 
                        className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
                      >
                        Book Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>
                          {selectedProvider && selectedDate ? 
                            `Schedule an appointment with ${mockProviders.find(p => p.id === selectedProvider)?.name} on ${format(selectedDate, "PPPP")}` :
                            "Select a provider and date to book an appointment"}
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
                              {mockTimeSlots.map((time) => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="appointmentType">Appointment Type</Label>
                          <Select value={appointmentType} onValueChange={setAppointmentType}>
                            <SelectTrigger id="appointmentType">
                              <SelectValue placeholder="Select appointment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new-patient">New Patient Consultation</SelectItem>
                              <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                              <SelectItem value="annual-exam">Annual Exam</SelectItem>
                              <SelectItem value="urgent-care">Urgent Care</SelectItem>
                              <SelectItem value="specialist">Specialist Consultation</SelectItem>
                            </SelectContent>
                          </Select>
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
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>View and manage your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-10">
                  No upcoming appointments scheduled. Use the Calendar View to book a new appointment.
                </p>
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
    </DashboardLayout>
  );
};

export default AppointmentScheduling;
