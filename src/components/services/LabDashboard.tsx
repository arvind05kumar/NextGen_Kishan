import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  TestTube2, Clock, CheckCircle, FileText, MapPin, Eye,
  FlaskConical, Microscope, BarChart3, TrendingUp,
  Upload, Bell, ArrowRight, User, Calendar, Award
} from 'lucide-react';

interface TestRequest {
  id: string;
  farmerName: string;
  farmLocation: string;
  testType: string;
  samples: string;
  requestDate: string;
  urgency: string;
  status: string;
  phone: string;
  collectionDate?: string;
  expectedCompletion?: string;
  completionDate?: string;
  reportUrl?: string;
}

const LabDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'in-progress' | 'completed'>('pending');

  const testRequests: TestRequest[] = [
    {
      id: 'TR001',
      farmerName: 'Rajesh Kumar',
      farmLocation: 'Village Kothpura, Dungarpur',
      testType: 'Soil Test',
      samples: 'pH, NPK, Organic Matter',
      requestDate: '2025-01-15',
      urgency: 'Normal',
      status: 'pending',
      phone: '9876543210'
    },
    {
      id: 'TR002',
      farmerName: 'Sunita Devi',
      farmLocation: 'Saheli Village, Dungarpur',
      testType: 'Crop Test',
      samples: 'Disease Analysis, Wheat',
      requestDate: '2025-01-14',
      urgency: 'Urgent',
      status: 'pending',
      phone: '9876543211'
    },
    {
      id: 'TR003',
      farmerName: 'Mohan Singh',
      farmLocation: 'Bichhiwara, Dungarpur',
      testType: 'Soil Test',
      samples: 'Complete Analysis',
      requestDate: '2025-01-13',
      urgency: 'Normal',
      status: 'in-progress',
      phone: '9876543212',
      collectionDate: '2025-01-14',
      expectedCompletion: '2025-01-17'
    },
    {
      id: 'TR004',
      farmerName: 'Priya Sharma',
      farmLocation: 'Aspur, Dungarpur',
      testType: 'Crop Test',
      samples: 'Tomato Disease Check',
      requestDate: '2025-01-10',
      urgency: 'Normal',
      status: 'completed',
      phone: '9876543213',
      completionDate: '2025-01-13',
      reportUrl: '#'
    }
  ];

  const filteredRequests = testRequests.filter(r => r.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Test request ${requestId} accepted! Farmer will be notified for sample collection.`);
  };

  const handleUploadReport = (requestId: string) => {
    alert(`Report uploaded for request ${requestId}. Farmer will receive the results.`);
  };

  const stats = [
    { label: 'Pending', value: testRequests.filter(r => r.status === 'pending').length, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'In Progress', value: testRequests.filter(r => r.status === 'in-progress').length, icon: Microscope, color: '#10b981', bg: '#d1fae5' },
    { label: 'Completed', value: testRequests.filter(r => r.status === 'completed').length, icon: CheckCircle, color: '#22c55e', bg: '#dcfce7' },
    { label: 'This Month', value: '24', icon: TrendingUp, color: '#3b82f6', bg: '#dbeafe' },
  ];

  const tabs = [
    { key: 'pending', label: 'Pending', count: testRequests.filter(r => r.status === 'pending').length, icon: '🕐' },
    { key: 'in-progress', label: 'In Progress', count: testRequests.filter(r => r.status === 'in-progress').length, icon: '🔬' },
    { key: 'completed', label: 'Completed', count: testRequests.filter(r => r.status === 'completed').length, icon: '✅' },
  ];

  const getTestTypeConfig = (type: string) => {
    if (type === 'Soil Test') return { emoji: '🌱', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' };
    return { emoji: '🌾', color: '#d97706', bg: '#fffbeb', border: '#fde68a' };
  };

  const getUrgencyConfig = (urgency: string) => {
    return urgency === 'Urgent'
      ? { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa', label: '⚠️ Urgent' }
      : { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', label: '✅ Normal' };
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-50px', left: '300px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <FlaskConical style={{ width: '20px', height: '20px', color: '#6ee7b7' }} />
                <span style={{ color: '#6ee7b7', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>LAB TECHNICIAN PORTAL</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Welcome, {user?.name || 'Lab Tech'} 🔬
              </h1>
              <p style={{ color: '#a7f3d0', fontSize: '1rem', marginBottom: '1rem' }}>
                🏢 Certified Agricultural Lab • Soil & Crop Analysis Specialist
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(110,231,183,0.2)', border: '1px solid rgba(110,231,183,0.4)', color: '#6ee7b7', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✅ NABL Accredited
                </span>
                <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fde047', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ⭐ 4.8 Rating
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem', borderRadius: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center' }}>
                <Bell style={{ width: '20px', height: '20px' }} />
              </button>
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: '#6ee7b7', fontSize: '0.7rem', fontWeight: 600 }}>PROCESSING</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>3 Tests</div>
                <div style={{ color: '#a7f3d0', fontSize: '0.75rem' }}>Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-3 sm:p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 -mt-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{
                background: 'white', borderRadius: '16px', padding: '1rem',
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
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500, marginTop: '0.2rem' }}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Main */}
          <div>
            <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              {/* Tabs */}
              <div className="border-b border-gray-100 flex px-3 sm:px-6 overflow-x-auto no-scrollbar whitespace-nowrap">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as any)}
                    className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-none bg-none cursor-pointer flex items-center gap-1.5 shrink-0 transition-all"
                    style={{
                      borderBottom: selectedTab === tab.key ? '3px solid #10b981' : '3px solid transparent',
                      color: selectedTab === tab.key ? '#10b981' : '#6b7280',
                    }}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                    <span style={{
                      background: selectedTab === tab.key ? '#d1fae5' : '#f3f4f6',
                      color: selectedTab === tab.key ? '#10b981' : '#6b7280',
                      fontSize: '0.7rem', padding: '0.1rem 0.5rem',
                      borderRadius: '9999px', fontWeight: 700
                    }}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Cards */}
              <div className="p-3 sm:p-6">
                {filteredRequests.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <TestTube2 style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.4 }} />
                    <p style={{ fontSize: '1rem', fontWeight: 500 }}>No {selectedTab.replace('-', ' ')} requests</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>New test requests will appear here</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredRequests.map(request => {
                      const testConfig = getTestTypeConfig(request.testType);
                      const urgencyConfig = getUrgencyConfig(request.urgency);
                      return (
                        <div key={request.id} style={{
                          border: '1px solid #f3f4f6', borderRadius: '16px',
                          padding: '1.25rem', transition: 'all 0.2s', background: '#fafafa'
                        }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(16,185,129,0.12)';
                            e.currentTarget.style.borderColor = '#a7f3d0';
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
                                background: `linear-gradient(135deg, #10b981, #059669)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.3rem'
                              }}>
                                {testConfig.emoji}
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
                              <span style={{ background: testConfig.bg, color: testConfig.color, border: `1px solid ${testConfig.border}`, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
                                {testConfig.emoji} {request.testType}
                              </span>
                              <span style={{ background: urgencyConfig.bg, color: urgencyConfig.color, border: `1px solid ${urgencyConfig.border}`, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
                                {urgencyConfig.label}
                              </span>
                              <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>#{request.id}</span>
                            </div>
                          </div>

                          {/* Info Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                              <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>SAMPLES REQUIRED</div>
                              <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.samples}</div>
                            </div>
                            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                              <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>FARMER PHONE</div>
                              <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.phone}</div>
                            </div>
                            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                              <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.2rem' }}>REQUEST DATE</div>
                              <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{request.requestDate}</div>
                            </div>
                          </div>

                          {/* In-Progress info */}
                          {request.status === 'in-progress' && (
                            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                              <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700, marginBottom: '0.5rem' }}>🔬 PROCESSING STATUS</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                                <div>
                                  <span style={{ color: '#059669', fontWeight: 600 }}>Sample Collected: </span>
                                  <span>{request.collectionDate}</span>
                                </div>
                                <div>
                                  <span style={{ color: '#059669', fontWeight: 600 }}>Ready By: </span>
                                  <span style={{ fontWeight: 700 }}>{request.expectedCompletion}</span>
                                </div>
                              </div>
                              {/* Progress bar */}
                              <div style={{ marginTop: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.3rem' }}>
                                  <span>Analysis Progress</span>
                                  <span>65%</span>
                                </div>
                                <div style={{ height: '6px', background: '#d1fae5', borderRadius: '9999px' }}>
                                  <div style={{ height: '100%', width: '65%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '9999px' }} />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Completed info */}
                          {request.status === 'completed' && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700 }}>📋 REPORT READY</div>
                                  <div style={{ fontSize: '0.85rem', color: '#374151', marginTop: '0.2rem' }}>Completed: {request.completionDate}</div>
                                </div>
                                <CheckCircle style={{ width: '28px', height: '28px', color: '#16a34a' }} />
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              padding: '0.5rem 1rem', borderRadius: '10px',
                              background: '#ecfdf5', color: '#059669',
                              border: '1px solid #a7f3d0', cursor: 'pointer',
                              fontSize: '0.8rem', fontWeight: 600
                            }}>
                              <Eye style={{ width: '14px', height: '14px' }} />
                              View Details
                            </button>

                            {request.status === 'pending' && (
                              <button
                                onClick={() => handleAcceptRequest(request.id)}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                                  padding: '0.5rem 1.25rem', borderRadius: '10px',
                                  background: 'linear-gradient(135deg, #10b981, #059669)',
                                  color: 'white', border: 'none', cursor: 'pointer',
                                  fontSize: '0.8rem', fontWeight: 600,
                                  boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                                }}>
                                <CheckCircle style={{ width: '14px', height: '14px' }} />
                                Accept & Collect Sample
                              </button>
                            )}

                            {request.status === 'in-progress' && (
                              <button
                                onClick={() => handleUploadReport(request.id)}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                                  padding: '0.5rem 1.25rem', borderRadius: '10px',
                                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                  color: 'white', border: 'none', cursor: 'pointer',
                                  fontSize: '0.8rem', fontWeight: 600,
                                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                                }}>
                                <Upload style={{ width: '14px', height: '14px' }} />
                                Upload Report
                              </button>
                            )}

                            {request.status === 'completed' && (
                              <button style={{
                                display: 'flex', alignItems: 'center', gap: '0.3rem',
                                padding: '0.5rem 1rem', borderRadius: '10px',
                                background: '#f9fafb', color: '#374151',
                                border: '1px solid #e5e7eb', cursor: 'pointer',
                                fontSize: '0.8rem', fontWeight: 600
                              }}>
                                <FileText style={{ width: '14px', height: '14px' }} />
                                View Report
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
            {/* Profile Card */}
            <div style={{
              background: 'linear-gradient(135deg, #065f46, #059669)',
              borderRadius: '20px', padding: '1.5rem', color: 'white',
              boxShadow: '0 8px 32px rgba(5,150,105,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: '24px', height: '24px' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{user?.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Lab Technician</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { label: 'Tests Done', value: '248' },
                  { label: 'Accuracy', value: '98.5%' },
                  { label: 'This Week', value: '12' },
                  { label: 'Rating', value: '4.8 ⭐' }
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Status */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Microscope style={{ width: '16px', height: '16px', color: '#10b981' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Lab Equipment</h3>
              </div>
              {[
                { name: 'pH Meter', status: 'Operational', color: '#16a34a' },
                { name: 'Spectrometer', status: 'Operational', color: '#16a34a' },
                { name: 'Centrifuge', status: 'Calibrating', color: '#f59e0b' },
                { name: 'Microscope', status: 'Operational', color: '#16a34a' },
              ].map((eq, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.5rem 0', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 500 }}>{eq.name}</span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, color: eq.color,
                    background: `${eq.color}15`, padding: '0.15rem 0.5rem', borderRadius: '9999px'
                  }}>{eq.status}</span>
                </div>
              ))}
            </div>

            {/* Recent Tests Chart */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <BarChart3 style={{ width: '16px', height: '16px', color: '#10b981' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Test Breakdown</h3>
              </div>
              {[
                { type: 'Soil pH', count: 85, color: '#10b981' },
                { type: 'NPK Analysis', count: 62, color: '#3b82f6' },
                { type: 'Crop Disease', count: 45, color: '#f59e0b' },
                { type: 'Water Quality', count: 28, color: '#8b5cf6' },
              ].map((t, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#374151', fontWeight: 600 }}>{t.type}</span>
                    <span style={{ fontSize: '0.75rem', color: t.color, fontWeight: 700 }}>{t.count}</span>
                  </div>
                  <div style={{ height: '5px', background: '#f3f4f6', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, t.count)}%`, background: t.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: '0 0 0.75rem 0' }}>Quick Actions</h3>
              {[
                { label: 'Generate Report Template', icon: '📄' },
                { label: 'Schedule Sample Pickup', icon: '📅' },
                { label: 'View All Reports', icon: '📊' },
              ].map((a, i) => (
                <button key={i} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.625rem 0.75rem', marginBottom: '0.5rem',
                  background: '#f9fafb', borderRadius: '10px',
                  border: '1px solid #f3f4f6', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ecfdf5'; e.currentTarget.style.borderColor = '#a7f3d0'; }}
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

export default LabDashboard;