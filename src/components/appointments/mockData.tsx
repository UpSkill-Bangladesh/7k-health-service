
import { Provider } from "./ProviderSelector";
import { Location } from "./LocationSelector";
import { AppointmentType } from "./AppointmentTypeSelector";

// Mock data for providers
export const mockProviders: Provider[] = [
  { id: "1", name: "Dr. James Smith", specialty: "Cardiology", location: "Main Hospital", availableDays: [1, 2, 3] },
  { id: "2", name: "Dr. Emily Brown", specialty: "Neurology", location: "North Clinic", availableDays: [2, 3, 4] },
  { id: "3", name: "Dr. Maria Rodriguez", specialty: "Family Medicine", location: "South Clinic", availableDays: [0, 4, 5] },
  { id: "4", name: "Dr. Robert Johnson", specialty: "Dermatology", location: "West Medical Center", availableDays: [1, 3, 5] },
  { id: "5", name: "Dr. Sarah Wilson", specialty: "Pediatrics", location: "Children's Hospital", availableDays: [0, 1, 4] },
  { id: "6", name: "Dr. Michael Chen", specialty: "Orthopedics", location: "Sports Medicine Center", availableDays: [2, 3, 5] },
  { id: "7", name: "Dr. Olivia Taylor", specialty: "Obstetrics & Gynecology", location: "Women's Health Center", availableDays: [1, 2, 4] },
  { id: "8", name: "Dr. David Garcia", specialty: "Psychiatry", location: "Mental Health Clinic", availableDays: [0, 3, 5] },
];

// Mock data for locations
export const mockLocations: Location[] = [
  { id: "1", name: "Main Hospital", address: "123 Main Street, Cityville" },
  { id: "2", name: "North Clinic", address: "456 North Avenue, Townsville" },
  { id: "3", name: "South Clinic", address: "789 South Boulevard, Villageton" },
  { id: "4", name: "West Medical Center", address: "321 West Road, Boroughford" },
  { id: "5", name: "Children's Hospital", address: "555 Pediatric Lane, Kidstown" },
  { id: "6", name: "Sports Medicine Center", address: "777 Athletic Drive, Sportsville" },
  { id: "7", name: "Women's Health Center", address: "888 Wellness Way, Careville" },
  { id: "8", name: "Mental Health Clinic", address: "999 Mindful Street, Peacetown" },
];

// Mock data for appointment types
export const mockAppointmentTypes: AppointmentType[] = [
  { id: "1", name: "New Patient Consultation", duration: 60, description: "Initial consultation for new patients" },
  { id: "2", name: "Follow-up Visit", duration: 30, description: "Regular follow-up appointment" },
  { id: "3", name: "Annual Exam", duration: 45, description: "Yearly comprehensive examination" },
  { id: "4", name: "Urgent Care", duration: 30, description: "Immediate care for non-emergency issues" },
  { id: "5", name: "Specialist Consultation", duration: 60, description: "Consultation with a specialist" },
  { id: "6", name: "Vaccination", duration: 15, description: "Quick appointment for vaccinations" },
  { id: "7", name: "Physical Therapy", duration: 45, description: "Rehabilitation and physical therapy session" },
  { id: "8", name: "Telehealth Consultation", duration: 30, description: "Virtual appointment via video call" },
  { id: "9", name: "Mental Health Session", duration: 50, description: "Counseling or therapy session" },
  { id: "10", name: "Prenatal Check-up", duration: 40, description: "Regular monitoring for expectant mothers" },
];

// Mock data for available time slots
export const mockTimeSlots: string[] = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

// Mock data for booked appointments
export interface AppointmentData {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  locationId: string;
  date: string;
  time: string;
  typeId: string;
  status: string;
  notes?: string;
}

export const mockBookedAppointments: AppointmentData[] = [
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
