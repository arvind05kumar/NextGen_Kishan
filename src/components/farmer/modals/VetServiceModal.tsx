import React, { useState } from 'react';
import { X, Stethoscope, MapPin, Clock, Star } from 'lucide-react';

interface VetServiceModalProps {
  onClose: () => void;
}

const VetServiceModal: React.FC<VetServiceModalProps> = ({ onClose }) => {
  const [animalType, setAnimalType] = useState('');
  const [selectedVet, setSelectedVet] = useState('');
  const [issue, setIssue] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [submitting, setSubmitting] = useState(false);

  const animalTypes = [
    { id: 'cattle', name: 'Cattle (Cow/Buffalo)', icon: '🐄' },
    { id: 'goat', name: 'Goat/Sheep', icon: '🐐' },
    { id: 'poultry', name: 'Poultry', icon: '🐔' },
    { id: 'other', name: 'Other Animals', icon: '🐴' }
  ];

  const vets = [
    { 
      id: 'vet1', 
      name: 'Dr. Priya Sharma', 
      specialization: 'Large Animal Medicine',
      experience: '8 years',
      rating: 4.9,
      distance: '2.3 km',
      available: true,
      homeService: true
    },
    { 
      id: 'vet2', 
      name: 'Dr. Rajesh Patel', 
      specialization: 'Livestock Health',
      experience: '12 years',
      rating: 4.7,
      distance: '4.1 km',
      available: true,
      homeService: true
    },
    { 
      id: 'vet3', 
      name: 'Dr. Sunita Kumar', 
      specialization: 'Poultry & Small Animals',
      experience: '6 years',
      rating: 4.8,
      distance: '3.5 km',
      available: false,
      homeService: true
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitting(false);
    alert('Veterinary service request submitted! Dr. will contact you shortly for home visit.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Veterinary Home Service</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Animal Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Select Animal Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {animalTypes.map((animal) => (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => setAnimalType(animal.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${
                    animalType === animal.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl">{animal.icon}</span>
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{animal.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Urgency Level</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setUrgency('normal')}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  urgency === 'normal'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-green-600 font-medium">Normal</div>
                <div className="text-sm text-gray-500">Within 24 hours</div>
              </button>
              <button
                type="button"
                onClick={() => setUrgency('urgent')}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  urgency === 'urgent'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-orange-600 font-medium">Urgent</div>
                <div className="text-sm text-gray-500">Within 6 hours</div>
              </button>
              <button
                type="button"
                onClick={() => setUrgency('emergency')}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  urgency === 'emergency'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-red-600 font-medium">Emergency</div>
                <div className="text-sm text-gray-500">Immediate</div>
              </button>
            </div>
          </div>

          {/* Veterinarian Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Veterinarians (Home Service)
            </label>
            <div className="space-y-3">
              {vets.map((vet) => (
                <label key={vet.id} className="block">
                  <input
                    type="radio"
                    name="vet"
                    value={vet.id}
                    checked={selectedVet === vet.id}
                    onChange={(e) => setSelectedVet(e.target.value)}
                    disabled={!vet.available}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedVet === vet.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : vet.available
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{vet.name}</span>
                          {vet.available ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                              Busy
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{vet.specialization}</div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{vet.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{vet.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{vet.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-emerald-700 text-sm font-medium">
                        🏠 Home Visit
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the Issue
            </label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
              placeholder="Describe the animal's symptoms or health concerns..."
              required
            />
          </div>

          {/* Service Info */}
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-emerald-900">Home Service Information</span>
            </div>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Veterinarian will visit your farm/home location</li>
              <li>• Basic consultation fee: ₹300-500</li>
              <li>• Additional charges for treatments and medicines</li>
              <li>• Emergency services available 24/7</li>
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
              disabled={!animalType || !selectedVet || !issue || submitting}
              className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors text-sm sm:text-base font-semibold order-1 sm:order-2"
            >
              {submitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Booking...</span>
                </div>
              ) : (
                'Book Home Visit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VetServiceModal;