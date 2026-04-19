import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t, language, toggleLanguage } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">lightbulb</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white">Manara</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/">{t('navHome')}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to={isAuthenticated ? '/dashboard' : '/login'}>{t('navCourses')}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to={isAuthenticated ? '/forum' : '/login'}>{t('navForum')}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/pricing">{t('navPricing')}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xl">language</span>
              <span className="text-xs font-bold">{language === 'fr' ? 'FR' : 'EN'}</span>
            </button>
            <Link to="/login" className="hidden sm:block px-5 py-2 text-sm font-bold border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              {t('login')}
            </Link>
            <Link to="/register" className="px-5 py-2 text-sm font-bold bg-primary text-navy-900 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
              {t('getStarted')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
