import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TestTube2, Clock, CheckCircle, FileText, MapPin, Eye } from 'lucide-react';

const LabDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'in-progress' | 'completed'>('pending');

  const testRequests = [
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

  const filteredRequests = testRequests.filter(request => request.status === selectedTab);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Test request ${requestId} accepted! Farmer will be notified for sample collection.`);
  };

  const handleUploadReport = (requestId: string) => {
    alert(`Report uploaded for request ${requestId}. Farmer will receive the results.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    return urgency === 'Urgent' ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Lab Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome, {user?.name} - Manage test requests and reports
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
                  {testRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full">
                <TestTube2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testRequests.filter(r => r.status === 'in-progress').length}
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
                  {testRequests.filter(r => r.status === 'completed').length}
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
                { key: 'pending', label: 'Pending Requests', count: testRequests.filter(r => r.status === 'pending').length },
                { key: 'in-progress', label: 'In Progress', count: testRequests.filter(r => r.status === 'in-progress').length },
                { key: 'completed', label: 'Completed', count: testRequests.filter(r => r.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab.key
                      ? 'border-emerald-500 text-emerald-600'
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
                <TestTube2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No {selectedTab.replace('-', ' ')} requests found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.farmerName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('-', ' ')}
                          </span>
                          <span className={`text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.farmLocation}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Request ID: <span className="font-mono">{request.id}</span> | 
                          Phone: <span className="font-mono">{request.phone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Request Date</div>
                        <div className="font-medium text-gray-900">{request.requestDate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Test Type</div>
                        <div className="font-medium text-gray-900">{request.testType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Samples Required</div>
                        <div className="font-medium text-gray-900">{request.samples}</div>
                      </div>
                    </div>

                    {request.status === 'in-progress' && (
                      <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-emerald-700">Collection Date: </span>
                            <span className="font-medium">{request.collectionDate}</span>
                          </div>
                          <div>
                            <span className="text-emerald-700">Expected Completion: </span>
                            <span className="font-medium">{request.expectedCompletion}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {request.status === 'completed' && (
                      <div className="bg-green-50 p-3 rounded-lg mb-4">
                        <div className="text-sm">
                          <span className="text-green-700">Completed on: </span>
                          <span className="font-medium">{request.completionDate}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-3">
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                      
                      {request.status === 'pending' && (
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept Request
                        </button>
                      )}

                      {request.status === 'in-progress' && (
                        <button
                          onClick={() => handleUploadReport(request.id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Upload Report
                        </button>
                      )}

                      {request.status === 'completed' && (
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          <FileText className="w-4 h-4 mr-1" />
                          View Report
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

export default LabDashboard;