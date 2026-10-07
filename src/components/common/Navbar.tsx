import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, MapPin, Sprout, ChevronDown, Globe } from 'lucide-react';
import UserProfileModal from './UserProfileModal';
import { getTranslation, Language } from '../../utils/translations';

const roleVisuals: Record<string, { color: string; bg: string; emoji: string }> = {
  farmer: { color: '#16a34a', bg: '#f0fdf4', emoji: '🌾' },
  lab: { color: '#059669', bg: '#ecfdf5', emoji: '🔬' },
  driver: { color: '#ea580c', bg: '#fff7ed', emoji: '🚛' },
  ngo: { color: '#db2777', bg: '#fdf2f8', emoji: '🤝' },
  vet: { color: '#7c3aed', bg: '#faf5ff', emoji: '🩺' },
};

const Navbar: React.FC = () => {
  const { user, setUser, setCurrentStep, language, setLanguage } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('login');
  };

  if (!user) return null;

  const t = getTranslation(language);
  const visual = roleVisuals[user.role] || { color: '#16a34a', bg: '#f0fdf4', emoji: '👤' };
  const roleLabel = t.roles[user.role as keyof typeof t.roles] || user.role;

  const defaultProfileName = user.role === 'farmer'
    ? (language === 'hindi' ? 'किसान प्रोफाइल' : language === 'regional' ? 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ' : 'Farmer Profile')
    : (language === 'hindi' ? 'उपयोगकर्ता प्रोफाइल' : language === 'regional' ? 'ਯੂਜ਼ਰ ਪ੍ਰੋਫਾਈਲ' : 'User Profile');

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-white shadow-xs border-b-[3px]"
        style={{ borderBottomColor: visual.color }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2">

            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                }}
              >
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight">
                  NextGen{' '}
                  <span style={{ color: visual.color }}>
                    {language === 'hindi' ? 'किसान' : language === 'regional' ? 'ਕਿਸਾਨ' : 'Kisan'}
                  </span>
                </div>
                <div className="hidden sm:block text-[10px] text-gray-400 tracking-wider font-semibold">
                  {t.portalSubtitle}
                </div>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">

              {/* Language Switcher Dropdown */}
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-1.5 sm:px-2 py-1 gap-1 shrink-0">
                <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent border-none text-[11px] sm:text-xs font-semibold text-slate-700 cursor-pointer outline-none pr-0.5"
                  title={language === 'hindi' ? 'भाषा बदलें' : language === 'regional' ? 'ਭਾਸ਼ਾ ਬਦਲੋ' : 'Switch Language'}
                >
                  <option value="english">EN</option>
                  <option value="hindi">HI (हिंदी)</option>
                  <option value="regional">ਪੰਜਾਬੀ</option>
                </select>
              </div>

              {/* Role Badge */}
              <div
                className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-bold shrink-0"
                style={{
                  background: visual.bg,
                  color: visual.color,
                  border: `1px solid ${visual.color}35`,
                }}
              >
                <span>{visual.emoji}</span>
                <span className="hidden md:inline">{roleLabel}</span>
              </div>

              {/* Location (Desktop only) */}
              {user.location && (
                <div className="hidden lg:flex items-center gap-1 text-gray-500 text-xs shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="max-w-[120px] truncate">{user.location}</span>
                </div>
              )}

              {/* User Profile Button */}
              <button
                id="user-profile-button"
                onClick={() => setIsProfileOpen(true)}
                title={t.viewProfile}
                className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-gray-800 transition-all cursor-pointer outline-none shrink-0"
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border"
                  style={{
                    background: visual.bg,
                    borderColor: visual.color,
                  }}
                >
                  <User className="w-4 h-4" style={{ color: visual.color }} />
                </div>
                <div className="hidden md:flex flex-col items-flex-start text-left">
                  <span className="text-xs font-bold text-gray-900 leading-tight truncate max-w-[100px]">
                    {user.name || defaultProfileName}
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: visual.color }}>
                    {t.viewProfile}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
              </button>

              {/* Quick Logout Button */}
              <button
                onClick={handleLogout}
                title={t.logout}
                className="flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold cursor-pointer transition-all shrink-0"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">{t.logout}</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;