import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/nextgen-kisan.png';
import leavesBg from '../../assets/Leaves-bg.png';
import leavesVideo from '../../assets/LEAVES VD.mp4';
import { useAuth } from '../../contexts/AuthContext';
import {
  Phone, Globe, ArrowRight, ArrowLeft,
  KeyRound, Sparkles, AlertCircle, RotateCcw,
  Play, Pause, ShieldCheck, Sprout, Tractor,
  FlaskConical, Stethoscope, CheckCircle2
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const { setCurrentStep, language, setLanguage, setUser, setPhoneNumber } = useAuth();
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isHindi = language === 'hindi';
  const isRegional = language === 'regional';

  // Ensure background video plays automatically
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback gracefully if browser policy restricts autoplay
        setIsVideoPlaying(false);
      });
    }
  }, []);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

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
            ? 'कृपया 10 अंक रो मान्य मोबाइल नंबर लिखो'
            : 'Please enter a valid 10-digit mobile number'
      );
      phoneInputRef.current?.focus();
      return;
    }

    setError('');
    setLoading(true);

    // Simulate sending OTP & generate 4-digit code
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    await new Promise(resolve => setTimeout(resolve, 800));

    setGeneratedOtp(newOtp);
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
          ? 'कृपया कम से कम 4 अंकों का OTP दर्ज करें'
          : isRegional
            ? 'कृपया 4 अंक रो OTP दर्ज करो'
            : 'Please enter a 4-digit OTP'
      );
      otpInputRef.current?.focus();
      return;
    }

    // Verify OTP against generated OTP or fallback 1234
    if (generatedOtp && otp !== generatedOtp && otp !== '1234') {
      setError(
        isHindi
          ? `गलत OTP दर्ज किया गया है। सही OTP [${generatedOtp}] है।`
          : isRegional
            ? `गलत OTP है। साचो OTP [${generatedOtp}] है।`
            : `Invalid OTP. Please enter [${generatedOtp}].`
      );
      otpInputRef.current?.focus();
      return;
    }

    setError('');
    setLoading(true);

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 700));

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
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    await new Promise(resolve => setTimeout(resolve, 600));
    setGeneratedOtp(newOtp);
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
    { code: 'regional', name: 'Regional (राजस्थानी)' }
  ];

  const maskedPhone = phone && phone.length >= 6
    ? `${phone.slice(0, 2)}****${phone.slice(-2)}`
    : phone;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between selection:bg-[#E8A317] selection:text-[#1B2A1E]">
      
      {/* ==================================================================== */}
      {/* BACKGROUND VIDEO WITH POSTER FALLBACK & CINEMATIC OVERLAYS */}
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
        {/* Deep emerald-to-dark gradient overlay for optimal readability & contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#072412]/65 to-black/80" />
        {/* Soft radial vignette to focus attention on the center card & hero */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* ==================================================================== */}
      {/* TOP BAR: BRAND PILL + CONTROLS (LANGUAGE & MOTION TOGGLE) */}
      {/* ==================================================================== */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 flex items-center justify-between">
        {/* Small Brand Pill */}
        <div className="flex items-center gap-2.5 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#16a34a] to-[#15803d] flex items-center justify-center shadow-xs">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-white text-sm sm:text-base tracking-tight">
            NextGen <span className="text-[#E8A317]">किसान</span>
          </span>
        </div>

        {/* Right Controls: Video Motion Pill + Language Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Motion Toggle Button */}
          <button
            type="button"
            onClick={toggleVideoPlay}
            className="flex items-center gap-1.5 bg-black/35 hover:bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white/90 text-xs font-medium transition-all cursor-pointer shadow-md"
            title={isVideoPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isVideoPlaying ? (
              <Pause className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span className="hidden sm:inline">
              {isVideoPlaying ? 'Motion On' : 'Motion Off'}
            </span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="flex items-center bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
            <Globe className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
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
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT: HERO SHOWCASE (LEFT) + LOGIN / OTP CARD (RIGHT) */}
      {/* ==================================================================== */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ------------------------------------------------------------------ */}
          {/* LEFT COLUMN: HERO INFORMATION & AGRI SERVICE HIGHLIGHTS (DESKTOP)  */}
          {/* ------------------------------------------------------------------ */}
          <div className="hidden lg:block lg:col-span-7 text-white space-y-6">
            
            {/* Agri Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 px-3.5 py-1.5 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-[#E8A317]" />
              <span className="text-xs sm:text-sm font-bold text-emerald-200 tracking-wide uppercase">
                {isHindi
                  ? '🌾 भारत का अगला कृषि डिजिटल क्रांति मंच'
                  : isRegional
                    ? '🌾 आपणो डिजिटल किसान क्रांति मंच'
                    : "🌾 India's NextGen Agri Ecosystem"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
              {isHindi ? (
                <>
                  खेती में नई तकनीक, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-[#E8A317]">
                    हर कदम पर विशेषज्ञ साथी
                  </span>
                </>
              ) : isRegional ? (
                <>
                  आधुनिक खेती, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-[#E8A317]">
                    हर मोड़ माथे साचो साथी
                  </span>
                </>
              ) : (
                <>
                  NextGen Farming, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-[#E8A317]">
                    Direct Services at Your Doorstep
                  </span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl leading-relaxed font-normal">
              {isHindi
                ? 'मृदा जांच, त्वरित फसल निदान, विश्वसनीय कृषि परिवहन और अनुभवी पशु डॉक्टरों तक सीधी पहुंच — केवल एक मोबाइल नंबर से।'
                : isRegional
                  ? 'माटी री जांच, फसल रोग निदान, गाड़ी बुकिंग अर पशु डॉक्टर री सुविधा — सिर्फ आपणो मोबाइल नंबर लगाओ।'
                  : 'Access certified soil testing laboratories, harvest transport, and licensed veterinary visits instantly without passwords.'}
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 max-w-2xl">
              {/* Feature 1 */}
              <div className="bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 flex items-start gap-3 shadow-md hover:bg-black/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isHindi ? 'मृदा परीक्षण' : isRegional ? 'माटी जांच' : 'Soil Labs'}
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5">
                    {isHindi ? 'सटीक जांच रिपोर्ट' : 'Certified tests'}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 flex items-start gap-3 shadow-md hover:bg-black/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Tractor className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isHindi ? 'कृषि वाहन' : isRegional ? 'गाड़ी बुकिंग' : 'Transport'}
                  </h4>
                  <p className="text-xs text-amber-200/80 mt-0.5">
                    {isHindi ? 'सस्ता व सुलभ साधन' : 'Haul & harvest'}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 flex items-start gap-3 shadow-md hover:bg-black/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isHindi ? 'पशु चिकित्सक' : isRegional ? 'पशु डॉक्टर' : 'Vet Visits'}
                  </h4>
                  <p className="text-xs text-purple-200/80 mt-0.5">
                    {isHindi ? 'घर बैठे डॉक्टर सेवा' : 'Doorstep care'}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust statement */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-200/90 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {isHindi
                  ? 'सुरक्षित व नि:शुल्क OTP लॉगिन • पासवर्ड याद रखने का कोई झंझट नहीं'
                  : 'Fast & Secure OTP Login • No password hassle'}
              </span>
            </div>

          </div>

          {/* ------------------------------------------------------------------ */}
          {/* RIGHT COLUMN: LOGIN / OTP CARD */}
          {/* ------------------------------------------------------------------ */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white/95 dark:bg-[#152219]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-white/70 dark:border-emerald-900/60 p-7 sm:p-8 transition-all duration-300">
              
              {/* Card Header: Brand Logo & Title */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden bg-white flex items-center justify-center shadow-lg p-1 border-2 border-emerald-500/30">
                  <img src={logo} alt="NextGen किसान" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
                  NextGen किसान
                </h2>
                <p className="text-gray-600 dark:text-emerald-200/80 text-xs sm:text-sm font-medium">
                  {isHindi
                    ? 'लॉगिन करने के लिए अपना मोबाइल नंबर दर्ज करें'
                    : isRegional
                      ? 'लॉगिन करण सारू आपणो मोबाइल नंबर लगाओ'
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
                      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        <Phone className="w-4 h-4 inline mr-1.5 text-green-700 dark:text-green-400" />
                        {isHindi
                          ? 'मोबाइल नंबर'
                          : isRegional
                            ? 'मोबाइल नंबर लिखो'
                            : 'Phone Number'}
                      </label>
                      <div className="relative flex rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-within:border-green-600 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-green-500/20 bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200 shadow-xs">
                        <span className="inline-flex items-center px-3.5 bg-gray-50 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 font-bold text-sm border-r border-gray-200 dark:border-gray-700">
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
                                ? '10 अंक रो मोबाइल नंबर'
                                : '10-digit mobile number'
                          }
                          className="w-full px-3.5 py-3 text-base text-gray-900 dark:text-white bg-transparent placeholder-gray-400 focus:outline-none font-medium tracking-wide"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                        {isHindi
                          ? 'हम इस नंबर पर SMS से 4-अंकों का OTP भेजेंगे'
                          : 'We will send a 4-digit OTP via SMS to this number'}
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold animate-shake">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-800 active:to-emerald-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>
                            {isHindi
                              ? 'OTP प्राप्त करें'
                              : isRegional
                                ? 'OTP भेजो'
                                : 'Send OTP'}
                          </span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                        {isHindi
                          ? 'लॉगिन करके आप हमारी सेवा शर्तों और गोपनीयता नीति से सहमत होते हैं।'
                          : 'By continuing, you agree to our Terms of Service & Privacy Policy.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ========================================================== */
                  /* STEP 2: OTP Verification Form */
                  /* ========================================================== */
                  <div className="space-y-4">
                    {/* Simulated SMS Received Notification Banner */}
                    {generatedOtp && (
                      <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl p-3.5 shadow-md">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                              📩
                            </div>
                            <div>
                              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                {isHindi ? 'SMS प्राप्त हुआ (Demo OTP)' : 'SMS Received (Demo OTP)'}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {isHindi ? 'सत्यापन कोड:' : 'Your OTP:'}
                                </span>
                                <span className="text-emerald-800 dark:text-emerald-200 font-mono font-extrabold text-lg tracking-widest bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2.5 py-0.5 rounded-md">
                                  {generatedOtp}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setOTP(generatedOtp);
                              setError('');
                              otpInputRef.current?.focus();
                            }}
                            className="text-xs font-bold text-emerald-800 dark:text-emerald-200 hover:text-emerald-950 bg-white dark:bg-emerald-900/80 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-700 px-2.5 py-1.5 rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                            title="Auto-fill OTP"
                          >
                            ⚡ {isHindi ? 'स्वतः भरें' : 'Auto-fill'}
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                          <KeyRound className="w-4 h-4 inline mr-1.5 text-green-700 dark:text-green-400" />
                          {isHindi
                            ? 'OTP कोड दर्ज करें'
                            : isRegional
                              ? 'OTP कोड लिखो'
                              : 'Enter OTP'}
                        </label>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 font-mono">
                          +91 {maskedPhone}
                        </span>
                      </div>

                      <div className="relative flex rounded-xl border-2 border-gray-200 dark:border-gray-700 focus-within:border-green-600 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-green-500/20 bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200 shadow-xs">
                        <input
                          ref={otpInputRef}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          autoFocus
                          value={otp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
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
                          className="w-full px-4 py-3 text-center text-2xl font-mono tracking-[0.4em] text-gray-900 dark:text-white bg-transparent placeholder-gray-300 focus:outline-none"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 text-center">
                        {isHindi
                          ? 'OTP कोड डालकर Enter दबाएं या आगे बढ़ें'
                          : 'Type OTP & press Enter ↵ to continue'}
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold animate-shake">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-800 active:to-emerald-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>
                            {isHindi
                              ? 'सत्यापित करें और आगे बढ़ें'
                              : isRegional
                                ? 'सत्यापित करो अर आगे बढ़ो'
                                : 'Verify & Continue'}
                          </span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {/* Auxiliary links: Change number & Resend OTP */}
                    <div className="pt-2 flex items-center justify-between text-xs font-semibold border-t border-gray-100 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={() => {
                          setShowOTP(false);
                          setOTP('');
                          setError('');
                          setTimeout(() => phoneInputRef.current?.focus(), 100);
                        }}
                        className="text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        {isHindi ? 'नंबर बदलें' : 'Change number'}
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={resendTimer > 0 || loading}
                        className="text-green-700 dark:text-emerald-400 hover:text-green-800 dark:hover:text-emerald-300 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        {resendTimer > 0
                          ? `${isHindi ? 'पुनः भेजें' : 'Resend in'} (${resendTimer}s)`
                          : isHindi
                            ? 'OTP पुनः भेजें'
                            : 'Resend OTP'}
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {/* Bottom Security Badge */}
              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-emerald-300/70">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>256-bit Encrypted Government Agri-Standards</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ==================================================================== */}
      {/* FOOTER: HELPLINE & COPYRIGHT */}
      {/* ==================================================================== */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/80">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {isHindi ? 'किसान सहायता हेल्पलाइन:' : 'Kisan Support Helpline:'}{' '}
            <a
              href="tel:18001234567"
              className="font-bold text-white hover:text-emerald-300 underline underline-offset-2 ml-1"
            >
              1800-123-4567 (Toll-Free)
            </a>
          </span>
        </div>
        <div className="text-white/60 text-[11px]">
          NextGen किसान &copy; {new Date().getFullYear()} • Dedicated to Farmers Across India
        </div>
      </footer>

    </div>
  );
};

export default LoginPage;