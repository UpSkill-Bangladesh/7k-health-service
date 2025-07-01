
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Shield, AlertCircle } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    if (user?.role === 'doctor') {
      navigate('/provider-dashboard');
    } else if (user?.role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-healthcare-light">
      <div className="mx-auto max-w-md text-center p-6 bg-white rounded-xl shadow-lg">
        <div className="mb-6 rounded-full bg-red-100 p-6 text-red-500 inline-block">
          <AlertCircle className="h-12 w-12" />
        </div>
        
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="mb-8 text-gray-600">
          You don't have permission to access this page. Your current role ({user?.role}) 
          doesn't have the necessary privileges. This restriction is in place to ensure 
          HIPAA compliance and data security.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button onClick={handleGoBack} className="bg-healthcare-primary hover:bg-healthcare-accent">
            Return to Dashboard
          </Button>
          <Button onClick={() => navigate('/login')} variant="outline" className="border-healthcare-primary text-healthcare-primary">
            Switch Account
          </Button>
        </div>

        <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-500 flex items-center justify-center">
          <Shield className="h-5 w-5 mr-2 text-healthcare-primary" />
          <span>This application enforces role-based access control for HIPAA compliance</span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
