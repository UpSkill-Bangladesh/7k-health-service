
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FileText, CreditCard } from "lucide-react";

// For demo purposes - these would come from your backend in a real app
const dashboardStats = {
  todayAppointments: 24,
  weeklyAppointments: 147,
  totalPatients: 1254,
  pendingBills: 37,
  revenueThisMonth: 78650,
  insuranceClaimsPending: 45,
};

// Mock appointments for today
const todaysAppointments = [
  { time: "9:00 AM", patient: "Sarah Johnson", reason: "Annual Check-up", doctor: "Dr. Smith" },
  { time: "10:15 AM", patient: "Robert Williams", reason: "Follow-up", doctor: "Dr. Brown" },
  { time: "11:30 AM", patient: "Jennifer Lee", reason: "New Patient", doctor: "Dr. Smith" },
  { time: "1:00 PM", patient: "Michael Chen", reason: "Lab Results", doctor: "Dr. Rodriguez" },
  { time: "2:30 PM", patient: "Emily Davis", reason: "Vaccination", doctor: "Dr. Brown" },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-1">Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-healthcare-primary mr-2" />
              <span className="text-3xl font-bold">{dashboardStats.todayAppointments}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <CardDescription>
              {dashboardStats.weeklyAppointments} this week
            </CardDescription>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-healthcare-accent mr-2" />
              <span className="text-3xl font-bold">{dashboardStats.totalPatients}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <CardDescription>
              +12 new this week
            </CardDescription>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-healthcare-warning mr-2" />
              <span className="text-3xl font-bold">{dashboardStats.pendingBills}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <CardDescription>
              {formatCurrency(dashboardStats.revenueThisMonth)} this month
            </CardDescription>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Insurance Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-healthcare-primary mr-2" />
              <span className="text-3xl font-bold">{dashboardStats.insuranceClaimsPending}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <CardDescription>
              Pending approval
            </CardDescription>
          </CardFooter>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Time</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Patient</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Reason</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Provider</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {todaysAppointments.map((appointment, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{appointment.time}</td>
                    <td className="py-3 px-4">{appointment.patient}</td>
                    <td className="py-3 px-4">{appointment.reason}</td>
                    <td className="py-3 px-4">{appointment.doctor}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${index === 0 ? "bg-green-100 text-green-800" :
                          index === 1 ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}>
                        {index === 0 ? "Checked In" :
                          index === 1 ? "Waiting" : "Scheduled"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* HIPAA compliance reminder */}
      <div className="bg-blue-50 border-l-4 border-healthcare-primary p-4 mb-8 rounded-r">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-healthcare-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">HIPAA Compliance Reminder:</span> All patient information accessed through this portal is protected health information (PHI). Please ensure you follow all privacy protocols.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
