import React from 'react';
import { X, Sprout } from 'lucide-react';
import SeasonalCropPredictor from '../SeasonalCropPredictor';
import { useAuth } from '../../../contexts/AuthContext';

interface CropPredictionModalProps {
  onClose: () => void;
}

const CropPredictionModal: React.FC<CropPredictionModalProps> = ({ onClose }) => {
  const { language } = useAuth();
  const isHindi = language === 'hindi';
  const isPunjabi = language === 'regional';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                {isHindi ? 'AI मौसमी फसल पूर्वानुमान एवं निर्णय प्रणाली' : isPunjabi ? 'AI ਮੌਸਮੀ ਫ਼ਸਲ ਚੋਣ ਪ੍ਰਣਾਲੀ' : 'AI Seasonal Crop Prediction System'}
              </h2>
              <p className="text-[11px] text-gray-500">
                {isHindi ? 'मौसम, मिट्टी व पानी के अनुसार उच्च-मुनाफा फसल सिफारिश' : isPunjabi ? 'ਮਿੱਟੀ ਤੇ ਮੌਸਮ ਅਨੁਸਾਰ ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼' : 'Season, soil & irrigation matching algorithm'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-slate-100 rounded-full p-2 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-2 sm:p-4 flex-1">
          <SeasonalCropPredictor isModal={true} />
        </div>
      </div>
    </div>
  );
};

export default CropPredictionModal;

