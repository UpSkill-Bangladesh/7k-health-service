
import React, { useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, Clock, Plus, FileText, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NoShowPrediction from "@/components/appointments/NoShowPrediction";

// Mock appointment data - in a real app this would come from your API
const mockAppointments = [
  { id: "1", patient: "Sarah Johnson", type: "Annual Check-up", date: "2025-05-22", time: "09:00", doctor: "Dr. James Smith", status: "confirmed" },
  { id: "2", patient: "Michael Chen", type: "Follow-up", date: "2025-05-22", time: "10:15", doctor: "Dr. Emily Brown", status: "confirmed" },
  { id: "3", patient: "David Martinez", type: "New Patient", date: "2025-05-22", time: "11:30", doctor: "Dr. James Smith", status: "confirmed" },
  { id: "4", patient: "Robert Williams", type: "Consultation", date: "2025-05-22", time: "13:45", doctor: "Dr. Maria Rodriguez", status: "cancelled" },
  { id: "5", patient: "Jennifer Lee", type: "Follow-up", date: "2025-05-23", time: "09:30", doctor: "Dr. Emily Brown", status: "confirmed" },
  { id: "6", patient: "Thomas Wilson", type: "Lab Results", date: "2025-05-23", time: "11:00", doctor: "Dr. Maria Rodriguez", status: "confirmed" },
  { id: "7", patient: "Lisa Anderson", type: "Annual Check-up", date: "2025-05-23", time: "14:15", doctor: "Dr. James Smith", status: "pending" },
  { id: "8", patient: "Emily Davis", type: "New Patient", date: "2025-05-24", time: "10:00", doctor: "Dr. Emily Brown", status: "confirmed" },
];

// Format the date for display
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState("today");
  const [showPredictions, setShowPredictions] = useState(false);

  // Filter appointments based on the selected tab
  const filteredAppointments = mockAppointments.filter(appointment => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (filter === "today") {
      return appointment.date === today;
    } else if (filter === "tomorrow") {
      return appointment.date === tomorrowStr;
    } else if (filter === "upcoming") {
      return appointment.date > tomorrowStr;
    } else if (filter === "cancelled") {
      return appointment.status === "cancelled";
    }
    return true;
  });

  // Group appointments by date
  const appointmentsByDate = filteredAppointments.reduce((groups, appointment) => {
    const date = appointment.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(appointment);
    return groups;
  }, {} as Record<string, typeof mockAppointments>);

  const handleNewAppointment = () => {
    navigate("/appointment-scheduling");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments and scheduling</p>
        </div>
        <div className="flex space-x-2">
          {(user?.role === "admin" || user?.role === "doctor") && (
            <Button 
              variant="outline" 
              className={showPredictions ? "bg-healthcare-accent text-white" : ""}
              onClick={() => setShowPredictions(!showPredictions)}
            >
              <Bell className="mr-2 h-4 w-4" /> 
              {showPredictions ? "Hide Predictions" : "Show No-show Predictions"}
            </Button>
          )}
          <Button className="bg-healthcare-primary hover:bg-healthcare-accent" onClick={handleNewAppointment}>
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="today" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today" onClick={() => setFilter("today")}>Today</TabsTrigger>
          <TabsTrigger value="tomorrow" onClick={() => setFilter("tomorrow")}>Tomorrow</TabsTrigger>
          <TabsTrigger value="upcoming" onClick={() => setFilter("upcoming")}>Upcoming</TabsTrigger>
          <TabsTrigger value="cancelled" onClick={() => setFilter("cancelled")}>Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        {Object.keys(appointmentsByDate).length > 0 ? (
          Object.entries(appointmentsByDate).map(([date, appointments]) => (
            <div key={date} className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className={showPredictions ? "lg:col-span-3" : "lg:col-span-4"}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{formatDate(date)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-4 text-left font-medium text-gray-500">Time</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-500">Patient</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-500">Type</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-500">Provider</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                              <th className="py-3 px-4 text-left font-medium text-gray-500">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {appointments.map((appointment) => (
                              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-healthcare-primary" />
                                    {appointment.time}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                    {appointment.patient}
                                  </div>
                                </td>
                                <td className="py-3 px-4">{appointment.type}</td>
                                <td className="py-3 px-4">{appointment.doctor}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                      ${appointment.status === "confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : appointment.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                      }`}
                                  >
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" className="h-8">
                                      <FileText className="h-3 w-3 mr-1" /> Details
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8">
                                      <Calendar className="h-3 w-3 mr-1" /> Reschedule
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* No-Show Prediction Panel */}
                {showPredictions && (
                  <div className="lg:col-span-1">
                    <NoShowPrediction />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <Calendar className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500 mb-4">There are no appointments for the selected filter.</p>
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent" onClick={handleNewAppointment}>
              <Plus className="mr-2 h-4 w-4" /> New Appointment
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
