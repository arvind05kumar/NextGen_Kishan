import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentStep, setCurrentStep] = useState('login');
  const [language, setLanguage] = useState('english');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      currentStep,
      setCurrentStep,
      language,
      setLanguage,
      phoneNumber,
      setPhoneNumber
    }}>
      {children}
    </AuthContext.Provider>
  );
};