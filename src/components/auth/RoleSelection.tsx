import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Tractor, FlaskConical, Truck, Heart, Stethoscope } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const { setUser, setCurrentStep } = useAuth();

  const roles = [
    {
      id: 'farmer',
      name: 'Farmer',
      description: 'Access soil testing, crop scanning, and veterinary services',
      icon: Tractor,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'lab',
      name: 'Lab Technician',
      description: 'Process soil and crop test requests',
      icon: FlaskConical,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'driver',
      name: 'Driver',
      description: 'Handle transport requests for animals and harvest',
      icon: Truck,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'ngo',
      name: 'NGO Worker',
      description: 'Provide support and emergency assistance',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'vet',
      name: 'Veterinarian',
      description: 'Provide animal healthcare and treatment services',
      icon: Stethoscope,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleRoleSelect = (role: any) => {
    setUser({
      phone: '9876543210', // This would come from the previous step
      role: role.id as any,
      verified: false
    });
    
    if (role.id === 'farmer') {
      setCurrentStep('farmer-verification');
    } else {
      setCurrentStep('professional-verification');
    }
  };

  return (
    <div className="min-h-screen bg-[#D2F2D4] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Role</h1>
          <p className="text-gray-600">Choose how you want to use NextGen किसान</p>
        </div>

        <div className="space-y-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 text-left w-full"
              >
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                      {role.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                  <div className="ml-4 text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentStep('login')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;