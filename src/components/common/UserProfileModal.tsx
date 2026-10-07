import React, { useState } from 'react';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { getTranslation, Language } from '../../utils/translations';
import {
  X, LogOut, Phone, MapPin, ShieldCheck, CheckCircle2,
  Award, Sprout, CreditCard,
  FileText, Globe, Bot, MessageSquare
} from 'lucide-react';
import BhoomiAIChat from '../farmer/BhoomiAIChat';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
}

const roleTheme: Record<string, {
  color: string;
  lightBg: string;
  gradient: string;
  badgeBg: string;
  emoji: string;
}> = {
  farmer: {
    color: '#16a34a',
    lightBg: '#f0fdf4',
    gradient: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
    badgeBg: '#dcfce7',
    emoji: '🌾',
  },
  vet: {
    color: '#7c3aed',
    lightBg: '#faf5ff',
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #a855f7 100%)',
    badgeBg: '#f3e8ff',
    emoji: '🩺',
  },
  lab: {
    color: '#059669',
    lightBg: '#ecfdf5',
    gradient: 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
    badgeBg: '#d1fae5',
    emoji: '🔬',
  },
  driver: {
    color: '#ea580c',
    lightBg: '#fff7ed',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)',
    badgeBg: '#ffedd5',
    emoji: '🚛',
  },
  ngo: {
    color: '#db2777',
    lightBg: '#fdf2f8',
    gradient: 'linear-gradient(135deg, #be185d 0%, #db2777 50%, #f472b6 100%)',
    badgeBg: '#fce7f3',
    emoji: '🤝',
  },
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
}) => {
  const { language, setLanguage } = useAuth();
  const [isBhoomiOpen, setIsBhoomiOpen] = useState(false);

  if (!isOpen) return null;

  const t = getTranslation(language);
  const theme = roleTheme[user.role] || roleTheme.farmer;
  const roleName = t.roles[user.role as keyof typeof t.roles] || user.role;

  // Masked Aadhaar
  const rawAadhaar = user.aadhaarDetails?.aadhaarNumber || '543287659481';
  const maskedAadhaar = rawAadhaar.length >= 8
    ? `XXXX-XXXX-${rawAadhaar.slice(-4)}`
    : `XXXX-XXXX-9481`;

  // Dynamic names & locations based on selected language
  const isEnglish = language === 'english';
  const displayName = user.name || (user.role === 'farmer' ? t.defaultFarmerName : t.defaultVetName);
  const displayLocation = user.location || user.aadhaarDetails?.address || t.defaultLocation;
  const displayPhone = user.phone ? `+91 ${user.phone}` : '+91 98765 43210';

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(0.5rem, 2.5vw, 1rem)',
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '560px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh',
            animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Banner Header */}
          <div
            style={{
              background: theme.gradient,
              padding: '1.75rem 1.5rem 1.25rem',
              position: 'relative',
              color: '#ffffff',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Avatar */}
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                {theme.emoji}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: '#22c55e',
                    border: '2px solid #ffffff',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2 style={{ width: '12px', height: '12px', color: '#ffffff' }} />
                </div>
              </div>

              {/* Title / Name */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                    {displayName}
                  </h2>
                </div>
                <p style={{ margin: '0.2rem 0 0.5rem', fontSize: '0.85rem', opacity: 0.95 }}>
                  {displayPhone}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(4px)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <ShieldCheck style={{ width: '13px', height: '13px' }} />
                    {roleName} ({t.verified})
                  </span>
                  <span
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.35)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {t.aadhaarVerified}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Quick-Switch Bar inside Profile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.6rem 1.5rem',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontWeight: 600 }}>
              <Globe style={{ width: '14px', height: '14px', color: '#2563eb' }} />
              <span>{isEnglish ? 'Display Language:' : 'भाषा चुनें:'}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {(['english', 'hindi', 'regional'] as Language[]).map((lang) => {
                const active = language === lang;
                const label = lang === 'english' ? 'English' : lang === 'hindi' ? 'हिंदी' : 'ਪੰਜਾਬੀ';
                return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: active ? 700 : 500,
                      backgroundColor: active ? theme.color : '#ffffff',
                      color: active ? '#ffffff' : '#475569',
                      border: `1px solid ${active ? theme.color : '#cbd5e1'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Body */}
          <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Bhoomi AI Chatbot Showcase Card (for Farmer) */}
            {user.role === 'farmer' && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #15803d 0%, #16a34a 60%, #22c55e 100%)',
                  borderRadius: '16px',
                  padding: '1rem 1.15rem',
                  color: '#ffffff',
                  boxShadow: '0 6px 18px rgba(22, 163, 74, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    <Bot style={{ width: '26px', height: '26px', color: '#16a34a' }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem' }}>Bhoomi AI (भूमि AI)</span>
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.25)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {isEnglish ? '24/7 AI Advisor' : 'कृषि सलाहकार'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#dcfce7', marginTop: '0.15rem', lineHeight: 1.3 }}>
                      {isEnglish
                        ? 'Chat in English about crops, fertilizers, pest remedies & subsidies'
                        : 'फसल रोग, यूरिया खाद, मौसम व सरकारी योजनाओं पर हिंदी में सवाल पूछें'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsBhoomiOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    color: '#15803d',
                    fontSize: '0.825rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dcfce7';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <MessageSquare style={{ width: '15px', height: '15px' }} />
                  <span>{isEnglish ? 'Chat with Bhoomi AI →' : 'भूमि AI से पूछें →'}</span>
                </button>
              </div>
            )}

            {/* Identity & Contact Card */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1rem',
              }}
            >
              <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.825rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText style={{ width: '14px', height: '14px', color: theme.color }} />
                {t.identitySection}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>{t.phoneLabel}</div>
                  <div style={{ fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                    <Phone style={{ width: '13px', height: '13px', color: '#64748b' }} />
                    {displayPhone}
                  </div>
                </div>

                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>{t.aadhaarLabel}</div>
                  <div style={{ fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                    <CreditCard style={{ width: '13px', height: '13px', color: '#64748b' }} />
                    <span>{maskedAadhaar}</span>
                    <span style={{ fontSize: '0.7rem', color: '#16a34a', backgroundColor: '#dcfce7', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                      {t.verified}
                    </span>
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>{t.locationLabel}</div>
                  <div style={{ fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'flex-start', gap: '0.35rem', marginTop: '0.15rem' }}>
                    <MapPin style={{ width: '14px', height: '14px', color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                    <span>{displayLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Specific Agriculture Card */}
            {user.role === 'farmer' && (
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '1rem',
                }}
              >
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.825rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sprout style={{ width: '14px', height: '14px', color: '#16a34a' }} />
                  {t.farmSection}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{t.totalLand}</div>
                    <div style={{ fontWeight: 700, color: '#166534', marginTop: '0.15rem' }}>{t.totalLandValue}</div>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{t.mainCrops}</div>
                    <div style={{ fontWeight: 700, color: '#166534', marginTop: '0.15rem' }}>{t.mainCropsValue}</div>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{t.kccCard}</div>
                    <div style={{ fontWeight: 700, color: '#166534', marginTop: '0.15rem' }}>{t.kccValue}</div>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{t.soilCard}</div>
                    <div style={{ fontWeight: 700, color: '#166534', marginTop: '0.15rem' }}>{t.soilCardValue}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Details for other roles */}
            {user.role !== 'farmer' && (
              <div
                style={{
                  backgroundColor: theme.lightBg,
                  border: `1px solid ${theme.color}30`,
                  borderRadius: '12px',
                  padding: '1rem',
                }}
              >
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.825rem', fontWeight: 700, color: theme.color, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award style={{ width: '14px', height: '14px', color: theme.color }} />
                  {t.profSection}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.75rem', borderRadius: '8px', border: `1px solid ${theme.color}20` }}>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{t.licenseLabel}</div>
                    <div style={{ fontWeight: 700, color: '#1e293b', marginTop: '0.15rem' }}>
                      {user.professionalDetails?.license || 'AGRI-REG-2024-789'}
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.75rem', borderRadius: '8px', border: `1px solid ${theme.color}20` }}>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{t.fieldLabel}</div>
                    <div style={{ fontWeight: 700, color: '#1e293b', marginTop: '0.15rem' }}>
                      {roleName} Services
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Platform Performance / Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                textAlign: 'center',
              }}
            >
              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>12</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{t.totalServicesLabel}</div>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>4.9 ★</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{t.trustScoreLabel}</div>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>100%</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{t.verifiedProfileLabel}</div>
              </div>
            </div>
          </div>

          {/* Modal Footer with Prominent Logout */}
          <div
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              {t.close}
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.4rem',
                borderRadius: '10px',
                border: '1px solid #f87171',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LogOut style={{ width: '16px', height: '16px' }} />
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Bhoomi AI Chat Modal */}
      <BhoomiAIChat
        isOpen={isBhoomiOpen}
        onClose={() => setIsBhoomiOpen(false)}
      />
    </>
  );
};

export default UserProfileModal;
