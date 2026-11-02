export type SeasonType = 'rabi' | 'kharif' | 'zaid';
export type SoilType = 'loamy' | 'black' | 'sandy' | 'clay';
export type WaterLevel = 'high' | 'medium' | 'low';
export type FilterGoal = 'all' | 'high-profit' | 'low-water' | 'quick-harvest';

export interface CropData {
  id: string;
  name: {
    english: string;
    hindi: string;
    regional: string;
  };
  season: SeasonType;
  emoji: string;
  themeColor: string;
  suitableSoils: SoilType[];
  waterNeed: WaterLevel;
  optimalTemp: string;
  growthDurationDays: number;
  sowingWindow: {
    english: string;
    hindi: string;
    regional: string;
  };
  harvestWindow: {
    english: string;
    hindi: string;
    regional: string;
  };
  yieldPerAcre: {
    min: number;
    max: number;
    unit: string;
  };
  marketPricePerQuintal: number; // in INR
  costPerAcre: number; // in INR
  netProfitPerAcre: {
    min: number;
    max: number;
  };
  topVarieties: string[];
  fertilizerNPK: {
    english: string;
    hindi: string;
    regional: string;
  };
  irrigationSchedule: {
    english: string;
    hindi: string;
    regional: string;
  };
  pestAdvisory: {
    english: string;
    hindi: string;
    regional: string;
  };
  mspRate?: number; // Government MSP if applicable
  keyAdvantage: {
    english: string;
    hindi: string;
    regional: string;
  };
}

