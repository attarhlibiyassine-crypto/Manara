import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations';

export const useTranslation = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return { t, language, toggleLanguage };
};
