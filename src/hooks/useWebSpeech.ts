import { useState, useRef, useEffect } from 'react';

export const useWebSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    const synth = typeof window !== 'undefined' && window.speechSynthesis;
    synthesisRef.current = synth || null;
    setIsSupported(!!synth);
  }, []);

  const speak = (text: string) => {
    if (!synthesisRef.current || !text.trim()) return;

    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesisRef.current.speak(utterance);
  };

  const stop = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const speakSelectedText = () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      speak(selectedText);
    }
  };

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    speakSelectedText,
  };
};
