import React, { createContext, useState, useEffect } from 'react';

// Default language is French
const defaultLanguage = 'fr';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Attempt to load from localStorage first
    const savedLanguage = localStorage.getItem('manara_language');
    return savedLanguage || defaultLanguage;
  });

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('manara_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
