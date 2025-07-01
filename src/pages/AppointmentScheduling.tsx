
import React, { useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { TabsContent } from "@/components/ui/tabs";
import { useAuth } from "../contexts/AuthContext";
import AppointmentListView from "@/components/appointments/AppointmentListView";
import AppointmentHistoryView from "@/components/appointments/AppointmentHistoryView";
import CalendarIntegrationDialog from "@/components/appointments/dialogs/CalendarIntegrationDialog";
import CancelAppointmentDialog from "@/components/appointments/dialogs/CancelAppointmentDialog";
import RescheduleAppointmentDialog from "@/components/appointments/dialogs/RescheduleAppointmentDialog";
import { mockProviders, mockLocations, mockAppointmentTypes } from "@/components/appointments/mockData";
import AppointmentTabs from "@/components/appointments/AppointmentTabs";
import CalendarTabContent from "@/components/appointments/tabs/CalendarTabContent";
import { useAppointmentManagement } from "@/hooks/useAppointmentManagement";
import PatientSelector, { Patient } from "@/components/appointments/PatientSelector";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock patients data for the admin view
const mockPatients: Patient[] = [
  {
    id: "P12345",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567"
  },
  {
    id: "P12346",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@example.com",
    phone: "555-234-5678"
  },
  {
    id: "P12347",
    firstName: "Robert",
    lastName: "Williams",
    email: "rob.williams@example.com",
    phone: "555-345-6789"
  },
  {
    id: "P12348",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "555-456-7890"
  }
];

const AppointmentScheduling: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false);
  
  // Use our custom hook for appointment management
  const appointmentManager = useAppointmentManagement(user);
  const availableTabs = appointmentManager.getAvailableTabs();

  // Function to handle adding a new patient directly from the appointment form
  const handleAddPatientClick = () => {
    setIsAddPatientDialogOpen(true);
  };

  // Function to handle quick patient creation and selection
  const handleQuickAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to create the patient
    // For demo purposes, we'll just close the dialog
    setIsAddPatientDialogOpen(false);
    
    // And select the new patient (simulated)
    const newPatient: Patient = {
      id: `P${Math.floor(10000 + Math.random() * 90000)}`,
      firstName: "New",
      lastName: "Patient",
      email: "newpatient@example.com"
    };
    
    setSelectedPatient(newPatient);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-healthcare-primary to-healthcare-accent bg-clip-text text-transparent mb-6">
          {user?.role === "admin" ? "Appointment Management" :
           user?.role === "doctor" ? "My Schedule" :
           "Schedule an Appointment"}
        </h1>
        
        {/* Patient Selector for Admin/Doctor - Only show for admin or doctor roles */}
        {(user?.role === "admin" || user?.role === "doctor") && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-medium mb-2">Patient Selection</h2>
                <PatientSelector 
                  patients={mockPatients}
                  selectedPatient={selectedPatient}
                  setSelectedPatient={setSelectedPatient}
                />
                {selectedPatient && (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Email: {selectedPatient.email}</p>
                    {selectedPatient.phone && <p>Phone: {selectedPatient.phone}</p>}
                  </div>
                )}
              </div>
              <Button onClick={handleAddPatientClick}>
                <Plus className="mr-1 h-4 w-4" /> Add New Patient
              </Button>
            </div>
          </div>
        )}
        
        <AppointmentTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          availableTabs={availableTabs}
        >
          <TabsContent value="calendar" className="space-y-6">
            <CalendarTabContent 
              mockProviders={mockProviders}
              mockLocations={mockLocations}
              mockAppointmentTypes={mockAppointmentTypes}
              selectedDate={appointmentManager.selectedDate}
              setSelectedDate={appointmentManager.setSelectedDate}
              selectedProvider={appointmentManager.selectedProvider}
              setSelectedProvider={appointmentManager.setSelectedProvider}
              selectedLocation={appointmentManager.selectedLocation}
              setSelectedLocation={appointmentManager.setSelectedLocation}
              selectedAppointmentType={appointmentManager.selectedAppointmentType}
              setSelectedAppointmentType={appointmentManager.setSelectedAppointmentType}
              selectedTimeSlot={appointmentManager.selectedTimeSlot}
              setSelectedTimeSlot={appointmentManager.setSelectedTimeSlot}
              appointmentNotes={appointmentManager.appointmentNotes}
              setAppointmentNotes={appointmentManager.setAppointmentNotes}
              appointmentReminder={appointmentManager.appointmentReminder}
              setAppointmentReminder={appointmentManager.setAppointmentReminder}
              dialogOpen={appointmentManager.dialogOpen}
              setDialogOpen={appointmentManager.setDialogOpen}
              handleBookAppointment={appointmentManager.handleBookAppointment}
              getDisabledDays={appointmentManager.getDisabledDays}
              getAvailableTimeSlots={appointmentManager.getAvailableTimeSlots}
              setCalendarIntegrationOpen={appointmentManager.setCalendarIntegrationOpen}
              user={user}
              // Pass the selected patient to the calendar content
              selectedPatient={selectedPatient}
            />
          </TabsContent>
          
          <TabsContent value="list">
            <AppointmentListView 
              myAppointments={appointmentManager.myAppointments}
              mockProviders={mockProviders}
              mockLocations={mockLocations}
              mockAppointmentTypes={mockAppointmentTypes}
              handleRescheduleAppointment={appointmentManager.handleRescheduleAppointment}
              handleCancelAppointment={appointmentManager.handleCancelAppointment}
              user={user}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <AppointmentHistoryView />
          </TabsContent>
        </AppointmentTabs>
      </div>

      {/* Dialogs */}
      <CancelAppointmentDialog 
        open={appointmentManager.cancelDialogOpen}
        onOpenChange={appointmentManager.setCancelDialogOpen}
        confirmCancelAppointment={appointmentManager.confirmCancelAppointment}
      />

      <RescheduleAppointmentDialog 
        open={appointmentManager.rescheduleDialogOpen}
        onOpenChange={appointmentManager.setRescheduleDialogOpen}
        selectedDate={appointmentManager.selectedDate}
        onSelectDate={appointmentManager.setSelectedDate}
        selectedTimeSlot={appointmentManager.selectedTimeSlot}
        onSelectTimeSlot={appointmentManager.setSelectedTimeSlot}
        getDisabledDays={appointmentManager.getDisabledDays}
        getAvailableTimeSlots={appointmentManager.getAvailableTimeSlots}
        confirmRescheduleAppointment={appointmentManager.confirmRescheduleAppointment}
      />

      <CalendarIntegrationDialog 
        open={appointmentManager.calendarIntegrationOpen}
        onOpenChange={appointmentManager.setCalendarIntegrationOpen}
        handleCalendarIntegration={appointmentManager.handleCalendarIntegration}
      />

      {/* Quick Add Patient Dialog */}
      <Dialog open={isAddPatientDialogOpen} onOpenChange={setIsAddPatientDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Add basic patient information. You can complete their profile later.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleQuickAddPatient}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className="w-full p-2 border rounded-md"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="w-full p-2 border rounded-md"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  className="w-full p-2 border rounded-md"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddPatientDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add & Select</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AppointmentScheduling;
