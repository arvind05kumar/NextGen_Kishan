import React, { useState } from 'react';
import {
  X, TestTube2, MapPin, Calendar, CheckCircle2,
  FileText, Download, Sparkles, ArrowRight,
  ShieldCheck, Check
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import SoilReportModal, { sampleSoilReports, SoilReportData } from './SoilReportModal';

interface SoilCropTestModalProps {
  onClose: () => void;
  initialTab?: 'soil' | 'crop' | 'reports';
}

export interface LocalizedPackage {
  id: string;
  price: string;
  originalPrice: string;
  isPopular?: boolean;
  paramCount: number;
  name: { english: string; hindi: string; regional: string };
  tag: { english: string; hindi: string; regional: string };
  turnaround: { english: string; hindi: string; regional: string };
  testedParameters: {
    english: string[];
    hindi: string[];
    regional: string[];
  };
  deliverables: {
    english: string[];
    hindi: string[];
    regional: string[];
  };
  bestFor: { english: string; hindi: string; regional: string };
}

export const soilTestingPackages: LocalizedPackage[] = [
  {
    id: 'basic-fertility',
    price: '₹299',
    originalPrice: '₹450',
    paramCount: 5,
    name: {
      english: 'Basic Soil Fertility Test',
      hindi: 'बुनियादी उर्वरता परीक्षण',
      regional: 'ਮੁੱਢਲੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਪਰਖ'
    },
    tag: {
      english: 'Quick & Essential',
      hindi: 'त्वरित व आवश्यक',
      regional: 'ਜ਼ਰੂਰੀ ਤੇ ਤੇਜ਼'
    },
    turnaround: {
      english: '24-48 Hours',
      hindi: '24-48 घंटे',
      regional: '24-48 ਘੰਟੇ'
    },
    testedParameters: {
      english: [
        'Soil pH (Reaction)',
        'Electrical Conductivity (EC / Salinity)',
        'Available Nitrogen (N)',
        'Available Phosphorus (P)',
        'Available Potassium (K)'
      ],
      hindi: [
        'पी.एच मान (Soil pH)',
        'विद्युत चालकता (EC / लवणता)',
        'उपलब्ध नाइट्रोजन (Available N)',
        'उपलब्ध फास्फोरस (Available P)',
        'उपलब्ध पोटाश (Available K)'
      ],
      regional: [
        'ਮਿੱਟੀ pH ਮਾਨ',
        'ਬਿਜਲਈ ਚਾਲਕਤਾ (EC / ਲੂਣਪੁਣਾ)',
        'ਉਪਲਬਧ ਨਾਈਟ੍ਰੋਜਨ (N)',
        'ਉਪਲਬਧ ਫ਼ਾਸਫ਼ੋਰਸ (P)',
        'ਉਪਲਬਧ ਪੋਟਾਸ਼ (K)'
      ]
    },
    deliverables: {
      english: [
        'Digital Soil Health Summary Card',
        'Crop-wise NPK fertilizer dosage chart (Urea, DAP, MOP)',
        'Instant SMS & WhatsApp result notification',
        'Certified lab chemist verification'
      ],
      hindi: [
        'डिजिटल मृदा स्वास्थ्य सारांश कार्ड',
        'फसल अनुसार NPK खाद (यूरिया/DAP/पोटाश) सही खुराक चार्ट',
        'एसएमएस व व्हाट्सएप पर तुरंत परिणाम सूचना',
        'प्रमाणित लैब तकनीशियन द्वारा जांच'
      ],
      regional: [
        'ਡਿਜੀਟਲ ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ',
        'ਫ਼ਸਲ ਅਨੁਸਾਰ NPK ਖਾਦ (ਯੂਰੀਆ/DAP/ਪੋਟਾਸ਼) ਖੁਰਾਕ ਚਾਰਟ',
        'SMS ਤੇ WhatsApp ਨੋਟੀਫਿਕੇਸ਼ਨ',
        'ਪ੍ਰਮਾਣਿਤ ਲੈਬ ਕੈਮਿਸਟ ਵੱਲੋਂ ਤਸਦੀਕ'
      ]
    },
    bestFor: {
      english: 'Pre-sowing routine health check for Wheat, Rice, Mustard & Maize.',
      hindi: 'गेहूं, धान, मक्का व सामान्य खाद्यान्न फसलों की बुवाई पूर्व बुनियादी जांच।',
      regional: 'ਕਣਕ, ਝੋਨਾ, ਮੱਕੀ ਦੀ ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮੁੱਢਲੀ ਪਰਖ।'
    }
  },
  {
    id: 'standard-health-card',
    price: '₹549',
    originalPrice: '₹800',
    isPopular: true,
    paramCount: 12,
    name: {
      english: 'Standard Complete Soil Health Card',
      hindi: 'मानक सम्पूर्ण मृदा स्वास्थ्य कार्ड',
      regional: 'ਮਿਆਰੀ ਸੰਪੂਰਨ ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ'
    },
    tag: {
      english: '⭐ Most Popular / Recommended',
      hindi: '⭐ सर्वाधिक अनुशंसित (Most Popular)',
      regional: '⭐ ਸਭ ਤੋਂ ਵੱਧ ਪ੍ਰਸਿੱਧ (Most Popular)'
    },
    turnaround: {
      english: '48-72 Hours',
      hindi: '48-72 घंटे',
      regional: '48-72 ਘੰਟੇ'
    },
    testedParameters: {
      english: [
        'All 5 Primary Params (pH, EC, N, P, K)',
        'Organic Carbon (% OC)',
        'Sulphur (S)',
        'Zinc (Zn)',
        'Iron (Fe)',
        'Manganese (Mn)',
        'Copper (Cu)',
        'Boron (B)'
      ],
      hindi: [
        'सभी 5 बुनियादी तत्व (pH, EC, N, P, K)',
        'जैविक कार्बन (% Organic Carbon)',
        'सल्फर (S - गंधक)',
        'जिंक (Zn - जस्ता)',
        'आयरन (Fe - लोहा)',
        'मैंगनीज (Mn)',
        'कॉपर (Cu - तांबा)',
        'बोरॉन (B)'
      ],
      regional: [
        'ਸਾਰੇ 5 ਮੁੱਢਲੇ ਤੱਤ (pH, EC, N, P, K)',
        'ਜੈਵਿਕ ਕਾਰਬਨ (% OC)',
        'ਸਲਫ਼ਰ (S - ਗੰਧਕ)',
        'ਜਿੰਕ (Zn)',
        'ਆਇਰਨ (Fe - ਲੋਹਾ)',
        'ਮੈਂਗਨੀਜ਼ (Mn)',
        'ਕਾਪਰ (Cu)',
        'ਬੋਰਾਨ (B)'
      ]
    },
    deliverables: {
      english: [
        'Official NABL Certified Digital Soil Health Card (PDF Download)',
        'Custom chemical & organic nutrient plan for planned crop',
        'Bhoomi AI voice advisory & WhatsApp report delivery',
        '15-min Agricultural Scientist tele-consultation call',
        'Doorstep sample pickup by certified technician'
      ],
      hindi: [
        'आधिकारिक NABL मान्यता प्राप्त डिजिटल मृदा स्वास्थ्य कार्ड (PDF डाउनलोड)',
        'फसल अनुसार विस्तृत रासायनिक व जैविक खाद सुधार योजना',
        'Bhoomi AI वॉइस ऑडियो सारांश व WhatsApp डिलीवरी',
        '15 मिनट कृषि विशेषज्ञ (Agronomist) फोन परामर्श',
        'घर बैठे सैंपल पिकअप (Doorstep Sample Pickup)'
      ],
      regional: [
        'ਅਧਿਕਾਰਤ NABL ਪ੍ਰਮਾਣਿਤ ਡਿਜੀਟਲ ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ (PDF ਡਾਊਨਲੋਡ)',
        'ਫ਼ਸਲ ਅਨੁਸਾਰ ਰਸਾਇਣਕ ਤੇ ਜੈਵਿਕ ਖਾਦ ਸੁਧਾਰ ਯੋਜਨਾ',
        'Bhoomi AI ਆਡੀਓ ਸੰਖੇਪ ਤੇ WhatsApp ਡਿਲੀਵਰੀ',
        '15 ਮਿੰਟ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਨਾਲ ਫ਼ੋਨ ਸਲਾਹ',
        'ਘਰ ਬੈਠੇ ਸੈਂਪਲ ਪਿਕਅੱਪ ਸਹੂਲਤ'
      ]
    },
    bestFor: {
      english: 'Maximizing crop yield by up to 20%, fixing leaf yellowing, and balanced nutrition.',
      hindi: 'सभी फसलों में पीलापन दूर करने, संतुलित पोषण और पैदावार 20% तक बढ़ाने के लिए सर्वश्रेष्ठ।',
      regional: 'ਪੀਲਾਪਣ ਦੂਰ ਕਰਨ, ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਅਤੇ ਝਾੜ 20% ਤੱਕ ਵਧਾਉਣ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ।'
    }
  },
  {
    id: 'micronutrient-salinity',
    price: '₹849',
    originalPrice: '₹1,200',
    paramCount: 14,
    name: {
      english: 'Micronutrient & Salinity Reclamation',
      hindi: 'सूक्ष्म पोषक व लवणीयता सुधार परीक्षण',
      regional: 'ਸੂਖਮ ਪੋਸ਼ਕ ਤੱਤ ਅਤੇ ਖਾਰਾਪਨ ਸੁਧਾਰ ਪਰਖ'
    },
    tag: {
      english: 'Saline & Hard Soil Solution',
      hindi: 'खारी व सख्त मिट्टी समाधान',
      regional: 'ਖਾਰੀ ਤੇ ਸਖ਼ਤ ਮਿੱਟੀ ਹੱਲ'
    },
    turnaround: {
      english: '3-4 Days',
      hindi: '3-4 दिन',
      regional: '3-4 ਦਿਨ'
    },
    testedParameters: {
      english: [
        'All 12 Standard Params (N, P, K, pH, EC, OC, S, Zn, Fe, Mn, Cu, B)',
        'Calcium (Ca) & Magnesium (Mg)',
        'Sodium Absorption Ratio (SAR / Alkalinity)',
        'Soil Texture & Water Retention Capacity'
      ],
      hindi: [
        'सभी 12 मानक पोषक तत्व (N, P, K, pH, EC, OC, S, Zn, Fe, Mn, Cu, B)',
        'कैल्शियम (Ca) व मैग्नीशियम (Mg)',
        'सोडियम अवशोषण अनुपात (SAR / क्षारीयता स्तर)',
        'मिट्टी की बनावट व जल-धारण क्षमता (Texture & Water Holding)'
      ],
      regional: [
        'ਸਾਰੇ 12 ਮਿਆਰੀ ਤੱਤ (N, P, K, pH, EC, OC, S, Zn, Fe, Mn, Cu, B)',
        'ਕੈਲਸ਼ੀਅਮ (Ca) ਤੇ ਮੈਗਨੀਸ਼ੀਅਮ (Mg)',
        'ਖਾਰਾਪਨ ਦਰ (SAR)',
        'ਮਿੱਟੀ ਦੀ ਬਣਤਰ ਤੇ ਪਾਣੀ ਸੰਭਾਲ ਸਮਰੱਥਾ'
      ]
    },
    deliverables: {
      english: [
        'Comprehensive Soil Health Dossier (PDF)',
        'Gypsum / Pyrite & Organic Reclamation Calculator',
        'Tube-well saline water compatibility report',
        'Priority WhatsApp & Email delivery',
        '30-day follow-up agronomist advice'
      ],
      hindi: [
        'विस्तृत सम्पूर्ण मृदा स्वास्थ्य डोजियर (PDF)',
        'जिप्सम / पाइराइट / जैविक सुधारक सटीक मात्रा कैलकुलेटर',
        'ट्यूबवेल खारे पानी से बचाव व जल अनुकूलता रिपोर्ट',
        'प्राथमिकता व्हाट्सएप व ईमेल डिलीवरी',
        '30 दिनों तक फॉलो-अप कृषि सलाह'
      ],
      regional: [
        'ਸੰਪੂਰਨ ਮਿੱਟੀ ਸਿਹਤ ਡੋਜ਼ੀਅਰ (PDF)',
        'ਜਿਪਸਮ / ਪਾਈਰਾਈਟ ਸੁਧਾਰਕ ਖੁਰਾਕ ਕੈਲਕੁਲੇਟਰ',
        'ਟਿਊਬਵੈੱਲ ਖਾਰੇ ਪਾਣੀ ਬਚਾਅ ਰਿਪੋਰਟ',
        'ਤਰਜੀਹੀ WhatsApp ਡਿਲੀਵਰੀ',
        '30 ਦਿਨਾਂ ਤੱਕ ਫ਼ਾਲੋ-ਅੱਪ ਖੇਤੀ ਸਲਾਹ'
      ]
    },
    bestFor: {
      english: 'Problem soils irrigated with saline tube-well water, hard soil crust, and poor absorption.',
      hindi: 'खारे/कठोर पानी से सिंचित खेत, सफेद/काली परत वाली जमीन और जलभराव वाली समस्याग्रस्त मिट्टी।`',
      regional: 'ਖਾਰੇ ਪਾਣੀ ਵਾਲੇ ਖੇਤ, ਸਖ਼ਤ ਜ਼ਮੀਨ ਅਤੇ ਪਾਣੀ ਖੜ੍ਹਨ ਵਾਲੀ ਮਿੱਟੀ ਲਈ।'
    }
  },
  {
    id: 'high-yield-bio',
    price: '₹1,199',
    originalPrice: '₹1,800',
    paramCount: 16,
    name: {
      english: 'High-Yield Commercial & Biological Soil Test',
      hindi: 'उच्च पैदावार व जैविक उर्वरता वीआईपी पैकेज',
      regional: 'ਵੱਧ ਝਾੜ ਅਤੇ ਜੈਵਿਕ ਉਪਜਾਊ ਸ਼ਕਤੀ VIP ਪੈਕੇਜ'
    },
    tag: {
      english: 'VIP Advanced & Export',
      hindi: 'वीआईपी एडवांस व एक्सपोर्ट',
      regional: 'VIP ਐਡਵਾਂਸ ਤੇ ਐਕਸਪੋਰਟ'
    },
    turnaround: {
      english: '4-5 Days',
      hindi: '4-5 दिन',
      regional: '4-5 ਦਿਨ'
    },
    testedParameters: {
      english: [
        'Complete 14 Chemical & Physical Nutrients',
        'Soil Microbial Biomass & Biological Activity',
        'Heavy Metal Safety Screening (Lead, Cadmium, Arsenic)',
        'Cation Exchange Capacity (CEC)'
      ],
      hindi: [
        'सम्पूर्ण 14 रासायनिक व भौतिक पोषक तत्व',
        'मृदा सूक्ष्मजीव बायोमास व जैविक गतिविधि (Microbial Biomass)',
        'भारी धातु सुरक्षा जांच (Lead, Cadmium, Arsenic Screening)',
        'धनायन विनिमय क्षमता (CEC / पोषक तत्व धारण क्षमता)'
      ],
      regional: [
        'ਸੰਪੂਰਨ 14 ਰਸਾਇਣਕ ਤੇ ਭੌਤਿਕ ਤੱਤ',
        'ਮਿੱਟੀ ਜੈਵਿਕ ਗਤੀਵਿਧੀ (Microbial Biomass)',
        'ਜ਼ਹਿਰੀਲੀਆਂ ਧਾਤਾਂ ਦੀ ਜਾਂਚ (Lead, Cadmium, Arsenic)',
        'ਪੋਸ਼ਕ ਤੱਤ ਸੰਭਾਲ ਸਮਰੱਥਾ (CEC)'
      ]
    },
    deliverables: {
      english: [
        'Gold Soil Health Card with QR Code verification & lab seal',
        'Target Yield Precision Formula (Formula for 25-30 quintals/acre goal)',
        '1-on-1 video/phone consultation with Senior Agricultural Scientist',
        'Full season stage-wise nutrient & biostimulant calendar',
        'Certified report recognized for Organic Export certification'
      ],
      hindi: [
        'गोल्ड मृदा स्वास्थ्य कार्ड (QR कोड व लैब मुहर सहित)',
        'टार्गेट यील्ड इक्वेशन (लक्ष्य पैदावार 25-30 क्विंटल/एकड़ आधारित पोषण फार्मूला)',
        'वरिष्ठ कृषि वैज्ञानिक (Senior Scientist) के साथ 1-on-1 वीडियो/फोन परामर्श',
        'सम्पूर्ण फसल चक्र का अवस्था-वार (Stage-wise) खाद कैलेंडर',
        'जैविक प्रमाणीकरण (Organic Certification) हेतु आधिकारिक मान्यता'
      ],
      regional: [
        'ਗੋਲਡ ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ (QR ਕੋਡ ਤੇ ਲੈਬ ਮੋਹਰ ਸਮੇਤ)',
        'ਟਾਰਗੇਟ ਯੀਲਡ ਫ਼ਾਰਮੂਲਾ (25-30 ਕੁਇੰਟਲ/ਏਕੜ ਟੀਚੇ ਅਨੁਸਾਰ)',
        'ਸੀਨੀਅਰ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਨਾਲ 1-on-1 ਵੀਡੀਓ/ਫ਼ੋਨ ਸਲਾਹ',
        'ਸਾਰੇ ਸੀਜ਼ਨ ਦਾ ਪੜਾਅ-ਵਾਰ ਖਾਦ ਕੈਲੰਡਰ',
        'ਜੈਵਿਕ ਸਰਟੀਫਿਕੇਸ਼ਨ ਲਈ ਪ੍ਰਮਾਣਿਤ ਰਿਪੋਰਟ'
      ]
    },
    bestFor: {
      english: 'Horticulture, polyhouse crops, high-value vegetables, organic farming and export crops.',
      hindi: 'बागवानी, संरक्षित खेती (Polyhouse), सब्जियां, जैविक खेती व निर्यात ग्रेड फसलों के लिए।',
      regional: 'ਬਾਗ਼ਬਾਨੀ, ਪੌਲੀਹਾਊਸ, ਸਬਜ਼ੀਆਂ, ਜੈਵਿਕ ਖੇਤੀ ਅਤੇ ਐਕਸਪੋਰਟ ਕੁਆਲਿਟੀ ਫ਼ਸਲਾਂ ਲਈ।'
    }
  }
];

const SoilCropTestModal: React.FC<SoilCropTestModalProps> = ({ onClose, initialTab = 'soil' }) => {
  const { language } = useAuth();
  const [activeTab, setActiveTab] = useState<'soil' | 'crop' | 'reports'>(initialTab);
  const [selectedPackage, setSelectedPackage] = useState<string>('standard-health-card');
  const [selectedLab, setSelectedLab] = useState('lab1');
  const [fieldName, setFieldName] = useState('Field A (North Plot)');
  const [targetCrop, setTargetCrop] = useState('Wheat (HD 2967)');
  const [collectionAddress, setCollectionAddress] = useState('Village Kothpura, Tehsil Bichhiwara, Dungarpur');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [showHowToCollect, setShowHowToCollect] = useState(false);

  // PDF Report Viewer State
  const [viewingReport, setViewingReport] = useState<SoilReportData | null>(null);

  const isHindi = language === 'hindi';
  const isPunjabi = language === 'regional';
  const langKey = isHindi ? 'hindi' : isPunjabi ? 'regional' : 'english';

  const labs = [
    {
      id: 'lab1',
      name: isHindi ? 'एग्रीटेक क्षेत्रीय मृदा परीक्षण प्रयोगशाला' : isPunjabi ? 'ਐਗਰੀਟੈੱਕ ਖੇਤਰੀ ਮਿੱਟੀ ਪਰਖ ਲੈਬ' : 'AgriTech Regional Soil Testing Lab',
      location: 'Sector 21, Dungarpur',
      accreditation: 'NABL-TC-8492',
      rating: 4.9,
      reviews: 142,
      badge: 'NABL Certified'
    },
    {
      id: 'lab2',
      name: isHindi ? 'डूंगरपुर सॉइल साइंस सेंटर' : isPunjabi ? 'ਡੂੰਗਰਪੁਰ ਸਾਇਲ ਸਾਇੰਸ ਸੈਂਟਰ' : 'Soil Science Center Dungarpur',
      location: 'Industrial Area, Dungarpur',
      accreditation: 'Govt. Approved Lab',
      rating: 4.7,
      reviews: 98,
      badge: 'Govt. Recognized'
    },
    {
      id: 'lab3',
      name: isHindi ? 'राजस्थान कृषि अनुसंधान लैब' : isPunjabi ? 'ਰਾਜਸਥਾਨ ਖੇਤੀਬਾੜੀ ਖੋਜ ਲੈਬ' : 'Rajasthan Krishi Anusandhan Lab',
      location: 'University Campus, Dungarpur',
      accreditation: 'ICAR Network Lab',
      rating: 4.8,
      reviews: 124,
      badge: 'ICAR Network'
    }
  ];

  const currentPkg = soilTestingPackages.find(p => p.id === selectedPackage) || soilTestingPackages[1];
  const currentPkgName = currentPkg.name[langKey] || currentPkg.name.english;
  const currentPkgTurnaround = currentPkg.turnaround[langKey] || currentPkg.turnaround.english;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedLabObj = labs.find(l => l.id === selectedLab);
    const bookingDetails = {
      bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      packageName: currentPkgName,
      price: currentPkg.price,
      labName: selectedLabObj?.name || 'AgriTech Regional Soil Testing Lab',
      fieldName,
      targetCrop,
      collectionDate: isHindi
        ? 'कल सुबह 10:00 - 12:00 बजे (Within 24 Hours)'
        : isPunjabi
        ? 'ਕੱਲ੍ਹ ਸਵੇਰੇ 10:00 - 12:00 ਵਜੇ (Within 24 Hours)'
        : 'Tomorrow 10:00 AM - 12:00 PM (Within 24 Hours)',
      expectedReport: isHindi
        ? `${currentPkgTurnaround} में डिजिटल PDF रिपोर्ट`
        : isPunjabi
        ? `${currentPkgTurnaround} ਵਿੱਚ ਡਿਜੀਟਲ PDF ਰਿਪੋਰਟ`
        : `Digital PDF report in ${currentPkgTurnaround}`
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
                  <span>
                    {isHindi ? 'मृदा व फसल परीक्षण' : isPunjabi ? 'ਮਿੱਟੀ ਤੇ ਫ਼ਸਲ ਪਰਖ' : 'Soil & Crop Testing'}
                  </span>
                  <span className="hidden sm:inline bg-emerald-400/20 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full border border-emerald-300/30 font-medium">
                    {isHindi ? 'वैज्ञानिक जांच' : isPunjabi ? 'ਵਿਗਿਆਨਕ ਪਰਖ' : 'Scientific Testing'}
                  </span>
                </h2>
                <p className="text-xs text-emerald-100 mt-0.5">
                  {isHindi
                    ? 'पैकेज चुनें, जांच करवाएं और NABL प्रमाणित डिजिटल PDF रिपोर्ट पाएं'
                    : isPunjabi
                    ? 'ਪੈਕੇਜ ਚੁਣੋ, ਪਰਖ ਕਰਵਾਓ ਅਤੇ NABL ਪ੍ਰਮਾਣਿਤ ਡਿਜੀਟਲ PDF ਰਿਪੋਰਟ ਲਵੋ'
                    : 'Select packages, book tests, and download NABL certified digital PDF reports'}
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
              <span>
                {isHindi ? '🌱 मृदा जांच पैकेज' : isPunjabi ? '🌱 ਮਿੱਟੀ ਪਰਖ ਪੈਕੇਜ' : '🌱 Soil Testing Packages'}
              </span>
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
              <span>
                {isHindi ? '📄 मेरी PDF रिपोर्ट' : isPunjabi ? '📄 ਮੇਰੀਆਂ PDF ਰਿਪੋਰਟਾਂ' : '📄 My PDF Reports'}
              </span>
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
              <span>
                {isHindi ? '🌾 फसल रोग जांच' : isPunjabi ? '🌾 ਫ਼ਸਲ ਰੋਗ ਪਰਖ' : '🌾 Crop Disease Test'}
              </span>
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
                    <strong>{isHindi ? 'नमूना कैसे लें?' : isPunjabi ? 'ਸੈਂਪਲ ਕਿਵੇਂ ਲਈਏ?' : 'How to collect soil sample?'}</strong>{' '}
                    {isHindi
                      ? 'खेत की 5 जगहों से 6-8 इंच V-शेप मिट्टी लें। लैब प्रतिनिधि घर से सैंपल ले जाएगा।'
                      : isPunjabi
                      ? 'ਖੇਤ ਦੀਆਂ 5 ਥਾਵਾਂ ਤੋਂ 6-8 ਇੰਚ V-ਅਕਾਰ ਮਿੱਟੀ ਲਵੋ। ਲੈਬ ਪ੍ਰਤੀਨਿਧੀ ਘਰੋਂ ਸੈਂਪਲ ਲੈ ਜਾਵੇਗਾ।'
                      : 'Collect 6-8 inch V-shape soil from 5 spots in field. Technician collects at doorstep.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHowToCollect(!showHowToCollect)}
                  className="text-amber-800 font-bold hover:underline shrink-0 ml-2"
                >
                  {isHindi
                    ? (showHowToCollect ? 'छिपाएं' : 'पूरी विधि देखें →')
                    : isPunjabi
                    ? (showHowToCollect ? 'ਛੁਪਾਓ' : 'ਪੂਰੀ ਵਿਧੀ ਵੇਖੋ →')
                    : (showHowToCollect ? 'Hide' : 'Full Guide →')}
                </button>
              </div>

              {showHowToCollect && (
                <div className="bg-white border border-amber-200 rounded-xl p-4 text-xs space-y-2 text-gray-700 animate-fadeIn">
                  <div className="font-bold text-amber-900 text-sm mb-1">
                    🌾 {isHindi ? 'सही मिट्टी का नमूना लेने की 5-चरण विधि:' : isPunjabi ? 'ਮਿੱਟੀ ਦਾ ਸਹੀ ਸੈਂਪਲ ਲੈਣ ਦੀ 5-ਪੜਾਵੀ ਵਿਧੀ:' : '5-Step Soil Sampling Procedure:'}
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                    {isHindi ? (
                      <>
                        <li>खेत के चारों कोनों और बीच से 5 अलग-अलग बिंदुओं का चयन करें (खेत के किनारे से कम से कम 10 फीट अंदर)।</li>
                        <li>सतह से घास-फूस साफ करें। खुरपी से 6 से 8 इंच गहरा अंग्रेजी के <strong>'V'</strong> आकार का गड्ढा बनाएं।</li>
                        <li>गड्ढे की एक तरफ से ऊपर से नीचे तक 1 इंच मोटी मिट्टी की परत खुरचें।</li>
                        <li>पाँचों जगहों की मिट्टी को साफ प्लास्टिक शीट पर मिलाकर गोल ढेर बनाएं और 4 हिस्सों में बांटकर आधा किलो शुद्ध नमूना तैयार करें।</li>
                        <li>थैली में अपना नाम व खेत का खसरा नंबर लिखकर रखें। लैब तकनीशियन आकर इसे ले जाएगा।</li>
                      </>
                    ) : isPunjabi ? (
                      <>
                        <li>ਖੇਤ ਦੇ ਚਾਰਾਂ ਕੋਨਿਆਂ ਅਤੇ ਵਿਚਕਾਰੋਂ 5 ਵੱਖ-ਵੱਖ ਥਾਵਾਂ ਚੁਣੋ (ਵੱਟਾਂ ਤੋਂ ਘੱਟੋ-ਘੱਟ 10 ਫੁੱਟ ਅੰਦਰ)।</li>
                        <li>ਸਤ੍ਹਾ ਤੋਂ ਘਾਹ-ਫੂਸ ਸਾਫ਼ ਕਰੋ। ਖੁਰਪੇ ਨਾਲ 6 ਤੋਂ 8 ਇੰਚ ਡੂੰਘਾ ਅੰਗਰੇਜ਼ੀ ਦੇ <strong>'V'</strong> ਅਕਾਰ ਦਾ ਟੋਆ ਪੁੱਟੋ।</li>
                        <li>ਟੋਏ ਦੀ ਇੱਕ ਕੰਧ ਤੋਂ ਉੱਪਰੋਂ ਹੇਠਾਂ ਤੱਕ 1 ਇੰਚ ਮੋਟੀ ਮਿੱਟੀ ਦੀ ਪਰਤ ਖੁਰਚੋ।</li>
                        <li>ਪੰਜੇ ਥਾਵਾਂ ਦੀ ਮਿੱਟੀ ਰਲਾ ਕੇ ਅੱਧਾ ਕਿੱਲੋ ਸਾਫ਼ ਸੈਂਪਲ ਤਿਆਰ ਕਰੋ।</li>
                        <li>ਲੈਬ ਪ੍ਰਤੀਨਿਧੀ ਤੁਹਾਡੇ ਪਤੇ ਤੋਂ ਸੈਂਪਲ ਲੈ ਜਾਵੇਗਾ।</li>
                      </>
                    ) : (
                      <>
                        <li>Select 5 representative spots across the field (4 corners and center, at least 10 feet inside boundaries).</li>
                        <li>Clear surface weeds. Dig a 6 to 8 inch deep <strong>'V-shaped'</strong> pit with a spade.</li>
                        <li>Slice a 1-inch thick layer of soil from top to bottom of the pit wall.</li>
                        <li>Mix all 5 spot samples thoroughly on a clean plastic sheet to prepare a 500-gram composite sample.</li>
                        <li>Label the bag with your name and field number. Our certified lab tech will collect it at your doorstep.</li>
                      </>
                    )}
                  </ol>
                </div>
              )}

              {/* Package Selection Section */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
                      {isHindi ? 'मृदा परीक्षण के प्रकार' : isPunjabi ? 'ਮਿੱਟੀ ਪਰਖ ਦੀਆਂ ਕਿਸਮਾਂ' : 'Select Soil Testing Package'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {isHindi
                        ? 'हर पैकेज में क्या जांचा जाएगा और किसान को क्या मिलेगा, नीचे देखें'
                        : isPunjabi
                        ? 'ਹਰ ਪੈਕੇਜ ਵਿੱਚ ਕੀ ਪਰਖਿਆ ਜਾਵੇਗਾ ਅਤੇ ਕਿਸਾਨ ਨੂੰ ਕੀ ਮਿਲੇਗਾ, ਹੇਠਾਂ ਵੇਖੋ'
                        : 'Explore package parameters and deliverables for farmers'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {soilTestingPackages.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;
                    const pkgTitle = pkg.name[langKey] || pkg.name.english;
                    const pkgTag = pkg.tag[langKey] || pkg.tag.english;
                    const pkgTurnaround = pkg.turnaround[langKey] || pkg.turnaround.english;
                    const pkgParams = pkg.testedParameters[langKey] || pkg.testedParameters.english;
                    const pkgDeliverables = pkg.deliverables[langKey] || pkg.deliverables.english;
                    const pkgBestFor = pkg.bestFor[langKey] || pkg.bestFor.english;

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
                              {pkgTag}
                            </span>
                            <div className="text-right">
                              <span className="text-base sm:text-lg font-black text-emerald-700">{pkg.price}</span>
                              <span className="text-xs text-gray-400 line-through ml-1">{pkg.originalPrice}</span>
                            </div>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                            {pkgTitle}
                          </h4>
                          <p className="text-[11px] text-gray-500 mb-3">
                            ⏱ {pkgTurnaround} • {pkg.paramCount} {isHindi ? 'पैरामीटर' : isPunjabi ? 'ਪੈਰਾਮੀਟਰ' : 'Parameters'}
                          </p>

                          {/* Parameters Tested */}
                          <div className="mb-3">
                            <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                              <span>
                                🧪 {isHindi ? `क्या जांच होगी (${pkg.paramCount} तत्व):` : isPunjabi ? `ਕੀ ਪਰਖ ਹੋਵੇਗੀ (${pkg.paramCount} ਤੱਤ):` : `What's Tested (${pkg.paramCount} params):`}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {pkgParams.map((p, idx) => (
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
                              <span>
                                {isHindi ? 'किसान को क्या मिलेगा (Deliverables):' : isPunjabi ? 'ਕਿਸਾਨ ਨੂੰ ਕੀ ਮਿਲੇਗਾ:' : 'What Farmer Gets (Deliverables):'}
                              </span>
                            </div>
                            <ul className="space-y-1 text-xs text-gray-700">
                              {pkgDeliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="text-[11px] text-gray-500 mb-3">
                            <strong>{isHindi ? 'सर्वोत्तम उपयोग:' : isPunjabi ? 'ਸਭ ਤੋਂ ਵਧੀਆ ਵਰਤੋਂ:' : 'Best For:'}</strong> {pkgBestFor}
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
                            {isSelected
                              ? (isHindi ? '✓ चयनित' : isPunjabi ? '✓ ਚੁਣਿਆ ਗਿਆ' : '✓ Selected')
                              : (isHindi ? 'यह पैकेज चुनें' : isPunjabi ? 'ਇਹ ਪੈਕੇਜ ਚੁਣੋ' : 'Select Package')}
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
                    {isHindi ? 'खेत व प्रयोगशाला विवरण' : isPunjabi ? 'ਖੇਤ ਅਤੇ ਲੈਬਾਰਟਰੀ ਵੇਰਵੇ' : 'Farm & Laboratory Details'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {isHindi ? 'चयनित पैकेज:' : isPunjabi ? 'ਚੁਣਿਆ ਪੈਕੇਜ:' : 'Selected Package:'}{' '}
                    <strong className="text-emerald-700">{currentPkgName} ({currentPkg.price})</strong>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {/* Field Name */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      {isHindi ? 'खेत का नाम / खसरा संख्या' : isPunjabi ? 'ਖੇਤ ਦਾ ਨਾਂ / ਖਸਰਾ ਨੰਬਰ' : 'Field Name / Survey No.'}
                    </label>
                    <input
                      type="text"
                      value={fieldName}
                      onChange={(e) => setFieldName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
                      placeholder="e.g. Field A (North Plot) / Khasra 142/3"
                      required
                    />
                  </div>

                  {/* Target Crop */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      {isHindi ? 'बोई जाने वाली फसल (सलाह हेतु)' : isPunjabi ? 'ਬੀਜਣ ਵਾਲੀ ਫ਼ਸਲ' : 'Planned Crop for Advisory'}
                    </label>
                    <input
                      type="text"
                      value={targetCrop}
                      onChange={(e) => setTargetCrop(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
                      placeholder="e.g. Wheat, Mustard, Gram, Tomato"
                      required
                    />
                  </div>
                </div>

                {/* Laboratory Selection */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-xs sm:text-sm">
                    {isHindi ? 'प्रयोगशाला चुनें' : isPunjabi ? 'ਪ੍ਰਮਾਣਿਤ ਲੈਬਾਰਟਰੀ ਚੁਣੋ' : 'Select Certified Laboratory'}
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
                    {isHindi ? 'सैंपल पिकअप पता' : isPunjabi ? 'ਸੈਂਪਲ ਪਿਕਅੱਪ ਪਤਾ' : 'Sample Collection Address'}
                  </label>
                  <input
                    type="text"
                    value={collectionAddress}
                    onChange={(e) => setCollectionAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white text-xs sm:text-sm"
                    placeholder="Village, Tehsil, District"
                    required
                  />
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1 text-xs sm:text-sm">
                    {isHindi ? 'विशेष टिप्पणी (वैकल्पिक)' : isPunjabi ? 'ਵਿਸ਼ੇਸ਼ ਟਿੱਪਣੀ (ਵਿਕਲਪੀ)' : 'Optional Notes'}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white text-xs sm:text-sm"
                    placeholder={
                      isHindi
                        ? 'जैसे: पिछली फसल में पत्तियां पीली पड़ रही थीं...'
                        : isPunjabi
                        ? 'ਜਿਵੇਂ: ਪਿਛਲੀ ਫ਼ਸਲ ਵਿੱਚ ਪੱਤੇ ਪੀਲੇ ਪੈ ਰਹੇ ਸਨ...'
                        : 'e.g. Yellow leaves observed in last crop, hard saline crust...'
                    }
                  />
                </div>

                {/* Sample Pickup Guarantee Box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 text-xs text-emerald-900">
                  <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">
                      {isHindi ? '24 घंटे में घर से सैंपल पिकअप:' : isPunjabi ? '24 ਘੰਟਿਆਂ ਵਿੱਚ ਘਰੋਂ ਸੈਂਪਲ ਪਿਕਅੱਪ:' : '24-Hour Doorstep Pickup:'}
                    </span>{' '}
                    {isHindi
                      ? 'लैब का प्रमाणित प्रतिनिधि आपके पते से मिट्टी का नमूना लेकर रसीद देगा। परिणाम आने पर डिजिटल PDF रिपोर्ट तुरंत उपलब्ध होगी।'
                      : isPunjabi
                      ? 'ਲੈਬ ਦਾ ਪ੍ਰਤੀਨਿਧੀ ਤੁਹਾਡੇ ਪਤੇ ਤੋਂ ਸੈਂਪਲ ਲੈ ਕੇ ਰਸੀਦ ਦੇਵੇਗਾ। ਨਤੀਜੇ ਆਉਣ ਤੇ ਡਿਜੀਟਲ PDF ਰਿਪੋਰਟ ਤੁਰੰਤ ਮਿਲੇਗੀ।'
                      : 'Certified lab technician collects sample at doorstep. Digital PDF report is instantly generated upon testing completion.'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium text-xs sm:text-sm"
                  >
                    {isHindi ? 'रद्द करें' : isPunjabi ? 'ਰੱਦ ਕਰੋ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{isHindi ? 'अनुरोध दर्ज हो रहा है...' : isPunjabi ? 'ਦਰਜ ਹੋ ਰਿਹਾ ਹੈ...' : 'Submitting Request...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isHindi ? `जांच बुक करें (${currentPkg.price})` : isPunjabi ? `ਪਰਖ ਬੁੱਕ ਕਰੋ (${currentPkg.price})` : `Book Test (${currentPkg.price})`}</span>
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
                {isHindi ? 'मृदा परीक्षण अनुरोध सफलतापूर्वक दर्ज!' : isPunjabi ? 'ਮਿੱਟੀ ਪਰਖ ਬੇਨਤੀ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ!' : 'Soil Test Request Submitted Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isHindi ? 'आपकी बुकिंग ID' : isPunjabi ? 'ਤੁਹਾਡੀ ਬੁਕਿੰਗ ID' : 'Your Booking Reference ID is'}{' '}
                <span className="font-mono font-bold text-emerald-700">{bookingSuccess.bookingId}</span>.
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">{isHindi ? 'चयनित पैकेज:' : isPunjabi ? 'ਚੁਣਿਆ ਪੈਕੇਜ:' : 'Package:'}</span>
                  <span className="font-bold text-gray-900">{bookingSuccess.packageName} ({bookingSuccess.price})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">{isHindi ? 'प्रयोगशाला:' : isPunjabi ? 'ਲੈਬਾਰਟਰੀ:' : 'Laboratory:'}</span>
                  <span className="font-semibold text-gray-900">{bookingSuccess.labName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">{isHindi ? 'खेत / फसल:' : isPunjabi ? 'ਖੇਤ / ਫ਼ਸਲ:' : 'Field / Crop:'}</span>
                  <span className="font-semibold text-gray-900">{bookingSuccess.fieldName} • {bookingSuccess.targetCrop}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-gray-600">{isHindi ? 'नमूना पिकअप:' : isPunjabi ? 'ਸੈਂਪਲ ਪਿਕਅੱਪ:' : 'Sample Pickup:'}</span>
                  <span className="font-bold text-emerald-700">{bookingSuccess.collectionDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">{isHindi ? 'डिजिटल रिपोर्ट:' : isPunjabi ? 'ਡਿਜੀਟਲ ਰਿਪੋਰਟ:' : 'Digital Report:'}</span>
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
                  {isHindi ? 'मेरी पिछली PDF रिपोर्ट देखें →' : isPunjabi ? 'ਮੇਰੀਆਂ ਪਿਛਲੀਆਂ PDF ਰਿਪੋਰਟਾਂ ਵੇਖੋ →' : 'View My PDF Reports →'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                >
                  {isHindi ? 'डैशबोर्ड पर वापस जाएं' : isPunjabi ? 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ ਜਾਓ' : 'Return to Dashboard'}
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
                    <span>
                      {isHindi ? 'मृदा परीक्षण PDF रिपोर्ट्स' : isPunjabi ? 'ਮਿੱਟੀ ਪਰਖ PDF ਰਿਪੋਰਟਾਂ' : 'Soil Testing PDF Reports'}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isHindi
                      ? 'आपकी सभी पूर्ण हो चुकी जांचों की डिजिटल रिपोर्ट व मृदा स्वास्थ्य कार्ड यहां सुरक्षित हैं'
                      : isPunjabi
                      ? 'ਤੁਹਾਡੀਆਂ ਸਾਰੀਆਂ ਮੁਕੰਮਲ ਪਰਖਾਂ ਦੀਆਂ ਡਿਜੀਟਲ ਰਿਪੋਰਟਾਂ ਇੱਥੇ ਸੁਰੱਖਿਅਤ ਹਨ'
                      : 'All your completed lab test reports and digital Soil Health Cards are archived here'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('soil')}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>+ {isHindi ? 'नया टेस्ट बुक करें' : isPunjabi ? 'ਨਵੀਂ ਪਰਖ ਬੁੱਕ ਕਰੋ' : 'Book New Test'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {sampleSoilReports.map((report) => {
                  const cropName = report.cropPlanned[langKey] || report.cropPlanned.english;
                  const khasraText = report.khasraNo[langKey] || report.khasraNo.english;
                  const soilTypeText = report.soilType[langKey] || report.soilType.english;
                  const overallHealthText = report.overallHealth[langKey] || report.overallHealth.english;

                  return (
                    <div
                      key={report.id}
                      className="bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {cropName}
                          </span>
                          <span className="text-xs text-gray-500 font-mono font-semibold">
                            ID: {report.sampleNo}
                          </span>
                          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                            ✓ {isHindi ? 'रिपोर्ट तैयार' : isPunjabi ? 'ਰਿਪੋਰਟ ਤਿਆਰ' : 'Report Ready'}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-gray-900">
                          {khasraText} • {soilTypeText}
                        </h4>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-600 pt-1">
                          <div>
                            <span className="text-gray-400 block text-[10px]">
                              {isHindi ? 'जांच तिथि:' : isPunjabi ? 'ਪਰਖ ਮਿਤੀ:' : 'Test Date:'}
                            </span>
                            <span className="font-semibold text-gray-800">{report.testingDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px]">
                              {isHindi ? 'प्रयोगशाला:' : isPunjabi ? 'ਲੈਬ:' : 'Lab:'}
                            </span>
                            <span className="font-semibold text-gray-800 truncate block">{report.labName}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px]">
                              {isHindi ? 'स्वास्थ्य स्कोर:' : isPunjabi ? 'ਸਿਹਤ ਸਕੋਰ:' : 'Health Score:'}
                            </span>
                            <span className="font-bold text-emerald-700">{report.overallScore}/100 ({overallHealthText})</span>
                          </div>
                        </div>

                        {/* Nutrient Summary Pill */}
                        <div className="flex items-center gap-3 pt-2 text-xs">
                          <span className="text-[11px] text-gray-500">
                            {isHindi ? 'मुख्य स्थिति:' : isPunjabi ? 'ਮੁੱਖ ਸਥਿਤੀ:' : 'Key Status:'}
                          </span>
                          <span className="text-[11px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md font-semibold">
                            N & Zn: {isHindi ? 'न्यून' : isPunjabi ? 'ਘੱਟ' : 'Low'}
                          </span>
                          <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                            pH & K: {isHindi ? 'उत्तम' : isPunjabi ? 'ਉੱਤਮ' : 'Optimal'}
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
                          <span>{isHindi ? 'स्वास्थ्य कार्ड देखें' : isPunjabi ? 'ਸਿਹਤ ਕਾਰਡ ਵੇਖੋ' : 'View Health Card'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewingReport(report)}
                          className="flex-1 md:flex-initial px-4 py-2 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>{isHindi ? 'PDF डाउनलोड करें' : isPunjabi ? 'PDF ਡਾਊਨਲੋਡ ਕਰੋ' : 'Download PDF'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* In Progress Sample Card */}
                <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        {isHindi ? 'चना (Gram)' : isPunjabi ? 'ਛੋਲੇ (Gram)' : 'Gram (Chickpea)'}
                      </span>
                      <span className="text-xs text-amber-600 font-semibold">
                        ⏳ {isHindi ? 'परीक्षण प्रगति पर है' : isPunjabi ? 'ਪਰਖ ਚੱਲ ਰਹੀ ਹੈ' : 'Testing In Progress'}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm">
                      {isHindi ? 'खसरा संख्या 145/2 (खेत C - कुआं प्लॉट)' : isPunjabi ? 'ਖਸਰਾ ਨੰ. 145/2 (ਖੇਤ C - ਖੂਹ ਪਲਾਟ)' : 'Khasra No. 145/2 (Field C - Well Plot)'}
                    </div>
                    <p className="text-xs text-gray-500">
                      {isHindi
                        ? 'नमूना एकत्र: 15 Jan 2025 • अनुमानित रिपोर्ट: 17 Jan 2025'
                        : isPunjabi
                        ? 'ਸੈਂਪਲ ਲਿਆ: 15 Jan 2025 • ਅੰਦਾਜ਼ਨ ਰਿਪੋਰਟ: 17 Jan 2025'
                        : 'Sample Collected: 15 Jan 2025 • Expected Report: 17 Jan 2025'}
                    </p>
                  </div>
                  <span className="text-xs bg-slate-100 text-gray-600 px-3 py-1.5 rounded-xl font-medium">
                    {isHindi ? 'रिजल्ट प्रतीक्षित' : isPunjabi ? 'ਨਤੀਜਾ ਉਡੀਕਿਆ ਜਾ ਰਿਹਾ ਹੈ' : 'Awaiting Results'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Crop Disease Test */}
          {activeTab === 'crop' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 leading-relaxed">
                🌾{' '}
                <strong>
                  {isHindi
                    ? 'फसल रोग प्रयोगशाला परीक्षण:'
                    : isPunjabi
                    ? 'ਫ਼ਸਲ ਰੋਗ ਲੈਬਾਰਟਰੀ ਪਰਖ:'
                    : 'Crop Disease Laboratory Testing:'}
                </strong>{' '}
                {isHindi
                  ? 'यदि फसल की पत्तियों में फंगल, वायरस अथवा कीट का प्रकोप है और सामान्य दवा से ठीक नहीं हो रहा है, तो विशेषज्ञ पैथोलॉजी लैब से पत्ती व तने का वैज्ञानिक परीक्षण करवाएं।'
                  : isPunjabi
                  ? 'ਜੇਕਰ ਫ਼ਸਲ ਵਿੱਚ ਉੱਲੀ, ਵਾਇਰਸ ਜਾਂ ਕੀੜਿਆਂ ਦਾ ਹਮਲਾ ਹੈ ਤਾਂ ਪੱਤਿਆਂ ਦੀ ਵਿਗਿਆਨਕ ਜਾਂਚ ਕਰਵਾਓ।'
                  : 'If your crop exhibits persistent leaf yellowing, blight, or viral infection, book a certified plant pathology laboratory test.'}
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    {isHindi ? 'प्रभावित फसल का नाम' : isPunjabi ? 'ਪ੍ਰਭਾਵਿਤ ਫ਼ਸਲ ਦਾ ਨਾਂ' : 'Affected Crop Name'}
                  </label>
                  <input
                    type="text"
                    defaultValue={isHindi ? 'गेहूं (Wheat) - HD 3086' : isPunjabi ? 'ਕਣਕ (Wheat) - HD 3086' : 'Wheat (HD 3086)'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    {isHindi ? 'रोग के लक्षण' : isPunjabi ? 'ਰੋਗ ਦੇ ਲੱਛਣ' : 'Disease Symptoms Observed'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={
                      isHindi
                        ? 'जैसे पत्तियों पर पीले भूरे धब्बे, तना सूखना, झुलसा रोग...'
                        : isPunjabi
                        ? 'ਜਿਵੇਂ ਪੱਤਿਆਂ ਉੱਤੇ ਪੀਲੇ ਧੱਬੇ, ਤਣਾ ਸੁੱਕਣਾ...'
                        : 'e.g. Yellow leaf spots, stem drying, blight symptoms...'
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    {isHindi ? 'प्रयोगशाला चुनें' : isPunjabi ? 'ਲੈਬਾਰਟਰੀ ਚੁਣੋ' : 'Select Testing Laboratory'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                    <option>AgriTech Crop Pathology Lab (₹500 / Sample)</option>
                    <option>Dungarpur Krishi University Plant Lab (₹600 / Sample)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert(
                      isHindi
                        ? 'फसल रोग जांच अनुरोध दर्ज कर लिया गया है। लैब विशेषज्ञ 24 घंटे में संपर्क करेंगे।'
                        : isPunjabi
                        ? 'ਫ਼ਸਲ ਰੋਗ ਪਰਖ ਬੇਨਤੀ ਦਰਜ ਕਰ ਲਈ ਗਈ ਹੈ।'
                        : 'Crop disease test request submitted successfully! Lab will contact you within 24 hours.'
                    );
                    onClose();
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  {isHindi ? 'फसल रोग जांच बुक करें' : isPunjabi ? 'ਫ਼ਸਲ ਰੋਗ ਪਰਖ ਬੁੱਕ ਕਰੋ' : 'Book Crop Disease Test'}
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