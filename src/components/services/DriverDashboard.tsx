import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Truck, Clock, MapPin, Phone, Eye, Navigation } from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'picked' | 'delivered'>('pending');

  const transportRequests = [
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

  const filteredRequests = transportRequests.filter(request => request.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Transport request ${requestId} accepted! You can contact the farmer to coordinate pickup.`);
  };

  const handleUpdateStatus = (requestId: string, newStatus: string) => {
    alert(`Request ${requestId} status updated to: ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'picked': return 'bg-emerald-100 text-emerald-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransportIcon = (transportType: string) => {
    return transportType.includes('Animal') ? '🐄' : '🌾';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Driver Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome, {user?.name} - Manage your transport requests
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {transportRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Navigation className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">
                  {transportRequests.filter(r => r.status === 'picked').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {transportRequests.filter(r => r.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'pending', label: 'Pending', count: transportRequests.filter(r => r.status === 'pending').length },
                { key: 'picked', label: 'In Transit', count: transportRequests.filter(r => r.status === 'picked').length },
                { key: 'delivered', label: 'Delivered', count: transportRequests.filter(r => r.status === 'delivered').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab.key
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Request Cards */}
          <div className="p-6">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <Truck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No {selectedTab} requests found</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{getTransportIcon(request.transportType)}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.farmerName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          {request.urgent && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Urgent
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <Phone className="w-4 h-4" />
                          <span>{request.phone}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Request ID: <span className="font-mono">{request.id}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Pickup Date</div>
                        <div className="font-medium text-gray-900">{request.pickupDate}</div>
                        <div className="text-orange-600 font-semibold">{request.rate}</div>
                      </div>
                    </div>

                    {/* Route Information */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">📍 Pickup Location</div>
                          <div className="font-medium text-gray-900">{request.pickupLocation}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">🎯 Destination</div>
                          <div className="font-medium text-gray-900">{request.destination}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>Distance: {request.distance}</span>
                        </div>
                        <div>Transport Type: {request.transportType}</div>
                      </div>
                    </div>

                    {/* Load Description */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Load Description</div>
                      <div className="bg-emerald-50 p-3 rounded-lg text-gray-900 text-sm">
                        {request.loadDescription}
                      </div>
                    </div>

                    {/* Status-specific Information */}
                    {request.status === 'picked' && (
                      <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-emerald-700">Picked up at: </span>
                            <span className="font-medium">{request.pickupTime}</span>
                          </div>
                          <div>
                            <span className="text-emerald-700">Expected Delivery: </span>
                            <span className="font-medium">{request.estimatedDelivery}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {request.status === 'delivered' && (
                      <div className="bg-green-50 p-3 rounded-lg mb-4">
                        <div className="text-sm">
                          <span className="text-green-700">Delivered on: </span>
                          <span className="font-medium">{request.completionDate} at {request.deliveryTime}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3">
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                      
                      {request.status === 'pending' && (
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Truck className="w-4 h-4 mr-1" />
                          Accept Request
                        </button>
                      )}

                      {request.status === 'picked' && (
                        <button
                          onClick={() => handleUpdateStatus(request.id, 'delivered')}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Mark Delivered
                        </button>
                      )}

                      {request.status === 'pending' && (
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
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

export default DriverDashboard;