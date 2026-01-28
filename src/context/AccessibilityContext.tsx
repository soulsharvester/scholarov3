import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  isMonochrome: boolean;
  setIsMonochrome: React.Dispatch<React.SetStateAction<boolean>>;
  isDyslexicFont: boolean;
  setIsDyslexicFont: React.Dispatch<React.SetStateAction<boolean>>;
  resetSettings: () => void;
}

const defaultSettings = {
  fontSize: 16,
  isMonochrome: false,
  isDyslexicFont: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('accessibility_fontSize');
    return saved ? parseInt(saved, 10) : defaultSettings.fontSize;
  });

  const [isMonochrome, setIsMonochrome] = useState(() => {
    const saved = localStorage.getItem('accessibility_isMonochrome');
    return saved ? saved === 'true' : defaultSettings.isMonochrome;
  });

  const [isDyslexicFont, setIsDyslexicFont] = useState(() => {
    const saved = localStorage.getItem('accessibility_isDyslexicFont');
    return saved ? saved === 'true' : defaultSettings.isDyslexicFont;
  });

  useEffect(() => {
    localStorage.setItem('accessibility_fontSize', fontSize.toString());
    localStorage.setItem('accessibility_isMonochrome', isMonochrome.toString());
    localStorage.setItem('accessibility_isDyslexicFont', isDyslexicFont.toString());

    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.style.filter = isMonochrome ? 'grayscale(100%)' : 'none';
    document.body.style.fontFamily = isDyslexicFont ? 'OpenDyslexic, sans-serif' : 'inherit';
  }, [fontSize, isMonochrome, isDyslexicFont]);

  const resetSettings = () => {
    setFontSize(defaultSettings.fontSize);
    setIsMonochrome(defaultSettings.isMonochrome);
    setIsDyslexicFont(defaultSettings.isDyslexicFont);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        isMonochrome,
        setIsMonochrome,
        isDyslexicFont,
        setIsDyslexicFont,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}