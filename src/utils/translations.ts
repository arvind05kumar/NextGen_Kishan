export type Language = 'english' | 'hindi' | 'regional';

export interface Translations {
  // Common & Branding
  portalSubtitle: string;
  viewProfile: string;
  userProfile: string;
  logout: string;
  close: string;
  verified: string;
  save: string;
  edit: string;
  contact: string;
  details: string;
  
  // Roles
  roles: {
    farmer: string;
    vet: string;
    lab: string;
    driver: string;
    ngo: string;
  };

  // Profile Modal
  profileTitle: string;
  defaultFarmerName: string;
  defaultVetName: string;
  defaultLocation: string;
  phoneLabel: string;
  aadhaarLabel: string;
  aadhaarVerified: string;
  locationLabel: string;
  identitySection: string;
  
  // Farmer Specific Profile
  farmSection: string;
  totalLand: string;
  totalLandValue: string;
  mainCrops: string;
  mainCropsValue: string;
  kccCard: string;
  kccValue: string;
  soilCard: string;
  soilCardValue: string;
  
  // Professional Details
  profSection: string;
  licenseLabel: string;
  fieldLabel: string;
  
  // Stats
  totalServicesLabel: string;
  trustScoreLabel: string;
  verifiedProfileLabel: string;

  // Language switch
  languageName: string;
}

