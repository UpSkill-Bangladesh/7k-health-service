
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to login page
  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-healthcare-light">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-healthcare-primary mx-auto"></div>
        <h1 className="mt-4 text-xl font-bold text-gray-900">Loading HealthProvide...</h1>
      </div>
    </div>
  );
};

export default Index;
