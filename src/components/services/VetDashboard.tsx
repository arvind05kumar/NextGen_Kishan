import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Stethoscope, Clock, CheckCircle, X, MapPin, Phone, Eye } from 'lucide-react';

const VetDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'completed'>('pending');

  const vetRequests = [
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

  const filteredRequests = vetRequests.filter(request => request.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Request ${requestId} accepted! You can now contact the farmer to schedule your visit.`);
  };

  const handleRejectRequest = (requestId: string) => {
    alert(`Request ${requestId} rejected. Farmer will be notified to find another veterinarian.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Emergency': return 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'Urgent': return 'text-orange-600 bg-orange-50 px-2 py-1 rounded-full text-xs font-medium';
      default: return 'text-gray-600';
    }
  };

  const getAnimalIcon = (animalType: string) => {
    if (animalType.includes('Cattle')) return '🐄';
    if (animalType.includes('Goat')) return '🐐';
    if (animalType.includes('Poultry')) return '🐔';
    return '🐴';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9BBE6' }}>
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border-l-4 border-purple-500">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Veterinary Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Welcome, {user?.name} - Manage your home visit requests
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => {
              setSelectedTab('pending');
              document.getElementById('vet-requests-tabs')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`bg-white rounded-xl p-4 sm:p-6 text-left transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 border-2 ${
              selectedTab === 'pending'
                ? 'border-yellow-500 shadow-md ring-2 ring-yellow-200'
                : 'border-transparent shadow-sm hover:border-yellow-200'
            }`}
          >
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2.5 sm:p-3 rounded-full shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Requests</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {vetRequests.filter(r => r.status === 'pending').length}
                  </p>
                  <span className="text-[11px] font-semibold text-yellow-600 hover:underline">
                    View Tab →
                  </span>
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedTab('accepted');
              document.getElementById('vet-requests-tabs')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`bg-white rounded-xl p-4 sm:p-6 text-left transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 border-2 ${
              selectedTab === 'accepted'
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-200'
                : 'border-transparent shadow-sm hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center">
              <div className="bg-emerald-100 p-2.5 sm:p-3 rounded-full shrink-0">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Accepted</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {vetRequests.filter(r => r.status === 'accepted').length}
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-600 hover:underline">
                    View Tab →
                  </span>
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedTab('completed');
              document.getElementById('vet-requests-tabs')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`bg-white rounded-xl p-4 sm:p-6 text-left transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 border-2 ${
              selectedTab === 'completed'
                ? 'border-green-500 shadow-md ring-2 ring-green-200'
                : 'border-transparent shadow-sm hover:border-green-200'
            }`}
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-2.5 sm:p-3 rounded-full shrink-0">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {vetRequests.filter(r => r.status === 'completed').length}
                  </p>
                  <span className="text-[11px] font-semibold text-green-600 hover:underline">
                    View Tab →
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div id="vet-requests-tabs" className="bg-white rounded-xl shadow-sm mb-6 scroll-mt-20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto no-scrollbar whitespace-nowrap">
              {[
                { key: 'pending', label: 'Pending Requests', count: vetRequests.filter(r => r.status === 'pending').length },
                { key: 'accepted', label: 'Accepted', count: vetRequests.filter(r => r.status === 'accepted').length },
                { key: 'completed', label: 'Completed', count: vetRequests.filter(r => r.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors shrink-0 ${selectedTab === tab.key
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Request Cards */}
          <div className="p-4 sm:p-6">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <Stethoscope className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No {selectedTab} requests found</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-2xl">{getAnimalIcon(request.animalType)}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.farmerName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          <span className={getUrgencyColor(request.urgency)}>
                            {request.urgency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.farmLocation}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{request.phone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Request Date</div>
                        <div className="font-medium text-gray-900">{request.requestDate}</div>
                        <div className="text-sm text-purple-600 mt-1">{request.preferredTime}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Animal Type</div>
                        <div className="font-medium text-gray-900">{request.animalType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Request ID</div>
                        <div className="font-mono text-gray-900">{request.id}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Health Issue Description</div>
                      <div className="bg-gray-50 p-3 rounded-lg text-gray-900">
                        {request.issue}
                      </div>
                    </div>

                    {request.status === 'accepted' && (
                      <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-emerald-700">Accepted on: </span>
                            <span className="font-medium">{request.acceptedDate}</span>
                          </div>
                          <div>
                            <span className="text-emerald-700">Scheduled Visit: </span>
                            <span className="font-medium">{request.scheduledDate}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {request.status === 'completed' && (
                      <div className="bg-green-50 p-3 rounded-lg mb-4">
                        <div className="text-sm mb-2">
                          <span className="text-green-700">Completed on: </span>
                          <span className="font-medium">{request.completionDate}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-green-700">Diagnosis & Treatment: </span>
                          <span className="font-medium">{request.diagnosis}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 pt-2">
                      <button className="inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>

                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Accept & Schedule
                          </button>
                        </>
                      )}

                      {request.status === 'accepted' && (
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                          <Phone className="w-4 h-4 mr-1" />
                          Contact Farmer
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;