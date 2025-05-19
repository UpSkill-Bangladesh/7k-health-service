
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
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

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Admin routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                {/* Doctor routes */}
                <Route path="/provider-dashboard" element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                <Route path="/appointments" element={
                  <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                    <Appointments />
                  </ProtectedRoute>
                } />

                <Route path="/appointment-scheduling" element={
                  <ProtectedRoute allowedRoles={["admin", "doctor", "patient"]}>
                    <AppointmentScheduling />
                  </ProtectedRoute>
                } />

                <Route path="/patient-registration" element={
                  <ProtectedRoute allowedRoles={["admin", "doctor", "patient"]}>
                    <PatientRegistration />
                  </ProtectedRoute>
                } />

                <Route path="/patient-billing" element={
                  <ProtectedRoute allowedRoles={["admin", "patient"]}>
                    <PatientBilling />
                  </ProtectedRoute>
                } />

                {/* Patient routes */}
                <Route path="/patient-dashboard" element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <PatientDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Redirect /patients to the appropriate page based on user role */}
                <Route path="/patients" element={<Navigate to="/patient-dashboard" replace />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
