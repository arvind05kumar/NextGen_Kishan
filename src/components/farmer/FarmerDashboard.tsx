import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  TestTube2, Stethoscope, Camera, Truck, ArrowRight,
  Sun, CloudRain, Wind, TrendingUp, Bell, Star,
  CheckCircle, Clock, AlertCircle, Sprout, BarChart3, Wheat,
  Bot
} from 'lucide-react';
import SoilCropTestModal from './modals/SoilCropTestModal';
import VetServiceModal from './modals/VetServiceModal';
import CropScanningModal from './modals/CropScanningModal';
import TransportModal from './modals/TransportModal';
import BhoomiAIChat from './BhoomiAIChat';

const FarmerDashboard: React.FC = () => {
  const { user, language } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isBhoomiOpen, setIsBhoomiOpen] = useState(false);

  const isHindi = language === 'hindi';
  const isPunjabi = language === 'regional';

  const services = [
    {
      id: 'soil-crop-test',
      title: isHindi ? 'मृदा व फसल परीक्षण' : isPunjabi ? 'ਮਿੱਟੀ ਤੇ ਫ਼ਸਲ ਪਰਖ' : 'Soil & Crop Test',
      description: isHindi ? 'नजदीकी प्रयोगशालाओं से मिट्टी और फसल स्वास्थ्य की वैज्ञानिक जांच करवाएं' : isPunjabi ? 'ਨੇੜਲੀਆਂ ਲੈਬਾਂ ਤੋਂ ਮਿੱਟੀ ਅਤੇ ਫ਼ਸਲ ਦੀ ਵਿਗਿਆਨਕ ਪਰਖ ਕਰਵਾਓ' : 'Get your soil analyzed and crop health checked by certified laboratories nearby',
      icon: TestTube2,
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      bgGlass: 'rgba(34,197,94,0.08)',
      borderColor: '#22c55e',
      badge: isHindi ? 'सर्वाधिक लोकप्रिय' : isPunjabi ? 'ਸਭ ਤੋਂ ਵੱਧ ਪ੍ਰਸਿੱਧ' : 'Most Popular',
      badgeColor: '#22c55e',
      stats: '2-3 days result'
    },
    {
      id: 'vet-service',
      title: isHindi ? 'पशु चिकित्सा सेवाएं' : isPunjabi ? 'ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਸੇਵਾਵਾਂ' : 'Veterinary Services',
      description: isHindi ? 'पशुओं के स्वास्थ्य परीक्षण, टीकाकरण और इलाज के लिए डॉक्टर घर बुलाएं' : isPunjabi ? 'ਪਸ਼ੂਆਂ ਦੇ ਇਲਾਜ, ਟੀਕਾਕਰਨ ਅਤੇ ਜਾਂਚ ਲਈ ਡਾਕਟਰ ਘਰ ਬੁਲਾਓ' : 'Home veterinary visits for your livestock — health checks and emergency treatment',
      icon: Stethoscope,
      gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
      bgGlass: 'rgba(168,85,247,0.08)',
      borderColor: '#a855f7',
      badge: isHindi ? 'होम विजिट' : isPunjabi ? 'ਘਰ ਆ ਕੇ ਸੇਵਾ' : 'Home Visit',
      badgeColor: '#a855f7',
      stats: 'Same day available'
    },
    {
      id: 'crop-scanning',
      title: isHindi ? 'AI फसल रोग स्कैन' : isPunjabi ? 'AI ਫ਼ਸਲ ਰੋਗ ਸਕੈਨ' : 'AI Crop Scanning',
      description: isHindi ? 'फसल की फोटो अपलोड करके बीमारी का तुरंत निदान और उपचार सलाह पाएं' : isPunjabi ? 'ਫ਼ਸਲ ਦੀ ਫ਼ੋਟੋ ਅਪਲੋਡ ਕਰਕੇ ਤੁਰੰਤ ਰੋਗ ਨਿਦਾਨ ਅਤੇ ਸਲਾਹ ਲਵੋ' : 'Upload crop photos for instant AI-powered disease detection and treatment advice',
      icon: Camera,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      bgGlass: 'rgba(59,130,246,0.08)',
      borderColor: '#3b82f6',
      badge: 'AI Powered',
      badgeColor: '#3b82f6',
      stats: 'Instant results'
    },
    {
      id: 'transport',
      title: isHindi ? 'कृषि वाहन व परिवहन' : isPunjabi ? 'ਖੇਤੀਬਾੜੀ ਢੋਆ-ਢੁਆਈ' : 'Transport Services',
      description: isHindi ? 'फसल मंडी ढुलाई, मवेशी और कृषि उपकरणों के लिए वाहन बुक करें' : isPunjabi ? 'ਮੰਡੀ ਫ਼ਸਲ ਲਿਜਾਣ ਅਤੇ ਖੇਤੀ ਸੰਦਾਂ ਲਈ ਗੱਡੀਆਂ ਬੁੱਕ ਕਰੋ' : 'Book trucks and vehicles for harvest, livestock, and agricultural equipment',
      icon: Truck,
      gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
      bgGlass: 'rgba(249,115,22,0.08)',
      borderColor: '#f97316',
      badge: 'On Demand',
      badgeColor: '#f97316',
      stats: 'GPS tracked'
    }
  ];

  const quickStats = [
    { label: isHindi ? 'सक्रिय अनुरोध' : isPunjabi ? 'ਚਾਲੂ ਬੇਨਤੀਆਂ' : 'Active Requests', value: '3', icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
    { label: isHindi ? 'पूर्ण सेवाएं' : isPunjabi ? 'ਮੁਕੰਮਲ ਸੇਵਾਵਾਂ' : 'Completed', value: '12', icon: CheckCircle, color: '#22c55e', bg: '#dcfce7' },
    { label: isHindi ? 'फसल स्वास्थ्य' : isPunjabi ? 'ਫ਼ਸਲ ਸਿਹਤ ਸਕੋਰ' : 'Crop Score', value: '87%', icon: TrendingUp, color: '#3b82f6', bg: '#dbeafe' },
    { label: isHindi ? 'अलर्ट' : isPunjabi ? 'ਚੇਤਾਵਨੀਆਂ' : 'Alerts', value: '1', icon: AlertCircle, color: '#ef4444', bg: '#fee2e2' },
  ];

  const recentActivity = [
    { icon: '🧪', title: 'Soil Test Report Ready', desc: 'Lab has uploaded your report for Field A', time: '2 hours ago', color: '#22c55e', status: 'new' },
    { icon: '🐄', title: 'Vet Visit Scheduled', desc: 'Dr. Priya will visit on Jan 16, Morning', time: '1 day ago', color: '#a855f7', status: 'pending' },
    { icon: '🌾', title: 'Crop Scan Analyzed', desc: 'Minor fungal infection detected in Wheat crop', time: '3 days ago', color: '#f97316', status: 'warning' },
    { icon: '🚛', title: 'Transport Delivered', desc: '15 quintals wheat delivered to Dungarpur Market', time: '1 week ago', color: '#3b82f6', status: 'done' },
  ];

  const weatherData = [
    { day: 'Today', icon: Sun, temp: '28°C', condition: 'Sunny' },
    { day: 'Tue', icon: CloudRain, temp: '24°C', condition: 'Rain' },
    { day: 'Wed', icon: Wind, temp: '26°C', condition: 'Windy' },
    { day: 'Thu', icon: Sun, temp: '30°C', condition: 'Sunny' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)' }}>
      
      {/* Hero Welcome Banner */}
      <div
        className="relative overflow-hidden py-6 px-4 sm:py-8 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #388e3c 100%)',
        }}
      >
        {/* Background decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 right-24 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className="text-emerald-300 text-xs sm:text-sm font-bold tracking-wider uppercase">
                  NEXTGEN KISAN PORTAL
                </span>
              </div>
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1.5 leading-tight">
                Namaste, {user?.name || (isHindi ? 'किसान भाई' : isPunjabi ? 'ਕਿਸਾਨ ਵੀਰ' : 'Kisan')} 🙏
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base mb-3">
                📍 {user?.location || 'Dungarpur, Rajasthan'} • {isHindi ? 'आपका फार्म डैशबोर्ड तैयार है' : isPunjabi ? 'ਤੁਹਾਡਾ ਫਾਰਮ ਡੈਸ਼ਬੋਰਡ ਤਿਆਰ ਹੈ' : 'Your farm dashboard is ready'}
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-emerald-400/20 border border-emerald-400/40 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                  ✅ Verified Farmer
                </span>
                <span className="bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">
                  ⭐ 4.8 Rating
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-center self-end sm:self-auto shrink-0">
              <button
                className="bg-white/15 hover:bg-white/25 border border-white/30 text-white p-2.5 rounded-xl cursor-pointer backdrop-blur-md transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <div className="bg-white/15 border border-white/30 rounded-xl px-3.5 py-2 backdrop-blur-md text-center">
                <div className="text-emerald-300 text-[10px] font-bold tracking-wider">SEASON</div>
                <div className="text-white font-bold text-sm">Rabi 2025</div>
                <div className="text-emerald-200 text-[10px]">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 -mt-3 sm:-mt-5 relative z-10">
          {quickStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-md flex items-center gap-3 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="rounded-xl p-2.5 shrink-0"
                  style={{ background: stat.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium truncate">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Grid: Services (Left) + Sidebar (Right on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-6 items-start">
          
          {/* Main Column */}
          <div className="space-y-6">
            
            {/* Services Section */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Wheat className="w-5 h-5 text-green-600 shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {isHindi ? 'कृषि सेवाएं' : isPunjabi ? 'ਖੇਤੀਬਾੜੀ ਸੇਵਾਵਾਂ' : 'Agricultural Services'}
                </h2>
              </div>

              {/* 2-column on tablet/desktop, 1-column on small mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setActiveModal(service.id)}
                      className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 hover:-translate-y-1"
                      style={{
                        borderColor: `${service.borderColor}30`,
                      }}
                    >
                      {/* Gradient background blob */}
                      <div
                        className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none transition-transform group-hover:scale-125"
                        style={{ background: service.bgGlass }}
                      />

                      {/* Badge */}
                      <span
                        className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded-full border"
                        style={{
                          background: `${service.badgeColor}15`,
                          color: service.badgeColor,
                          borderColor: `${service.badgeColor}35`,
                        }}
                      >
                        {service.badge}
                      </span>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 shadow-md"
                        style={{ background: service.gradient }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: service.borderColor }}
                        >
                          ⏱ {service.stats}
                        </span>
                        <div
                          className="flex items-center gap-1 font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform"
                          style={{ color: service.borderColor }}
                        >
                          <span>{isHindi ? 'बुक करें' : isPunjabi ? 'ਬੁੱਕ ਕਰੋ' : 'Book Now'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  {isHindi ? 'हालिया गतिविधियां' : isPunjabi ? 'ਤਾਜ਼ਾ ਗਤੀਵਿਧੀਆਂ' : 'Recent Activity'}
                </h2>
                <button className="text-green-600 text-xs sm:text-sm font-semibold hover:underline cursor-pointer">
                  {isHindi ? 'सभी देखें →' : isPunjabi ? 'ਸਭ ਵੇਖੋ →' : 'View All →'}
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-green-50/50 border border-slate-100 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ background: `${item.color}15` }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                        {item.title}
                      </div>
                      <div className="text-gray-500 text-[11px] sm:text-xs truncate">
                        {item.desc}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-gray-400">{item.time}</div>
                      {item.status === 'new' && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          NEW
                        </span>
                      )}
                      {item.status === 'warning' && (
                        <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          ACTION
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar (Weather, Crop Health, Farm Tips) */}
          <div className="flex flex-col gap-4 sm:gap-5">
            
            {/* Weather Widget */}
            <div
              className="rounded-2xl p-4 sm:p-5 text-white shadow-md"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              }}
            >
              <div className="text-[11px] font-bold opacity-80 mb-2 tracking-wider">
                🌤 {isHindi ? 'मौसम पूर्वानुमान' : isPunjabi ? 'ਮੌਸਮ ਭਵਿੱਖਬਾਣੀ' : 'WEATHER FORECAST'}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold leading-tight">28°C</div>
              <div className="text-sm opacity-90 mb-1">Sunny Day</div>
              <div className="text-xs opacity-75 mb-3">Dungarpur, Rajasthan</div>
              <div className="grid grid-cols-4 gap-2">
                {weatherData.map((w, i) => {
                  const Icon = w.icon;
                  return (
                    <div
                      key={i}
                      className="text-center bg-white/20 rounded-xl p-2"
                    >
                      <div className="text-[10px] opacity-80">{w.day}</div>
                      <Icon className="w-4 h-4 mx-auto my-1" />
                      <div className="text-xs font-bold">{w.temp}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Crop Health Overview */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-green-600 shrink-0" />
                <h3 className="text-sm font-bold text-gray-900">
                  {isHindi ? 'फसल स्वास्थ्य स्कोर' : isPunjabi ? 'ਫ਼ਸਲ ਸਿਹਤ ਸਥਿਤੀ' : 'Crop Health Overview'}
                </h3>
              </div>
              {[
                { crop: isHindi ? 'गेहूं (Wheat)' : isPunjabi ? 'ਕਣਕ (Wheat)' : 'Wheat', health: 87, color: '#22c55e' },
                { crop: isHindi ? 'धान (Rice)' : isPunjabi ? 'ਝੋਨਾ (Rice)' : 'Rice', health: 72, color: '#f59e0b' },
                { crop: isHindi ? 'टमाटर (Tomato)' : isPunjabi ? 'ਟਮਾਟਰ (Tomato)' : 'Tomato', health: 58, color: '#ef4444' },
              ].map((c, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1 font-semibold text-gray-700">
                    <span>{c.crop}</span>
                    <span style={{ color: c.color }}>{c.health}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${c.health}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Farm Tip */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <div className="text-xs font-bold text-amber-900 mb-1.5 tracking-wider">
                💡 {isHindi ? 'आज का कृषि सुझाव' : isPunjabi ? 'ਅੱਜ ਦਾ ਖੇਤੀ ਸੁਝਾਅ' : "TODAY'S FARM TIP"}
              </div>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                {isHindi
                  ? 'मौसम में नमी को देखते हुए पकी फसल की कटाई जल्द पूरी करें और अनाज को सुरक्षित स्थान पर रखें।'
                  : isPunjabi
                    ? 'ਮੌਸਮ ਦੇ ਹਿਸਾਬ ਨਾਲ ਪੱਕੀ ਹੋਈ ਫ਼ਸਲ ਦੀ ਵਾਢੀ ਸਮੇਂ ਸਿਰ ਕਰੋ ਅਤੇ ਅਨਾਜ ਨੂੰ ਸੁੱਕੀ ਥਾਂ ਤੇ ਸੰਭਾਲੋ।'
                    : 'With rain expected Tuesday, consider harvesting your mature crops today and storing them in a dry place.'}
              </p>
            </div>

            {/* Schemes for You */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-500 shrink-0" />
                <h3 className="text-sm font-bold text-gray-900">
                  {isHindi ? 'सरकारी योजनाएं' : isPunjabi ? 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ' : 'Schemes for You'}
                </h3>
              </div>
              {[
                { name: 'PM-Kisan Samman', amount: '₹6,000/yr', color: '#16a34a' },
                { name: 'Fasal Bima Yojana', amount: 'Coverage', color: '#3b82f6' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2.5 rounded-xl mb-2 bg-slate-50 text-xs font-medium"
                >
                  <span className="text-gray-800">{s.name}</span>
                  <span className="font-bold" style={{ color: s.color }}>{s.amount}</span>
                </div>
              ))}
              <button className="w-full mt-1 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-bold rounded-xl text-xs transition-colors cursor-pointer border border-green-200">
                {isHindi ? 'सभी योजनाएं देखें →' : isPunjabi ? 'ਸਾਰੀਆਂ ਸਕੀਮਾਂ ਵੇਖੋ →' : 'View All Schemes →'}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Modals */}
      {activeModal === 'soil-crop-test' && <SoilCropTestModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'vet-service' && <VetServiceModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'crop-scanning' && <CropScanningModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'transport' && <TransportModal onClose={() => setActiveModal(null)} />}

      {/* Floating Bhoomi AI Assistant Button (Compact on Mobile) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          id="bhoomi-ai-floating-btn"
          onClick={() => setIsBhoomiOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm shadow-xl cursor-pointer hover:scale-105 transition-all border border-white/40"
          style={{
            background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
          }}
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-green-700" />
          </div>
          <span className="hidden sm:inline">Bhoomi AI</span>
          <span className="bg-white/20 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold">
            {isHindi ? 'भूमि AI' : isPunjabi ? 'ਭੂਮੀ AI' : 'Ask AI'}
          </span>
        </button>
      </div>

      {/* Bhoomi AI Chat Modal */}
      <BhoomiAIChat
        isOpen={isBhoomiOpen}
        onClose={() => setIsBhoomiOpen(false)}
      />
    </div>
  );
};

export default FarmerDashboard;