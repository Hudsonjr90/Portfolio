import { useState } from 'react';

export const useAudio = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const savedSoundEnabled = localStorage.getItem("soundEnabled");
    return savedSoundEnabled ? JSON.parse(savedSoundEnabled) : true;
  });

  const handleAudio = () => {
    if (!soundEnabled) return;

    const audio = new Audio('/sounds/button_click.mp3');
    audio.play();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem("soundEnabled", JSON.stringify(!soundEnabled));
  };

  return {
    handleAudio,
    toggleSound,
    soundEnabled,
    setSoundEnabled,
  };
};