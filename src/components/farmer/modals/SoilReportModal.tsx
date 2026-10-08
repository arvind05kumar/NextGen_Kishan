import React, { useState } from 'react';
import { X, Download, Printer, Share2, CheckCircle2, ShieldCheck, FileText, MapPin, Award, ArrowDownToLine, Sparkles, Sprout } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../../contexts/AuthContext';

export interface SoilReportData {
  id: string;
  sampleNo: string;
  farmerName: string;
  fatherName?: string;
  phone: string;
  village: { english: string; hindi: string; regional: string };
  district: string;
  state: { english: string; hindi: string; regional: string };
  khasraNo: { english: string; hindi: string; regional: string };
  soilType: { english: string; hindi: string; regional: string };
  cropPlanned: { english: string; hindi: string; regional: string };
  collectionDate: string;
  testingDate: string;
  labName: string;
  labLicense: string;
  overallHealth: {
    english: 'Optimal' | 'Moderate' | 'Deficient';
    hindi: 'उत्तम' | 'मध्यम' | 'न्यून';
    regional: 'ਉੱਤਮ' | 'ਦਰਮਿਆਨਾ' | 'ਘੱਟ';
  };
  overallScore: number;
  parameters: {
    nameEn: string;
    nameHi: string;
    namePa: string;
    value: string;
    unit: string;
    status: 'low' | 'medium' | 'optimal' | 'high';
    normalRange: string;
  }[];
  recommendations: {
    fertilizer: { english: string; hindi: string; regional: string };
    dosage: { english: string; hindi: string; regional: string };
    timing: { english: string; hindi: string; regional: string };
  }[];
  organicRemedies: { english: string; hindi: string; regional: string }[];
  agronomistNotes: { english: string; hindi: string; regional: string };
}

