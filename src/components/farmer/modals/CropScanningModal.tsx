import React, { useState } from 'react';
import { X, Camera, Upload, Image, CheckCircle } from 'lucide-react';

interface CropScanningModalProps {
  onClose: () => void;
}

const CropScanningModal: React.FC<CropScanningModalProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const cropTypes = [
    'Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton', 'Tomato', 
    'Potato', 'Onion', 'Soybean', 'Mustard', 'Other'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !cropType) return;

    setAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Mock analysis result
    const mockResult = {
      health: 'Good',
      disease: 'Early Blight detected in lower leaves',
      confidence: 85,
      recommendations: [
        'Apply copper-based fungicide',
        'Improve air circulation',
        'Remove affected leaves',
        'Monitor watering schedule'
      ],
      severity: 'Low',
      treatmentUrgency: 'Within 7 days'
    };

    setAnalysisResult(mockResult);
    setAnalyzing(false);
    setAnalysisComplete(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Crop Health Scanner</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!analysisComplete ? (
            <>
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Crop Image
                </label>
                
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="space-y-4">
                      <Image className="w-16 h-16 mx-auto text-gray-400" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Upload crop image for analysis
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Take a clear photo of affected crop parts or upload from gallery
                        </p>
                        <div className="flex justify-center space-x-4">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              capture="environment"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                              <Camera className="w-5 h-5" />
                              <span>Take Photo</span>
                            </div>
                          </label>
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <div className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2">
                              <Upload className="w-5 h-5" />
                              <span>Upload</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Uploaded crop"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="text-purple-600 hover:text-purple-800 text-sm">
                          Take Another Photo
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Crop Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select crop type</option>
                  {cropTypes.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              {/* Analysis Button */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">AI Analysis</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Our AI will analyze your crop image to detect diseases, pests, and nutrient deficiencies.
                </p>
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedImage || !cropType || analyzing}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {analyzing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Image...</span>
                    </div>
                  ) : (
                    'Start AI Analysis'
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Analysis Results */
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Analysis Complete</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={selectedImage}
                    alt="Analyzed crop"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Overall Health</div>
                    <div className="text-xl font-semibold text-green-600">
                      {analysisResult.health}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Confidence Level</div>
                    <div className="text-xl font-semibold text-emerald-700">
                      {analysisResult.confidence}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Detected Issue</h4>
                  <p className="text-yellow-800">{analysisResult.disease}</p>
                  <div className="mt-2 text-sm">
                    <span className="text-yellow-700">Severity: </span>
                    <span className="font-medium">{analysisResult.severity}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                  <h4 className="font-medium text-emerald-900 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-emerald-800">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-sm text-emerald-700">
                    <span className="font-medium">Treatment Timeline: </span>
                    {analysisResult.treatmentUrgency}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setAnalysisComplete(false);
                    setSelectedImage(null);
                    setCropType('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Analyze Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropScanningModal;