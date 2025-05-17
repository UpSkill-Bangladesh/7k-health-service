
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import PatientLayout from "../components/layouts/PatientLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, CreditCard, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

// For demo purposes - these would come from your backend in a real app
const patientInfo = {
  nextAppointment: {
    date: "May 24, 2023",
    time: "2:30 PM",
    doctor: "Dr. Sarah Smith",
    type: "Follow-up Consultation"
  },
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" }
  ],
  recentTests: [
    { name: "Complete Blood Count", date: "Apr 15, 2023", status: "Completed" },
    { name: "Lipid Panel", date: "Apr 15, 2023", status: "Completed" }
  ],
  billingInfo: {
    nextPayment: 75.00,
    dueDate: "Jun 1, 2023",
    insuranceInfo: "UnitedHealth - PPO Plan",
    deductibleMet: "$750/$1500"
  }
};

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <PatientLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-1">Here's your health summary.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Next Appointment Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Next Appointment</CardTitle>
              <CardDescription>Scheduled appointment details</CardDescription>
            </div>
            <Calendar className="h-6 w-6 text-healthcare-primary" />
          </CardHeader>
          <CardContent>
            {patientInfo.nextAppointment ? (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Date & Time:</span>
                  <span className="font-medium">{patientInfo.nextAppointment.date} at {patientInfo.nextAppointment.time}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Provider:</span>
                  <span className="font-medium">{patientInfo.nextAppointment.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">{patientInfo.nextAppointment.type}</span>
                </div>
              </div>
            ) : (
              <p>No upcoming appointments scheduled.</p>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              onClick={() => navigate('/patient-appointments')}
              className="bg-healthcare-primary hover:bg-healthcare-accent"
            >
              View All Appointments
            </Button>
          </CardFooter>
        </Card>

        {/* Billing Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Your payment and insurance details</CardDescription>
            </div>
            <CreditCard className="h-6 w-6 text-healthcare-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Next Payment:</span>
              <span className="font-medium">{formatCurrency(patientInfo.billingInfo.nextPayment)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Due Date:</span>
              <span className="font-medium">{patientInfo.billingInfo.dueDate}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Insurance:</span>
              <span className="font-medium">{patientInfo.billingInfo.insuranceInfo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Deductible Met:</span>
              <span className="font-medium">{patientInfo.billingInfo.deductibleMet}</span>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              onClick={() => navigate('/patient-billing')}
              className="bg-healthcare-primary hover:bg-healthcare-accent"
            >
              Make a Payment
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Medical Information */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Medications</CardTitle>
            <CardDescription>Current prescribed medications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Medication</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Dosage</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {patientInfo.medications.map((med, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{med.name}</td>
                      <td className="py-3 px-4">{med.dosage}</td>
                      <td className="py-3 px-4">{med.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              onClick={() => navigate('/patient-records')}
              variant="outline"
            >
              View All Medical Records
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-healthcare-light border-healthcare-primary border">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Calendar className="h-10 w-10 text-healthcare-primary mb-3" />
              <h3 className="font-medium mb-2">Schedule Appointment</h3>
              <p className="text-sm text-gray-500 mb-4">Book your next visit with our providers</p>
              <Button className="bg-healthcare-primary" onClick={() => navigate('/patient-appointments')}>
                Schedule Now
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-healthcare-light border-healthcare-primary border">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-healthcare-primary mb-3" />
              <h3 className="font-medium mb-2">Request Records</h3>
              <p className="text-sm text-gray-500 mb-4">Access or request your medical records</p>
              <Button className="bg-healthcare-primary" onClick={() => navigate('/patient-records')}>
                View Records
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-healthcare-light border-healthcare-primary border">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Phone className="h-10 w-10 text-healthcare-primary mb-3" />
              <h3 className="font-medium mb-2">Telehealth Visit</h3>
              <p className="text-sm text-gray-500 mb-4">Connect with your provider virtually</p>
              <Button className="bg-healthcare-primary" onClick={() => navigate('/patient-telehealth')}>
                Start Visit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border-l-4 border-healthcare-primary p-4 mb-8 rounded-r">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-healthcare-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">Privacy Notice:</span> Your health information is protected under HIPAA. For questions about your privacy rights, please contact our privacy officer.
            </p>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
