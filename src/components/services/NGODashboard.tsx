import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Clock, CheckCircle, MapPin, Phone, Eye } from 'lucide-react';

const NGODashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'completed'>('pending');

  const supportRequests = [
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

  const filteredRequests = supportRequests.filter(request => request.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Support request ${requestId} accepted! You can now coordinate with the farmer to provide assistance.`);
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
      case 'Critical': return 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'High': return 'text-orange-600 bg-orange-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium';
      default: return 'text-gray-600';
    }
  };

  const getSupportIcon = (supportType: string) => {
    switch (supportType) {
      case 'Financial Assistance': return '💰';
      case 'Educational Support': return '📚';
      case 'Healthcare Support': return '🏥';
      case 'Agricultural Equipment': return '🚜';
      default: return '🤝';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-pink-500">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              NGO Support Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome, {user?.name} - Help farmers in need with various support services
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
                  {supportRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {supportRequests.filter(r => r.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {supportRequests.filter(r => r.status === 'completed').length}
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
                { key: 'pending', label: 'Pending Requests', count: supportRequests.filter(r => r.status === 'pending').length },
                { key: 'accepted', label: 'In Progress', count: supportRequests.filter(r => r.status === 'accepted').length },
                { key: 'completed', label: 'Completed', count: supportRequests.filter(r => r.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab.key
                      ? 'border-pink-500 text-pink-600'
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
                <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No {selectedTab} requests found</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{getSupportIcon(request.supportType)}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.farmerName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('-', ' ')}
                          </span>
                          <span className={getUrgencyColor(request.urgency)}>
                            {request.urgency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{request.phone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Request Date</div>
                        <div className="font-medium text-gray-900">{request.requestDate}</div>
                        <div className="text-pink-600 font-semibold text-lg">{request.estimatedAmount}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Support Type</div>
                        <div className="font-medium text-gray-900">{request.supportType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Request ID</div>
                        <div className="font-mono text-gray-900">{request.id}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Support Request Details</div>
                      <div className="bg-gray-50 p-4 rounded-lg text-gray-900 leading-relaxed">
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
                            <span className="text-emerald-700">Assigned Worker: </span>
                            <span className="font-medium">{request.assignedWorker}</span>
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
                          <span className="text-green-700">Support Provided: </span>
                          <span className="font-medium">{request.supportProvided}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-3">
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                      
                      {request.status === 'pending' && (
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept & Assign
                        </button>
                      )}

                      {request.status === 'accepted' && (
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors">
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

export default NGODashboard;