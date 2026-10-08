import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Stethoscope, Clock, CheckCircle, X, MapPin, Phone, Eye,
  AlertTriangle, Calendar, ShieldCheck, FileText, Sparkles,
  Search, Filter, Activity, Thermometer, Syringe, Pill,
  Star, User, Bell, ArrowRight, Share2, Printer,
  IndianRupee, ChevronRight, Check, Heart, Flame,
  Download, Navigation
} from 'lucide-react';

interface PrescriptionItem {
  name: string;
  form: string; // 'Injection' | 'Bolus' | 'Syrup' | 'Ointment' | 'Powder'
  dosage: string;
  route: string; // 'IM' | 'IV' | 'SC' | 'Oral' | 'Topical'
  duration: string;
}

interface VetRequest {
  id: string;
  farmerName: string;
  farmLocation: string;
  distance: string;
  animalType: string; // 'Cattle (Cow)' | 'Cattle (Buffalo)' | 'Goat/Sheep' | 'Poultry' | 'Other'
  breed: string;
  tagId: string;
  age: string;
  herdSize: number;
  issue: string;
  symptoms: string[];
  urgency: 'Normal' | 'Urgent' | 'Emergency';
  requestDate: string;
  preferredTime: string;
  status: 'pending' | 'accepted' | 'in-treatment' | 'completed';
  phone: string;
  vitals?: {
    temp: string;
    rumination?: string;
    respiration?: string;
    heartRate?: string;
  };
  scheduledDate?: string;
  scheduledTime?: string;
  acceptedDate?: string;
  completionDate?: string;
  consultationFee?: number;
  diagnosis?: string;
  prescriptions?: PrescriptionItem[];
  treatmentNotes?: string;
  doctorNotes?: string;
  followUpDate?: string;
  vaccinationStatus?: string;
}

const initialVetRequests: VetRequest[] = [
  {
    id: 'VR-101',
    farmerName: 'Rajesh Kumar',
    farmLocation: 'Village Kothpura, Dungarpur',
    distance: '3.8 km',
    animalType: 'Cattle (Cow)',
    breed: 'Sahiwal Cross',
    tagId: 'RJ-DNG-8492',
    age: '4.5 Years',
    herdSize: 6,
    issue: 'Cow is showing high fever (104.2°F), lethargy, and sudden drop in milk yield from 12L to 3L. Feed intake reduced drastically since yesterday.',
    symptoms: ['High Fever (104.2°F)', 'Severe Anorexia', 'Milk Drop 75%', 'Dry Muzzle', 'Dull Demeanor'],
    urgency: 'Urgent',
    requestDate: '2025-01-15',
    preferredTime: 'Morning (08:00 AM - 11:00 AM)',
    status: 'pending',
    phone: '9876543210',
    vitals: {
      temp: '104.2°F',
      rumination: 'Sluggish (1/2 min)',
      respiration: '28 breaths/min'
    },
    vaccinationStatus: 'FMD Done (6 mo ago), HS-BQ Pending'
  },
  {
    id: 'VR-102',
    farmerName: 'Sunita Devi',
    farmLocation: 'Saheli Village, Dungarpur',
    distance: '6.4 km',
    animalType: 'Goat/Sheep',
    breed: 'Sirohi Breed',
    tagId: 'RJ-DNG-3105',
    age: '2 Years',
    herdSize: 14,
    issue: '4 goats in flock showing acute respiratory wheezing, continuous frothy nasal discharge, and shivering. One goat unable to stand.',
    symptoms: ['Respiratory Wheezing', 'Frothy Nasal Discharge', 'Severe Shivering', 'Recumbency', 'High Mortality Risk'],
    urgency: 'Emergency',
    requestDate: '2025-01-15',
    preferredTime: 'Immediate Emergency Visit',
    status: 'pending',
    phone: '9876543211',
    vitals: {
      temp: '105.0°F',
      rumination: 'Absent',
      respiration: '44 breaths/min'
    },
    vaccinationStatus: 'PPR Vaccinated, Enterotoxemia Due'
  },
  {
    id: 'VR-103',
    farmerName: 'Ramesh Patel',
    farmLocation: 'Gamdi Ahada, Dungarpur',
    distance: '4.1 km',
    animalType: 'Cattle (Cow)',
    breed: 'Gir Heifer',
    tagId: 'RJ-DNG-5520',
    age: '3 Years (First Calving)',
    herdSize: 8,
    issue: 'Dystocia / Prolonged labor for over 5 hours without calf emergence. Water bag ruptured 3 hours ago. Heifer exhausted and in severe pain.',
    symptoms: ['Prolonged Labor (>5 hrs)', 'Exhaustion & Straining', 'Ruptured Water Bag', 'Malpresentation Suspected'],
    urgency: 'Emergency',
    requestDate: '2025-01-15',
    preferredTime: 'Critical Emergency (Right Now)',
    status: 'pending',
    phone: '9876543217',
    vitals: {
      temp: '102.1°F',
      rumination: 'Suspended',
      heartRate: '92 bpm (Tachycardia)'
    },
    vaccinationStatus: 'Fully Vaccinated'
  },
  {
    id: 'VR-104',
    farmerName: 'Mohan Singh',
    farmLocation: 'Bichhiwara, Dungarpur',
    distance: '5.2 km',
    animalType: 'Cattle (Buffalo)',
    breed: 'Murrah Buffalo',
    tagId: 'RJ-DNG-9014',
    age: '6 Years',
    herdSize: 5,
    issue: '6th month pregnancy checkup and clinical examination for post-calving calcium deficiency. Mild stiffness in hind legs when getting up.',
    symptoms: ['Pregnancy Confirmation', 'Hindlimb Stiffness', 'Mild Hypocalcemia Signs', 'Lactation Advice Needed'],
    urgency: 'Normal',
    requestDate: '2025-01-14',
    preferredTime: 'Morning (09:30 AM - 11:30 AM)',
    status: 'accepted',
    phone: '9876543212',
    acceptedDate: '2025-01-14',
    scheduledDate: '2025-01-16',
    scheduledTime: '09:30 AM',
    consultationFee: 350,
    vitals: {
      temp: '101.4°F (Normal)',
      rumination: 'Normal (3/2 min)',
      heartRate: '60 bpm'
    },
    doctorNotes: 'Carrying ultrasound probe & Calcium Borogluconate bottles in field kit.',
    vaccinationStatus: 'Up to Date'
  },
  {
    id: 'VR-105',
    farmerName: 'Vikram Meena',
    farmLocation: 'Sagwara, Dungarpur',
    distance: '8.5 km',
    animalType: 'Cattle (Cow)',
    breed: 'Holstein Friesian Cross',
    tagId: 'RJ-DNG-4421',
    age: '5 Years',
    herdSize: 11,
    issue: 'Acute clinical mastitis in right hind quarter. Swollen, inflamed udder with curdled yellowish milk clots and localized heat.',
    symptoms: ['Udder Swelling', 'Curdled Milk Clots', 'Localized Heat & Pain', 'Milk Yield Down 60%'],
    urgency: 'Urgent',
    requestDate: '2025-01-13',
    preferredTime: 'Afternoon',
    status: 'in-treatment',
    phone: '9876543215',
    acceptedDate: '2025-01-13',
    scheduledDate: '2025-01-14',
    consultationFee: 400,
    diagnosis: 'Acute Coliform Mastitis (Right Hind Quarter)',
    treatmentNotes: 'Day 2 of 5: Quarter swelling decreased by 35%. Milk clots thinning out. Continuing intramammary infusion course.',
    prescriptions: [
      { name: 'Cephalosporin Intramammary Infusion', form: 'Infusion Tube', dosage: '1 tube every 12 hrs', route: 'Intramammary', duration: '5 Days' },
      { name: 'Meloxicam + Paracetamol (Melonex Plus)', form: 'Bolus', dosage: '2 boluses twice daily', route: 'Oral', duration: '3 Days' },
      { name: 'Trisodium Citrate Powder (Mastilep)', form: 'Powder', dosage: '30g daily in feed', route: 'Oral', duration: '7 Days' }
    ],
    vitals: {
      temp: '102.6°F',
      rumination: 'Moderate',
      respiration: '24 breaths/min'
    },
    followUpDate: '2025-01-18'
  },
  {
    id: 'VR-106',
    farmerName: 'Priya Sharma',
    farmLocation: 'Aspur, Dungarpur',
    distance: '11.2 km',
    animalType: 'Poultry',
    breed: 'Kadaknath & Country Broilers',
    tagId: 'RJ-DNG-FLOCK-12',
    age: '8 Weeks',
    herdSize: 85,
    issue: 'Sudden respiratory sounds and 6 birds found dead in coop within 48 hours. Water consumption depressed.',
    symptoms: ['Sudden Flock Mortality', 'Gasping / Rales', 'Facial Swelling', 'Greenish Diarrhea'],
    urgency: 'Emergency',
    requestDate: '2025-01-10',
    preferredTime: 'Urgent On-Site Flock Inspection',
    status: 'completed',
    phone: '9876543213',
    completionDate: '2025-01-12',
    consultationFee: 500,
    diagnosis: 'Chronic Respiratory Disease (CRD) with Secondary E. coli Septicemia. Ruled out Newcastle Disease.',
    treatmentNotes: 'Disinfected entire coop with Virkon-S mist spray. Initiated flock drinking water medication.',
    prescriptions: [
      { name: 'Enrofloxacin 10% Oral Solution', form: 'Liquid Solution', dosage: '1 ml per 1 liter drinking water', route: 'Oral (Water)', duration: '5 Days' },
      { name: 'Vitamin AD3E + Selenium (Vimeral)', form: 'Liquid', dosage: '10 ml per 100 birds daily', route: 'Oral (Water)', duration: '7 Days' },
      { name: 'Potassium Permanganate Footbath Dip', form: 'Powder', dosage: '1:1000 pink solution at entry', route: 'Topical', duration: '14 Days' }
    ],
    doctorNotes: 'Zero further mortality reported on Day 3. Flock fully recovered and bio-security checklist provided.',
    followUpDate: '2025-01-20'
  },
  {
    id: 'VR-107',
    farmerName: 'Suresh Dangi',
    farmLocation: 'Bichhiwara, Dungarpur',
    distance: '3.2 km',
    animalType: 'Cattle (Bullock)',
    breed: 'Kankrej Draft Bullock',
    tagId: 'RJ-DNG-6719',
    age: '7 Years',
    herdSize: 4,
    issue: 'Deep horn base trauma with foul smell and maggot infestation following an accidental hit against wooden cart shaft.',
    symptoms: ['Deep Horn Wound', 'Maggot Infestation (Myiasis)', 'Foul Smelling Exudate', 'Pain on Movement'],
    urgency: 'Urgent',
    requestDate: '2025-01-08',
    preferredTime: 'Morning',
    status: 'completed',
    phone: '9876543216',
    completionDate: '2025-01-09',
    consultationFee: 300,
    diagnosis: 'Traumatic Cutaneous Myiasis at Base of Left Horn with Secondary Cellulitis.',
    treatmentNotes: 'Sedation administered. Mechanical extraction of 38+ maggots using eucalyptus and turpentine plug. Wound debrided, packed with sterile gauze.',
    prescriptions: [
      { name: 'Procaine Penicillin 30 Lac IU (Dicrysticin)', form: 'Vial Injection', dosage: '1 vial deep IM daily', route: 'IM', duration: '3 Days' },
      { name: 'Ivermectin 1% (Neomec)', form: 'Subcutaneous Inj', dosage: '7 ml single dose under skin', route: 'SC', duration: 'Single Dose' },
      { name: 'Topicure Herbal Maggot Spray', form: 'Aerosol Spray', dosage: 'Spray twice daily on wound', route: 'Topical', duration: '7 Days' },
      { name: 'Tetanus Toxoid (5 ml)', form: 'Injection', dosage: 'Single dose', route: 'IM', duration: 'Immediate' }
    ],
    doctorNotes: 'Healthy granulation tissue formation observed. Bullock resumed light farm work.',
    followUpDate: '2025-01-16'
  }
];

