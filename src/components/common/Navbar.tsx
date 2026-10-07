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

  const isEnglish = language === 'english';
  const defaultProfileName = user.role === 'farmer'
    ? (isEnglish ? 'Farmer Profile' : 'किसान प्रोफाइल')
    : (isEnglish ? 'User Profile' : 'यूजर प्रोफाइल');

  return (
    <>
      <nav style={{
        background: 'white',
        boxShadow: '0 1px 16px rgba(0,0,0,0.07)',
        borderBottom: `3px solid ${visual.color}`,
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: `linear-gradient(135deg, #16a34a, #15803d)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)'
              }}>
                <Sprout style={{ width: '22px', height: '22px', color: 'white' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#111827', lineHeight: 1 }}>
                  NextGen <span style={{ color: visual.color }}>किसान</span>
                </div>
                <div style={{ fontSize: '0.625rem', color: '#9ca3af', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {t.portalSubtitle}
                </div>
              </div>
            </div>

            {/* Right side items */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>

              {/* Language Switcher Dropdown in Navbar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.2rem 0.4rem',
                gap: '0.25rem'
              }}>
                <Globe style={{ width: '13px', height: '13px', color: '#64748b' }} />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer',
                    outline: 'none',
                    padding: '0.1rem 0'
                  }}
                  title="Switch Language / भाषा बदलें"
                >
                  <option value="english">EN (English)</option>
                  <option value="hindi">HI (हिंदी)</option>
                  <option value="regional">ਪੰਜਾਬੀ (Punjabi)</option>
                </select>
              </div>

              {/* Role Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                background: visual.bg, color: visual.color,
                border: `1px solid ${visual.color}35`,
                padding: '0.3rem 0.75rem', borderRadius: '9999px',
                fontSize: '0.8rem', fontWeight: 700
              }}>
                <span>{visual.emoji}</span>
                <span className="hidden sm:inline">{roleLabel}</span>
              </div>

              {/* Location (hidden on very small screens) */}
              {user.location && (
                <div
                  className="hidden lg:flex"
                  style={{ alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}
                >
                  <MapPin style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                  <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.location}
                  </span>
                </div>
              )}

              {/* Clickable User Profile Button */}
              <button
                id="user-profile-button"
                onClick={() => setIsProfileOpen(true)}
                title={t.viewProfile}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  color: '#1e293b',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = visual.bg;
                  e.currentTarget.style.borderColor = `${visual.color}60`;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: visual.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${visual.color}`,
                  flexShrink: 0
                }}>
                  <User style={{ width: '16px', height: '16px', color: visual.color }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                  <span style={{ lineHeight: 1.1, fontSize: '0.825rem', fontWeight: 700, color: '#1f2937' }}>
                    {user.name || defaultProfileName}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: visual.color, fontWeight: 600 }}>
                    {t.viewProfile}
                  </span>
                </div>
                <ChevronDown style={{ width: '14px', height: '14px', color: '#94a3b8', marginLeft: '0.15rem' }} />
              </button>

              {/* Quick Logout Button */}
              <button
                onClick={handleLogout}
                title={t.logout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.45rem 0.8rem', borderRadius: '10px',
                  background: '#fef2f2', color: '#dc2626',
                  border: '1px solid #fecaca',
                  fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#fee2e2';
                  e.currentTarget.style.borderColor = '#fca5a5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fef2f2';
                  e.currentTarget.style.borderColor = '#fecaca';
                }}
              >
                <LogOut style={{ width: '14px', height: '14px' }} />
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