import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/nextgen-kisan.png';
import leavesBg from '../../assets/Leaves-bg.png';
import leavesVideo from '../../assets/LEAVES VD.mp4';
import { useAuth } from '../../contexts/AuthContext';
import {
  Phone, Globe, ArrowRight, ArrowLeft,
  KeyRound, Sparkles, AlertCircle, RotateCcw,
  ShieldCheck, Sprout, Tractor,
  FlaskConical, Stethoscope, CheckCircle2
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const { setCurrentStep, language, setLanguage, setUser, setPhoneNumber } = useAuth();
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isHindi = language === 'hindi';
  const isRegional = language === 'regional';

  // Keep background video in motion all the time
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback gracefully if browser policy restricts autoplay
      });
    }
  }, []);

  // Timer countdown for resending OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOTP = async () => {
    if (phone.length < 10) {
      setError(
        isHindi
          ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें'
          : isRegional
            ? 'ਕਿਰਪਾ ਕਰਕੇ 10 ਅੰਕਾਂ ਦਾ ਸਹੀ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ'
            : 'Please enter a valid 10-digit mobile number'
      );
      phoneInputRef.current?.focus();
      return;
    }

    setError('');
    setLoading(true);

    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 600));

    setLoading(false);
    setShowOTP(true);
    setResendTimer(30);

    setTimeout(() => {
      otpInputRef.current?.focus();
    }, 150);
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 4) {
      setError(
        isHindi
          ? 'कृपया 4 अंकों का OTP दर्ज करें'
          : isRegional
            ? 'ਕਿਰਪਾ ਕਰਕੇ 4 ਅੰਕਾਂ ਦਾ OTP ਦਰਜ ਕਰੋ'
            : 'Please enter a 4-digit OTP'
      );
      otpInputRef.current?.focus();
      return;
    }

    // Accept ANY 4-digit OTP directly!
    setError('');
    setLoading(true);

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 600));

    setLoading(false);
    // Connect phone to auth context and user profile
    setPhoneNumber(phone);
    setUser({
      phone: phone,
      role: 'farmer',
      verified: false
    });
    setCurrentStep('role-selection');
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0 || loading) return;
    setLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 500));
    setOTP('');
    setLoading(false);
    setResendTimer(30);
    otpInputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOTP) {
      handleSendOTP();
    } else {
      handleVerifyOTP();
    }
  };

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिंदी' },
    { code: 'regional', name: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  const maskedPhone = phone && phone.length >= 6
    ? `${phone.slice(0, 2)}****${phone.slice(-2)}`
    : phone;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between selection:bg-[#E8A317] selection:text-[#1B2A1E]">
      
      {/* ==================================================================== */}
      {/* 1. BACKGROUND VIDEO (LIGHT EFFECT, MAXIMUM VIDEO VISIBILITY) */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={leavesBg}
          className="w-full h-full object-cover scale-105"
        >
          <source src={leavesVideo} type="video/mp4" />
          <source src="/LEAVES-VD.mp4" type="video/mp4" />
        </video>
        {/* Light, soft overlay - allows video colors and fresh leaves to shine through brightly */}
        <div className="absolute inset-0 bg-black/15 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* ==================================================================== */}
      {/* 2. TOP BAR: BRAND PILL + LANGUAGE SELECTOR (MOTION BUTTON REMOVED) */}
      {/* ==================================================================== */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 flex items-center justify-between">
        {/* Brand Pill */}
        <div className="flex items-center gap-2.5 bg-[#093318]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/40 shadow-lg">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#16a34a] to-[#15803d] flex items-center justify-center shadow-xs">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-white text-sm sm:text-base tracking-tight">
            NextGen <span className="text-[#E8A317]">किसान</span>
          </span>
        </div>

        {/* Language Selector Dropdown */}
        <div className="flex items-center bg-[#093318]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/40 shadow-md">
          <Globe className="w-3.5 h-3.5 text-emerald-300 mr-1.5 shrink-0" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs font-semibold text-white bg-transparent focus:outline-none cursor-pointer pr-1"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-gray-900 bg-white">
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 3. MAIN CONTENT: HERO (LEFT) + TRANSLUCENT GREENISH LOGIN CARD (RIGHT) */}
      {/* ==================================================================== */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ------------------------------------------------------------------ */}
          {/* LEFT COLUMN: HERO INFORMATION & AGRI SERVICE HIGHLIGHTS (DESKTOP)  */}
          {/* ------------------------------------------------------------------ */}
          <div className="hidden lg:block lg:col-span-7 text-white space-y-6">
            
            {/* Agri Badge */}
            <div className="inline-flex items-center gap-2 bg-[#093318]/70 backdrop-blur-md border border-emerald-400/40 px-3.5 py-1.5 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-[#E8A317]" />
              <span className="text-xs sm:text-sm font-bold text-emerald-200 tracking-wide uppercase">
                {isHindi
                  ? '🌾 भारत का अगला कृषि डिजिटल क्रांति मंच'
                  : isRegional
                    ? '🌾 ਪੰਜਾਬ ਤੇ ਭਾਰਤ ਦਾ ਅਗਾਂਹਵਧੂ ਖੇਤੀਬਾੜੀ ਮੰਚ'
                    : "🌾 India's NextGen Agri Ecosystem"}
              </span>
            </div>

            {/* Headline with drop shadow for clarity on bright video */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              {isHindi ? (
                <>
                  खेती में नई तकनीक, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-100 to-[#E8A317]">
                    हर कदम पर विशेषज्ञ साथी
                  </span>
                </>
              ) : isRegional ? (
                <>
                  ਆਧੁਨਿਕ ਖੇਤੀ, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-100 to-[#E8A317]">
                    ਹਰ ਮੋੜ ਤੇ ਸੱਚਾ ਸਾਥੀ
                  </span>
                </>
              ) : (
                <>
                  NextGen Farming, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-100 to-[#E8A317]">
                    Direct Services at Your Doorstep
                  </span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white font-medium max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {isHindi
                ? 'मृदा जांच, त्वरित फसल निदान, विश्वसनीय कृषि परिवहन और अनुभवी पशु डॉक्टरों तक सीधी पहुंच — केवल एक मोबाइल नंबर से।'
                : isRegional
                  ? 'ਮਿੱਟੀ ਪਰਖ, ਫ਼ਸਲ ਰੋਗ ਨਿਦਾਨ, ਭਰੋਸੇਮੰਦ ਢੋਆ-ਢੁਆਈ ਅਤੇ ਤਜਰਬੇਕਾਰ ਪਸ਼ੂ ਡਾਕਟਰਾਂ ਦੀ ਸੇਵਾ — ਸਿਰਫ਼ ਇੱਕ ਮੋਬਾਈਲ ਨੰਬਰ ਨਾਲ।'
                  : 'Access certified soil testing laboratories, harvest transport, and licensed veterinary visits instantly without passwords.'}
            </p>

            {/* Feature Pills (Translucent Greenish) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 max-w-2xl">
              {/* Feature 1 */}
              <div className="bg-[#093318]/70 backdrop-blur-md border border-emerald-400/35 rounded-2xl p-3.5 flex items-start gap-3 shadow-md hover:bg-[#093318]/85 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isHindi ? 'मृदा परीक्षण' : isRegional ? 'ਮਿੱਟੀ ਪਰਖ' : 'Soil Labs'}
                  </h4>
                  <p className="text-xs text-emerald-200/90 mt-0.5">
                    {isHindi ? 'सटीक जांच रिपोर्ट' : isRegional ? 'ਲੈਬ ਜਾਂਚ ਰਿਪੋਰਟ' : 'Certified tests'}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#093318]/70 backdrop-blur-md border border-emerald-400/35 rounded-2xl p-3.5 flex items-start gap-3 shadow-md hover:bg-[#093318]/85 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/25 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Tractor className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isHindi ? 'कृषि वाहन' : isRegional ? 'ਖੇਤੀਬਾੜੀ ਵਾਹਨ' : 'Transport'}
                  </h4>
                  <p className="text-xs text-amber-200/90 mt-0.5">
                    {isHindi ? 'सस्ता व सुलभ साधन' : isRegional ? 'ਟਰੈਕਟਰ ਤੇ ਢੋਆ-ਢੁਆਈ' : 'Haul & harvest'}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#093318]/70 backdrop-blur-md border border-emerald-400/35 rounded-2xl p-3.5 flex items-start gap-3 shadow-md hover:bg-[#093318]/85 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/25 border border-purple-400/40 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isHindi ? 'पशु चिकित्सक' : isRegional ? 'ਪਸ਼ੂ ਡਾਕਟਰ' : 'Vet Visits'}
                  </h4>
                  <p className="text-xs text-purple-200/90 mt-0.5">
                    {isHindi ? 'घर बैठे डॉक्टर सेवा' : isRegional ? 'ਘਰ ਬੈਠੇ ਡਾਕਟਰੀ ਸੇਵਾ' : 'Doorstep care'}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust statement */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/95 pt-1 drop-shadow-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {isHindi
                  ? 'सुरक्षित व नि:शुल्क OTP लॉगिन • पासवर्ड याद रखने का कोई झंझट नहीं'
                  : isRegional
                    ? 'ਸੁਰੱਖਿਅਤ ਤੇ ਮੁਫ਼ਤ OTP ਲੌਗਇਨ • ਕੋਈ ਪਾਸਵਰਡ ਯਾਦ ਰੱਖਣ ਦੀ ਲੋੜ ਨਹੀਂ'
                    : 'Fast & Secure OTP Login • No password hassle'}
              </span>
            </div>

          </div>

          {/* ------------------------------------------------------------------ */}
          {/* RIGHT COLUMN: TRANSLUCENT GREENISH LOGIN CARD                      */}
          {/* ------------------------------------------------------------------ */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-[#093318]/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] border-2 border-emerald-400/45 p-7 sm:p-8 transition-all duration-300 text-white">
              
              {/* Card Header: Brand Logo & Title */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden bg-white/95 flex items-center justify-center shadow-lg p-1 border-2 border-emerald-400/60">
                  <img src={logo} alt="NextGen किसान" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                  NextGen <span className="text-[#E8A317]">किसान</span>
                </h2>
                <p className="text-emerald-100/90 text-xs sm:text-sm font-medium">
                  {isHindi
                    ? 'लॉगिन करने के लिए अपना मोबाइल नंबर दर्ज करें'
                    : isRegional
                      ? 'ਲੌਗਇਨ ਕਰਨ ਲਈ ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ'
                      : 'Log in with your mobile number to get started'}
                </p>
              </div>

              {/* Form Container */}
              <form onSubmit={handleSubmit} noValidate>
                {!showOTP ? (
                  /* ========================================================== */
                  /* STEP 1: Phone Input Form */
                  /* ========================================================== */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-emerald-100 mb-2">
                        <Phone className="w-4 h-4 inline mr-1.5 text-emerald-300" />
                        {isHindi
                          ? 'मोबाइल नंबर'
                          : isRegional
                            ? 'ਮੋਬਾਈਲ ਨੰਬਰ'
                            : 'Phone Number'}
                      </label>
                      <div className="relative flex rounded-xl border-2 border-emerald-400/50 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-400/30 bg-black/45 backdrop-blur-md overflow-hidden transition-all duration-200 shadow-inner">
                        <span className="inline-flex items-center px-3.5 bg-emerald-950/70 text-emerald-100 font-bold text-sm border-r border-emerald-500/40 select-none">
                          🇮🇳 +91
                        </span>
                        <input
                          ref={phoneInputRef}
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          autoFocus
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setPhone(val);
                            if (error) setError('');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendOTP();
                            }
                          }}
                          placeholder={
                            isHindi
                              ? '10 अंकों का मोबाइल नंबर'
                              : isRegional
                                ? '10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ'
                                : '10-digit mobile number'
                          }
                          className="w-full px-3.5 py-3 text-base text-white bg-transparent placeholder-emerald-200/50 focus:outline-none font-medium tracking-wide"
                        />
                      </div>
                      <p className="text-xs text-emerald-200/80 mt-1.5">
                        {isHindi
                          ? 'हम इस नंबर पर 4-अंकों का OTP भेजेंगे'
                          : isRegional
                            ? 'ਅਸੀਂ ਇਸ ਨੰਬਰ ਤੇ 4 ਅੰਕਾਂ ਦਾ OTP ਭੇਜਾਂਗੇ'
                            : 'We will send a 4-digit OTP to this number'}
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-400/60 rounded-xl text-red-200 text-xs font-semibold animate-shake">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-400 hover:to-green-500 active:from-green-700 active:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>
                            {isHindi
                              ? 'OTP प्राप्त करें'
                              : isRegional
                                ? 'OTP ਪ੍ਰਾਪਤ ਕਰੋ'
                                : 'Send OTP'}
                          </span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-[11px] text-emerald-200/75 leading-tight">
                        {isHindi
                          ? 'लॉगिन करके आप हमारी सेवा शर्तों और गोपनीयता नीति से सहमत होते हैं।'
                          : isRegional
                            ? 'ਲੌਗਇਨ ਕਰਕੇ ਤੁਸੀਂ ਸਾਡੀਆਂ ਸੇਵਾ ਸ਼ਰਤਾਂ ਅਤੇ ਗੋਪਨੀਯਤਾ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤ ਹੁੰਦੇ ਹੋ।'
                            : 'By continuing, you agree to our Terms of Service & Privacy Policy.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ========================================================== */
                  /* STEP 2: OTP Verification Form (ANY OTP ACCEPTED, NO DEMO BANNER) */
                  /* ========================================================== */
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-emerald-100">
                          <KeyRound className="w-4 h-4 inline mr-1.5 text-emerald-300" />
                          {isHindi
                            ? 'OTP कोड दर्ज करें'
                            : isRegional
                              ? 'OTP ਕੋਡ ਦਰਜ ਕਰੋ'
                              : 'Enter OTP'}
                        </label>
                        <span className="text-xs font-medium text-emerald-200 font-mono">
                          +91 {maskedPhone}
                        </span>
                      </div>

                      <div className="relative flex rounded-xl border-2 border-emerald-400/50 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-400/30 bg-black/45 backdrop-blur-md overflow-hidden transition-all duration-200 shadow-inner">
                        <input
                          ref={otpInputRef}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={4}
                          autoFocus
                          value={otp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setOTP(val);
                            if (error) setError('');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleVerifyOTP();
                            }
                          }}
                          placeholder="••••"
                          className="w-full px-4 py-3 text-center text-2xl font-mono tracking-[0.4em] text-white bg-transparent placeholder-emerald-300/40 focus:outline-none font-bold"
                        />
                      </div>
                      <p className="text-xs text-emerald-200/80 mt-1.5 text-center">
                        {isHindi
                          ? 'कोई भी 4 अंकों का OTP कोड दर्ज करें (उदा. 1234)'
                          : isRegional
                            ? 'ਕੋਈ ਵੀ 4 ਅੰਕਾਂ ਦਾ OTP ਕੋਡ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ 1234)'
                            : 'Enter any 4-digit OTP code (e.g. 1234)'}
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-400/60 rounded-xl text-red-200 text-xs font-semibold animate-shake">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-400 hover:to-green-500 active:from-green-700 active:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>
                            {isHindi
                              ? 'सत्यापित करें और आगे बढ़ें'
                              : isRegional
                                ? 'ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਅੱਗੇ ਵਧੋ'
                                : 'Verify & Continue'}
                          </span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {/* Auxiliary links: Change number & Resend OTP */}
                    <div className="pt-2 flex items-center justify-between text-xs font-semibold border-t border-emerald-500/30">
                      <button
                        type="button"
                        onClick={() => {
                          setShowOTP(false);
                          setOTP('');
                          setError('');
                          setTimeout(() => phoneInputRef.current?.focus(), 100);
                        }}
                        className="text-emerald-200 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        {isHindi ? 'नंबर बदलें' : isRegional ? 'ਨੰਬਰ ਬਦਲੋ' : 'Change number'}
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={resendTimer > 0 || loading}
                        className="text-emerald-300 hover:text-white disabled:text-emerald-500/50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        {resendTimer > 0
                          ? `${isHindi ? 'पुनः भेजें' : isRegional ? 'ਮੁੜ ਭੇਜੋ' : 'Resend in'} (${resendTimer}s)`
                          : isHindi
                            ? 'OTP पुनः भेजें'
                            : isRegional
                              ? 'OTP ਮੁੜ ਭੇਜੋ'
                              : 'Resend OTP'}
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {/* Bottom Security Badge */}
              <div className="mt-5 pt-3 border-t border-emerald-500/30 flex items-center justify-center gap-1.5 text-[11px] text-emerald-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>256-bit Encrypted Government Agri-Standards</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ==================================================================== */}
      {/* 4. FOOTER: HELPLINE & COPYRIGHT */}
      {/* ==================================================================== */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white drop-shadow-md">
        <div className="flex items-center gap-2 bg-[#093318]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
          <Phone className="w-3.5 h-3.5 text-emerald-300" />
          <span>
            {isHindi ? 'किसान सहायता हेल्पलाइन:' : isRegional ? 'ਕਿਸਾਨ ਸਹਾਇਤਾ ਹੈਲਪਲਾਈਨ:' : 'Kisan Support Helpline:'}{' '}
            <a
              href="tel:18001234567"
              className="font-bold text-emerald-200 hover:text-white underline underline-offset-2 ml-1"
            >
              1800-123-4567 (Toll-Free)
            </a>
          </span>
        </div>
        <div className="text-white/80 text-[11px] bg-[#093318]/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          NextGen किसान &copy; {new Date().getFullYear()} • Dedicated to Farmers Across India
        </div>
      </footer>

    </div>
  );
};

export default LoginPage;