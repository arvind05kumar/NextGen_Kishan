// Speech Recognition and Text-To-Speech (Web Speech API + ElevenLabs Support)

export const DEFAULT_ELEVENLABS_VOICE_ID = 'ag3I9T3TmwdB4HocPu9E';

// Clean markdown syntax for clean, natural speech output
export const cleanTextForSpeech = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold asterisks
    .replace(/\*(.*?)\*/g, '$1')     // remove italic asterisks
    .replace(/#+\s/g, '')            // remove headings
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove links
    .replace(/[🌾🧪💰🐄🐛🌱🩺🚛🤝🙏🎙️🔊🟢🔴]/g, '') // remove emojis
    .replace(/[-•]\s+/g, ', ')       // replace bullet points with natural pauses
    .replace(/\n+/g, '. ')           // replace line breaks with pauses
    .trim();
};

// Web Speech Synthesis (Browser Native Female Voice TTS)
export const speakWithBrowser = (
  text: string,
  language: string,
  onStart?: () => void,
  onEnd?: () => void
): SpeechSynthesisUtterance | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return null;
  }

  // Stop any active speech
  window.speechSynthesis.cancel();

  const cleanText = cleanTextForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Configure language and warm female tone
  const isHindi = language === 'hindi' || language === 'regional';
  utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95;  // Clear, calm, friendly pace
  utterance.pitch = 1.2;  // Female pitch (feminine, warm & clear)

  // Prioritize Indian female voices
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    if (isHindi) {
      // Find female Hindi voice: Google हिन्दी, Swara, Kalpana, Lekha, etc.
      const hindiFemale = voices.find(
        (v) =>
          (v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi')) &&
          (v.name.toLowerCase().includes('female') ||
           v.name.toLowerCase().includes('swara') ||
           v.name.toLowerCase().includes('kalpana') ||
           v.name.toLowerCase().includes('lekha') ||
           v.name.toLowerCase().includes('google') ||
           !v.name.toLowerCase().includes('male'))
      );
      if (hindiFemale) {
        utterance.voice = hindiFemale;
      } else {
        const anyHindi = voices.find((v) => v.lang.startsWith('hi'));
        if (anyHindi) utterance.voice = anyHindi;
      }
    } else {
      // Find female Indian/English voice: Neerja, Heera, Samantha, Victoria, Google, etc.
      const enFemale = voices.find(
        (v) =>
          (v.lang.includes('en-IN') || v.lang.startsWith('en')) &&
          (v.name.toLowerCase().includes('female') ||
           v.name.toLowerCase().includes('neerja') ||
           v.name.toLowerCase().includes('heera') ||
           v.name.toLowerCase().includes('samantha') ||
           v.name.toLowerCase().includes('victoria') ||
           v.name.toLowerCase().includes('karen') ||
           v.name.toLowerCase().includes('zira') ||
           v.name.toLowerCase().includes('google') ||
           !v.name.toLowerCase().includes('male'))
      );
      if (enFemale) {
        utterance.voice = enFemale;
      } else {
        const anyEn = voices.find((v) => v.lang === 'en-IN' || v.lang.startsWith('en'));
        if (anyEn) utterance.voice = anyEn;
      }
    }
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
};

// Stop all browser speech
export const stopBrowserSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// ElevenLabs TTS using user's voice ID
export const speakWithElevenLabs = async (
  text: string,
  apiKey: string,
  voiceId: string = DEFAULT_ELEVENLABS_VOICE_ID
): Promise<HTMLAudioElement> => {
  const cleanText = cleanTextForSpeech(text);

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text: cleanText,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.8,
        style: 0.15,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs TTS failed: ${response.status} ${response.statusText}`);
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  return audio;
};

// Web Speech Recognition
export const createSpeechRecognition = (
  language: string,
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void
) => {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  const isHindi = language === 'hindi' || language === 'regional';
  recognition.lang = isHindi ? 'hi-IN' : 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (event: any) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    const currentText = final || interim;
    onResult(currentText, Boolean(final));
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error:', event.error);
    onError(event.error);
  };

  recognition.onend = onEnd;

  return recognition;
};
