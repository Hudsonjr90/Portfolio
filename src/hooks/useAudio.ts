import { useState } from 'react';

export const useAudio = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleAudio = () => {
    if (!soundEnabled) return;

    const audio = new Audio('/sounds/button_click.mp3');
    audio.play();
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return { handleAudio, toggleSound, soundEnabled };
};