export const sampleSoilReports: SoilReportData[] = [
  {
    id: 'SR-2025-01',
    sampleNo: 'NGK-SOIL-2025-08492',
    farmerName: 'Rajesh Kumar Patel',
    fatherName: 'Ramswaroop Patel',
    phone: '+91 98765 43210',
    village: {
      english: 'Kothpura, Bichhiwara',
      hindi: 'कोठपुरा, बिछीवाड़ा',
      regional: 'ਕੋਠਪੁਰਾ, ਬਿਛੀਵਾੜਾ'
    },
    district: 'Dungarpur',
    state: {
      english: 'Rajasthan',
      hindi: 'राजस्थान',
      regional: 'ਰਾਜਸਥਾਨ'
    },
    khasraNo: {
      english: 'Khasra No. 142/3 (Field A - North Plot)',
      hindi: 'खसरा संख्या 142/3 (खेत A - उत्तर दिशा)',
      regional: 'ਖਸਰਾ ਨੰਬਰ 142/3 (ਖੇਤ A - ਉੱਤਰ ਦਿਸ਼ਾ)'
    },
    soilType: {
      english: 'Sandy Loam',
      hindi: 'बलुई दोमट (Sandy Loam)',
      regional: 'ਰੇਤਲੀ ਦੋਮਟ (Sandy Loam)'
    },
    cropPlanned: {
      english: 'Wheat (HD 2967)',
      hindi: 'गेहूं (HD 2967)',
      regional: 'ਕਣਕ (HD 2967)'
    },
    collectionDate: '12 Jan 2025',
    testingDate: '14 Jan 2025',
    labName: 'AgriTech Regional Soil Testing Lab',
    labLicense: 'NABL-TC-8492 / ISO 9001:2015',
    overallHealth: {
      english: 'Moderate',
      hindi: 'मध्यम',
      regional: 'ਦਰਮਿਆਨਾ'
    },
    overallScore: 78,
    parameters: [
      { nameEn: 'Soil pH (Reaction)', nameHi: 'पी.एच मान (अम्लीयता/क्षारीयता)', namePa: 'ਮਿੱਟੀ pH ਮਾਨ', value: '7.4', unit: 'pH', status: 'optimal', normalRange: '6.5 - 7.5' },
      { nameEn: 'Electrical Conductivity (EC)', nameHi: 'विद्युत चालकता (लवणता)', namePa: 'ਬਿਜਲਈ ਚਾਲਕਤਾ (ਲੂਣਪੁਣਾ)', value: '0.42', unit: 'dS/m', status: 'optimal', normalRange: '< 1.0 dS/m' },
      { nameEn: 'Organic Carbon (OC)', nameHi: 'जैविक कार्बन (% OC)', namePa: 'ਜੈਵਿਕ ਕਾਰਬਨ (% OC)', value: '0.52', unit: '%', status: 'medium', normalRange: '0.50 - 0.75%' },
      { nameEn: 'Available Nitrogen (N)', nameHi: 'उपलब्ध नाइट्रोजन (N)', namePa: 'ਉਪਲਬਧ ਨਾਈਟ੍ਰੋਜਨ (N)', value: '210', unit: 'kg/ha', status: 'low', normalRange: '280 - 560 kg/ha' },
      { nameEn: 'Available Phosphorus (P)', nameHi: 'उपलब्ध फास्फोरस (P)', namePa: 'ਉਪਲਬਧ ਫ਼ਾਸਫ਼ੋਰਸ (P)', value: '18.4', unit: 'kg/ha', status: 'medium', normalRange: '10 - 25 kg/ha' },
      { nameEn: 'Available Potassium (K)', nameHi: 'उपलब्ध पोटाश (K)', namePa: 'ਉਪਲਬਧ ਪੋਟਾਸ਼ (K)', value: '290', unit: 'kg/ha', status: 'high', normalRange: '110 - 280 kg/ha' },
      { nameEn: 'Available Zinc (Zn)', nameHi: 'उपलब्ध जिंक (जस्ता)', namePa: 'ਉਪਲਬਧ ਜਿੰਕ (ਜਸਤਾ)', value: '0.45', unit: 'ppm', status: 'low', normalRange: '> 0.60 ppm' },
      { nameEn: 'Available Sulphur (S)', nameHi: 'उपलब्ध सल्फर (गंधक)', namePa: 'ਉਪਲਬਧ ਸਲਫ਼ਰ (ਗੰਧਕ)', value: '8.8', unit: 'ppm', status: 'low', normalRange: '10 - 20 ppm' },
      { nameEn: 'Available Iron (Fe)', nameHi: 'उपलब्ध आयरन (लोहा)', namePa: 'ਉਪਲਬਧ ਲੋਹਾ (Fe)', value: '5.4', unit: 'ppm', status: 'optimal', normalRange: '> 4.5 ppm' },
      { nameEn: 'Available Boron (B)', nameHi: 'उपलब्ध बोरॉन (B)', namePa: 'ਉਪਲਬਧ ਬੋਰਾਨ (B)', value: '0.55', unit: 'ppm', status: 'optimal', normalRange: '> 0.50 ppm' },
    ],
    recommendations: [
      {
        fertilizer: { english: 'Urea', hindi: 'यूरिया (Urea)', regional: 'ਯੂਰੀਆ (Urea)' },
        dosage: { english: '45 kg / acre', hindi: '45 किग्रा / एकड़', regional: '45 ਕਿਲੋ / ਏਕੜ' },
        timing: {
          english: 'In 2 equal splits: 1st at 21 days after sowing, 2nd at tillering stage',
          hindi: '2 समान भागों में: पहला बुवाई के 21 दिन बाद, दूसरा कल्ले फूटते समय',
          regional: '2 ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ: ਪਹਿਲੀ ਬਿਜਾਈ ਦੇ 21 ਦਿਨ ਬਾਅਦ, ਦੂਜੀ ਫੋਟ ਪੈਣ ਵੇਲੇ'
        }
      },
      {
        fertilizer: { english: 'DAP (Di-Ammonium Phosphate)', hindi: 'DAP (डाई अमोनियम फास्फेट)', regional: 'DAP (ਡਾਈ ਅਮੋਨੀਅਮ ਫ਼ਾਸਫ਼ੇਟ)' },
        dosage: { english: '30 kg / acre', hindi: '30 किग्रा / एकड़', regional: '30 ਕਿਲੋ / ਏਕੜ' },
        timing: {
          english: 'At the time of sowing during final ploughing (Basal Dose)',
          hindi: 'बुवाई के समय आखिरी जुताई में (Basal Dose)',
          regional: 'ਬਿਜਾਈ ਵੇਲੇ ਆਖਰੀ ਵਾਹੀ ਦੌਰਾਨ (Basal Dose)'
        }
      },
      {
        fertilizer: { english: 'Zinc Sulphate (21%)', hindi: 'जिंक सल्फेट (21%)', regional: 'ਜਿੰਕ ਸਲਫ਼ੇਟ (21%)' },
        dosage: { english: '5 kg / acre', hindi: '5 किग्रा / एकड़', regional: '5 ਕਿਲੋ / ਏਕੜ' },
        timing: {
          english: 'At sowing, mix thoroughly into the soil',
          hindi: 'बुवाई के समय, मिट्टी में अच्छी तरह मिलाएं',
          regional: 'ਬਿਜਾਈ ਵੇਲੇ ਮਿੱਟੀ ਵਿੱਚ ਚੰਗੀ ਤਰ੍ਹਾਂ ਮਿਲਾਓ'
        }
      },
      {
        fertilizer: { english: 'Bentonite Sulphur (90%)', hindi: 'बेंटोनाइट सल्फर (90%)', regional: 'ਬੈਂਟੋਨਾਈਟ ਸਲਫ਼ਰ (90%)' },
        dosage: { english: '3 kg / acre', hindi: '3 किग्रा / एकड़', regional: '3 ਕਿਲੋ / ਏਕੜ' },
        timing: {
          english: 'At sowing time along with DAP',
          hindi: 'बुवाई के समय डीएपी के साथ',
          regional: 'ਬਿਜਾਈ ਵੇਲੇ ਡੀਏਪੀ ਦੇ ਨਾਲ'
        }
      }
    ],
    organicRemedies: [
      {
        english: 'Apply 2-3 trolleys/acre of well-decomposed Farm Yard Manure (FYM) 15 days before sowing.',
        hindi: 'अच्छी सड़ी गोबर की खाद (FYM) 2 से 3 ट्रॉली प्रति एकड़ जुताई से 15 दिन पहले डालें।',
        regional: 'ਚੰਗੀ ਤਰ੍ਹਾਂ ਗਲੀ ਗੋਹੇ ਦੀ ਖਾਦ 2 ਤੋਂ 3 ਟਰਾਲੀਆਂ ਪ੍ਰਤੀ ਏਕੜ ਬਿਜਾਈ ਤੋਂ 15 ਦਿਨ ਪਹਿਲਾਂ ਪਾਓ।'
      },
      {
        english: 'To cure zinc deficiency, foliar spray 0.5% Zinc Sulphate + 0.25% slaked lime at 30-35 days crop stage.',
        hindi: 'जिंक की कमी दूर करने हेतु 0.5% जिंक सल्फेट + 0.25% बुझे चूने का छिड़काव फसल की 30-35 दिन की अवस्था में करें।',
        regional: 'ਜਿੰਕ ਦੀ ਘਾਟ ਲਈ 0.5% ਜਿੰਕ ਸਲਫ਼ੇਟ + 0.25% ਬੁਝੇ ਚੂਨੇ ਦਾ ਛਿੜਕਾਅ ਫ਼ਸਲ ਦੇ 30-35 ਦਿਨਾਂ ਤੇ ਕਰੋ।'
      },
      {
        english: 'Soil potassium is optimal; no additional Muriate of Potash (MOP) is required.',
        hindi: 'पोटाश की मात्रा मिट्टी में पर्याप्त है, अतिरिक्त म्यूरेट ऑफ पोटाश (MOP) देने की आवश्यकता नहीं है।',
        regional: 'ਪੋਟਾਸ਼ ਦੀ ਮਾਤਰਾ ਮਿੱਟੀ ਵਿੱਚ ਪੂਰੀ ਹੈ, ਵਾਧੂ ਪੋਟਾਸ਼ ਖਾਦ ਪਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ।'
      }
    ],
    agronomistNotes: {
      english: 'Soil has deficiency in Nitrogen and Zinc. Potassium and pH levels are optimal. Following the recommended dose of Zinc Sulphate and Urea can enhance wheat yield by 18-22%.',
      hindi: 'मिट्टी में नाइट्रोजन और जिंक की कमी है। पोटाश का स्तर उत्तम है। संस्तुत मात्रा में जिंक और यूरिया देने से गेहूं की पैदावार में 18-22% तक वृद्धि संभावित है।',
      regional: 'ਮਿੱਟੀ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ ਅਤੇ ਜਿੰਕ ਦੀ ਘਾਟ ਹੈ। ਪੋਟਾਸ਼ ਦਾ ਪੱਧਰ ਉੱਤਮ ਹੈ। ਸਿਫਾਰਸ਼ ਕੀਤੀ ਖੁਰਾਕ ਅਨੁਸਾਰ ਜਿੰਕ ਤੇ ਯੂਰੀਆ ਪਾਉਣ ਨਾਲ ਕਣਕ ਦੇ ਝਾੜ ਵਿੱਚ 18-22% ਵਾਧਾ ਸੰਭਵ ਹੈ।'
    }
  },
  {
    id: 'SR-2024-02',
    sampleNo: 'NGK-SOIL-2024-07119',
    farmerName: 'Rajesh Kumar Patel',
    fatherName: 'Ramswaroop Patel',
    phone: '+91 98765 43210',
    village: {
      english: 'Kothpura, Bichhiwara',
      hindi: 'कोठपुरा, बिछीवाड़ा',
      regional: 'ਕੋਠਪੁਰਾ, ਬਿਛੀਵਾੜਾ'
    },
    district: 'Dungarpur',
    state: {
      english: 'Rajasthan',
      hindi: 'राजस्थान',
      regional: 'ਰਾਜਸਥਾਨ'
    },
    khasraNo: {
      english: 'Khasra No. 138/1 (Field B - Canal Side)',
      hindi: 'खसरा संख्या 138/1 (खेत B - नहर किनारा)',
      regional: 'ਖਸਰਾ ਨੰਬਰ 138/1 (ਖੇਤ B - ਨਹਿਰ ਕਿਨਾਰਾ)'
    },
    soilType: {
      english: 'Clay Loam',
      hindi: 'मटियार दोमट (Clay Loam)',
      regional: 'ਚੀਕਣੀ ਦੋਮਟ (Clay Loam)'
    },
    cropPlanned: {
      english: 'Mustard (Giriraj)',
      hindi: 'सरसों (Giriraj)',
      regional: 'ਸਰ੍ਹੋਂ (Giriraj)'
    },
    collectionDate: '28 Oct 2024',
    testingDate: '31 Oct 2024',
    labName: 'Soil Science Center Dungarpur',
    labLicense: 'NABL-TC-6190 / Govt. Approved',
    overallHealth: {
      english: 'Optimal',
      hindi: 'उत्तम',
      regional: 'ਉੱਤਮ'
    },
    overallScore: 88,
    parameters: [
      { nameEn: 'Soil pH (Reaction)', nameHi: 'पी.एच मान (अम्लीयता/क्षारीयता)', namePa: 'ਮਿੱਟੀ pH ਮਾਨ', value: '7.1', unit: 'pH', status: 'optimal', normalRange: '6.5 - 7.5' },
      { nameEn: 'Electrical Conductivity (EC)', nameHi: 'विद्युत चालकता', namePa: 'ਬਿਜਲਈ ਚਾਲਕਤਾ', value: '0.35', unit: 'dS/m', status: 'optimal', normalRange: '< 1.0 dS/m' },
      { nameEn: 'Organic Carbon (OC)', nameHi: 'जैविक कार्बन', namePa: 'ਜੈਵਿਕ ਕਾਰਬਨ', value: '0.68', unit: '%', status: 'optimal', normalRange: '0.50 - 0.75%' },
      { nameEn: 'Available Nitrogen (N)', nameHi: 'उपलब्ध नाइट्रोजन', namePa: 'ਉਪਲਬਧ ਨਾਈਟ੍ਰੋਜਨ', value: '310', unit: 'kg/ha', status: 'optimal', normalRange: '280 - 560 kg/ha' },
      { nameEn: 'Available Phosphorus (P)', nameHi: 'उपलब्ध फास्फोरस', namePa: 'ਉਪਲਬਧ ਫ਼ਾਸਫ਼ੋਰਸ', value: '22.1', unit: 'kg/ha', status: 'optimal', normalRange: '10 - 25 kg/ha' },
      { nameEn: 'Available Potassium (K)', nameHi: 'उपलब्ध पोटाश', namePa: 'ਉਪਲਬਧ ਪੋਟਾਸ਼', value: '240', unit: 'kg/ha', status: 'optimal', normalRange: '110 - 280 kg/ha' },
      { nameEn: 'Available Sulphur (S)', nameHi: 'सल्फर (गंधक)', namePa: 'ਸਲਫ਼ਰ (ਗੰਧਕ)', value: '14.2', unit: 'ppm', status: 'optimal', normalRange: '10 - 20 ppm' },
      { nameEn: 'Available Zinc (Zn)', nameHi: 'जिंक (जस्ता)', namePa: 'ਜਿੰਕ (ਜਸਤਾ)', value: '0.72', unit: 'ppm', status: 'optimal', normalRange: '> 0.60 ppm' },
    ],
    recommendations: [
      {
        fertilizer: { english: 'Single Super Phosphate (SSP)', hindi: 'सिंगल सुपर फास्फेट (SSP)', regional: 'ਸਿੰਗਲ ਸੁਪਰ ਫ਼ਾਸਫ਼ੇਟ (SSP)' },
        dosage: { english: '50 kg / acre', hindi: '50 किग्रा / एकड़', regional: '50 ਕਿਲੋ / ਏਕੜ' },
        timing: {
          english: 'At the time of sowing (supplies both Sulphur & Phosphorus)',
          hindi: 'बुवाई के समय (सल्फर और फास्फोरस दोनों की आपूर्ति)',
          regional: 'ਬਿਜਾਈ ਵੇਲੇ (ਸਲਫ਼ਰ ਤੇ ਫ਼ਾਸਫ਼ੋਰਸ ਦੋਵਾਂ ਦੀ ਪੂਰਤੀ)'
        }
      },
      {
        fertilizer: { english: 'Urea', hindi: 'यूरिया (Urea)', regional: 'ਯੂਰੀਆ (Urea)' },
        dosage: { english: '35 kg / acre', hindi: '35 किग्रा / एकड़', regional: '35 ਕਿਲੋ / ਏਕੜ' },
        timing: {
          english: 'At the time of first irrigation',
          hindi: 'पहली सिंचाई के समय',
          regional: 'ਪਹਿਲੇ ਪਾਣੀ ਵੇਲੇ'
        }
      }
    ],
    organicRemedies: [
      {
        english: 'Apply 5 quintals/acre of Vermicompost before sowing.',
        hindi: 'केंचुआ खाद (Vermicompost) 5 क्विंटल प्रति एकड़ उपयोग करें।',
        regional: 'ਗੰਡੋਆ ਖਾਦ 5 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ ਵਰਤੋਂ।'
      },
      {
        english: 'Balanced sulphur application ensures high oil percentage in mustard grain.',
        hindi: 'फसल में तेल की मात्रा बढ़ाने के लिए सल्फर का संतुलित उपयोग पर्याप्त है।',
        regional: 'ਸਰ੍ਹੋਂ ਵਿੱਚ ਤੇਲ ਦੀ ਮਾਤਰਾ ਵਧਾਉਣ ਲਈ ਸਲਫ਼ਰ ਦੀ ਸੰਤੁਲਿਤ ਮਾਤਰਾ ਕਾਫ਼ੀ ਹੈ।'
      }
    ],
    agronomistNotes: {
      english: 'Canal-side field fertility is exceptional. High yield potential for Mustard crop with minimal chemical intervention.',
      hindi: 'कनाल साइड खेत की मिट्टी की उर्वरता उत्कृष्ट है। सरसों की बंपर पैदावार की उच्च संभावना है।',
      regional: 'ਨਹਿਰੀ ਖੇਤ ਦੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਸ਼ਾਨਦਾਰ ਹੈ। ਸਰ੍ਹੋਂ ਦੇ ਬੰਪਰ ਝਾੜ ਦੀ ਪੂਰੀ ਸੰਭਾਵਨਾ ਹੈ।'
    }
  }
];

