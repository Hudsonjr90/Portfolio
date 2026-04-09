import { useState } from 'react';

export const useAudio = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("soundEnabled");
    return saved ? JSON.parse(saved) : false;
  });

  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem("audioVolume");
    return saved ? Number(saved) : 80;
  });

  const handleAudio = () => {
    if (!soundEnabled || volume === 0) return;
    const audio = new Audio('/sounds/button_click.mp3');
    audio.volume = volume / 100;
    audio.play();
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    localStorage.setItem("audioVolume", String(newVolume));
    if (newVolume === 0) {
      setSoundEnabled(false);
      localStorage.setItem("soundEnabled", "false");
    } else if (!soundEnabled) {
      setSoundEnabled(true);
      localStorage.setItem("soundEnabled", "true");
    }
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem("soundEnabled", JSON.stringify(newState));
    if (newState && volume === 0) {
      setVolumeState(80);
      localStorage.setItem("audioVolume", "80");
    }
  };

  return {
    handleAudio,
    toggleSound,
    soundEnabled,
    setSoundEnabled,
    volume,
    setVolume,
  };
};
