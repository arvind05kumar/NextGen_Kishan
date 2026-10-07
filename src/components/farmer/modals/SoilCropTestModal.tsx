import React, { useState } from 'react';
import { X, TestTube2, MapPin, Calendar } from 'lucide-react';

interface SoilCropTestModalProps {
  onClose: () => void;
}

const SoilCropTestModal: React.FC<SoilCropTestModalProps> = ({ onClose }) => {
  const [testType, setTestType] = useState<'soil' | 'crop'>('soil');
  const [selectedLab, setSelectedLab] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const labs = [
    { id: 'lab1', name: 'AgriTech Lab', location: 'Sector 21, Dungarpur', rating: 4.8, price: '₹500' },
    { id: 'lab2', name: 'Soil Science Center', location: 'Industrial Area, Dungarpur', rating: 4.6, price: '₹450' },
    { id: 'lab3', name: 'Crop Analysis Lab', location: 'University Campus, Dungarpur', rating: 4.9, price: '₹600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitting(false);
    alert('Test request submitted successfully! Lab will contact you within 24 hours.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <TestTube2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Soil & Crop Test</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Test Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Test Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setTestType('soil')}
                className={`p-3.5 sm:p-4 rounded-xl border-2 text-left transition-colors ${
                  testType === 'soil'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 text-sm sm:text-base">Soil Test</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5">pH, NPK, organic matter analysis</div>
              </button>
              <button
                type="button"
                onClick={() => setTestType('crop')}
                className={`p-3.5 sm:p-4 rounded-xl border-2 text-left transition-colors ${
                  testType === 'crop'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 text-sm sm:text-base">Crop Test</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5">Disease, nutrient deficiency check</div>
              </button>
            </div>
          </div>

          {/* Lab Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Laboratory</label>
            <div className="space-y-3">
              {labs.map((lab) => (
                <label key={lab.id} className="block">
                  <input
                    type="radio"
                    name="lab"
                    value={lab.id}
                    checked={selectedLab === lab.id}
                    onChange={(e) => setSelectedLab(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedLab === lab.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{lab.name}</div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{lab.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600 ml-1">{lab.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-green-600 font-semibold">{lab.price}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              placeholder={`Describe your ${testType} testing requirements...`}
            />
          </div>

          {/* Collection Schedule */}
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-emerald-900">Collection Schedule</span>
            </div>
            <p className="text-sm text-emerald-700">
              Lab technician will visit your location within 24-48 hours to collect samples.
              Results will be available in 3-5 business days.
            </p>
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
              disabled={!selectedLab || submitting}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm sm:text-base font-semibold order-1 sm:order-2"
            >
              {submitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SoilCropTestModal;