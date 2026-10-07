import React from 'react';

// ============================================================================
// NOTE: NGODashboard page content is temporarily commented out as requested.
// Renders a blank white page when accessed.
// ============================================================================

const NGODashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'completed'>('pending');

  const supportRequests: SupportRequest[] = [
    {
      id: 'SR001',
      farmerName: 'Rajesh Kumar',
      location: 'Village Kothpura, Dungarpur',
      supportType: 'Financial Assistance',
      issue: 'Crop failure due to unexpected rainfall. Need immediate financial support for family sustenance and next season preparation.',
      urgency: 'High',
      requestDate: '2025-01-15',
      status: 'pending',
      phone: '9876543210',
      estimatedAmount: '₹25,000'
    },
    {
      id: 'SR002',
      farmerName: 'Sunita Devi',
      location: 'Saheli Village, Dungarpur',
      supportType: 'Educational Support',
      issue: 'Need educational support for children. Unable to afford school fees and books after poor harvest season.',
      urgency: 'Medium',
      requestDate: '2025-01-14',
      status: 'pending',
      phone: '9876543211',
      estimatedAmount: '₹8,000'
    },
    {
      id: 'SR003',
      farmerName: 'Mohan Singh',
      location: 'Bichhiwara, Dungarpur',
      supportType: 'Healthcare Support',
      issue: 'Wife needs urgent medical treatment but cannot afford hospital expenses. Family facing financial crisis.',
      urgency: 'Critical',
      requestDate: '2025-01-13',
      status: 'accepted',
      phone: '9876543212',
      estimatedAmount: '₹15,000',
      acceptedDate: '2025-01-14',
      assignedWorker: 'Ravi Sharma'
    },
    {
      id: 'SR004',
      farmerName: 'Priya Sharma',
      location: 'Aspur, Dungarpur',
      supportType: 'Agricultural Equipment',
      issue: 'Small tractor broke down and cannot afford repair. Need support to fix equipment for upcoming season.',
      urgency: 'Medium',
      requestDate: '2025-01-10',
      status: 'completed',
      phone: '9876543213',
      estimatedAmount: '₹12,000',
      completionDate: '2025-01-12',
      supportProvided: 'Tractor repaired and additional farming tools provided'
    }
  ];

  const filteredRequests = supportRequests.filter(r => r.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Support request ${requestId} accepted! You can now coordinate with the farmer.`);
  };

  const getSupportConfig = (supportType: string) => {
    const configs: Record<string, { emoji: string; color: string; bg: string; border: string }> = {
      'Financial Assistance': { emoji: '💰', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
      'Educational Support': { emoji: '📚', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
      'Healthcare Support': { emoji: '🏥', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
      'Agricultural Equipment': { emoji: '🚜', color: '#f97316', bg: '#fff7ed', border: '#fed7aa' },
    };
    return configs[supportType] || { emoji: '🤝', color: '#8b5cf6', bg: '#faf5ff', border: '#e9d5ff' };
  };

  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5', label: '🚨 Critical', pulse: true };
      case 'High': return { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa', label: '🔴 High', pulse: false };
      case 'Medium': return { bg: '#fefce8', color: '#ca8a04', border: '#fde68a', label: '🟡 Medium', pulse: false };
      default: return { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', label: '🟢 Low', pulse: false };
    }
  };

  const stats = [
    { label: 'Pending', value: supportRequests.filter(r => r.status === 'pending').length, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Active Cases', value: supportRequests.filter(r => r.status === 'accepted').length, icon: Heart, color: '#ec4899', bg: '#fce7f3' },
    { label: 'Completed', value: supportRequests.filter(r => r.status === 'completed').length, icon: CheckCircle, color: '#22c55e', bg: '#dcfce7' },
    { label: 'Total Aided', value: '₹1.2L', icon: IndianRupee, color: '#3b82f6', bg: '#dbeafe' },
  ];

  const tabs = [
    { key: 'pending', label: 'Pending', count: supportRequests.filter(r => r.status === 'pending').length, icon: '🕐' },
    { key: 'accepted', label: 'Active', count: supportRequests.filter(r => r.status === 'accepted').length, icon: '❤️' },
    { key: 'completed', label: 'Completed', count: supportRequests.filter(r => r.status === 'completed').length, icon: '✅' },
  ];

  const impactCategories = [
    { type: 'Financial', count: 42, color: '#16a34a', emoji: '💰' },
    { type: 'Healthcare', count: 28, color: '#dc2626', emoji: '🏥' },
    { type: 'Education', count: 31, color: '#3b82f6', emoji: '📚' },
    { type: 'Equipment', count: 19, color: '#f97316', emoji: '🚜' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #831843 0%, #be185d 40%, #db2777 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '300px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        {/* Animated hearts */}
        <div style={{ position: 'absolute', top: '20px', right: '200px', fontSize: '1.5rem', opacity: 0.2 }}>❤️</div>
        <div style={{ position: 'absolute', top: '50px', right: '350px', fontSize: '1rem', opacity: 0.15 }}>❤️</div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <HandHeart style={{ width: '20px', height: '20px', color: '#fbcfe8' }} />
                <span style={{ color: '#fbcfe8', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>NGO SUPPORT PORTAL</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Welcome, {user?.name || 'NGO Worker'} 🤝
              </h1>
              <p style={{ color: '#fbcfe8', fontSize: '1rem', marginBottom: '1rem' }}>
                💖 Community Impact Worker • Farmer Welfare Specialist
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(251,207,232,0.2)', border: '1px solid rgba(251,207,232,0.4)', color: '#fbcfe8', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✅ NGO Registered
                </span>
                <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fde047', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ⭐ 4.9 Rating
                </span>
                <span style={{ background: 'rgba(134,239,172,0.2)', border: '1px solid rgba(134,239,172,0.4)', color: '#86efac', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  💚 120 Farmers Helped
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem', borderRadius: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center' }}>
                <Bell style={{ width: '20px', height: '20px' }} />
              </button>
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: '#fbcfe8', fontSize: '0.7rem', fontWeight: 600 }}>LIVES IMPACTED</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>120+</div>
                <div style={{ color: '#fbcfe8', fontSize: '0.75rem' }}>Farmers this year</div>
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
                transition: 'transform 0.2s'
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
            <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              {/* Tabs */}
              <div style={{ borderBottom: '1px solid #f3f4f6', display: 'flex', padding: '0 1.5rem' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as any)}
                    style={{
                      padding: '1rem 1.25rem', fontSize: '0.875rem', fontWeight: 600,
                      border: 'none', background: 'none', cursor: 'pointer',
                      borderBottom: selectedTab === tab.key ? '3px solid #db2777' : '3px solid transparent',
                      color: selectedTab === tab.key ? '#db2777' : '#6b7280',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                    <span style={{
                      background: selectedTab === tab.key ? '#fce7f3' : '#f3f4f6',
                      color: selectedTab === tab.key ? '#db2777' : '#6b7280',
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
                    <Heart style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.4 }} />
                    <p style={{ fontSize: '1rem', fontWeight: 500 }}>No {selectedTab} requests</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Support requests from farmers will appear here</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredRequests.map(request => {
                      const supportConfig = getSupportConfig(request.supportType);
                      const urgencyConfig = getUrgencyConfig(request.urgency);
                      return (
                        <div key={request.id} style={{
                          border: '1px solid #f3f4f6', borderRadius: '16px',
                          padding: '1.25rem', transition: 'all 0.2s', background: '#fafafa'
                        }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(219,39,119,0.12)';
                            e.currentTarget.style.borderColor = '#fbcfe8';
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
                                background: 'linear-gradient(135deg, #db2777, #be185d)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.3rem'
                              }}>
                                {supportConfig.emoji}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>{request.farmerName}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}>
                                  <MapPin style={{ width: '12px', height: '12px' }} />
                                  {request.location}
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
                              <span style={{ background: supportConfig.bg, color: supportConfig.color, border: `1px solid ${supportConfig.border}`, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
                                {supportConfig.emoji} {request.supportType}
                              </span>
                            </div>
                          </div>

                          {/* Amount & Date */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              <div style={{ background: 'white', padding: '0.625rem 0.875rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>ESTIMATED SUPPORT</div>
                                <div style={{ fontWeight: 800, color: '#db2777', fontSize: '1.1rem' }}>{request.estimatedAmount}</div>
                              </div>
                              <div style={{ background: 'white', padding: '0.625rem 0.875rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>PHONE</div>
                                <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <Phone style={{ width: '12px', height: '12px' }} />
                                  {request.phone}
                                </div>
                              </div>
                              <div style={{ background: 'white', padding: '0.625rem 0.875rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>REQUEST ID</div>
                                <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem', fontFamily: 'monospace' }}>{request.id}</div>
                              </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{request.requestDate}</div>
                          </div>

                          {/* Issue Description */}
                          <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#db2777', fontWeight: 700, marginBottom: '0.4rem' }}>💬 SUPPORT NEEDED</div>
                            <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>{request.issue}</div>
                          </div>

                          {/* Accepted Info */}
                          {request.status === 'accepted' && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                              <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.5rem' }}>👥 CASE ASSIGNED</div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                                <div>
                                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Accepted: </span>
                                  <span>{request.acceptedDate}</span>
                                </div>
                                <div>
                                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Field Worker: </span>
                                  <span style={{ fontWeight: 700 }}>{request.assignedWorker}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Completed Info */}
                          {request.status === 'completed' && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
                              <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.4rem' }}>✅ SUPPORT PROVIDED</div>
                              <div style={{ fontSize: '0.875rem', color: '#374151' }}>{request.supportProvided}</div>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.4rem' }}>Completed: {request.completionDate}</div>
                            </div>
                          )}

                          {/* Actions */}
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              padding: '0.5rem 1rem', borderRadius: '10px',
                              background: '#fdf2f8', color: '#db2777',
                              border: '1px solid #fbcfe8', cursor: 'pointer',
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
                                  background: '#eff6ff', color: '#3b82f6',
                                  border: '1px solid #bfdbfe', cursor: 'pointer',
                                  fontSize: '0.8rem', fontWeight: 600
                                }}>
                                  <MessageSquare style={{ width: '14px', height: '14px' }} />
                                  Message
                                </button>
                                <button
                                  onClick={() => handleAcceptRequest(request.id)}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    padding: '0.5rem 1.25rem', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #db2777, #be185d)',
                                    color: 'white', border: 'none', cursor: 'pointer',
                                    fontSize: '0.8rem', fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(219,39,119,0.3)'
                                  }}>
                                  <Heart style={{ width: '14px', height: '14px' }} />
                                  Accept & Assign
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
                                Contact Farmer
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
              background: 'linear-gradient(135deg, #831843, #db2777)',
              borderRadius: '20px', padding: '1.5rem', color: 'white',
              boxShadow: '0 8px 32px rgba(219,39,119,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: '24px', height: '24px' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{user?.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>NGO Field Worker</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { label: 'Cases Closed', value: '120' },
                  { label: 'Rating', value: '4.9 ⭐' },
                  { label: 'Fund Disbursed', value: '₹4.8L' },
                  { label: 'Villages', value: '18' }
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact by Category */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Globe style={{ width: '16px', height: '16px', color: '#db2777' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Impact by Category</h3>
              </div>
              {impactCategories.map((cat, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>{cat.emoji}</span>{cat.type}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: cat.color, fontWeight: 700 }}>{cat.count} cases</span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (cat.count / 42) * 100)}%`, background: cat.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Field Workers */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Users style={{ width: '16px', height: '16px', color: '#db2777' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Field Workers</h3>
              </div>
              {[
                { name: 'Ravi Sharma', cases: 8, status: 'Active', color: '#16a34a' },
                { name: 'Anita Kumari', cases: 5, status: 'Active', color: '#16a34a' },
                { name: 'Ramesh Gupta', cases: 3, status: 'On Leave', color: '#f59e0b' },
              ].map((w, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.625rem', borderRadius: '10px', marginBottom: '0.5rem',
                  background: '#f9fafb', border: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>
                      👤
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>{w.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{w.cases} active cases</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: w.color, background: `${w.color}15`, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                    {w.status}
                  </span>
                </div>
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
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e' }}>MILESTONE REACHED</span>
              </div>
              <div style={{ fontWeight: 700, color: '#78350f', fontSize: '0.95rem', marginBottom: '0.25rem' }}>100 Families Supported! 🎉</div>
              <div style={{ fontSize: '0.8rem', color: '#92400e' }}>Your compassion has changed 100+ lives. The community thanks you!</div>
              <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.75rem' }}>
                {[1, 2, 3, 4, 5].map(s => <Star key={s} style={{ width: '16px', height: '16px', color: '#f59e0b', fill: '#f59e0b' }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;

// ============================================================================
// ORIGINAL NGODASHBOARD CODE (COMMENTED OUT):
// ============================================================================
// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import {
//   Heart, Clock, CheckCircle, MapPin, Phone, Eye,
//   TrendingUp, Users, IndianRupee, Globe, Bell,
//   ArrowRight, User, HandHeart, Award, Star, MessageSquare
// } from 'lucide-react';
//
// interface SupportRequest {
//   id: string;
//   farmerName: string;
//   location: string;
//   supportType: string;
//   issue: string;
//   urgency: string;
//   requestDate: string;
//   status: string;
//   phone: string;
//   estimatedAmount: string;
//   acceptedDate?: string;
//   assignedWorker?: string;
//   completionDate?: string;
//   supportProvided?: string;
// }
//
// const NGODashboard: React.FC = () => {
//   const { user } = useAuth();
//   const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'completed'>('pending');
//
//   const supportRequests: SupportRequest[] = [
//     {
//       id: 'SR001',
//       farmerName: 'Rajesh Kumar',
//       location: 'Village Kothpura, Dungarpur',
//       supportType: 'Financial Assistance',
//       issue: 'Crop failure due to unexpected rainfall. Need immediate financial support for family sustenance and next season preparation.',
//       urgency: 'High',
//       requestDate: '2025-01-15',
//       status: 'pending',
//       phone: '9876543210',
//       estimatedAmount: '₹25,000'
//     },
//     {
//       id: 'SR002',
//       farmerName: 'Sunita Devi',
//       location: 'Saheli Village, Dungarpur',
//       supportType: 'Educational Support',
//       issue: 'Need educational support for children. Unable to afford school fees and books after poor harvest season.',
//       urgency: 'Medium',
//       requestDate: '2025-01-14',
//       status: 'pending',
//       phone: '9876543211',
//       estimatedAmount: '₹8,000'
//     },
//     {
//       id: 'SR003',
//       farmerName: 'Mohan Singh',
//       location: 'Bichhiwara, Dungarpur',
//       supportType: 'Healthcare Support',
//       issue: 'Wife needs urgent medical treatment but cannot afford hospital expenses. Family facing financial crisis.',
//       urgency: 'Critical',
//       requestDate: '2025-01-13',
//       status: 'accepted',
//       phone: '9876543212',
//       estimatedAmount: '₹15,000',
//       acceptedDate: '2025-01-14',
//       assignedWorker: 'Ravi Sharma'
//     },
//     {
//       id: 'SR004',
//       farmerName: 'Priya Sharma',
//       location: 'Aspur, Dungarpur',
//       supportType: 'Agricultural Equipment',
//       issue: 'Small tractor broke down and cannot afford repair. Need support to fix equipment for upcoming season.',
//       urgency: 'Medium',
//       requestDate: '2025-01-10',
//       status: 'completed',
//       phone: '9876543213',
//       estimatedAmount: '₹12,000',
//       completionDate: '2025-01-12',
//       supportProvided: 'Tractor repaired and additional farming tools provided'
//     }
//   ];
//
//   const filteredRequests = supportRequests.filter(r => r.status === selectedTab);
//
//   const handleAcceptRequest = (requestId: string) => {
//     alert(`Support request ${requestId} accepted! You can now coordinate with the farmer.`);
//   };
//
//   const getSupportConfig = (supportType: string) => {
//     const configs: Record<string, { emoji: string; color: string; bg: string; border: string }> = {
//       'Financial Assistance': { emoji: '💰', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
//       'Educational Support': { emoji: '📚', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
//       'Healthcare Support': { emoji: '🏥', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
//       'Agricultural Equipment': { emoji: '🚜', color: '#f97316', bg: '#fff7ed', border: '#fed7aa' },
//     };
//     return configs[supportType] || { emoji: '🤝', color: '#8b5cf6', bg: '#faf5ff', border: '#e9d5ff' };
//   };
//
//   const getUrgencyConfig = (urgency: string) => {
//     switch (urgency) {
//       case 'Critical': return { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5', label: '🚨 Critical', pulse: true };
//       case 'High': return { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa', label: '🔴 High', pulse: false };
//       case 'Medium': return { bg: '#fefce8', color: '#ca8a04', border: '#fde68a', label: '🟡 Medium', pulse: false };
//       default: return { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', label: '🟢 Low', pulse: false };
//     }
//   };
//
//   const stats = [
//     { label: 'Pending', value: supportRequests.filter(r => r.status === 'pending').length, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
//     { label: 'Active Cases', value: supportRequests.filter(r => r.status === 'accepted').length, icon: Heart, color: '#ec4899', bg: '#fce7f3' },
//     { label: 'Completed', value: supportRequests.filter(r => r.status === 'completed').length, icon: CheckCircle, color: '#22c55e', bg: '#dcfce7' },
//     { label: 'Total Aided', value: '₹1.2L', icon: IndianRupee, color: '#3b82f6', bg: '#dbeafe' },
//   ];
//
//   const tabs = [
//     { key: 'pending', label: 'Pending', count: supportRequests.filter(r => r.status === 'pending').length, icon: '🕐' },
//     { key: 'accepted', label: 'Active', count: supportRequests.filter(r => r.status === 'accepted').length, icon: '❤️' },
//     { key: 'completed', label: 'Completed', count: supportRequests.filter(r => r.status === 'completed').length, icon: '✅' },
//   ];
//
//   const impactCategories = [
//     { type: 'Financial', count: 42, color: '#16a34a', emoji: '💰' },
//     { type: 'Healthcare', count: 28, color: '#dc2626', emoji: '🏥' },
//     { type: 'Education', count: 31, color: '#3b82f6', emoji: '📚' },
//     { type: 'Equipment', count: 19, color: '#f97316', emoji: '🚜' },
//   ];
//
//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
//       {/* Hero Banner */}
//       <div style={{
//         background: 'linear-gradient(135deg, #831843 0%, #be185d 40%, #db2777 100%)',
//         padding: '2rem 1.5rem',
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
//         <div style={{ position: 'absolute', bottom: '-30px', left: '300px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
//         {/* Animated hearts */}
//         <div style={{ position: 'absolute', top: '20px', right: '200px', fontSize: '1.5rem', opacity: 0.2 }}>❤️</div>
//         <div style={{ position: 'absolute', top: '50px', right: '350px', fontSize: '1rem', opacity: 0.15 }}>❤️</div>
//
//         <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
//                 <HandHeart style={{ width: '20px', height: '20px', color: '#fbcfe8' }} />
//                 <span style={{ color: '#fbcfe8', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em' }}>NGO SUPPORT PORTAL</span>
//               </div>
//               <h1 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
//                 Welcome, {user?.name || 'NGO Worker'} 🤝
//               </h1>
//               <p style={{ color: '#fbcfe8', fontSize: '1rem', marginBottom: '1rem' }}>
//                 💖 Community Impact Worker • Farmer Welfare Specialist
//               </p>
//               <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
//                 <span style={{ background: 'rgba(251,207,232,0.2)', border: '1px solid rgba(251,207,232,0.4)', color: '#fbcfe8', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
//                   ✅ NGO Registered
//                 </span>
//                 <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fde047', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
//                   ⭐ 4.9 Rating
//                 </span>
//                 <span style={{ background: 'rgba(134,239,172,0.2)', border: '1px solid rgba(134,239,172,0.4)', color: '#86efac', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
//                   💚 120 Farmers Helped
//                 </span>
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '0.75rem' }}>
//               <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem', borderRadius: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center' }}>
//                 <Bell style={{ width: '20px', height: '20px' }} />
//               </button>
//               <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)' }}>
//                 <div style={{ color: '#fbcfe8', fontSize: '0.7rem', fontWeight: 600 }}>LIVES IMPACTED</div>
//                 <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>120+</div>
//                 <div style={{ color: '#fbcfe8', fontSize: '0.75rem' }}>Farmers this year</div>
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
//                       borderBottom: selectedTab === tab.key ? '3px solid #db2777' : '3px solid transparent',
//                       color: selectedTab === tab.key ? '#db2777' : '#6b7280',
//                       display: 'flex', alignItems: 'center', gap: '0.4rem',
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     <span>{tab.icon}</span>
//                     {tab.label}
//                     <span style={{
//                       background: selectedTab === tab.key ? '#fce7f3' : '#f3f4f6',
//                       color: selectedTab === tab.key ? '#db2777' : '#6b7280',
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
//                     <Heart style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.4 }} />
//                     <p style={{ fontSize: '1rem', fontWeight: 500 }}>No {selectedTab} requests</p>
//                     <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Support requests from farmers will appear here</p>
//                   </div>
//                 ) : (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                     {filteredRequests.map(request => {
//                       const supportConfig = getSupportConfig(request.supportType);
//                       const urgencyConfig = getUrgencyConfig(request.urgency);
//                       return (
//                         <div key={request.id} style={{
//                           border: '1px solid #f3f4f6', borderRadius: '16px',
//                           padding: '1.25rem', transition: 'all 0.2s', background: '#fafafa'
//                         }}
//                           onMouseEnter={e => {
//                             e.currentTarget.style.boxShadow = '0 8px 30px rgba(219,39,119,0.12)';
//                             e.currentTarget.style.borderColor = '#fbcfe8';
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
//                                 background: 'linear-gradient(135deg, #db2777, #be185d)',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                 fontSize: '1.3rem'
//                               }}>
//                                 {supportConfig.emoji}
//                               </div>
//                               <div>
//                                 <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>{request.farmerName}</div>
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}>
//                                   <MapPin style={{ width: '12px', height: '12px' }} />
//                                   {request.location}
//                                 </div>
//                               </div>
//                             </div>
//                             <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
//                               <span style={{
//                                 background: urgencyConfig.bg, color: urgencyConfig.color,
//                                 border: `1px solid ${urgencyConfig.border}`,
//                                 fontSize: '0.75rem', padding: '0.2rem 0.6rem',
//                                 borderRadius: '9999px', fontWeight: 700
//                               }}>
//                                 {urgencyConfig.label}
//                               </span>
//                               <span style={{ background: supportConfig.bg, color: supportConfig.color, border: `1px solid ${supportConfig.border}`, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700 }}>
//                                 {supportConfig.emoji} {request.supportType}
//                               </span>
//                             </div>
//                           </div>
//
//                           {/* Amount & Date */}
//                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
//                             <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//                               <div style={{ background: 'white', padding: '0.625rem 0.875rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
//                                 <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>ESTIMATED SUPPORT</div>
//                                 <div style={{ fontWeight: 800, color: '#db2777', fontSize: '1.1rem' }}>{request.estimatedAmount}</div>
//                               </div>
//                               <div style={{ background: 'white', padding: '0.625rem 0.875rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
//                                 <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>PHONE</div>
//                                 <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
//                                   <Phone style={{ width: '12px', height: '12px' }} />
//                                   {request.phone}
//                                 </div>
//                               </div>
//                               <div style={{ background: 'white', padding: '0.625rem 0.875rem', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
//                                 <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>REQUEST ID</div>
//                                 <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem', fontFamily: 'monospace' }}>{request.id}</div>
//                               </div>
//                             </div>
//                             <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{request.requestDate}</div>
//                           </div>
//
//                           {/* Issue Description */}
//                           <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
//                             <div style={{ fontSize: '0.7rem', color: '#db2777', fontWeight: 700, marginBottom: '0.4rem' }}>💬 SUPPORT NEEDED</div>
//                             <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>{request.issue}</div>
//                           </div>
//
//                           {/* Accepted Info */}
//                           {request.status === 'accepted' && (
//                             <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
//                               <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.5rem' }}>👥 CASE ASSIGNED</div>
//                               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
//                                 <div>
//                                   <span style={{ color: '#16a34a', fontWeight: 600 }}>Accepted: </span>
//                                   <span>{request.acceptedDate}</span>
//                                 </div>
//                                 <div>
//                                   <span style={{ color: '#16a34a', fontWeight: 600 }}>Field Worker: </span>
//                                   <span style={{ fontWeight: 700 }}>{request.assignedWorker}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//
//                           {/* Completed Info */}
//                           {request.status === 'completed' && (
//                             <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.875rem', marginBottom: '1rem' }}>
//                               <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.4rem' }}>✅ SUPPORT PROVIDED</div>
//                               <div style={{ fontSize: '0.875rem', color: '#374151' }}>{request.supportProvided}</div>
//                               <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.4rem' }}>Completed: {request.completionDate}</div>
//                             </div>
//                           )}
//
//                           {/* Actions */}
//                           <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
//                             <button style={{
//                               display: 'flex', alignItems: 'center', gap: '0.3rem',
//                               padding: '0.5rem 1rem', borderRadius: '10px',
//                               background: '#fdf2f8', color: '#db2777',
//                               border: '1px solid #fbcfe8', cursor: 'pointer',
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
//                                   background: '#eff6ff', color: '#3b82f6',
//                                   border: '1px solid #bfdbfe', cursor: 'pointer',
//                                   fontSize: '0.8rem', fontWeight: 600
//                                 }}>
//                                   <MessageSquare style={{ width: '14px', height: '14px' }} />
//                                   Message
//                                 </button>
//                                 <button
//                                   onClick={() => handleAcceptRequest(request.id)}
//                                   style={{
//                                     display: 'flex', alignItems: 'center', gap: '0.3rem',
//                                     padding: '0.5rem 1.25rem', borderRadius: '10px',
//                                     background: 'linear-gradient(135deg, #db2777, #be185d)',
//                                     color: 'white', border: 'none', cursor: 'pointer',
//                                     fontSize: '0.8rem', fontWeight: 600,
//                                     boxShadow: '0 4px 12px rgba(219,39,119,0.3)'
//                                   }}>
//                                   <Heart style={{ width: '14px', height: '14px' }} />
//                                   Accept & Assign
//                                 </button>
//                               </>
//                             )}
//
//                             {request.status === 'accepted' && (
//                               <button style={{
//                                 display: 'flex', alignItems: 'center', gap: '0.3rem',
//                                 padding: '0.5rem 1.25rem', borderRadius: '10px',
//                                 background: 'linear-gradient(135deg, #16a34a, #15803d)',
//                                 color: 'white', border: 'none', cursor: 'pointer',
//                                 fontSize: '0.8rem', fontWeight: 600,
//                                 boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
//                               }}>
//                                 <Phone style={{ width: '14px', height: '14px' }} />
//                                 Contact Farmer
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
//             {/* Profile Card */}
//             <div style={{
//               background: 'linear-gradient(135deg, #831843, #db2777)',
//               borderRadius: '20px', padding: '1.5rem', color: 'white',
//               boxShadow: '0 8px 32px rgba(219,39,119,0.3)'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
//                 <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                   <User style={{ width: '24px', height: '24px' }} />
//                 </div>
//                 <div>
//                   <div style={{ fontWeight: 700 }}>{user?.name}</div>
//                   <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>NGO Field Worker</div>
//                 </div>
//               </div>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
//                 {[
//                   { label: 'Cases Closed', value: '120' },
//                   { label: 'Rating', value: '4.9 ⭐' },
//                   { label: 'Fund Disbursed', value: '₹4.8L' },
//                   { label: 'Villages', value: '18' }
//                 ].map((s, i) => (
//                   <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem', textAlign: 'center' }}>
//                     <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.value}</div>
//                     <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//
//             {/* Impact by Category */}
//             <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
//                 <Globe style={{ width: '16px', height: '16px', color: '#db2777' }} />
//                 <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Impact by Category</h3>
//               </div>
//               {impactCategories.map((cat, i) => (
//                 <div key={i} style={{ marginBottom: '0.75rem' }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
//                     <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
//                       <span>{cat.emoji}</span>{cat.type}
//                     </span>
//                     <span style={{ fontSize: '0.75rem', color: cat.color, fontWeight: 700 }}>{cat.count} cases</span>
//                   </div>
//                   <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '9999px' }}>
//                     <div style={{ height: '100%', width: `${Math.min(100, (cat.count / 42) * 100)}%`, background: cat.color, borderRadius: '9999px' }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             {/* Recent Field Workers */}
//             <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
//                 <Users style={{ width: '16px', height: '16px', color: '#db2777' }} />
//                 <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>Field Workers</h3>
//               </div>
//               {[
//                 { name: 'Ravi Sharma', cases: 8, status: 'Active', color: '#16a34a' },
//                 { name: 'Anita Kumari', cases: 5, status: 'Active', color: '#16a34a' },
//                 { name: 'Ramesh Gupta', cases: 3, status: 'On Leave', color: '#f59e0b' },
//               ].map((w, i) => (
//                 <div key={i} style={{
//                   display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                   padding: '0.625rem', borderRadius: '10px', marginBottom: '0.5rem',
//                   background: '#f9fafb', border: '1px solid #f3f4f6'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>
//                       👤
//                     </div>
//                     <div>
//                       <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>{w.name}</div>
//                       <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{w.cases} active cases</div>
//                     </div>
//                   </div>
//                   <span style={{ fontSize: '0.65rem', fontWeight: 700, color: w.color, background: `${w.color}15`, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
//                     {w.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//
//             {/* Achievement */}
//             <div style={{
//               background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
//               borderRadius: '20px', padding: '1.25rem',
//               border: '1px solid #fde68a'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
//                 <Award style={{ width: '18px', height: '18px', color: '#92400e' }} />
//                 <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e' }}>MILESTONE REACHED</span>
//               </div>
//               <div style={{ fontWeight: 700, color: '#78350f', fontSize: '0.95rem', marginBottom: '0.25rem' }}>100 Families Supported! 🎉</div>
//               <div style={{ fontSize: '0.8rem', color: '#92400e' }}>Your compassion has changed 100+ lives. The community thanks you!</div>
//               <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.75rem' }}>
//                 {[1, 2, 3, 4, 5].map(s => <Star key={s} style={{ width: '16px', height: '16px', color: '#f59e0b', fill: '#f59e0b' }} />)}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default NGODashboard;
