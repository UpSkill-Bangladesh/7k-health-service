
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

const AppointmentScheduling: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("calendar");
  
  // Use our custom hook for appointment management
  const appointmentManager = useAppointmentManagement(user);
  const availableTabs = appointmentManager.getAvailableTabs();

  // Set default tab based on user role
  React.useEffect(() => {
    if (user?.role === "patient") {
      // For patients, we default to calendar view to let them book
      setActiveTab("calendar");
    }
  }, [user]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-healthcare-primary to-healthcare-accent bg-clip-text text-transparent mb-6">
          {user?.role === "admin" ? "Appointment Management" :
           user?.role === "doctor" ? "My Schedule" :
           "Schedule an Appointment"}
        </h1>
        
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
    </DashboardLayout>
  );
};

export default AppointmentScheduling;
