import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, FileText, CheckCircle, Award } from 'lucide-react';

const ProfessionalVerification: React.FC = () => {
  const { user, setUser, setCurrentStep } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [professionalDetails, setProfessionalDetails] = useState({
    name: '',
    license: '',
    specialization: ''
  });

  const getRoleDetails = () => {
    switch (user?.role) {
      case 'lab':
        return {
          title: 'Laboratory License',
          description: 'Scan your laboratory registration certificate',
          fields: { specialization: 'Laboratory Type' }
        };
      case 'vet':
        return {
          title: 'Veterinary License',
          description: 'Scan your veterinary practice license',
          fields: { specialization: 'Specialization' }
        };
      case 'driver':
        return {
          title: 'Commercial License',
          description: 'Scan your commercial driving license',
          fields: { specialization: 'Vehicle Type' }
        };
      case 'ngo':
        return {
          title: 'NGO Registration',
          description: 'Scan your NGO registration certificate',
          fields: { specialization: 'Focus Area' }
        };
      default:
        return {
          title: 'Professional Document',
          description: 'Scan your professional certificate',
          fields: { specialization: 'Specialization' }
        };
    }
  };

  const handleScanDocument = async () => {
    setScanning(true);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock professional data based on role
    const mockData = {
      name: 'Dr. Priya Sharma',
      license: `${user?.role?.toUpperCase()}123456789`,
      specialization: user?.role === 'vet' ? 'Livestock Medicine' : 
                    user?.role === 'lab' ? 'Soil Analysis' :
                    user?.role === 'driver' ? 'Heavy Vehicles' : 'Rural Development'
    };
    
    setProfessionalDetails(mockData);
    setScanning(false);
    setScanned(true);
  };

  const handleVerificationComplete = () => {
    if (user) {
      setUser({
        ...user,
        verified: true,
        name: professionalDetails.name,
        professionalDetails
      });
      setCurrentStep(`${user.role}-dashboard`);
    }
  };

  const roleDetails = getRoleDetails();

  return (
    <div className="min-h-screen bg-[#D2F2D4] py-6 px-3 sm:py-10 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-green-600 w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-md">
            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Professional Verification</h1>
          <p className="text-sm sm:text-base text-gray-600">{roleDetails.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          {!scanned ? (
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 mb-6">
                {scanning ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 animate-pulse" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Scanning Document...</h3>
                    <p className="text-sm text-gray-600">Please hold your {roleDetails.title.toLowerCase()} steady</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <FileText className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-400" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Scan {roleDetails.title}</h3>
                    <p className="text-sm text-gray-600">Tap to open camera and scan your professional document</p>
                    <button
                      onClick={handleScanDocument}
                      className="bg-green-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto text-sm sm:text-base"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Start Scanning</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center space-x-2 text-green-600 mb-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Document Scanned Successfully</h3>
              </div>

              <div className="space-y-4 text-sm sm:text-base">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Professional Name</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{professionalDetails.name}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">License Number</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg font-mono">{professionalDetails.license}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">{roleDetails.fields.specialization}</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{professionalDetails.specialization}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
                <button
                  onClick={() => setScanned(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Scan Again
                </button>
                <button
                  onClick={handleVerificationComplete}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Complete Verification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalVerification;