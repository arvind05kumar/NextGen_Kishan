import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Sparkles, Send, X, Bot, User, Mic, MicOff,
  Volume2, VolumeX, Sprout, Square, Settings, Key,
  Check, ExternalLink, Trash2, ShieldCheck, Zap
} from 'lucide-react';
import {
  speakWithBrowser, stopBrowserSpeech, speakWithElevenLabs,
  createSpeechRecognition, DEFAULT_ELEVENLABS_VOICE_ID
} from '../../utils/voiceService';
import {
  getBhoomiResponse, getGeminiApiKey, setGeminiApiKey
} from '../../utils/bhoomiAiService';

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

  // Settings & API Keys state
  const [showSettings, setShowSettings] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(getGeminiApiKey());
  const [elevenLabsKeyInput, setElevenLabsKeyInput] = useState(
    localStorage.getItem('bhoomi_elevenlabs_key') || ''
  );
  const [settingsFeedback, setSettingsFeedback] = useState<string | null>(null);

  // ElevenLabs API key from env or storage (voice ID is preset to ag3I9T3TmwdB4HocPu9E)
  const elevenLabsApiKey = (import.meta as any).env?.VITE_ELEVENLABS_API_KEY || localStorage.getItem('bhoomi_elevenlabs_key') || '';
  const elevenLabsVoiceId = DEFAULT_ELEVENLABS_VOICE_ID;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const isHindi = language === 'hindi';
  const isRegional = language === 'regional';

  // Initial welcome message based on language
  const initWelcomeMessage = () => {
    const welcomeText = isHindi
      ? `राम-राम ${user?.name || 'किसान भाई'}! 🙏 मैं हूँ 'भूमि AI' (Bhoomi AI) — आपकी निजी डिजिटल कृषि सलाहकार।\n\nआप किसी भी फसल (गेहूं, सरसों, चना, कपास आदि), पीली पत्तियों, खाद की सही मात्रा, मौसम या पशु रोग के बारे में पूछ सकते हैं।\n\nमाइक (🎙️) दबाकर बोलें या नीचे लिखें — मैं बोलकर भी उत्तर दूंगी!`
      : isRegional
        ? `राम-राम ${user?.name || 'किसान भाई'}! 🙏 म्हूं 'भूमि AI' हूँ — थारी आवाज सूं चालण वाली डिजिटल खेती सलाहकार। फसल रा रोग, खाद-बीज या पशु इलाज बाबत माइक (🎙️) दबाय’र बोल सको हो, म्हूं बोल’र जवाब देसूं!`
        : `Namaste ${user?.name || 'Kisan'}! 🙏 I am 'Bhoomi AI' — your voice-enabled digital farming advisor.\n\nAsk me about any crop (Wheat, Mustard, Gram, Cotton), yellow leaf diagnosis, fertilizer dosage, weather warnings, or livestock care.\n\nClick the Mic (🎙️) to speak or type below — I will also read my answers out loud to you!`;

    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: welcomeText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  useEffect(() => {
    if (messages.length === 0) {
      initWelcomeMessage();
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
      setShowSettings(false);
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
    const activeElevenKey = (import.meta as any).env?.VITE_ELEVENLABS_API_KEY || localStorage.getItem('bhoomi_elevenlabs_key') || '';
    if (activeElevenKey.trim()) {
      try {
        const audio = await speakWithElevenLabs(text, activeElevenKey.trim(), elevenLabsVoiceId);
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

  // Asynchronous Dynamic AI response engine (Gemini API + Comprehensive Agro Knowledge Base)
  const handleSend = async (textToSend?: string) => {
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

    try {
      const aiReplyText = await getBhoomiResponse(
        userMsg.text,
        messages,
        language,
        user?.name
      );

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
    } catch (err) {
      console.error('Failed to get Bhoomi AI response:', err);
      setIsTyping(false);
    }
  };

  // Quick suggestions with diverse agricultural topics
  const quickSuggestions = isHindi
    ? [
        '🌾 गेहूं में पीले पत्तों का इलाज?',
        '🌿 सरसों में चेपा (माहू) की दवा?',
        '🌱 नैनो यूरिया व DAP की खुराक?',
        '🧪 मिट्टी जांच (Soil Test) कैसे करवाएं?',
        '🐄 गाय/भैंस के बुखार का प्राथमिक उपचार',
        '💰 PM-किसान ₹6,000 व KCC ऋण',
        '🥔 आलू में झुलसा रोग का समाधान',
        '🐛 दीमक व सुंडी से बचाव का उपाय',
        '🍅 मिर्च-टमाटर में पत्ता मरोड़ (चुरमुरा)?',
      ]
    : isRegional
      ? [
          '🌾 गेहूं रो पीलापन अर यूरिया?',
          '🌿 सरसों में चेपा रो इलाज?',
          '🌱 नैनो यूरिया री खुराक?',
          '🧪 माटी री जांच कियां करावां?',
          '🐄 बीमार पशुवां रो इलाज?',
          '💰 PM-किसान योजना री जानकारी',
        ]
      : [
          '🌾 How to fix yellow leaves in wheat?',
          '🌿 Remedy for mustard aphids (chepa)?',
          '🌱 Correct DAP & Nano Urea dosage?',
          '🧪 How to book a Soil Health Test?',
          '🐄 First aid for livestock fever & milk yield',
          '💰 PM-Kisan subsidy status & eligibility',
          '🥔 Late blight disease treatment in potato',
          '🐛 How to control termites and pod borers?',
          '🍅 Remedy for leaf curl in tomato/chilli',
        ];

  const handleSaveSettings = () => {
    setGeminiApiKey(geminiKeyInput.trim());
    if (elevenLabsKeyInput.trim()) {
      localStorage.setItem('bhoomi_elevenlabs_key', elevenLabsKeyInput.trim());
    } else {
      localStorage.removeItem('bhoomi_elevenlabs_key');
    }
    setSettingsFeedback(isHindi ? 'सेटिंग्स सफलतापूर्वक सहेजी गईं! ✅' : 'Settings saved successfully! ✅');
    setTimeout(() => {
      setSettingsFeedback(null);
      setShowSettings(false);
    }, 1200);
  };

  const handleClearHistory = () => {
    stopSpeaking();
    initWelcomeMessage();
    setShowSettings(false);
  };

  if (!isOpen) return null;

  const hasGeminiKey = Boolean(getGeminiApiKey());

  return (
    <>
      {/* Click-outside backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: 'rgba(15, 23, 42, 0.35)',
          backdropFilter: 'blur(2px)',
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={() => {
          stopSpeaking();
          onClose();
        }}
      />

      {/* Floating Bottom-Right Chat Window */}
      <div
        id="bhoomi-ai-chat-window"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          width: 'clamp(320px, 92vw, 440px)',
          height: 'clamp(500px, 86vh, 680px)',
          maxHeight: 'calc(100vh - 36px)',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(22, 163, 74, 0.4), 0 10px 30px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1.5px solid rgba(134, 239, 172, 0.8)',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header with Mode indicators & Controls */}
        <div
          style={{
            background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
            padding: '0.85rem 1.15rem',
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
                width: '42px',
                height: '42px',
                borderRadius: '13px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                position: 'relative',
              }}
            >
              <Sprout style={{ width: '24px', height: '24px', color: '#16a34a' }} />
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
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                  Bhoomi AI
                </h3>
                <span
                  style={{
                    backgroundColor: hasGeminiKey ? 'rgba(254, 240, 138, 0.3)' : 'rgba(255, 255, 255, 0.22)',
                    color: hasGeminiKey ? '#fef08a' : '#ffffff',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '6px',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                  }}
                  title={hasGeminiKey ? 'Gemini 2.5 Flash Online Engine' : 'Built-in 100+ Topics Agricultural Engine'}
                >
                  {hasGeminiKey ? <Zap style={{ width: '10px', height: '10px' }} /> : <ShieldCheck style={{ width: '10px', height: '10px' }} />}
                  {hasGeminiKey ? 'Gemini Live' : (isHindi ? 'कृषि ज्ञान' : 'Agro Brain')}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#dcfce7', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
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
                    🟢 {isHindi ? 'ऑनलाइन • बोलकर या लिखकर पूछें' : 'Online • Speak or type'}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action buttons in header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
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
                gap: '0.25rem',
                padding: '0.3rem 0.55rem',
                borderRadius: '8px',
                backgroundColor: isVoiceReplyEnabled ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {isVoiceReplyEnabled ? (
                <Volume2 style={{ width: '14px', height: '14px' }} />
              ) : (
                <VolumeX style={{ width: '14px', height: '14px', color: '#fca5a5' }} />
              )}
              <span className="hidden sm:inline">
                {isVoiceReplyEnabled ? (isHindi ? 'आवाज' : 'Voice') : (isHindi ? 'म्यूट' : 'Mute')}
              </span>
            </button>

            {/* Stop Speaking button if active */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                title={isHindi ? 'आवाज रोकें' : 'Stop Audio'}
                style={{
                  width: '30px',
                  height: '30px',
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
                <Square style={{ width: '12px', height: '12px', fill: 'white' }} />
              </button>
            )}

            {/* AI Settings Toggle Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              title={isHindi ? 'AI सेटिंग्स (Gemini API Key)' : 'AI Settings (Gemini API Key)'}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: showSettings ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Settings style={{ width: '15px', height: '15px' }} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              title={isHindi ? 'बंद करें' : 'Close'}
              style={{
                width: '30px',
                height: '30px',
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
              <X style={{ width: '17px', height: '17px' }} />
            </button>
          </div>
        </div>

        {/* Settings Drawer / Panel */}
        {showSettings && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderBottom: '2px solid #86efac',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.82rem',
              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 800, color: '#166534', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Settings style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                <span>{isHindi ? 'Bhoomi AI सेटिंग्स' : 'Bhoomi AI Configuration'}</span>
              </div>
              <button
                onClick={handleClearHistory}
                title={isHindi ? 'बातचीत साफ करें' : 'Reset Chat'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  backgroundColor: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #fecaca',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <Trash2 style={{ width: '11px', height: '11px' }} />
                <span>{isHindi ? 'चैट रीसेट' : 'Clear Chat'}</span>
              </button>
            </div>

            {/* Current Engine Status */}
            <div
              style={{
                padding: '0.55rem 0.75rem',
                borderRadius: '10px',
                backgroundColor: hasGeminiKey ? '#ecfdf5' : '#f0fdf4',
                border: `1px solid ${hasGeminiKey ? '#a7f3d0' : '#bbf7d0'}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}
            >
              {hasGeminiKey ? (
                <Zap style={{ width: '18px', height: '18px', color: '#059669', flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <Sprout style={{ width: '18px', height: '18px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
              )}
              <div style={{ lineHeight: 1.4 }}>
                <div style={{ fontWeight: 700, color: hasGeminiKey ? '#065f46' : '#166534' }}>
                  {hasGeminiKey
                    ? (isHindi ? '⚡ Google Gemini AI सक्रिय है' : '⚡ Google Gemini AI Active')
                    : (isHindi ? '🌾 अंतर्निहित कृषि ज्ञान इंजन सक्रिय है' : '🌾 Built-in Agricultural Brain Active')}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#475569' }}>
                  {hasGeminiKey
                    ? (isHindi ? 'सभी सवालों के विस्तृत, लाइव AI उत्तर प्राप्त हो रहे हैं।' : 'Answering with live generative intelligence for all farming questions.')
                    : (isHindi ? '100+ फसलों, रोगों, खादों और योजनाओं के सटीक ऑफलाइन उत्तर तैयार हैं। (वैकल्पिक रूप से नीचे Gemini API Key जोड़ सकते हैं)' : '100+ crop topics, disease remedies, fertilizer & schemes covered out of the box.')}
                </div>
              </div>
            </div>

            {/* Gemini API Key input */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <label style={{ fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Key style={{ width: '13px', height: '13px', color: '#64748b' }} />
                  <span>Google Gemini API Key (Optional)</span>
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.7rem',
                    color: '#2563eb',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontWeight: 600,
                  }}
                >
                  <span>{isHindi ? 'फ्री की (Key) लें' : 'Get Free Key'}</span>
                  <ExternalLink style={{ width: '10px', height: '10px' }} />
                </a>
              </div>
              <input
                type="password"
                value={geminiKeyInput}
                onChange={(e) => setGeminiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  width: '100%',
                  padding: '0.45rem 0.65rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Save Buttons & Feedback */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                {settingsFeedback}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setShowSettings(false)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {isHindi ? 'रद्द करें' : 'Close'}
                </button>
                <button
                  onClick={handleSaveSettings}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Check style={{ width: '13px', height: '13px' }} />
                  <span>{isHindi ? 'सेव करें' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

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
                <span>
                  {hasGeminiKey
                    ? (isHindi ? 'भूमि AI (Gemini) उत्तर सोच रही है...' : 'Bhoomi AI (Gemini) is thinking...')
                    : (isHindi ? 'भूमि AI कृषि उत्तर तैयार कर रही है...' : 'Bhoomi AI is analyzing advice...')}
                </span>
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
                    ? 'माइक दबाय’र बोलो या अठै लिखो...'
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
    </>
  );
};

export default BhoomiAIChat;
