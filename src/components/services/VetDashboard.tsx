import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Stethoscope, Clock, CheckCircle, X, MapPin, Phone, Eye,
  TrendingUp, Star, Activity, Calendar, Award, Bell, User,
  ArrowRight, AlertTriangle, HeartPulse
} from 'lucide-react';

interface VetRequest {
  id: string;
  farmerName: string;
  farmLocation: string;
  animalType: string;
  issue: string;
  urgency: string;
  requestDate: string;
  status: string;
  phone: string;
  preferredTime?: string;
  acceptedDate?: string;
  scheduledDate?: string;
  completionDate?: string;
  diagnosis?: string;
}

const VetDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'completed'>('pending');

  const vetRequests: VetRequest[] = [
    {
      id: 'VR001',
      farmerName: 'Rajesh Kumar',
      farmLocation: 'Village Kothpura, Dungarpur',
      animalType: 'Cattle (Cow/Buffalo)',
      issue: 'Cow is not eating properly and seems lethargic for the past 2 days. Also showing signs of fever.',
      urgency: 'Normal',
      requestDate: '2025-01-15',
      status: 'pending',
      phone: '9876543210',
      preferredTime: 'Morning (6 AM - 12 PM)'
    },
    {
      id: 'VR002',
      farmerName: 'Sunita Devi',
      farmLocation: 'Saheli Village, Dungarpur',
      animalType: 'Goat/Sheep',
      issue: 'Three goats showing respiratory problems and coughing. Urgent attention needed.',
      urgency: 'Urgent',
      requestDate: '2025-01-15',
      status: 'pending',
      phone: '9876543211',
      preferredTime: 'Immediate'
    },
    {
      id: 'VR003',
      farmerName: 'Mohan Singh',
      farmLocation: 'Bichhiwara, Dungarpur',
      animalType: 'Cattle (Cow/Buffalo)',
      issue: 'Buffalo pregnancy check and general health consultation.',
      urgency: 'Normal',
      requestDate: '2025-01-14',
      status: 'accepted',
      phone: '9876543212',
      preferredTime: 'Afternoon (12 PM - 6 PM)',
      acceptedDate: '2025-01-14',
      scheduledDate: '2025-01-16'
    },
    {
      id: 'VR004',
      farmerName: 'Priya Sharma',
      farmLocation: 'Aspur, Dungarpur',
      animalType: 'Poultry',
      issue: 'Several chickens died suddenly. Need to examine remaining flock for disease.',
      urgency: 'Emergency',
      requestDate: '2025-01-13',
      status: 'completed',
      phone: '9876543213',
      completionDate: '2025-01-13',
      diagnosis: 'Newcastle disease detected. Provided vaccination and treatment protocol.'
    }
  ];

  const filteredRequests = vetRequests.filter(r => r.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Request ${requestId} accepted! You can now contact the farmer to schedule your visit.`);
  };

  const handleRejectRequest = (requestId: string) => {
    alert(`Request ${requestId} rejected. Farmer will be notified.`);
  };

  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case 'Emergency': return { bg: '#fee2e2', color: '#dc2626', label: '🚨 Emergency', border: '#fca5a5' };
      case 'Urgent': return { bg: '#fff7ed', color: '#ea580c', label: '⚠️ Urgent', border: '#fed7aa' };
      default: return { bg: '#f0fdf4', color: '#16a34a', label: '✅ Normal', border: '#bbf7d0' };
    }
  };

  const getAnimalEmoji = (animalType: string) => {
    if (animalType.includes('Cattle')) return '🐄';
    if (animalType.includes('Goat')) return '🐐';
    if (animalType.includes('Poultry')) return '🐔';
    return '🐴';
  };

  const stats = [
    { label: 'Pending', value: vetRequests.filter(r => r.status === 'pending').length, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Accepted', value: vetRequests.filter(r => r.status === 'accepted').length, icon: Activity, color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Completed', value: vetRequests.filter(r => r.status === 'completed').length, icon: CheckCircle, color: '#22c55e', bg: '#dcfce7' },
    { label: 'This Month', value: '18', icon: TrendingUp, color: '#3b82f6', bg: '#dbeafe' },
  ];

  const tabs = [
    { key: 'pending', label: 'Pending', count: vetRequests.filter(r => r.status === 'pending').length, icon: '🕐' },
    { key: 'accepted', label: 'Accepted', count: vetRequests.filter(r => r.status === 'accepted').length, icon: '📋' },
    { key: 'completed', label: 'Completed', count: vetRequests.filter(r => r.status === 'completed').length, icon: '✅' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdf4ff 0%, #f5f3ff 50%, #ede9fe 100%)' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '200px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <HeartPulse style={{ width: '20px', height: '20px', color: '#c4b5fd' }} />
                <span style={{ color: '#c4b5fd', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>VETERINARY PORTAL</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Dr. {user?.name || 'Veterinarian'} 👨‍⚕️
              </h1>
              <p style={{ color: '#ddd6fe', fontSize: '1rem', marginBottom: '1rem' }}>
                🏥 Certified Veterinarian • Home Visit Specialist
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(196,181,253,0.2)', border: '1px solid rgba(196,181,253,0.4)', color: '#c4b5fd', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✅ Verified Doctor
                </span>
                <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fde047', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ⭐ 4.9 Rating
                </span>
                <span style={{ background: 'rgba(134,239,172,0.2)', border: '1px solid rgba(134,239,172,0.4)', color: '#86efac', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  🟢 Available Today
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem', borderRadius: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center' }}>
                <Bell style={{ width: '20px', height: '20px' }} />
              </button>
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: '#c4b5fd', fontSize: '0.7rem', fontWeight: 600 }}>TODAY'S SCHEDULE</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>3 Visits</div>
                <div style={{ color: '#ddd6fe', fontSize: '0.75rem' }}>Scheduled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem', marginTop: '-1rem' }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{
                background: 'white', borderRadius: '16px', padding: '1.1rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                transition: 'transform 0.2s', cursor: 'default'
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ background: stat.bg, borderRadius: '10px', padding: '0.5rem', flexShrink: 0 }}>
                  <Icon style={{ width: '18px', height: '18px', color: stat.color }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500 }}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Main Content */}
          <div>
            {/* Tabs */}
            <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              {/* Tab Header */}
              <div style={{ borderBottom: '1px solid #f3f4f6', display: 'flex', padding: '0 1.5rem' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as any)}
                    style={{
                      padding: '1rem 1.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      borderBottom: selectedTab === tab.key ? '3px solid #7c3aed' : '3px solid transparent',
                      color: selectedTab === tab.key ? '#7c3aed' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                    <span style={{
                      background: selectedTab === tab.key ? '#ede9fe' : '#f3f4f6',
                      color: selectedTab === tab.key ? '#7c3aed' : '#6b7280',
                      fontSize: '0.7rem', padding: '0.1rem 0.5rem',
                      borderRadius: '9999px', fontWeight: 700
                    }}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Cards */}
              <div style={{ padding: '1.5rem' }}>
                {filteredRequests.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <Stethoscope style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.4 }} />
                    <p style={{ fontSize: '1rem', fontWeight: 500 }}>No {selectedTab} requests</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>New requests will appear here</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredRequests.map(request => {
                      const urgencyConfig = getUrgencyConfig(request.urgency);
                      return (
                        <div key={request.id} style={{
                          border: '1px solid #f3f4f6',
                          borderRadius: '16px',
                          padding: '1.25rem',
                          transition: 'all 0.2s',
                          background: '#fafafa'
                        }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.12)';
                            e.currentTarget.style.borderColor = '#ddd6fe';
                            e.currentTarget.style.background = 'white';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#f3f4f6';
                            e.currentTarget.style.background = '#fafafa';
                          }}
                        >
                          {/* Top row */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{
                                width: '44px', height: '44px', borderRadius: '12px',
                                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.3rem'
                              }}>
                                {getAnimalEmoji(request.animalType)}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>{request.farmerName}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}>
                                  <MapPin style={{ width: '12px', height: '12px' }} />
                                  {request.farmLocation}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                              <span style={{
                                background: urgencyConfig.bg, color: urgencyConfig.color,
                                border: `1px solid ${urgencyConfig.border}`,
                                fontSize: '0.75rem', padding: '0.2rem 0.6rem',
                                borderRadius: '9999px', fontWeight: 700
                              }}>
                                {urgencyConfig.label}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>#{request.id}</span>
                            </div>
                          </div>

                          {/* Info Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                              <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>ANIMAL TYPE</div>
                              <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.animalType}</div>
                            </div>
                            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                              <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>PHONE</div>
                              <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Phone style={{ width: '12px', height: '12px' }} />
                                {request.phone}
                              </div>
                            </div>
                            {request.preferredTime && (
                              <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>PREFERRED TIME</div>
                                <div style={{ fontWeight: 600, color: '#7c3aed', fontSize: '0.875rem' }}>{request.preferredTime}</div>
                              </div>
                            )}
                          </div>

                          {/* Issue Description */}
                          <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: 700, marginBottom: '0.4rem' }}>🩺 HEALTH ISSUE</div>
                            <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>{request.issue}</div>
                          </div>

                          {/* Accepted Info */}
                          {request.status === 'accepted' && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                                <div>
                                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Accepted: </span>
                                  <span>{request.acceptedDate}</span>
                                </div>
                                <div>
                                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Scheduled: </span>
                                  <span style={{ fontWeight: 700 }}>{request.scheduledDate}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Completed Info */}
                          {request.status === 'completed' && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                              <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.4rem' }}>📋 DIAGNOSIS & TREATMENT</div>
                              <div style={{ fontSize: '0.875rem', color: '#374151' }}>{request.diagnosis}</div>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.4rem' }}>Completed: {request.completionDate}</div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              padding: '0.5rem 1rem', borderRadius: '10px',
                              background: '#faf5ff', color: '#7c3aed',
                              border: '1px solid #e9d5ff', cursor: 'pointer',
                              fontSize: '0.8rem', fontWeight: 600
                            }}>
                              <Eye style={{ width: '14px', height: '14px' }} />
                              View Details
                            </button>

                            {request.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleRejectRequest(request.id)}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    padding: '0.5rem 1rem', borderRadius: '10px',
                                    background: '#fef2f2', color: '#dc2626',
                                    border: '1px solid #fecaca', cursor: 'pointer',
                                    fontSize: '0.8rem', fontWeight: 600
                                  }}>
                                  <X style={{ width: '14px', height: '14px' }} />
                                  Decline
                                </button>
                                <button
                                  onClick={() => handleAcceptRequest(request.id)}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    padding: '0.5rem 1.25rem', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                    color: 'white', border: 'none', cursor: 'pointer',
                                    fontSize: '0.8rem', fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
                                  }}>
                                  <CheckCircle style={{ width: '14px', height: '14px' }} />
                                  Accept & Schedule
                                </button>
                              </>
                            )}

                            {request.status === 'accepted' && (
                              <button style={{
                                display: 'flex', alignItems: 'center', gap: '0.3rem',
                                padding: '0.5rem 1.25rem', borderRadius: '10px',
                                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                color: 'white', border: 'none', cursor: 'pointer',
                                fontSize: '0.8rem', fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
                              }}>
                                <Phone style={{ width: '14px', height: '14px' }} />
                                Call Farmer
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Profile Card */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              borderRadius: '20px', padding: '1.5rem', color: 'white',
              boxShadow: '0 8px 32px rgba(124,58,237,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: '24px', height: '24px' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>Dr. {user?.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Veterinarian</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { label: 'Cases Done', value: '124' },
                  { label: 'Rating', value: '4.9 ⭐' },
                  { label: 'This Week', value: '7' },
                  { label: 'Experience', value: '6 yrs' }
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Calendar style={{ width: '16px', height: '16px', color: '#7c3aed' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Today's Schedule</h3>
              </div>
              {[
                { time: '09:00 AM', farmer: 'Mohan Singh', animal: '🐄 Buffalo', location: 'Bichhiwara' },
                { time: '02:00 PM', farmer: 'Rajesh Kumar', animal: '🐄 Cow', location: 'Kothpura' },
                { time: '05:00 PM', farmer: 'Geeta Bai', animal: '🐐 Goats', location: 'Aspur' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '0.75rem',
                  padding: '0.75rem 0',
                  borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: 700, minWidth: '65px', paddingTop: '2px' }}>{s.time}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>{s.farmer}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{s.animal} • {s.location}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: '0 0 0.75rem 0' }}>Quick Actions</h3>
              {[
                { label: 'Update Availability', icon: '🟢', color: '#16a34a' },
                { label: 'View Case History', icon: '📋', color: '#7c3aed' },
                { label: 'Medicine Inventory', icon: '💊', color: '#3b82f6' },
              ].map((a, i) => (
                <button key={i} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.625rem 0.75rem', marginBottom: '0.5rem',
                  background: '#f9fafb', borderRadius: '10px',
                  border: '1px solid #f3f4f6', cursor: 'pointer',
                  textAlign: 'left', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#faf5ff'; e.currentTarget.style.borderColor = '#e9d5ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#f3f4f6'; }}
                >
                  <span style={{ fontSize: '1rem' }}>{a.icon}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{a.label}</span>
                  <ArrowRight style={{ width: '14px', height: '14px', color: '#9ca3af', marginLeft: 'auto' }} />
                </button>
              ))}
            </div>

            {/* Achievement */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              borderRadius: '20px', padding: '1.25rem',
              border: '1px solid #fde68a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Award style={{ width: '18px', height: '18px', color: '#92400e' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e' }}>ACHIEVEMENT</span>
              </div>
              <div style={{ fontWeight: 700, color: '#78350f', fontSize: '0.95rem', marginBottom: '0.25rem' }}>100 Cases Milestone! 🎉</div>
              <div style={{ fontSize: '0.8rem', color: '#92400e' }}>You've helped 100+ farmers with livestock health. Keep it up!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;