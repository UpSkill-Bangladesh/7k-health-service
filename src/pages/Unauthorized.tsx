
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    if (user?.role === 'patient') {
      navigate('/patient-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-healthcare-light">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 rounded-full bg-red-100 p-6 text-red-500 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="mb-8 text-gray-600">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <Button onClick={handleGoBack} className="bg-healthcare-primary hover:bg-healthcare-accent">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
