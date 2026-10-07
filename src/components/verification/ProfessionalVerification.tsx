import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, FileText, CheckCircle, Award, Globe, ArrowLeft } from 'lucide-react';

const profTexts = {
  english: {
    title: 'Professional Verification',
    backToRoles: '← Change Role / Back',
    scanningTitle: 'Scanning Document...',
    scanningHint: 'Please hold your document steady in front of the camera',
    scanAction: 'Start Scanning',
    scanSuccess: 'Document Scanned Successfully',
    nameLabel: 'Professional Name',
    licenseLabel: 'Registration / License Number',
    scanAgain: 'Scan Again',
    completeVerification: 'Complete Verification',
    tapDesc: 'Tap to open camera and scan your professional document',
    roles: {
      lab: { title: 'Laboratory License', description: 'Scan your laboratory registration certificate', specLabel: 'Laboratory Type', defaultSpec: 'Soil & Crop Analysis' },
      vet: { title: 'Veterinary License', description: 'Scan your veterinary practice license', specLabel: 'Specialization', defaultSpec: 'Livestock Medicine' },
      driver: { title: 'Commercial Driving License', description: 'Scan your commercial driving license', specLabel: 'Vehicle Type', defaultSpec: 'Heavy Agricultural Vehicles' },
      ngo: { title: 'NGO Registration', description: 'Scan your NGO registration certificate', specLabel: 'Focus Area', defaultSpec: 'Rural Development & Farmer Relief' },
    }
  },
  hindi: {
    title: 'व्यावसायिक सत्यापन',
    backToRoles: '← भूमिका बदलें / वापस जाएं',
    scanningTitle: 'दस्तावेज़ स्कैन किया जा रहा है...',
    scanningHint: 'कृपया अपना दस्तावेज़ कैमरे के सामने स्थिर रखें',
    scanAction: 'स्कैनिंग शुरू करें',
    scanSuccess: 'दस्तावेज़ सफलतापूर्वक सत्यापित व स्कैन हो गया',
    nameLabel: 'पेशेवर का नाम',
    licenseLabel: 'पंजीकरण / लाइसेंस संख्या',
    scanAgain: 'पुनः स्कैन करें',
    completeVerification: 'सत्यापन पूर्ण करें',
    tapDesc: 'कैमरा खोलकर पेशेवर दस्तावेज़ स्कैन करने के लिए नीचे बटन दबाएं',
    roles: {
      lab: { title: 'प्रयोगशाला लाइसेंस', description: 'अपना प्रयोगशाला पंजीकरण प्रमाण पत्र स्कैन करें', specLabel: 'प्रयोगशाला का प्रकार', defaultSpec: 'मृदा व फसल जांच' },
      vet: { title: 'पशु चिकित्सा लाइसेंस', description: 'अपना पशु चिकित्सा प्रैक्टिस लाइसेंस स्कैन करें', specLabel: 'विशेषज्ञता', defaultSpec: 'पशुधन चिकित्सा' },
      driver: { title: 'व्यावसायिक ड्राइविंग लाइसेंस', description: 'अपना व्यावसायिक ड्राइविंग लाइसेंस स्कैन करें', specLabel: 'वाहन का प्रकार', defaultSpec: 'भारी कृषि वाहन' },
      ngo: { title: 'एनजीओ पंजीकरण', description: 'अपना एनजीओ पंजीकरण प्रमाण पत्र स्कैन करें', specLabel: 'कार्य क्षेत्र', defaultSpec: 'ग्रामीण विकास व किसान राहत' },
    }
  },
  regional: {
    title: 'ਪੇਸ਼ੇਵਰ ਤਸਦੀਕ',
    backToRoles: '← ਭੂਮਿਕਾ ਬਦਲੋ / ਵਾਪਸ ਜਾਓ',
    scanningTitle: 'ਦਸਤਾਵੇਜ਼ ਸਕੈਨ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
    scanningHint: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਦਸਤਾਵੇਜ਼ ਕੈਮਰੇ ਸਾਹਮਣੇ ਸਥਿਰ ਰੱਖੋ',
    scanAction: 'ਸਕੈਨਿੰਗ ਸ਼ੁਰੂ ਕਰੋ',
    scanSuccess: 'ਦਸਤਾਵੇਜ਼ ਸਫਲਤਾਪੂਰਵਕ ਸਕੈਨ ਹੋ ਗਿਆ',
    nameLabel: 'ਪੇਸ਼ੇਵਰ ਦਾ ਨਾਮ',
    licenseLabel: 'ਲਾਇਸੈਂਸ ਨੰਬਰ',
    scanAgain: 'ਮੁੜ ਸਕੈਨ ਕਰੋ',
    completeVerification: 'ਤਸਦੀਕ ਮੁਕੰਮਲ ਕਰੋ',
    tapDesc: 'ਕੈਮਰਾ ਖੋਲ੍ਹ ਕੇ ਪੇਸ਼ੇਵਰ ਦਸਤਾਵੇਜ਼ ਸਕੈਨ ਕਰਨ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਬਟਨ ਦਬਾਓ',
    roles: {
      lab: { title: 'ਲੈਬਾਰਟਰੀ ਲਾਇਸੈਂਸ', description: 'ਆਪਣਾ ਲੈਬ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਰਟੀਫਿਕੇਟ ਸਕੈਨ ਕਰੋ', specLabel: 'ਲੈਬ ਦੀ ਕਿਸਮ', defaultSpec: 'ਮਿੱਟੀ ਅਤੇ ਫ਼ਸਲ ਪਰਖ' },
      vet: { title: 'ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਲਾਇਸੈਂਸ', description: 'ਆਪਣਾ ਵੈਟਰਨਰੀ ਪ੍ਰੈਕਟਿਸ ਲਾਇਸੈਂਸ ਸਕੈਨ ਕਰੋ', specLabel: 'ਮੁਹਾਰਤ', defaultSpec: 'ਪਸ਼ੂ ਰੋਗ ਇਲਾਜ' },
      driver: { title: 'ਕਮਰਸ਼ੀਅਲ ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ', description: 'ਆਪਣਾ ਵਪਾਰਕ ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ ਸਕੈਨ ਕਰੋ', specLabel: 'ਗੱਡੀ ਦੀ ਕਿਸਮ', defaultSpec: 'ਖੇਤੀਬਾੜੀ ਭਾਰੀ ਵਾਹਨ' },
      ngo: { title: 'ਐਨਜੀਓ ਰਜਿਸਟ੍ਰੇਸ਼ਨ', description: 'ਆਪਣਾ ਐਨਜੀਓ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਰਟੀਫਿਕੇਟ ਸਕੈਨ ਕਰੋ', specLabel: 'ਕੰਮ ਦਾ ਖੇਤਰ', defaultSpec: 'ਪੇਂਡੂ ਵਿਕਾਸ ਅਤੇ ਕਿਸਾਨ ਸਹਾਇਤਾ' },
    }
  }
};