interface SoilReportModalProps {
  report?: SoilReportData;
  onClose: () => void;
}

const SoilReportModal: React.FC<SoilReportModalProps> = ({
  report = sampleSoilReports[0],
  onClose
}) => {
  const { language } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isHindi = language === 'hindi';
  const isPunjabi = language === 'regional';
  const langKey = isHindi ? 'hindi' : isPunjabi ? 'regional' : 'english';

  // Localized values
  const villageText = report.village[langKey] || report.village.english;
  const stateText = report.state[langKey] || report.state.english;
  const khasraText = report.khasraNo[langKey] || report.khasraNo.english;
  const soilTypeText = report.soilType[langKey] || report.soilType.english;
  const cropPlannedText = report.cropPlanned[langKey] || report.cropPlanned.english;
  const overallHealthText = report.overallHealth[langKey] || report.overallHealth.english;
  const agronomistNotesText = report.agronomistNotes[langKey] || report.agronomistNotes.english;

  // Generate real PDF using jsPDF
  const handleDownloadPDF = () => {
    try {
      setDownloading(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header Green Ribbon
      doc.setFillColor(22, 101, 52); // #166534
      doc.rect(0, 0, 210, 32, 'F');

      // Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('NEXTGEN KISAN DIGITAL LAB NETWORK', 105, 12, { align: 'center' });

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const cardTitlePdf = isHindi
        ? 'SOIL HEALTH CARD / मृदा स्वास्थ्य कार्ड'
        : isPunjabi
        ? 'SOIL HEALTH CARD / ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ'
        : 'OFFICIAL SOIL HEALTH CARD';
      doc.text(cardTitlePdf, 105, 19, { align: 'center' });

      doc.setFontSize(8);
      doc.setTextColor(209, 250, 229);
      doc.text(`Lab: ${report.labName} | Accreditation: ${report.labLicense}`, 105, 26, { align: 'center' });

      // Card Meta Box
      doc.setFillColor(240, 253, 244);
      doc.setDrawColor(187, 247, 208);
      doc.roundedRect(12, 36, 186, 26, 3, 3, 'FD');

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`Sample ID: ${report.sampleNo}`, 16, 42);
      doc.text(`Score: ${report.overallScore}/100 (${report.overallHealth.english})`, 140, 42);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`Farmer: ${report.farmerName}`, 16, 48);
      doc.text(`Mobile: ${report.phone}`, 110, 48);
      doc.text(`Village/Dist: ${report.village.english}, ${report.district}`, 16, 54);
      doc.text(`Field Survey: ${report.khasraNo.english}`, 110, 54);
      doc.text(`Soil Type: ${report.soilType.english}`, 16, 60);
      doc.text(`Test Date: ${report.testingDate}`, 110, 60);

      // Section Title: Parameters
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(22, 101, 52);
      doc.text('1. CHEMICAL & NUTRIENT ANALYSIS RESULTS', 12, 68);

      // Table Header
      let y = 72;
      doc.setFillColor(220, 252, 231);
      doc.rect(12, y, 186, 7, 'F');
      doc.setDrawColor(187, 247, 208);
      doc.rect(12, y, 186, 7, 'S');

      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.text('Parameter Name', 16, y + 5);
      doc.text('Found Value', 80, y + 5);
      doc.text('Optimal Range', 115, y + 5);
      doc.text('Status / Rating', 155, y + 5);

      // Rows
      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);

      report.parameters.forEach((param, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(12, y, 186, 6, 'F');
        }
        doc.setDrawColor(226, 232, 240);
        doc.line(12, y + 6, 198, y + 6);

        doc.setTextColor(30, 41, 59);
        doc.text(param.nameEn, 16, y + 4.5);
        doc.text(`${param.value} ${param.unit}`, 80, y + 4.5);
        doc.text(param.normalRange, 115, y + 4.5);

        // Status badge color
        if (param.status === 'optimal' || param.status === 'medium') {
          doc.setTextColor(22, 101, 52);
          doc.text(`[ OK ] ${param.status.toUpperCase()}`, 155, y + 4.5);
        } else if (param.status === 'low') {
          doc.setTextColor(185, 28, 28);
          doc.text(`[ ! ] DEFICIENT`, 155, y + 4.5);
        } else {
          doc.setTextColor(30, 64, 175);
          doc.text(`[ * ] HIGH`, 155, y + 4.5);
        }

        y += 6;
      });

      // Section 2: Fertilizer Recommendations
      y += 6;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(22, 101, 52);
      doc.text(`2. FERTILIZER RECOMMENDATIONS FOR ${report.cropPlanned.english.toUpperCase()}`, 12, y);

      y += 4;
      report.recommendations.forEach((rec) => {
        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`• ${rec.fertilizer.english}: ${rec.dosage.english}`, 16, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(71, 85, 105);
        doc.text(`  (${rec.timing.english})`, 16, y + 4);
        y += 4;
      });

      // Section 3: Organic Remedies & Advice
      y += 6;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(22, 101, 52);
      doc.text('3. EXPERT AGRONOMIST ADVISORY & ORGANIC TIPS', 12, y);

      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(report.agronomistNotes.english, 16, y, { maxWidth: 180 });

      // Verification Box & Signatures
      y = 262;
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(12, y, 186, 24, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('DIGITAL NABL VERIFICATION', 16, y + 6);
      doc.text(`Report Generated On: ${new Date().toLocaleDateString('en-IN')}`, 16, y + 11);
      doc.text('NextGen Kisan Platform • Ministry of Agriculture & Farmer Welfare Guidelines compliant', 16, y + 16);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('Authorized Soil Chemist', 145, y + 14);
      doc.setFont('helvetica', 'normal');
      doc.text(report.labName, 145, y + 19);

      // Save PDF file
      const safeFilename = `Soil_Health_Card_${report.sampleNo.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      doc.save(safeFilename);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Soil Health Report - ${report.farmerName}`,
        text: `Soil Health Card report for ${khasraText}. Score: ${report.overallScore}/100.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'optimal':
        return {
          bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200',
          label: isHindi ? 'उत्तम (Optimal)' : isPunjabi ? 'ਉੱਤਮ (Optimal)' : 'Optimal'
        };
      case 'medium':
        return {
          bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200',
          label: isHindi ? 'मध्यम (Medium)' : isPunjabi ? 'ਦਰਮਿਆਨਾ (Medium)' : 'Medium'
        };
      case 'low':
        return {
          bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200',
          label: isHindi ? 'न्यून (Low)' : isPunjabi ? 'ਘੱਟ (Low)' : 'Deficient (Low)'
        };
      case 'high':
        return {
          bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200',
          label: isHindi ? 'अधिक (High)' : isPunjabi ? 'ਵੱਧ (High)' : 'High'
        };
      default:
        return {
          bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200',
          label: isHindi ? 'सामान्य' : isPunjabi ? 'ਆਮ' : 'Normal'
        };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-6 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-900 text-white p-4 sm:p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <FileText className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">
                  {isHindi ? 'मृदा स्वास्थ्य कार्ड (Soil Health Card)' : isPunjabi ? 'ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ (Soil Health Card)' : 'Soil Health Card'}
                </h2>
                <span className="bg-emerald-400/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  NABL CERTIFIED
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Sample ID: <span className="font-mono font-semibold">{report.sampleNo}</span> • {report.testingDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
              title="Download Official PDF Report"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>{downloading ? (isHindi ? 'डाउनलोड हो रहा है...' : 'Downloading...') : (isHindi ? 'PDF डाउनलोड' : isPunjabi ? 'PDF ਡਾਊਨਲੋਡ' : 'Download PDF')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:flex bg-white/15 hover:bg-white/25 text-white p-2 rounded-xl transition-colors cursor-pointer"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="hidden sm:flex bg-white/15 hover:bg-white/25 text-white p-2 rounded-xl transition-colors cursor-pointer"
              title="Share Report"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-gray-800" id="soil-health-card-printable">
          {copied && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isHindi ? 'रिपोर्ट लिंक कॉपी किया गया!' : isPunjabi ? 'ਰਿਪੋਰਟ ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ!' : 'Report link copied to clipboard!'}</span>
            </div>
          )}

          {/* Farmer & Sample Summary Banner */}
          <div className="bg-gradient-to-br from-emerald-50/80 via-white to-green-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-emerald-100">
              <div>
                <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>
                    {isHindi ? 'NextGen किसान प्रमाणित मृदा रिपोर्ट' : isPunjabi ? 'NextGen ਕਿਸਾਨ ਪ੍ਰਮਾਣਿਤ ਮਿੱਟੀ ਰਿਪੋਰਟ' : 'NextGen Kisan Certified Soil Report'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">{report.farmerName}</h3>
                <div className="text-xs text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {villageText}, {report.district}
                  </span>
                  <span>•</span>
                  <span>{isHindi ? 'खेत:' : isPunjabi ? 'ਖੇਤ:' : 'Field:'} {khasraText}</span>
                  <span>•</span>
                  <span>{isHindi ? 'मृदा:' : isPunjabi ? 'ਮਿੱਟੀ:' : 'Soil:'} {soilTypeText}</span>
                </div>
              </div>

              {/* Health Score Pill */}
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-sm shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 font-semibold uppercase">
                    {isHindi ? 'समग्र स्वास्थ्य' : isPunjabi ? 'ਸਮੁੱਚੀ ਸਿਹਤ' : 'Overall Health'}
                  </div>
                  <div className="text-sm font-bold text-emerald-700">{overallHealthText}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                  {report.overallScore}
                </div>
              </div>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
              <div>
                <span className="text-gray-500 block">
                  {isHindi ? 'लक्ष्य फसल:' : isPunjabi ? 'ਨਿਸ਼ਾਨਾ ਫ਼ਸਲ:' : 'Planned Crop:'}
                </span>
                <span className="font-semibold text-gray-800">{cropPlannedText}</span>
              </div>
              <div>
                <span className="text-gray-500 block">
                  {isHindi ? 'नमूना तिथि:' : isPunjabi ? 'ਸੈਂਪਲ ਮਿਤੀ:' : 'Sample Date:'}
                </span>
                <span className="font-semibold text-gray-800">{report.collectionDate}</span>
              </div>
              <div>
                <span className="text-gray-500 block">
                  {isHindi ? 'प्रयोगशाला:' : isPunjabi ? 'ਲੈਬਾਰਟਰੀ:' : 'Testing Lab:'}
                </span>
                <span className="font-semibold text-gray-800 truncate block">{report.labName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">
                  {isHindi ? 'मान्यता:' : isPunjabi ? 'ਮਾਨਤਾ:' : 'Accreditation:'}
                </span>
                <span className="font-semibold text-emerald-700">{report.labLicense.split('/')[0]}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Chemical & Nutrient Analysis Table */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isHindi
                      ? '1. रासायनिक व पोषक तत्व परीक्षण परिणाम (Nutrient Test Results)'
                      : isPunjabi
                      ? '1. ਰਸਾਇਣਕ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤ ਪਰਖ ਨਤੀਜੇ'
                      : '1. Chemical & Nutrient Analysis Results'}
                  </span>
                </h4>
                <p className="text-xs text-gray-500">
                  {isHindi
                    ? 'मिट्टी में मौजूद 10 मुख्य और सूक्ष्म पोषक तत्वों की मात्रा'
                    : isPunjabi
                    ? 'ਮਿੱਟੀ ਵਿੱਚ ਮੌਜੂਦ 10 ਮੁੱਖ ਅਤੇ ਸੂਖਮ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਮਾਤਰਾ'
                    : '10 primary and micronutrient levels analyzed in soil sample'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-emerald-50/80 text-emerald-950 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">
                      {isHindi ? 'पोषक तत्व (Parameter)' : isPunjabi ? 'ਪੋਸ਼ਕ ਤੱਤ' : 'Nutrient / Parameter'}
                    </th>
                    <th className="py-2.5 px-3">
                      {isHindi ? 'जांच मान (Found)' : isPunjabi ? 'ਪਰਖ ਮੁੱਲ' : 'Found Value'}
                    </th>
                    <th className="py-2.5 px-3">
                      {isHindi ? 'सामान्य सीमा (Optimal Range)' : isPunjabi ? 'ਆਮ ਸੀਮਾ' : 'Optimal Range'}
                    </th>
                    <th className="py-2.5 px-3">
                      {isHindi ? 'स्थिति (Status)' : isPunjabi ? 'ਸਥਿਤੀ' : 'Status'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {report.parameters.map((param, i) => {
                    const st = getStatusLabel(param.status);
                    const paramTitle = isHindi ? param.nameHi : isPunjabi ? param.namePa : param.nameEn;
                    const paramSub = isHindi ? param.nameEn : isPunjabi ? param.nameEn : '';
                    return (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-gray-800">
                          <div>{paramTitle}</div>
                          {paramSub && <div className="text-[11px] text-gray-500">{paramSub}</div>}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-gray-900">
                          {param.value} <span className="font-normal text-xs text-gray-500">{param.unit}</span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-600">
                          {param.normalRange}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${st.bg} ${st.text} ${st.border}`}>
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Fertilizer & Nutrient Recommendation */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sprout className="w-5 h-5 text-amber-700" />
              <h4 className="text-sm sm:text-base font-bold text-amber-950">
                {isHindi
                  ? `2. खाद व उर्वरक संस्तुति (${cropPlannedText} हेतु)`
                  : isPunjabi
                  ? `2. ਖਾਦ ਤੇ ਉਰਵਰਕ ਸਿਫਾਰਸ਼ (${cropPlannedText} ਲਈ)`
                  : `2. Fertilizer & Nutrient Recommendations for ${cropPlannedText}`}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {report.recommendations.map((rec, i) => {
                const fertName = rec.fertilizer[langKey] || rec.fertilizer.english;
                const doseText = rec.dosage[langKey] || rec.dosage.english;
                const timeText = rec.timing[langKey] || rec.timing.english;
                return (
                  <div key={i} className="bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="font-bold text-sm text-gray-900">{fertName}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded-md">
                        {doseText}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      ⏱ <strong>{isHindi ? 'समय:' : isPunjabi ? 'ਸਮਾਂ:' : 'Timing:'}</strong> {timeText}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Organic Remedies */}
            <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/80">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                🌿 {isHindi ? 'जैविक सुधार व सावधानियां (Organic Recommendations):' : isPunjabi ? 'ਜੈਵਿਕ ਸੁਧਾਰ ਤੇ ਸਾਵਧਾਨੀਆਂ:' : 'Organic Recommendations & Soil Amendments:'}
              </div>
              <ul className="space-y-1.5 text-xs text-gray-700 list-disc list-inside">
                {report.organicRemedies.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip[langKey] || tip.english}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Agronomist Notes & Verification Stamp */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-gray-700">
              <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                👨‍🔬 {isHindi ? 'कृषि वैज्ञानिक समीक्षा (Senior Agronomist Remark):' : isPunjabi ? 'ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਸਮੀਖਿਆ:' : 'Senior Agronomist Expert Advisory:'}
              </div>
              <p className="leading-relaxed">{agronomistNotesText}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between items-center text-center text-xs">
              <div>
                <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <div className="font-bold text-gray-900">
                  {isHindi ? 'डिजिटल प्रमाणित रिपोर्ट' : isPunjabi ? 'ਡਿਜੀਟਲ ਪ੍ਰਮਾਣਿਤ ਰਿਪੋਰਟ' : 'Digitally Certified Report'}
                </div>
                <div className="text-[11px] text-gray-500">NextGen Kisan Lab Network</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 w-full text-[10px] text-gray-400">
                Sign: <i>Dr. S. K. Rathore (Lab Incharge)</i>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-200 p-3.5 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <div className="text-xs text-gray-500 text-center sm:text-left">
            💡 {isHindi
              ? 'इस रिपोर्ट को डाउनलोड कर के अपने पास सुरक्षित रखें अथवा कृषि सेवा केंद्र पर दिखाएं।'
              : isPunjabi
              ? 'ਇਸ ਰਿਪੋਰਟ ਨੂੰ ਡਾਊਨਲੋਡ ਕਰਕੇ ਆਪਣੇ ਕੋਲ ਸੰਭਾਲੋ ਜਾਂ ਖੇਤੀ ਸੇਵਾ ਕੇਂਦਰ ਵਿਖੇ ਦਿਖਾਓ।'
              : 'Download and keep this official report for fertilizer subsidies or agricultural centre visits.'}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              {isHindi ? 'बंद करें' : isPunjabi ? 'ਬੰਦ ਕਰੋ' : 'Close'}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex-1 sm:flex-initial px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? (isHindi ? 'डाउनलोड हो रहा है...' : 'Downloading...') : (isHindi ? 'आधिकारिक PDF डाउनलोड' : isPunjabi ? 'ਅਧਿਕਾਰਤ PDF ਡਾਊਨਲੋਡ' : 'Download Official PDF')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilReportModal;
