// Bhoomi AI Core Service - Dual Mode: Google Gemini Generative AI + Built-in Agro Intent-Entity Engine

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const STORAGE_KEY_GEMINI = 'bhoomi_gemini_key';

export const getGeminiApiKey = (): string => {
  if (typeof window === 'undefined') return '';
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim()) return envKey.trim();
  return localStorage.getItem(STORAGE_KEY_GEMINI) || '';
};

export const setGeminiApiKey = (key: string): void => {
  if (typeof window === 'undefined') return;
  if (key.trim()) {
    localStorage.setItem(STORAGE_KEY_GEMINI, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_GEMINI);
  }
};

// System prompt tailored for Indian agriculture & NextGen Kisan platform
const buildSystemPrompt = (language: string, userName?: string): string => {
  const langInstruction =
    language === 'hindi'
      ? 'Reply in clear, respectful, natural Hindi (Devanagari script) suitable for Indian farmers. Use warm terms like किसान भाई / बहन.'
      : language === 'regional'
      ? 'Reply in warm, friendly Rajasthani/Haryanvi/Hindi mixed regional dialect (Devanagari script). Use terms like किसान भाई, राम-राम.'
      : 'Reply in clear, simple, practical English tailored for Indian farmers.';

  return `You are "Bhoomi AI" (भूमि AI), an expert, friendly agricultural digital advisor for NextGen Kisan (nextgenkisan.com).
The user speaking to you is ${userName || 'a respected Kisan/farmer'}.

Guidelines:
1. ${langInstruction}
2. Be direct, actionable, practical, and empathetic. Answer the exact question asked (e.g. if asked about mandi prices, give precise current mandi rates and MSP; if asked about diseases, give remedies and dosages).
3. Provide precise recommendations with dosages (e.g. "2 ml per liter of water" or "50 kg DAP per acre").
4. Always prioritize organic / eco-friendly / integrated pest management (IPM) first, followed by safe chemical recommendations if needed.
5. Mention relevant NextGen Kisan platform services when helpful (Soil & Crop Testing home collection, AI Crop Health Scanner, Veterinary Doctor booking, Mandi Transport booking, Seasonal Crop Predictor).
6. Keep responses concise and formatted with clean bullet points and short paragraphs (around 80-150 words) so they read well and sound great via voice Text-to-Speech.
7. Never repeat generic filler apologies. Answer the specific question directly.`;
};

