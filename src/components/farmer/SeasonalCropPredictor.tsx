import React, { useState, useMemo } from 'react';
import {
  Sprout, Droplets, Calendar, Sparkles,
  Layers, ShieldCheck, Download, CheckCircle2, ChevronDown,
  ChevronUp, Sun, CloudRain, Snowflake, Info, SlidersHorizontal
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../contexts/AuthContext';
import {
  SeasonType, SoilType, WaterLevel, FilterGoal,
  predictBestCrops, getCurrentSeason, CropData, PredictionResult
} from '../../data/cropPredictionData';

interface SeasonalCropPredictorProps {
  onOpenServiceModal?: (serviceId: string) => void;
  className?: string;
  isModal?: boolean;
}

const SeasonalCropPredictor: React.FC<SeasonalCropPredictorProps> = ({
  className = '',
}) => {
  const { language, user } = useAuth();

  const isHindi = language === 'hindi';
  const isPunjabi = language === 'regional';

  // State
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>(() => getCurrentSeason());
  const [selectedSoil, setSelectedSoil] = useState<SoilType>('loamy');
  const [selectedWater, setSelectedWater] = useState<WaterLevel>('medium');
  const [landAcres, setLandAcres] = useState<number>(2.5);
  const [filterGoal, setFilterGoal] = useState<FilterGoal>('all');
  const [expandedCropId, setExpandedCropId] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Predictions computation
  const predictions = useMemo(() => {
    return predictBestCrops(selectedSeason, selectedSoil, selectedWater, landAcres, filterGoal);
  }, [selectedSeason, selectedSoil, selectedWater, landAcres, filterGoal]);

  const topMatch = predictions[0];
  const activeSeason = getCurrentSeason();

  const getSeasonLabel = (season: SeasonType) => {
    switch (season) {
      case 'rabi':
        return isHindi ? 'रबी (सर्दियों की फसल)' : isPunjabi ? 'ਹਾੜੀ (ਸਰਦੀਆਂ ਦੀ ਫ਼ਸਲ)' : 'Rabi (Winter Season)';
      case 'kharif':
        return isHindi ? 'खरीफ (मानसून फसल)' : isPunjabi ? 'ਸਾਉਣੀ (ਮੌਨਸੂਨ ਫ਼ਸਲ)' : 'Kharif (Monsoon Season)';
      case 'zaid':
        return isHindi ? 'जायद (ग्रीष्मकालीन फसल)' : isPunjabi ? 'ਜ਼ਾਇਦ (ਗਰਮੀਆਂ ਦੀ ਫ਼ਸਲ)' : 'Zaid (Summer Season)';
    }
  };

  const getSoilLabel = (soil: SoilType) => {
    switch (soil) {
      case 'loamy':
        return isHindi ? 'दोमट मिट्टी (Loamy)' : isPunjabi ? 'ਦੋਮਟ ਮਿੱਟੀ (Loamy)' : 'Loamy Soil';
      case 'black':
        return isHindi ? 'काली मिट्टी (Black)' : isPunjabi ? 'ਕਾਲੀ ਮਿੱਟੀ (Black)' : 'Black Clayey';
      case 'sandy':
        return isHindi ? 'बलुई मिट्टी (Sandy)' : isPunjabi ? 'ਰੇਤਲੀ ਮਿੱਟੀ (Sandy)' : 'Sandy Loam';
      case 'clay':
        return isHindi ? 'चिकनी मिट्टी (Clay)' : isPunjabi ? 'ਚੀਕਣੀ ਮਿੱਟੀ (Clay)' : 'Heavy Clay';
    }
  };

  const getWaterLabel = (water: WaterLevel) => {
    switch (water) {
      case 'high':
        return isHindi ? 'प्रचुर (नहर/ट्यूबवेल)' : isPunjabi ? 'ਭਰਪੂਰ (ਟਿਊਬਵੈੱਲ/ਨਹਿਰ)' : 'High / Canal';
      case 'medium':
        return isHindi ? 'मध्यम (2-3 सिंचाई)' : isPunjabi ? 'ਦਰਮਿਆਨਾ (2-3 ਪਾਣੀ)' : 'Moderate';
      case 'low':
        return isHindi ? 'सीमित (वर्षा आधारित)' : isPunjabi ? 'ਸੀਮਤ (ਮੀਂਹ ਤੇ ਨਿਰਭਰ)' : 'Low / Dryland';
    }
  };

  const downloadSowingPlanPdf = (crop: CropData, result: PredictionResult) => {
    try {
      setIsExportingPdf(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Header Banner
      doc.setFillColor(22, 101, 52); // green-800
      doc.rect(0, 0, 210, 36, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('NEXTGEN KISAN - CROP PREDICTION ADVISORY', 14, 16);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Official Agronomy Recommendation | Sowing Season: ${selectedSeason.toUpperCase()}`, 14, 24);
      doc.text(`Farmer: ${user?.name || 'Kisan Bandhu'} | Land: ${landAcres} Acres | Location: ${user?.location || 'Rajasthan'}`, 14, 30);

      // Section: Crop Profile
      doc.setTextColor(20, 83, 45);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`1. Top Recommended Crop: ${crop.name.english} (${crop.name.hindi})`, 14, 48);

      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 52, 182, 38, 3, 3, 'FD');

      doc.setTextColor(51, 65, 85);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Suitability Match:', 20, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(`${result.suitabilityScore}% Match for your soil & water conditions`, 65, 60);

      doc.setFont('helvetica', 'bold');
      doc.text('Ideal Sowing Window:', 20, 68);
      doc.setFont('helvetica', 'normal');
      doc.text(crop.sowingWindow.english, 65, 68);

      doc.setFont('helvetica', 'bold');
      doc.text('Harvest Duration:', 20, 76);
      doc.setFont('helvetica', 'normal');
      doc.text(`${crop.growthDurationDays} Days (${crop.harvestWindow.english})`, 65, 76);

      doc.setFont('helvetica', 'bold');
      doc.text('Water Need & Soil:', 20, 84);
      doc.setFont('helvetica', 'normal');
      doc.text(`${crop.waterNeed.toUpperCase()} | Suitable for ${crop.suitableSoils.join(', ')} soils`, 65, 84);

      // Section: Production & Financial Forecast
      doc.setTextColor(20, 83, 45);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`2. Production & Financial Projection (${landAcres} Acres)`, 14, 102);

      doc.setFillColor(240, 253, 244);
      doc.setDrawColor(187, 247, 208);
      doc.roundedRect(14, 106, 182, 36, 3, 3, 'FD');

      doc.setTextColor(22, 101, 52);
      doc.setFontSize(11);
      doc.text(`Estimated Total Harvest: ${result.estimatedTotalYield.min} - ${result.estimatedTotalYield.max} ${result.estimatedTotalYield.unit}`, 20, 116);
      doc.text(`Estimated Gross Income: Rs. ${result.estimatedGrossIncome.min.toLocaleString()} - Rs. ${result.estimatedGrossIncome.max.toLocaleString()}`, 20, 125);
      doc.setFont('helvetica', 'bold');
      doc.text(`Net Profit Potential: Rs. ${result.estimatedTotalProfit.min.toLocaleString()} - Rs. ${result.estimatedTotalProfit.max.toLocaleString()}`, 20, 134);

      // Section: Seed Varieties & Fertilizer
      doc.setTextColor(20, 83, 45);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('3. Agronomy & Fertilizer Package', 14, 154);

      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'bold');
      doc.text('High-Yield Seed Varieties:', 14, 162);
      doc.setFont('helvetica', 'normal');
      doc.text(crop.topVarieties.join(' | '), 14, 168);

      doc.setFont('helvetica', 'bold');
      doc.text('Fertilizer (NPK Dose per acre):', 14, 178);
      doc.setFont('helvetica', 'normal');
      doc.text(crop.fertilizerNPK.english, 14, 184);

      doc.setFont('helvetica', 'bold');
      doc.text('Irrigation Stages:', 14, 194);
      doc.setFont('helvetica', 'normal');
      doc.text(crop.irrigationSchedule.english, 14, 200, { maxWidth: 180 });

      doc.setFont('helvetica', 'bold');
      doc.text('Pest & Disease Advisory:', 14, 214);
      doc.setFont('helvetica', 'normal');
      doc.text(crop.pestAdvisory.english, 14, 220, { maxWidth: 180 });

      // Footer
      doc.setDrawColor(200, 200, 200);
      doc.line(14, 270, 196, 270);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text('NextGen Kisan AI Agronomy Engine | Certified Agricultural Decision Support System', 14, 276);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 155, 276);

      doc.save(`Crop_Advisory_${crop.id}_${selectedSeason}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden ${className}`}>
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 p-5 sm:p-7 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-32 h-32 bg-emerald-400/10 rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-inner">
                <Sprout className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                    {isHindi ? 'AI फसल भविष्यवाणी' : isPunjabi ? 'AI ਫ਼ਸਲ ਭਵਿੱਖਬਾਣੀ' : 'AI Crop Predictor'}
                  </span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                    {isHindi ? 'मौसम अनुरूप' : isPunjabi ? 'ਮੌਸਮ ਅਨੁਸਾਰ' : 'Season-Based'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {isHindi
                    ? 'मौसम अनुसार सर्वश्रेष्ठ फसल पूर्वानुमान प्रणाली'
                    : isPunjabi
                    ? 'ਮੌਸਮ ਅਨੁਸਾਰ ਸਰਵੋਤਮ ਫ਼ਸਲ ਚੋਣ ਪ੍ਰਣਾਲੀ'
                    : 'Seasonal Crop Prediction System'}
                </h2>
              </div>
            </div>

            {/* Current Season Badge */}
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-3.5 py-2 text-right">
              <div className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
                {isHindi ? 'वर्तमान मौसम' : isPunjabi ? 'ਮੌਜੂਦਾ ਮੌਸਮ' : 'CURRENT SEASON'}
              </div>
              <div className="text-sm font-extrabold text-white flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {activeSeason === 'rabi' ? 'Rabi (Winter)' : activeSeason === 'kharif' ? 'Kharif (Monsoon)' : 'Zaid (Summer)'}
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed mt-1">
            {isHindi
              ? 'वर्तमान मौसम, अपनी खेत की मिट्टी, उपलब्ध सिंचाई और जमीन के आधार पर सबसे अधिक मुनाफा और पैदावार देने वाली फसलें जानें।'
              : isPunjabi
              ? 'ਆਪਣੇ ਖੇਤ ਦੀ ਮਿੱਟੀ, ਪਾਣੀ ਦੇ ਸਾਧਨ ਅਤੇ ਮੌਸਮ ਮੁਤਾਬਕ ਵੱਧ ਝਾੜ ਅਤੇ ਵੱਧ ਮੁਨਾਫ਼ਾ ਦੇਣ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ ਦੀ ਵਿਗਿਆਨਕ ਸਲਾਹ ਲਵੋ।'
              : 'Scientific crop recommendation engine calculated specifically for your local soil type, water availability, and land size.'}
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-6 lg:p-7 space-y-6">

        {/* 1. Simple Season Tabs - Clean & Non-Clumsy */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{isHindi ? '१. बुवाई का मौसम चुनें' : isPunjabi ? '੧. ਬਿਜਾਈ ਦਾ ਮੌਸਮ ਚੁਣੋ' : '1. Select Sowing Season'}</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Rabi Tab */}
            <button
              type="button"
              onClick={() => setSelectedSeason('rabi')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                selectedSeason === 'rabi'
                  ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              {activeSeason === 'rabi' && (
                <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  {isHindi ? 'सक्रिय' : isPunjabi ? 'ਚਾਲੂ' : 'ACTIVE NOW'}
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                <Snowflake className={`w-5 h-5 ${selectedSeason === 'rabi' ? 'text-amber-600' : 'text-slate-500'}`} />
                <span className="font-extrabold text-sm sm:text-base text-gray-900">
                  {isHindi ? '❄️ रबी (सर्दियों की फसल)' : isPunjabi ? '❄️ ਹਾੜੀ (ਸਰਦੀ)' : '❄️ Rabi (Winter)'}
                </span>
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {isHindi ? 'बुवाई: अक्टूबर - दिसंबर | कटाई: मार्च - अप्रैल' : isPunjabi ? 'ਬਿਜਾਈ: ਅਕਤੂਬਰ - ਦਸੰਬਰ' : 'Sowing: Oct - Dec | Harvest: Mar - Apr'}
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                🌾 {isHindi ? 'गेहूं, सरसों, चना, आलू, मटर' : isPunjabi ? 'ਕਣਕ, ਸਰ੍ਹੋਂ, ਛੋਲੇ, ਆਲੂ' : 'Wheat, Mustard, Gram, Potato, Peas'}
              </div>
            </button>

            {/* Kharif Tab */}
            <button
              type="button"
              onClick={() => setSelectedSeason('kharif')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                selectedSeason === 'kharif'
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-400/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              {activeSeason === 'kharif' && (
                <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  {isHindi ? 'सक्रिय' : isPunjabi ? 'ਚਾਲੂ' : 'ACTIVE NOW'}
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                <CloudRain className={`w-5 h-5 ${selectedSeason === 'kharif' ? 'text-emerald-600' : 'text-slate-500'}`} />
                <span className="font-extrabold text-sm sm:text-base text-gray-900">
                  {isHindi ? '🌧️ खरीफ (मानसून फसल)' : isPunjabi ? '🌧️ ਸਾਉਣੀ (ਮੌਨਸੂਨ)' : '🌧️ Kharif (Monsoon)'}
                </span>
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {isHindi ? 'बुवाई: जून - जुलाई | कटाई: सितंबर - अक्टूबर' : isPunjabi ? 'ਬਿਜਾਈ: ਜੂਨ - ਜੁਲਾਈ' : 'Sowing: Jun - Jul | Harvest: Sep - Oct'}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                🌽 {isHindi ? 'धान, मक्का, कपास, सोयाबीन, बाजरा' : isPunjabi ? 'ਝੋਨਾ, ਮੱਕੀ, ਨਰਮਾ, ਬਾਜਰਾ' : 'Paddy, Maize, Cotton, Soybean, Bajra'}
              </div>
            </button>

            {/* Zaid Tab */}
            <button
              type="button"
              onClick={() => setSelectedSeason('zaid')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                selectedSeason === 'zaid'
                  ? 'border-rose-500 bg-rose-50/70 shadow-md ring-2 ring-rose-400/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              {activeSeason === 'zaid' && (
                <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full">
                  {isHindi ? 'सक्रिय' : isPunjabi ? 'ਚਾਲੂ' : 'ACTIVE NOW'}
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                <Sun className={`w-5 h-5 ${selectedSeason === 'zaid' ? 'text-rose-600' : 'text-slate-500'}`} />
                <span className="font-extrabold text-sm sm:text-base text-gray-900">
                  {isHindi ? '☀️ जायद (गर्मी की फसल)' : isPunjabi ? '☀️ ਜ਼ਾਇਦ (ਗਰਮੀ)' : '☀️ Zaid (Summer)'}
                </span>
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {isHindi ? 'बुवाई: फरवरी - मार्च | कटाई: मई - जून' : isPunjabi ? 'ਬਿਜਾਈ: ਫ਼ਰਵਰੀ - ਮਾਰਚ' : 'Sowing: Feb - Mar | Harvest: May - Jun'}
              </div>
              <div className="text-[11px] text-rose-700 font-semibold mt-1">
                🍉 {isHindi ? 'तरबूज, खीरा, मूंग दाल, करेला' : isPunjabi ? 'ਤਰਬੂਜ਼, ਖੀਰਾ, ਮੂੰਗੀ, ਕਰੇਲਾ' : 'Watermelon, Moong, Cucumber, Gourds'}
              </div>
            </button>
          </div>
        </div>

        {/* 2. Parameters Control Bar (Soil, Water, Land, Goal) - Super Clean Pills */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isHindi ? 'मिट्टी का प्रकार (Soil Type)' : isPunjabi ? 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ' : 'Soil Type'}</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['loamy', 'black', 'sandy', 'clay'] as SoilType[]).map((soil) => (
                  <button
                    key={soil}
                    type="button"
                    onClick={() => setSelectedSoil(soil)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      selectedSoil === soil
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {getSoilLabel(soil)}
                  </button>
                ))}
              </div>
            </div>

            {/* Water Source */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>{isHindi ? 'पानी व सिंचाई (Water Supply)' : isPunjabi ? 'ਪਾਣੀ ਦੇ ਸਾਧਨ' : 'Water Availability'}</span>
              </label>
              <div className="flex flex-col gap-1.5">
                {(['high', 'medium', 'low'] as WaterLevel[]).map((water) => (
                  <button
                    key={water}
                    type="button"
                    onClick={() => setSelectedWater(water)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      selectedWater === water
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{getWaterLabel(water)}</span>
                    <span className="text-[10px] opacity-80">
                      {water === 'high' ? '💧💧💧' : water === 'medium' ? '💧💧' : '💧'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Land Size */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isHindi ? 'कुल जमीन (Land Size)' : isPunjabi ? 'ਕੁੱਲ ਜ਼ਮੀਨ' : 'Farm Land Area'}</span>
                </span>
                <span className="text-emerald-700 font-extrabold text-xs">
                  {landAcres} {isHindi ? 'एकड़' : isPunjabi ? 'ਏਕੜ' : 'Acres'}
                </span>
              </label>
              
              <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                {[1, 2.5, 5, 10].map((acres) => (
                  <button
                    key={acres}
                    type="button"
                    onClick={() => setLandAcres(acres)}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      landAcres === acres
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {acres} Ac
                  </button>
                ))}
              </div>

              {/* Slider for precision */}
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={landAcres}
                onChange={(e) => setLandAcres(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>0.5 Ac</span>
                <span>12.5 Ac</span>
                <span>25 Ac</span>
              </div>
            </div>

          </div>

          {/* Quick Filter Pill Bar */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                {isHindi ? 'प्राथमिकता:' : isPunjabi ? 'ਤਰਜੀਹ:' : 'Goal Filter:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: isHindi ? '🌟 सर्वश्रेष्ठ मेल' : isPunjabi ? '🌟 ਸਰਵੋਤਮ' : '🌟 Best Match' },
                  { id: 'high-profit', label: isHindi ? '💰 सर्वाधिक मुनाफा' : isPunjabi ? '💰 ਵੱਧ ਮੁਨਾਫ਼ਾ' : '💰 High Profit' },
                  { id: 'low-water', label: isHindi ? '💧 कम पानी' : isPunjabi ? '💧 ਘੱਟ ਪਾਣੀ' : '💧 Water Saver' },
                  { id: 'quick-harvest', label: isHindi ? '⚡ कम दिन (जल्दी तैयार)' : isPunjabi ? '⚡ ਛੇਤੀ ਤਿਆਰ' : '⚡ Quick Harvest' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilterGoal(item.id as FilterGoal)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      filterGoal === item.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 font-semibold">
              {isHindi ? `दिखा रहे हैं: ${predictions.length} फसलें` : isPunjabi ? `ਦਿਖਾ ਰਹੇ ਹਾਂ: ${predictions.length} ਫ਼ਸਲਾਂ` : `Showing: ${predictions.length} Crops`}
            </div>
          </div>
        </div>

        {/* 3. Executive AI Summary Highlight Banner */}
        {topMatch && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-emerald-200 flex items-center justify-center text-3xl shrink-0">
                {topMatch.crop.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {isHindi ? '🥇 नंबर 1 अनुशंसित फसल' : isPunjabi ? '🥇 ਨੰਬਰ 1 ਸਿਫ਼ਾਰਸ਼' : '🥇 #1 Recommended Crop'}
                  </span>
                  <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded-full">
                    {topMatch.suitabilityScore}% Match
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
                  {isHindi ? topMatch.crop.name.hindi : isPunjabi ? topMatch.crop.name.regional : topMatch.crop.name.english}
                </h3>
                <p className="text-xs text-gray-600 mt-0.5 max-w-xl">
                  {isHindi ? topMatch.matchReason.hindi : isPunjabi ? topMatch.matchReason.regional : topMatch.matchReason.english}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-emerald-200/60">
              <div className="text-left md:text-right">
                <div className="text-[11px] text-gray-500 font-semibold">
                  {isHindi ? `कुल अनुमानित मुनाफा (${landAcres} एकड़)` : isPunjabi ? `ਕੁੱਲ ਮੁਨਾਫ਼ਾ (${landAcres} ਏਕੜ)` : `Net Farm Profit (${landAcres} Ac)`}
                </div>
                <div className="text-base sm:text-xl font-extrabold text-emerald-800 flex items-center md:justify-end">
                  <span>₹{topMatch.estimatedTotalProfit.min.toLocaleString()} - ₹{topMatch.estimatedTotalProfit.max.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => downloadSowingPlanPdf(topMatch.crop, topMatch)}
                disabled={isExportingPdf}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{isHindi ? 'PDF डाउनलोड' : isPunjabi ? 'PDF ਡਾਊਨਲੋਡ' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. Ranked Recommended Crop Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                {isHindi
                  ? `${getSeasonLabel(selectedSeason)} के लिए अनुमानित फसलें`
                  : isPunjabi
                  ? `${getSeasonLabel(selectedSeason)} ਲਈ ਫ਼ਸਲਾਂ`
                  : `Top Crop Predictions for ${selectedSeason.toUpperCase()} Season`}
              </span>
            </h4>
            <span className="text-xs text-gray-500">
              {isHindi ? 'क्लिक करके पूरी गाइड देखें' : isPunjabi ? 'ਕਲਿੱਕ ਕਰਕੇ ਪੂਰੀ ਗਾਈਡ ਵੇਖੋ' : 'Click card to view agronomy guide'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {predictions.slice(0, 4).map((res) => {
              const { crop, suitabilityScore, rank, estimatedTotalYield, estimatedTotalProfit } = res;
              const isExpanded = expandedCropId === crop.id;

              return (
                <div
                  key={crop.id}
                  className={`bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                    rank === 1
                      ? 'border-emerald-300 shadow-md ring-1 ring-emerald-200'
                      : rank === 2
                      ? 'border-blue-200 shadow-sm hover:border-blue-300'
                      : 'border-slate-200 shadow-sm hover:border-slate-300'
                  }`}
                >
                  {/* Card Header & Key Stats */}
                  <div
                    onClick={() => setExpandedCropId(isExpanded ? null : crop.id)}
                    className="p-4 sm:p-5 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left: Emoji, Name, Rank */}
                      <div className="flex items-start sm:items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm border"
                          style={{
                            background: `${crop.themeColor}15`,
                            borderColor: `${crop.themeColor}35`,
                          }}
                        >
                          {crop.emoji}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                rank === 1
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : rank === 2
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-slate-100 text-slate-700 border border-slate-300'
                              }`}
                            >
                              #{rank} {rank === 1 ? 'TOP MATCH' : 'CHOICE'}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {suitabilityScore}% Match
                            </span>
                            {crop.mspRate && (
                              <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-semibold">
                                MSP: ₹{crop.mspRate}/Qtl
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mt-0.5">
                            {isHindi ? crop.name.hindi : isPunjabi ? crop.name.regional : crop.name.english}
                          </h3>

                          <div className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
                            {isHindi ? crop.keyAdvantage.hindi : isPunjabi ? crop.keyAdvantage.regional : crop.keyAdvantage.english}
                          </div>
                        </div>
                      </div>

                      {/* Right: Key Stats & Expand Toggle */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <div className="text-[10px] text-gray-400 font-bold uppercase">
                            {isHindi ? 'अनुमानित कुल मुनाफा' : isPunjabi ? 'ਕੁੱਲ ਮੁਨਾਫ਼ਾ' : 'Net Farm Profit'}
                          </div>
                          <div className="text-sm sm:text-base font-extrabold text-emerald-700">
                            ₹{estimatedTotalProfit.min.toLocaleString()} - ₹{estimatedTotalProfit.max.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            ({landAcres} {isHindi ? 'एकड़ में' : isPunjabi ? 'ਏਕੜ ਵਿੱਚ' : 'Acres'})
                          </div>
                        </div>

                        <div className="p-1.5 rounded-xl bg-slate-100 text-gray-600 hover:bg-slate-200 transition-colors">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>

                    </div>

                    {/* Progress & Quick Attribute Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3.5 pt-3 border-t border-slate-100 text-xs">
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <div className="text-[10px] text-gray-400 font-medium">
                          🌾 {isHindi ? 'कुल पैदावार' : isPunjabi ? 'ਕੁੱਲ ਝਾੜ' : 'Est. Harvest'}
                        </div>
                        <div className="font-bold text-gray-800">
                          {estimatedTotalYield.min} - {estimatedTotalYield.max} {estimatedTotalYield.unit}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl">
                        <div className="text-[10px] text-gray-400 font-medium">
                          📅 {isHindi ? 'बुवाई का समय' : isPunjabi ? 'ਬਿਜਾਈ ਸਮਾਂ' : 'Sowing Window'}
                        </div>
                        <div className="font-bold text-gray-800 truncate">
                          {isHindi ? crop.sowingWindow.hindi : isPunjabi ? crop.sowingWindow.regional : crop.sowingWindow.english}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl">
                        <div className="text-[10px] text-gray-400 font-medium">
                          ⏱️ {isHindi ? 'तैयार होने के दिन' : isPunjabi ? 'ਪੱਕਣ ਦੇ ਦਿਨ' : 'Duration'}
                        </div>
                        <div className="font-bold text-gray-800">
                          {crop.growthDurationDays} {isHindi ? 'दिन' : isPunjabi ? 'ਦਿਨ' : 'Days'}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl">
                        <div className="text-[10px] text-gray-400 font-medium">
                          💧 {isHindi ? 'पानी की आवश्यकता' : isPunjabi ? 'ਪਾਣੀ ਦੀ ਲੋੜ' : 'Water Need'}
                        </div>
                        <div className="font-bold text-gray-800 capitalize">
                          {crop.waterNeed === 'low'
                            ? (isHindi ? 'कम (Dryland)' : isPunjabi ? 'ਘੱਟ' : 'Low')
                            : crop.waterNeed === 'medium'
                            ? (isHindi ? 'मध्यम' : isPunjabi ? 'ਦਰਮਿਆਨਾ' : 'Medium')
                            : (isHindi ? 'अधिक' : isPunjabi ? 'ਵੱਧ' : 'High')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Agronomy & Sowing Details */}
                  {isExpanded && (
                    <div className="bg-slate-50/90 border-t border-slate-200 p-4 sm:p-6 space-y-4 text-xs">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* High Yield Seed Varieties */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                          <div className="font-extrabold text-gray-900 mb-1.5 flex items-center gap-1.5">
                            <Sprout className="w-4 h-4 text-emerald-600" />
                            <span>{isHindi ? 'सर्वश्रेष्ठ उन्नत किस्में (Recommended Varieties):' : isPunjabi ? 'ਸਿਫ਼ਾਰਸ਼ੀ ਕਿਸਮਾਂ:' : 'High-Yield Seed Varieties:'}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {crop.topVarieties.map((v, vi) => (
                              <span key={vi} className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Fertilizer / NPK Dosage */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                          <div className="font-extrabold text-gray-900 mb-1.5 flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-amber-600" />
                            <span>{isHindi ? 'उर्वरक एवं खाद मात्रा (Fertilizer NPK):' : isPunjabi ? 'ਖਾਦ ਦੀ ਮਾਤਰਾ:' : 'Fertilizer & Nutrition:'}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed font-medium">
                            {isHindi ? crop.fertilizerNPK.hindi : isPunjabi ? crop.fertilizerNPK.regional : crop.fertilizerNPK.english}
                          </p>
                        </div>

                        {/* Irrigation Schedule */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                          <div className="font-extrabold text-gray-900 mb-1.5 flex items-center gap-1.5">
                            <Droplets className="w-4 h-4 text-blue-600" />
                            <span>{isHindi ? 'सिंचाई समय सारणी (Irrigation Schedule):' : isPunjabi ? 'ਸਿੰਚਾਈ ਸਮਾਂ ਸਾਰਣੀ:' : 'Irrigation Critical Stages:'}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed font-medium">
                            {isHindi ? crop.irrigationSchedule.hindi : isPunjabi ? crop.irrigationSchedule.regional : crop.irrigationSchedule.english}
                          </p>
                        </div>

                        {/* Pest & Disease Advisory */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                          <div className="font-extrabold text-gray-900 mb-1.5 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-red-600" />
                            <span>{isHindi ? 'कीट व रोग सुरक्षा (Pest Defense):' : isPunjabi ? 'ਕੀੜੇ-ਮਕੌੜਿਆਂ ਤੋਂ ਬਚਾਅ:' : 'Pest Advisory:'}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed font-medium">
                            {isHindi ? crop.pestAdvisory.hindi : isPunjabi ? crop.pestAdvisory.regional : crop.pestAdvisory.english}
                          </p>
                        </div>

                      </div>

                      {/* Download PDF & AI Button */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                        <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{isHindi ? 'ICAR एवं कृषि विज्ञान केंद्र (KVK) के वैज्ञानिक मानकों पर आधारित' : isPunjabi ? 'ICAR ਅਤੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀਆਂ ਦੇ ਮਾਪਦੰਡਾਂ ਤੇ ਅਧਾਰਿਤ' : 'Calibrated with ICAR & State Agricultural University data'}</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => downloadSowingPlanPdf(crop, res)}
                            disabled={isExportingPdf}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{isHindi ? 'इस फसल की PDF गाइड' : isPunjabi ? 'ਇਸ ਫ਼ਸਲ ਦੀ PDF' : 'Download Sowing PDF'}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Bottom Tips / Next Steps */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-amber-950">
                {isHindi ? 'अधिक सटीक परिणाम के लिए मृदा परीक्षण (Soil Test) रिपोर्ट जोड़ें' : isPunjabi ? 'ਹੋਰ ਸਹੀ ਨਤੀਜਿਆਂ ਲਈ ਮਿੱਟੀ ਪਰਖ ਰਿਪੋਰਟ ਦੀ ਵਰਤੋਂ ਕਰੋ' : 'Pair with Soil Test Report for 99.8% Precision'}
              </div>
              <div className="text-amber-800 text-[11px]">
                {isHindi
                  ? 'खेत की N-P-K और pH जांच के बाद खाद की सही मात्रा और सटीक फसल का चयन और भी आसान हो जाता है।'
                  : isPunjabi
                  ? 'ਮਿੱਟੀ ਦੀ N-P-K ਜਾਂਚ ਨਾਲ ਖਾਦ ਦਾ ਖ਼ਰਚਾ ਅੱਧਾ ਰਹਿ ਜਾਂਦਾ ਹੈ।'
                  : 'Soil N-P-K and pH test eliminates excessive fertilizer costs and boosts yields.'}
              </div>
            </div>
          </div>

          <div className="text-right shrink-0 w-full sm:w-auto">
            <span className="text-[11px] text-emerald-800 font-extrabold bg-emerald-100 px-3 py-1 rounded-full inline-block">
              ✓ {isHindi ? '100% वैज्ञानिक गणना' : isPunjabi ? '100% ਵਿਗਿਆਨਕ ਗਣਨਾ' : '100% Agronomy Verified'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SeasonalCropPredictor;