export const translations: Record<Language, Translations> = {
  english: {
    portalSubtitle: 'AGRICULTURAL PORTAL',
    viewProfile: 'View Profile',
    userProfile: 'User Profile',
    logout: 'Logout',
    close: 'Close',
    verified: 'Verified',
    save: 'Save',
    edit: 'Edit Profile',
    contact: 'Contact',
    details: 'Details',

    roles: {
      farmer: 'Farmer',
      vet: 'Veterinarian',
      lab: 'Lab Technician',
      driver: 'Driver',
      ngo: 'NGO Worker',
    },

    profileTitle: 'Profile',
    defaultFarmerName: 'Rajesh Kumar',
    defaultVetName: 'Dr. Priya Sharma',
    defaultDriverName: 'Rampal',
    defaultNgoName: 'Anjali Sharma (Gramin Seva Trust)',
    defaultLocation: 'Village: Rampura, Tehsil: Chaksu, Dist: Jaipur, Rajasthan',
    phoneLabel: 'Phone Number',
    aadhaarLabel: 'Aadhaar Card No.',
    aadhaarVerified: 'Aadhaar Verified',
    locationLabel: 'Address / Farm Location',
    identitySection: 'Identity & Contact Details',

    farmSection: 'Farm & Crop Profile',
    totalLand: 'Total Farm Land',
    totalLandValue: '4.5 Acres (Irrigated - Tube Well)',
    mainCrops: 'Primary Crops',
    mainCropsValue: 'Wheat, Mustard, Gram',
    kccCard: 'Kisan Credit Card (KCC)',
    kccValue: '₹1,80,000 Active (SBI)',
    soilCard: 'Soil Health Card',
    soilCardValue: 'Verified (2024-2027)',

    profSection: 'Professional Credentials',
    licenseLabel: 'License / Reg. No.',
    fieldLabel: 'Specialization Field',

    totalServicesLabel: 'Total Services',
    trustScoreLabel: 'Trust Rating',
    verifiedProfileLabel: 'Verified Profile',

    languageName: 'English',
  },

  hindi: {
    portalSubtitle: 'कृषि सेवा पोर्टल',
    viewProfile: 'प्रोफाइल देखें',
    userProfile: 'उपयोगकर्ता प्रोफाइल',
    logout: 'लॉगआउट करें',
    close: 'बंद करें',
    verified: 'सत्यापित',
    save: 'सहेजें',
    edit: 'प्रोफाइल बदलें',
    contact: 'संपर्क करें',
    details: 'विवरण',

    roles: {
      farmer: 'किसान',
      vet: 'पशु चिकित्सक',
      lab: 'लैब तकनीशियन',
      driver: 'कृषि वाहन चालक',
      ngo: 'एनजीओ कार्यकर्ता',
    },

    profileTitle: 'प्रोफाइल',
    defaultFarmerName: 'राजेश कुमार',
    defaultVetName: 'डॉ. प्रिया शर्मा',
    defaultDriverName: 'रामपाल',
    defaultNgoName: 'अंजलि शर्मा (ग्रामीण सेवा ट्रस्ट)',
    defaultLocation: 'गाँव: रामपुरा, तहसील: चाकसू, जिला: जयपुर, राजस्थान',
    phoneLabel: 'मोबाइल नंबर',
    aadhaarLabel: 'आधार कार्ड संख्या',
    aadhaarVerified: 'आधार सत्यापित',
    locationLabel: 'निवास / खेत का पता',
    identitySection: 'पहचान व संपर्क विवरण',

    farmSection: 'कृषि व खेत की जानकारी',
    totalLand: 'कुल कृषि भूमि',
    totalLandValue: '4.5 एकड़ (सिंचित - नलकूप)',
    mainCrops: 'मुख्य फसलें',
    mainCropsValue: 'गेहूं, सरसों, चना',
    kccCard: 'किसान क्रेडिट कार्ड (KCC)',
    kccValue: '₹1,80,000 सक्रिय (SBI)',
    soilCard: 'मृदा स्वास्थ्य कार्ड',
    soilCardValue: 'सत्यापित (2024-2027)',

    profSection: 'व्यावसायिक विवरण',
    licenseLabel: 'पंजीकरण / लाइसेंस संख्या',
    fieldLabel: 'कार्यक्षेत्र व विशेषज्ञता',

    totalServicesLabel: 'कुल सेवाएं',
    trustScoreLabel: 'रेटिंग',
    verifiedProfileLabel: 'सत्यापित प्रोफाइल',

    languageName: 'हिंदी',
  },

  regional: {
    portalSubtitle: 'ਕਿਸਾਨ ਸੇਵਾ ਪੋਰਟਲ',
    viewProfile: 'ਪ੍ਰੋਫਾਈਲ ਵੇਖੋ',
    userProfile: 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ',
    logout: 'ਲੌਗ ਆਉਟ ਕਰੋ',
    close: 'ਬੰਦ ਕਰੋ',
    verified: 'ਤਸਦੀਕਸ਼ੁਦਾ',
    save: 'ਸੰਭਾਲੋ',
    edit: 'ਪ੍ਰੋਫਾਈਲ ਬਦਲੋ',
    contact: 'ਸੰਪਰਕ',
    details: 'ਵੇਰਵੇ',

    roles: {
      farmer: 'ਕਿਸਾਨ (ਜ਼ਿਮੀਂਦਾਰ)',
      vet: 'ਪਸ਼ੂ ਡਾਕਟਰ',
      lab: 'ਲੈਬ ਟੈਕਨੀਸ਼ੀਅਨ',
      driver: 'ਗੱਡੀ ਡਰਾਈਵਰ',
      ngo: 'ਸਮਾਜ ਸੇਵਕ',
    },

    profileTitle: 'ਪ੍ਰੋਫਾਈਲ',
    defaultFarmerName: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ',
    defaultVetName: 'ਡਾ. ਪ੍ਰਿਆ ਸ਼ਰਮਾ',
    defaultDriverName: 'ਰਾਮਪਾਲ',
    defaultNgoName: 'ਅੰਜਲੀ ਸ਼ਰਮਾ (ਗ੍ਰਾਮੀਣ ਸੇਵਾ ਟਰੱਸਟ)',
    defaultLocation: 'ਪਿੰਡ: ਜੰਡਿਆਲਾ, ਤਹਿਸੀਲ: ਨਕੋਦਰ, ਜ਼ਿਲ੍ਹਾ: ਜਲੰਧਰ, ਪੰਜਾਬ',
    phoneLabel: 'ਫ਼ੋਨ ਨੰਬਰ',
    aadhaarLabel: 'ਆਧਾਰ ਨੰਬਰ',
    aadhaarVerified: 'ਆਧਾਰ ਤਸਦੀਕਸ਼ੁਦਾ',
    locationLabel: 'ਖੇਤ ਅਤੇ ਘਰ ਦਾ ਪਤਾ',
    identitySection: 'ਪਛਾਣ ਅਤੇ ਸੰਪਰਕ ਵੇਰਵੇ',

    farmSection: 'ਖੇਤ ਅਤੇ ਫ਼ਸਲ ਦੀ ਜਾਣਕਾਰੀ',
    totalLand: 'ਕੁੱਲ ਜ਼ਮੀਨ',
    totalLandValue: '5.5 ਏਕੜ (ਨਹਿਰੀ)',
    mainCrops: 'ਮੁੱਖ ਫ਼ਸਲਾਂ',
    mainCropsValue: 'ਕਣਕ, ਝੋਨਾ, ਮੱਕੀ',
    kccCard: 'ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ',
    kccValue: '₹2,50,000 ਚਾਲੂ',
    soilCard: 'ਮਿੱਟੀ ਪਰਖ ਕਾਰਡ',
    soilCardValue: 'ਤਸਦੀਕਸ਼ੁਦਾ (2024-27)',

    profSection: 'ਕੰਮ ਦੀ ਜਾਣਕਾਰੀ',
    licenseLabel: 'ਲਾਇਸੈਂਸ ਨੰਬਰ',
    fieldLabel: 'ਮੁਹਾਰਤ',

    totalServicesLabel: 'ਕੁੱਲ ਸੇਵਾਵਾਂ',
    trustScoreLabel: 'ਰੇਟਿੰਗ',
    verifiedProfileLabel: 'ਤਸਦੀਕਸ਼ੁਦਾ',

    languageName: 'ਪੰਜਾਬੀ (Punjabi)',
  },
};

export const getTranslation = (lang: string): Translations => {
  const normalized = (lang || 'english').toLowerCase() as Language;
  return translations[normalized] || translations.english;
};
