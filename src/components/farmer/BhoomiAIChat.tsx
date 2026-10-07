import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Sparkles, Send, X, Bot, User, Mic, MicOff, RefreshCw,
  Volume2, VolumeX, CheckCircle, Sprout, Square
} from 'lucide-react';
import {
  speakWithBrowser, stopBrowserSpeech, speakWithElevenLabs,
  createSpeechRecognition, DEFAULT_ELEVENLABS_VOICE_ID
} from '../../utils/voiceService';

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

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isVoiceReplyEnabled, setIsVoiceReplyEnabled] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // ElevenLabs API key from env or storage (voice ID is preset to ag3I9T3TmwdB4HocPu9E)
  const elevenLabsApiKey = (import.meta as any).env?.VITE_ELEVENLABS_API_KEY || localStorage.getItem('bhoomi_elevenlabs_key') || '';
  const elevenLabsVoiceId = DEFAULT_ELEVENLABS_VOICE_ID;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const isHindi = language === 'hindi';
  const isRegional = language === 'regional';

  // Initial welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeText = isHindi
        ? `राम-राम ${user?.name || 'किसान भाई'}! 🙏 मैं हूँ 'भूमि AI' (Bhoomi AI) — आपकी निजी डिजिटल कृषि सलाहकार।\n\nआप माइक (🎙️) दबाकर बोल सकते हैं या लिखकर पूछ सकते हैं। मैं आपको बोलकर भी जवाब दूंगी!`
        : isRegional
          ? `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${user?.name || 'ਕਿਸਾਨ ਵੀਰ'}! 🙏 ਮੈਂ ਹਾਂ 'ਭੂਮੀ AI' (Bhoomi AI) — ਤੁਹਾਡੀ 24x7 ਨਿੱਜੀ ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ। ਤੁਸੀਂ ਮੈਨੂੰ ਫ਼ਸਲਾਂ ਦੇ ਰੋਗ, ਖਾਦਾਂ, ਮਿੱਟੀ ਪਰਖ, ਪਸ਼ੂਆਂ ਦੀ ਸਿਹਤ ਜਾਂ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ!`
          : `Namaste ${user?.name || 'Kisan'}! 🙏 I am 'Bhoomi AI' — your voice-enabled digital farming advisor.\n\nYou can click the Mic (🎙️) to speak your query, or type below. I will also read out my answers to you!`;

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

  // Clean up audio & speech on unmount or close
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      if (isListening && recognitionRef.current) {
        recognitionRef.current.abort();
        setIsListening(false);
      }
    }
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speak text using ElevenLabs (if apiKey available) or Browser Native Female Voice
  const speakText = async (text: string, messageId: string) => {
    stopSpeaking();
    setIsSpeaking(true);
    setSpeakingMessageId(messageId);

    // If ElevenLabs API Key is present, call ElevenLabs with user's voice ID
    if (elevenLabsApiKey.trim()) {
      try {
        const audio = await speakWithElevenLabs(text, elevenLabsApiKey.trim(), elevenLabsVoiceId);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          setSpeakingMessageId(null);
        };
        audio.onerror = () => {
          // Gracefully fallback to browser female voice if ElevenLabs request errors
          speakWithBrowserFallback(text, messageId);
        };
        await audio.play();
        return;
      } catch (err) {
        console.warn('ElevenLabs playback failed, using natural browser female voice:', err);
      }
    }

    // Default Browser Native Female Voice (warm, calm, female pitch 1.2)
    speakWithBrowserFallback(text, messageId);
  };

  const speakWithBrowserFallback = (text: string, messageId: string) => {
    speakWithBrowser(
      text,
      language,
      () => {
        setIsSpeaking(true);
        setSpeakingMessageId(messageId);
      },
      () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      }
    );
  };

  // Stop all active speaking
  const stopSpeaking = () => {
    stopBrowserSpeech();
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    setIsSpeaking(false);
    setSpeakingMessageId(null);
  };

  // Start Voice Listening (STT)
  const handleStartListening = () => {
    setSpeechError(null);
    stopSpeaking();

    const recognition = createSpeechRecognition(
      language,
      (transcript, isFinal) => {
        setInputValue(transcript);
        if (isFinal && transcript.trim()) {
          setTimeout(() => {
            handleSend(transcript.trim());
          }, 350);
        }
      },
      (error) => {
        if (error === 'not-allowed') {
          setSpeechError(isHindi ? 'कृपया ब्राउज़र में माइक्रोफ़ोन की अनुमति दें' : 'Please allow microphone access in your browser');
        } else if (error === 'no-speech') {
          setSpeechError(isHindi ? 'कोई आवाज़ सुनाई नहीं दी, फिर से प्रयास करें' : 'No speech detected, please try again');
        } else {
          setSpeechError(error);
        }
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (!recognition) {
      setSpeechError(isHindi ? 'आपके ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है' : 'Speech recognition not supported in this browser. Please use Chrome/Edge/Safari.');
      return;
    }

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.warn('Recognition start error:', err);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // AI response engine with agricultural knowledge
  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Wheat / गेहूं / Leaf yellowing
    if (q.includes('wheat') || q.includes('गेहूं') || q.includes('पील') || q.includes('yellow') || q.includes('पत्ता')) {
      return isHindi
        ? '🌾 गेहूं में पीलापन का मुख्य कारण नाइट्रोजन की कमी या पीला रतुआ (Yellow Rust) है।\n\n1. निचली पत्तियां पीली होने पर: 2% यूरिया (100 लीटर पानी में 2 किलोग्राम यूरिया) का छिड़काव करें।\n2. फफूंद या पाउडर दिखने पर: प्रोपिकोनाजोल (Tilt 25 EC) 1 मिली प्रति लीटर पानी में मिलाकर तुरंत छिड़कें।\n3. खेत में जलभराव न होने दें।'
        : isRegional
          ? '🌾 गेहूं रा पीलापन रो समाधान: यूरिया री कमी होवे तो 2% यूरिया रो छिड़काव करो। फफूंद या रतुआ दिखे तो प्रोपिकोनाजोल 1 मिलीलीटर प्रति लीटर पानी में छिड़को।'
          : '🌾 Wheat Leaf Yellowing Solution:\n\n1. Nitrogen Deficiency: If lower leaves turn pale yellow, spray 2% Urea solution (2 kg urea per 100L water).\n2. Yellow Rust: If yellow streaks or powder appear, apply Propiconazole (Tilt 25 EC) at 1 ml per liter of water immediately.\n3. Ensure proper drainage in the field.';
    }

    // 2. Soil test / मिट्टी / माटी
    if (q.includes('soil') || q.includes('मिट्टी') || q.includes('माटी') || q.includes('test') || q.includes('जांच')) {
      return isHindi
        ? '🧪 मृदा परीक्षण (Soil Testing) करवाने के लिए:\n\n1. NextGen किसान पोर्टल के "Soil & Crop Test" विकल्प पर जाएं।\n2. खेत में 5 जगहों से 6 से 8 इंच गहराई से V-आकार में मिट्टी का नमूना लें।\n3. प्रमाणित लैब तकनीशियन आपके घर आकर सैंपल एकत्र करेंगे और 2-3 दिन में डिजिटल रिपोर्ट मिल जाएगी।'
        : isRegional
          ? '🧪 माटी री जांच वास्ते: NextGen किसान पर "Soil & Crop Test" बटन दबाओ। 5 जग्यां सूं 6-8 इंच गहरी माटी लेवो, लैब तकनीशियन थारे घर आ’र नमूना ले जासी।'
          : '🧪 Soil Health Testing:\n\n1. Click on "Soil & Crop Test" on your NextGen Kisan dashboard.\n2. Collect soil from 5 spots in a V-shape pattern at 6-8 inches depth.\n3. A certified lab technician will collect the sample and upload your digital nutrient report within 2-3 days.';
    }

    // 3. PM-Kisan / योजना / subsidy / kcc
    if (q.includes('pm-kisan') || q.includes('kisan') || q.includes('योजना') || q.includes('किस्त') || q.includes('subsidy') || q.includes('kcc')) {
      return isHindi
        ? '💰 पीएम-किसान सम्मान निधि (PM-KISAN):\n\n- पात्र किसानों को प्रति वर्ष ₹6,000 की सहायता 3 किस्तों में मिलती है।\n- अपनी किस्त प्राप्त करने के लिए आधार बायोमेट्रिक e-KYC और बैंक खाते में DBT लिंक अवश्य कराएं।\n- किसान क्रेडिट कार्ड (KCC) पर मात्र 4% ब्याज पर ₹3 लाख तक का कृषि ऋण उपलब्ध है।'
        : isRegional
          ? '💰 किसान सम्मान निधि: हर साल ₹6,000 आवै है। बायोमेट्रिक e-KYC जरूर करवा लीजो। KCC पर 4% ब्याज पर ऋण मिले है।'
          : '💰 PM-KISAN & Govt Schemes:\n\n- Eligible farmers receive ₹6,000 annually in 3 installments of ₹2,000 directly via DBT.\n- Complete your biometric e-KYC and link Aadhaar with bank on pmkisan.gov.in.\n- Kisan Credit Card (KCC) provides subsidized crop loans up to ₹3 Lakhs at only 4% interest.';
    }

    // 4. Livestock / cow / buffalo / vet / पशु / गाय / भैंस / बुखार
    if (q.includes('cow') || q.includes('buffalo') || q.includes('गाय') || q.includes('भैंस') || q.includes('पशु') || q.includes('बुखार') || q.includes('fever') || q.includes('vet')) {
      return isHindi
        ? '🐄 पशु स्वास्थ्य व देखभाल:\n\n1. मवेशी को बुखार होने पर छायादार, हवादार स्थान पर रखें और माथे पर गीला कपड़ा रखें।\n2. सादा पानी और गुड़-अजवाइन का काढ़ा दें।\n3. तुरंत डॉक्टर बुलाने के लिए NextGen किसान के "Veterinary Services" बटन से ऑन-फार्म होम विजिट बुक करें।'
        : isRegional
          ? '🐄 पशुवां रो इलाज: बुखार होवै तो गाय-भैंस ने छांव में राखो। तुरंत "Veterinary Services" सूं डॉक्टर ने घरै बुलाओ।'
          : '🐄 Livestock Care & First Aid:\n\n1. If cattle have fever, move them to shaded, well-ventilated shelter and apply a cool wet cloth to the forehead.\n2. Keep fresh clean water available.\n3. Request a licensed doctor visit using the "Veterinary Services" button on your dashboard.';
    }

    // 5. Pest / Neem / कीटनाशक / कीड़ा / फंगस / fungus
    if (q.includes('pest') || q.includes('neem') || q.includes('कीट') || q.includes('कीड़ा') || q.includes('कीटनाशक') || q.includes('insect') || q.includes('fungus')) {
      return isHindi
        ? '🐛 जैविक कीटनाशक (Neem Oil Spray):\n\n- 1 लीटर पानी में 5 मिली नीम का तेल (Neem Oil 1500 PPM) और थोड़ा साबुन/सर्फ मिलाकर छिड़कें।\n- यह माहू, सफेद मक्खी और सुंडी को प्राकृतिक रूप से नियंत्रित करता है और मित्र कीटों को नुकसान नहीं पहुँचाता।'
        : isRegional
          ? '🐛 नीम कीटनाशक: 1 लीटर पानी में 5ml नीम रो तेल मिला’र छिड़को। कीड़ा खत्म होवेला अर जमीन भी सुरक्षित रहवेला।'
          : '🐛 Organic Neem Pest Control:\n\n- Mix 5 ml Neem Oil (1500 PPM) with 1 ml liquid soap in 1 liter of water.\n- Spray in early morning or evening. It controls aphids, whiteflies, and caterpillars safely without harming soil or bees.';
    }

    // 6. Fertilizer / NPK / यूरिया / DAP
    if (q.includes('fertilizer') || q.includes('npk') || q.includes('urea') || q.includes('dap') || q.includes('खाद')) {
      return isHindi
        ? '🌱 खाद व पोषण प्रबंधन:\n\n- बुवाई के समय DAP या NPK दें, और पहली तथा दूसरी सिंचाई के बाद यूरिया को दो भागों में बांटकर (Top Dressing) दें।\n- खेत में वर्मीकम्पोस्ट (केंचुआ खाद) मिलाने से पैदावार 25% तक बढ़ती है।'
        : isRegional
          ? '🌱 खाद प्रबंधन: बुवाई बखत DAP अर सिंचाई रे साथे यूरिया देवो। देसी गोबर री खाद जरूर घालो।'
          : '🌱 Fertilizer Management:\n\n- Apply DAP/Potash at sowing, and divide Urea into two split top-dressings after 1st and 2nd irrigations.\n- Adding Vermicompost increases water retention and crop yield up to 25%.';
    }

    // Fallback response
    return isHindi
      ? `🙏 आपका सवाल दर्ज कर लिया गया है। भूमि AI आपकी सेवा में तत्पर है। आप अपनी फसल (गेहूं, सरसों, चना, कपास), खाद या पशु के बारे में और पूछ सकते हैं। हमारे प्रमाणित डॉक्टर व लैब तकनीशियन भी आपकी सेवा के लिए उपलब्ध हैं।`
      : isRegional
        ? `🙏 थारो सवाल घणो बढ़िया है! खेती-बाड़ी या पशु इलाज वास्ते कोई भी जानकारी चाहिजे तो बताओ!`
        : `🙏 Great question! As your Bhoomi AI assistant, I recommend checking soil moisture and weather forecast before spraying. Feel free to ask about any specific crop (Wheat, Mustard, Gram) or request certified experts directly on NextGen Kisan!`;
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    stopSpeaking();

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
      const aiReplyText = generateAIResponse(userMsg.text);
      const aiMsgId = (Date.now() + 1).toString();
      const aiMsg: Message = {
        id: aiMsgId,
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Automatically speak reply in female voice if voice reply is enabled
      if (isVoiceReplyEnabled) {
        speakText(aiReplyText, aiMsgId);
      }
    }, 850);
  };

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
          '🌾 ਕਣਕ ਦੇ ਪੀਲੇ ਪੱਤਿਆਂ ਦਾ ਇਲਾਜ?',
          '🧪 ਮਿੱਟੀ ਪਰਖ (Soil Test) ਕਿਵੇਂ ਕਰਵਾਈਏ?',
          '💰 ਪੀ.ਐਮ-ਕਿਸਾਨ ਸਕੀਮ ਦੀ ਜਾਣਕਾਰੀ',
          '🐄 ਬਿਮਾਰ ਪਸ਼ੂਆਂ ਦਾ ਘਰੇਲੂ ਇਲਾਜ',
        ]
      : [
          '🌾 How to fix yellow leaves in wheat?',
          '🧪 How to book a Soil Health Test?',
          '💰 PM-Kisan subsidy status & eligibility',
          '🐄 First aid for livestock fever',
          '🐛 How to make organic neem pesticide?',
        ];

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
        if (e.target === e.currentTarget) {
          stopSpeaking();
          onClose();
        }
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          height: '670px',
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(22, 163, 74, 0.35), 0 10px 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(134, 239, 172, 0.5)',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header - Clean without slider/technical controls */}
        <div
          style={{
            background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
            padding: '0.9rem 1.25rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(21, 128, 61, 0.25)',
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
                  top: '-2px',
                  right: '-2px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: isListening ? '#ef4444' : isSpeaking ? '#3b82f6' : '#4ade80',
                  border: '2px solid #ffffff',
                  boxShadow: isListening ? '0 0 8px #ef4444' : 'none',
                  animation: isListening || isSpeaking ? 'pulse 1.5s infinite' : 'none',
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
                  }}
                >
                  {isHindi ? 'महिला आवाज 🎙️' : 'Female Voice 🎙️'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#dcfce7', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {isListening ? (
                  <span style={{ color: '#fef08a', fontWeight: 700 }}>
                    🔴 {isHindi ? 'सुन रही है... बोलिए' : 'Listening... Speak now'}
                  </span>
                ) : isSpeaking ? (
                  <span style={{ color: '#bfdbfe', fontWeight: 700 }}>
                    🔊 {isHindi ? 'बोल रही है...' : 'Speaking answer...'}
                  </span>
                ) : (
                  <span>
                    🟢 {isHindi ? 'ऑनलाइन • बोलकर या लिखकर पूछें' : isRegional ? 'ਆਨਲਾਈਨ • ਪੰਜਾਬੀ ਵਿੱਚ ਸਹਾਇਤਾ ਲਈ ਤਿਆਰ' : 'Online • Speak or type'}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action buttons in header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {/* Voice Reply Toggle */}
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setIsVoiceReplyEnabled(!isVoiceReplyEnabled);
              }}
              title={
                isVoiceReplyEnabled
                  ? (isHindi ? 'आवाज म्यूट करें (Voice Mute)' : 'Mute Voice Reply')
                  : (isHindi ? 'आवाज चालू करें (Voice Unmute)' : 'Enable Voice Reply')
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                backgroundColor: isVoiceReplyEnabled ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {isVoiceReplyEnabled ? (
                <Volume2 style={{ width: '15px', height: '15px' }} />
              ) : (
                <VolumeX style={{ width: '15px', height: '15px', color: '#fca5a5' }} />
              )}
              <span className="hidden sm:inline">
                {isVoiceReplyEnabled ? (isHindi ? 'आवाज ON' : 'Voice ON') : (isHindi ? 'म्यूट' : 'Muted')}
              </span>
            </button>

            {/* Stop Speaking button if active */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                title={isHindi ? 'आवाज रोकें' : 'Stop Audio'}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  animation: 'pulse 1s infinite',
                }}
              >
                <Square style={{ width: '13px', height: '13px', fill: 'white' }} />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
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

        {/* Listening Active Wave Banner */}
        {isListening && (
          <div
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: '#fef2f2',
              borderBottom: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  boxShadow: '0 0 10px #ef4444',
                  animation: 'pulse 1s infinite',
                }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#dc2626' }}>
                {isHindi ? '🎙️ भूमि AI सुन रही है... कृपया बोलिए!' : '🎙️ Bhoomi AI is listening... Speak your question!'}
              </span>
            </div>
            <button
              onClick={handleStopListening}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isHindi ? 'रोकें (Stop)' : 'Done'}
            </button>
          </div>
        )}

        {/* Speech Error Notice */}
        {speechError && (
          <div
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#fff7ed',
              borderBottom: '1px solid #ffedd5',
              fontSize: '0.75rem',
              color: '#c2410c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>⚠️ {speechError}</span>
            <button
              onClick={() => setSpeechError(null)}
              style={{ background: 'none', border: 'none', color: '#9a3412', cursor: 'pointer', fontWeight: 700 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div
          style={{
            padding: '0.55rem 0.85rem',
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
              onClick={() => handleSend(suggestion)}
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
            const isThisSpeaking = speakingMessageId === msg.id && isSpeaking;

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
                      backgroundColor: isThisSpeaking ? '#2563eb' : '#16a34a',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                      transition: 'background-color 0.2s',
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
                    border: isThisSpeaking ? '2px solid #3b82f6' : isAI ? '1px solid #e2e8f0' : 'none',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  <div>{msg.text}</div>

                  {/* Message Footer: Time + Listen Aloud Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isAI ? 'space-between' : 'flex-end',
                      gap: '0.5rem',
                      marginTop: '0.45rem',
                      borderTop: isAI ? '1px solid #f1f5f9' : 'none',
                      paddingTop: isAI ? '0.35rem' : '0',
                    }}
                  >
                    {isAI && (
                      <button
                        onClick={() => {
                          if (isThisSpeaking) {
                            stopSpeaking();
                          } else {
                            speakText(msg.text, msg.id);
                          }
                        }}
                        title={isThisSpeaking ? (isHindi ? 'आवाज रोकें' : 'Stop voice') : (isHindi ? 'महिला आवाज में सुनें' : 'Listen in female voice')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          backgroundColor: isThisSpeaking ? '#dbeafe' : '#f1f5f9',
                          border: `1px solid ${isThisSpeaking ? '#93c5fd' : '#e2e8f0'}`,
                          borderRadius: '6px',
                          padding: '0.15rem 0.45rem',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: isThisSpeaking ? '#1d4ed8' : '#475569',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {isThisSpeaking ? (
                          <>
                            <Square style={{ width: '10px', height: '10px', fill: '#1d4ed8' }} />
                            <span>{isHindi ? 'रोकें' : 'Stop'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 style={{ width: '11px', height: '11px', color: '#16a34a' }} />
                            <span>{isHindi ? 'सुनें' : 'Listen'}</span>
                          </>
                        )}
                      </button>
                    )}

                    <div
                      style={{
                        fontSize: '0.65rem',
                        color: isAI ? '#94a3b8' : 'rgba(255, 255, 255, 0.75)',
                      }}
                    >
                      {msg.time}
                    </div>
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
                <span>{isHindi ? 'भूमि AI उत्तर सोच रही है...' : 'Bhoomi AI is analyzing...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Mic Command Button */}
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
          {/* Pulsing Voice Mic Button */}
          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            title={
              isListening
                ? (isHindi ? 'बोलना समाप्त करें (Stop Listening)' : 'Stop Listening')
                : (isHindi ? 'बोलकर पूछें (Voice Command)' : 'Speak your question (Voice Command)')
            }
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: isListening ? '#ef4444' : '#f0fdf4',
              color: isListening ? '#ffffff' : '#16a34a',
              border: `2px solid ${isListening ? '#dc2626' : '#86efac'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: isListening ? '0 0 14px rgba(239, 68, 68, 0.5)' : '0 2px 6px rgba(22, 163, 74, 0.1)',
              transition: 'all 0.2s',
              animation: isListening ? 'pulse 1s infinite' : 'none',
            }}
          >
            {isListening ? (
              <MicOff style={{ width: '20px', height: '20px' }} />
            ) : (
              <Mic style={{ width: '20px', height: '20px' }} />
            )}
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={
              isListening
                ? (isHindi ? 'बोलिए... भूमि AI सुन रही है 🎙️' : 'Listening... Speak now 🎙️')
                : isHindi
                  ? 'माइक दबाकर बोलें या यहाँ लिखें...'
                  : isRegional
                    ? 'ਮਾਈਕ ਦਬਾ ਕੇ ਬੋਲੋ ਜਾਂ ਇੱਥੇ ਲਿਖੋ...'
                    : 'Click Mic to speak or type here...'
            }
            style={{
              flex: 1,
              padding: '0.65rem 0.9rem',
              borderRadius: '12px',
              border: isListening ? '2px solid #ef4444' : '1.5px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: isListening ? '#fef2f2' : '#ffffff',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = isListening ? '#ef4444' : '#16a34a')}
            onBlur={(e) => (e.target.style.borderColor = isListening ? '#ef4444' : '#cbd5e1')}
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
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
