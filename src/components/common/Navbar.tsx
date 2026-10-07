import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, MapPin, Sprout } from 'lucide-react';

const roleConfig: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
  farmer: { label: 'Farmer', color: '#16a34a', bg: '#f0fdf4', emoji: '🌾' },
  lab: { label: 'Lab Technician', color: '#059669', bg: '#ecfdf5', emoji: '🔬' },
  driver: { label: 'Driver', color: '#ea580c', bg: '#fff7ed', emoji: '🚛' },
  ngo: { label: 'NGO Worker', color: '#db2777', bg: '#fdf2f8', emoji: '🤝' },
  vet: { label: 'Veterinarian', color: '#7c3aed', bg: '#faf5ff', emoji: '🩺' },
};

const Navbar: React.FC = () => {
  const { user, setUser, setCurrentStep } = useAuth();

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('login');
  };

  if (!user) return null;

  const config = roleConfig[user.role] || { label: user.role, color: '#16a34a', bg: '#f0fdf4', emoji: '👤' };

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 1px 16px rgba(0,0,0,0.07)',
      borderBottom: `3px solid ${config.color}`,
      position: 'sticky', top: 0, zIndex: 50
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: `linear-gradient(135deg, #16a34a, #15803d)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sprout style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111827', lineHeight: 1 }}>
                NextGen <span style={{ color: config.color }}>किसान</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#9ca3af', letterSpacing: '0.05em' }}>AGRICULTURAL PORTAL</div>
            </div>
          </div>

          {/* Role Badge + User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Role Badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: config.bg, color: config.color,
              border: `1px solid ${config.color}30`,
              padding: '0.3rem 0.75rem', borderRadius: '9999px',
              fontSize: '0.8rem', fontWeight: 700
            }}>
              <span>{config.emoji}</span>
              <span>{config.label}</span>
            </div>

            {/* Location */}
            {user.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}>
                <MapPin style={{ width: '14px', height: '14px' }} />
                <span>{user.location}</span>
              </div>
            )}

            {/* User Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${config.color}30`
              }}>
                <User style={{ width: '15px', height: '15px', color: config.color }} />
              </div>
              {user.name || user.phone}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.4rem 0.875rem', borderRadius: '8px',
                background: '#fef2f2', color: '#dc2626',
                border: '1px solid #fecaca',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; }}
            >
              <LogOut style={{ width: '14px', height: '14px' }} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;