export const CROP_DATABASE: CropData[] = [
  // ==================== RABI CROPS (WINTER) ====================
  {
    id: 'wheat',
    name: {
      english: 'Wheat',
      hindi: 'गेहूं (Wheat)',
      regional: 'ਕਣਕ (Wheat)',
    },
    season: 'rabi',
    emoji: '🌾',
    themeColor: '#eab308',
    suitableSoils: ['loamy', 'clay', 'black'],
    waterNeed: 'medium',
    optimalTemp: '15°C - 24°C',
    growthDurationDays: 125,
    sowingWindow: {
      english: '15 Oct - 25 Nov',
      hindi: '15 अक्टूबर - 25 नवंबर',
      regional: '15 ਅਕਤੂਬਰ - 25 ਨਵੰਬਰ',
    },
    harvestWindow: {
      english: 'March - April',
      hindi: 'मार्च - अप्रैल',
      regional: 'ਮਾਰਚ - ਅਪ੍ਰੈਲ',
    },
    yieldPerAcre: {
      min: 20,
      max: 26,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 2425,
    costPerAcre: 15500,
    netProfitPerAcre: {
      min: 33000,
      max: 48000,
    },
    topVarieties: ['HD-2967', 'PBW-502', 'DBW-187 (Karan Vandana)', 'WH-1105'],
    fertilizerNPK: {
      english: 'Urea: 110 kg, DAP: 55 kg, MOP: 20 kg per acre',
      hindi: 'यूरिया: 110 किग्रा, डीएपी: 55 किग्रा, पोटाश: 20 किग्रा प्रति एकड़',
      regional: 'ਯੂਰੀਆ: 110 ਕਿਲੋ, ਡੀਏਪੀ: 55 ਕਿਲੋ, ਪੋਟਾਸ਼: 20 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ',
    },
    irrigationSchedule: {
      english: '4-5 irrigations: CRI stage (21 days), Tillering, Boot stage, Grain filling',
      hindi: '4-5 सिंचाई: सीआरआई अवस्था (21 दिन), कल्ले फूटते समय, गांठ बनते समय, दाना भरते समय',
      regional: '4-5 ਸਿੰਚਾਈਆਂ: 21 ਦਿਨਾਂ ਤੇ ਪਹਿਲੀ, ਫੁੱਟਣ ਸਮੇਂ, ਨਿਸਰਣ ਸਮੇਂ ਅਤੇ ਦਾਣਾ ਭਰਨ ਸਮੇਂ',
    },
    pestAdvisory: {
      english: 'Watch out for Yellow Rust & Aphids. Spray Propiconazole 25% EC if rust appears.',
      hindi: 'पीला रतुआ और माहू (चेपा) की निगरानी रखें। प्रकोप पर प्रोपिकोनाज़ोल 25% का छिड़काव करें।',
      regional: 'ਪੀਲੀ ਕੁੰਗੀ ਅਤੇ ਚੇਪੇ ਤੇ ਨਜ਼ਰ ਰੱਖੋ। ਜ਼ਰੂਰਤ ਪੈਣ ਤੇ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
    },
    mspRate: 2425,
    keyAdvantage: {
      english: 'Guaranteed government MSP, high food security and stable local mandi demand.',
      hindi: 'सरकारी न्यूनतम समर्थन मूल्य (MSP) की गारंटी और मंडी में तुरंत नकद बिक्री।',
      regional: 'ਸਰਕਾਰੀ ਸਮਰਥਨ ਮੁੱਲ (MSP) ਦੀ ਪੱਕੀ ਗਾਰੰਟੀ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਆਸਾਨ ਵਿਕਰੀ।',
    },
  },
  {
    id: 'mustard',
    name: {
      english: 'Mustard / Rapeseed',
      hindi: 'सरसों (Mustard)',
      regional: 'ਸਰ੍ਹੋਂ / ਰਾਇਆ (Mustard)',
    },
    season: 'rabi',
    emoji: '🌼',
    themeColor: '#ca8a04',
    suitableSoils: ['loamy', 'sandy', 'clay'],
    waterNeed: 'low',
    optimalTemp: '10°C - 25°C',
    growthDurationDays: 115,
    sowingWindow: {
      english: '1 Oct - 31 Oct',
      hindi: '1 अक्टूबर - 31 अक्टूबर',
      regional: '1 ਅਕਤੂਬਰ - 31 ਅਕਤੂਬਰ',
    },
    harvestWindow: {
      english: 'February - March',
      hindi: 'फरवरी - मार्च',
      regional: 'ਫ਼ਰਵਰੀ - ਮਾਰਚ',
    },
    yieldPerAcre: {
      min: 8,
      max: 12,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 5950,
    costPerAcre: 11000,
    netProfitPerAcre: {
      min: 36000,
      max: 60000,
    },
    topVarieties: ['Pusa Bold', 'Giriraj (DRMRIJ-31)', 'RH-749', 'Kranti'],
    fertilizerNPK: {
      english: 'DAP: 35 kg, Urea: 60 kg, Sulphur: 10 kg per acre (Essential for oil content)',
      hindi: 'डीएपी: 35 किग्रा, यूरिया: 60 किग्रा, सल्फर: 10 किग्रा प्रति एकड़ (तेल की मात्रा बढ़ाने हेतु)',
      regional: 'ਡੀਏਪੀ: 35 ਕਿਲੋ, ਯੂਰੀਆ: 60 ਕਿਲੋ, ਸਲਫ਼ਰ: 10 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ (ਤੇਲ ਦੀ ਮਾਤਰਾ ਵਧਾਉਣ ਲਈ)',
    },
    irrigationSchedule: {
      english: '2-3 light irrigations only: Pre-flowering (30-35 days) & Pod formation (60-65 days)',
      hindi: 'मात्र 2-3 हल्की सिंचाई: फूल आने से पहले (30-35 दिन) एवं फली बनते समय (60-65 दिन)',
      regional: 'ਸਿਰਫ਼ 2-3 ਹਲਕੀਆਂ ਸਿੰਚਾਈਆਂ: ਫੁੱਲ ਆਉਣ ਤੋਂ ਪਹਿਲਾਂ ਅਤੇ ਫ਼ਲੀਆਂ ਬਣਨ ਵੇਲੇ',
    },
    pestAdvisory: {
      english: 'Prevent Aphid (Chetu/Mahu) attack in cloudy weather with Dimethoate or Imidacloprid.',
      hindi: 'बादल वाले मौसम में मोयला/माहू के प्रकोप से बचाव हेतु इमिडाक्लोप्रिड या नीम तेल का छिड़काव करें।',
      regional: 'ਬੱਦਲਵਾਈ ਮੌਸਮ ਵਿੱਚ ਤੇਲੇ ਤੋਂ ਬਚਾਅ ਲਈ ਨਿੰਮ ਅਰਕ ਜਾਂ ਇਮੀਡਾਕਲੋਪ੍ਰਿਡ ਵਰਤੋ।',
    },
    mspRate: 5950,
    keyAdvantage: {
      english: 'Very low water consumption with high oil market price and excellent profit margins.',
      hindi: 'कम पानी में बंपर पैदावार, तिलहन के भारी दाम और कम लागत में शानदार शुद्ध लाभ।',
      regional: 'ਘੱਟ ਪਾਣੀ ਵਿੱਚ ਵਧੀਆ ਝਾੜ ਅਤੇ ਵੱਧ ਮੁਨਾਫ਼ਾ ਦੇਣ ਵਾਲੀ ਤੇਲ ਬੀਜ ਫ਼ਸਲ।',
    },
  },
  {
    id: 'chickpea',
    name: {
      english: 'Chickpea / Gram',
      hindi: 'चना (Desi / Kabuli Gram)',
      regional: 'ਛੋਲੇ / ਚਣਾ (Chickpea)',
    },
    season: 'rabi',
    emoji: '🌱',
    themeColor: '#16a34a',
    suitableSoils: ['loamy', 'black', 'sandy'],
    waterNeed: 'low',
    optimalTemp: '15°C - 28°C',
    growthDurationDays: 110,
    sowingWindow: {
      english: '15 Oct - 15 Nov',
      hindi: '15 अक्टूबर - 15 नवंबर',
      regional: '15 ਅਕਤੂਬਰ - 15 ਨਵੰਬਰ',
    },
    harvestWindow: {
      english: 'March - April',
      hindi: 'मार्च - अप्रैल',
      regional: 'ਮਾਰਚ - ਅਪ੍ਰੈਲ',
    },
    yieldPerAcre: {
      min: 7,
      max: 11,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 5650,
    costPerAcre: 9500,
    netProfitPerAcre: {
      min: 30000,
      max: 52000,
    },
    topVarieties: ['GNG-1581 (Gangaur)', 'JG-16', 'Pusa-362', 'RVG-202'],
    fertilizerNPK: {
      english: 'DAP: 40 kg, Rhizobium seed treatment. No high nitrogen needed (nitrogen fixer)',
      hindi: 'डीएपी: 40 किग्रा, राइजोबियम कल्चर से बीज उपचार। अधिक यूरिया की आवश्यकता नहीं।',
      regional: 'ਡੀਏਪੀ: 40 ਕਿਲੋ, ਰਾਈਜ਼ੋਬੀਅਮ ਨਾਲ ਬੀਜ ਸੋਧ। ਯੂਰੀਆ ਦੀ ਬਹੁਤੀ ਲੋੜ ਨਹੀਂ।',
    },
    irrigationSchedule: {
      english: '1-2 irrigations: Branching stage (45 days) and pod development stage',
      hindi: '1-2 सिंचाई: शाखाएं फूटने पर (45 दिन) और घेंटियां बनते समय। फूल आते समय पानी न दें।',
      regional: '1-2 ਸਿੰਚਾਈਆਂ: ਟਾਹਣੀਆਂ ਫੁੱਟਣ ਸਮੇਂ ਅਤੇ ਡੋਡੇ ਬਣਨ ਸਮੇਂ। ਫੁੱਲ ਆਉਣ ਵੇਲੇ ਪਾਣੀ ਨਾ ਦਿਓ।',
    },
    pestAdvisory: {
      english: 'Pod borer (Helicoverpa) management: Install pheromone traps and spray Emamectin Benzoate.',
      hindi: 'चना फली छेदक सुंडी से बचाव हेतु फेरोमोन ट्रैप लगाएं और इमामेक्टिन बेंजोएट का छिड़काव करें।',
      regional: 'ਸੂੰਡੀ ਤੋਂ ਬਚਾਅ ਲਈ ਫ਼ੇਰੋਮੋਨ ਟਰੈਪ ਲਗਾਓ ਅਤੇ ਸਿਫ਼ਾਰਸ਼ੀ ਕੀਟਨਾਸ਼ਕ ਵਰਤੋ।',
    },
    mspRate: 5650,
    keyAdvantage: {
      english: 'Improves soil fertility via nitrogen fixation, minimal water requirement, high market rate.',
      hindi: 'मिट्टी की उर्वरता बढ़ाता है, सूखे को सहन करता है और बाजार में पूरे साल स्थिर मांग रहती है।',
      regional: 'ਜ਼ਮੀਨ ਦੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਵਧਾਉਂਦਾ ਹੈ ਅਤੇ ਘੱਟ ਖ਼ਰਚੇ ਵਿੱਚ ਚੰਗਾ ਮੁਨਾਫ਼ਾ ਦਿੰਦਾ ਹੈ।',
    },
  },
  {
    id: 'potato',
    name: {
      english: 'Potato',
      hindi: 'आलू (Potato)',
      regional: 'ਆਲੂ (Potato)',
    },
    season: 'rabi',
    emoji: '🥔',
    themeColor: '#d97706',
    suitableSoils: ['loamy', 'sandy'],
    waterNeed: 'high',
    optimalTemp: '14°C - 22°C',
    growthDurationDays: 90,
    sowingWindow: {
      english: '15 Oct - 10 Nov',
      hindi: '15 अक्टूबर - 10 नवंबर',
      regional: '15 ਅਕਤੂਬਰ - 10 ਨਵੰਬਰ',
    },
    harvestWindow: {
      english: 'January - February',
      hindi: 'जनवरी - फरवरी',
      regional: 'ਜਨਵਰੀ - ਫ਼ਰਵਰੀ',
    },
    yieldPerAcre: {
      min: 100,
      max: 140,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 1100,
    costPerAcre: 35000,
    netProfitPerAcre: {
      min: 65000,
      max: 115000,
    },
    topVarieties: ['Kufri Pukhraj', 'Kufri Jyoti', 'Kufri Bahar', 'Kufri Chipsona-1'],
    fertilizerNPK: {
      english: 'FYM: 10 tonnes, N: 60 kg, P: 40 kg, K: 50 kg per acre with regular earthing up',
      hindi: 'गोबर खाद: 10 टन, यूरिया: 100 किग्रा, डीएपी: 70 किग्रा, पोटाश: 60 किग्रा एवं मिट्टी चढ़ाना',
      regional: 'ਰੂੜੀ ਖਾਦ: 10 ਟਨ, ਯੂਰੀਆ: 100 ਕਿਲੋ, ਡੀਏਪੀ: 70 ਕਿਲੋ, ਪੋਟਾਸ਼: 60 ਕਿਲੋ ਅਤੇ ਮਿੱਟੀ ਚੜ੍ਹਾਉਣਾ',
    },
    irrigationSchedule: {
      english: 'Light frequent irrigation every 8-10 days. Maintain consistent soil moisture.',
      hindi: 'हर 8-10 दिन में हल्की सिंचाई। क्यारियों में जलभराव न होने दें।',
      regional: 'ਹਰ 8-10 ਦਿਨਾਂ ਬਾਅਦ ਹਲਕੀ ਸਿੰਚਾਈ। ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਨ ਨਾ ਦਿਓ।',
    },
    pestAdvisory: {
      english: 'Watch for Late Blight in foggy days. Preventive Mancozeb spray recommended.',
      hindi: 'कोहरे के दिनों में पिछेता झुलसा (Late Blight) से बचाव हेतु मैंकोजेब का सुरक्षात्मक छिड़काव करें।',
      regional: 'ਧੁੰਦਲੇ ਦਿਨਾਂ ਵਿੱਚ ਪਿਛੇਤੇ ਝੁਲਸ ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ ਮੈਨਕੋਜ਼ੈਬ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
    },
    keyAdvantage: {
      english: 'Short duration commercial cash crop with extraordinary yield and high revenue.',
      hindi: 'मात्र 90 दिनों की व्यावसायिक नकदी फसल, भारी उत्पादन और रिकॉर्ड तोड़ आमदनी।',
      regional: 'ਘੱਟ ਦਿਨਾਂ ਵਾਲੀ ਵਪਾਰਕ ਨਕਦੀ ਫ਼ਸਲ, ਭਾਰੀ ਝਾੜ ਅਤੇ ਉੱਚੀ ਕਮਾਈ।',
    },
  },
  {
    id: 'peas',
    name: {
      english: 'Green Peas',
      hindi: 'मटर (Green Peas)',
      regional: 'ਮਟਰ (Green Peas)',
    },
    season: 'rabi',
    emoji: '🟢',
    themeColor: '#22c55e',
    suitableSoils: ['loamy', 'clay'],
    waterNeed: 'medium',
    optimalTemp: '12°C - 20°C',
    growthDurationDays: 75,
    sowingWindow: {
      english: '1 Oct - 15 Nov',
      hindi: '1 अक्टूबर - 15 नवंबर',
      regional: '1 ਅਕਤੂਬਰ - 15 ਨਵੰਬਰ',
    },
    harvestWindow: {
      english: 'December - February',
      hindi: 'दिसंबर - फरवरी',
      regional: 'ਦਸੰਬਰ - ਫ਼ਰਵਰੀ',
    },
    yieldPerAcre: {
      min: 35,
      max: 50,
      unit: 'Quintals (Pods)',
    },
    marketPricePerQuintal: 3200,
    costPerAcre: 22000,
    netProfitPerAcre: {
      min: 65000,
      max: 110000,
    },
    topVarieties: ['Arkel', 'AP-3 (Azad Pea)', 'Pusa Pragati', 'GS-10'],
    fertilizerNPK: {
      english: 'DAP: 45 kg, MOP: 25 kg, Zinc Sulphate: 5 kg per acre',
      hindi: 'डीएपी: 45 किग्रा, पोटाश: 25 किग्रा, जिंक सल्फेट: 5 किग्रा प्रति एकड़',
      regional: 'ਡੀਏਪੀ: 45 ਕਿਲੋ, ਪੋਟਾਸ਼: 25 ਕਿਲੋ, ਜ਼ਿੰਕ: 5 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ',
    },
    irrigationSchedule: {
      english: '3 irrigations: Flowering, Pod filling, and seed formation',
      hindi: '3 सिंचाई: फूल आते समय, फलियां भरते समय और दाना बनते समय',
      regional: '3 ਸਿੰਚਾਈਆਂ: ਫੁੱਲ ਆਉਣ ਸਮੇਂ, ਫ਼ਲੀਆਂ ਭਰਨ ਵੇਲੇ',
    },
    pestAdvisory: {
      english: 'Powdery mildew protection: Spray Wettable Sulphur or Karathane if white powder appears.',
      hindi: 'छाछ्या (पाउडरी मिल्ड्यू) रोग से बचाव हेतु घुलनशील गंधक का छिड़काव करें।',
      regional: 'ਚਿੱਟੇ ਪਾਊਡਰ ਵਰਗੇ ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ ਘੁਲਣਸ਼ੀਲ ਸਲਫ਼ਰ ਵਰਤੋ।',
    },
    keyAdvantage: {
      english: 'Superfast harvest within 65-80 days; enables a third summer crop in same field!',
      hindi: 'मात्र 70-80 दिनों में हरी फलियों की तुड़ाई, मंडी में प्रीमियम भाव और खेत जल्दी खाली।',
      regional: 'ਛੇਤੀ ਤਿਆਰ ਹੋਣ ਵਾਲੀ ਫ਼ਸਲ, ਮੰਡੀ ਵਿੱਚ ਉੱਚਾ ਰੇਟ ਅਤੇ ਅਗਲੀ ਫ਼ਸਲ ਲਈ ਖੇਤ ਖ਼ਾਲੀ।',
    },
  },

  // ==================== KHARIF CROPS (MONSOON) ====================
  {
    id: 'paddy',
    name: {
      english: 'Paddy / Basmati Rice',
      hindi: 'धान / बासमती चावल (Paddy)',
      regional: 'ਝੋਨਾ / ਬਾਸਮਤੀ (Paddy)',
    },
    season: 'kharif',
    emoji: '🌾',
    themeColor: '#10b981',
    suitableSoils: ['clay', 'loamy', 'black'],
    waterNeed: 'high',
    optimalTemp: '25°C - 35°C',
    growthDurationDays: 130,
    sowingWindow: {
      english: '15 June - 15 July',
      hindi: '15 जून - 15 जुलाई',
      regional: '15 ਜੂਨ - 15 ਜੁਲਾਈ',
    },
    harvestWindow: {
      english: 'October - November',
      hindi: 'अक्टूबर - नवंबर',
      regional: 'ਅਕਤੂਬਰ - ਨਵੰਬਰ',
    },
    yieldPerAcre: {
      min: 24,
      max: 32,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 2320,
    costPerAcre: 18000,
    netProfitPerAcre: {
      min: 36000,
      max: 58000,
    },
    topVarieties: ['Pusa Basmati 1509', 'PB 1718', 'PR-126', 'PR-131'],
    fertilizerNPK: {
      english: 'Urea: 100 kg in 3 splits, DAP: 35 kg, Zinc Sulphate 21%: 10 kg',
      hindi: 'यूरिया: 100 किग्रा 3 किस्तों में, डीएपी: 35 किग्रा, जिंक सल्फेट: 10 किग्रा प्रति एकड़',
      regional: 'ਯੂਰੀਆ: 100 ਕਿਲੋ 3 ਵਾਰ, ਡੀਏਪੀ: 35 ਕਿਲੋ, ਜ਼ਿੰਕ ਸਲਫ਼ੇਟ: 10 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ',
    },
    irrigationSchedule: {
      english: 'Keep 2-3 inches standing water in first 2 weeks, then alternate wetting & drying',
      hindi: 'रोपाई के शुरुआती 2 सप्ताह 2-3 इंच पानी रखें, फिर आवश्यकतानुसार सिंचाई दें',
      regional: 'ਪਹਿਲੇ 2 ਹਫ਼ਤੇ ਪਾਣੀ ਖੜ੍ਹਾ ਰੱਖੋ, ਫਿਰ ਲੋੜ ਮੁਤਾਬਕ ਪਾਣੀ ਦਿਓ',
    },
    pestAdvisory: {
      english: 'Stem borer & Brown Plant Hopper (BPH). Apply Cartap Hydrochloride or Pymetrozine.',
      hindi: 'तना छेदक और भूरा फुदका (BPH) की निगरानी रखें। कारटाप या पायीमेट्रोज़ीन का उपयोग करें।',
      regional: 'ਤਣੇ ਦੇ ਗੜੂੰਏਂ ਅਤੇ ਤੇਲੇ ਤੇ ਨਜ਼ਰ ਰੱਖੋ। ਸਿਫ਼ਾਰਸ਼ੀ ਕੀਟਨਾਸ਼ਕ ਵਰਤੋ।',
    },
    mspRate: 2320,
    keyAdvantage: {
      english: 'Ideal for water-rich areas and canal regions with reliable MSP and mandi procurement.',
      hindi: 'नहर एवं प्रचुर पानी वाले क्षेत्रों हेतु आदर्श, सुनिश्चित सरकारी खरीद व तुरंत भुगतान।',
      regional: 'ਵੱਧ ਪਾਣੀ ਵਾਲੇ ਇਲਾਕਿਆਂ ਲਈ ਉੱਤਮ, ਸਰਕਾਰੀ ਖ਼ਰੀਦ ਦੀ ਪੂਰੀ ਤਸੱਲੀ।',
    },
  },
  {
    id: 'cotton',
    name: {
      english: 'Cotton / Kapas',
      hindi: 'कपास (White Gold)',
      regional: 'ਨਰਮਾ / ਕਪਾਹ (Cotton)',
    },
    season: 'kharif',
    emoji: '☁️',
    themeColor: '#0ea5e9',
    suitableSoils: ['black', 'loamy'],
    waterNeed: 'medium',
    optimalTemp: '24°C - 35°C',
    growthDurationDays: 160,
    sowingWindow: {
      english: '15 April - 25 May',
      hindi: '15 अप्रैल - 25 मई',
      regional: '15 ਅਪ੍ਰੈਲ - 25 ਮਈ',
    },
    harvestWindow: {
      english: 'October - December',
      hindi: 'अक्टूबर - दिसंबर',
      regional: 'ਅਕਤੂਬਰ - ਦਸੰਬਰ',
    },
    yieldPerAcre: {
      min: 9,
      max: 14,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 7521,
    costPerAcre: 24000,
    netProfitPerAcre: {
      min: 42000,
      max: 82000,
    },
    topVarieties: ['RCH-659 BG-II', 'Bhakti', 'Ankur-3028', 'Bio-6488'],
    fertilizerNPK: {
      english: 'Urea: 90 kg (3 splits), DAP: 40 kg, MOP: 25 kg, Magnesium Sulphate: 10 kg',
      hindi: 'यूरिया: 90 किग्रा (3 बार), डीएपी: 40 किग्रा, पोटाश: 25 किग्रा, मैग्नीशियम सल्फेट: 10 किग्रा',
      regional: 'ਯੂਰੀਆ: 90 ਕਿਲੋ, ਡੀਏਪੀ: 40 ਕਿਲੋ, ਪੋਟਾਸ਼: 25 ਕਿਲੋ, ਮੈਗਨੀਸ਼ੀਅਮ ਸਲਫ਼ੇਟ: 10 ਕਿਲੋ',
    },
    irrigationSchedule: {
      english: '4-5 irrigations: Flower initiation and boll development are most critical',
      hindi: '4-5 सिंचाई: फूल खिलते समय एवं टिंडे (Bolls) बनते समय पानी की कमी न होने दें',
      regional: '4-5 ਸਿੰਚਾਈਆਂ: ਫੁੱਲ ਖਿੜਨ ਅਤੇ ਟੀਂਡੇ ਬਣਨ ਸਮੇਂ ਪਾਣੀ ਦੀ ਘਾਟ ਨਾ ਆਉਣ ਦਿਓ',
    },
    pestAdvisory: {
      english: 'Whitefly & Pink Bollworm risk: Install yellow sticky traps and spray Neem oil or Profenofos.',
      hindi: 'सफेद मक्खी और गुलाबी सुंडी से बचाव हेतु पीले चिपचिपे कार्ड लगाएं और प्रोफेनोफॉस का छिड़काव करें।',
      regional: 'ਚਿੱਟੀ ਮੱਖੀ ਅਤੇ ਗੁਲਾਬੀ ਸੂੰਡੀ ਤੋਂ ਬਚਾਅ ਲਈ ਪੀਲੇ ਕਾਰਡ ਅਤੇ ਸਿਫ਼ਾਰਸ਼ੀ ਕੀਟਨਾਸ਼ਕ ਵਰਤੋ।',
    },
    mspRate: 7521,
    keyAdvantage: {
      english: 'High-value commercial cash crop with extraordinary market price and huge trading demand.',
      hindi: 'सफेद सोना कहलाने वाली नकदी फसल, उच्च बाजार मूल्य और भारी मुनाफा।',
      regional: 'ਵੱਡਾ ਮੁਨਾਫ਼ਾ ਦੇਣ ਵਾਲੀ ਨਕਦੀ ਫ਼ਸਲ ਜਿਸਦਾ ਮੰਡੀ ਰੇਟ ਹਮੇਸ਼ਾ ਉੱਚਾ ਰਹਿੰਦਾ ਹੈ।',
    },
  },
  {
    id: 'maize',
    name: {
      english: 'Maize / Corn',
      hindi: 'मक्का (Maize / Makka)',
      regional: 'ਮੱਕੀ (Corn)',
    },
    season: 'kharif',
    emoji: '🌽',
    themeColor: '#eab308',
    suitableSoils: ['loamy', 'black', 'sandy'],
    waterNeed: 'medium',
    optimalTemp: '20°C - 32°C',
    growthDurationDays: 100,
    sowingWindow: {
      english: '15 June - 15 July',
      hindi: '15 जून - 15 जुलाई',
      regional: '15 ਜੂਨ - 15 ਜੁਲਾਈ',
    },
    harvestWindow: {
      english: 'September - October',
      hindi: 'सितंबर - अक्टूबर',
      regional: 'ਸਤੰਬਰ - ਅਕਤੂਬਰ',
    },
    yieldPerAcre: {
      min: 22,
      max: 30,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 2225,
    costPerAcre: 13000,
    netProfitPerAcre: {
      min: 34000,
      max: 53000,
    },
    topVarieties: ['Pioneer P3396', 'Dekalb 9108', 'HQPM-1', 'Bio-9681'],
    fertilizerNPK: {
      english: 'Urea: 80 kg, DAP: 45 kg, MOP: 20 kg, Zinc: 8 kg per acre',
      hindi: 'यूरिया: 80 किग्रा, डीएपी: 45 किग्रा, पोटाश: 20 किग्रा, जिंक: 8 किग्रा प्रति एकड़',
      regional: 'ਯੂਰੀਆ: 80 ਕਿਲੋ, ਡੀਏਪੀ: 45 ਕਿਲੋ, ਪੋਟਾਸ਼: 20 ਕਿਲੋ, ਜ਼ਿੰਕ: 8 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ',
    },
    irrigationSchedule: {
      english: 'Tasseling and silking are critical moisture periods. Waterlogging must be drained.',
      hindi: 'मंजरी (टैसेलिंग) और भुट्टा बनते समय नमी आवश्यक है। खेत में पानी रुकने न दें।',
      regional: 'ਛੱਲੀ ਬਣਨ ਸਮੇਂ ਪਾਣੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਨ ਨਾ ਦਿਓ।',
    },
    pestAdvisory: {
      english: 'Fall Armyworm (FAW) can attack leaves. Spray Spinetoram or Chlorantraniliprole.',
      hindi: 'फॉल आर्मीवर्म सुंडी से बचाव हेतु स्पाइनटोरम या कोराजन का छिड़काव पत्तियों के पोंगे में करें।',
      regional: 'ਸੂੰਡੀ ਤੋਂ ਬਚਾਅ ਲਈ ਸਿਫ਼ਾਰਸ਼ੀ ਕੀਟਨਾਸ਼ਕ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
    },
    mspRate: 2225,
    keyAdvantage: {
      english: 'Industrial demand for ethanol, poultry feed and starch guarantees quick mandi sales.',
      hindi: 'एथेनॉल और पोल्ट्री फीड उद्योग के कारण लगातार मजबूत मांग और कम जोखिम।',
      regional: 'ਪੋਲਟਰੀ ਫ਼ੀਡ ਅਤੇ ਉਦਯੋਗਾਂ ਵੱਲੋਂ ਭਾਰੀ ਮੰਗ, ਆਸਾਨੀ ਨਾਲ ਵਿਕਣ ਵਾਲੀ ਫ਼ਸਲ।',
    },
  },
  {
    id: 'bajra',
    name: {
      english: 'Pearl Millet / Bajra',
      hindi: 'बाजरा (Pearl Millet)',
      regional: 'ਬਾਜਰਾ (Bajra)',
    },
    season: 'kharif',
    emoji: '🌾',
    themeColor: '#84cc16',
    suitableSoils: ['sandy', 'loamy'],
    waterNeed: 'low',
    optimalTemp: '25°C - 38°C',
    growthDurationDays: 85,
    sowingWindow: {
      english: '1 July - 30 July',
      hindi: '1 जुलाई - 30 जुलाई',
      regional: '1 ਜੁਲਾਈ - 30 ਜੁਲਾਈ',
    },
    harvestWindow: {
      english: 'September - October',
      hindi: 'सितंबर - अक्टूबर',
      regional: 'ਸਤੰਬਰ - ਅਕਤੂਬਰ',
    },
    yieldPerAcre: {
      min: 12,
      max: 18,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 2625,
    costPerAcre: 8500,
    netProfitPerAcre: {
      min: 22000,
      max: 38000,
    },
    topVarieties: ['RHB-177', 'HHB-67 Improved', 'MPMH-17', 'Pusa-1201'],
    fertilizerNPK: {
      english: 'DAP: 30 kg, Urea: 45 kg per acre. Very low fertilizer requirement',
      hindi: 'डीएपी: 30 किग्रा, यूरिया: 45 किग्रा प्रति एकड़। बहुत कम खाद में तैयार।',
      regional: 'ਡੀਏਪੀ: 30 ਕਿਲੋ, ਯੂਰੀਆ: 45 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ। ਬਹੁਤ ਘੱਟ ਖਾਦ ਦੀ ਲੋੜ।',
    },
    irrigationSchedule: {
      english: 'Grows mostly on monsoon rainfall; needs only 1 life-saving irrigation during dry spell',
      hindi: 'मानसून की बारिश में तैयार, सूखा पड़ने पर केवल 1 जीवन रक्षक सिंचाई चाहिए',
      regional: 'ਮੌਨਸੂਨ ਵਿੱਚ ਤਿਆਰ, ਸੋਕੇ ਵੇਲੇ ਸਿਰਫ਼ 1 ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ',
    },
    pestAdvisory: {
      english: 'Downy mildew and ergot: Use certified seed treated with Metalaxyl.',
      hindi: 'डाउनी मिल्ड्यू व चेपा रोग से बचाव के लिए मेटालेक्सिल से उपचारित बीज ही बोएं।',
      regional: 'ਰੋਗਾਂ ਤੋਂ ਬਚਾਅ ਲਈ ਸੋਧਿਆ ਹੋਇਆ ਬੀਜ ਹੀ ਵਰਤੋ।',
    },
    mspRate: 2625,
    keyAdvantage: {
      english: 'Extremely drought resistant; thrives in poor sandy soils where nothing else grows.',
      hindi: 'सूखे और रेतीली जमीन का राजा, न्यूनतम खर्च और पशुओं के लिए पौष्टिक कड़बी (चारा)।',
      regional: 'ਸੋਕੇ ਨੂੰ ਸਹਿਣ ਵਾਲੀ ਫ਼ਸਲ, ਘੱਟ ਖ਼ਰਚੇ ਵਿੱਚ ਦਾਣਾ ਅਤੇ ਪਸ਼ੂਆਂ ਲਈ ਵਧੀਆ ਚਾਰਾ।',
    },
  },
  {
    id: 'soybean',
    name: {
      english: 'Soybean',
      hindi: 'सोयाबीन (Soybean)',
      regional: 'ਸੋਇਆਬੀਨ (Soybean)',
    },
    season: 'kharif',
    emoji: '🌱',
    themeColor: '#059669',
    suitableSoils: ['black', 'loamy', 'clay'],
    waterNeed: 'medium',
    optimalTemp: '22°C - 32°C',
    growthDurationDays: 95,
    sowingWindow: {
      english: '20 June - 10 July',
      hindi: '20 जून - 10 जुलाई',
      regional: '20 ਜੂਨ - 10 ਜੁਲਾਈ',
    },
    harvestWindow: {
      english: 'September - October',
      hindi: 'सितंबर - अक्टूबर',
      regional: 'ਸਤੰਬਰ - ਅਕਤੂਬਰ',
    },
    yieldPerAcre: {
      min: 8,
      max: 13,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 4892,
    costPerAcre: 11500,
    netProfitPerAcre: {
      min: 27000,
      max: 51000,
    },
    topVarieties: ['JS-2034', 'JS-9560', 'NRC-37', 'RVS-2001-4'],
    fertilizerNPK: {
      english: 'DAP: 40 kg, MOP: 15 kg, Sulphur: 8 kg with Bradyrhizobium culture seed treatment',
      hindi: 'डीएपी: 40 किग्रा, पोटाश: 15 किग्रा, सल्फर: 8 किग्रा व राइजोबियम से बीज उपचार',
      regional: 'ਡੀਏਪੀ: 40 ਕਿਲੋ, ਪੋਟਾਸ਼: 15 ਕਿਲੋ, ਸਲਫ਼ਰ: 8 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ',
    },
    irrigationSchedule: {
      english: 'Pod formation and seed filling are critical. Ensure good drainage during heavy downpours.',
      hindi: 'फलियां भरते समय नमी बनाए रखें, खेत में जलभराव की निकासी का प्रबंध रखें।',
      regional: 'ਫ਼ਲੀਆਂ ਬਣਨ ਵੇਲੇ ਨਮੀ ਬਣਾਈ ਰੱਖੋ, ਵਾਧੂ ਪਾਣੀ ਦੇ ਨਿਕਾਸ ਦਾ ਪ੍ਰਬੰਧ ਰੱਖੋ।',
    },
    pestAdvisory: {
      english: 'Girdle beetle & Semilooper control: Spray Triazophos or Chlorantraniliprole.',
      hindi: 'गर्डल बीटल (चक्र भृंग) व सेमीलूपर सुंडी के प्रकोप पर क्लोरएंट्रानिलिप्रोल का छिड़काव करें।',
      regional: 'ਕੀੜਿਆਂ ਤੋਂ ਬਚਾਅ ਲਈ ਸਿਫ਼ਾਰਸ਼ੀ ਦਵਾਈ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
    },
    mspRate: 4892,
    keyAdvantage: {
      english: 'Boosts soil health through biological nitrogen fixation and has strong oil mill demand.',
      hindi: 'जमीन की उर्वरा शक्ति बढ़ाए, तिलहन तेल मिलों की भारी मांग व 95 दिनों में तैयार।',
      regional: 'ਜ਼ਮੀਨ ਨੂੰ ਉਪਜਾਊ ਬਣਾਉਂਦੀ ਹੈ ਅਤੇ ਤੇਲ ਮਿੱਲਾਂ ਵਿੱਚ ਹੱਥੋਂ-ਹੱਥ ਵਿਕਦੀ ਹੈ।',
    },
  },

  // ==================== ZAID CROPS (SUMMER) ====================
  {
    id: 'watermelon',
    name: {
      english: 'Watermelon',
      hindi: 'तरबूज (Watermelon)',
      regional: 'ਹਦਵਾਣਾ / ਤਰਬੂਜ਼ (Watermelon)',
    },
    season: 'zaid',
    emoji: '🍉',
    themeColor: '#ef4444',
    suitableSoils: ['sandy', 'loamy'],
    waterNeed: 'medium',
    optimalTemp: '24°C - 38°C',
    growthDurationDays: 80,
    sowingWindow: {
      english: '15 Feb - 25 March',
      hindi: '15 फरवरी - 25 मार्च',
      regional: '15 ਫ਼ਰਵਰੀ - 25 ਮਾਰਚ',
    },
    harvestWindow: {
      english: 'May - June',
      hindi: 'मई - जून',
      regional: 'ਮਈ - ਜੂਨ',
    },
    yieldPerAcre: {
      min: 160,
      max: 240,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 850,
    costPerAcre: 32000,
    netProfitPerAcre: {
      min: 90000,
      max: 160000,
    },
    topVarieties: ['Kiran (Known You)', 'Saraswati', 'Sugar Baby', 'Black Beauty'],
    fertilizerNPK: {
      english: 'Drip fertigation recommended: 19:19:19 during vine growth, 0:52:34 and 0:0:50 during fruiting',
      hindi: 'ड्रिप व मल्चिंग उत्तम: बेल वृद्धि पर 19:19:19, फल बनने पर 0:52:34 और 0:0:50 दें',
      regional: 'ਡ੍ਰਿਪ ਰਾਹੀਂ ਖਾਦ ਦਿਓ: ਵੇਲ ਵਧਣ ਸਮੇਂ 19:19:19 ਅਤੇ ਫ਼ਲ ਬਣਨ ਵੇਲੇ ਪੋਟਾਸ਼ੀਅਮ ਖਾਦ ਦਿਓ',
    },
    irrigationSchedule: {
      english: 'Drip irrigation every 2 days. Stop irrigation 4-5 days before harvest to enhance sweetness.',
      hindi: 'ड्रिप से 2 दिन में एक बार सिंचाई। तुड़ाई से 4 दिन पहले पानी रोकें ताकि मिठास बढ़े।',
      regional: 'ਹਰ 2 ਦਿਨਾਂ ਬਾਅਦ ਸਿੰਚਾਈ। ਤੁੜਾਈ ਤੋਂ 4 ਦਿਨ ਪਹਿਲਾਂ ਪਾਣੀ ਰੋਕੋ ਤਾਂ ਜੋ ਮਿਠਾਸ ਵਧੇ।',
    },
    pestAdvisory: {
      english: 'Fruit fly & Red pumpkin beetle: Hang pheromone traps (cue-lure) and use insect net.',
      hindi: 'फल मक्खी और लाल भृंग से बचाव हेतु फेरोमोन ट्रैप (क्यू ल्यूर) लगाएं।',
      regional: 'ਫ਼ਲ ਦੀ ਮੱਖੀ ਤੋਂ ਬਚਾਅ ਲਈ ਫ਼ੇਰੋਮੋਨ ਟਰੈਪ ਲਗਾਓ।',
    },
    keyAdvantage: {
      english: 'Massive summer thirst market; incredible profit margin of over ₹1,00,000/acre in 80 days!',
      hindi: 'गर्मियों में भारी मांग, मात्र 80 दिनों में प्रति एकड़ ₹1 लाख से अधिक शुद्ध मुनाफा!',
      regional: 'ਗਰਮੀਆਂ ਵਿੱਚ ਬੰਪਰ ਮੰਗ, ਸਿਰਫ਼ 80 ਦਿਨਾਂ ਵਿੱਚ ਪ੍ਰਤੀ ਏਕੜ ₹1 ਲੱਖ ਤੋਂ ਵੱਧ ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ!',
    },
  },
  {
    id: 'moong',
    name: {
      english: 'Summer Moong / Green Gram',
      hindi: 'मूंग दाल (Summer Moong)',
      regional: 'ਮੂੰਗੀ (Summer Moong)',
    },
    season: 'zaid',
    emoji: '🟢',
    themeColor: '#16a34a',
    suitableSoils: ['loamy', 'sandy', 'black'],
    waterNeed: 'low',
    optimalTemp: '28°C - 40°C',
    growthDurationDays: 65,
    sowingWindow: {
      english: '1 March - 10 April',
      hindi: '1 मार्च - 10 अप्रैल',
      regional: '1 ਮਾਰਚ - 10 ਅਪ੍ਰੈਲ',
    },
    harvestWindow: {
      english: 'May - June',
      hindi: 'मई - जून',
      regional: 'ਮਈ - ਜੂਨ',
    },
    yieldPerAcre: {
      min: 5,
      max: 8,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 8682,
    costPerAcre: 8000,
    netProfitPerAcre: {
      min: 32000,
      max: 60000,
    },
    topVarieties: ['SML-668', 'IPM 205-7 (Virat)', 'Pusa Vishal', 'Shikha'],
    fertilizerNPK: {
      english: 'DAP: 30 kg per acre. Treat seed with Rhizobium and PSB culture',
      hindi: 'डीएपी: 30 किग्रा प्रति एकड़। बीज को राइजोबियम व पीएसबी कल्चर से उपचारित करें।',
      regional: 'ਡੀਏਪੀ: 30 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ। ਰਾਈਜ਼ੋਬੀਅਮ ਨਾਲ ਬੀਜ ਸੋਧ ਜ਼ਰੂਰ ਕਰੋ।',
    },
    irrigationSchedule: {
      english: '3-4 light irrigations at 10-15 day intervals. Stop watering when pods start maturing.',
      hindi: '10-15 दिन के अंतराल पर 3-4 हल्की सिंचाई। फलियां पकते समय पानी बंद कर दें।',
      regional: '10-15 ਦਿਨਾਂ ਦੇ ਵਕਫ਼ੇ ਤੇ 3-4 ਹਲਕੀਆਂ ਸਿੰਚਾਈਆਂ। ਫ਼ਲੀਆਂ ਪੱਕਣ ਵੇਲੇ ਪਾਣੀ ਬੰਦ ਕਰੋ।',
    },
    pestAdvisory: {
      english: 'Yellow Mosaic Virus (YMV) transmitted by whitefly: Grow resistant variety and spray Thiamethoxam.',
      hindi: 'सफेद मक्खी द्वारा फैलने वाले पीला मोजेक वायरस से बचाव हेतु थायमेथोक्सम का छिड़काव करें।',
      regional: 'ਚਿੱਟੀ ਮੱਖੀ ਤੋਂ ਬਚਾਅ ਲਈ ਥਾਇਆਮੈਥੋਕਸਮ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
    },
    mspRate: 8682,
    keyAdvantage: {
      english: 'Ultra short 65-day catch crop that enriches field nitrogen before Kharif sowing!',
      hindi: 'मात्र 65 दिनों की बोनस फसल; गेहूं के बाद और खरीफ से पहले खेत को नाइट्रोजन से भर देती है।',
      regional: 'ਸਿਰਫ਼ 65 ਦਿਨਾਂ ਵਿੱਚ ਤਿਆਰ ਹੋ ਕੇ ਜ਼ਮੀਨ ਦੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਦੁੱਗਣੀ ਕਰ ਦਿੰਦੀ ਹੈ।',
    },
  },
  {
    id: 'cucumber',
    name: {
      english: 'Cucumber / Khira',
      hindi: 'खीरा / ककड़ी (Cucumber)',
      regional: 'ਖੀਰਾ (Cucumber)',
    },
    season: 'zaid',
    emoji: '🥒',
    themeColor: '#22c55e',
    suitableSoils: ['loamy', 'sandy'],
    waterNeed: 'medium',
    optimalTemp: '22°C - 35°C',
    growthDurationDays: 60,
    sowingWindow: {
      english: '15 Feb - 31 March',
      hindi: '15 फरवरी - 31 मार्च',
      regional: '15 ਫ਼ਰਵਰੀ - 31 ਮਾਰਚ',
    },
    harvestWindow: {
      english: 'April - June',
      hindi: 'अप्रैल - जून',
      regional: 'ਅਪ੍ਰੈਲ - ਜੂਨ',
    },
    yieldPerAcre: {
      min: 70,
      max: 110,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 1500,
    costPerAcre: 24000,
    netProfitPerAcre: {
      min: 75000,
      max: 135000,
    },
    topVarieties: ['Malini (Seminis)', 'Pusa Uday', 'Hilton', 'Gypsy'],
    fertilizerNPK: {
      english: 'FYM: 8 tonnes, Urea: 50 kg, DAP: 40 kg, MOP: 30 kg per acre',
      hindi: 'गोबर खाद: 8 टन, यूरिया: 50 किग्रा, डीएपी: 40 किग्रा, पोटाश: 30 किग्रा प्रति एकड़',
      regional: 'ਰੂੜੀ ਖਾਦ: 8 ਟਨ, ਯੂਰੀਆ: 50 ਕਿਲੋ, ਡੀਏਪੀ: 40 ਕਿਲੋ, ਪੋਟਾਸ਼: 30 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ',
    },
    irrigationSchedule: {
      english: 'Frequent light irrigation every 3-4 days to prevent fruit bitterness',
      hindi: 'हर 3-4 दिन में हल्की सिंचाई ताकि फल में कड़वाहट न आए और पैदावार बनी रहे',
      regional: 'ਹਰ 3-4 ਦਿਨਾਂ ਬਾਅਦ ਹਲਕੀ ਸਿੰਚਾਈ ਤਾਂ ਜੋ ਫ਼ਲ ਵਿੱਚ ਕੁੜੱਤਣ ਨਾ ਆਵੇ',
    },
    pestAdvisory: {
      english: 'Downy mildew and leaf miners. Spray Metalaxyl + Mancozeb if spots occur.',
      hindi: 'डाउनी मिल्ड्यू व लीफ माइनर से बचाव हेतु मेटालेक्सिल + मैंकोजेब का छिड़काव करें।',
      regional: 'ਪੱਤਿਆਂ ਦੇ ਰੋਗਾਂ ਤੋਂ ਬਚਾਅ ਲਈ ਸਿਫ਼ਾਰਸ਼ੀ ਉੱਲੀਨਾਸ਼ਕ ਵਰਤੋ।',
    },
    keyAdvantage: {
      english: 'Harvest starts in just 45-50 days; continuous daily cash flow in local vegetable mandis.',
      hindi: '45-50 दिनों में रोजाना तुड़ाई शुरू; प्रतिदिन मंडी से नकद आमदनी का सबसे भरोसेमंद स्रोत।',
      regional: '45-50 ਦਿਨਾਂ ਵਿੱਚ ਤੁੜਾਈ ਸ਼ੁਰੂ ਅਤੇ ਸਬਜ਼ੀ ਮੰਡੀ ਵਿੱਚ ਰੋਜ਼ਾਨਾ ਨਕਦ ਕਮਾਈ।',
    },
  },
  {
    id: 'bittergourd',
    name: {
      english: 'Bitter Gourd / Karela',
      hindi: 'करेला (Bitter Gourd)',
      regional: 'ਕਰੇਲਾ (Bitter Gourd)',
    },
    season: 'zaid',
    emoji: '🥒',
    themeColor: '#15803d',
    suitableSoils: ['loamy', 'sandy'],
    waterNeed: 'medium',
    optimalTemp: '24°C - 35°C',
    growthDurationDays: 85,
    sowingWindow: {
      english: '15 Feb - 20 March',
      hindi: '15 फरवरी - 20 मार्च',
      regional: '15 ਫ਼ਰਵਰੀ - 20 ਮਾਰਚ',
    },
    harvestWindow: {
      english: 'April - July',
      hindi: 'अप्रैल - जुलाई',
      regional: 'ਅਪ੍ਰੈਲ - ਜੁਲਾਈ',
    },
    yieldPerAcre: {
      min: 50,
      max: 80,
      unit: 'Quintals',
    },
    marketPricePerQuintal: 2800,
    costPerAcre: 26000,
    netProfitPerAcre: {
      min: 80000,
      max: 155000,
    },
    topVarieties: ['Pusa Vishesh', 'Pusa Do Mausami', 'Chaman (East West)', 'US-6214'],
    fertilizerNPK: {
      english: 'Urea: 60 kg, DAP: 45 kg, MOP: 35 kg per acre with trellis support system',
      hindi: 'यूरिया: 60 किग्रा, डीएपी: 45 किग्रा, पोटाश: 35 किग्रा प्रति एकड़ (मचान/झाली विधि सर्वोत्तम)',
      regional: 'ਯੂਰੀਆ: 60 ਕਿਲੋ, ਡੀਏਪੀ: 45 ਕਿਲੋ, ਪੋਟਾਸ਼: 35 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ',
    },
    irrigationSchedule: {
      english: 'Every 4-5 days during hot dry spells. Keep root zone well aerated.',
      hindi: 'तेज गर्मी में हर 4-5 दिन में सिंचाई। जड़ों के पास पानी न जमने दें।',
      regional: 'ਗਰਮੀ ਵਿੱਚ ਹਰ 4-5 ਦਿਨਾਂ ਬਾਅਦ ਸਿੰਚਾਈ ਕਰੋ।',
    },
    pestAdvisory: {
      english: 'Fruit fly management: Use cue-lure traps and spray Neem-based bio-pesticides.',
      hindi: 'फल मक्खी नियंत्रण के लिए फेरोमोन ट्रैप लगाएं और नीम का तेल 1500 पीपीएम का छिड़काव करें।',
      regional: 'ਫ਼ਲ ਮੱਖੀ ਤੋਂ ਬਚਾਅ ਲਈ ਨਿੰਮ ਅਰਕ ਅਤੇ ਟਰੈਪ ਵਰਤੋ।',
    },
    keyAdvantage: {
      english: 'High medicinal & export value, strong price retention throughout summer season.',
      hindi: 'औषधीय गुणों के कारण हमेशा ऊंचे दाम, गर्मियों में शादी-विवाह व शहरों में भारी मांग।',
      regional: 'ਗਰਮੀਆਂ ਵਿੱਚ ਹਮੇਸ਼ਾ ਚੰਗਾ ਭਾਅ ਦੇਣ ਵਾਲੀ ਉੱਚ ਮੁਨਾਫ਼ੇ ਵਾਲੀ ਸਬਜ਼ੀ।',
    },
  },
];

export interface PredictionResult {
  crop: CropData;
  suitabilityScore: number; // 0 to 100
  matchReason: {
    english: string;
    hindi: string;
    regional: string;
  };
  rank: number;
  estimatedTotalYield: {
    min: number;
    max: number;
    unit: string;
  };
  estimatedGrossIncome: {
    min: number;
    max: number;
  };
  estimatedTotalProfit: {
    min: number;
    max: number;
  };
}

/**
 * Intelligent recommendation algorithm based on agronomic logic:
 * Considers Season match, Soil adaptability, Water availability, and farm goals.
 */
export function predictBestCrops(
  season: SeasonType,
  soil: SoilType,
  water: WaterLevel,
  landAcres: number = 2.5,
  goal: FilterGoal = 'all'
): PredictionResult[] {
  const scoredCrops = CROP_DATABASE.map((crop) => {
    let score = 50; // base score for belonging to database

    // 1. Season Alignment (Heavily weighted)
    if (crop.season === season) {
      score += 35;
    } else {
      score -= 30; // Off-season penalty
    }

    // 2. Soil Type Compatibility
    if (crop.suitableSoils.includes(soil)) {
      score += 15;
    } else {
      score -= 10;
    }

    // 3. Water Availability Compatibility
    if (crop.waterNeed === water) {
      score += 15;
    } else if (crop.waterNeed === 'low' && (water === 'medium' || water === 'high')) {
      score += 10; // low water crop does fine with more water if drainage is ok
    } else if (crop.waterNeed === 'high' && water === 'low') {
      score -= 28; // High water crop in low water area is high risk
    } else if (crop.waterNeed === 'high' && water === 'medium') {
      score -= 5;
    } else if (crop.waterNeed === 'medium' && water === 'low') {
      score -= 12;
    }

    // Goal adjustments
    if (goal === 'high-profit') {
      if (crop.netProfitPerAcre.max >= 60000) score += 10;
    } else if (goal === 'low-water') {
      if (crop.waterNeed === 'low') score += 12;
      if (crop.waterNeed === 'high') score -= 15;
    } else if (goal === 'quick-harvest') {
      if (crop.growthDurationDays <= 90) score += 12;
    }

    // Bound score between 40% and 99%
    const finalScore = Math.min(99, Math.max(42, Math.round(score)));

    // Generate bilingual match reasons
    const matchReason = {
      english: `${crop.season.toUpperCase()} season crop. ${
        crop.suitableSoils.includes(soil) ? 'Perfect match for ' + soil + ' soil.' : 'Tolerates ' + soil + ' soil.'
      } ${water === 'low' && crop.waterNeed === 'low' ? 'Low water requirement aligns with your source.' : 'High yield potential under available irrigation.'}`,
      hindi: `${season === 'rabi' ? 'रबी' : season === 'kharif' ? 'खरीफ' : 'जायद'} मौसम की प्रमुख फसल। ${
        crop.suitableSoils.includes(soil) ? `${soil} मिट्टी के लिए अत्यंत उपयुक्त।` : `उचित खाद प्रबंधन के साथ अनुकूल।`
      } ${crop.waterNeed === 'low' ? 'कम पानी में भी सुरक्षित पैदावार।' : 'उपलब्ध सिंचाई में बंपर उत्पादन क्षमता।'}`,
      regional: `${season === 'rabi' ? 'ਹਾੜੀ' : season === 'kharif' ? 'ਸਾਉਣੀ' : 'ਜ਼ਾਇਦ'} ਮੌਸਮ ਦੀ ਮੁੱਖ ਫ਼ਸਲ। ${
        crop.suitableSoils.includes(soil) ? `ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਲਈ ਬਿਲਕੁਲ ਢੁਕਵੀਂ ਹੈ।` : `ਵਧੀਆ ਪ੍ਰਬੰਧ ਨਾਲ ਸਫ਼ਲ।`
      }`,
    };

    const minYield = +(crop.yieldPerAcre.min * landAcres).toFixed(1);
    const maxYield = +(crop.yieldPerAcre.max * landAcres).toFixed(1);

    const minGross = Math.round(minYield * crop.marketPricePerQuintal);
    const maxGross = Math.round(maxYield * crop.marketPricePerQuintal);

    const minProfit = Math.round(crop.netProfitPerAcre.min * landAcres);
    const maxProfit = Math.round(crop.netProfitPerAcre.max * landAcres);

    return {
      crop,
      suitabilityScore: finalScore,
      matchReason,
      rank: 1,
      estimatedTotalYield: {
        min: minYield,
        max: maxYield,
        unit: crop.yieldPerAcre.unit,
      },
      estimatedGrossIncome: {
        min: minGross,
        max: maxGross,
      },
      estimatedTotalProfit: {
        min: minProfit,
        max: maxProfit,
      },
    };
  });

  // Filter primarily for selected season or top matches
  const sorted = scoredCrops
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));

  return sorted;
}

/**
 * Auto-detects Indian agricultural season based on current date
 */
export function getCurrentSeason(): SeasonType {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
  // Oct (9) to Mar (2) -> Rabi
  // Apr (3) to Jun (5) -> Zaid
  // Jul (6) to Sep (8) -> Kharif
  if (month >= 9 || month <= 2) {
    return 'rabi';
  } else if (month >= 3 && month <= 5) {
    return 'zaid';
  } else {
    return 'kharif';
  }
}