// Call Google Gemini API (tries 2.5-flash -> 2.0-flash -> 1.5-flash)
export const queryGeminiAPI = async (
  query: string,
  history: ChatMessage[],
  language: string,
  userName?: string
): Promise<string | null> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const systemPrompt = buildSystemPrompt(language, userName);

  // Take last 4 messages for conversation context
  const recentHistory = history
    .slice(-4)
    .map((m) => `${m.sender === 'user' ? 'Farmer' : 'Bhoomi AI'}: ${m.text}`)
    .join('\n\n');

  const fullPrompt = `${systemPrompt}

Recent Conversation:
${recentHistory ? recentHistory + '\n\n' : ''}Farmer: ${query}

Bhoomi AI:`;

  const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: fullPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.65,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 600,
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Gemini API error with model ${model}:`, response.status, errText);
        continue; // try next model
      }

      const data = await response.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (answer && typeof answer === 'string' && answer.trim()) {
        return answer.trim();
      }
    } catch (err) {
      console.warn(`Gemini API fetch failed on ${model}:`, err);
    }
  }

  return null;
};

// -------------------------------------------------------------
// INTENT & ENTITY PARSING SYSTEM
// -------------------------------------------------------------

export type CropType =
  | 'wheat'
  | 'mustard'
  | 'chickpea'
  | 'potato'
  | 'cotton'
  | 'paddy'
  | 'maize'
  | 'bajra'
  | 'soybean'
  | 'tomato'
  | 'chilli'
  | 'onion'
  | 'garlic'
  | 'sugarcane'
  | 'watermelon'
  | 'moong'
  | 'peas';

export type UserIntent =
  | 'GREETING'
  | 'WHO_ARE_YOU'
  | 'MANDI_PRICE'
  | 'FERTILIZER'
  | 'PEST_DISEASE'
  | 'IRRIGATION'
  | 'SOWING_VARIETIES'
  | 'SOIL_TEST'
  | 'LIVESTOCK'
  | 'GOVT_SCHEME'
  | 'ORGANIC'
  | 'WEATHER'
  | 'PLATFORM_TOOLS'
  | 'CROP_GENERAL'
  | 'UNKNOWN';

// Strict word-boundary matching for ASCII keywords (avoids 'rice' in 'price', 'rai' in 'rain', etc.)
const hasWord = (text: string, word: string): boolean => {
  const w = word.toLowerCase().trim();
  if (!w) return false;
  if (/^[a-z0-9\s_-]+$/i.test(w)) {
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(^|[^a-zA-Z0-9])' + escaped + '([^a-zA-Z0-9]|$)', 'i');
    return regex.test(text);
  }
  return text.toLowerCase().includes(w);
};

const hasAny = (text: string, ...words: string[]): boolean => {
  return words.some((w) => hasWord(text, w));
};

// Detect Crop Entity
export const detectCrop = (q: string): CropType | null => {
  if (hasAny(q, 'wheat', 'gehu', 'gehun', 'गेहूं', 'कनक', 'kanak', 'gohu')) return 'wheat';
  if (hasAny(q, 'mustard', 'sarson', 'sarso', 'सरसों', 'राई', 'rai')) return 'mustard';
  if (hasAny(q, 'chickpea', 'chana', 'चना', 'gram', 'kabuli')) return 'chickpea';
  if (hasAny(q, 'potato', 'aalu', 'alu', 'आलू')) return 'potato';
  if (hasAny(q, 'cotton', 'kapas', 'कपास', 'narma', 'नरमा')) return 'cotton';
  if (hasAny(q, 'paddy', 'rice', 'dhan', 'dhaan', 'धान', 'chawal', 'चावल', 'basmati')) return 'paddy';
  if (hasAny(q, 'maize', 'corn', 'makka', 'makki', 'मक्का')) return 'maize';
  if (hasAny(q, 'bajra', 'bajri', 'बाजरा', 'millet')) return 'bajra';
  if (hasAny(q, 'soybean', 'soya', 'सोयाबीन')) return 'soybean';
  if (hasAny(q, 'tomato', 'tamatar', 'टमाटर')) return 'tomato';
  if (hasAny(q, 'chilli', 'chili', 'mirch', 'मिर्च')) return 'chilli';
  if (hasAny(q, 'onion', 'pyaj', 'pyaz', 'प्याज')) return 'onion';
  if (hasAny(q, 'garlic', 'lahsun', 'lasun', 'लहसुन')) return 'garlic';
  if (hasAny(q, 'sugarcane', 'ganna', 'गन्ना')) return 'sugarcane';
  if (hasAny(q, 'watermelon', 'tarbooj', 'tarbuj', 'तरबूज', 'matira', 'मतीरा')) return 'watermelon';
  if (hasAny(q, 'moong', 'mung', 'मूंग')) return 'moong';
  if (hasAny(q, 'peas', 'matar', 'मटर')) return 'peas';
  return null;
};

// Detect User Intent
export const detectIntent = (q: string): UserIntent => {
  // 1. Greetings
  if (
    /^(hi|hello|hey|namaste|namaskar|ram\s*ram|pranam|sat\s*sri\s*akal|kese\s*ho|kaise\s*ho|kem\s*cho|halo|नमस्ते|राम-राम|राम\s*राम|सत\s*श्री\s*अकाल|नमस्कार|प्रणाम)/i.test(
      q
    ) ||
    ['hi', 'hello', 'hey', 'ram ram', 'namaste', 'bhoomi', 'bhoomi ai'].includes(q)
  ) {
    return 'GREETING';
  }

  // 2. Who are you / help
  if (
    hasAny(
      q,
      'who are you',
      'what can you do',
      'kaun ho',
      'kon ho',
      'kya kar sakte',
      'who r u',
      'who created you',
      'help',
      'मदद',
      'कौन हो',
      'क्या कर सकती',
      'kya karti ho'
    )
  ) {
    return 'WHO_ARE_YOU';
  }

  // 3. Mandi / Price / Rates / MSP (HIGH PRIORITY)
  if (
    hasAny(
      q,
      'price',
      'rate',
      'bhav',
      'bhaav',
      'mandi',
      'msp',
      'daam',
      'cost',
      'sell',
      'bechna',
      'bikri',
      'kitne me bikega',
      'today price',
      'market',
      'मंडी',
      'भाव',
      'दाम',
      'कीमत',
      'बिक्री',
      'rate today',
      'price today'
    )
  ) {
    return 'MANDI_PRICE';
  }

  // 4. Fertilizers & Nutrition
  if (
    hasAny(
      q,
      'fertilizer',
      'urea',
      'dap',
      'npk',
      'potash',
      'khad',
      'zinc',
      'nano urea',
      'sulfur',
      'sulphur',
      'dose',
      'khurak',
      'यूरिया',
      'खाद',
      'पोटाश',
      'जिंक'
    )
  ) {
    return 'FERTILIZER';
  }

  // 5. Pest, Disease & Symptoms
  if (
    hasAny(
      q,
      'pest',
      'insect',
      'keeda',
      'kida',
      'rog',
      'bimari',
      'disease',
      'fungus',
      'fungi',
      'rust',
      'ratua',
      'yellow',
      'peela',
      'pila',
      'blight',
      'jhulsa',
      'sundi',
      'illi',
      'borer',
      'worm',
      'caterpillar',
      'aphid',
      'chepa',
      'mahu',
      'whitefly',
      'thrips',
      'curl',
      'marodiya',
      'marod',
      'churmura',
      'deemak',
      'termite',
      'spray',
      'dawa',
      'remedy',
      'कीट',
      'कीड़ा',
      'रोग',
      'सुंडी',
      'इल्ली',
      'माहू',
      'चेपा',
      'झुलसा',
      'रतुआ',
      'पीला',
      'दीमक',
      'दवा',
      'छिड़काव'
    )
  ) {
    return 'PEST_DISEASE';
  }

  // 6. Irrigation / Water
  if (
    hasAny(
      q,
      'irrigation',
      'sinchai',
      'water',
      'pani',
      'watering',
      'drainage',
      'सिंचाई',
      'पानी',
      'कितनी बार पानी'
    )
  ) {
    return 'IRRIGATION';
  }

  // 7. Sowing / Seed / Varieties
  if (
    hasAny(
      q,
      'sow',
      'sowing',
      'buwai',
      'variety',
      'varieties',
      'kism',
      'beej',
      'seed',
      'kab boye',
      'बुवाई',
      'किस्म',
      'किस्में',
      'बीज'
    )
  ) {
    return 'SOWING_VARIETIES';
  }

  // 8. Soil Health & Testing
  if (hasAny(q, 'soil', 'mitti', 'mati', 'maati', 'soil test', 'janch', 'ph', 'मिट्टी', 'माटी', 'मृदा', 'जांच')) {
    return 'SOIL_TEST';
  }

  // 9. Livestock & Veterinary
  if (
    hasAny(
      q,
      'cow',
      'buffalo',
      'gai',
      'gay',
      'bhains',
      'pashu',
      'fever',
      'bukhar',
      'thanela',
      'mastitis',
      'doodh',
      'dudh',
      'milk',
      'vet',
      'doctor',
      'गाय',
      'भैंस',
      'पशु',
      'बुखार',
      'थनैला',
      'दूध',
      'डॉक्टर'
    )
  ) {
    return 'LIVESTOCK';
  }

  // 10. Government Schemes & Subsidies
  if (
    hasAny(
      q,
      'pm kisan',
      'pm-kisan',
      'pmkisan',
      'yojana',
      'kist',
      'subsidy',
      'kcc',
      'bima',
      'beema',
      'kusum',
      'solar',
      'योजना',
      'किस्त',
      'सब्सिडी',
      'बीमा',
      'सोलर'
    )
  ) {
    return 'GOVT_SCHEME';
  }

  // 11. Organic Farming
  if (
    hasAny(
      q,
      'organic',
      'jaivik',
      'jeevamrit',
      'vermicompost',
      'neemastra',
      'desi',
      'gobar',
      'जैविक',
      'जीवामृत',
      'केंचुआ'
    )
  ) {
    return 'ORGANIC';
  }

  // 12. Weather
  if (
    hasAny(
      q,
      'weather',
      'mausam',
      'rain',
      'barish',
      'baarish',
      'barsat',
      'pala',
      'frost',
      'heat',
      'dhoop',
      'मौसम',
      'बारिश',
      'पाला'
    )
  ) {
    return 'WEATHER';
  }

  // 13. Platform Tools
  if (
    hasAny(
      q,
      'scanner',
      'scan',
      'transport',
      'logistics',
      'truck',
      'gaadi',
      'gadi',
      'predictor',
      'booking',
      'एप',
      'ऐप',
      'स्कैनर'
    )
  ) {
    return 'PLATFORM_TOOLS';
  }

  // If crop is present with no specific intent, it is CROP_GENERAL
  if (detectCrop(q)) {
    return 'CROP_GENERAL';
  }

  return 'UNKNOWN';
};

// -------------------------------------------------------------
// RESPONSE GENERATORS
// -------------------------------------------------------------

// 1. MANDI PRICES & MSP (Crop-Specific & Overall Bulletin)
const getMandiPriceResponse = (crop: CropType | null, lang: string): string => {
  // WHEAT
  if (crop === 'wheat') {
    if (lang === 'hindi') {
      return `📈 आज का गेहूं (Wheat) मंडी भाव व समर्थन मूल्य (MSP):\n\n• सरकारी न्यूनतम समर्थन मूल्य (MSP): ₹2,425 प्रति क्विंटल\n• सामान्य मंडी भाव: ₹2,400 से ₹2,550 प्रति क्विंटल\n• उत्तम शरबती/टुकड़ी गेहूं: ₹2,750 से ₹3,200 प्रति क्विंटल\n• महत्वपूर्ण सलाह: मंडी ले जाने से पहले दाने में नमी 12% से कम रखें, ताकि तुलाई व दाम में कोई कटौती न हो।\n• ट्रांसपोर्ट बुकिंग: NextGen किसान के "Mandi Logistics" से उचित दर पर पिकअप या ट्रैक्टर-ट्रॉली बुक कर सकते हैं!`;
    }
    if (lang === 'regional') {
      return `📈 आज रो गेहूं मंडी भाव व MSP:\n• सरकारी MSP: ₹2,425 प्रति क्विंटल।\n• सामान्य मंडी भाव: ₹2,400 सूं ₹2,550 प्रति क्विंटल (शरबती ₹2,800+)।\n• दाणा में नमी 12% सूं कम राखो। मंडी ले जावण खातर NextGen किसान सूं गाड़ी बुक करो!`;
    }
    return `📈 Wheat (गेहूं) Mandi Price & MSP Today:\n\n• Government MSP Rate: ₹2,425 / quintal\n• Current Average Mandi Range: ₹2,400 - ₹2,550 / quintal\n• Premium Quality (Sharbati / Tukdi): ₹2,750 - ₹3,200 / quintal\n• Key Selling Tip: Ensure moisture is strictly under 12% before bringing grain to the mandi to prevent trader deductions.\n• Need Transport? Book transparent pickup trucks and tractor-trolleys directly on NextGen Kisan's Mandi Logistics tab!`;
  }

  // MUSTARD
  if (crop === 'mustard') {
    if (lang === 'hindi') {
      return `📈 आज का सरसों (Mustard) मंडी भाव व समर्थन मूल्य (MSP):\n\n• सरकारी न्यूनतम समर्थन मूल्य (MSP): ₹5,950 प्रति क्विंटल\n• सामान्य मंडी भाव: ₹5,600 से ₹6,100 प्रति क्विंटल\n• 40%+ तेल वाली उच्च गुणवत्ता: ₹6,200+ प्रति क्विंटल\n• महत्वपूर्ण सलाह: बीज में नमी 8% से कम होनी चाहिए ताकि तेल मिलों से सर्वोत्तम भाव मिल सके।\n• NextGen किसान से मंडी डिलीवरी के लिए वाहन बुक करें।`;
    }
    if (lang === 'regional') {
      return `📈 आज रो सरसों मंडी भाव:\n• सरकारी MSP: ₹5,950 प्रति क्विंटल।\n• मंडी भाव: ₹5,600 सूं ₹6,100 प्रति क्विंटल। 40% तेल वाली सरसों रो भाव ₹6,200+ मिले है।\n• नमी 8% सूं कम राखो।`;
    }
    return `📈 Mustard (सरसों) Mandi Price & MSP Today:\n\n• Government MSP Rate: ₹5,950 / quintal\n• Current Average Mandi Range: ₹5,600 - ₹6,100 / quintal\n• High Oil Content (>40%): Up to ₹6,250 / quintal\n• Key Selling Tip: Ensure seeds are dried to below 8% moisture for maximum oil miller premium.\n• Book doorstep transport directly on NextGen Kisan.`;
  }

  // CHICKPEA / CHANA
  if (crop === 'chickpea') {
    if (lang === 'hindi') {
      return `📈 आज का चना (Chickpea) मंडी भाव व MSP:\n\n• सरकारी न्यूनतम समर्थन मूल्य (MSP): ₹5,650 प्रति क्विंटल\n• देसी चना मंडी भाव: ₹5,450 से ₹5,800 प्रति क्विंटल\n• काबुली / डॉलर चना: ₹9,500 से ₹12,500 प्रति क्विंटल\n• सलाह: दाने को ग्रेड करके कचरा साफ करने पर ₹150-200 प्रति क्विंटल अधिक दाम मिलता है।`;
    }
    if (lang === 'regional') {
      return `📈 आज रो चणा मंडी भाव:\n• सरकारी MSP: ₹5,650 प्रति क्विंटल।\n• देसी चणा भाव: ₹5,450 सूं ₹5,800 प्रति क्विंटल। काबुली चणा ₹10,000+ बिका है।`;
    }
    return `📈 Chickpea / Chana (चना) Mandi Price & MSP Today:\n\n• Government MSP Rate: ₹5,650 / quintal\n• Desi Chana Mandi Range: ₹5,450 - ₹5,800 / quintal\n• Kabuli / Dollar Chana: ₹9,500 - ₹12,500 / quintal\n• Selling Tip: Clean and grade broken seeds for a ₹150-200/quintal quality premium.`;
  }

  // POTATO
  if (crop === 'potato') {
    if (lang === 'hindi') {
      return `📈 आज का आलू (Potato) मंडी भाव:\n\n• थोक मंडी भाव: ₹1,000 से ₹1,400 प्रति क्विंटल (₹10 - ₹14 प्रति किग्रा)\n• बड़ा ज्योति / पुखराज: ₹1,150 से ₹1,450 प्रति क्विंटल\n• छोटा आलू (गुल्ला): ₹800 से ₹1,000 प्रति क्विंटल\n• कंदों को सीधी धूप से बचाएं ताकि वे हरे न पड़ें।`;
    }
    return `📈 Potato (आलू) Mandi Price Today:\n\n• Wholesale Mandi Range: ₹1,000 - ₹1,400 / quintal (₹10 - ₹14 / kg)\n• Large Jyoti / Pukhraj: ₹1,150 - ₹1,450 / quintal\n• Small / Seed Size: ₹800 - ₹1,000 / quintal\n• Avoid exposing harvested potatoes to sunlight to prevent chlorophyll greening.`;
  }

  // COTTON
  if (crop === 'cotton') {
    if (lang === 'hindi') {
      return `📈 आज का कपास / नरमा (Cotton) मंडी भाव व MSP:\n\n• सरकारी न्यूनतम समर्थन मूल्य (MSP): ₹7,521 प्रति क्विंटल\n• सामान्य मंडी भाव: ₹7,200 से ₹7,850 प्रति क्विंटल\n• पहली चुनाई का साफ सूखा कपास: ₹7,900+ प्रति क्विंटल\n• सीलन या पानी न मिलाएं; नमी 8-9% से कम होने पर पूरा भाव मिलता है।`;
    }
    return `📈 Cotton / Narma (कपास) Mandi Price & MSP Today:\n\n• Government MSP Rate: ₹7,521 / quintal (Medium: ₹7,121, Long: ₹7,521)\n• Current Mandi Range: ₹7,200 - ₹7,850 / quintal\n• First-picking clean cotton: Up to ₹7,950 / quintal\n• Moisture must be below 8-9% for maximum price.`;
  }

  // PADDY
  if (crop === 'paddy') {
    if (lang === 'hindi') {
      return `📈 आज का धान (Paddy) मंडी भाव व MSP:\n\n• सरकारी न्यूनतम समर्थन मूल्य (MSP): ₹2,320 प्रति क्विंटल (ग्रेड ए: ₹2,340)\n• गैर-बासमती मंडी भाव: ₹2,250 से ₹2,400 प्रति क्विंटल\n• बासमती (1121 / 1509): ₹3,300 से ₹4,200 प्रति क्विंटल\n• सरकारी खरीद के लिए धान में नमी 17% से कम होनी चाहिए।`;
    }
    return `📈 Paddy / Rice (धान) Mandi Price & MSP Today:\n\n• Government MSP: ₹2,320 / quintal (Grade A: ₹2,340)\n• Non-Basmati Mandi Range: ₹2,250 - ₹2,400 / quintal\n• Basmati (1121 / 1509): ₹3,300 - ₹4,200 / quintal\n• Government procurement moisture limit: Strictly below 17%.`;
  }

  // TOMATO
  if (crop === 'tomato') {
    if (lang === 'hindi') {
      return `📈 आज का टमाटर (Tomato) थोक मंडी भाव:\n\n• थोक मंडी भाव: ₹1,200 से ₹2,200 प्रति क्विंटल (₹12 - ₹22 प्रति किग्रा)\n• हाइब्रिड कड़ा लाल टमाटर: ₹1,800 से ₹2,400 प्रति क्विंटल\n• क्रेट में ग्रेडिंग करके बेचने पर प्रति क्रेट ₹40-60 अधिक मिलते हैं।`;
    }
    return `📈 Tomato (टमाटर) Wholesale Mandi Price Today:\n\n• Current Mandi Range: ₹1,200 - ₹2,200 / quintal (₹12 - ₹22 / kg)\n• Firm Hybrid Red Tomato: ₹1,800 - ₹2,400 / quintal\n• Proper crate grading fetches ₹200-300 higher per quintal.`;
  }

  // ONION
  if (crop === 'onion') {
    if (lang === 'hindi') {
      return `📈 आज का प्याज (Onion) थोक मंडी भाव:\n\n• थोक मंडी भाव: ₹1,800 से ₹2,800 प्रति क्विंटल (₹18 - ₹28 प्रति किग्रा)\n• उत्तम भंडारण योग्य लाल प्याज: ₹2,400 से ₹3,000 प्रति क्विंटल।`;
    }
    return `📈 Onion (प्याज) Mandi Price Today:\n\n• Current Wholesale Mandi Rate: ₹1,800 - ₹2,800 / quintal (₹18 - ₹28 / kg)\n• Premium Storable Red Onion: ₹2,400 - ₹3,000 / quintal.`;
  }

  // GARLIC
  if (crop === 'garlic') {
    if (lang === 'hindi') {
      return `📈 आज का लहसुन (Garlic) मंडी भाव:\n\n• थोक मंडी भाव: ₹9,000 से ₹15,000 प्रति क्विंटल (₹90 - ₹150 प्रति किग्रा)\n• बड़ा मोटा बोल्ड लहसुन: ₹14,000 से ₹17,500 प्रति क्विंटल\n• मध्यम लहसुन: ₹8,500 से ₹11,000 प्रति क्विंटल।`;
    }
    return `📈 Garlic (लहसुन) Mandi Price Today:\n\n• Wholesale Mandi Range: ₹9,000 - ₹15,000 / quintal (₹90 - ₹150 / kg)\n• Bold Export Quality: ₹14,000 - ₹17,500 / quintal\n• Medium Quality: ₹8,500 - ₹11,000 / quintal.`;
  }

  // OVERALL MANDI BULLETIN (when no specific crop was named)
  if (lang === 'hindi') {
    return `📈 आज का प्रमुख फसलों का मंडी भाव व सरकारी समर्थन मूल्य (MSP):\n\n• 🌾 गेहूं (Wheat): MSP ₹2,425/क्विंटल | मंडी भाव: ₹2,400 - ₹2,550\n• 🌿 सरसों (Mustard): MSP ₹5,950/क्विंटल | मंडी भाव: ₹5,600 - ₹6,100\n• 🌾 चना (Chana): MSP ₹5,650/क्विंटल | मंडी भाव: ₹5,450 - ₹5,800\n• 🌾 धान (Paddy): MSP ₹2,320/क्विंटल | बासमती: ₹3,300 - ₹4,200\n• 🌱 कपास (Cotton): MSP ₹7,521/क्विंटल | मंडी भाव: ₹7,200 - ₹7,850\n• 🥔 आलू (Potato): ₹1,000 - ₹1,400/क्विंटल\n• 🧅 प्याज (Onion): ₹1,800 - ₹2,800/क्विंटल\n• 🧄 लहसुन (Garlic): ₹9,000 - ₹15,000/क्विंटल\n\n💡 सलाह: अनाज में नमी 12% से कम रखें। मंडी ले जाने के लिए NextGen किसान के "Mandi Logistics" से वाहन बुक करें!`;
  }
  if (lang === 'regional') {
    return `📈 आज रो मुख्य मंडी भाव व MSP:\n• गेहूं: MSP ₹2,425 (मंडी ₹2,400 - ₹2,550)\n• सरसों: MSP ₹5,950 (मंडी ₹5,600 - ₹6,100)\n• चणा: MSP ₹5,650 (मंडी ₹5,450 - ₹5,800)\n• कपास: MSP ₹7,521 (मंडी ₹7,200 - ₹7,850)\n• आलू: ₹1,000 - ₹1,400/क्विंटल\n• प्याज: ₹1,800 - ₹2,800/क्विंटल\nगाड़ी वास्ते NextGen किसान सूं बुक करो!`;
  }
  return `📈 Today's Benchmark Mandi Rates & Government MSP:\n\n• 🌾 Wheat (गेहूं): MSP ₹2,425 / qtl | Mandi: ₹2,400 - ₹2,550\n• 🌿 Mustard (सरसों): MSP ₹5,950 / qtl | Mandi: ₹5,600 - ₹6,100\n• 🌾 Gram (चना): MSP ₹5,650 / qtl | Mandi: ₹5,450 - ₹5,800\n• 🌾 Paddy (धान): MSP ₹2,320 / qtl | Basmati: ₹3,300 - ₹4,200\n• 🌱 Cotton (कपास): MSP ₹7,521 / qtl | Mandi: ₹7,200 - ₹7,850\n• 🥔 Potato (आलू): ₹1,000 - ₹1,400 / qtl\n• 🧅 Onion (प्याज): ₹1,800 - ₹2,800 / qtl\n• 🧄 Garlic (लहसुन): ₹9,000 - ₹15,000 / qtl\n\n💡 Tip: Keep moisture under 12% for grain and 8% for mustard. Book direct trucks/trolleys on NextGen Kisan's Mandi Logistics tab!`;
};

