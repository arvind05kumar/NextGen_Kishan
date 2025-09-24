import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TestTube2, Stethoscope, Camera, Truck, ArrowRight } from 'lucide-react';
import SoilCropTestModal from './modals/SoilCropTestModal';
import VetServiceModal from './modals/VetServiceModal';
import CropScanningModal from './modals/CropScanningModal';
import TransportModal from './modals/TransportModal';

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const services = [
    {
      id: 'soil-crop-test',
      title: 'Soil & Crop Test',
      description: 'Get your soil analyzed and crop health checked by certified laboratories',
      icon: TestTube2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'vet-service',
      title: 'Veterinary Services',
      description: 'Home veterinary services for your livestock health and treatment',
      icon: Stethoscope,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
    },
    {
      id: 'crop-scanning',
      title: 'Crop Scanning',
      description: 'Upload crop images for health analysis and disease detection',
      icon: Camera,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 'transport',
      title: 'Transport Services',
      description: 'Book transport for your harvest and agricultural equipment',
      icon: Truck,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    setActiveModal(serviceId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#D2F2D4]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Access all agricultural services from your dashboard
            </p>
            <div className="mt-3 text-sm text-gray-500">
              📍 {user?.location}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
              >
                <div className="p-6">
                  <div className={`${service.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-emerald-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Soil test request submitted - Lab processing</span>
                <span className="text-sm text-gray-500 ml-auto">2 days ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-700">Veterinary service completed - Dr. Priya visited</span>
                <span className="text-sm text-gray-500 ml-auto">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'soil-crop-test' && <SoilCropTestModal onClose={closeModal} />}
      {activeModal === 'vet-service' && <VetServiceModal onClose={closeModal} />}
      {activeModal === 'crop-scanning' && <CropScanningModal onClose={closeModal} />}
      {activeModal === 'transport' && <TransportModal onClose={closeModal} />}
    </div>
  );
};

export default FarmerDashboard;