
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppointmentCalendar from "../AppointmentCalendar";

interface RescheduleAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  selectedTimeSlot: string;
  onSelectTimeSlot: (timeSlot: string) => void;
  getDisabledDays: () => (date: Date) => boolean;
  getAvailableTimeSlots: () => string[];
  confirmRescheduleAppointment: () => void;
}

const RescheduleAppointmentDialog: React.FC<RescheduleAppointmentDialogProps> = ({
  open,
  onOpenChange,
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  getDisabledDays,
  getAvailableTimeSlots,
  confirmRescheduleAppointment
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onSelectDate={onSelectDate}
            disabled={getDisabledDays()}
          />
          <div className="space-y-2">
            <Label htmlFor="rescheduleTime">Available Time Slots</Label>
            <Select value={selectedTimeSlot} onValueChange={onSelectTimeSlot}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
  );
};

export default RescheduleAppointmentDialog;