// 2. FERTILIZER & NUTRITION
const getFertilizerResponse = (crop: CropType | null, lang: string): string => {
  if (crop === 'wheat') {
    if (lang === 'hindi') {
      return `🌱 गेहूं के लिए संतुलित खाद व पोषण (प्रति एकड़):\n\n• बुवाई के समय: 50 किग्रा DAP + 25 किग्रा पोटाश (MOP) + 10 किग्रा जिंक सल्फेट (21%)।\n• पहली सिंचाई (21 दिन - CRI स्टेज): 45 किग्रा यूरिया।\n• दूसरी सिंचाई (45 दिन - कल्ले फूटते समय): 45 किग्रा यूरिया।\n• नैनो यूरिया: 4 मिली प्रति लीटर पानी में मिलाकर बालियां निकलने से पहले छिड़कें।`;
    }
    return `🌱 Wheat Balanced Fertilizer Schedule (Per Acre):\n\n• At Sowing (Basal): 50 kg DAP + 25 kg MOP (Potash) + 10 kg Zinc Sulfate (21%).\n• 1st Irrigation (21 days - CRI stage): Top-dress 45 kg Urea.\n• 2nd Irrigation (40-45 days - Tillering): Top-dress 45 kg Urea.\n• Nano Urea Spray: 4 ml/L water (500 ml/acre) at flag leaf stage for grain protein.`;
  }

  if (crop === 'mustard') {
    if (lang === 'hindi') {
      return `🌱 सरसों के लिए खाद व सल्फर प्रबंधन (प्रति एकड़):\n\n• बुवाई के समय: 35 किग्रा DAP + 15 किग्रा पोटाश + 10-15 किग्रा बेंटोनाइट सल्फर (सल्फर तेल बढ़ाने के लिए जरूरी है)।\n• पहली सिंचाई (30 दिन): 40-50 किग्रा यूरिया दें।\n• फूल आने के बाद अधिक यूरिया न दें, इससे माहू (कीट) बढ़ता है।`;
    }
    return `🌱 Mustard Fertilizer & Sulfur Management (Per Acre):\n\n• At Sowing: 35 kg DAP + 15 kg MOP + 10-15 kg Bentonite Sulfur (essential for oil synthesis).\n• 1st Irrigation (30-35 days): 45 kg Urea top-dressing.\n• Avoid excess nitrogen after flowering, as it invites severe aphid attacks.`;
  }

  if (crop === 'potato') {
    if (lang === 'hindi') {
      return `🌱 आलू के लिए खाद (प्रति एकड़):\n\n• आलू को पोटाश की बहुत जरूरत होती है!\n• बुवाई पर: 50 किग्रा DAP + 50 किग्रा पोटाश (MOP) + 15 टन सड़ी गोबर खाद।\n• पहली व दूसरी मिट्टी चढ़ाते समय: 70 किग्रा यूरिया को दो भागों में दें।\n• कंद का आकार बढ़ाने हेतु 0:0:50 (पोटेशियम सल्फेट) 1 किग्रा/100 लीटर पानी का छिड़काव करें।`;
    }
    return `🌱 Potato Fertilizer Management (Per Acre):\n\n• High Potash Requirement!\n• Basal at planting: 50 kg DAP + 50 kg MOP (Potash) + 10 tonnes well-rotted FYM.\n• Earthing-up stages: 70 kg Urea split into two top-dressings at 30 & 45 days.\n• Foliar spray: 0:0:50 (Potassium Sulfate) at 1 kg per 100L water during tuber bulking.`;
  }

  // General Fertilizer
  if (lang === 'hindi') {
    return `🌱 संतुलित पोषण व खाद प्रबंधन नियम:\n\n1. DAP व पोटाश हमेशा बुवाई के समय दें ताकि जड़ें मजबूत हों।\n2. यूरिया को कभी एक साथ न डालें; सिंचाई के साथ 2-3 किस्तों में बांटकर दें।\n3. नैनो यूरिया (IFFCO Nano Urea): 4 मिली/लीटर पानी छिड़कें—यह 1 बोरी यूरिया के बराबर काम करता है।\n4. जिंक सल्फेट: प्रति एकड़ 10 किग्रा जिंक जरूर डालें।`;
  }
  return `🌱 Balanced Fertilizer & Nutrition Guidelines:\n\n1. Basal Application: Apply DAP and Potash at sowing into the root furrow.\n2. Split Urea: Top-dress Urea in 2-3 splits with irrigations rather than dumping at once.\n3. Nano Urea Foliar Spray: 4 ml/L water (500 ml/acre) provides 80%+ nitrogen efficiency.\n4. Micronutrient: Apply 10 kg Zinc Sulfate per acre to prevent chlorosis.`;
};

