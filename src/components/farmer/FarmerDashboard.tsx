import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  TestTube2, Stethoscope, Camera, Truck, ArrowRight,
  Leaf, Sun, CloudRain, Wind, TrendingUp, Bell, Star,
  CheckCircle, Clock, AlertCircle, Sprout, BarChart3, Wheat
} from 'lucide-react';
import SoilCropTestModal from './modals/SoilCropTestModal';
import VetServiceModal from './modals/VetServiceModal';
import CropScanningModal from './modals/CropScanningModal';
import TransportModal from './modals/TransportModal';

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const services = [
    {
      id: 'soil-crop-test',
      title: 'Soil & Crop Test',
      description: 'Get your soil analyzed and crop health checked by certified laboratories nearby',
      icon: TestTube2,
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      bgGlass: 'rgba(34,197,94,0.08)',
      borderColor: '#22c55e',
      badge: 'Most Popular',
      badgeColor: '#22c55e',
      stats: '2-3 days result'
    },
    {
      id: 'vet-service',
      title: 'Veterinary Services',
      description: 'Home veterinary visits for your livestock — health checks and emergency treatment',
      icon: Stethoscope,
      gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
      bgGlass: 'rgba(168,85,247,0.08)',
      borderColor: '#a855f7',
      badge: 'Home Visit',
      badgeColor: '#a855f7',
      stats: 'Same day available'
    },
    {
      id: 'crop-scanning',
      title: 'AI Crop Scanning',
      description: 'Upload crop photos for instant AI-powered disease detection and treatment advice',
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
      title: 'Transport Services',
      description: 'Book trucks and vehicles for harvest, livestock, and agricultural equipment',
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
    { label: 'Active Requests', value: '3', icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Completed Services', value: '12', icon: CheckCircle, color: '#22c55e', bg: '#dcfce7' },
    { label: 'Crop Health Score', value: '87%', icon: TrendingUp, color: '#3b82f6', bg: '#dbeafe' },
    { label: 'Alerts', value: '1', icon: AlertCircle, color: '#ef4444', bg: '#fee2e2' },
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)' }}>
      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #388e3c 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '100px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', top: '10px', left: '60%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sprout style={{ width: '20px', height: '20px', color: '#86efac' }} />
                <span style={{ color: '#86efac', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>NEXTGEN KISAN PORTAL</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Namaste, {user?.name || 'Kisan'} 🙏
              </h1>
              <p style={{ color: '#bbf7d0', fontSize: '1rem', marginBottom: '1rem' }}>
                📍 {user?.location || 'Dungarpur, Rajasthan'} • Your farm dashboard is ready
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(134,239,172,0.2)', border: '1px solid rgba(134,239,172,0.4)', color: '#86efac', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✅ Verified Farmer
                </span>
                <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fde047', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ⭐ 4.8 Rating
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <Bell style={{ width: '20px', height: '20px' }} />
              </button>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}>
                <div style={{ color: '#86efac', fontSize: '0.75rem', fontWeight: 600 }}>SEASON</div>
                <div style={{ color: 'white', fontWeight: 700 }}>Rabi 2025</div>
                <div style={{ color: '#bbf7d0', fontSize: '0.75rem' }}>Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>

        {/* Quick Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem', marginTop: '-1rem' }}>
          {quickStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'transform 0.2s',
                cursor: 'default'
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ background: stat.bg, borderRadius: '10px', padding: '0.5rem', flexShrink: 0 }}>
                  <Icon style={{ width: '18px', height: '18px', color: stat.color }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500 }}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
          <div>
            {/* Services Section */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Wheat style={{ width: '20px', height: '20px', color: '#16a34a' }} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Agricultural Services</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setActiveModal(service.id)}
                      style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                        cursor: 'pointer',
                        border: `1px solid ${service.borderColor}22`,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = `0 12px 40px ${service.borderColor}30`;
                        e.currentTarget.style.borderColor = `${service.borderColor}66`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)';
                        e.currentTarget.style.borderColor = `${service.borderColor}22`;
                      }}
                    >
                      {/* Gradient bg blob */}
                      <div style={{
                        position: 'absolute', top: '-20px', right: '-20px',
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: service.bgGlass
                      }} />
                      {/* Badge */}
                      <span style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: `${service.badgeColor}15`,
                        color: service.badgeColor,
                        fontSize: '0.7rem', fontWeight: 700,
                        padding: '0.2rem 0.6rem', borderRadius: '9999px',
                        border: `1px solid ${service.badgeColor}30`
                      }}>
                        {service.badge}
                      </span>

                      <div style={{
                        width: '52px', height: '52px', borderRadius: '14px',
                        background: service.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1rem',
                        boxShadow: `0 4px 12px ${service.borderColor}40`
                      }}>
                        <Icon style={{ width: '26px', height: '26px', color: 'white' }} />
                      </div>

                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, marginBottom: '1rem' }}>
                        {service.description}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: service.borderColor, fontWeight: 600 }}>
                          ⏱ {service.stats}
                        </span>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '0.25rem',
                          color: service.borderColor, fontWeight: 600, fontSize: '0.85rem'
                        }}>
                          <span>Book Now</span>
                          <ArrowRight style={{ width: '14px', height: '14px' }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: 0 }}>Recent Activity</h2>
                <button style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  View All →
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentActivity.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.875rem', borderRadius: '12px',
                    background: '#f9fafb',
                    border: '1px solid #f3f4f6',
                    transition: 'background 0.2s'
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0fdf4')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#f9fafb')}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      background: `${item.color}15`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{item.title}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.1rem' }}>{item.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.time}</div>
                      {item.status === 'new' && (
                        <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '9999px', fontWeight: 700 }}>NEW</span>
                      )}
                      {item.status === 'warning' && (
                        <span style={{ background: '#fef3c7', color: '#d97706', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '9999px', fontWeight: 700 }}>ACTION</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Weather Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              borderRadius: '20px',
              padding: '1.25rem',
              boxShadow: '0 8px 32px rgba(14,165,233,0.3)',
              color: 'white'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>🌤 WEATHER FORECAST</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>28°C</div>
              <div style={{ opacity: 0.9, marginBottom: '0.25rem' }}>Sunny Day</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>Dungarpur, Rajasthan</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {weatherData.map((w, i) => {
                  const Icon = w.icon;
                  return (
                    <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.5rem 0.25rem' }}>
                      <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{w.day}</div>
                      <Icon style={{ width: '16px', height: '16px', margin: '0.25rem auto' }} />
                      <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{w.temp}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Crop Health */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <BarChart3 style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Crop Health Overview</h3>
              </div>
              {[
                { crop: 'Wheat', health: 87, color: '#22c55e' },
                { crop: 'Rice', health: 72, color: '#f59e0b' },
                { crop: 'Tomato', health: 58, color: '#ef4444' },
              ].map((c, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 600 }}>{c.crop}</span>
                    <span style={{ fontSize: '0.8rem', color: c.color, fontWeight: 700 }}>{c.health}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${c.health}%`, background: c.color, borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tips */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '20px', padding: '1.25rem',
              border: '1px solid #fde68a'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>💡 TODAY'S FARM TIP</div>
              <p style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: 1.5, margin: 0 }}>
                With rain expected Tuesday, consider harvesting your mature crops today and storing them in a dry place to prevent moisture damage.
              </p>
            </div>

            {/* Government Schemes */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Star style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Schemes for You</h3>
              </div>
              {[
                { name: 'PM-Kisan Samman', amount: '₹6,000/yr', color: '#16a34a' },
                { name: 'Fasal Bima Yojana', amount: 'Coverage', color: '#3b82f6' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.5rem', borderRadius: '10px', marginBottom: '0.5rem',
                  background: '#f9fafb'
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontSize: '0.75rem', color: s.color, fontWeight: 700 }}>{s.amount}</span>
                </div>
              ))}
              <button style={{
                width: '100%', padding: '0.5rem', background: '#f0fdf4',
                color: '#16a34a', border: '1px solid #bbf7d0',
                borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                marginTop: '0.25rem'
              }}>
                View All Schemes →
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
    </div>
  );
};

export default FarmerDashboard;