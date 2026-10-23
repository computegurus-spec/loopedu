'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DemoPersona, DEMO_PERSONAS, DEFAULT_DEMO_PERSONA, UserRole } from './personas';

interface DemoContextType {
  isDemo: boolean;
  isDemoMode: boolean;
  activePersona: DemoPersona;
  currentPersona: DemoPersona;
  setPersonaById: (id: string) => void;
  toggleAppMode: () => void;
  resetDemoData: () => void;
}

const DemoContext = createContext<DemoContextType>({
  isDemo: true,
  isDemoMode: true,
  activePersona: DEFAULT_DEMO_PERSONA,
  currentPersona: DEFAULT_DEMO_PERSONA,
  setPersonaById: () => {},
  toggleAppMode: () => {},
  resetDemoData: () => {},
});

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemo, setIsDemo] = useState<boolean>(true);
  const [activePersona, setActivePersona] = useState<DemoPersona>(DEFAULT_DEMO_PERSONA);

  useEffect(() => {
    // Read persisted persona or mode from localStorage
    const savedMode = localStorage.getItem('loopedu_app_mode');
    if (savedMode === 'live') {
      setIsDemo(false);
    } else {
      setIsDemo(true);
    }

    const savedPersonaKey = localStorage.getItem('loopedu_demo_persona');
    if (savedPersonaKey && DEMO_PERSONAS[savedPersonaKey]) {
      setActivePersona(DEMO_PERSONAS[savedPersonaKey]);
    }
  }, []);

  const setPersonaById = (key: string) => {
    if (DEMO_PERSONAS[key]) {
      setActivePersona(DEMO_PERSONAS[key]);
      localStorage.setItem('loopedu_demo_persona', key);
    }
  };

  const toggleAppMode = () => {
    const nextMode = isDemo ? 'live' : 'demo';
    setIsDemo(!isDemo);
    localStorage.setItem('loopedu_app_mode', nextMode);
  };

  const resetDemoData = () => {
    localStorage.removeItem('loopedu_demo_persona');
    localStorage.removeItem('loopedu_student_paths');
    localStorage.removeItem('loopedu_mistake_notebook');
    localStorage.removeItem('loopedu_coach_reflections');
    localStorage.removeItem('loopedu_newsletter_prefs');
    setActivePersona(DEFAULT_DEMO_PERSONA);
    window.location.reload();
  };

  return (
    <DemoContext.Provider
      value={{
        isDemo,
        isDemoMode: isDemo,
        activePersona,
        currentPersona: activePersona,
        setPersonaById,
        toggleAppMode,
        resetDemoData,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