// 3. PEST & DISEASE REMEDIES
const getPestDiseaseResponse = (crop: CropType | null, lang: string): string => {
  if (crop === 'wheat') {
    if (lang === 'hindi') {
      return `🌾 गेहूं के प्रमुख रोग व उनका तुरंत समाधान:\n\n1. पीला रतुआ (Yellow Rust / पत्तियों पर पीला पाउडर):\n• प्रोपिकोनाजोल 25% EC (टिल्ट / Tilt) 200 मिली प्रति 200 लीटर पानी प्रति एकड़ तुरंत छिड़कें।\n\n2. पत्तियों में पीलापन (नाइट्रोजन की कमी):\n• 100 लीटर पानी में 2 किग्रा यूरिया मिलाकर छिड़कें।\n\n3. दीमक (Termite):\n• क्लोरपायरीफॉस 20% EC (1.5-2 लीटर प्रति एकड़) सिंचाई के पानी के साथ चलाएं।`;
    }
    return `🌾 Wheat Disease & Pest Solutions:\n\n1. Yellow Rust (Puccinia / Yellow powdery streaks):\n• Spray Propiconazole 25% EC (Tilt) at 200 ml in 200L water per acre immediately.\n\n2. Nitrogen Deficiency (Pale yellow lower leaves):\n• Spray 2% Urea solution (2 kg Urea in 100L water per acre).\n\n3. Termites (Deemak):\n• Apply Chlorpyrifos 20% EC at 1.5 - 2 Liters per acre with irrigation water.`;
  }

  if (crop === 'mustard') {
    if (lang === 'hindi') {
      return `🌿 सरसों में चेपा/माहू (Aphid) व सफेद रतुआ का इलाज:\n\n1. माहू/मोयला (Aphid):\n• जैविक: 1 लीटर पानी में 5 मिली नीम तेल (1500 PPM) + थोड़ा सर्फ मिलाकर छिड़कें।\n• रासायनिक: थायमेथॉक्सम 25% WG (0.3 ग्राम/लीटर) या डाइमेथोएट 30% EC (1.5 मिली/लीटर) छिड़कें।\n\n2. सफेद रतुआ (पत्तियों पर सफेद फफोले):\n• मेंकोजेब 75% WP 2 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।`;
    }
    return `🌿 Mustard Aphid (Chepa/Mahu) & White Rust Advisory:\n\n1. Aphid Infestation:\n• Organic: Spray Neem Oil (1500 PPM) at 5 ml/L water with liquid soap.\n• Chemical: Spray Thiamethoxam 25% WG (0.3 g/L) or Dimethoate 30% EC (1.5 ml/L) in early morning or evening.\n\n2. White Rust: Spray Mancozeb 75% WP at 2 g/L water.`;
  }

  if (crop === 'chickpea') {
    if (lang === 'hindi') {
      return `🌾 चना में सुंडी (Pod Borer) व उकठा रोग का समाधान:\n\n1. फली छेदक सुंडी (Helicoverpa):\n• इमामेक्टिन बेंजोएट 5% SG (0.5 ग्राम/लीटर) या कोराजन (0.3 मिली/लीटर) छिड़कें।\n• खेत में 4-5 फेरोमोन ट्रैप व पक्षियों के बैठने के लिए T-खूंटियां लगाएं।\n\n2. उकठा रोग (Wilt / जड़ सड़न): ट्राइकोडर्मा विरिडी से बीज व मिट्टी उपचारित करें।`;
    }
    return `🌾 Chickpea (Chana) Pod Borer & Wilt Advisory:\n\n1. Pod Borer (Sundi):\n• Spray Emamectin Benzoate 5% SG (0.5 g/L) or Chlorantraniliprole (Coragen 0.3 ml/L).\n• Install 4-5 Pheromone traps and T-bird perches per acre.\n\n2. Wilt Prevention: Seed/soil treatment with Trichoderma viride.`;
  }

  if (crop === 'potato') {
    if (lang === 'hindi') {
      return `🥔 आलू में झुलसा रोग (Late Blight) का तुरंत इलाज:\n\n• लक्षण: पत्तियों पर काले-भूरे धब्बे और किनारों पर सफेद फफूंद।\n• बचाव हेतु: मेंकोजेब 75% WP (2.5 ग्राम/लीटर)।\n• रोग फैलने पर: रिडोमिल गोल्ड (Metalaxyl + Mancozeb) 2 ग्राम प्रति लीटर पानी में तुरंत छिड़कें।`;
    }
    return `🥔 Potato Late Blight (झुलसा) Remedy:\n\n• Preventive: Spray Mancozeb 75% WP (2.5 g/L).\n• Curative (Active lesions): Spray Ridomil Gold (Metalaxyl + Mancozeb) at 2 g/L or Sectin immediately.`;
  }

  if (crop === 'tomato' || crop === 'chilli') {
    if (lang === 'hindi') {
      return `🍅 टमाटर व मिर्च में पत्ता मरोड़ (Leaf Curl / चुरमुरा) नियंत्रण:\n\n• यह रोग सफेद मक्खी व थ्रिप्स द्वारा फैलता है।\n• उपचार: इमिडाक्लोप्रिड 17.8% SL (0.5 मिली/लीटर) या फिप्रोनिल 5% SC (1.5 मिली/लीटर) छिड़कें।\n• खेत में पीले व नीले चिपचिपे कार्ड लगाएं।`;
    }
    return `🍅 Tomato & Chilli Leaf Curl / Murda Complex:\n\n• Spread by whiteflies and thrips.\n• Spray Imidacloprid 17.8% SL (0.5 ml/L) or Fipronil 5% SC (1.5 ml/L).\n• Install Yellow & Blue Sticky Traps across the field canopy.`;
  }

  if (crop === 'cotton') {
    if (lang === 'hindi') {
      return `🌱 कपास में गुलाबी सुंडी व सफेद मक्खी:\n\n• गुलाबी सुंडी: प्रोफेनोफॉस 50% EC (2 मिली/लीटर) या इमामेक्टिन बेंजोएट छिड़कें।\n• सफेद मक्खी: फ्लोनिकामिड 50% WG (0.4 ग्राम/लीटर) या डाइफेंथियूरॉन 50% WP (1.2 ग्राम/लीटर) छिड़कें।`;
    }
    return `🌱 Cotton Pink Bollworm & Whitefly:\n\n• Pink Bollworm: Spray Profenofos 50% EC (2 ml/L) or Emamectin Benzoate.\n• Whitefly: Spray Flonicamid 50% WG (0.4 g/L) or Diafenthiuron 50% WP (1.2 g/L).`;
  }

  // General Pest
  if (lang === 'hindi') {
    return `🐛 कीट व रोग नियंत्रण की सामान्य सलाह:\n\n1. जैविक स्प्रे: 1 लीटर पानी में 5 मिली नीम का तेल (1500 PPM) + 1 मिली तरल साबुन मिलाकर शाम को छिड़कें।\n2. फफूंद/धब्बे दिखने पर: मेंकोजेब (Saaf / Mancozeb) 2.5 ग्राम प्रति लीटर छिड़कें।\n3. पत्ती का फोटो खींचकर NextGen किसान के "AI Crop Scanner" से तुरंत सटीक बीमारी पहचानें!`;
  }
  return `🐛 General Pest & Disease Advisory:\n\n1. Organic: Spray Neem Oil (1500 PPM) at 5 ml/L water with mild soap.\n2. Fungal Leaf Spots: Spray Mancozeb 75% WP or Carbendazim+Mancozeb (Saaf) at 2.5 g/L.\n3. Diagnose Instantly: Use NextGen Kisan's "AI Crop Scanner" to take a leaf photo for instant identification!`;
};

// 4. IRRIGATION SCHEDULE
const getIrrigationResponse = (crop: CropType | null, lang: string): string => {
  if (crop === 'wheat') {
    if (lang === 'hindi') {
      return `💧 गेहूं की सिंचाई के 5 महत्वपूर्ण चरण:\n\n1. पहली सिंचाई: 21 दिन बाद (CRI ताज जड़ अवस्था) — सबसे जरूरी!\n2. दूसरी: 40-45 दिन (कल्ले निकलते समय)\n3. तीसरी: 65-70 दिन (गाभा अवस्था)\n4. चौथी: 90-95 दिन (फूल व दाना बनते समय)\n5. पांचवीं: 105-110 दिन (दूधिया अवस्था)\n• तेज हवा चलने पर सिंचाई न करें, फसल गिर सकती है।`;
    }
    return `💧 Wheat Critical Irrigation Stages:\n\n1. 1st Irrigation: 21 days (Crown Root Initiation stage) — Most critical!\n2. 2nd: 40-45 days (Tillering)\n3. 3rd: 65-70 days (Jointing / Boot stage)\n4. 4th: 90-95 days (Flowering / Grain filling)\n5. 5th: 105-110 days (Milking stage)\n• Do not irrigate on high wind days to prevent lodging.`;
  }

  if (crop === 'mustard') {
    if (lang === 'hindi') {
      return `💧 सरसों में सिंचाई प्रबंधन:\n\n• सरसों में केवल 2-3 हल्की सिंचाइयों की आवश्यकता होती है।\n• पहली सिंचाई: 30-35 दिन (शाखाएं निकलते समय)\n• दूसरी सिंचाई: 60-65 दिन (फलियां बनते समय)\n• ध्यान दें: फूल खिलते समय कभी भारी पानी न दें, इससे फूल झड़ जाते हैं।`;
    }
    return `💧 Mustard Irrigation Schedule:\n\n• Only 2-3 light irrigations are needed.\n• 1st: 30-35 days (Pre-flowering)\n• 2nd: 60-65 days (Pod development)\n• Caution: Avoid flood irrigation during peak bloom to prevent flower drop.`;
  }

  // General Irrigation
  if (lang === 'hindi') {
    return `💧 वैज्ञानिक सिंचाई प्रबंधन:\n\n• हमेशा सुबह या शाम को सिंचाई करें, दोपहर की तेज धूप में पानी न लगाएं।\n• ड्रिप (टपक) व फव्वारा सिंचाई पर सरकार 70% तक अनुदान दे रही है।\n• जलभराव से बचें, खेत में पानी की निकासी का प्रबंध रखें।`;
  }
  return `💧 Smart Irrigation Management:\n\n• Irrigate during early morning or evening hours to avoid thermal shock.\n• Drip and micro-sprinkler systems save 50% water with 70% government subsidies.\n• Ensure proper drainage; water stagnation causes root suffocation.`;
};

