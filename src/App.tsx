
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Appointments from "./pages/Appointments";
import AppointmentScheduling from "./pages/AppointmentScheduling";
import PatientRegistration from "./pages/PatientRegistration";
import PatientBilling from "./pages/PatientBilling";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Create the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Admin routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Staff routes */}
            <Route path="/staff-dashboard" element={
              <ProtectedRoute allowedRoles={["frontOffice", "backOffice"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Clinical Staff routes */}
            <Route path="/provider-dashboard" element={
              <ProtectedRoute allowedRoles={["clinicalStaff"]}>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/appointments" element={
              <ProtectedRoute allowedRoles={["admin", "frontOffice", "clinicalStaff"]}>
                <Appointments />
              </ProtectedRoute>
            } />

            <Route path="/appointment-scheduling" element={
              <ProtectedRoute allowedRoles={["admin", "frontOffice", "clinicalStaff", "patient"]}>
                <AppointmentScheduling />
              </ProtectedRoute>
            } />

            <Route path="/patient-registration" element={
              <ProtectedRoute allowedRoles={["admin", "frontOffice", "patient"]}>
                <PatientRegistration />
              </ProtectedRoute>
            } />

            <Route path="/patient-billing" element={
              <ProtectedRoute allowedRoles={["admin", "frontOffice", "backOffice", "patient"]}>
                <PatientBilling />
              </ProtectedRoute>
            } />

            {/* Patient routes */}
            <Route path="/patient-dashboard" element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            } />

            {/* Home route redirects based on role */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
