import React, { useState } from 'react';
import { X, Download, Printer, Share2, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Calendar, MapPin, User, Award, ArrowDownToLine, Sparkles, Sprout } from 'lucide-react';
import { jsPDF } from 'jspdf';

export interface SoilReportData {
  id: string;
  sampleNo: string;
  farmerName: string;
  fatherName?: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  khasraNo: string;
  soilType: string;
  cropPlanned: string;
  collectionDate: string;
  testingDate: string;
  labName: string;
  labLicense: string;
  overallHealth: 'Optimal' | 'Moderate' | 'Deficient';
  overallScore: number;
  parameters: {
    name: string;
    hindiName: string;
    value: string;
    unit: string;
    status: 'low' | 'medium' | 'optimal' | 'high';
    normalRange: string;
  }[];
  recommendations: {
    fertilizer: string;
    dosage: string;
    timing: string;
  }[];
  organicRemedies: string[];
  agronomistNotes: string;
}

export const sampleSoilReports: SoilReportData[] = [
  {
    id: 'SR-2025-01',
    sampleNo: 'NGK-SOIL-2025-08492',
    farmerName: 'Rajesh Kumar Patel',
    fatherName: 'Ramswaroop Patel',
    phone: '+91 98765 43210',
    village: 'Kothpura, Bichhiwara',
    district: 'Dungarpur',
    state: 'Rajasthan',
    khasraNo: 'Khasra No. 142/3 (Field A)',
    soilType: 'Sandy Loam (बलुई दोमट)',
    cropPlanned: 'Wheat (गेहूं - HD 2967)',
    collectionDate: '12 Jan 2025',
    testingDate: '14 Jan 2025',
    labName: 'AgriTech Regional Soil Testing Lab',
    labLicense: 'NABL-TC-8492 / ISO 9001:2015',
    overallHealth: 'Moderate',
    overallScore: 78,
    parameters: [
      { name: 'Soil pH (Reaction)', hindiName: 'पी.एच (अम्लीयता/क्षारीयता)', value: '7.4', unit: 'pH', status: 'optimal', normalRange: '6.5 - 7.5' },
      { name: 'Electrical Cond. (EC)', hindiName: 'विद्युत चालकता (लवणता)', value: '0.42', unit: 'dS/m', status: 'optimal', normalRange: '< 1.0 dS/m' },
      { name: 'Organic Carbon (OC)', hindiName: 'जैविक कार्बन', value: '0.52', unit: '%', status: 'medium', normalRange: '0.50 - 0.75%' },
      { name: 'Available Nitrogen (N)', hindiName: 'उपलब्ध नाइट्रोजन', value: '210', unit: 'kg/ha', status: 'low', normalRange: '280 - 560 kg/ha' },
      { name: 'Available Phosphorus (P)', hindiName: 'उपलब्ध फास्फोरस', value: '18.4', unit: 'kg/ha', status: 'medium', normalRange: '10 - 25 kg/ha' },
      { name: 'Available Potassium (K)', hindiName: 'उपलब्ध पोटाश', value: '290', unit: 'kg/ha', status: 'high', normalRange: '110 - 280 kg/ha' },
      { name: 'Available Zinc (Zn)', hindiName: 'जिंक (जस्ता)', value: '0.45', unit: 'ppm', status: 'low', normalRange: '> 0.60 ppm' },
      { name: 'Available Sulphur (S)', hindiName: 'सल्फर (गंधक)', value: '8.8', unit: 'ppm', status: 'low', normalRange: '10 - 20 ppm' },
      { name: 'Available Iron (Fe)', hindiName: 'आयरन (लोहा)', value: '5.4', unit: 'ppm', status: 'optimal', normalRange: '> 4.5 ppm' },
      { name: 'Available Boron (B)', hindiName: 'बोरॉन', value: '0.55', unit: 'ppm', status: 'optimal', normalRange: '> 0.50 ppm' },
    ],
    recommendations: [
      { fertilizer: 'Urea (यूरिया)', dosage: '45 kg / acre', timing: '2 समान भागों में: पहला बुवाई के 21 दिन बाद, दूसरा कल्ले फूटते समय' },
      { fertilizer: 'DAP (डाई अमोनियम फास्फेट)', dosage: '30 kg / acre', timing: 'बुवाई के समय आखिरी जुताई में (Basal Dose)' },
      { fertilizer: 'Zinc Sulphate (21%)', dosage: '5 kg / acre', timing: 'बुवाई के समय, मिट्टी में अच्छी तरह मिलाएं' },
      { fertilizer: 'Bentonite Sulphur (90%)', dosage: '3 kg / acre', timing: 'बुवाई के समय' },
    ],
    organicRemedies: [
      'अच्छी सड़ी गोबर की खाद (FYM) 2 से 3 ट्रॉली प्रति एकड़ जुताई से 15 दिन पहले डालें।',
      'जिंक की कमी दूर करने हेतु 0.5% जिंक सल्फेट + 0.25% बुझे चूने का छिड़काव फसल की 30-35 दिन की अवस्था में करें।',
      'पोटाश की मात्रा मिट्टी में पर्याप्त है, अतिरिक्त म्यूरेट ऑफ पोटाश (MOP) देने की आवश्यकता नहीं है।'
    ],
    agronomistNotes: 'मिट्टी में नाइट्रोजन और जिंक की कमी है। पोटाश का स्तर उत्तम है। संस्तुत मात्रा में जिंक और यूरिया देने से गेहूं की पैदावार में 18-22% तक वृद्धि संभावित है।'
  },
  {
    id: 'SR-2024-02',
    sampleNo: 'NGK-SOIL-2024-07119',
    farmerName: 'Rajesh Kumar Patel',
    fatherName: 'Ramswaroop Patel',
    phone: '+91 98765 43210',
    village: 'Kothpura, Bichhiwara',
    district: 'Dungarpur',
    state: 'Rajasthan',
    khasraNo: 'Khasra No. 138/1 (Field B - Canal Side)',
    soilType: 'Clay Loam (मटियार दोमट)',
    cropPlanned: 'Mustard (सरसों - Giriraj)',
    collectionDate: '28 Oct 2024',
    testingDate: '31 Oct 2024',
    labName: 'Soil Science Center Dungarpur',
    labLicense: 'NABL-TC-6190 / Govt. Approved',
    overallHealth: 'Optimal',
    overallScore: 88,
    parameters: [
      { name: 'Soil pH (Reaction)', hindiName: 'पी.एच (अम्लीयता/क्षारीयता)', value: '7.1', unit: 'pH', status: 'optimal', normalRange: '6.5 - 7.5' },
      { name: 'Electrical Cond. (EC)', hindiName: 'विद्युत चालकता', value: '0.35', unit: 'dS/m', status: 'optimal', normalRange: '< 1.0 dS/m' },
      { name: 'Organic Carbon (OC)', hindiName: 'जैविक कार्बन', value: '0.68', unit: '%', status: 'optimal', normalRange: '0.50 - 0.75%' },
      { name: 'Available Nitrogen (N)', hindiName: 'उपलब्ध नाइट्रोजन', value: '310', unit: 'kg/ha', status: 'optimal', normalRange: '280 - 560 kg/ha' },
      { name: 'Available Phosphorus (P)', hindiName: 'उपलब्ध फास्फोरस', value: '22.1', unit: 'kg/ha', status: 'optimal', normalRange: '10 - 25 kg/ha' },
      { name: 'Available Potassium (K)', hindiName: 'उपलब्ध पोटाश', value: '240', unit: 'kg/ha', status: 'optimal', normalRange: '110 - 280 kg/ha' },
      { name: 'Available Sulphur (S)', hindiName: 'सल्फर (गंधक)', value: '14.2', unit: 'ppm', status: 'optimal', normalRange: '10 - 20 ppm' },
      { name: 'Available Zinc (Zn)', hindiName: 'जिंक (जस्ता)', value: '0.72', unit: 'ppm', status: 'optimal', normalRange: '> 0.60 ppm' },
    ],
    recommendations: [
      { fertilizer: 'Single Super Phosphate (SSP)', dosage: '50 kg / acre', timing: 'बुवाई के समय (सल्फर और फास्फोरस दोनों की आपूर्ति)' },
      { fertilizer: 'Urea (यूरिया)', dosage: '35 kg / acre', timing: 'पहली सिंचाई के समय' }
    ],
    organicRemedies: [
      'केंचुआ खाद (Vermicompost) 5 क्विंटल प्रति एकड़ उपयोग करें।',
      'फसल में तेल की मात्रा बढ़ाने के लिए सल्फर का संतुलित उपयोग पर्याप्त है।'
    ],
    agronomistNotes: 'कनाल साइड खेत की मिट्टी की उर्वरता उत्कृष्ट है। सरसों की बंपर पैदावार की उच्च संभावना है।'
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
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

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
      doc.text('OFFICIAL SOIL HEALTH CARD / मृदा स्वास्थ्य कार्ड', 105, 19, { align: 'center' });

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
      doc.text(`Overall Score: ${report.overallScore}/100 (${report.overallHealth})`, 140, 42);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`Farmer Name: ${report.farmerName}`, 16, 48);
      doc.text(`Mobile: ${report.phone}`, 110, 48);
      doc.text(`Village/Dist: ${report.village}, ${report.district}`, 16, 54);
      doc.text(`Field Survey: ${report.khasraNo}`, 110, 54);
      doc.text(`Soil Type: ${report.soilType}`, 16, 60);
      doc.text(`Test Date: ${report.testingDate}`, 110, 60);

      // Section Title: Parameters
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(22, 101, 52);
      doc.text('1. CHEMICAL & NUTRIENT ANALYSIS / पोषक तत्व विश्लेषण', 12, 68);

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
      doc.text('Value Found', 80, y + 5);
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
        doc.text(param.name, 16, y + 4.5);
        doc.text(`${param.value} ${param.unit}`, 80, y + 4.5);
        doc.text(param.normalRange, 115, y + 4.5);

        // Status badge color
        if (param.status === 'optimal' || param.status === 'medium') {
          doc.setTextColor(22, 101, 52);
          doc.text(`[ OK ] ${param.status.toUpperCase()}`, 155, y + 4.5);
        } else if (param.status === 'low') {
          doc.setTextColor(185, 28, 28);
          doc.text(`[ ! ] DEFICIENT / LOW`, 155, y + 4.5);
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
      doc.text(`2. FERTILIZER RECOMMENDATIONS FOR ${report.cropPlanned.toUpperCase()}`, 12, y);

      y += 4;
      report.recommendations.forEach((rec) => {
        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`• ${rec.fertilizer}: ${rec.dosage}`, 16, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(71, 85, 105);
        doc.text(`  (${rec.timing})`, 16, y + 4);
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
      doc.text(report.agronomistNotes, 16, y, { maxWidth: 180 });

      // Verification Box & Signatures
      y = 262;
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(12, y, 186, 24, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('QR VERIFIED / डिजिटल सत्यापन', 16, y + 6);
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
        text: `Check out the Soil Health Card report for ${report.khasraNo}. Health Score: ${report.overallScore}/100.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'उत्तम (Optimal)' };
      case 'medium':
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'मध्यम (Medium)' };
      case 'low':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'न्यून (Low)' };
      case 'high':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'अधिक (High)' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', label: 'सामान्य' };
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
                <h2 className="text-base sm:text-lg font-bold">मृदा स्वास्थ्य कार्ड (Soil Health Card)</h2>
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
              <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
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
              <span>Report link copied to clipboard!</span>
            </div>
          )}

          {/* Farmer & Sample Summary Banner */}
          <div className="bg-gradient-to-br from-emerald-50/80 via-white to-green-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-emerald-100">
              <div>
                <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> NextGen Kisan Certified Soil Report
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">{report.farmerName}</h3>
                <div className="text-xs text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {report.village}, {report.district}
                  </span>
                  <span>•</span>
                  <span>खेत: {report.khasraNo}</span>
                  <span>•</span>
                  <span>मृदा प्रकार: {report.soilType}</span>
                </div>
              </div>

              {/* Health Score Pill */}
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-sm shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 font-semibold uppercase">Overall Health</div>
                  <div className="text-sm font-bold text-emerald-700">{report.overallHealth} (उत्तम)</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                  {report.overallScore}
                </div>
              </div>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
              <div>
                <span className="text-gray-500 block">लक्ष्य फसल (Planned):</span>
                <span className="font-semibold text-gray-800">{report.cropPlanned}</span>
              </div>
              <div>
                <span className="text-gray-500 block">नमूना तिथि (Sampled):</span>
                <span className="font-semibold text-gray-800">{report.collectionDate}</span>
              </div>
              <div>
                <span className="text-gray-500 block">जांच प्रयोगशाला (Lab):</span>
                <span className="font-semibold text-gray-800 truncate block">{report.labName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">मान्यता (License):</span>
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
                  1. रासायनिक व पोषक तत्व परीक्षण परिणाम (Nutrient Test Results)
                </h4>
                <p className="text-xs text-gray-500">मिट्टी में मौजूद 10 मुख्य और सूक्ष्म पोषक तत्वों की मात्रा</p>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-emerald-50/80 text-emerald-950 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">पोषक तत्व (Parameter)</th>
                    <th className="py-2.5 px-3">जांच मान (Found)</th>
                    <th className="py-2.5 px-3">सामान्य सीमा (Optimal Range)</th>
                    <th className="py-2.5 px-3">स्थिति (Status)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {report.parameters.map((param, i) => {
                    const st = getStatusColor(param.status);
                    return (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-gray-800">
                          <div>{param.name}</div>
                          <div className="text-[11px] text-gray-500">{param.hindiName}</div>
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
                2. खाद व उर्वरक संस्तुति (Fertilizer Dosing for {report.cropPlanned})
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {report.recommendations.map((rec, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="font-bold text-sm text-gray-900">{rec.fertilizer}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded-md">
                      {rec.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    ⏱ <strong>समय:</strong> {rec.timing}
                  </p>
                </div>
              ))}
            </div>

            {/* Organic Remedies */}
            <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/80">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                🌿 जैविक सुधार व सावधानियां (Organic Recommendations):
              </div>
              <ul className="space-y-1.5 text-xs text-gray-700 list-disc list-inside">
                {report.organicRemedies.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Agronomist Notes & Verification Stamp */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-gray-700">
              <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                👨‍🔬 कृषि वैज्ञानिक समीक्षा (Senior Agronomist Remark):
              </div>
              <p className="leading-relaxed">{report.agronomistNotes}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between items-center text-center text-xs">
              <div>
                <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <div className="font-bold text-gray-900">डिजिटल प्रमाणित रिपोर्ट</div>
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
            💡 इस रिपोर्ट को डाउनलोड कर के अपने पास सुरक्षित रखें अथवा कृषि सेवा केंद्र पर दिखाएं।
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex-1 sm:flex-initial px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Downloading...' : 'Download Official PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilReportModal;