// 5. SOWING & VARIETIES
const getSowingResponse = (crop: CropType | null, lang: string): string => {
  if (crop === 'wheat') {
    if (lang === 'hindi') {
      return `🌾 गेहूं बुवाई व उन्नत किस्में:\n\n• सर्वोत्तम बुवाई समय: 1 से 25 नवंबर।\n• बीज दर: 40-45 किग्रा प्रति एकड़।\n• टॉप किस्में: DBW 187 (करण वंदना), DBW 303 (करण नरेंद्र), HD 2967, PBW 550, WH 1105।\n• बीजोपचार: कार्बेन्डाजिम 2 ग्राम प्रति किग्रा बीज से उपचारित करके बोएं।`;
    }
    return `🌾 Wheat Sowing & Top Varieties:\n\n• Sowing Window: Nov 1 - Nov 25.\n• Seed Rate: 40-45 kg/acre.\n• Top Varieties: DBW 187, DBW 303, HD 2967, WH 1105, PBW 550.\n• Seed Treatment: Treat with Carbendazim (2g/kg seed) before drilling.`;
  }

  if (crop === 'mustard') {
    if (lang === 'hindi') {
      return `🌿 सरसों बुवाई व किस्में:\n\n• बुवाई समय: 1 से 25 अक्टूबर।\n• बीज दर: 1.5 से 2 किग्रा प्रति एकड़।\n• टॉप किस्में: RH 725, गिरिराज, पूसा मस्टर्ड 28, पायनियर 45S46।\n• बीजोपचार: थायरम या मेंकोजेब 2.5 ग्राम/किग्रा बीज।`;
    }
    return `🌿 Mustard Sowing & Varieties:\n\n• Sowing Window: Oct 1 - Oct 25.\n• Seed Rate: 1.5 - 2 kg/acre.\n• Top Varieties: RH 725, Giriraj, Pusa Mustard 28, Pioneer 45S46.\n• Seed Treatment: Thiram / Mancozeb at 2.5 g/kg seed.`;
  }

  // General Sowing
  if (lang === 'hindi') {
    return `🌾 बुवाई व बीज प्रबंधन नियम:\n\n• हमेशा प्रमाणित (Certified) बीज ही उपयोग करें।\n• बीज उपचार का FIR नियम अपनाएं: पहले फफूंदनाशक (F), फिर कीटनाशक (I), फिर राइजोबियम/बायोफर्टिलाइजर (R)।\n• Seasonal Crop Predictor से अपनी मिट्टी व पानी के अनुसार सर्वोत्तम फसल चुनें।`;
  }
  return `🌾 Sowing & Seed Best Practices:\n\n• Always use certified high-germination seed.\n• Follow the FIR rule for seed treatment: Fungicide first, Insecticide second, Rhizobium/bio-fertilizer third.\n• Use NextGen Kisan's Seasonal Crop Predictor to match crops with your soil and water.`;
};

// 6. CROP 360 SUMMARY (When only crop name is typed)
const getCropSummaryResponse = (crop: CropType, lang: string): string => {
  if (crop === 'wheat') {
    if (lang === 'hindi') {
      return `🌾 गेहूं (Wheat) संपूर्ण फसल गाइड:\n\n• 📈 मंडी भाव व MSP: सरकारी MSP ₹2,425/क्विंटल (मंडी भाव: ₹2,400 - ₹2,550)।\n• 📅 बुवाई: 1-25 नवंबर (किस्में: DBW 303, HD 2967, DBW 187)।\n• 🌱 खाद: 50kg DAP + 25kg MOP बुवाई पर; 45kg यूरिया पहली व दूसरी सिंचाई पर।\n• 💧 पहली सिंचाई: 21 दिन पर (CRI ताज जड़ अवस्था)।\n• ⚠️ रोग चेतावनी: पीला रतुआ दिखे तो टिल्ट (Tilt 25 EC) 1ml/L छिड़कें।`;
    }
    return `🌾 Wheat (गेहूं) 360° Summary:\n\n• 📈 Mandi Rate & MSP: Govt MSP ₹2,425 / qtl (Mandi range: ₹2,400 - ₹2,550).\n• 📅 Sowing: Nov 1-25 (Top varieties: DBW 303, HD 2967, DBW 187).\n• 🌱 Fertilizer: 50 kg DAP + 25 kg MOP at sowing; split 45 kg Urea.\n• 💧 1st Irrigation: Strictly at 21 days (CRI stage).\n• ⚠️ Disease Warning: Spray Propiconazole 25 EC (Tilt) if yellow rust appears.`;
  }

  if (crop === 'mustard') {
    if (lang === 'hindi') {
      return `🌿 सरसों (Mustard) संपूर्ण फसल गाइड:\n\n• 📈 मंडी भाव व MSP: सरकारी MSP ₹5,950/क्विंटल (मंडी भाव: ₹5,600 - ₹6,100)।\n• 📅 बुवाई: 1-25 अक्टूबर (किस्में: RH 725, गिरिराज, 45S46)।\n• 🌱 खाद व सल्फर: 35kg DAP + 15kg सल्फर प्रति एकड़।\n• 🐛 कीट बचाव: चेपा/माहू आने पर थायमेथॉक्सम 0.3g/L या नीम तेल 5ml/L छिड़कें।`;
    }
    return `🌿 Mustard (सरसों) 360° Summary:\n\n• 📈 Mandi Rate & MSP: Govt MSP ₹5,950 / qtl (Mandi range: ₹5,600 - ₹6,100).\n• 📅 Sowing: Oct 1-25 (Varieties: RH 725, Giriraj, 45S46).\n• 🌱 Fertilizer: 35 kg DAP + 15 kg Bentonite Sulfur.\n• 🐛 Pest Alert: Spray Thiamethoxam (0.3 g/L) or Neem Oil for aphids.`;
  }

  // Fallback to Mandi Price
  return getMandiPriceResponse(crop, lang);
};

