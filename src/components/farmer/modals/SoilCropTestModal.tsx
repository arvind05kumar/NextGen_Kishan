import React, { useState } from 'react';
import {
  X, TestTube2, MapPin, Calendar, CheckCircle2,
  FileText, Download, Sparkles, AlertCircle, ArrowRight,
  ShieldCheck, HelpCircle, PhoneCall, ChevronRight, Check
} from 'lucide-react';
import SoilReportModal, { sampleSoilReports, SoilReportData } from './SoilReportModal';

interface SoilCropTestModalProps {
  onClose: () => void;
  initialTab?: 'soil' | 'crop' | 'reports';
}

export interface SoilPackage {
  id: string;
  name: string;
  hindiName: string;
  tag: string;
  price: string;
  originalPrice: string;
  turnaround: string;
  isPopular?: boolean;
  paramCount: number;
  testedParameters: string[];
  deliverables: string[];
  bestFor: string;
}

export const soilTestingPackages: SoilPackage[] = [
  {
    id: 'basic-fertility',
    name: 'Basic Soil Fertility Test',
    hindiName: 'बुनियादी उर्वरता जांच',
    tag: 'त्वरित व आवश्यक',
    price: '₹299',
    originalPrice: '₹450',
    turnaround: '24-48 घंटे',
    paramCount: 5,
    testedParameters: [
      'पी.एच मान (Soil pH)',
      'विद्युत चालकता (EC / लवणता)',
      'उपलब्ध नाइट्रोजन (Available N)',
      'उपलब्ध फास्फोरस (Available P)',
      'उपलब्ध पोटाश (Available K)'
    ],
    deliverables: [
      'डिजिटल मृदा स्वास्थ्य सारांश कार्ड',
      'फसल अनुसार NPK खाद (यूरिया/DAP/पोटाश) सही खुराक चार्ट',
      'एसएमएस व व्हाट्सएप पर तुरंत परिणाम सूचना',
      'प्रमाणित लैब तकनीशियन द्वारा जांच'
    ],
    bestFor: 'गेहूं, धान, मक्का व सामान्य खाद्यान्न फसलों की बुवाई पूर्व बुनियादी जांच।'
  },
  {
    id: 'standard-health-card',
    name: 'Standard Complete Soil Health Card',
    hindiName: 'मानक सम्पूर्ण मृदा स्वास्थ्य कार्ड',
    tag: 'सर्वाधिक अनुशंसित (Most Popular)',
    price: '₹549',
    originalPrice: '₹800',
    turnaround: '48-72 घंटे',
    isPopular: true,
    paramCount: 12,
    testedParameters: [
      'सभी 5 बुनियादी तत्व (pH, EC, N, P, K)',
      'जैविक कार्बन (% Organic Carbon)',
      'सल्फर (S - गंधक)',
      'जिंक (Zn - जस्ता)',
      'आयरन (Fe - लोहा)',
      'मैंगनीज (Mn)',
      'कॉपर (Cu - तांबा)',
      'बोरॉन (B)'
    ],
    deliverables: [
      'आधिकारिक NABL मान्यता प्राप्त डिजिटल मृदा स्वास्थ्य कार्ड (PDF डाउनलोड)',
      'फसल अनुसार विस्तृत रासायनिक व जैविक खाद सुधार योजना',
      'Bhoomi AI वॉइस ऑडियो सारांश व WhatsApp डिलीवरी',
      '15 मिनट कृषि विशेषज्ञ (Agronomist) फोन परामर्श',
      'घर बैठे सैंपल पिकअप (Doorstep Sample Pickup)'
    ],
    bestFor: 'सभी फसलों में पीलापन दूर करने, संतुलित पोषण और पैदावार 20% तक बढ़ाने के लिए सर्वश्रेष्ठ।'
  },
  {
    id: 'micronutrient-salinity',
    name: 'Micronutrient & Salinity Reclamation',
    hindiName: 'सूक्ष्म पोषक व लवणीयता सुधार परीक्षण',
    tag: 'खारी व सख्त मिट्टी समाधान',
    price: '₹849',
    originalPrice: '₹1,200',
    turnaround: '3-4 दिन',
    paramCount: 14,
    testedParameters: [
      'सभी 12 मानक पोषक तत्व (N, P, K, pH, EC, OC, S, Zn, Fe, Mn, Cu, B)',
      'कैल्शियम (Ca) व मैग्नीशियम (Mg)',
      'सोडियम अवशोषण अनुपात (SAR / क्षारीयता स्तर)',
      'मिट्टी की बनावट व जल-धारण क्षमता (Texture & Water Holding)'
    ],
    deliverables: [
      'विस्तृत सम्पूर्ण मृदा स्वास्थ्य डोजियर (PDF)',
      'जिप्सम / पाइराइट / जैविक सुधारक सटीक मात्रा कैलकुलेटर',
      'ट्यूबवेल खारे पानी से बचाव व जल अनुकूलता रिपोर्ट',
      'प्राथमिकता व्हाट्सएप व ईमेल डिलीवरी',
      '30 दिनों तक फॉलो-अप कृषि सलाह'
    ],
    bestFor: 'खारे/कठोर पानी से सिंचित खेत, सफेद/काली परत वाली जमीन और जलभराव वाली समस्याग्रस्त मिट्टी।'
  },
  {
    id: 'high-yield-bio',
    name: 'High-Yield Commercial & Biological Soil Test',
    hindiName: 'उच्च पैदावार व जैविक उर्वरता वीआईपी पैकेज',
    tag: 'वीआईपी एडवांस व एक्सपोर्ट',
    price: '₹1,199',
    originalPrice: '₹1,800',
    turnaround: '4-5 दिन',
    paramCount: 16,
    testedParameters: [
      'सम्पूर्ण 14 रासायनिक व भौतिक पोषक तत्व',
      'मृदा सूक्ष्मजीव बायोमास व जैविक गतिविधि (Microbial Biomass)',
      'भारी धातु सुरक्षा जांच (Lead, Cadmium, Arsenic Screening)',
      'धनायन विनिमय क्षमता (CEC / पोषक तत्व धारण क्षमता)'
    ],
    deliverables: [
      'गोल्ड मृदा स्वास्थ्य कार्ड (QR कोड व लैब मुहर सहित)',
      'टार्गेट यील्ड इक्वेशन (लक्ष्य पैदावार 25-30 क्विंटल/एकड़ आधारित पोषण फार्मूला)',
      'वरिष्ठ कृषि वैज्ञानिक (Senior Scientist) के साथ 1-on-1 वीडियो/फोन परामर्श',
      'सम्पूर्ण फसल चक्र का अवस्था-वार (Stage-wise) खाद कैलेंडर',
      'जैविक प्रमाणीकरण (Organic Certification) हेतु आधिकारिक मान्यता'
    ],
    bestFor: 'बागवानी, संरक्षित खेती (Polyhouse), सब्जियां, जैविक खेती व निर्यात ग्रेड फसलों के लिए।'
  }
];

