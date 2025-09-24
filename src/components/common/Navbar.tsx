import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, setUser, setCurrentStep } = useAuth();

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('login');
  };

  if (!user) return null;

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'farmer': return 'Farmer';
      case 'lab': return 'Lab Technician';
      case 'driver': return 'Driver';
      case 'ngo': return 'NGO Worker';
      case 'vet': return 'Veterinarian';
      default: return role;
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-green-700">NextGen किसान</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{getRoleDisplay(user.role)}</span>
            </div>
            {user.location && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Welcome, {user.name || user.phone}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;