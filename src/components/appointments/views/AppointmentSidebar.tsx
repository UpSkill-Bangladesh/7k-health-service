
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";
import { format } from "date-fns";
import ProviderSelector, { Provider } from "../ProviderSelector";
import LocationSelector, { Location } from "../LocationSelector";
import AppointmentTypeSelector, { AppointmentType } from "../AppointmentTypeSelector";

interface AppointmentSidebarProps {
  providers: Provider[];
  locations: Location[];
  appointmentTypes: AppointmentType[];
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedAppointmentType: string;
  setSelectedAppointmentType: (type: string) => void;
  selectedDate: Date | undefined;
  userRole?: UserRole;
  calendarView: 'day' | 'week' | 'month';
}

const AppointmentSidebar: React.FC<AppointmentSidebarProps> = ({
  providers,
  locations,
  appointmentTypes,
  selectedProvider,
  setSelectedProvider,
  selectedLocation,
  setSelectedLocation,
  selectedAppointmentType,
  setSelectedAppointmentType,
  selectedDate,
  userRole,
  calendarView
}) => {
  const isAdmin = userRole === "admin";
  const isDoctor = userRole === "doctor";
  const isPatient = userRole === "patient";

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
    <div className="space-y-4">
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
              providers={providers} 
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
                locations={locations}
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
              appointmentTypes={appointmentTypes}
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
  );
};

// Add missing imports
import { startOfWeek, addDays } from "date-fns";

export default AppointmentSidebar;