const SoilCropTestModal: React.FC<SoilCropTestModalProps> = ({ onClose, initialTab = 'soil' }) => {
  const [activeTab, setActiveTab] = useState<'soil' | 'crop' | 'reports'>(initialTab);
  const [selectedPackage, setSelectedPackage] = useState<string>('standard-health-card');
  const [selectedLab, setSelectedLab] = useState('lab1');
  const [fieldName, setFieldName] = useState('Field A (उत्तर वाला खेत)');
  const [targetCrop, setTargetCrop] = useState('Wheat (गेहूं)');
  const [collectionAddress, setCollectionAddress] = useState('Village Kothpura, Tehsil Bichhiwara, Dungarpur');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [showHowToCollect, setShowHowToCollect] = useState(false);

  // PDF Report Viewer State
  const [viewingReport, setViewingReport] = useState<SoilReportData | null>(null);

  const labs = [
    {
      id: 'lab1',
      name: 'AgriTech Regional Soil Testing Lab',
      location: 'Sector 21, Dungarpur',
      accreditation: 'NABL-TC-8492',
      rating: 4.9,
      reviews: 142,
      badge: 'NABL Certified'
    },
    {
      id: 'lab2',
      name: 'Soil Science Center Dungarpur',
      location: 'Industrial Area, Dungarpur',
      accreditation: 'Govt. Approved Lab',
      rating: 4.7,
      reviews: 98,
      badge: 'Govt. Recognized'
    },
    {
      id: 'lab3',
      name: 'Rajasthan Krishi Anusandhan Lab',
      location: 'University Campus, Dungarpur',
      accreditation: 'ICAR Network Lab',
      rating: 4.8,
      reviews: 124,
      badge: 'ICAR Network'
    }
  ];

  const currentPkg = soilTestingPackages.find(p => p.id === selectedPackage) || soilTestingPackages[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedLabObj = labs.find(l => l.id === selectedLab);
    const bookingDetails = {
      bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      packageName: currentPkg.name,
      packageHindi: currentPkg.hindiName,
      price: currentPkg.price,
      labName: selectedLabObj?.name || 'AgriTech Regional Soil Testing Lab',
      fieldName,
      targetCrop,
      collectionDate: 'कल सुबह 10:00 - 12:00 बजे (Within 24 Hours)',
      expectedReport: `${currentPkg.turnaround} में डिजिटल PDF रिपोर्ट`
    };

    setBookingSuccess(bookingDetails);
    setSubmitting(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-4xl w-full my-4 sm:my-6 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-900 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <div className="bg-white/15 p-2 rounded-xl backdrop-blur-sm">
                <TestTube2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-bold flex items-center gap-2">
                  <span>मृदा व फसल परीक्षण (Soil & Crop Testing)</span>
                  <span className="hidden sm:inline bg-emerald-400/20 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full border border-emerald-300/30 font-medium">
                    वैज्ञानिक जांच
                  </span>
                </h2>
                <p className="text-xs text-emerald-100 mt-0.5">
                  पैकेज चुनें, जांच करवाएं और NABL प्रमाणित डिजिटल PDF रिपोर्ट पाएं
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-emerald-100 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-emerald-50/70 border-b border-emerald-100 px-3 sm:px-6 pt-3 flex gap-2 overflow-x-auto shrink-0">
            <button
              type="button"
              onClick={() => { setActiveTab('soil'); setBookingSuccess(null); }}
              className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'soil'
                  ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-xl shadow-sm'
                  : 'border-transparent text-gray-600 hover:text-emerald-700'
              }`}
            >
              <TestTube2 className="w-4 h-4" />
              <span>🌱 मृदा जांच पैकेज (Soil Packages)</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('reports'); setBookingSuccess(null); }}
              className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'reports'
                  ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-xl shadow-sm'
                  : 'border-transparent text-gray-600 hover:text-emerald-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>📄 मेरी PDF रिपोर्ट (My Soil Reports)</span>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">2 Ready</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('crop'); setBookingSuccess(null); }}
              className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'crop'
                  ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-xl shadow-sm'
                  : 'border-transparent text-gray-600 hover:text-emerald-700'
              }`}
            >
              <span>🌾 फसल रोग जांच (Crop Test)</span>
            </button>
          </div>

          {/* Tab 1: Soil Packages */}
          {activeTab === 'soil' && !bookingSuccess && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* How to Collect Sample Quick Toggle */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 sm:p-3.5 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>नमूना कैसे लें?</strong> खेत की 5 जगहों से 6-8 इंच V-शेप मिट्टी लें। लैब प्रतिनिधि घर से सैंपल ले जाएगा।
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHowToCollect(!showHowToCollect)}
                  className="text-amber-800 font-bold hover:underline shrink-0 ml-2"
                >
                  {showHowToCollect ? 'छिपाएं' : 'पूरी विधि देखें →'}
                </button>
              </div>

              {showHowToCollect && (
                <div className="bg-white border border-amber-200 rounded-xl p-4 text-xs space-y-2 text-gray-700 animate-fadeIn">
                  <div className="font-bold text-amber-900 text-sm mb-1">
                    🌾 सही मिट्टी का नमूना लेने की 5-चरण विधि:
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                    <li>खेत के चारों कोनों और बीच से 5 अलग-अलग बिंदुओं का चयन करें (खेत के किनारे से कम से कम 10 फीट अंदर)।</li>
                    <li>सतह से घास-फूस साफ करें। खुरपी से 6 से 8 इंच गहरा अंग्रेजी के <strong>'V'</strong> आकार का गड्ढा बनाएं।</li>
                    <li>गड्ढे की एक तरफ से ऊपर से नीचे तक 1 इंच मोटी मिट्टी की परत खुरचें।</li>
                    <li>पाँचों जगहों की मिट्टी को साफ प्लास्टिक शीट पर मिलाकर गोल ढेर बनाएं और 4 हिस्सों में बांटकर आधा किलो शुद्ध नमूना तैयार करें।</li>
                    <li>थैली में अपना नाम व खेत का खसरा नंबर लिखकर रखें। लैब तकनीशियन आकर इसे ले जाएगा।</li>
                  </ol>
                </div>
              )}

              {/* Package Selection Section */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
                      मृदा परीक्षण के प्रकार (Select Soil Testing Package)
                    </h3>
                    <p className="text-xs text-gray-500">
                      हर पैकेज में क्या जांचा जाएगा और किसान को क्या मिलेगा, नीचे विस्तार से देखें
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {soilTestingPackages.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/40 shadow-md ring-2 ring-emerald-500/20'
                            : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Top Badges */}
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                pkg.isPopular
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              {pkg.tag}
                            </span>
                            <div className="text-right">
                              <span className="text-base sm:text-lg font-black text-emerald-700">{pkg.price}</span>
                              <span className="text-xs text-gray-400 line-through ml-1">{pkg.originalPrice}</span>
                            </div>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                            {pkg.hindiName}
                          </h4>
                          <p className="text-[11px] text-gray-500 mb-3">{pkg.name} • ⏱ {pkg.turnaround}</p>

                          {/* Parameters Tested */}
                          <div className="mb-3">
                            <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                              <span>🧪 क्या जांच होगी ({pkg.paramCount} पैरामीटर):</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {pkg.testedParameters.map((p, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-medium"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables: What farmer gets */}
                          <div className="bg-white/80 border border-emerald-100 rounded-xl p-2.5 mb-3">
                            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>किसान को क्या मिलेगा (Deliverables):</span>
                            </div>
                            <ul className="space-y-1 text-xs text-gray-700">
                              {pkg.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="text-[11px] text-gray-500 mb-3">
                            <strong>सर्वोत्तम उपयोग:</strong> {pkg.bestFor}
                          </div>
                        </div>

                        {/* Select Button */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> NABL Accredited Report
                          </span>
                          <button
                            type="button"
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800'
                            }`}
                          >
                            {isSelected ? '✓ चयनित (Selected)' : 'यह पैकेज चुनें'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking Form Details */}
              <form onSubmit={handleSubmit} className="space-y-5 bg-slate-50/70 border border-slate-200 rounded-2xl p-4 sm:p-5">
                <div className="border-b border-slate-200 pb-3">
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">
                    खेत व प्रयोगशाला विवरण (Farm & Lab Details)
                  </h4>
                  <p className="text-xs text-gray-500">
                    चयनित पैकेज: <strong className="text-emerald-700">{currentPkg.hindiName} ({currentPkg.price})</strong>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {/* Field Name */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      खेत का नाम / खसरा संख्या (Field / Survey No.)
                    </label>
                    <input
                      type="text"
                      value={fieldName}
                      onChange={(e) => setFieldName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
                      placeholder="e.g. Field A (North Plot) या Khasra 142/3"
                      required
                    />
                  </div>

                  {/* Target Crop */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      बोई जाने वाली फसल (Planned Crop for Advisory)
                    </label>
                    <input
                      type="text"
                      value={targetCrop}
                      onChange={(e) => setTargetCrop(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
                      placeholder="e.g. गेहूं, सरसों, चना, टमाटर"
                      required
                    />
                  </div>
                </div>

                {/* Laboratory Selection */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-xs sm:text-sm">
                    प्रयोगशाला चुनें (Select Certified Laboratory)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {labs.map((lab) => (
                      <label key={lab.id} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="lab"
                          value={lab.id}
                          checked={selectedLab === lab.id}
                          onChange={(e) => setSelectedLab(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`p-3 rounded-xl border-2 transition-all h-full flex flex-col justify-between ${
                            selectedLab === lab.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-start gap-1 mb-1">
                              <span className="font-bold text-gray-900 text-xs truncate">{lab.name}</span>
                            </div>
                            <div className="text-[11px] text-gray-500 flex items-center gap-1 mb-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span>{lab.location}</span>
                            </div>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                              {lab.badge}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100 text-[11px]">
                            <span className="text-yellow-600 font-bold">★ {lab.rating} ({lab.reviews})</span>
                            <span className="text-emerald-700 font-bold">{currentPkg.price}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1 text-xs sm:text-sm">
                    सैंपल पिकअप पता (Sample Collection Address)
                  </label>
                  <input
                    type="text"
                    value={collectionAddress}
                    onChange={(e) => setCollectionAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white text-xs sm:text-sm"
                    placeholder="गांव, पोस्ट, तहसील, जिला"
                    required
                  />
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1 text-xs sm:text-sm">
                    विशेष समस्या अथवा टिप्पणी (Optional Notes)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white text-xs sm:text-sm"
                    placeholder="जैसे: पिछली फसल में पत्तियां पीली पड़ रही थीं, या मिट्टी में सफेद परत दिखती है..."
                  />
                </div>

                {/* Sample Pickup Guarantee Box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 text-xs text-emerald-900">
                  <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">24 घंटे में घर से सैंपल पिकअप:</span> लैब का प्रमाणित प्रतिनिधि आपके पते से मिट्टी का नमूना लेकर रसीद देगा। जांच पूर्ण होने पर डिजिटल PDF रिपोर्ट व स्वास्थ्य कार्ड तुरंत उपलब्ध होगा।
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium text-xs sm:text-sm"
                  >
                    रद्द करें (Cancel)
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>अनुरोध दर्ज हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <span>जांच बुक करें ({currentPkg.price})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Booking Confirmation View */}
          {bookingSuccess && (
            <div className="p-6 text-center space-y-4 max-w-lg mx-auto my-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900">
                मृदा परीक्षण अनुरोध सफलतापूर्वक दर्ज!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                आपकी बुकिंग ID <span className="font-mono font-bold text-emerald-700">{bookingSuccess.bookingId}</span> है। लैब प्रतिनिधि जल्द संपर्क करेगा।
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">चयनित पैकेज:</span>
                  <span className="font-bold text-gray-900">{bookingSuccess.packageHindi} ({bookingSuccess.price})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">प्रयोगशाला:</span>
                  <span className="font-semibold text-gray-900">{bookingSuccess.labName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">खेत / लक्ष्य फसल:</span>
                  <span className="font-semibold text-gray-900">{bookingSuccess.fieldName} • {bookingSuccess.targetCrop}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">नमूना पिकअप:</span>
                  <span className="font-bold text-emerald-700">{bookingSuccess.collectionDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">डिजिटल रिपोर्ट:</span>
                  <span className="font-bold text-emerald-700">{bookingSuccess.expectedReport}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('reports');
                    setBookingSuccess(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow transition-all"
                >
                  मेरी पिछली PDF रिपोर्ट देखें →
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                >
                  डैशबोर्ड पर वापस जाएं
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: My PDF Reports (Dedicated place for all Soil Testing Reports) */}
          {activeTab === 'reports' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span>मृदा परीक्षण PDF रिपोर्ट्स (Soil Health Reports)</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    आपकी सभी पूर्ण हो चुकी जांचों की डिजिटल रिपोर्ट व मृदा स्वास्थ्य कार्ड यहां सुरक्षित हैं
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('soil')}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>+ नया टेस्ट बुक करें</span>
                </button>
              </div>

              <div className="space-y-4">
                {sampleSoilReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {report.cropPlanned}
                        </span>
                        <span className="text-xs text-gray-500 font-mono font-semibold">
                          ID: {report.sampleNo}
                        </span>
                        <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                          ✓ रिपोर्ट तैयार (Available)
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-gray-900">
                        {report.khasraNo} • {report.soilType}
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-600 pt-1">
                        <div>
                          <span className="text-gray-400 block text-[10px]">जांच तिथि:</span>
                          <span className="font-semibold text-gray-800">{report.testingDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">प्रयोगशाला:</span>
                          <span className="font-semibold text-gray-800 truncate block">{report.labName}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">स्वास्थ्य स्कोर:</span>
                          <span className="font-bold text-emerald-700">{report.overallScore}/100 ({report.overallHealth})</span>
                        </div>
                      </div>

                      {/* Nutrient Summary Pill */}
                      <div className="flex items-center gap-3 pt-2 text-xs">
                        <span className="text-[11px] text-gray-500">मुख्य स्थिति:</span>
                        <span className="text-[11px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md font-semibold">
                          नाइट्रोजन व जिंक: न्यून
                        </span>
                        <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                          pH & पोटाश: उत्तम
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => setViewingReport(report)}
                        className="flex-1 md:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>स्वास्थ्य कार्ड देखें</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewingReport(report)}
                        className="flex-1 md:flex-initial px-4 py-2 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>PDF डाउनलोड करें</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* In Progress Sample Card */}
                <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        Gram (चना)
                      </span>
                      <span className="text-xs text-amber-600 font-semibold">
                        ⏳ परीक्षण प्रगति पर है (Under Testing)
                      </span>
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm">
                      Khasra No. 145/2 (Field C - Well Plot)
                    </div>
                    <p className="text-xs text-gray-500">
                      नमूना एकत्र: 15 Jan 2025 • अनुमानित रिपोर्ट: 17 Jan 2025 (शाम 5:00 बजे)
                    </p>
                  </div>
                  <span className="text-xs bg-slate-100 text-gray-600 px-3 py-1.5 rounded-xl font-medium">
                    रिजल्ट प्रतीक्षित
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Crop Disease Test */}
          {activeTab === 'crop' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 leading-relaxed">
                🌾 <strong>फसल रोग प्रयोगशाला परीक्षण:</strong> यदि फसल की पत्तियों में फंगल, वायरस अथवा कीट का प्रकोप है और सामान्य दवा से ठीक नहीं हो रहा है, तो विशेषज्ञ पैथोलॉजी लैब से पत्ती व तने का वैज्ञानिक परीक्षण करवाएं।
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">प्रभावित फसल का नाम</label>
                  <input
                    type="text"
                    defaultValue="गेहूं (Wheat) - HD 3086"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">रोग के लक्षण (Symptoms)</label>
                  <textarea
                    rows={3}
                    placeholder="जैसे पत्तियों पर पीले भूरे धब्बे, तना सूखना, झुलसा रोग..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">प्रयोगशाला चुनें</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                    <option>AgriTech Crop Pathology Lab (₹500 / सैंपल)</option>
                    <option>Dungarpur Krishi University Plant Lab (₹600 / सैंपल)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert('फसल रोग जांच अनुरोध दर्ज कर लिया गया है। लैब विशेषज्ञ 24 घंटे में संपर्क करेंगे।');
                    onClose();
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  फसल रोग जांच बुक करें
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Soil Health Card Full PDF Report Modal */}
      {viewingReport && (
        <SoilReportModal
          report={viewingReport}
          onClose={() => setViewingReport(null)}
        />
      )}
    </>
  );
};

export default SoilCropTestModal;