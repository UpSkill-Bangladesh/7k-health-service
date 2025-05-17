
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  provider: string;
  type: string;
}

const mockReminders: Reminder[] = [
  {
    id: "1",
    title: "Upcoming Appointment",
    date: "2023-05-20",
    time: "09:30 AM",
    provider: "Dr. James Smith",
    type: "Follow-up Visit"
  },
  {
    id: "2",
    title: "Lab Results Ready",
    date: "2023-05-19",
    time: "02:00 PM",
    provider: "Dr. Emily Brown",
    type: "Lab Results Review"
  }
];

interface AppointmentRemindersProps {
  userId?: string;
}

const AppointmentReminders: React.FC<AppointmentRemindersProps> = ({ userId }) => {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);

  // In a real app, this would fetch reminders from an API
  useEffect(() => {
    // This would be a fetch call to get reminders specific to the user
    // For now, we're using mock data
  }, [userId]);

  const handleDismiss = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast.success("Reminder dismissed");
  };

  const handleSendReminder = (id: string) => {
    // In a real app, this would send an SMS or email reminder
    toast.success("Reminder notification sent");
  };

  if (reminders.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-healthcare-primary" />
          Appointment Reminders
        </CardTitle>
        <CardDescription>
          Stay updated on your upcoming appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{reminder.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {reminder.provider} - {reminder.type}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Date: {new Date(reminder.date).toLocaleDateString()} at {reminder.time}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDismiss(reminder.id)}
                  >
                    Dismiss
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-healthcare-primary hover:bg-healthcare-accent"
                    onClick={() => handleSendReminder(reminder.id)}
                  >
                    Send Reminder
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Notifications
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentReminders;