const VetDashboard: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<VetRequest[]>(initialVetRequests);
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'in-treatment' | 'completed' | 'emergency'>('pending');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [activeModal, setActiveModal] = useState<'details' | 'schedule' | 'prescribe' | 'certificate' | 'call' | 'kit' | null>(null);
  const [activeRequest, setActiveRequest] = useState<VetRequest | null>(null);

  // Schedule modal form state
  const [scheduleDate, setScheduleDate] = useState('2025-01-16');
  const [scheduleTime, setScheduleTime] = useState('09:30 AM');
  const [scheduleFee, setScheduleFee] = useState('300');
  const [scheduleAdvice, setScheduleAdvice] = useState('');

  // Prescription modal form state
  const [diagInput, setDiagInput] = useState('');
  const [treatmentNotesInput, setTreatmentNotesInput] = useState('');
  const [followUpInput, setFollowUpInput] = useState('2025-01-22');
  const [rxList, setRxList] = useState<PrescriptionItem[]>([
    { name: '', form: 'Injection', dosage: '', route: 'IM', duration: '3 Days' }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered requests computation
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      // Tab filter
      if (selectedTab === 'emergency') {
        if (req.urgency !== 'Emergency') return false;
      } else {
        if (req.status !== selectedTab) return false;
      }

      // Species filter
      if (selectedSpecies !== 'all') {
        if (!req.animalType.toLowerCase().includes(selectedSpecies.toLowerCase())) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = req.farmerName.toLowerCase().includes(query);
        const matchesLocation = req.farmLocation.toLowerCase().includes(query);
        const matchesTag = req.tagId.toLowerCase().includes(query);
        const matchesBreed = req.breed.toLowerCase().includes(query);
        const matchesIssue = req.issue.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesTag && !matchesBreed && !matchesIssue) {
          return false;
        }
      }

      return true;
    });
  }, [requests, selectedTab, selectedSpecies, searchQuery]);

  // Dynamic statistics
  const stats = useMemo(() => {
    const pendingCount = requests.filter(r => r.status === 'pending').length;
    const acceptedCount = requests.filter(r => r.status === 'accepted').length;
    const inTreatmentCount = requests.filter(r => r.status === 'in-treatment').length;
    const completedCount = requests.filter(r => r.status === 'completed').length;
    const emergencyCount = requests.filter(r => r.urgency === 'Emergency' && r.status !== 'completed').length;
    const totalTodayEarnings = requests
      .filter(r => r.status === 'completed' || r.status === 'in-treatment')
      .reduce((sum, r) => sum + (r.consultationFee || 250), 0);

    return {
      pending: pendingCount,
      accepted: acceptedCount,
      inTreatment: inTreatmentCount,
      completed: completedCount,
      emergency: emergencyCount,
      earnings: totalTodayEarnings
    };
  }, [requests]);

  // Action handlers
  const handleOpenScheduleModal = (req: VetRequest) => {
    setActiveRequest(req);
    setScheduleDate(new Date().toISOString().split('T')[0]);
    setScheduleTime(req.preferredTime.includes('Morning') ? '09:00 AM' : '02:30 PM');
    setScheduleFee('300');
    setScheduleAdvice('Isolate animal in dry, shaded pen. Keep fresh clean water available.');
    setActiveModal('schedule');
  };

  const handleConfirmSchedule = () => {
    if (!activeRequest) return;
    setRequests(prev => prev.map(r => {
      if (r.id === activeRequest.id) {
        return {
          ...r,
          status: 'accepted',
          acceptedDate: new Date().toISOString().split('T')[0],
          scheduledDate: scheduleDate,
          scheduledTime: scheduleTime,
          consultationFee: parseInt(scheduleFee) || 300,
          doctorNotes: scheduleAdvice
        };
      }
      return r;
    }));
    setActiveModal(null);
    showToast(`Visit scheduled for ${activeRequest.farmerName} on ${scheduleDate} at ${scheduleTime}! 📅`);
  };

  const handleOpenPrescribeModal = (req: VetRequest) => {
    setActiveRequest(req);
    setDiagInput(req.diagnosis || 'Clinical Bovine Respiratory Infection & Febrile Syndrome');
    setTreatmentNotesInput(req.treatmentNotes || 'Administered broad-spectrum antibiotic and antipyretic. Advised high-protein green fodder and clean water.');
    setFollowUpInput(req.followUpDate || '2025-01-20');
    setRxList(req.prescriptions && req.prescriptions.length > 0 ? req.prescriptions : [
      { name: 'Enrofloxacin 10% (Floxidin)', form: 'Injection', dosage: '15 ml deep IM', route: 'IM', duration: '3 Days' },
      { name: 'Meloxicam + Paracetamol (Melonex)', form: 'Injection', dosage: '15 ml IM', route: 'IM', duration: '2 Days' },
      { name: 'Liver Tonic + B-Complex (Belamyl)', form: 'Injection', dosage: '10 ml IM', route: 'IM', duration: '3 Days' }
    ]);
    setActiveModal('prescribe');
  };

  const handleSavePrescription = (markCompleted: boolean = false) => {
    if (!activeRequest) return;
    const validRx = rxList.filter(item => item.name.trim() !== '');

    setRequests(prev => prev.map(r => {
      if (r.id === activeRequest.id) {
        return {
          ...r,
          status: markCompleted ? 'completed' : 'in-treatment',
          diagnosis: diagInput,
          treatmentNotes: treatmentNotesInput,
          prescriptions: validRx,
          followUpDate: followUpInput,
          completionDate: markCompleted ? new Date().toISOString().split('T')[0] : r.completionDate
        };
      }
      return r;
    }));
    setActiveModal(null);
    showToast(markCompleted
      ? `Case ${activeRequest.id} marked Completed! Digital Rx & Certificate ready. 📜`
      : `Prescription saved & Case updated to In-Treatment! 💉`
    );
  };

  const handleRejectRequest = (requestId: string) => {
    const reason = window.prompt('Please enter reason for declining this visit request (e.g. out of service radius, emergency conflict):', 'Doctor currently deployed in emergency calving operation.');
    if (reason) {
      setRequests(prev => prev.filter(r => r.id !== requestId));
      showToast(`Request ${requestId} declined. Farmer notified with reason: "${reason}".`);
    }
  };

  const handleOpenCertificate = (req: VetRequest) => {
    setActiveRequest(req);
    setActiveModal('certificate');
  };

  const handleOpenDetails = (req: VetRequest) => {
    setActiveRequest(req);
    setActiveModal('details');
  };

  const handleSimulateCall = (req: VetRequest) => {
    setActiveRequest(req);
    setActiveModal('call');
  };

  const getAnimalEmoji = (type: string) => {
    if (type.includes('Cow')) return '🐄';
    if (type.includes('Buffalo')) return '🐃';
    if (type.includes('Goat') || type.includes('Sheep')) return '🐐';
    if (type.includes('Poultry')) return '🐔';
    if (type.includes('Bullock')) return '🐂';
    return '🐴';
  };

  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case 'Emergency':
        return {
          bg: '#fee2e2',
          text: '#dc2626',
          border: '#fca5a5',
          label: '🚨 Emergency (SOS)',
          badgeColor: '#ef4444'
        };
      case 'Urgent':
        return {
          bg: '#fff7ed',
          text: '#c2410c',
          border: '#fed7aa',
          label: '⚠️ Urgent Visit',
          badgeColor: '#f97316'
        };
      default:
        return {
          bg: '#f0fdf4',
          text: '#15803d',
          border: '#bbf7d0',
          label: '✅ Routine Care',
          badgeColor: '#22c55e'
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending Review', bg: '#fef3c7', text: '#92400e', border: '#fde68a', icon: Clock };
      case 'accepted':
        return { label: 'Visit Scheduled', bg: '#ede9fe', text: '#6d28d9', border: '#ddd6fe', icon: Calendar };
      case 'in-treatment':
        return { label: 'In Treatment', bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe', icon: Activity };
      case 'completed':
        return { label: 'Completed & Healed', bg: '#dcfce7', text: '#166534', border: '#bbf7d0', icon: CheckCircle };
      default:
        return { label: status, bg: '#f3f4f6', text: '#374151', border: '#e5e7eb', icon: FileText };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: '#1e1b4b',
          color: 'white',
          padding: '0.875rem 1.25rem',
          borderRadius: '14px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          border: '1px solid rgba(168,85,247,0.4)',
          animation: 'slideIn 0.3s ease'
        }}>
          <Sparkles style={{ width: '18px', height: '18px', color: '#c084fc' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #3b0764 0%, #581c87 35%, #7c3aed 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        {/* Decorative glass orbs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '260px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
            
            {/* Left: Doctor branding */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Stethoscope style={{ width: '22px', height: '22px', color: '#c4b5fd' }} />
                <span style={{ color: '#c4b5fd', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  VETERINARY DOCTOR & CLINICAL HEALTH PORTAL
                </span>
              </div>

              <h1 style={{ color: 'white', fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Welcome, {user?.name || 'Dr. Priya Sharma'} 🩺
              </h1>

              <p style={{ color: '#e9d5ff', fontSize: '0.975rem', marginBottom: '1rem', maxWidth: '640px' }}>
                🐾 B.V.Sc & A.H. Licensed • Livestock Medicine & Herd Health Specialist • Dungarpur District
              </p>

              {/* Status Badges */}
              <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ background: 'rgba(216,180,254,0.22)', border: '1px solid rgba(216,180,254,0.45)', color: '#f3e8ff', padding: '0.25rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck style={{ width: '14px', height: '14px', color: '#c084fc' }} />
                  VCI Registered: RJ-VET-2019-881
                </span>
                <span style={{ background: 'rgba(253,224,71,0.2)', border: '1px solid rgba(253,224,71,0.4)', color: '#fef08a', padding: '0.25rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Star style={{ width: '14px', height: '14px', fill: '#fef08a', color: '#fef08a' }} />
                  4.9 Rating (142 Farmer Reviews)
                </span>
                
                {/* On-Duty Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOnline(!isOnline);
                    showToast(isOnline ? 'Duty Status: Marked Busy / In Field 🟡' : 'Duty Status: Online & Available for Emergencies 🟢');
                  }}
                  style={{
                    background: isOnline ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)',
                    border: `1px solid ${isOnline ? 'rgba(74,222,128,0.5)' : 'rgba(251,191,36,0.5)'}`,
                    color: isOnline ? '#86efac' : '#fde68a',
                    padding: '0.25rem 0.8rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#4ade80' : '#f59e0b', boxShadow: isOnline ? '0 0 8px #4ade80' : 'none' }} />
                  {isOnline ? '🟢 On-Duty (Ready for Visits)' : '🟡 In-Field Operation'}
                </button>
              </div>
            </div>

            {/* Right: Quick actions and emergency dispatch */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveModal('kit')}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '0.625rem 1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                <Syringe style={{ width: '16px', height: '16px', color: '#c4b5fd' }} />
                <span>Mobile Vet Kit</span>
              </button>

              <div style={{
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.28)',
                borderRadius: '14px',
                padding: '0.75rem 1.1rem',
                backdropFilter: 'blur(10px)',
                textAlign: 'right'
              }}>
                <div style={{ color: '#e9d5ff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em' }}>TODAY'S VISITS</div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem' }}>
                  {stats.accepted + stats.inTreatment} Active
                </div>
                <div style={{ color: stats.emergency > 0 ? '#fca5a5' : '#c4b5fd', fontSize: '0.75rem', fontWeight: 600 }}>
                  {stats.emergency > 0 ? `🚨 ${stats.emergency} Emergency Pending` : 'All Cases Stable'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        
        {/* STATS ROW (Floating slightly over header) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem',
          marginTop: '-1.5rem'
        }}>
          {[
            {
              label: 'Pending Requests',
              value: stats.pending,
              icon: Clock,
              color: '#d97706',
              bg: '#fef3c7',
              tabKey: 'pending' as const,
              sub: 'Awaiting scheduling'
            },
            {
              label: 'Scheduled Visits',
              value: stats.accepted,
              icon: Calendar,
              color: '#7c3aed',
              bg: '#ede9fe',
              tabKey: 'accepted' as const,
              sub: 'Farm visits confirmed'
            },
            {
              label: 'In Treatment',
              value: stats.inTreatment,
              icon: Stethoscope,
              color: '#2563eb',
              bg: '#dbeafe',
              tabKey: 'in-treatment' as const,
              sub: 'Ongoing therapy'
            },
            {
              label: 'Emergency Cases',
              value: stats.emergency,
              icon: Flame,
              color: '#dc2626',
              bg: '#fee2e2',
              tabKey: 'emergency' as const,
              sub: 'Critical livestock'
            },
            {
              label: 'Completed Treatments',
              value: stats.completed,
              icon: CheckCircle,
              color: '#16a34a',
              bg: '#dcfce7',
              tabKey: 'completed' as const,
              sub: 'Full recovery reported'
            },
            {
              label: 'Today Consultations',
              value: `₹${stats.earnings}`,
              icon: IndianRupee,
              color: '#059669',
              bg: '#ecfdf5',
              sub: 'Fees & visit charges'
            }
          ].map((stat, i) => {
            const Icon = stat.icon;
            const tabKey = (stat as any).tabKey;
            const isSelected = tabKey && selectedTab === tabKey;

            return (
              <div
                key={i}
                role={tabKey ? 'button' : undefined}
                tabIndex={tabKey ? 0 : undefined}
                onClick={() => {
                  if (tabKey) {
                    setSelectedTab(tabKey);
                    document.getElementById('vet-requests-panel')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.1rem',
                  boxShadow: isSelected
                    ? '0 10px 25px rgba(124,58,237,0.22)'
                    : '0 4px 18px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  transition: 'all 0.2s',
                  cursor: tabKey ? 'pointer' : 'default',
                  border: isSelected ? '2px solid #7c3aed' : '2px solid transparent',
                  outline: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  if (tabKey && !isSelected) e.currentTarget.style.borderColor = '#d8b4fe';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (tabKey && !isSelected) e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{ background: stat.bg, borderRadius: '12px', padding: '0.625rem', flexShrink: 0 }}>
                  <Icon style={{ width: '22px', height: '22px', color: stat.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 700, marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.675rem', color: '#9ca3af', fontWeight: 500 }}>
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TWO-COLUMN WORKSPACE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 310px', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* LEFT: MAIN REQUESTS & PATIENT CASES */}
          <div>
            <div id="vet-requests-panel" style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              scrollMarginTop: '80px'
            }}>
              
              {/* Tabs Navigation */}
              <div style={{
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                padding: '0 1rem',
                overflowX: 'auto',
                scrollbarWidth: 'none'
              }}>
                {[
                  { key: 'pending', label: 'Pending Visits', count: stats.pending, icon: '🕐' },
                  { key: 'accepted', label: 'Scheduled Visits', count: stats.accepted, icon: '📅' },
                  { key: 'in-treatment', label: 'In Treatment', count: stats.inTreatment, icon: '🩺' },
                  { key: 'emergency', label: 'Emergency / SOS', count: stats.emergency, icon: '🚨' },
                  { key: 'completed', label: 'Completed History', count: stats.completed, icon: '✅' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedTab(tab.key as any)}
                    style={{
                      padding: '1.1rem 1rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      borderBottom: selectedTab === tab.key ? '3px solid #7c3aed' : '3px solid transparent',
                      color: selectedTab === tab.key ? '#7c3aed' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    <span style={{
                      background: selectedTab === tab.key ? '#ede9fe' : '#f3f4f6',
                      color: selectedTab === tab.key ? '#7c3aed' : '#6b7280',
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '9999px',
                      fontWeight: 800
                    }}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Filters Bar: Search & Species Selector */}
              <div style={{
                padding: '1rem 1.25rem',
                background: '#faf5ff',
                borderBottom: '1px solid #f3e8ff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {/* Search Bar */}
                <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
                  <Search style={{ width: '16px', height: '16px', color: '#9ca3af', position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by farmer name, village, tag ID, or symptoms..."
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem 0.55rem 2.25rem',
                      borderRadius: '10px',
                      border: '1px solid #e9d5ff',
                      fontSize: '0.825rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af' }}
                    >
                      <X style={{ width: '14px', height: '14px' }} />
                    </button>
                  )}
                </div>

                {/* Species Pills */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Filter style={{ width: '12px', height: '12px' }} />
                    Species:
                  </span>
                  {[
                    { key: 'all', label: 'All', emoji: '🐾' },
                    { key: 'cattle', label: 'Cattle', emoji: '🐄' },
                    { key: 'buffalo', label: 'Buffalo', emoji: '🐃' },
                    { key: 'goat', label: 'Goats', emoji: '🐐' },
                    { key: 'poultry', label: 'Poultry', emoji: '🐔' },
                  ].map(species => (
                    <button
                      key={species.key}
                      type="button"
                      onClick={() => setSelectedSpecies(species.key)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: selectedSpecies === species.key ? '#7c3aed' : '#e5e7eb',
                        background: selectedSpecies === species.key ? '#7c3aed' : 'white',
                        color: selectedSpecies === species.key ? 'white' : '#4b5563',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {species.emoji} {species.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* REQUESTS LIST CONTAINER */}
              <div style={{ padding: '1.25rem' }}>
                {filteredRequests.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#9ca3af' }}>
                    <Stethoscope style={{ width: '52px', height: '52px', margin: '0 auto 1rem', opacity: 0.35, color: '#7c3aed' }} />
                    <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#4b5563' }}>
                      No {selectedTab.replace('-', ' ')} cases found
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.35rem' }}>
                      {searchQuery || selectedSpecies !== 'all'
                        ? 'Try clearing the search query or species filters above.'
                        : 'New veterinary requests submitted by nearby farmers will appear here.'}
                    </p>
                    {(searchQuery || selectedSpecies !== 'all') && (
                      <button
                        type="button"
                        onClick={() => { setSearchQuery(''); setSelectedSpecies('all'); }}
                        style={{
                          marginTop: '1rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid #d8b4fe',
                          background: '#faf5ff',
                          color: '#7c3aed',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    {filteredRequests.map(request => {
                      const urgencyCfg = getUrgencyConfig(request.urgency);
                      const statusBadge = getStatusBadge(request.status);
                      const animalEmoji = getAnimalEmoji(request.animalType);

                      return (
                        <div
                          key={request.id}
                          style={{
                            border: '1px solid #f3e8ff',
                            borderRadius: '16px',
                            padding: '1.25rem',
                            transition: 'all 0.2s',
                            background: request.urgency === 'Emergency' ? '#fffbfa' : '#ffffff',
                            boxShadow: request.urgency === 'Emergency' ? '0 4px 15px rgba(239,68,68,0.08)' : '0 2px 8px rgba(0,0,0,0.03)'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(124,58,237,0.12)';
                            e.currentTarget.style.borderColor = '#c084fc';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = request.urgency === 'Emergency' ? '0 4px 15px rgba(239,68,68,0.08)' : '0 2px 8px rgba(0,0,0,0.03)';
                            e.currentTarget.style.borderColor = '#f3e8ff';
                          }}
                        >
                          {/* Case Card Header */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            
                            {/* Farmer & Animal header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                              <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.6rem',
                                boxShadow: '0 4px 12px rgba(124,58,237,0.25)',
                                flexShrink: 0
                              }}>
                                {animalEmoji}
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#111827' }}>
                                    {request.farmerName}
                                  </span>
                                  <span style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.725rem',
                                    fontWeight: 700,
                                    color: '#6b7280',
                                    background: '#f3f4f6',
                                    padding: '0.15rem 0.45rem',
                                    borderRadius: '6px'
                                  }}>
                                    Tag: {request.tagId}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: '#4b5563', fontSize: '0.8rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <MapPin style={{ width: '13px', height: '13px', color: '#7c3aed' }} />
                                    {request.farmLocation} ({request.distance})
                                  </span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#2563eb', fontWeight: 600 }}>
                                    <Phone style={{ width: '12px', height: '12px' }} />
                                    {request.phone}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Status & Urgency Badges */}
                            <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', flexWrap: 'wrap' }}>
                              <span style={{
                                background: urgencyCfg.bg,
                                color: urgencyCfg.text,
                                border: `1px solid ${urgencyCfg.border}`,
                                fontSize: '0.725rem',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '9999px',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                              }}>
                                {urgencyCfg.label}
                              </span>

                              <span style={{
                                background: statusBadge.bg,
                                color: statusBadge.text,
                                border: `1px solid ${statusBadge.border}`,
                                fontSize: '0.725rem',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '9999px',
                                fontWeight: 700
                              }}>
                                {statusBadge.label}
                              </span>

                              <span style={{ fontSize: '0.725rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                                #{request.id}
                              </span>
                            </div>
                          </div>

                          {/* Animal Specification Bar */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                            gap: '0.625rem',
                            marginBottom: '0.85rem'
                          }}>
                            <div style={{ background: '#faf5ff', padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1px solid #f3e8ff' }}>
                              <div style={{ fontSize: '0.675rem', color: '#7c3aed', fontWeight: 700 }}>SPECIES & BREED</div>
                              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.825rem' }}>{request.animalType} • {request.breed}</div>
                            </div>
                            <div style={{ background: '#faf5ff', padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1px solid #f3e8ff' }}>
                              <div style={{ fontSize: '0.675rem', color: '#7c3aed', fontWeight: 700 }}>AGE & HERD SIZE</div>
                              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.825rem' }}>{request.age} (Herd: {request.herdSize})</div>
                            </div>
                            <div style={{ background: '#faf5ff', padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1px solid #f3e8ff' }}>
                              <div style={{ fontSize: '0.675rem', color: '#7c3aed', fontWeight: 700 }}>REQUEST TIME</div>
                              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.825rem' }}>{request.requestDate} ({request.preferredTime})</div>
                            </div>
                          </div>

                          {/* Health Issue Description Box */}
                          <div style={{
                            background: request.urgency === 'Emergency' ? '#fff5f5' : '#fafafa',
                            border: `1px solid ${request.urgency === 'Emergency' ? '#fecaca' : '#f3f4f6'}`,
                            borderRadius: '12px',
                            padding: '0.85rem',
                            marginBottom: '0.85rem'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: request.urgency === 'Emergency' ? '#dc2626' : '#4b5563', textTransform: 'uppercase' }}>
                                📋 Farmer Reported Clinical Symptoms:
                              </span>
                              {request.vitals && (
                                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#6d28d9', background: '#ede9fe', padding: '0.15rem 0.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <Thermometer style={{ width: '12px', height: '12px' }} />
                                  Temp: {request.vitals.temp}
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '0.875rem', color: '#1f2937', lineHeight: 1.45, margin: 0 }}>
                              {request.issue}
                            </p>

                            {/* Symptoms tags */}
                            {request.symptoms && request.symptoms.length > 0 && (
                              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                {request.symptoms.map((s, idx) => (
                                  <span key={idx} style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    background: 'white',
                                    border: '1px solid #e5e7eb',
                                    color: '#4b5563',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '6px'
                                  }}>
                                    • {s}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Status specific banners */}
                          {request.status === 'accepted' && (
                            <div style={{
                              background: '#f5f3ff',
                              border: '1px solid #ddd6fe',
                              borderRadius: '12px',
                              padding: '0.75rem 1rem',
                              marginBottom: '0.85rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '0.5rem'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar style={{ width: '18px', height: '18px', color: '#7c3aed' }} />
                                <div>
                                  <div style={{ fontSize: '0.725rem', color: '#6d28d9', fontWeight: 800 }}>VISIT APPOINTMENT CONFIRMED</div>
                                  <div style={{ fontSize: '0.85rem', color: '#1f2937', fontWeight: 700 }}>
                                    Scheduled on: {request.scheduledDate} at {request.scheduledTime}
                                  </div>
                                </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '0.725rem', color: '#6b7280' }}>Estimated Fee</span>
                                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#7c3aed' }}>₹{request.consultationFee || 300}</div>
                              </div>
                            </div>
                          )}

                          {request.status === 'in-treatment' && (
                            <div style={{
                              background: '#eff6ff',
                              border: '1px solid #bfdbfe',
                              borderRadius: '12px',
                              padding: '0.75rem 1rem',
                              marginBottom: '0.85rem'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                                <div style={{ fontSize: '0.725rem', color: '#1d4ed8', fontWeight: 800 }}>🩺 CLINICAL DIAGNOSIS & ACTIVE PROTOCOL</div>
                                <span style={{ fontSize: '0.7rem', color: '#1e40af', fontWeight: 700 }}>Next Check: {request.followUpDate}</span>
                              </div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e3a8a' }}>
                                {request.diagnosis}
                              </div>
                              {request.treatmentNotes && (
                                <div style={{ fontSize: '0.8rem', color: '#374151', marginTop: '0.25rem' }}>
                                  {request.treatmentNotes}
                                </div>
                              )}
                            </div>
                          )}

                          {request.status === 'completed' && (
                            <div style={{
                              background: '#f0fdf4',
                              border: '1px solid #bbf7d0',
                              borderRadius: '12px',
                              padding: '0.75rem 1rem',
                              marginBottom: '0.85rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '0.5rem'
                            }}>
                              <div>
                                <div style={{ fontSize: '0.725rem', color: '#15803d', fontWeight: 800 }}>✅ TREATMENT COMPLETED & CERTIFIED</div>
                                <div style={{ fontSize: '0.85rem', color: '#14532d', fontWeight: 700 }}>
                                  Diagnosis: {request.diagnosis}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.2rem' }}>
                                  Discharged on {request.completionDate} • Consultation: ₹{request.consultationFee || 300}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleOpenCertificate(request)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  padding: '0.45rem 0.85rem',
                                  borderRadius: '8px',
                                  background: '#dcfce7',
                                  color: '#15803d',
                                  border: '1px solid #86efac',
                                  fontSize: '0.775rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                <FileText style={{ width: '14px', height: '14px' }} />
                                View Rx Certificate
                              </button>
                            </div>
                          )}

                          {/* ACTION BUTTONS TOOLBAR */}
                          <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            justifyContent: 'flex-end',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            borderTop: '1px solid #f9fafb',
                            paddingTop: '0.75rem'
                          }}>
                            {/* View Details */}
                            <button
                              type="button"
                              onClick={() => handleOpenDetails(request)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.5rem 0.9rem',
                                borderRadius: '10px',
                                background: '#faf5ff',
                                color: '#7c3aed',
                                border: '1px solid #e9d5ff',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                transition: 'all 0.15s'
                              }}
                            >
                              <Eye style={{ width: '14px', height: '14px' }} />
                              Medical Chart
                            </button>

                            {/* Call farmer */}
                            <button
                              type="button"
                              onClick={() => handleSimulateCall(request)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.5rem 0.9rem',
                                borderRadius: '10px',
                                background: '#f0fdf4',
                                color: '#16a34a',
                                border: '1px solid #bbf7d0',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 700
                              }}
                            >
                              <Phone style={{ width: '14px', height: '14px' }} />
                              Call Farmer
                            </button>

                            {/* Status: Pending buttons */}
                            {request.status === 'pending' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleRejectRequest(request.id)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.5rem 0.9rem',
                                    borderRadius: '10px',
                                    background: '#fff1f2',
                                    color: '#e11d48',
                                    border: '1px solid #fecdd3',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 700
                                  }}
                                >
                                  <X style={{ width: '14px', height: '14px' }} />
                                  Decline
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleOpenScheduleModal(request)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.55rem 1.25rem',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.825rem',
                                    fontWeight: 700,
                                    boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
                                    transition: 'all 0.15s'
                                  }}
                                >
                                  <Calendar style={{ width: '15px', height: '15px' }} />
                                  Accept & Schedule Visit
                                </button>
                              </>
                            )}

                            {/* Status: Accepted buttons */}
                            {request.status === 'accepted' && (
                              <button
                                type="button"
                                onClick={() => handleOpenPrescribeModal(request)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.4rem',
                                  padding: '0.55rem 1.25rem',
                                  borderRadius: '10px',
                                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '0.825rem',
                                  fontWeight: 700,
                                  boxShadow: '0 4px 14px rgba(37,99,235,0.3)'
                                }}
                              >
                                <Stethoscope style={{ width: '15px', height: '15px' }} />
                                Begin Treatment & Issue Rx
                              </button>
                            )}

                            {/* Status: In Treatment buttons */}
                            {request.status === 'in-treatment' && (
                              <button
                                type="button"
                                onClick={() => handleOpenPrescribeModal(request)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.4rem',
                                  padding: '0.55rem 1.25rem',
                                  borderRadius: '10px',
                                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '0.825rem',
                                  fontWeight: 700,
                                  boxShadow: '0 4px 14px rgba(22,163,74,0.3)'
                                }}
                              >
                                <CheckCircle style={{ width: '15px', height: '15px' }} />
                                Update Rx / Mark Healed
                              </button>
                            )}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT SIDEBAR: DOCTOR PROFILE & CLINICAL TOOLS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* 1. Doctor Profile Card */}
            <div style={{
              background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
              borderRadius: '20px',
              padding: '1.5rem',
              color: 'white',
              boxShadow: '0 10px 30px rgba(109,40,217,0.28)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.4)',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  👩‍⚕️
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{user?.name || 'Dr. Priya Sharma'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#e9d5ff' }}>B.V.Sc & A.H. (Veterinary Doctor)</div>
                  <div style={{ fontSize: '0.725rem', color: '#c4b5fd', marginTop: '0.15rem' }}>Reg: VCI-RJ-2019-881</div>
                </div>
              </div>

              {/* Doctor Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                {[
                  { label: 'Animals Treated', value: '420+' },
                  { label: 'Recovery Rate', value: '98.8%' },
                  { label: 'Villages Served', value: '28' },
                  { label: 'Rating', value: '4.9 ⭐' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '12px', padding: '0.625rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.675rem', color: '#e9d5ff', marginTop: '0.1rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Mobile Vet Kit & Cold Chain Status */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Syringe style={{ width: '16px', height: '16px', color: '#7c3aed' }} />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', margin: 0 }}>Mobile Vet Field Kit</h3>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                  Ready ✅
                </span>
              </div>

              {[
                { name: 'Vaccine Cold Box (+4°C)', status: 'Chilled', percent: 100, color: '#0ea5e9' },
                { name: 'Antibiotics & NSAIDs', status: '94% Stocked', percent: 94, color: '#16a34a' },
                { name: 'Suture & Surgical Tray', status: 'Sterilized', percent: 100, color: '#7c3aed' },
                { name: 'IV Fluids (RL & Dextrose)', status: '6 Bottles', percent: 75, color: '#f59e0b' }
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.775rem', color: '#374151', fontWeight: 600 }}>{item.name}</span>
                    <span style={{ fontSize: '0.725rem', color: item.color, fontWeight: 700 }}>{item.status}</span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${item.percent}%`, background: item.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setActiveModal('kit')}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e9d5ff',
                  background: '#faf5ff',
                  color: '#7c3aed',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Inspect Inventory Checklist →
              </button>
            </div>

            {/* 3. Today's Farm Visit Schedule Timeline */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
                <Calendar style={{ width: '16px', height: '16px', color: '#7c3aed' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', margin: 0 }}>Today's Route Schedule</h3>
              </div>

              {[
                { time: '09:30 AM', farmer: 'Mohan Singh', village: 'Bichhiwara', animal: 'Murrah Buffalo Check', status: 'Upcoming' },
                { time: '02:00 PM', farmer: 'Rajesh Kumar', village: 'Kothpura', animal: 'Cow High Fever IV', status: 'Pending' },
                { time: '04:45 PM', farmer: 'Vikram Meena', village: 'Sagwara', animal: 'Mastitis Infusion', status: 'Ongoing' }
              ].map((visit, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.625rem 0',
                  borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <div style={{
                    fontSize: '0.725rem',
                    fontWeight: 800,
                    color: '#7c3aed',
                    background: '#faf5ff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    height: 'fit-content',
                    whiteSpace: 'nowrap'
                  }}>
                    {visit.time}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#111827' }}>{visit.farmer}</div>
                    <div style={{ fontSize: '0.725rem', color: '#6b7280' }}>{visit.village} • {visit.animal}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. Seasonal Livestock Outbreak Alert */}
            <div style={{
              background: '#fff7ed',
              borderRadius: '20px',
              padding: '1.25rem',
              border: '1px solid #fed7aa',
              boxShadow: '0 4px 18px rgba(249,115,22,0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <AlertTriangle style={{ width: '16px', height: '16px', color: '#ea580c' }} />
                <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#9a3412', margin: 0 }}>Seasonal Veterinary Advisory</h3>
              </div>
              <p style={{ fontSize: '0.775rem', color: '#7c2d12', lineHeight: 1.45, margin: '0 0 0.65rem 0' }}>
                Winter transition period: Alert dairy farmers about Subclinical Mastitis, Foot Rot, and sudden Bloat risks with fresh green alfalfa.
              </p>
              <div style={{ fontSize: '0.725rem', color: '#ea580c', fontWeight: 700 }}>
                • National Pashu Toll-Free: 1962 (24x7 Ambulance)
              </div>
            </div>

            {/* 5. Consultation Species Breakdown */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
                <Activity style={{ width: '16px', height: '16px', color: '#7c3aed' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', margin: 0 }}>Consultation Breakdown</h3>
              </div>

              {[
                { species: 'Dairy Cattle (Cows)', count: 58, color: '#7c3aed' },
                { species: 'Water Buffaloes', count: 24, color: '#2563eb' },
                { species: 'Goats & Sheep', count: 14, color: '#16a34a' },
                { species: 'Poultry & Birds', count: 4, color: '#ea580c' }
              ].map((c, i) => (
                <div key={i} style={{ marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#374151', fontWeight: 600 }}>{c.species}</span>
                    <span style={{ fontSize: '0.75rem', color: c.color, fontWeight: 700 }}>{c.count}%</span>
                  </div>
                  <div style={{ height: '5px', background: '#f3f4f6', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${c.count}%`, background: c.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: COMPREHENSIVE MEDICAL PATIENT CHART MODAL                        */}
      {/* ========================================================================= */}
      {activeModal === 'details' && activeRequest && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            padding: '1.75rem'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', border: '1px solid #e9d5ff' }}>
                  {getAnimalEmoji(activeRequest.animalType)}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    {activeRequest.animalType} Health Record
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem' }}>
                    Tag: <span style={{ fontWeight: 700, color: '#7c3aed' }}>{activeRequest.tagId}</span> • Case ID: {activeRequest.id}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563' }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            {/* Farmer & Farm Location Card */}
            <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '14px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Farmer Profile & Contact
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: '#6b7280' }}>Owner Name: </span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>{activeRequest.farmerName}</span>
                </div>
                <div>
                  <span style={{ color: '#6b7280' }}>Phone: </span>
                  <span style={{ fontWeight: 700, color: '#2563eb' }}>{activeRequest.phone}</span>
                </div>
                <div>
                  <span style={{ color: '#6b7280' }}>Location: </span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{activeRequest.farmLocation}</span>
                </div>
                <div>
                  <span style={{ color: '#6b7280' }}>Distance: </span>
                  <span style={{ fontWeight: 700, color: '#7c3aed' }}>{activeRequest.distance} from Clinic</span>
                </div>
              </div>
            </div>

            {/* Animal Vitals Card */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Clinical Vitals & Animal Profile
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.625rem' }}>
                <div style={{ background: 'white', padding: '0.625rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Breed & Age</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{activeRequest.breed} ({activeRequest.age})</div>
                </div>
                <div style={{ background: 'white', padding: '0.625rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Body Temperature</div>
                  <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.85rem' }}>{activeRequest.vitals?.temp || '102.5°F'}</div>
                </div>
                <div style={{ background: 'white', padding: '0.625rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Rumination</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{activeRequest.vitals?.rumination || 'Normal'}</div>
                </div>
                <div style={{ background: 'white', padding: '0.625rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Vaccine History</div>
                  <div style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.775rem' }}>{activeRequest.vaccinationStatus || 'Verified'}</div>
                </div>
              </div>
            </div>

            {/* Reported Symptoms */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4b5563', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Chief Complaints & Symptoms
              </div>
              <div style={{ background: '#fafafa', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '0.85rem', color: '#1f2937', fontSize: '0.875rem', lineHeight: 1.5 }}>
                {activeRequest.issue}
              </div>
            </div>

            {/* Diagnosis / Treatment if available */}
            {activeRequest.diagnosis && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.2rem' }}>
                  CLINICAL DIAGNOSIS & REGIMEN
                </div>
                <div style={{ fontWeight: 800, color: '#14532d', fontSize: '0.925rem' }}>
                  {activeRequest.diagnosis}
                </div>
                {activeRequest.treatmentNotes && (
                  <div style={{ fontSize: '0.8rem', color: '#374151', marginTop: '0.35rem' }}>
                    {activeRequest.treatmentNotes}
                  </div>
                )}
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Close
              </button>
              {activeRequest.status === 'pending' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('schedule');
                  }}
                  style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Schedule Farm Visit
                </button>
              )}
              {activeRequest.status === 'accepted' && (
                <button
                  type="button"
                  onClick={() => {
                    handleOpenPrescribeModal(activeRequest);
                  }}
                  style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Issue Digital Rx
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ACCEPT & SCHEDULE VISIT MODAL                                   */}
      {/* ========================================================================= */}
      {activeModal === 'schedule' && activeRequest && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Schedule Veterinary Visit 📅
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  Farmer: <span style={{ fontWeight: 700, color: '#7c3aed' }}>{activeRequest.farmerName}</span> • {activeRequest.animalType}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X style={{ width: '18px', height: '18px', color: '#4b5563' }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Preferred time indication */}
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '0.75rem', fontSize: '0.825rem', color: '#6d28d9' }}>
                <strong>Farmer Preferred Window:</strong> {activeRequest.preferredTime}
              </div>

              {/* Date & Time Picker */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                    Visit Date
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                    Expected Arrival Time
                  </label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.85rem', background: 'white' }}
                  >
                    <option value="08:30 AM">08:30 AM - Morning</option>
                    <option value="09:30 AM">09:30 AM - Morning</option>
                    <option value="11:00 AM">11:00 AM - Late Morning</option>
                    <option value="02:30 PM">02:30 PM - Afternoon</option>
                    <option value="04:30 PM">04:30 PM - Evening</option>
                    <option value="Immediate">🚨 Immediate Emergency Visit</option>
                  </select>
                </div>
              </div>

              {/* Estimated Consultation & Travel Fee */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                  Consultation & Farm Visit Fee (₹)
                </label>
                <div style={{ position: 'relative' }}>
                  <IndianRupee style={{ width: '16px', height: '16px', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                  <input
                    type="number"
                    value={scheduleFee}
                    onChange={(e) => setScheduleFee(e.target.value)}
                    placeholder="300"
                    style={{ width: '100%', padding: '0.6rem 0.75rem 0.6rem 2rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.85rem' }}
                  />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>Covers home visit travel up to {activeRequest.distance} and clinical examination</span>
              </div>

              {/* Pre-visit Advice to Farmer */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                  Pre-Visit Instructions for Farmer (Sent via SMS)
                </label>
                <textarea
                  rows={3}
                  value={scheduleAdvice}
                  onChange={(e) => setScheduleAdvice(e.target.value)}
                  placeholder="e.g. Keep animal tied in a dry, shaded place. Do not give cold water or heavy concentrate feed until doctor arrives."
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.825rem', resize: 'vertical' }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSchedule}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(124,58,237,0.3)'
                  }}
                >
                  Confirm & Notify Farmer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: DIAGNOSIS & DIGITAL PRESCRIPTION MODAL                          */}
      {/* ========================================================================= */}
      {activeModal === 'prescribe' && activeRequest && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Clinical Diagnosis & Prescription Slip 💊
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  Patient: {activeRequest.animalType} ({activeRequest.tagId}) • Farmer: {activeRequest.farmerName}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X style={{ width: '18px', height: '18px', color: '#4b5563' }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              
              {/* Clinical Diagnosis Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#374151', marginBottom: '0.35rem' }}>
                  PRIMARY CLINICAL DIAGNOSIS *
                </label>
                <input
                  type="text"
                  value={diagInput}
                  onChange={(e) => setDiagInput(e.target.value)}
                  placeholder="e.g. Acute Bovine Mastitis, Ruminal Acidosis, Pneumonia, etc."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.85rem', fontWeight: 600 }}
                />
              </div>

              {/* Medication Table Builder */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase' }}>
                    Prescribed Medicines (Rx List)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setRxList([...rxList, { name: '', form: 'Injection', dosage: '', route: 'IM', duration: '3 Days' }]);
                    }}
                    style={{
                      background: '#faf5ff',
                      color: '#7c3aed',
                      border: '1px solid #d8b4fe',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    + Add Medicine
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {rxList.map((rx, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 1fr 28px', gap: '0.4rem', alignItems: 'center', background: '#fafafa', padding: '0.45rem', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                      <input
                        type="text"
                        value={rx.name}
                        onChange={(e) => {
                          const updated = [...rxList];
                          updated[idx].name = e.target.value;
                          setRxList(updated);
                        }}
                        placeholder="Medicine name (e.g. Floxidin)"
                        style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.775rem' }}
                      />
                      <select
                        value={rx.form}
                        onChange={(e) => {
                          const updated = [...rxList];
                          updated[idx].form = e.target.value;
                          setRxList(updated);
                        }}
                        style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.775rem', background: 'white' }}
                      >
                        <option value="Injection">Injection</option>
                        <option value="Bolus">Bolus</option>
                        <option value="Syrup">Syrup/Liquid</option>
                        <option value="Powder">Powder</option>
                        <option value="Spray">Spray</option>
                      </select>
                      <input
                        type="text"
                        value={rx.dosage}
                        onChange={(e) => {
                          const updated = [...rxList];
                          updated[idx].dosage = e.target.value;
                          setRxList(updated);
                        }}
                        placeholder="Dose (15 ml IM)"
                        style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.775rem' }}
                      />
                      <input
                        type="text"
                        value={rx.duration}
                        onChange={(e) => {
                          const updated = [...rxList];
                          updated[idx].duration = e.target.value;
                          setRxList(updated);
                        }}
                        placeholder="3 Days"
                        style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.775rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (rxList.length > 1) {
                            setRxList(rxList.filter((_, i) => i !== idx));
                          }
                        }}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment and Diet Advice */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#374151', marginBottom: '0.35rem' }}>
                  DIETARY & CLINICAL MANAGEMENT NOTES
                </label>
                <textarea
                  rows={2}
                  value={treatmentNotesInput}
                  onChange={(e) => setTreatmentNotesInput(e.target.value)}
                  placeholder="Feed soft green fodder, provide salt lick, avoid damp bedding..."
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.825rem' }}
                />
              </div>

              {/* Follow-up Date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#374151', marginBottom: '0.35rem' }}>
                  FOLLOW-UP RE-CHECK DATE
                </label>
                <input
                  type="date"
                  value={followUpInput}
                  onChange={(e) => setFollowUpInput(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.85rem' }}
                />
              </div>

              {/* Save buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid #f3f4f6', paddingTop: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSavePrescription(false)}
                  style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', border: '1px solid #7c3aed', background: '#faf5ff', color: '#7c3aed', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Save In-Treatment Plan
                </button>
                <button
                  type="button"
                  onClick={() => handleSavePrescription(true)}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(22,163,74,0.3)'
                  }}
                >
                  Complete & Issue Certificate ✅
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: OFFICIAL DIGITAL VETERINARY PRESCRIPTION & CERTIFICATE           */}
      {/* ========================================================================= */}
      {activeModal === 'certificate' && activeRequest && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            border: '2px solid #e9d5ff'
          }}>
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.85rem', borderRadius: '8px', background: '#faf5ff', color: '#7c3aed', border: '1px solid #d8b4fe', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Printer style={{ width: '14px', height: '14px' }} />
                  Print Prescription
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Prescription link copied & shared to WhatsApp!')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.85rem', borderRadius: '8px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Share2 style={{ width: '14px', height: '14px' }} />
                  Send to WhatsApp
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X style={{ width: '18px', height: '18px', color: '#4b5563' }} />
              </button>
            </div>

            {/* Official Certificate Paper Container */}
            <div style={{
              background: '#fffdf9',
              border: '2px dashed #d8b4fe',
              borderRadius: '16px',
              padding: '1.75rem',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #7c3aed', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Stethoscope style={{ width: '24px', height: '24px', color: '#7c3aed' }} />
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4c1d95', letterSpacing: '0.05em' }}>
                    VETERINARY HEALTH CERTIFICATE & PRESCRIPTION
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>
                  {user?.name || 'Dr. Priya Sharma'}, B.V.Sc & A.H.
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  VCI Registration No: VCI-RJ-2019-881 • Animal Husbandry Mobile Clinic, Dungarpur
                </div>
              </div>

              {/* Patient and Owner Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem', marginBottom: '1.25rem', background: '#fcfaff', padding: '0.85rem', borderRadius: '10px' }}>
                <div><strong>Farmer Name:</strong> {activeRequest.farmerName}</div>
                <div><strong>Case Ref:</strong> #{activeRequest.id}</div>
                <div><strong>Location:</strong> {activeRequest.farmLocation}</div>
                <div><strong>Date of Visit:</strong> {activeRequest.completionDate || activeRequest.requestDate}</div>
                <div><strong>Animal:</strong> {activeRequest.animalType} ({activeRequest.breed})</div>
                <div><strong>Identification Tag:</strong> {activeRequest.tagId}</div>
              </div>

              {/* Diagnosis */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', marginBottom: '0.25rem' }}>
                  CLINICAL DIAGNOSIS:
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
                  {activeRequest.diagnosis || 'Clinical Bovine Infection'}
                </div>
              </div>

              {/* Rx Medicines Table */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', marginBottom: '0.4rem' }}>
                  ℞ MEDICATIONS PRESCRIBED:
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ background: '#f3e8ff', color: '#4c1d95', textAlign: 'left' }}>
                      <th style={{ padding: '0.5rem', border: '1px solid #e9d5ff' }}>Medicine</th>
                      <th style={{ padding: '0.5rem', border: '1px solid #e9d5ff' }}>Form</th>
                      <th style={{ padding: '0.5rem', border: '1px solid #e9d5ff' }}>Dosage & Route</th>
                      <th style={{ padding: '0.5rem', border: '1px solid #e9d5ff' }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeRequest.prescriptions || [
                      { name: 'Broad Spectrum Antibiotic', form: 'Injection', dosage: '15 ml IM', duration: '3 Days' },
                      { name: 'Anti-inflammatory & Antipyretic', form: 'Injection', dosage: '15 ml IM', duration: '2 Days' }
                    ]).map((rx, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? 'white' : '#fafafa' }}>
                        <td style={{ padding: '0.5rem', border: '1px solid #e9d5ff', fontWeight: 700 }}>{rx.name}</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #e9d5ff' }}>{rx.form}</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #e9d5ff' }}>{rx.dosage}</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #e9d5ff' }}>{rx.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Doctor instructions */}
              <div style={{ fontSize: '0.8rem', color: '#4b5563', marginBottom: '1.5rem', background: '#fafafa', padding: '0.75rem', borderRadius: '8px' }}>
                <strong>Advisory: </strong> {activeRequest.treatmentNotes || 'Provide clean drinking water, protect from cold draughts, and ensure zero antibiotic residue in commercial milk sale for 72 hours.'}
              </div>

              {/* Seal and Signature */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <div style={{
                  border: '2px solid #7c3aed',
                  borderRadius: '50%',
                  width: '74px',
                  height: '74px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed',
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  transform: 'rotate(-8deg)',
                  textAlign: 'center',
                  padding: '4px'
                }}>
                  <span>★ VERIFIED ★</span>
                  <span style={{ fontSize: '0.55rem' }}>ANIMAL CLINIC</span>
                  <span style={{ fontSize: '0.5rem' }}>DUNGARPUR</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'cursive', fontSize: '1.25rem', color: '#4c1d95', fontWeight: 700 }}>
                    Dr. Priya Sharma
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#111827' }}>
                    Authorized Veterinary Officer
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                    Digitally Signed • NextGen Kisan Health Network
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CALL FARMER DIRECT MODAL                                         */}
      {/* ========================================================================= */}
      {activeModal === 'call' && activeRequest && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '440px',
            width: '100%',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Phone style={{ width: '32px', height: '32px' }} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>
              Connect with Farmer
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: '0 0 1.25rem 0' }}>
              Calling <strong>{activeRequest.farmerName}</strong> regarding {activeRequest.animalType} (Tag: {activeRequest.tagId})
            </p>

            <div style={{ background: '#f3f4f6', padding: '0.85rem', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
              +91 {activeRequest.phone}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: 700, cursor: 'pointer' }}
              >
                Dismiss
              </button>
              <a
                href={`tel:${activeRequest.phone}`}
                onClick={() => {
                  showToast(`Call initiated to ${activeRequest.farmerName} (${activeRequest.phone}) 📞`);
                  setActiveModal(null);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: '#16a34a',
                  color: 'white',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Phone style={{ width: '16px', height: '16px' }} />
                Dial Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: FIELD MEDICAL KIT CHECKLIST MODAL                                */}
      {/* ========================================================================= */}
      {activeModal === 'kit' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Syringe style={{ width: '20px', height: '20px', color: '#7c3aed' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Mobile Veterinary Field Kit Checklist
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X style={{ width: '18px', height: '18px', color: '#4b5563' }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Cold-Chain Vaccine Carrier (FMD, HS, BQ, PPR)', status: 'Active (3.8°C)', icon: '❄️', ready: true },
                { name: 'Broad-Spectrum Antibiotics (Floxidin, Intamox, Oxytetracycline)', status: 'Stocked (12 Vials)', icon: '💉', ready: true },
                { name: 'Antipyretics & Analgesics (Melonex, Anistamin)', status: 'Stocked (10 Vials)', icon: '💊', ready: true },
                { name: 'Sterilized Sutures & Minor Surgery Kit', status: 'Sealed & Autoclaved', icon: '✂️', ready: true },
                { name: 'IV Infusion Bottles (Calcium Borogluconate 450ml x 4, RL x 6)', status: 'Ready on Vehicle', icon: '🍼', ready: true },
                { name: 'Antiseptic Maggot Spray & Fly Repellent', status: 'Ready (6 Cans)', icon: '🧴', ready: true },
                { name: 'Stethoscope, Digital Thermometer, Ruminal Magnet', status: 'Tested & Operational', icon: '🩺', ready: true }
              ].map((k, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#faf5ff', borderRadius: '10px', border: '1px solid #f3e8ff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{k.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#111827' }}>{k.name}</div>
                      <div style={{ fontSize: '0.725rem', color: '#7c3aed', fontWeight: 600 }}>{k.status}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 800 }}>✓ Verified</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => {
                  showToast('Mobile kit inventory verified and marked ready for emergency deployment! 🚑');
                  setActiveModal(null);
                }}
                style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', background: '#7c3aed', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Mark Field Kit Certified
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default VetDashboard;