const ProfessionalVerification: React.FC = () => {
  const { user, setUser, setCurrentStep, language, setLanguage } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [professionalDetails, setProfessionalDetails] = useState({
    name: '',
    license: '',
    specialization: ''
  });

  const currentLang = (language === 'hindi' || language === 'regional') ? language : 'english';
  const t = profTexts[currentLang];
  const roleKey = (user?.role && user.role in t.roles) ? (user.role as keyof typeof t.roles) : 'vet';
  const roleConfig = t.roles[roleKey];

  const handleScanDocument = async () => {
    setScanning(true);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock professional data based on role
    const mockData = {
      name: currentLang === 'hindi' ? 'डॉ. अरविंद सिंह' : currentLang === 'regional' ? 'ਡਾ. ਹਰਜੀਤ ਸਿੰਘ' : 'Dr. Arvind Singh',
      license: `${user?.role?.toUpperCase()}123456789`,
      specialization: roleConfig.defaultSpec
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
        name: professionalDetails.name || (currentLang === 'hindi' ? 'डॉ. अरविंद सिंह' : currentLang === 'regional' ? 'ਡਾ. ਹਰਜੀਤ ਸਿੰਘ' : 'Dr. Arvind Singh'),
        professionalDetails
      });
      setCurrentStep(`${user.role}-dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-[#D2F2D4] py-6 px-3 sm:py-10 sm:px-6 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Language Switcher Bar */}
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
            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5 tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto font-medium">
            {roleConfig.description}
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
                      <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {t.scanningTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t.scanningHint} ({roleConfig.title})
                    </p>
                    <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
                      <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {roleConfig.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                      {t.tapDesc}
                    </p>
                    <button
                      onClick={handleScanDocument}
                      className="bg-green-600 text-white font-bold px-7 py-3 rounded-xl hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto cursor-pointer"
                    >
                      <Camera className="w-5 h-5" />
                      <span>{t.scanAction}</span>
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
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    {t.nameLabel}
                  </label>
                  <p className="text-gray-900 bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl font-medium text-sm">
                    {professionalDetails.name}
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    {t.licenseLabel}
                  </label>
                  <p className="text-gray-900 bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl font-mono font-bold tracking-wider text-sm sm:text-base">
                    {professionalDetails.license}
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    {roleConfig.specLabel}
                  </label>
                  <p className="text-gray-900 bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl font-medium text-sm">
                    {professionalDetails.specialization}
                  </p>
                </div>
              </div>

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

export default ProfessionalVerification;