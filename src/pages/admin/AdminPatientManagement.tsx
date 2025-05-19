
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';

// Mock patient data type 
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string; // in ISO format
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: string;
  insuranceProvider: string;
  insuranceMemberId: string;
  registeredDate: string; // in ISO format
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes?: string;
}

// Mock patients data
const mockPatients: Patient[] = [
  {
    id: "P12345",
    firstName: "John",
    lastName: "Doe",
    dob: "1985-05-15",
    gender: "male",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, US 12345",
    insuranceProvider: "Blue Cross",
    insuranceMemberId: "BC98765432",
    registeredDate: "2023-01-15",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "555-987-6543"
    },
    notes: "Has history of high blood pressure."
  },
  {
    id: "P12346",
    firstName: "Sarah",
    lastName: "Johnson",
    dob: "1990-08-22",
    gender: "female",
    email: "sarah.j@example.com",
    phone: "555-234-5678",
    address: "456 Elm St, Somewhere, US 54321",
    insuranceProvider: "United Health",
    insuranceMemberId: "UH12345678",
    registeredDate: "2023-02-20",
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Brother",
      phone: "555-876-5432"
    }
  },
  {
    id: "P12347",
    firstName: "Robert",
    lastName: "Williams",
    dob: "1975-11-30",
    gender: "male",
    email: "rob.williams@example.com",
    phone: "555-345-6789",
    address: "789 Oak St, Nowhere, US 67890",
    insuranceProvider: "Aetna",
    insuranceMemberId: "AE54321678",
    registeredDate: "2023-03-05"
  }
];

// Mock API calls
const fetchPatients = async (): Promise<Patient[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPatients;
};

const PatientManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  // Fetch patients data
  const { data: patients, isLoading, isError } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients
  });

  // Filter patients based on search query
  const filteredPatients = patients?.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           patient.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           patient.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Function to open add/edit patient dialog
  const handleOpenPatientForm = (patient?: Patient) => {
    if (patient) {
      setCurrentPatient(patient);
    } else {
      setCurrentPatient(null);
    }
    setIsAddPatientOpen(true);
  };

  // Function to handle patient deletion
  const handleDeletePatient = (patient: Patient) => {
    // In a real app, this would call an API to delete the patient
    toast({
      title: "Patient Deleted",
      description: `${patient.firstName} ${patient.lastName} has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Patient Management</h1>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search patients..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button onClick={() => handleOpenPatientForm()}>
              <Plus className="mr-1 h-4 w-4" /> Add Patient
            </Button>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">Loading patients...</div>
          ) : isError ? (
            <div className="p-8 text-center text-red-500">Error loading patient data</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>List of all registered patients</TableCaption>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No patients found matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients?.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>
                          {patient.firstName} {patient.lastName}
                        </TableCell>
                        <TableCell>
                          {format(new Date(patient.dob), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="capitalize">{patient.gender}</TableCell>
                        <TableCell>
                          <div>{patient.email}</div>
                          <div className="text-sm text-gray-500">{patient.phone}</div>
                        </TableCell>
                        <TableCell>{patient.insuranceProvider}</TableCell>
                        <TableCell>
                          {format(new Date(patient.registeredDate), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenPatientForm(patient)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePatient(patient)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Add/Edit Patient Dialog */}
        <PatientForm 
          isOpen={isAddPatientOpen}
          onClose={() => setIsAddPatientOpen(false)}
          patient={currentPatient}
        />
      </div>
    </DashboardLayout>
  );
};

// Patient Form Component
interface PatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

const PatientForm: React.FC<PatientFormProps> = ({ isOpen, onClose, patient }) => {
  const { toast } = useToast();
  const isEditMode = !!patient;
  
  // Form state would be handled by a form library like react-hook-form in a real app
  // For simplicity, we'll just show the form fields here
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate and submit to an API
    
    toast({
      title: isEditMode ? "Patient Updated" : "Patient Added",
      description: isEditMode 
        ? `${patient.firstName} ${patient.lastName}'s information has been updated.`
        : "New patient has been added successfully.",
    });
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Patient" : "Add New Patient"}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update the patient's information below."
              : "Fill in the patient details to add them to your system."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  defaultValue={patient?.firstName || ""} 
                  placeholder="First Name"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  defaultValue={patient?.lastName || ""} 
                  placeholder="Last Name"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob" 
                  type="date" 
                  defaultValue={patient?.dob || ""} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select defaultValue={patient?.gender || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Contact Information Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={patient?.email || ""} 
                  placeholder="patient@example.com"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  defaultValue={patient?.phone || ""} 
                  placeholder="555-123-4567"
                  required 
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  defaultValue={patient?.address || ""} 
                  placeholder="Full address"
                  required 
                />
              </div>
            </div>
          </div>
          
          {/* Insurance Information Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Insurance Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuranceProvider">Provider</Label>
                <Input 
                  id="insuranceProvider" 
                  defaultValue={patient?.insuranceProvider || ""} 
                  placeholder="Insurance Provider"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="insuranceMemberId">Member ID</Label>
                <Input 
                  id="insuranceMemberId" 
                  defaultValue={patient?.insuranceMemberId || ""} 
                  placeholder="Member ID"
                  required 
                />
              </div>
            </div>
          </div>
          
          {/* Emergency Contact Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Emergency Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName">Name</Label>
                <Input 
                  id="emergencyName" 
                  defaultValue={patient?.emergencyContact?.name || ""} 
                  placeholder="Emergency Contact Name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyRelationship">Relationship</Label>
                <Input 
                  id="emergencyRelationship" 
                  defaultValue={patient?.emergencyContact?.relationship || ""} 
                  placeholder="Relationship"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Phone</Label>
                <Input 
                  id="emergencyPhone" 
                  defaultValue={patient?.emergencyContact?.phone || ""} 
                  placeholder="Emergency Contact Phone"
                />
              </div>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Additional Notes</h3>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea 
                id="notes" 
                defaultValue={patient?.notes || ""} 
                placeholder="Additional patient notes..."
                className="w-full h-20 px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Add Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientManagement;
