import React, { useState } from 'react';
import { X, Truck, MapPin, Calendar, Clock } from 'lucide-react';

interface TransportModalProps {
  onClose: () => void;
}

const TransportModal: React.FC<TransportModalProps> = ({ onClose }) => {
  const [transportType, setTransportType] = useState<'harvest' | 'animal'>('harvest');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const drivers = [
    {
      id: 'driver1',
      name: 'Ravi Sharma',
      vehicle: 'Tata 407 (2 Ton)',
      rating: 4.8,
      experience: '5 years',
      rate: '₹15/km',
      available: true,
      distance: '1.2 km'
    },
    {
      id: 'driver2',
      name: 'Mohan Singh',
      vehicle: 'Mahindra Bolero Pickup',
      rating: 4.6,
      experience: '8 years',
      rate: '₹12/km',
      available: true,
      distance: '2.8 km'
    },
    {
      id: 'driver3',
      name: 'Suresh Kumar',
      vehicle: 'Ashok Leyland Dost',
      rating: 4.9,
      experience: '6 years',
      rate: '₹18/km',
      available: false,
      distance: '1.8 km'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitting(false);
    alert('Transport request submitted successfully! Driver will contact you soon.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Transport Services</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Transport Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Transport Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setTransportType('harvest')}
                className={`p-3.5 sm:p-4 rounded-xl border-2 text-left transition-colors ${
                  transportType === 'harvest'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🌾</div>
                <div className="font-semibold text-gray-900 text-sm sm:text-base">Harvest Transport</div>
                <div className="text-xs sm:text-sm text-gray-500">Crops, grains, produce</div>
              </button>
              <button
                type="button"
                onClick={() => setTransportType('animal')}
                className={`p-3.5 sm:p-4 rounded-xl border-2 text-left transition-colors ${
                  transportType === 'animal'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🐄</div>
                <div className="font-semibold text-gray-900 text-sm sm:text-base">Animal Transport</div>
                <div className="text-xs sm:text-sm text-gray-500">Livestock, cattle</div>
              </button>
            </div>
          </div>

          {/* Pickup Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Preferred Time
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Morning (6 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 6 PM)</option>
                <option>Evening (6 PM - 10 PM)</option>
              </select>
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter destination address or market name"
              required
            />
          </div>

          {/* Driver Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Drivers
            </label>
            <div className="space-y-3">
              {drivers.map((driver) => (
                <label key={driver.id} className="block">
                  <input
                    type="radio"
                    name="driver"
                    value={driver.id}
                    checked={selectedDriver === driver.id}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                    disabled={!driver.available}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedDriver === driver.id
                      ? 'border-orange-500 bg-orange-50'
                      : driver.available
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{driver.name}</span>
                          {driver.available ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                              Busy
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{driver.vehicle}</div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span>{driver.rating}</span>
                          </div>
                          <div>{driver.experience}</div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{driver.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-orange-600 font-semibold text-right">
                        <div>{driver.rate}</div>
                        <div className="text-xs text-gray-500">+ fuel</div>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Load Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
              placeholder={`Describe your ${transportType} load (quantity, special handling requirements, etc.)`}
              required
            />
          </div>

          {/* Service Info */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">Transport Information</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Driver will arrive at your location for pickup</li>
              <li>• Payment: Cash on delivery or digital payment</li>
              <li>• Insurance coverage available for valuable loads</li>
              <li>• Real-time tracking during transport</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedDriver || !pickupDate || !destination || !description || submitting}
              className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors text-sm sm:text-base font-semibold order-1 sm:order-2"
            >
              {submitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Booking...</span>
                </div>
              ) : (
                'Book Transport'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportModal;