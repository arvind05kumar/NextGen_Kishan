import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, CreditCard, MapPin, Edit3, CheckCircle } from 'lucide-react';

const FarmerVerification: React.FC = () => {
  const { user, setUser, setCurrentStep } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [aadhaarDetails, setAadhaarDetails] = useState({
    name: '',
    address: '',
    aadhaarNumber: ''
  });
  const [editMode, setEditMode] = useState(false);

  const handleScanAadhaar = async () => {
    setScanning(true);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock Aadhaar data
    const mockData = {
      name: 'Rajesh Kumar',
      address: 'Village Kothpura, Post Saheli, Tehsil Dungarpur, District Dungarpur, Rajasthan - 314001',
      aadhaarNumber: '1234 5678 9012'
    };
    
    setAadhaarDetails(mockData);
    setScanning(false);
    setScanned(true);
  };

  const handleVerificationComplete = () => {
    if (user) {
      setUser({
        ...user,
        verified: true,
        name: aadhaarDetails.name,
        location: aadhaarDetails.address,
        aadhaarDetails
      });
      setCurrentStep('farmer-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#D2F2D4] py-6 px-3 sm:py-10 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-green-600 w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-md">
            <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5">Aadhaar Verification</h1>
          <p className="text-sm text-gray-600">Please scan your Aadhaar card for verification</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          {!scanned ? (
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 sm:p-8 mb-6">
                {scanning ? (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <Camera className="w-12 h-12 text-green-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Scanning Aadhaar...</h3>
                    <p className="text-gray-600">Please hold your Aadhaar card steady</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-24 h-24 mx-auto text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">Scan Aadhaar Card</h3>
                    <p className="text-gray-600">Tap to open camera and scan your Aadhaar card</p>
                    <button
                      onClick={handleScanAadhaar}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Start Scanning</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-600 mb-4">
                <CheckCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Aadhaar Scanned Successfully</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="text-green-700 hover:text-green-800 text-sm flex items-center space-x-1"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>{editMode ? 'Done' : 'Edit'}</span>
                    </button>
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      value={aadhaarDetails.name}
                      onChange={(e) => setAadhaarDetails({...aadhaarDetails, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{aadhaarDetails.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </label>
                  {editMode ? (
                    <textarea
                      value={aadhaarDetails.address}
                      onChange={(e) => setAadhaarDetails({...aadhaarDetails, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{aadhaarDetails.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg font-mono">{aadhaarDetails.aadhaarNumber}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  onClick={() => setScanned(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Scan Again
                </button>
                <button
                  onClick={handleVerificationComplete}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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

export default FarmerVerification;