// 7. GREETING
const getGreetingResponse = (lang: string, user?: string): string => {
  const name = user ? ` ${user}` : '';
  if (lang === 'hindi') {
    return `राम-राम${name}! 🙏 मैं हूँ भूमि AI — आपकी निजी डिजिटल कृषि सलाहकार।\n\nआप मुझसे बेझिझक पूछ सकते हैं:\n• 📈 आज का मंडी भाव (जैसे "गेहूं का मंडी भाव", "सरसों का रेट")\n• 🌾 फसल बुवाई, किस्में व सिंचाई का सही समय\n• 🐛 कीट, सुंडी, माहू व पीली पत्तियों का सटीक इलाज\n• 🌱 DAP, यूरिया, नैनो यूरिया व देसी खाद की खुराक\n• 🧪 घर बैठे मिट्टी जांच व पशु स्वास्थ्य सलाह\n\nबताइए आज आपकी क्या मदद करूँ?`;
  }
  if (lang === 'regional') {
    return `राम-राम${name}! 🙏 म्हूं भूमि AI हूँ। आज रो मंडी भाव, गेहूं-सरसों री खेती, कीड़ा-मकोड़ा रो इलाज या खाद-बीज बाबत कोई भी बात पूछ सको हो!`;
  }
  return `Namaste${name}! 🙏 I am Bhoomi AI — your voice-enabled digital farming advisor.\n\nYou can ask me directly about:\n• 📈 Today's Mandi Prices (e.g. "wheat price in mandi today", "mustard rate")\n• 🌾 Sowing windows, high-yielding varieties & irrigation\n• 🐛 Pest remedies for aphids, blights, borers & yellow leaves\n• 🌱 Fertilizer doses (DAP, Urea, Nano Urea & Potash)\n• 🧪 Doorstep soil testing & livestock veterinary care\n\nWhat can I assist your farm with today?`;
};

// 8. WHO ARE YOU / HELP
const getWhoAreYouResponse = (lang: string): string => {
  if (lang === 'hindi') {
    return `🙏 मैं 'भूमि AI' (Bhoomi AI) हूँ — NextGen किसान का कृषि सहायक।\n\nमेरी प्रमुख सेवाएं:\n1. 📈 सभी फसलों का आज का ताजा मंडी भाव व सरकारी MSP।\n2. 🔍 पत्ती के रोग व कीट का तुरंत सटीक उपचार।\n3. 🌾 गेहूं, सरसों, चना, कपास आदि फसलों का संपूर्ण पोषण शेड्यूल।\n4. 🧪 घर बैठे मिट्टी जांच (Soil Test) बुकिंग।\n5. 🩺 पशु डॉक्टर की होम विजिट व मंडी के लिए वाहन बुकिंग।\n\nमाइक दबाकर बोलें या नीचे लिखकर पूछें!`;
  }
  return `🙏 I am 'Bhoomi AI' — NextGen Kisan's voice-enabled digital agronomy assistant.\n\nKey Capabilities:\n1. 📈 Daily Mandi Rates & Government MSP for 14+ crops.\n2. 🔍 Pest & disease diagnostics with precise chemical and organic dosages.\n3. 🌾 Full crop lifecycle agronomy (Sowing to Harvesting).\n4. 🧪 Doorstep Soil Health Test sample collection booking.\n5. 🩺 Veterinary on-farm doctor booking & transparent Mandi freight logistics.\n\nClick the Mic (🎙️) to speak or type any question!`;
};

// 9. SOIL HEALTH TEST
const getSoilTestResponse = (lang: string): string => {
  if (lang === 'hindi') {
    return `🧪 मृदा स्वास्थ्य परीक्षण (Soil Health Testing):\n\n1. नमूना लेने का तरीका: खेत में 5 जगहों से V-आकार में 6 से 8 इंच गहरी मिट्टी निकालें और 500 ग्राम साफ थैली में भरें।\n2. घर बैठे जांच बुक करें: NextGen किसान के "Soil & Crop Test" विकल्प पर क्लिक करें।\n3. प्रमाणित लैब तकनीशियन आपके घर आकर सैंपल लेंगे और 48-72 घंटे में pH, NPK, जिंक और सल्फर की रिपोर्ट व्हाट्सएप पर मिल जाएगी।`;
  }
  return `🧪 Soil Health & Nutrient Testing Guide:\n\n1. Sample Collection: Dig a V-shaped cut 6 to 8 inches deep at 5 zigzag spots across the field. Scrape and mix thoroughly for a 500g composite sample.\n2. Book on NextGen Kisan: Click "Soil & Crop Test" on your dashboard.\n3. Doorstep Collection: A certified field technician collects GPS-tagged samples, delivering digital nutrient reports (pH, EC, N-P-K, Zinc) in 48-72 hours.`;
};

// 10. LIVESTOCK & VET
const getLivestockResponse = (lang: string): string => {
  if (lang === 'hindi') {
    return `🐄 पशु स्वास्थ्य व दुग्ध उत्पादन सलाह:\n\n1. मवेशी को बुखार होने पर: छायादार स्थान पर रखें, माथे पर ठंडे पानी की पट्टी रखें। गुड़-अजवाइन का पानी दें।\n2. थनैला (Mastitis) से बचाव: दूध दुहने के बाद थनों को आयोडीन घोल में डुबोएं। बाड़े को सूखा रखें।\n3. दूध बढ़ाने हेतु: प्रतिदिन 50 ग्राम मिनरल मिक्सचर दें।\n4. डॉक्टर होम-विजिट: NextGen किसान के "Veterinary Services" से नजदीकी डॉक्टर तुरंत बुलाएं!`;
  }
  return `🐄 Livestock Health & Milk Production Advisory:\n\n1. Cattle Fever First Aid: Move animal to shaded shelter; apply cool wet cloths to the forehead. Give lukewarm ajwain+jaggery water.\n2. Mastitis Prevention: Post-milking teat dipping in antiseptic iodine. Keep shed floors clean and dry.\n3. Milk Boost: Feed 50g mineral mixture daily with quality green berseem fodder.\n4. Call Vet Doctor: Book a verified vet home-visit via NextGen Kisan's "Veterinary Services"!`;
};

// 11. GOVT SCHEMES
const getGovtSchemeResponse = (lang: string): string => {
  if (lang === 'hindi') {
    return `💰 प्रमुख सरकारी कृषि योजनाएं व सब्सिडी:\n\n1. पीएम-किसान सम्मान निधि: ₹6,000 प्रति वर्ष 3 किस्तों में। pmkisan.gov.in पर बायोमेट्रिक e-KYC अवश्य कराएं।\n2. किसान क्रेडिट कार्ड (KCC): मात्र 4% ब्याज पर ₹3 लाख तक का कृषि ऋण उपलब्ध है।\n3. पीएम कुसुम सोलर पंप योजना: 60% से 90% तक की भारी सरकारी सब्सिडी।\n4. फसल बीमा (PMFBY): प्राकृतिक आपदा से नुकसान पर 72 घंटे में क्लेम दर्ज करें।`;
  }
  return `💰 Key Government Agricultural Schemes:\n\n1. PM-KISAN: ₹6,000 annual cash transfer in 3 installments. Ensure Aadhaar e-KYC on pmkisan.gov.in.\n2. Kisan Credit Card (KCC): Subsidized crop loans up to ₹3 Lakhs at 4% effective interest.\n3. PM-KUSUM Solar Pump Scheme: 60% to 90% capital subsidy on solar irrigation pumps.\n4. PM Fasal Bima (PMFBY): Report localized crop loss within 72 hours via the Crop Insurance app.`;
};

