import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Sparkles, Send, X, Bot, User, Mic, RefreshCw,
  HelpCircle, CheckCircle, ChevronDown, MessageSquare,
  Sprout, Volume2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

interface BhoomiAIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BhoomiAIChat: React.FC<BhoomiAIChatProps> = ({ isOpen, onClose }) => {
  const { language, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isHindi = language === 'hindi';
  const isRegional = language === 'regional';

  // Initial welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeText = isHindi
        ? `राम-राम ${user?.name || 'किसान भाई'}! 🙏 मैं हूँ 'भूमि AI' (Bhoomi AI) — आपकी निजी 24x7 डिजिटल कृषि व फसल सलाहकार। आप मुझसे फसल रोग, यूरिया/डीएपी खाद, मौसम, मवेशी स्वास्थ्य या सरकारी योजनाओं के बारे में कुछ भी पूछ सकते हैं!`
        : isRegional
          ? `राम-राम ${user?.name || 'किसान भाई'}! 🙏 म्हूं 'भूमि AI' (Bhoomi AI) हूँ — थारी डिजिटल खेती सलाहकार। फसल री बीमारी, माटी जांच, पशु इलाज या सरकारी योजनावां बाबत कोई भी सवाल पूछ सको हो!`
          : `Namaste ${user?.name || 'Kisan'}! 🙏 I am 'Bhoomi AI' — your 24/7 personal digital farming and crop advisor. Ask me anything about crop diseases, NPK fertilizers, soil testing, livestock health, or government schemes!`;

      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: welcomeText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [language, user, isHindi, isRegional]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Quick suggestions
  const quickSuggestions = isHindi
    ? [
        '🌾 गेहूं में पीले पत्तों का इलाज?',
        '🧪 मिट्टी जांच (Soil Test) कैसे करवाएं?',
        '💰 PM-किसान ₹6,000 की जानकारी',
        '🐄 गाय/भैंस के बुखार की प्राथमिक दवा',
        '🐛 जैविक नीम कीटनाशक कैसे बनाएं?',
      ]
    : isRegional
      ? [
          '🌾 गेहूं रा पत्ता पीला क्यों पड़ रिया है?',
          '🧪 माटी जांच री पूरी प्रक्रिया',
          '💰 किसान सम्मान निधि री किस्त',
          '🐄 बीमार गाय-भैंस रो देशी इलाज',
        ]
      : [
          '🌾 How to fix yellow leaves in wheat?',
          '🧪 How to book a Soil Health Test?',
          '💰 PM-Kisan subsidy status & eligibility',
          '🐄 First aid for livestock fever',
          '🐛 How to make organic neem pesticide?',
        ];

  // AI response engine with agricultural knowledge
  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Wheat / गेहूं / Leaf yellowing
    if (q.includes('wheat') || q.includes('गेहूं') || q.includes('पील') || q.includes('yellow') || q.includes('पत्ता')) {
      return isHindi
        ? '🌾 **गेहूं में पीलापन का समाधान:**\n1. यदि निचले पत्ते पीले हैं, तो यह **नाइट्रोजन की कमी** है — 2% यूरिया (100 लीटर पानी में 2 किग्रा यूरिया) का छिड़काव करें।\n2. यदि पत्तों पर पीला पाउडर/धब्बे हैं, तो यह **पीला रतुआ (Yellow Rust)** है — प्रोपिकोनाजोल (Tilt 25 EC) 1 मिली प्रति लीटर पानी में मिलाकर तुरंत छिड़कें।\n3. ध्यान रखें: खेत में पानी भरने न दें।'
        : isRegional
          ? '🌾 **गेहूं रा पीलापन रो उपाय:**\n1. पत्ता पीला पड़े तो यूरिया री कमी हो सके है — 2% यूरिया रो छिड़काव करो।\n2. फफूंद या रतुआ दिखे तो प्रोपिकोनाजोल (Tilt 25 EC) 1ml/लीटर पानी में मिला’र छिड़को।'
          : '🌾 **Wheat Leaf Yellowing Solution:**\n1. **Nitrogen Deficiency**: If lower leaves turn pale yellow, spray 2% Urea solution (2 kg urea per 100L water).\n2. **Yellow Rust (Fungal)**: If yellowish powder or streaks appear, apply Propiconazole (Tilt 25 EC) @ 1 ml/liter of water immediately.\n3. Avoid water stagnation in the field.';
    }

    // 2. Soil test / मिट्टी / माटी
    if (q.includes('soil') || q.includes('मिट्टी') || q.includes('माटी') || q.includes('test') || q.includes('जांच')) {
      return isHindi
        ? '🧪 **मृदा परीक्षण (Soil Testing):**\nNextGen किसान पोर्टल पर मिट्टी की जांच बहुत आसान है!\n1. होम स्क्रीन पर **"Soil & Crop Test"** कार्ड पर क्लिक करें।\n2. अपने खेत का 5 अलग-अलग स्थानों से V-आकार में 6-8 इंच गहरा नमूना लें।\n3. लैब तकनीशियन आपके घर आकर सैंपल कलेक्ट करेंगे और 2-3 दिन में डिजिटल रिपोर्ट मिल जाएगी।'
        : isRegional
          ? '🧪 **माटी री जांच:**\nNextGen किसान पर "Soil & Crop Test" बटन दबायो। खेत में 5 जग्यां सूं 6-8 इंच गहरी माटी लेवो। लैब तकनीशियन खुद थारे घर आय’र नमूना ले जासी अर रिपोर्ट दे देसी।'
          : '🧪 **Soil Health Testing:**\nBooking a soil test on NextGen Kisan is fast & easy!\n1. Click on **"Soil & Crop Test"** on your dashboard.\n2. Collect soil from 5 spots in a V-shape pattern at 6-8 inch depth.\n3. A certified lab technician will collect the sample and upload your digital nutrient card within 2-3 days.';
    }

    // 3. PM-Kisan / योजना / subsidy / kcc
    if (q.includes('pm-kisan') || q.includes('kisan') || q.includes('योजना') || q.includes('किस्त') || q.includes('subsidy') || q.includes('kcc')) {
      return isHindi
        ? '💰 **पीएम-किसान व सरकारी योजनाएं:**\n- **PM-KISAN:** पात्र किसानों को प्रति वर्ष ₹6,000 (3 किस्तों में ₹2,000 प्रत्येक) DBT के जरिए बैंक खाते में मिलते हैं।\n- **e-KYC जरूरी है:** pmkisan.gov.in पर जाकर या नजदीकी ई-मित्र/CSC सेंटर से बायोमेट्रिक e-KYC अवश्य पूरा रखें।\n- **KCC (किसान क्रेडिट कार्ड):** 4% की रियायती ब्याज दर पर ₹3 लाख तक का कृषि ऋण मिलता है।'
        : isRegional
          ? '💰 **सरकारी योजनावां री जानकारी:**\n- **PM-KISAN:** हर साल ₹6,000 बैंक खाता में आवै है। बायोमेट्रिक e-KYC जरूर करवा लीजो।\n- **KCC कार्ड:** कम ब्याज (4%) पर खेती वास्ते ऋण मिले है।'
          : '💰 **PM-KISAN & Govt Schemes:**\n- **PM-KISAN:** ₹6,000 per year distributed in three 4-monthly installments of ₹2,000 directly via DBT.\n- **Mandatory e-KYC:** Ensure your Aadhaar biometric e-KYC and land records are seeded on pmkisan.gov.in.\n- **KCC Card:** Subsidized crop loan limit up to ₹3 Lakhs at only 4% interest rate.';
    }

    // 4. Livestock / cow / buffalo / vet / पशु / गाय / भैंस / बुखार
    if (q.includes('cow') || q.includes('buffalo') || q.includes('गाय') || q.includes('भैंस') || q.includes('पशु') || q.includes('बुखार') || q.includes('fever') || q.includes('vet')) {
      return isHindi
        ? '🐄 **पशु स्वास्थ्य व प्राथमिक देखभाल:**\n1. यदि गाय/भैंस को तेज बुखार है, तो उसे धूप से हटाकर पंखे या हवादार जगह पर रखें और माथे पर गीला कपड़ा रखें।\n2. ताज़ा पानी व दलिया/गुड़ का काढ़ा दें।\n3. 🩺 NextGen किसान पोर्टल के **"Veterinary Services"** विकल्प से तुरंत सरकारी या प्राइवेट डॉक्टर का होम विजिट बुक करें।'
        : isRegional
          ? '🐄 **पशुवां रो इलाज:**\n1. बुखार होवै तो गाय-भैंस ने छांव में बांधो, माथा माथे ठंडो कपड़ो फेरो।\n2. "Veterinary Services" बटन सूं डॉक्टर ने घरै बुला सको हो।'
          : '🐄 **Livestock First Aid & Vet Support:**\n1. If your cow or buffalo has fever or lethargy, move them to shaded, well-ventilated shelter and apply a cool wet cloth to the forehead.\n2. Keep fresh drinking water available.\n3. 🩺 Use our **"Veterinary Services"** button on the dashboard to request an on-farm doctor visit right away.';
    }

    // 5. Pest / Neem / कीटनाशक / कीड़ा / फंगस / fungus
    if (q.includes('pest') || q.includes('neem') || q.includes('कीट') || q.includes('कीड़ा') || q.includes('कीटनाशक') || q.includes('insect') || q.includes('fungus')) {
      return isHindi
        ? '🐛 **जैविक कीटनाशक (Neem Oil):**\n- 1 लीटर पानी में 5 मिली नीम का तेल (Neem Oil 1500 PPM) और 1 मिली शैम्पू/साबुन का घोल मिलाकर सुबह या शाम को छिड़कें।\n- यह माहू, सफेद मक्खी, इल्ली और थ्रिप्स को बिना किसी साइड-इफेक्ट के नष्ट करता है और मित्र कीटों (मधुमक्खी, केंचुए) को नुकसान नहीं पहुँचाता।'
        : isRegional
          ? '🐛 **नीम कीटनाशक रो घोल:**\n1 लीटर पानी में 5ml नीम रो तेल अर थोड़ो साबुन रो घोल मिला’र छिड़को। इल्ली अर कीड़ा दूर भागेला अर जमीन भी खराब कोनी होवेला।'
          : '🐛 **Organic Neem Pest Control:**\n- Mix 5 ml Neem Oil (1500 PPM) with 1 ml liquid soap/mild detergent in 1 liter of water.\n- Spray during early morning or late afternoon. It controls aphids, whiteflies, caterpillars, and thrips without harming beneficial insects or soil microbiome.';
    }

    // 6. Fertilizer / NPK / यूरिया / DAP
    if (q.includes('fertilizer') || q.includes('npk') || q.includes('urea') || q.includes('dap') || q.includes('खाद')) {
      return isHindi
        ? '🌱 **खाद व पोषण प्रबंधन:**\n- हमेशा मृदा जांच रिपोर्ट के आधार पर ही खाद दें।\n- बुवाई के समय DAP या NPK 12:32:16 दें, और पहली तथा दूसरी सिंचाई के समय यूरिया को दो बराबर हिस्सों में बांटकर (Top Dressing) दें।\n- गोबर की सड़ी खाद (Vermicompost) मिलाने से मिट्टी की जल धारण क्षमता 30% बढ़ती है।'
        : isRegional
          ? '🌱 **खाद री सही मात्रा:**\n- बुवाई बखत DAP अर पछे सिंचाई रे साथे यूरिया देवो।\n- देसी गोबर री खाद जरूर घालो ताकि माटी में नमी बनी रहवे।'
          : '🌱 **Fertilizer & Nutrient Guidance:**\n- Follow a split application: Apply full dose of DAP/Phosphorus & Potash at sowing, and divide Urea into 2 splits applied after 1st and 2nd irrigations.\n- Adding well-rotted FYM or Vermicompost improves soil moisture retention significantly.';
    }

    // Fallback response
    return isHindi
      ? `🙏 आपका सवाल बहुत महत्वपूर्ण है! भूमि AI आपकी मदद के लिए निरंतर सीख रही है। आप NextGen किसान पोर्टल पर सीधे हमारे विशेषज्ञों (सत्यापित पशु चिकित्सक, मृदा लैब तकनीशियन या कृषि विशेषज्ञ) से भी परामर्श ले सकते हैं। क्या आप किसी विशिष्ट फसल (गेहूं, सरसों, चना, कपास) या सेवा के बारे में जानना चाहते हैं?`
      : isRegional
        ? `🙏 थारो सवाल घणो बढ़िया है! खेती-बाड़ी या पशु इलाज वास्ते आप NextGen किसान रा डॉक्टर या लैब तकनीशियन सूं भी सीधा जुड़ सको हो। कोई और बात पूछनी हो तो बताओ!`
        : `🙏 That's a great question! Bhoomi AI is actively assisting with crop diagnostics, fertilizers, pest control, and government subsidies. You can also connect with certified experts directly via our dashboard services. Would you like advice on a specific crop (Wheat, Mustard, Gram, Cotton) or platform service?`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyText = generateAIResponse(userMsg.text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleQuickQuestion = (text: string) => {
    setInputValue(text);
    setTimeout(() => {
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        const aiReplyText = generateAIResponse(text);
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 800);
    }, 50);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '640px',
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(22, 163, 74, 0.3), 0 10px 30px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(134, 239, 172, 0.5)',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
            padding: '1rem 1.25rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(21, 128, 61, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Animated Avatar */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                position: 'relative',
              }}
            >
              <Sprout style={{ width: '26px', height: '26px', color: '#16a34a' }} />
              <div
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  border: '2px solid #ffffff',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                  Bhoomi AI
                </h3>
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '6px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  {isHindi ? 'भूमि AI' : 'AGRICULTURAL ASSISTANT'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#dcfce7', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#86efac', display: 'inline-block' }} />
                {isHindi ? 'ऑनलाइन • हिंदी में सहायता के लिए तैयार' : isRegional ? 'ऑनलाइन • राजस्थानी/हिंदी' : 'Online • Ready to assist in English'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => {
                setMessages([]);
              }}
              title={isHindi ? 'चैट रीसेट करें' : 'Clear Chat'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <RefreshCw style={{ width: '15px', height: '15px' }} />
            </button>
            <button
              onClick={onClose}
              title={isHindi ? 'बंद करें' : 'Close'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div
          style={{
            padding: '0.6rem 0.85rem',
            backgroundColor: '#f0fdf4',
            borderBottom: '1px solid #bbf7d0',
            overflowX: 'auto',
            display: 'flex',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
          }}
        >
          {quickSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickQuestion(suggestion)}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid #86efac',
                color: '#166534',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dcfce7';
                e.currentTarget.style.borderColor = '#16a34a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#86efac';
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            backgroundColor: '#f8fafc',
          }}
        >
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  alignSelf: isAI ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                }}
              >
                {isAI && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Bot style={{ width: '18px', height: '18px' }} />
                  </div>
                )}

                <div
                  style={{
                    backgroundColor: isAI ? '#ffffff' : '#16a34a',
                    color: isAI ? '#1e293b' : '#ffffff',
                    borderRadius: isAI ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                    padding: '0.75rem 1rem',
                    boxShadow: isAI ? '0 2px 8px rgba(0, 0, 0, 0.06)' : '0 2px 8px rgba(22, 163, 74, 0.25)',
                    border: isAI ? '1px solid #e2e8f0' : 'none',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  <div>{msg.text}</div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: isAI ? '#94a3b8' : 'rgba(255, 255, 255, 0.75)',
                      textAlign: 'right',
                      marginTop: '0.35rem',
                    }}
                  >
                    {msg.time}
                  </div>
                </div>

                {!isAI && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      backgroundColor: '#e2e8f0',
                      color: '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <User style={{ width: '18px', height: '18px' }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot style={{ width: '18px', height: '18px' }} />
              </div>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '4px 16px 16px 16px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.8rem',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Sparkles style={{ width: '14px', height: '14px', color: '#16a34a' }} />
                <span>{isHindi ? 'भूमि AI उत्तर तैयार कर रही है...' : 'Bhoomi AI is thinking...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={
              isHindi
                ? 'फसल, खाद या योजना का सवाल पूछें...'
                : isRegional
                  ? 'खेती-बाड़ी बाबत सवाल पूछो...'
                  : 'Ask about crop health, fertilizer, subsidy...'
            }
            style={{
              flex: 1,
              padding: '0.65rem 0.9rem',
              borderRadius: '12px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#16a34a')}
            onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '12px',
              backgroundColor: inputValue.trim() ? '#16a34a' : '#94a3b8',
              color: '#ffffff',
              border: 'none',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              transition: 'all 0.2s',
            }}
          >
            <span>{isHindi ? 'पूछें' : 'Send'}</span>
            <Send style={{ width: '15px', height: '15px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BhoomiAIChat;
