import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Truck, Clock, Phone, Eye, Navigation,
  CheckCircle, Bell, User,
  ArrowRight, Fuel, IndianRupee, Route
} from 'lucide-react';

interface TransportRequest {
  id: string;
  farmerName: string;
  pickupLocation: string;
  destination: string;
  transportType: string;
  loadDescription: string;
  requestDate: string;
  pickupDate: string;
  status: string;
  phone: string;
  distance: string;
  rate: string;
  urgent?: boolean;
  pickupTime?: string;
  estimatedDelivery?: string;
  deliveryTime?: string;
  completionDate?: string;
}

// ============================================================================
// NOTE: DriverDashboard page content is temporarily commented out as requested.
// Renders a blank white page when accessed.
// ============================================================================

const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'picked' | 'delivered'>('pending');

  const transportRequests: TransportRequest[] = [
    {
      id: 'TR001',
      farmerName: 'Rajesh Kumar',
      pickupLocation: 'Village Kothpura, Dungarpur',
      destination: 'Dungarpur Grain Market',
      transportType: 'Harvest Transport',
      loadDescription: 'Wheat grain - 15 quintals. Needs to be covered during transport.',
      requestDate: '2025-01-15',
      pickupDate: '2025-01-16',
      status: 'pending',
      phone: '9876543210',
      distance: '12 km',
      rate: '₹15/km'
    },
    {
      id: 'TR002',
      farmerName: 'Sunita Devi',
      pickupLocation: 'Saheli Village, Dungarpur',
      destination: 'Veterinary Hospital, Dungarpur',
      transportType: 'Animal Transport',
      loadDescription: 'Sick buffalo needs immediate transport to vet hospital. Handle with care.',
      requestDate: '2025-01-15',
      pickupDate: '2025-01-15',
      status: 'pending',
      phone: '9876543211',
      distance: '8 km',
      rate: '₹20/km',
      urgent: true
    },
    {
      id: 'TR003',
      farmerName: 'Mohan Singh',
      pickupLocation: 'Bichhiwara, Dungarpur',
      destination: 'Udaipur Agricultural Market',
      transportType: 'Harvest Transport',
      loadDescription: 'Mixed vegetables - tomatoes, onions, potatoes - 10 quintals',
      requestDate: '2025-01-14',
      pickupDate: '2025-01-15',
      status: 'picked',
      phone: '9876543212',
      distance: '45 km',
      rate: '₹18/km',
      pickupTime: '08:30 AM',
      estimatedDelivery: '11:00 AM'
    },
    {
      id: 'TR004',
      farmerName: 'Priya Sharma',
      pickupLocation: 'Aspur, Dungarpur',
      destination: 'Banswara Cotton Market',
      transportType: 'Harvest Transport',
      loadDescription: 'Cotton bales - 20 bales, properly packed',
      requestDate: '2025-01-12',
      pickupDate: '2025-01-13',
      status: 'delivered',
      phone: '9876543213',
      distance: '35 km',
      rate: '₹16/km',
      deliveryTime: '02:45 PM',
      completionDate: '2025-01-13'
    }
  ];

  const filteredRequests = transportRequests.filter(r => r.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Transport request ${requestId} accepted! Contact the farmer to coordinate pickup.`);
  };

  const handleUpdateStatus = (requestId: string, newStatus: string) => {
    alert(`Request ${requestId} status updated to: ${newStatus}`);
  };

  const getTransportConfig = (type: string) => {
    if (type === 'Animal Transport') return { emoji: '🐄', color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff' };
    return { emoji: '🌾', color: '#d97706', bg: '#fffbeb', border: '#fde68a' };
  };

  const getEarnings = (distance: string, rate: string) => {
    const km = parseInt(distance);
    const perKm = parseInt(rate.replace('₹', '').replace('/km', ''));
    return `₹${km * perKm}`;
  };

  const stats = [
    { label: 'Pending', value: transportRequests.filter(r => r.status === 'pending').length, icon: Clock, color: '#f59e0b', bg: '#fef3c7', tabKey: 'pending' as const },
    { label: 'In Transit', value: transportRequests.filter(r => r.status === 'picked').length, icon: Navigation, color: '#f97316', bg: '#fff7ed', tabKey: 'picked' as const },
    { label: 'Delivered', value: transportRequests.filter(r => r.status === 'delivered').length, icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', tabKey: 'delivered' as const },
    { label: 'Earnings Today', value: '₹840', icon: IndianRupee, color: '#3b82f6', bg: '#dbeafe' },
  ];

  const tabs = [
    { key: 'pending', label: 'Pending', count: transportRequests.filter(r => r.status === 'pending').length, icon: '🕐' },
    { key: 'picked', label: 'In Transit', count: transportRequests.filter(r => r.status === 'picked').length, icon: '🚛' },
    { key: 'delivered', label: 'Delivered', count: transportRequests.filter(r => r.status === 'delivered').length, icon: '✅' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fb923c20 100%)' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, #ea580c 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '250px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Truck style={{ width: '20px', height: '20px', color: '#fed7aa' }} />
                <span style={{ color: '#fed7aa', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>DRIVER PORTAL</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Welcome, {user?.name || 'Rampal'} 🚛
              </h1>
              <p style={{ color: '#fed7aa', fontSize: '1rem', marginBottom: '1rem' }}>
                🚗 Certified Transport Driver • Agricultural Logistics
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(253,215,170,0.2)', border: '1px solid rgba(253,215,170,0.4)', color: '#fed7aa', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✅ Verified Driver
                </span>
                <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fde047', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ⭐ 4.7 Rating
                </span>
                <span style={{ background: 'rgba(134,239,172,0.2)', border: '1px solid rgba(134,239,172,0.4)', color: '#86efac', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  🟢 Online
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem', borderRadius: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center' }}>
                <Bell style={{ width: '20px', height: '20px' }} />
              </button>
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: '#fed7aa', fontSize: '0.7rem', fontWeight: 600 }}>TODAY'S EARNINGS</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>₹840</div>
                <div style={{ color: '#fed7aa', fontSize: '0.75rem' }}>2 trips done</div>
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
            const tabKey = (stat as any).tabKey;
            const isSelected = tabKey && selectedTab === tabKey;
            return (
              <div
                key={i}
                role={tabKey ? 'button' : undefined}
                tabIndex={tabKey ? 0 : undefined}
                onClick={() => {
                  if (tabKey) {
                    setSelectedTab(tabKey);
                    document.getElementById('driver-requests-tabs')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  background: 'white', borderRadius: '16px', padding: '1.1rem',
                  boxShadow: isSelected ? '0 8px 28px rgba(249,115,22,0.25)' : '0 4px 24px rgba(0,0,0,0.08)',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  transition: 'all 0.2s',
                  cursor: tabKey ? 'pointer' : 'default',
                  border: isSelected ? '2px solid #f97316' : '2px solid transparent',
                  outline: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  if (tabKey && !isSelected) e.currentTarget.style.borderColor = '#fed7aa';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (tabKey && !isSelected) e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{ background: stat.bg, borderRadius: '10px', padding: '0.5rem', flexShrink: 0 }}>
                  <Icon style={{ width: '18px', height: '18px', color: stat.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{stat.label}</span>
                    {tabKey && <span style={{ fontSize: '0.65rem', color: '#f97316', fontWeight: 600 }}>Tab →</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Main Content */}
          <div>
            <div id="driver-requests-tabs" style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden', scrollMarginTop: '80px' }}>
              {/* Tabs */}
              <div style={{ borderBottom: '1px solid #f3f4f6', display: 'flex', padding: '0 1.5rem' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as any)}
                    style={{
                      padding: '1rem 1.25rem', fontSize: '0.875rem', fontWeight: 600,
                      border: 'none', background: 'none', cursor: 'pointer',
                      borderBottom: selectedTab === tab.key ? '3px solid #f97316' : '3px solid transparent',
                      color: selectedTab === tab.key ? '#f97316' : '#6b7280',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                    <span style={{
                      background: selectedTab === tab.key ? '#fff7ed' : '#f3f4f6',
                      color: selectedTab === tab.key ? '#f97316' : '#6b7280',
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
                    <Truck style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.4 }} />
                    <p style={{ fontSize: '1rem', fontWeight: 500 }}>No {selectedTab} requests</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>New transport requests will appear here</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredRequests.map(request => {
                      const transportConfig = getTransportConfig(request.transportType);
                      const earnings = getEarnings(request.distance, request.rate);
                      return (
                        <div key={request.id} style={{
                          border: '1px solid #f3f4f6', borderRadius: '16px',
                          padding: '1.25rem', transition: 'all 0.2s', background: '#fafafa'
                        }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(249,115,22,0.12)';
                            e.currentTarget.style.borderColor = '#fed7aa';
                            e.currentTarget.style.background = 'white';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#f3f4f6';
                            e.currentTarget.style.background = '#fafafa';
                          }}
                        >
                          {/* Header */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{
                                width: '44px', height: '44px', borderRadius: '12px',
                                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.3rem'
                              }}>
                                {transportConfig.emoji}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>{request.farmerName}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}>
                                  <Phone style={{ width: '12px', height: '12px' }} />
                                  {request.phone}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                              {request.urgent && (
                                <span style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
                                  🚨 Urgent
                                </span>
                              )}
                              <span style={{ background: transportConfig.bg, color: transportConfig.color, border: `1px solid ${transportConfig.border}`, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
                                {transportConfig.emoji} {request.transportType}
                              </span>
                              <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>#{request.id}</span>
                            </div>
                          </div>

                          {/* Route Map Style */}
                          <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid #f3f4f6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid white', boxShadow: '0 0 0 2px #22c55e' }} />
                                <div style={{ width: '2px', height: '24px', background: '#d1d5db' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316', border: '2px solid white', boxShadow: '0 0 0 2px #f97316' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ marginBottom: '0.4rem' }}>
                                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>PICKUP</div>
                                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.pickupLocation}</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>DESTINATION</div>
                                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.destination}</div>
                                </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316' }}>{earnings}</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{request.distance} • {request.rate}</div>
                              </div>
                            </div>
                          </div>

                          {/* Load Description */}
                          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#ea580c', fontWeight: 700, marginBottom: '0.4rem' }}>📦 LOAD DETAILS</div>
                            <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>{request.loadDescription}</div>
                          </div>

                          {/* Dates Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                              <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>PICKUP DATE</div>
                              <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.pickupDate}</div>
                            </div>
                            {request.status === 'picked' && (
                              <>
                                <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>PICKED UP AT</div>
                                  <div style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.875rem' }}>{request.pickupTime}</div>
                                </div>
                                <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>ETA</div>
                                  <div style={{ fontWeight: 600, color: '#f97316', fontSize: '0.875rem' }}>{request.estimatedDelivery}</div>
                                </div>
                              </>
                            )}
                            {request.status === 'delivered' && (
                              <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                                <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600, marginBottom: '0.2rem' }}>DELIVERED AT</div>
                                <div style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.875rem' }}>{request.deliveryTime}, {request.completionDate}</div>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              padding: '0.5rem 1rem', borderRadius: '10px',
                              background: '#fff7ed', color: '#f97316',
                              border: '1px solid #fed7aa', cursor: 'pointer',
                              fontSize: '0.8rem', fontWeight: 600
                            }}>
                              <Eye style={{ width: '14px', height: '14px' }} />
                              View Details
                            </button>

                            {request.status === 'pending' && (
                              <>
                                <button style={{
                                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                                  padding: '0.5rem 1rem', borderRadius: '10px',
                                  background: '#f0fdf4', color: '#16a34a',
                                  border: '1px solid #bbf7d0', cursor: 'pointer',
                                  fontSize: '0.8rem', fontWeight: 600
                                }}>
                                  <Phone style={{ width: '14px', height: '14px' }} />
                                  Call Farmer
                                </button>
                                <button
                                  onClick={() => handleAcceptRequest(request.id)}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    padding: '0.5rem 1.25rem', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                    color: 'white', border: 'none', cursor: 'pointer',
                                    fontSize: '0.8rem', fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(249,115,22,0.3)'
                                  }}>
                                  <Truck style={{ width: '14px', height: '14px' }} />
                                  Accept Trip
                                </button>
                              </>
                            )}

                            {request.status === 'picked' && (
                              <button
                                onClick={() => handleUpdateStatus(request.id, 'delivered')}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                                  padding: '0.5rem 1.25rem', borderRadius: '10px',
                                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                  color: 'white', border: 'none', cursor: 'pointer',
                                  fontSize: '0.8rem', fontWeight: 600,
                                  boxShadow: '0 4px 12px rgba(34,197,94,0.3)'
                                }}>
                                <Navigation style={{ width: '14px', height: '14px' }} />
                                Mark as Delivered
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

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Profile */}
            <div style={{
              background: 'linear-gradient(135deg, #c2410c, #ea580c)',
              borderRadius: '20px', padding: '1.5rem', color: 'white',
              boxShadow: '0 8px 32px rgba(234,88,12,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: '24px', height: '24px' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{user?.name || 'Rampal'}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Transport Driver</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { label: 'Trips Done', value: '312' },
                  { label: 'Rating', value: '4.7 ⭐' },
                  { label: 'This Week', value: '8' },
                  { label: 'Distance', value: '2,840 km' }
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Status */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Truck style={{ width: '16px', height: '16px', color: '#f97316' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Vehicle Status</h3>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '0.875rem', marginBottom: '0.75rem', border: '1px solid #f3f4f6' }}>
                <div style={{ fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Tata 407 Truck</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>RJ-12 AB 1234</div>
              </div>
              {[
                { label: 'Fuel Level', value: '75%', color: '#22c55e', bar: 75 },
                { label: 'Load Capacity', value: '60%', color: '#f97316', bar: 60 },
              ].map((v, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {i === 0 ? <Fuel style={{ width: '12px', height: '12px' }} /> : <Route style={{ width: '12px', height: '12px' }} />}
                      {v.label}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: v.color, fontWeight: 700 }}>{v.value}</span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${v.bar}%`, background: v.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Earnings Chart */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <IndianRupee style={{ width: '16px', height: '16px', color: '#f97316' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Weekly Earnings</h3>
              </div>
              {[
                { day: 'Mon', amount: 480, max: 1000 },
                { day: 'Tue', amount: 840, max: 1000 },
                { day: 'Wed', amount: 620, max: 1000 },
                { day: 'Thu', amount: 900, max: 1000 },
                { day: 'Fri', amount: 750, max: 1000 },
                { day: 'Sat', amount: 1100, max: 1100 },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#6b7280', width: '28px' }}>{d.day}</span>
                  <div style={{ flex: 1, height: '16px', background: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(d.amount / d.max) * 100}%`,
                      background: 'linear-gradient(90deg, #f97316, #ea580c)',
                      borderRadius: '9999px',
                      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '4px'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#374151', fontWeight: 700, width: '45px', textAlign: 'right' }}>₹{d.amount}</span>
                </div>
              ))}
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#fff7ed', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: '0.7rem', color: '#ea580c', fontWeight: 600 }}>WEEKLY TOTAL</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316' }}>₹4,690</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: '0 0 0.75rem 0' }}>Quick Actions</h3>
              {[
                { label: 'Update Availability', icon: '🟢' },
                { label: 'View Trip History', icon: '📋' },
                { label: 'Contact Support', icon: '📞' },
              ].map((a, i) => (
                <button key={i} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.625rem 0.75rem', marginBottom: '0.5rem',
                  background: '#f9fafb', borderRadius: '10px',
                  border: '1px solid #f3f4f6', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff7ed'; e.currentTarget.style.borderColor = '#fed7aa'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#f3f4f6'; }}
                >
                  <span style={{ fontSize: '1rem' }}>{a.icon}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{a.label}</span>
                  <ArrowRight style={{ width: '14px', height: '14px', color: '#9ca3af', marginLeft: 'auto' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;

// ============================================================================
// ORIGINAL DRIVERDASHBOARD CODE (COMMENTED OUT):
// ============================================================================
// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import {
//   Truck, Clock, Phone, Eye, Navigation,
//   CheckCircle, Bell, User,
//   ArrowRight, Fuel, IndianRupee, Route
// } from 'lucide-react';
//
// interface TransportRequest {
//   id: string;
//   farmerName: string;
//   pickupLocation: string;
//   destination: string;
//   transportType: string;
//   loadDescription: string;
//   requestDate: string;
//   pickupDate: string;
//   status: string;
//   phone: string;
//   distance: string;
//   rate: string;
//   urgent?: boolean;
//   pickupTime?: string;
//   estimatedDelivery?: string;
//   deliveryTime?: string;
//   completionDate?: string;
// }
//
// const DriverDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const [selectedTab, setSelectedTab] = useState<'pending' | 'picked' | 'delivered'>('pending');
//
//   const transportRequests: TransportRequest[] = [
//     {
//       id: 'TR001',
//       farmerName: 'Rajesh Kumar',
//       pickupLocation: 'Village Kothpura, Dungarpur',
//       destination: 'Dungarpur Grain Market',
//       transportType: 'Harvest Transport',
//       loadDescription: 'Wheat grain - 15 quintals. Needs to be covered during transport.',
//       requestDate: '2025-01-15',
//       pickupDate: '2025-01-16',
//       status: 'pending',
//       phone: '9876543210',
//       distance: '12 km',
//       rate: '₹15/km'
//     },
//     {
//       id: 'TR002',
//       farmerName: 'Sunita Devi',
//       pickupLocation: 'Saheli Village, Dungarpur',
//       destination: 'Veterinary Hospital, Dungarpur',
//       transportType: 'Animal Transport',
//       loadDescription: 'Sick buffalo needs immediate transport to vet hospital. Handle with care.',
//       requestDate: '2025-01-15',
//       pickupDate: '2025-01-15',
//       status: 'pending',
//       phone: '9876543211',
//       distance: '8 km',
//       rate: '₹20/km',
//       urgent: true
//     },
//     {
//       id: 'TR003',
//       farmerName: 'Mohan Singh',
//       pickupLocation: 'Bichhiwara, Dungarpur',
//       destination: 'Udaipur Agricultural Market',
//       transportType: 'Harvest Transport',
//       loadDescription: 'Mixed vegetables - tomatoes, onions, potatoes - 10 quintals',
//       requestDate: '2025-01-14',
//       pickupDate: '2025-01-15',
//       status: 'picked',
//       phone: '9876543212',
//       distance: '45 km',
//       rate: '₹18/km',
//       pickupTime: '08:30 AM',
//       estimatedDelivery: '11:00 AM'
//     },
//     {
//       id: 'TR004',
//       farmerName: 'Priya Sharma',
//       pickupLocation: 'Aspur, Dungarpur',
//       destination: 'Banswara Cotton Market',
//       transportType: 'Harvest Transport',
//       loadDescription: 'Cotton bales - 20 bales, properly packed',
//       requestDate: '2025-01-12',
//       pickupDate: '2025-01-13',
//       status: 'delivered',
//       phone: '9876543213',
//       distance: '35 km',
//       rate: '₹16/km',
//       deliveryTime: '02:45 PM',
//       completionDate: '2025-01-13'
//     }
//   ];
//
//   const filteredRequests = transportRequests.filter(r => r.status === selectedTab);
//
//   const handleAcceptRequest = (requestId: string) => {
//     alert(`Transport request ${requestId} accepted! Contact the farmer to coordinate pickup.`);
//   };
//
//   const handleUpdateStatus = (requestId: string, newStatus: string) => {
//     alert(`Request ${requestId} status updated to: ${newStatus}`);
//   };
//
//   const getTransportConfig = (type: string) => {
//     if (type === 'Animal Transport') return { emoji: '🐄', color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff' };
//     return { emoji: '🌾', color: '#d97706', bg: '#fffbeb', border: '#fde68a' };
//   };
//
//   const getEarnings = (distance: string, rate: string) => {
//     const km = parseInt(distance);
//     const perKm = parseInt(rate.replace('₹', '').replace('/km', ''));
//     return `₹${km * perKm}`;
//   };
//
//   const stats = [
//     { label: 'Pending', value: transportRequests.filter(r => r.status === 'pending').length, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
//     { label: 'In Transit', value: transportRequests.filter(r => r.status === 'picked').length, icon: Navigation, color: '#f97316', bg: '#fff7ed' },
//     { label: 'Delivered', value: transportRequests.filter(r => r.status === 'delivered').length, icon: CheckCircle, color: '#22c55e', bg: '#dcfce7' },
//     { label: 'Earnings Today', value: '₹840', icon: IndianRupee, color: '#3b82f6', bg: '#dbeafe' },
//   ];
//
//   const tabs = [
//     { key: 'pending', label: 'Pending', count: transportRequests.filter(r => r.status === 'pending').length, icon: '🕐' },
//     { key: 'picked', label: 'In Transit', count: transportRequests.filter(r => r.status === 'picked').length, icon: '🚛' },
//     { key: 'delivered', label: 'Delivered', count: transportRequests.filter(r => r.status === 'delivered').length, icon: '✅' },
//   ];
//
//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fb923c20 100%)' }}>
//       {/* Hero Banner */}
//       <div style={{
//         background: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, #ea580c 100%)',
//         padding: '2rem 1.5rem',
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
//         <div style={{ position: 'absolute', bottom: '-30px', left: '250px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
//
//         <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
//                 <Truck style={{ width: '20px', height: '20px', color: '#fed7aa' }} />
//                 <span style={{ color: '#fed7aa', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>DRIVER PORTAL</span>
//               </div>
//               <h1 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
//                 Welcome, {user?.name || 'Driver'} 🚛
//               </h1>
//               <p style={{ color: '#fed7aa', fontSize: '1rem', marginBottom: '1rem' }}>
//                 🚗 Certified Transport Driver • Agricultural Logistics
//               </p>
//               <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
//                 <span style={{ background: 'rgba(253,215,170,0.2)', border: '1px solid rgba(253,215,170,0.4)', color: '#fed7aa', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
//                   ✅ Verified Driver
//                 </span>
//                 <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fde047', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
//                   ⭐ 4.7 Rating
//                 </span>
//                 <span style={{ background: 'rgba(134,239,172,0.2)', border: '1px solid rgba(134,239,172,0.4)', color: '#86efac', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
//                   🟢 Online
//                 </span>
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '0.75rem' }}>
//               <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem', borderRadius: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center' }}>
//                 <Bell style={{ width: '20px', height: '20px' }} />
//               </button>
//               <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)' }}>
//                 <div style={{ color: '#fed7aa', fontSize: '0.7rem', fontWeight: 600 }}>TODAY'S EARNINGS</div>
//                 <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>₹840</div>
//                 <div style={{ color: '#fed7aa', fontSize: '0.75rem' }}>2 trips done</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//
//       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
//         {/* Stats Row */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem', marginTop: '-1rem' }}>
//           {stats.map((stat, i) => {
//             const Icon = stat.icon;
//             return (
//               <div key={i} style={{
//                 background: 'white', borderRadius: '16px', padding: '1.1rem',
//                 boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
//                 display: 'flex', alignItems: 'center', gap: '0.75rem',
//                 transition: 'transform 0.2s'
//               }}
//                 onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
//                 onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
//               >
//                 <div style={{ background: stat.bg, borderRadius: '10px', padding: '0.5rem', flexShrink: 0 }}>
//                   <Icon style={{ width: '18px', height: '18px', color: stat.color }} />
//                 </div>
//                 <div>
//                   <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{stat.value}</div>
//                   <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500 }}>{stat.label}</div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
//           {/* Main Content */}
//           <div>
//             <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
//               {/* Tabs */}
//               <div style={{ borderBottom: '1px solid #f3f4f6', display: 'flex', padding: '0 1.5rem' }}>
//                 {tabs.map(tab => (
//                   <button
//                     key={tab.key}
//                     onClick={() => setSelectedTab(tab.key as any)}
//                     style={{
//                       padding: '1rem 1.25rem', fontSize: '0.875rem', fontWeight: 600,
//                       border: 'none', background: 'none', cursor: 'pointer',
//                       borderBottom: selectedTab === tab.key ? '3px solid #f97316' : '3px solid transparent',
//                       color: selectedTab === tab.key ? '#f97316' : '#6b7280',
//                       display: 'flex', alignItems: 'center', gap: '0.4rem',
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     <span>{tab.icon}</span>
//                     {tab.label}
//                     <span style={{
//                       background: selectedTab === tab.key ? '#fff7ed' : '#f3f4f6',
//                       color: selectedTab === tab.key ? '#f97316' : '#6b7280',
//                       fontSize: '0.7rem', padding: '0.1rem 0.5rem',
//                       borderRadius: '9999px', fontWeight: 700
//                     }}>
//                       {tab.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//
//               {/* Cards */}
//               <div style={{ padding: '1.5rem' }}>
//                 {filteredRequests.length === 0 ? (
//                   <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
//                     <Truck style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.4 }} />
//                     <p style={{ fontSize: '1rem', fontWeight: 500 }}>No {selectedTab} requests</p>
//                     <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>New transport requests will appear here</p>
//                   </div>
//                 ) : (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                     {filteredRequests.map(request => {
//                       const transportConfig = getTransportConfig(request.transportType);
//                       const earnings = getEarnings(request.distance, request.rate);
//                       return (
//                         <div key={request.id} style={{
//                           border: '1px solid #f3f4f6', borderRadius: '16px',
//                           padding: '1.25rem', transition: 'all 0.2s', background: '#fafafa'
//                         }}
//                           onMouseEnter={e => {
//                             e.currentTarget.style.boxShadow = '0 8px 30px rgba(249,115,22,0.12)';
//                             e.currentTarget.style.borderColor = '#fed7aa';
//                             e.currentTarget.style.background = 'white';
//                           }}
//                           onMouseLeave={e => {
//                             e.currentTarget.style.boxShadow = 'none';
//                             e.currentTarget.style.borderColor = '#f3f4f6';
//                             e.currentTarget.style.background = '#fafafa';
//                           }}
//                         >
//                           {/* Header */}
//                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//                               <div style={{
//                                 width: '44px', height: '44px', borderRadius: '12px',
//                                 background: 'linear-gradient(135deg, #f97316, #ea580c)',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                 fontSize: '1.3rem'
//                               }}>
//                                 {transportConfig.emoji}
//                               </div>
//                               <div>
//                                 <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>{request.farmerName}</div>
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}>
//                                   <Phone style={{ width: '12px', height: '12px' }} />
//                                   {request.phone}
//                                 </div>
//                               </div>
//                             </div>
//                             <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
//                               {request.urgent && (
//                                 <span style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
//                                   🚨 Urgent
//                                 </span>
//                               )}
//                               <span style={{ background: transportConfig.bg, color: transportConfig.color, border: `1px solid ${transportConfig.border}`, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
//                                 {transportConfig.emoji} {request.transportType}
//                               </span>
//                               <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>#{request.id}</span>
//                             </div>
//                           </div>
//
//                           {/* Route Map Style */}
//                           <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid #f3f4f6' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
//                               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
//                                 <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid white', boxShadow: '0 0 0 2px #22c55e' }} />
//                                 <div style={{ width: '2px', height: '24px', background: '#d1d5db' }} />
//                                 <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316', border: '2px solid white', boxShadow: '0 0 0 2px #f97316' }} />
//                               </div>
//                               <div style={{ flex: 1 }}>
//                                 <div style={{ marginBottom: '0.4rem' }}>
//                                   <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>PICKUP</div>
//                                   <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.pickupLocation}</div>
//                                 </div>
//                                 <div>
//                                   <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>DESTINATION</div>
//                                   <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.destination}</div>
//                                 </div>
//                               </div>
//                               <div style={{ textAlign: 'right' }}>
//                                 <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316' }}>{earnings}</div>
//                                 <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{request.distance} • {request.rate}</div>
//                               </div>
//                             </div>
//                           </div>
//
//                           {/* Load Description */}
//                           <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
//                             <div style={{ fontSize: '0.7rem', color: '#ea580c', fontWeight: 700, marginBottom: '0.4rem' }}>📦 LOAD DETAILS</div>
//                             <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>{request.loadDescription}</div>
//                           </div>
//
//                           {/* Dates Grid */}
//                           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
//                             <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
//                               <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>PICKUP DATE</div>
//                               <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.pickupDate}</div>
//                             </div>
//                             {request.status === 'picked' && (
//                               <>
//                                 <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
//                                   <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>PICKED UP AT</div>
//                                   <div style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.875rem' }}>{request.pickupTime}</div>
//                                 </div>
//                                 <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
//                                   <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>ETA</div>
//                                   <div style={{ fontWeight: 600, color: '#f97316', fontSize: '0.875rem' }}>{request.estimatedDelivery}</div>
//                                 </div>
//                               </>
//                             )}
//                             {request.status === 'delivered' && (
//                               <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
//                                 <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600, marginBottom: '0.2rem' }}>DELIVERED AT</div>
//                                 <div style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.875rem' }}>{request.deliveryTime}, {request.completionDate}</div>
//                               </div>
//                             )}
//                           </div>
//
//                           {/* Actions */}
//                           <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
//                             <button style={{
//                               display: 'flex', alignItems: 'center', gap: '0.3rem',
//                               padding: '0.5rem 1rem', borderRadius: '10px',
//                               background: '#fff7ed', color: '#f97316',
//                               border: '1px solid #fed7aa', cursor: 'pointer',
//                               fontSize: '0.8rem', fontWeight: 600
//                             }}>
//                               <Eye style={{ width: '14px', height: '14px' }} />
//                               View Details
//                             </button>
//
//                             {request.status === 'pending' && (
//                               <>
//                                 <button style={{
//                                   display: 'flex', alignItems: 'center', gap: '0.3rem',
//                                   padding: '0.5rem 1rem', borderRadius: '10px',
//                                   background: '#f0fdf4', color: '#16a34a',
//                                   border: '1px solid #bbf7d0', cursor: 'pointer',
//                                   fontSize: '0.8rem', fontWeight: 600
//                                 }}>
//                                   <Phone style={{ width: '14px', height: '14px' }} />
//                                   Call Farmer
//                                 </button>
//                                 <button
//                                   onClick={() => handleAcceptRequest(request.id)}
//                                   style={{
//                                     display: 'flex', alignItems: 'center', gap: '0.3rem',
//                                     padding: '0.5rem 1.25rem', borderRadius: '10px',
//                                     background: 'linear-gradient(135deg, #f97316, #ea580c)',
//                                     color: 'white', border: 'none', cursor: 'pointer',
//                                     fontSize: '0.8rem', fontWeight: 600,
//                                     boxShadow: '0 4px 12px rgba(249,115,22,0.3)'
//                                   }}>
//                                   <Truck style={{ width: '14px', height: '14px' }} />
//                                   Accept Trip
//                                 </button>
//                               </>
//                             )}
//
//                             {request.status === 'picked' && (
//                               <button
//                                 onClick={() => handleUpdateStatus(request.id, 'delivered')}
//                                 style={{
//                                   display: 'flex', alignItems: 'center', gap: '0.3rem',
//                                   padding: '0.5rem 1.25rem', borderRadius: '10px',
//                                   background: 'linear-gradient(135deg, #22c55e, #16a34a)',
//                                   color: 'white', border: 'none', cursor: 'pointer',
//                                   fontSize: '0.8rem', fontWeight: 600,
//                                   boxShadow: '0 4px 12px rgba(34,197,94,0.3)'
//                                 }}>
//                                 <Navigation style={{ width: '14px', height: '14px' }} />
//                                 Mark as Delivered
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//
//           {/* Sidebar */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//             {/* Profile */}
//             <div style={{
//               background: 'linear-gradient(135deg, #c2410c, #ea580c)',
//               borderRadius: '20px', padding: '1.5rem', color: 'white',
//               boxShadow: '0 8px 32px rgba(234,88,12,0.3)'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
//                 <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                   <User style={{ width: '24px', height: '24px' }} />
//                 </div>
//                 <div>
//                   <div style={{ fontWeight: 700 }}>{user?.name}</div>
//                   <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Transport Driver</div>
//                 </div>
//               </div>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
//                 {[
//                   { label: 'Trips Done', value: '312' },
//                   { label: 'Rating', value: '4.7 ⭐' },
//                   { label: 'This Week', value: '8' },
//                   { label: 'Distance', value: '2,840 km' }
//                 ].map((s, i) => (
//                   <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem', textAlign: 'center' }}>
//                     <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.value}</div>
//                     <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//
//             {/* Vehicle Status */}
//             <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
//                 <Truck style={{ width: '16px', height: '16px', color: '#f97316' }} />
//                 <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Vehicle Status</h3>
//               </div>
//               <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '0.875rem', marginBottom: '0.75rem', border: '1px solid #f3f4f6' }}>
//                 <div style={{ fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Tata 407 Truck</div>
//                 <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>RJ-12 AB 1234</div>
//               </div>
//               {[
//                 { label: 'Fuel Level', value: '75%', color: '#22c55e', bar: 75 },
//                 { label: 'Load Capacity', value: '60%', color: '#f97316', bar: 60 },
//               ].map((v, i) => (
//                 <div key={i} style={{ marginBottom: '0.75rem' }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
//                     <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
//                       {i === 0 ? <Fuel style={{ width: '12px', height: '12px' }} /> : <Route style={{ width: '12px', height: '12px' }} />}
//                       {v.label}
//                     </span>
//                     <span style={{ fontSize: '0.75rem', color: v.color, fontWeight: 700 }}>{v.value}</span>
//                   </div>
//                   <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '9999px' }}>
//                     <div style={{ height: '100%', width: `${v.bar}%`, background: v.color, borderRadius: '9999px' }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             {/* Earnings Chart */}
//             <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
//                 <IndianRupee style={{ width: '16px', height: '16px', color: '#f97316' }} />
//                 <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Weekly Earnings</h3>
//               </div>
//               {[
//                 { day: 'Mon', amount: 480, max: 1000 },
//                 { day: 'Tue', amount: 840, max: 1000 },
//                 { day: 'Wed', amount: 620, max: 1000 },
//                 { day: 'Thu', amount: 900, max: 1000 },
//                 { day: 'Fri', amount: 750, max: 1000 },
//                 { day: 'Sat', amount: 1100, max: 1100 },
//               ].map((d, i) => (
//                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
//                   <span style={{ fontSize: '0.7rem', color: '#6b7280', width: '28px' }}>{d.day}</span>
//                   <div style={{ flex: 1, height: '16px', background: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
//                     <div style={{
//                       height: '100%',
//                       width: `${(d.amount / d.max) * 100}%`,
//                       background: 'linear-gradient(90deg, #f97316, #ea580c)',
//                       borderRadius: '9999px',
//                       display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '4px'
//                     }} />
//                   </div>
//                   <span style={{ fontSize: '0.7rem', color: '#374151', fontWeight: 700, width: '45px', textAlign: 'right' }}>₹{d.amount}</span>
//                 </div>
//               ))}
//               <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#fff7ed', borderRadius: '10px', border: '1px solid #fed7aa' }}>
//                 <div style={{ fontSize: '0.7rem', color: '#ea580c', fontWeight: 600 }}>WEEKLY TOTAL</div>
//                 <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316' }}>₹4,690</div>
//               </div>
//             </div>
//
//             {/* Quick Actions */}
//             <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//               <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: '0 0 0.75rem 0' }}>Quick Actions</h3>
//               {[
//                 { label: 'Update Availability', icon: '🟢' },
//                 { label: 'View Trip History', icon: '📋' },
//                 { label: 'Contact Support', icon: '📞' },
//               ].map((a, i) => (
//                 <button key={i} style={{
//                   width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
//                   padding: '0.625rem 0.75rem', marginBottom: '0.5rem',
//                   background: '#f9fafb', borderRadius: '10px',
//                   border: '1px solid #f3f4f6', cursor: 'pointer', textAlign: 'left',
//                   transition: 'all 0.2s'
//                 }}
//                   onMouseEnter={e => { e.currentTarget.style.background = '#fff7ed'; e.currentTarget.style.borderColor = '#fed7aa'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#f3f4f6'; }}
//                 >
//                   <span style={{ fontSize: '1rem' }}>{a.icon}</span>
//                   <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{a.label}</span>
//                   <ArrowRight style={{ width: '14px', height: '14px', color: '#9ca3af', marginLeft: 'auto' }} />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default DriverDashboard;
