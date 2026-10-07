import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, MapPin, Sprout, ChevronDown } from 'lucide-react';
import UserProfileModal from './UserProfileModal';

const roleConfig: Record<string, { label: string; hindiLabel: string; color: string; bg: string; emoji: string }> = {
  farmer: { label: 'Farmer', hindiLabel: 'किसान', color: '#16a34a', bg: '#f0fdf4', emoji: '🌾' },
  lab: { label: 'Lab Technician', hindiLabel: 'लैब तकनीशियन', color: '#059669', bg: '#ecfdf5', emoji: '🔬' },
  driver: { label: 'Driver', hindiLabel: 'चालक', color: '#ea580c', bg: '#fff7ed', emoji: '🚛' },
  ngo: { label: 'NGO Worker', hindiLabel: 'एनजीओ', color: '#db2777', bg: '#fdf2f8', emoji: '🤝' },
  vet: { label: 'Veterinarian', hindiLabel: 'पशु चिकित्सक', color: '#7c3aed', bg: '#faf5ff', emoji: '🩺' },
};

const Navbar: React.FC = () => {
  const { user, setUser, setCurrentStep } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('login');
  };

  if (!user) return null;

  const config = roleConfig[user.role] || { label: user.role, hindiLabel: 'उपयोगकर्ता', color: '#16a34a', bg: '#f0fdf4', emoji: '👤' };

  return (
    <>
      <nav style={{
        background: 'white',
        boxShadow: '0 1px 16px rgba(0,0,0,0.07)',
        borderBottom: `3px solid ${config.color}`,
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
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
                  NextGen <span style={{ color: config.color }}>किसान</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#9ca3af', letterSpacing: '0.05em', fontWeight: 600 }}>AGRICULTURAL PORTAL</div>
              </div>
            </div>

            {/* Right side items: Role Badge + Clickable User Profile + Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Role Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: config.bg, color: config.color,
                border: `1px solid ${config.color}35`,
                padding: '0.35rem 0.8rem', borderRadius: '9999px',
                fontSize: '0.8rem', fontWeight: 700
              }}>
                <span>{config.emoji}</span>
                <span>{config.hindiLabel}</span>
              </div>

              {/* Location (hidden on very small screens) */}
              {user.location && (
                <div
                  className="hidden md:flex"
                  style={{ alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}
                >
                  <MapPin style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                  <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.location}
                  </span>
                </div>
              )}

              {/* Clickable User Profile Button */}
              <button
                id="user-profile-button"
                onClick={() => setIsProfileOpen(true)}
                title="प्रोफाइल देखें / View Profile"
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
                  e.currentTarget.style.background = config.bg;
                  e.currentTarget.style.borderColor = `${config.color}60`;
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
                  background: config.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${config.color}`,
                  flexShrink: 0
                }}>
                  <User style={{ width: '16px', height: '16px', color: config.color }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                  <span style={{ lineHeight: 1.1, fontSize: '0.85rem', fontWeight: 700, color: '#1f2937' }}>
                    {user.name || (user.role === 'farmer' ? 'किसान प्रोफाइल' : (user.phone || 'यूजर प्रोफाइल'))}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: config.color, fontWeight: 600 }}>
                    प्रोफाइल देखें
                  </span>
                </div>
                <ChevronDown style={{ width: '14px', height: '14px', color: '#94a3b8', marginLeft: '0.2rem' }} />
              </button>

              {/* Quick Logout Button */}
              <button
                onClick={handleLogout}
                title="लॉगआउट करें"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.45rem 0.85rem', borderRadius: '10px',
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
                <span className="hidden sm:inline">Logout</span>
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