import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RoleSelection from './components/auth/RoleSelection';
import FarmerVerification from './components/verification/FarmerVerification';
import ProfessionalVerification from './components/verification/ProfessionalVerification';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import LabDashboard from './components/services/LabDashboard';
import VetDashboard from './components/services/VetDashboard';
import DriverDashboard from './components/services/DriverDashboard';
import NGODashboard from './components/services/NGODashboard';

const AppContent: React.FC = () => {
  const { user, currentStep } = useAuth();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return <LoginPage />;
      case 'role-selection':
        return <RoleSelection />;
      case 'farmer-verification':
        return <FarmerVerification />;
      case 'professional-verification':
        return <ProfessionalVerification />;
      case 'farmer-dashboard':
        return <FarmerDashboard />;
      case 'lab-dashboard':
        return <LabDashboard />;
      case 'vet-dashboard':
        return <VetDashboard />;
      case 'driver-dashboard':
        return <DriverDashboard />;
      case 'ngo-dashboard':
        return <NGODashboard />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#D2F2D4]">
      <Navbar />
      {renderCurrentStep()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;