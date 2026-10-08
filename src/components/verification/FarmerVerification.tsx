import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, CreditCard, MapPin, Edit3, CheckCircle, Globe, ArrowLeft } from 'lucide-react';

const verificationTexts = {
  english: {
    title: 'Aadhaar Verification',
    subtitle: 'Please scan your Aadhaar card for instant verification',
    scanningTitle: 'Scanning Aadhaar...',
    scanningDesc: 'Please hold your Aadhaar card steady in front of the camera',
    scanTitle: 'Scan Aadhaar Card',
    scanDesc: 'Tap to open camera and scan your Aadhaar card',
    startScanning: 'Start Scanning',
    scanSuccess: 'Aadhaar Scanned Successfully',
    nameLabel: 'Full Name',
    addressLabel: 'Address / Farm Location',
    aadhaarLabel: 'Aadhaar Card Number',
    edit: 'Edit',
    done: 'Done',
    scanAgain: 'Scan Again',
    completeVerification: 'Complete Verification',
    backToRoles: 'Change Role / Back',
    defaultName: 'Rajesh Kumar',
    defaultAddress: 'Village Kothpura, Post Saheli, Tehsil Dungarpur, District Dungarpur, Rajasthan - 314001',
  },
  hindi: {
    title: 'आधार कार्ड सत्यापन',
    subtitle: 'त्वरित सत्यापन के लिए कृपया अपना आधार कार्ड स्कैन करें',
    scanningTitle: 'आधार स्कैन किया जा रहा है...',
    scanningDesc: 'कृपया अपना आधार कार्ड कैमरे के सामने स्थिर रखें',
    scanTitle: 'आधार कार्ड स्कैन करें',
    scanDesc: 'कैमरा खोलकर आधार कार्ड स्कैन करने के लिए नीचे बटन दबाएं',
    startScanning: 'स्कैनिंग शुरू करें',
    scanSuccess: 'आधार सफलतापूर्वक सत्यापित व स्कैन हो गया',
    nameLabel: 'किसान का पूरा नाम',
    addressLabel: 'निवास व खेत का पता',
    aadhaarLabel: 'आधार कार्ड संख्या',
    edit: 'बदलें',
    done: 'पूर्ण',
    scanAgain: 'पुनः स्कैन करें',
    completeVerification: 'सत्यापन पूर्ण करें',
    backToRoles: 'भूमिका बदलें / वापस जाएं',
    defaultName: 'राजेश कुमार',
    defaultAddress: 'गाँव कोठपुरा, पोस्ट सहेली, तहसील डूंगरपुर, जिला डूंगरपुर, राजस्थान - 314001',
  },
  regional: {
    title: 'ਆਧਾਰ ਕਾਰਡ ਤਸਦੀਕ',
    subtitle: 'ਤੁਰੰਤ ਤਸਦੀਕ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਆਧਾਰ ਕਾਰਡ ਸਕੈਨ ਕਰੋ',
    scanningTitle: 'ਆਧਾਰ ਸਕੈਨ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
    scanningDesc: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਆਧਾਰ ਕਾਰਡ ਕੈਮਰੇ ਸਾਹਮਣੇ ਸਥਿਰ ਰੱਖੋ',
    scanTitle: 'ਆਧਾਰ ਕਾਰਡ ਸਕੈਨ ਕਰੋ',
    scanDesc: 'ਕੈਮਰਾ ਖੋਲ੍ਹ ਕੇ ਆਧਾਰ ਕਾਰਡ ਸਕੈਨ ਕਰਨ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਬਟਨ ਦਬਾਓ',
    startScanning: 'ਸਕੈਨਿੰਗ ਸ਼ੁਰੂ ਕਰੋ',
    scanSuccess: 'ਆਧਾਰ ਸਫਲਤਾਪੂਰਵਕ ਸਕੈਨ ਹੋ ਗਿਆ',
    nameLabel: 'ਕਿਸਾਨ ਦਾ ਪੂਰਾ ਨਾਮ',
    addressLabel: 'ਖੇਤ ਅਤੇ ਘਰ ਦਾ ਪਤਾ',
    aadhaarLabel: 'ਆਧਾਰ ਨੰਬਰ',
    edit: 'ਬਦਲੋ',
    done: 'ਮੁਕੰਮਲ',
    scanAgain: 'ਮੁੜ ਸਕੈਨ ਕਰੋ',
    completeVerification: 'ਤਸਦੀਕ ਮੁਕੰਮਲ ਕਰੋ',
    backToRoles: 'ਭੂਮਿਕਾ ਬਦਲੋ / ਵਾਪਸ ਜਾਓ',
    defaultName: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ',
    defaultAddress: 'ਪਿੰਡ ਜੰਡਿਆਲਾ, ਡਾਕਖ਼ਾਨਾ ਸਹੇਲੀ, ਤਹਿਸੀਲ ਨਕੋਦਰ, ਜ਼ਿਲ੍ਹਾ ਜਲੰਧਰ, ਪੰਜਾਬ - 144040',
  },
};

