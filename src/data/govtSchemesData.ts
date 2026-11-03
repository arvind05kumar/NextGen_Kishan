export interface GovtScheme {
  id: string;
  category: {
    english: string;
    hindi: string;
    regional: string;
  };
  title: {
    english: string;
    hindi: string;
    regional: string;
  };
  highlight: {
    english: string;
    hindi: string;
    regional: string;
  };
  description: {
    english: string;
    hindi: string;
    regional: string;
  };
  badge: {
    english: string;
    hindi: string;
    regional: string;
  };
  badgeColor: string;
  officialUrl: string;
  domainName: string;
  department: {
    english: string;
    hindi: string;
    regional: string;
  };
  emoji: string;
  status: "live" | "new" | "active";
}

export const GOVT_SCHEMES_DATA: GovtScheme[] = [
  {
    id: "pm-kisan",
    emoji: "🌾",
    status: "live",
    category: {
      english: "Direct Benefit Transfer (DBT)",
      hindi: "प्रत्यक्ष लाभ अंतरण (DBT)",
      regional: "ਸਿੱਧਾ ਲਾਭ ਤਬਾਦਲਾ (DBT)"
    },
    title: {
      english: "PM-Kisan Samman Nidhi: 19th Installment Released",
      hindi: "पीएम-किसान सम्मान निधि: 19वीं किस्त जारी (₹2,000 खाते में)",
      regional: "ਪੀਐੱਮ-ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ: 19ਵੀਂ ਕਿਸ਼ਤ ਜਾਰੀ (₹2,000 ਖਾਤੇ ਵਿੱਚ)"
    },
    highlight: {
      english: "₹6,000 / year in 3 installments (e-KYC mandatory)",
      hindi: "₹6,000 प्रति वर्ष (e-KYC व आधार लिंक स्टेटस तुरंत चेक करें)",
      regional: "ਸਾਲਾਨਾ ₹6,000 (e-KYC ਅਤੇ ਆਧਾਰ ਲਿੰਕ ਸਥਿਤੀ ਵੇਖੋ)"
    },
    description: {
      english: "All landholding eligible farmer families get ₹2,000 every 4 months directly into Aadhaar-seeded bank accounts.",
      hindi: "पात्र किसान परिवारों को हर 4 महीने में ₹2,000 सीधे बैंक खाते में मिलते हैं। अपना नाम बेनिफिशियरी लिस्ट में देखें।",
      regional: "ਯੋਗ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਹਰ 4 ਮਹੀਨੇ ਬਾਅਦ ₹2,000 ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਮਿਲਦੇ ਹਨ।"
    },
    badge: {
      english: "19th Kist Live",
      hindi: "19वीं किस्त लाइव",
      regional: "19ਵੀਂ ਕਿਸ਼ਤ ਚਾਲੂ"
    },
    badgeColor: "#16a34a",
    officialUrl: "https://pmkisan.gov.in/",
    domainName: "pmkisan.gov.in",
    department: {
      english: "Ministry of Agriculture & Farmers Welfare, Govt of India",
      hindi: "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार",
      regional: "ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲਾ, ਭਾਰਤ ਸਰਕਾਰ"
    }
  },
  {
    id: "pmfby",
    emoji: "🛡️",
    status: "live",
    category: {
      english: "Crop Insurance & Risk Shield",
      hindi: "फसल सुरक्षा व बीमा",
      regional: "ਫ਼ਸਲ ਬੀਮਾ ਤੇ ਸੁਰੱਖਿਆ"
    },
    title: {
      english: "Pradhan Mantri Fasal Bima Yojana (PMFBY): Rabi Insurance Open",
      hindi: "प्रधानमंत्री फसल बीमा योजना (PMFBY): रबी फसलों का बीमा जारी",
      regional: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ (PMFBY): ਹਾੜੀ ਬੀਮਾ ਚਾਲੂ"
    },
    highlight: {
      english: "100% loss coverage against weather risks @ only 1.5% premium",
      hindi: "मौसम, कीट व बेमौसम बारिश से नुकसान पर 100% क्लेम सुरक्षा (सिर्फ 1.5% प्रीमियम)",
      regional: "ਕੁਦਰਤੀ ਆਫ਼ਤਾਂ ਤੋਂ ਨੁਕਸਾਨ 'ਤੇ 100% ਮੁਆਵਜ਼ਾ (ਸਿਰਫ਼ 1.5% ਪ੍ਰੀਮੀਅਮ)"
    },
    description: {
      english: "Safeguard your wheat, mustard and gram crops against drought, unseasonal rain, hailstorm, and pest attacks.",
      hindi: "गेहूं, सरसों, चना व आलू की फसल को ओलावृष्टि, सूखा व कीटों से सुरक्षित करें और ऑनलाइन क्लेम ट्रैक करें।",
      regional: "ਕਣਕ, ਸਰ੍ਹੋਂ ਅਤੇ ਛੋਲਿਆਂ ਦੀ ਫ਼ਸਲ ਨੂੰ ਗੜੇਮਾਰੀ ਤੇ ਬੇਮੌਸਮੀ ਮੀਂਹ ਤੋਂ ਬੀਮਾ ਕਵਰ ਦਿਓ।"
    },
    badge: {
      english: "Enroll Now",
      hindi: "अंतिम तिथि जल्द",
      regional: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਚਾਲੂ"
    },
    badgeColor: "#2563eb",
    officialUrl: "https://pmfby.gov.in/",
    domainName: "pmfby.gov.in",
    department: {
      english: "Dept of Agriculture, Govt of India",
      hindi: "कृषि विभाग, भारत सरकार",
      regional: "ਖੇਤੀਬਾੜੀ ਵਿਭਾਗ, ਭਾਰਤ ਸਰਕਾਰ"
    }
  },
  {
    id: "pm-kusum",
    emoji: "☀️",
    status: "live",
    category: {
      english: "Solar Irrigation Subsidy",
      hindi: "सौर ऊर्जा व सोलर पंप",
      regional: "ਸੋਲਰ ਪੰਪ ਤੇ ਸਬਸਿਡੀ"
    },
    title: {
      english: "PM-KUSUM Yojana: Up to 90% Subsidy on Solar Agri Pumps",
      hindi: "पीएम-कुसुम योजना: सोलर कृषि पंप पर 60% से 90% तक सरकारी अनुदान",
      regional: "ਪੀਐੱਮ-ਕੁਸੁਮ ਯੋਜਨਾ: ਸੋਲਰ ਪੰਪ ਲਗਾਉਣ 'ਤੇ 90% ਤੱਕ ਸਰਕਾਰੀ ਸਬਸਿਡੀ"
    },
    highlight: {
      english: "Zero electricity bills + earn money by feeding solar energy to grid",
      hindi: "बिजली बिल से मुक्ति + ग्रिड को अतिरिक्त बिजली बेचकर हर महीने कमाई",
      regional: "ਬਿਜਲੀ ਬਿੱਲਾਂ ਤੋਂ ਛੁਟਕਾਰਾ + ਵਾਧੂ ਸੋਲਰ ਬਿਜਲੀ ਵੇਚ ਕੇ ਕਮਾਈ"
    },
    description: {
      english: "Install 3HP to 10HP standalone or grid-connected solar pumps on your farm with heavy central & state subsidies.",
      hindi: "3HP से 10HP तक के सोलर पंप अपने खेत में लगाएं। केंद्र व राज्य सरकार द्वारा 90% तक की भारी छूट।",
      regional: "3 ਤੋਂ 10 ਹਾਰਸਪਾਵਰ ਦੇ ਸੋਲਰ ਪੰਪਾਂ 'ਤੇ ਕੇਂਦਰ ਅਤੇ ਰਾਜ ਸਰਕਾਰ ਵੱਲੋਂ ਭਾਰੀ ਗ੍ਰਾਂਟ ਉਪਲਬਧ।"
    },
    badge: {
      english: "90% Subsidy",
      hindi: "90% तक सब्सिडी",
      regional: "90% ਛੋਟ"
    },
    badgeColor: "#d97706",
    officialUrl: "https://pmkusum.mnre.gov.in/",
    domainName: "pmkusum.mnre.gov.in",
    department: {
      english: "Ministry of New & Renewable Energy (MNRE)",
      hindi: "नवीन एवं नवीकरणीय ऊर्जा मंत्रालय",
      regional: "ਨਵਿਆਉਣਯੋਗ ਊਰਜਾ ਮੰਤਰਾਲਾ"
    }
  },
  {
    id: "smam-machinery",
    emoji: "🚜",
    status: "new",
    category: {
      english: "Farm Mechanization Grants",
      hindi: "कृषि यंत्रीकरण अनुदान",
      regional: "ਖੇਤੀ ਸੰਦ ਤੇ ਮਸ਼ੀਨਰੀ"
    },
    title: {
      english: "SMAM Portal: 40% - 50% Subsidy on Tractors & Farm Implements",
      hindi: "कृषि यंत्र सब्सिडी (SMAM): ट्रैक्टर, रोटावेटर व कंबाइन पर 50% सब्सिडी",
      regional: "ਖੇਤੀ ਮਸ਼ੀਨਰੀ ਸਬਸਿਡੀ (SMAM): ਟਰੈਕਟਰ ਅਤੇ ਖੇਤੀ ਸੰਦਾਂ 'ਤੇ 50% ਛੋਟ"
    },
    highlight: {
      english: "Subsidies on Rotavators, Happy Seeders, Drones & Harvesters",
      hindi: "रोटावेटर, हैप्पी सीडर, रीपर, ड्रोन व लेजर लेवलर की खरीद पर भारी छूट",
      regional: "ਰੋਟਾਵੇਟਰ, ਹੈਪੀ ਸੀਡਰ, ਸੁਪਰ ਸੀਡਰ ਅਤੇ ਡਰੋਨ 'ਤੇ ਸਰਕਾਰੀ ਗ੍ਰਾਂਟ"
    },
    description: {
      english: "Sub-Mission on Agricultural Mechanization provides direct DBT subsidies on modern machinery to reduce labor costs.",
      hindi: "आधुनिक कृषि यंत्रों की खरीद पर सीधे बैंक खाते में सब्सिडी प्राप्त करें और खेती की लागत 40% कम करें।",
      regional: "ਆਧੁਨਿਕ ਖੇਤੀ ਮਸ਼ੀਨਾਂ ਦੀ ਖ਼ਰੀਦ 'ਤੇ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਸਬਸਿਡੀ ਪ੍ਰਾਪਤ ਕਰੋ।"
    },
    badge: {
      english: "Applications Open",
      hindi: "आवेदन प्रारंभ",
      regional: "ਅਰਜ਼ੀਆਂ ਚਾਲੂ"
    },
    badgeColor: "#ea580c",
    officialUrl: "https://agrimachinery.nic.in/",
    domainName: "agrimachinery.nic.in",
    department: {
      english: "Mechanization Division, MoA&FW, Govt of India",
      hindi: "कृषि यंत्रीकरण प्रभाग, कृषि मंत्रालय",
      regional: "ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ ਡਿਵੀਜ਼ਨ, ਭਾਰਤ ਸਰਕਾਰ"
    }
  },
  {
    id: "kcc-loan",
    emoji: "💳",
    status: "live",
    category: {
      english: "Affordable Agri Credit",
      hindi: "रियायती कृषि ऋण",
      regional: "ਸਸਤਾ ਖੇਤੀ ਕਰਜ਼ਾ"
    },
    title: {
      english: "Kisan Credit Card (KCC): Low 4% Interest Agri Loan up to ₹3 Lakh",
      hindi: "किसान क्रेडिट कार्ड (KCC): मात्र 4% ब्याज पर ₹3 लाख तक का आसान लोन",
      regional: "ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ (KCC): ਸਿਰਫ਼ 4% ਵਿਆਜ 'ਤੇ ₹3 ਲੱਖ ਤੱਕ ਕਰਜ਼ਾ"
    },
    highlight: {
      english: "Collateral-free up to ₹1.60 Lakh • 3% prompt repayment incentive",
      hindi: "बिना गारंटी ₹1.60 लाख तक ऋण, समय पर चुकता करने पर 3% अतिरिक्त छूट",
      regional: "ਬਿਨਾਂ ਗਰੰਟੀ ₹1.60 ਲੱਖ ਤੱਕ ਲੋਨ, ਸਮੇਂ ਸਿਰ ਮੋੜਨ 'ਤੇ 3% ਵਿਆਜ ਛੋਟ"
    },
    description: {
      english: "Instant liquidity for seeds, fertilizers, pesticides, cattle feed, and working capital needs for farming.",
      hindi: "बीज, खाद, कीटनाशक व पशुपालन की जरूरतों के लिए सबसे सस्ता सरकारी ऋण। बैंकों में ऑनलाइन आवेदन सुविधा।",
      regional: "ਬੀਜ, ਖਾਦਾਂ ਅਤੇ ਪਸ਼ੂ ਪਾਲਣ ਲਈ ਸਰਕਾਰੀ ਰਿਆਇਤੀ ਵਿਆਜ ਦਰ 'ਤੇ ਲੋਨ ਲਵੋ।"
    },
    badge: {
      english: "4% Interest",
      hindi: "4% ब्याज दर",
      regional: "4% ਵਿਆਜ"
    },
    badgeColor: "#7c3aed",
    officialUrl: "https://www.myscheme.gov.in/schemes/kcc",
    domainName: "myscheme.gov.in/schemes/kcc",
    department: {
      english: "NABARD & Dept of Financial Services, Govt of India",
      hindi: "नाबार्ड एवं वित्तीय सेवाएं विभाग, भारत सरकार",
      regional: "ਨਾਬਾਰਡ ਅਤੇ ਵਿੱਤੀ ਸੇਵਾਵਾਂ ਵਿਭਾਗ, ਭਾਰਤ ਸਰਕਾਰ"
    }
  },
  {
    id: "soil-health-card-scheme",
    emoji: "🧪",
    status: "live",
    category: {
      english: "Scientific Soil Health",
      hindi: "मृदा स्वास्थ्य व पोषण",
      regional: "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ"
    },
    title: {
      english: "Soil Health Card Scheme: Free 12-Nutrient Soil Testing",
      hindi: "मृदा स्वास्थ्य कार्ड मिशन: 12 पोषक तत्वों की निःशुल्क लैब जांच",
      regional: "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਮਿਸ਼ਨ: 12 ਜ਼ਰੂਰੀ ਤੱਤਾਂ ਦੀ ਮੁਫ਼ਤ ਲੈਬ ਪਰਖ"
    },
    highlight: {
      english: "Cut fertilizer expense by 25% with customized crop dose guidance",
      hindi: "संतुलित खाद उपयोग से खाद का खर्च 25% घटाएं और पैदावार 15% बढ़ाएं",
      regional: "ਸਹੀ ਖ਼ਾਦ ਵਰਤ ਕੇ ਖ਼ਰਚ 25% ਘਟਾਓ ਅਤੇ ਝਾੜ 15% ਵਧਾਓ"
    },
    description: {
      english: "Get your field soil tested for Nitrogen, Phosphorus, Potassium, micronutrients and pH by authorized government laboratories.",
      hindi: "नाइट्रोजन, फास्फोरस, पोटाश और सूक्ष्म तत्वों की सटीक जांच कराएं और डिजिटल सॉइल हेल्थ कार्ड डाउनलोड करें।",
      regional: "ਆਪਣੇ ਖੇਤ ਦੀ ਮਿੱਟੀ ਦੀ ਸਰਕਾਰੀ ਲੈਬ ਤੋਂ ਮੁਫ਼ਤ ਜਾਂਚ ਕਰਵਾ ਕੇ ਡਿਜੀਟਲ ਕਾਰਡ ਲਵੋ।"
    },
    badge: {
      english: "Free Testing",
      hindi: "निःशुल्क लैब जांच",
      regional: "ਮੁਫ਼ਤ ਜਾਂਚ"
    },
    badgeColor: "#059669",
    officialUrl: "https://soilhealth.dac.gov.in/",
    domainName: "soilhealth.dac.gov.in",
    department: {
      english: "Integrated Nutrient Management, MoA&FW",
      hindi: "एकीकृत पोषक तत्व प्रबंधन, कृषि मंत्रालय",
      regional: "ਖੇਤੀਬਾੜੀ ਮੰਤਰਾਲਾ, ਭਾਰਤ ਸਰਕਾਰ"
    }
  },
  {
    id: "enam-national-market",
    emoji: "🏪",
    status: "live",
    category: {
      english: "National Market Access",
      hindi: "राष्ट्रीय मंडी व ऑनलाइन व्यापार",
      regional: "ਕੌਮੀ ਮੰਡੀ ਵਪਾਰ"
    },
    title: {
      english: "e-NAM: Trade in 1,360+ Mandis across India for Best Prices",
      hindi: "ई-नाम (e-NAM): देश की 1360+ मंडियों में फसल बेचें, उच्चतम भाव पाएं",
      regional: "ਈ-ਨਾਮ (e-NAM): ਦੇਸ਼ ਦੀਆਂ 1,360+ ਮੰਡੀਆਂ ਵਿੱਚ ਸਿੱਧੀ ਫ਼ਸਲ ਵੇਚੋ"
    },
    highlight: {
      english: "Transparent digital e-bidding • Zero middleman fee • Direct payment",
      hindi: "पारदर्शी ई-नीलामी, बिना बिचौलिए के सही वजन व सीधे बैंक खाते में भुगतान",
      regional: "ਪਾਰਦਰਸ਼ੀ ਆਨਲਾਈਨ ਬੋਲੀ, ਬਿਨਾਂ ਦਲਾਲਾਂ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ"
    },
    description: {
      english: "Connect directly with licensed buyers across Indian agricultural markets to get competitive prices for your farm produce.",
      hindi: "घर बैठे देश के बड़े व्यापारियों से सीधा सौदा करें, मंडी भाव ट्रैक करें और पारदर्शी मूल्य प्राप्त करें।",
      regional: "ਦੇਸ਼ ਭਰ ਦੇ ਖ਼ਰੀਦਦਾਰਾਂ ਨਾਲ ਸਿੱਧਾ ਜੁੜੋ ਅਤੇ ਆਪਣੀ ਫ਼ਸਲ ਦਾ ਵਧੀਆ ਮੁੱਲ ਪ੍ਰਾਪਤ ਕਰੋ।"
    },
    badge: {
      english: "1360+ Mandis Live",
      hindi: "1360+ मंडियां लाइव",
      regional: "ਮੰਡੀਆਂ ਲਾਈਵ"
    },
    badgeColor: "#0891b2",
    officialUrl: "https://www.enam.gov.in/",
    domainName: "enam.gov.in",
    department: {
      english: "Small Farmers Agribusiness Consortium (SFAC), Govt of India",
      hindi: "लघु कृषक कृषि-व्यापार संघ (SFAC), भारत सरकार",
      regional: "ਐੱਸ.ਐੱਫ.ਏ.ਸੀ. (SFAC), ਭਾਰਤ ਸਰਕਾਰ"
    }
  },
  {
    id: "pmksy-drip-sprinkler",
    emoji: "💧",
    status: "live",
    category: {
      english: "Micro-Irrigation Grants",
      hindi: "टपक व फव्वारा सिंचाई अनुदान",
      regional: "ਤੁਪਕਾ ਤੇ ਫੁਹਾਰਾ ਸਿੰਚਾਈ"
    },
    title: {
      english: "PMKSY (Per Drop More Crop): 55% - 70% Subsidy on Drip & Sprinklers",
      hindi: "पीएम कृषि सिंचाई योजना: ड्रिप व फव्वारा सिस्टम पर 70% तक भारी अनुदान",
      regional: "ਪੀਐੱਮ ਸਿੰਚਾਈ ਯੋਜਨਾ: ਤੁਪਕਾ ਅਤੇ ਫੁਹਾਰਾ ਸਿੰਚਾਈ 'ਤੇ 70% ਤੱਕ ਗ੍ਰਾਂਟ"
    },
    highlight: {
      english: "Save 50% water, cut fertilizer loss & boost harvest yield by 30%",
      hindi: "50% पानी की बचत, उर्वरक बर्बादी में कमी और पैदावार में 30% तक बढ़ोतरी",
      regional: "50% ਪਾਣੀ ਦੀ ਬੱਚਤ ਅਤੇ ਫ਼ਸਲ ਦੇ ਝਾੜ ਵਿੱਚ 30% ਵਾਧਾ"
    },
    description: {
      english: "Get financial assistance for installing state-of-the-art micro-irrigation systems to maximize water efficiency.",
      hindi: "छोटे और सीमांत किसानों को 70% तक और अन्य किसानों को 55% तक ड्रिप व स्प्रिंकलर लगाने हेतु सब्सिडी।",
      regional: "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਲਈ ਤੁਪਕਾ ਸਿੰਚਾਈ ਲਗਾਉਣ ਲਈ 70% ਤੱਕ ਸਰਕਾਰੀ ਮਦਦ।"
    },
    badge: {
      english: "70% Subsidy",
      hindi: "70% तक अनुदान",
      regional: "70% ਗ੍ਰਾਂਟ"
    },
    badgeColor: "#0d9488",
    officialUrl: "https://pmksy.gov.in/",
    domainName: "pmksy.gov.in",
    department: {
      english: "Ministry of Agriculture & Ministry of Jal Shakti",
      hindi: "कृषि मंत्रालय एवं जल शक्ति मंत्रालय",
      regional: "ਖੇਤੀਬਾੜੀ ਅਤੇ ਜਲ ਸ਼ਕਤੀ ਮੰਤਰਾਲਾ"
    }
  }
];
