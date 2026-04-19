import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
              <span className="text-xl font-bold tracking-tight">Manara</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t('footerDesc')}
            </p>
          </div>
          <div>
            <h6 className="font-bold mb-6">{t('footerPlatform')}</h6>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="/dashboard">{t('navCourses')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/dashboard">{t('navCertifications')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/pricing">{t('navPricing')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="#">{t('navEnterprise')}</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6">{t('footerCommunity')}</h6>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="/forum">{t('navForum')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="#">{t('navBlog')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="#">{t('navEvents')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="#">{t('navMentors')}</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6">{t('footerContact')}</h6>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="#">{t('navHelp')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="#">{t('navContactUs')}</Link></li>
              <li className="flex gap-4 pt-4">
                <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-navy-900 transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">share</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-navy-900 transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">public</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-navy-900 transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">group</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 Manara Academy. {t('footerRights')}</p>
          <div className="flex gap-6">
            <Link className="hover:text-primary" to="#">{t('footerTerms')}</Link>
            <Link className="hover:text-primary" to="#">{t('footerPrivacy')}</Link>
            <Link className="hover:text-primary" to="#">{t('footerCookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
