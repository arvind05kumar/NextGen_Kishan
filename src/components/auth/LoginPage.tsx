import React, { useState } from 'react';
import logo from '../../assets/nextgen-kisan.png';
import leavesBg from '../../assets/Leaves-bg.png';
import { useAuth } from '../../contexts/AuthContext';
import { Phone, Globe, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { setCurrentStep, language, setLanguage } = useAuth();
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length < 10) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setShowOTP(true);
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 4) return;
    
    setLoading(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setCurrentStep('role-selection');
  };

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिंदी' },
    { code: 'regional', name: 'Regional' }
  ];

  const maskedPhone = phone && phone.length >= 6
    ? `${phone.slice(0, 2)}****${phone.slice(-2)}`
    : phone;

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${leavesBg})` }}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            {/* Logo and Title */}
            <div className="text-center mb-6">
              <div className="w-28 h-28 rounded-full mx-auto mb-3 overflow-hidden bg-white flex items-center justify-center shadow-sm">
                <img src={logo} alt="NextGen किसान" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">NextGen किसान</h1>
              <p className="text-gray-700 text-sm">Connecting farmers with professional services</p>
            </div>

            {/* Language Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Login Form */}
            <div className="">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={showOTP}
                />
                {!showOTP && (
                  <button
                    onClick={handleSendOTP}
                    disabled={phone.length < 10 || loading}
                    className="mt-3 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                )}
              </div>
            </div>

            {showOTP && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  OTP sent to +91 {maskedPhone}.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter OTP"
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
                  />
                  <button
                    onClick={handleVerifyOTP}
                    disabled={otp.length < 4 || loading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {showOTP && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowOTP(false);
                    setOTP('');
                  }}
                  className="text-sm text-green-700 hover:text-green-800"
                >
                  Change phone number?
                </button>
              </div>
            )}
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;