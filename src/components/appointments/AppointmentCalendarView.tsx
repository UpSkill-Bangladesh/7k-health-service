
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import AppointmentCalendar from "./AppointmentCalendar";
import ProviderSelector, { Provider } from "./ProviderSelector";
import LocationSelector, { Location } from "./LocationSelector";
import AppointmentTypeSelector, { AppointmentType } from "./AppointmentTypeSelector";
import { CalendarClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  return (
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
  );
};

export default AppointmentCalendarView;