// 12. ORGANIC FARMING
const getOrganicResponse = (lang: string): string => {
  if (lang === 'hindi') {
    return `🌿 प्राकृतिक जैविक खेती व जीवामृत विधि:\n\n• 200 लीटर जीवामृत: 10 किग्रा देसी गाय का गोबर + 10 लीटर गोमूत्र + 2 किग्रा गुड़ + 2 किग्रा बेसन + 1 मुट्ठी खेत की मेड़ की मिट्टी। 200 लीटर पानी में 5-7 दिन छाया में रखें।\n• प्रयोग: सिंचाई के पानी के साथ प्रति एकड़ 200 लीटर बहाएं या 10% घोल बनाकर छिड़कें।\n• यह मिट्टी की जल धारण क्षमता और लाभकारी सूक्ष्मजीवों को बढ़ाता है।`;
  }
  return `🌿 Natural Organic Jeevamrit Preparation:\n\n• Recipe for 200L: 10 kg Desi cow dung + 10 L cow urine + 2 kg jaggery + 2 kg gram flour + 1 handful fertile bund soil in 200L water. Ferment in shade for 5-7 days stirring daily.\n• Application: Apply 200L/acre via irrigation water or spray 10% filtered liquid.\n• Restores soil carbon and beneficial microbes without synthetic chemicals.`;
};

// 13. WEATHER PRECAUTIONS
const getWeatherResponse = (lang: string): string => {
  if (lang === 'hindi') {
    return `⛅ मौसम अनुसार कृषि सावधानियां:\n\n• बारिश की संभावना होने पर: किसी भी दवा या खाद का छिड़काव रोक दें। जल निकासी की नालियां खोलें।\n• पाला (Frost) पड़ने पर: रात का तापमान 4°C से नीचे जाने पर खेत में हल्की सिंचाई दें या 0.1% घुलनशील सल्फर का छिड़काव करें। उत्तर-पश्चिम मेड़ों पर शाम को धुआं करें।\n• लू / तेज धूप: नमी बनाए रखने के लिए मल्चिंग अपनाएं।`;
  }
  return `⛅ Weather & Seasonal Agronomy Advisory:\n\n• Rain Alert: Halt all pesticide/fertilizer sprays; unblock field drainage channels immediately.\n• Frost Defense (Winter): When night temperature dips below 4°C, give light irrigation or spray 0.1% wettable Sulfur. Create smoke barriers on windward borders.\n• High Heat: Use mulching to prevent severe soil moisture loss.`;
};

// 14. PLATFORM TOOLS
const getPlatformToolsResponse = (lang: string): string => {
  if (lang === 'hindi') {
    return `📱 NextGen किसान पोर्टल की प्रमुख सुविधाएं:\n\n1. 📸 Crop Disease Scanner: फोन से बीमार पत्ती का फोटो खींचें, AI तुरंत दवा बताएगा।\n2. 🧪 Soil & Crop Test: घर बैठे मिट्टी जांच सैंपल कलेक्शन बुक करें।\n3. 🌾 Seasonal Crop Predictor: अपनी मिट्टी व पानी के अनुसार सबसे ज्यादा मुनाफे वाली फसल चुनें।\n4. 🩺 Vet On-Demand: अनुभवी पशु डॉक्टर की ऑन-फार्म विजिट बुक करें।\n5. 🚛 Mandi Transport: फसल को उचित किराए पर मंडी पहुंचाने के लिए पिकअप या ट्रैक्टर ट्रॉली बुक करें।`;
  }
  return `📱 NextGen Kisan Digital Farming Suite:\n\n1. 📸 AI Crop Scanner: Instant disease diagnosis & remedy via camera photo.\n2. 🧪 Soil & Crop Test: Verified doorstep soil testing collection.\n3. 🌾 Seasonal Crop Predictor: Calculates highest-profit crops for your soil & water.\n4. 🩺 Veterinary On-Demand: Licensed vet doctor home visits.\n5. 🚛 Mandi Transport Logistics: Compare transparent freight rates and book trucks/trolleys directly.`;
};

// 15. DYNAMIC CONTEXTUAL FALLBACK
const getDynamicFallbackResponse = (query: string, lang: string): string => {
  if (lang === 'hindi') {
    return `🙏 आपका प्रश्न बहुत महत्वपूर्ण है। मैं कृषि, मंडी भाव और सरकारी योजनाओं की डिजिटल विशेषज्ञ हूँ।\n\nआप मुझसे इनमें से कुछ भी पूछ सकते हैं:\n• आज का ताजा मंडी भाव (जैसे "गेहूं का मंडी भाव", "सरसों का रेट")\n• किसी भी फसल (गेहूं, सरसों, चना, कपास, आलू) की बुवाई, खाद या रोग\n• पीली पत्तियां, सुंडी, कीड़ा या फफूंद का तुरंत समाधान\n• गाय-भैंस की बीमारी, बुखार या दूध बढ़ाने के नुस्खे\n• PM-किसान ₹6,000 किस्त या केसीसी (KCC) ऋण\n\nकृपया अपने सवाल को थोड़ा और स्पष्ट लिखें या माइक दबाकर बोलें!`;
  }
  if (lang === 'regional') {
    return `🙏 थारो सवाल घणो बढ़िया है! खेती-बाड़ी या मंडी भाव बाबत कोई भी जानकारी चाहिजे तो बताओ:\n• आज रो मंडी भाव (गेहूं, सरसों, चणा, कपास)\n• फसल रो पीलापन, सुंडी या कीड़ा रो इलाज\n• यूरिया, DAP या देसी खाद\nमाइक दबाय’र बोल सको हो!`;
  }
  return `🙏 That's a great farming question! As your Bhoomi AI agronomy advisor, I am ready to help you with:\n\n• Today's Mandi Prices & MSP (e.g. "wheat price in mandi today", "mustard rate")\n• Sowing, fertilizer & irrigation for any crop (Wheat, Mustard, Gram, Potato, Cotton)\n• Rapid remedies for yellow leaves, caterpillars, aphids & blights\n• Cattle fever, mastitis & milk yield enhancement\n• PM-Kisan subsidy status & KCC bank loans\n\nPlease specify your crop or issue, or click the Mic (🎙️) to speak!`;
};

// -------------------------------------------------------------
// MAIN RESPONSE ENTRY POINT
// -------------------------------------------------------------

export const getBhoomiResponse = async (
  query: string,
  history: ChatMessage[],
  language: string,
  userName?: string
): Promise<string> => {
  const cleanQ = query.trim();
  if (!cleanQ) return '';

  // 1. Try Gemini Generative AI first if API key is present
  try {
    const geminiAnswer = await queryGeminiAPI(cleanQ, history, language, userName);
    if (geminiAnswer) {
      return geminiAnswer;
    }
  } catch (err) {
    console.warn('Gemini query error, using built-in knowledge base:', err);
  }

  // 2. Built-in Intent-Entity Router (Offline Engine)
  const lowerQ = cleanQ.toLowerCase();
  const intent = detectIntent(lowerQ);
  const crop = detectCrop(lowerQ);

  switch (intent) {
    case 'GREETING':
      return getGreetingResponse(language, userName);

    case 'WHO_ARE_YOU':
      return getWhoAreYouResponse(language);

    case 'MANDI_PRICE':
      return getMandiPriceResponse(crop, language);

    case 'FERTILIZER':
      return getFertilizerResponse(crop, language);

    case 'PEST_DISEASE':
      return getPestDiseaseResponse(crop, language);

    case 'IRRIGATION':
      return getIrrigationResponse(crop, language);

    case 'SOWING_VARIETIES':
      return getSowingResponse(crop, language);

    case 'SOIL_TEST':
      return getSoilTestResponse(language);

    case 'LIVESTOCK':
      return getLivestockResponse(language);

    case 'GOVT_SCHEME':
      return getGovtSchemeResponse(language);

    case 'ORGANIC':
      return getOrganicResponse(language);

    case 'WEATHER':
      return getWeatherResponse(language);

    case 'PLATFORM_TOOLS':
      return getPlatformToolsResponse(language);

    case 'CROP_GENERAL':
      return crop ? getCropSummaryResponse(crop, language) : getDynamicFallbackResponse(cleanQ, language);

    default:
      if (crop) {
        return getCropSummaryResponse(crop, language);
      }
      return getDynamicFallbackResponse(cleanQ, language);
  }
};