const FarmerVerification: React.FC = () => {
  const { user, setUser, setCurrentStep, language, setLanguage } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [aadhaarDetails, setAadhaarDetails] = useState({
    name: '',
    address: '',
    aadhaarNumber: '1234 5678 9012'
  });
  const [editMode, setEditMode] = useState(false);

  const currentLang = (language === 'hindi' || language === 'regional') ? language : 'english';
  const t = verificationTexts[currentLang];

  const handleScanAadhaar = async () => {
    setScanning(true);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock Aadhaar data based on active language
    const mockData = {
      name: t.defaultName,
      address: t.defaultAddress,
      aadhaarNumber: '1234 5678 9012'
    };
    
    setAadhaarDetails(mockData);
    setHasEdited(false);
    setScanning(false);
    setScanned(true);
  };

  const handleVerificationComplete = () => {
    if (user) {
      setUser({
        ...user,
        verified: true,
        name: aadhaarDetails.name || t.defaultName,
        location: aadhaarDetails.address || t.defaultAddress,
        aadhaarDetails: {
          ...aadhaarDetails,
          name: aadhaarDetails.name || t.defaultName,
          address: aadhaarDetails.address || t.defaultAddress,
        }
      });
      setCurrentStep('farmer-dashboard');
    }
  };

  // If user hasn't manually edited the name/address and switches language, sync default names
  const displayName = hasEdited ? aadhaarDetails.name : (aadhaarDetails.name ? t.defaultName : '');
  const displayAddress = hasEdited ? aadhaarDetails.address : (aadhaarDetails.address ? t.defaultAddress : '');

  return (
    <div className="min-h-screen bg-[#D2F2D4] py-6 px-3 sm:py-10 sm:px-6 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Language Switcher Bar synced to button */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <button
            onClick={() => setCurrentStep('role-selection')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-green-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full shadow-xs border border-green-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-green-700" />
            <span>{t.backToRoles}</span>
          </button>

          <div className="inline-flex items-center bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-green-200 gap-1">
            <Globe className="w-3.5 h-3.5 text-green-700 shrink-0" />
            {(['english', 'hindi', 'regional'] as const).map((lang) => {
              const active = currentLang === lang;
              const labels = {
                english: 'EN',
                hindi: 'हिंदी',
                regional: 'ਪੰਜਾਬੀ',
              };
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-green-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                >
                  {labels[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Header Icon & Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-green-600 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg shadow-green-700/20">
            <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5 tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Scanning Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-5 sm:p-8">
          {!scanned ? (
            <div className="text-center">
              <div className="border-2 border-dashed border-green-300 bg-green-50/40 rounded-2xl p-6 sm:p-10 mb-6 transition-all">
                {scanning ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-green-100 rounded-2xl flex items-center justify-center shadow-inner">
                      <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {t.scanningTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t.scanningDesc}
                    </p>
                    <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
                      <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {t.scanTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                      {t.scanDesc}
                    </p>
                    <button
                      onClick={handleScanAadhaar}
                      className="bg-green-600 text-white font-bold px-7 py-3 rounded-xl hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto cursor-pointer"
                    >
                      <Camera className="w-5 h-5" />
                      <span>{t.startScanning}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-2.5 text-green-700 bg-green-50 border border-green-200 p-3.5 rounded-xl">
                <CheckCircle className="w-6 h-6 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold">
                  {t.scanSuccess}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-gray-700">
                      {t.nameLabel}
                    </label>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="text-green-700 hover:text-green-800 text-xs sm:text-sm font-semibold flex items-center space-x-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{editMode ? t.done : t.edit}</span>
                    </button>
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      value={hasEdited ? aadhaarDetails.name : displayName}
                      onChange={(e) => {
                        setHasEdited(true);
                        setAadhaarDetails({ ...aadhaarDetails, name: e.target.value });
                      }}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl font-medium text-sm">
                      {displayName}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    <MapPin className="w-4 h-4 inline mr-1 text-red-500" />
                    {t.addressLabel}
                  </label>
                  {editMode ? (
                    <textarea
                      value={hasEdited ? aadhaarDetails.address : displayAddress}
                      onChange={(e) => {
                        setHasEdited(true);
                        setAadhaarDetails({ ...aadhaarDetails, address: e.target.value });
                      }}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl font-medium text-sm">
                      {displayAddress}
                    </p>
                  )}
                </div>

                {/* Aadhaar Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    {t.aadhaarLabel}
                  </label>
                  <p className="text-gray-900 bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl font-mono font-bold tracking-wider text-sm sm:text-base">
                    {aadhaarDetails.aadhaarNumber}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setScanned(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-bold text-sm cursor-pointer"
                >
                  {t.scanAgain}
                </button>
                <button
                  onClick={handleVerificationComplete}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-sm shadow-md cursor-pointer"
                >
                  {t.completeVerification}
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