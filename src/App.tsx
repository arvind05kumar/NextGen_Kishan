import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import CircleEntryAnimation from './components/common/CircleEntryAnimation';
import LoginPage from './components/auth/LoginPage';
import RoleSelection from './components/auth/RoleSelection';
import FarmerVerification from './components/verification/FarmerVerification';
import ProfessionalVerification from './components/verification/ProfessionalVerification';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import LabDashboard from './components/services/LabDashboard';
import VetDashboard from './components/services/VetDashboard';
import DriverDashboard from './components/services/DriverDashboard';
import NGODashboard from './components/services/NGODashboard';

import BhoomiAIChat from './components/farmer/BhoomiAIChat';
import { Bot } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentStep, language } = useAuth();
  const [showIntro, setShowIntro] = useState(true);
  const [isBhoomiOpen, setIsBhoomiOpen] = useState(false);

  const isDashboard = currentStep.endsWith('-dashboard');

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
    <>
      {showIntro && (
        <CircleEntryAnimation onComplete={() => setShowIntro(false)} />
      )}
      <div
        className={`min-h-screen w-full overflow-x-hidden ${
          currentStep === 'login' ? 'bg-[#06180c]' : 'bg-[#D2F2D4]'
        } ${!showIntro ? 'animate-page-reveal' : ''}`}
      >
        <Navbar />
        {renderCurrentStep()}
      </div>

      {/* Global Floating Bhoomi AI Assistant Button (Fixed to Viewport Bottom-Right) */}
      {isDashboard && (
        <>
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 9990,
              pointerEvents: 'auto',
            }}
          >
            <button
              id="bhoomi-ai-global-floating-btn"
              type="button"
              onClick={() => setIsBhoomiOpen(prev => !prev)}
              className="flex items-center gap-2 px-4 py-3 rounded-full text-white font-bold text-xs sm:text-sm shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all border border-white/50"
              style={{
                background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
                boxShadow: '0 8px 30px rgba(22, 163, 74, 0.45)',
              }}
              title="Bhoomi AI Digital Farming Assistant"
            >
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4 text-green-700" />
              </div>
              <span className="hidden sm:inline">Bhoomi AI</span>
              <span className="bg-white/20 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold">
                {language === 'hindi' ? 'भूमि AI' : language === 'regional' ? 'ਭੂਮੀ AI' : 'Ask AI'}
              </span>
            </button>
          </div>

          {/* Floating Bhoomi AI Chat Window */}
          <BhoomiAIChat
            isOpen={isBhoomiOpen}
            onClose={() => setIsBhoomiOpen(false)}
          />
        </>
      )}
    </>
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