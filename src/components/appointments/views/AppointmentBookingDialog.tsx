
import React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Provider } from "../ProviderSelector";
import { Location } from "../LocationSelector";
import { UserRole } from "@/contexts/AuthContext";

interface AppointmentBookingDialogProps {
  selectedProvider: string;
  selectedLocation: string;
  selectedDate: Date | undefined;
  selectedAppointmentType: string;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (timeSlot: string) => void;
  appointmentNotes: string;
  setAppointmentNotes: (notes: string) => void;
  appointmentReminder: string;
  setAppointmentReminder: (reminder: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  handleBookAppointment: () => void;
  getAvailableTimeSlots: () => string[];
  providers: Provider[];
  locations: Location[];
  userRole?: UserRole;
}

const AppointmentBookingDialog: React.FC<AppointmentBookingDialogProps> = ({
  selectedProvider,
  selectedLocation,
  selectedDate,
  selectedAppointmentType,
  selectedTimeSlot,
  setSelectedTimeSlot,
  appointmentNotes,
  setAppointmentNotes,
  appointmentReminder,
  setAppointmentReminder,
  dialogOpen,
  setDialogOpen,
  handleBookAppointment,
  getAvailableTimeSlots,
  providers,
  locations,
  userRole
}) => {
  const isPatient = userRole === "patient";

  return (
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
              `Schedule ${isPatient ? "your" : "an"} appointment with ${providers.find(p => p.id === selectedProvider)?.name} at ${locations.find(l => l.id === selectedLocation)?.name} on ${format(selectedDate, "PPPP")}` :
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
  );
};

export default AppointmentBookingDialog;
