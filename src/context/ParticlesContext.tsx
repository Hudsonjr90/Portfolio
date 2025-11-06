import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ParticlesContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

const ParticlesContext = createContext<ParticlesContextType | undefined>(undefined);

export const useParticles = () => {
  const context = useContext(ParticlesContext);
  if (!context) {
    throw new Error('useParticles must be used within a ParticlesProvider');
  }
  return context;
};

interface ParticlesProviderProps {
  children: ReactNode;
}

export const ParticlesProvider: React.FC<ParticlesProviderProps> = ({ children }) => {
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('particlesEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleParticles = () => {
    const newState = !particlesEnabled;
    setParticlesEnabled(newState);
    localStorage.setItem('particlesEnabled', JSON.stringify(newState));
  };

  return (
    <ParticlesContext.Provider value={{ particlesEnabled, toggleParticles }}>
      {children}
    </ParticlesContext.Provider>
  );
};