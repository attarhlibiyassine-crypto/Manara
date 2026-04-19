import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useTranslation } from '../hooks/useTranslation';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('newSession')}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-navy-900 dark:text-white leading-tight">
                {t('heroTitle1')} <span className="text-primary">{t('heroTitle2')}</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg">
                {t('heroDesc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="px-8 py-4 bg-primary text-navy-900 font-bold rounded-xl shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all">
                  {t('startFree')}
                </Link>
                <Link to="/dashboard" className="px-8 py-4 border-2 border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all">
                  {t('seeCourses')}
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all"></div>
              <div className="relative bg-navy-900 rounded-2xl aspect-video shadow-2xl overflow-hidden border border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 to-transparent opacity-60"></div>
                <img 
                  className="w-full h-full object-cover" 
                  alt="Developer coding" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpV06o8HXc0FY3XToSEcKnoZuS5XcRa6EpNYMWyknsp90ZjY3BqbZkR6yat8dYrSMqpFdd4mMhCfk_pbXByEPEYoQ1FApc2u_zn9be7RqyN89y7SoFYkLDK5MV8rLjHpaOuOnV1lN7ik9ozypkDDkmH43ciyHb8J5a5vNccrjXxDS_RMRZLkZ4p9GiZV0TeeqlNLEAt2ec8J7UV5CKvb38mioE7eFhwgjkd-Ac0edf96xWZ8VyWhnS0ZY1CC5bfduIXxUsNGZ3SQ"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-navy-900 text-4xl fill-1">play_arrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">{t('howItWorks')}</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-navy-900 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">person_add</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{t('step1Title')}</h3>
              <p className="text-slate-500 text-sm">{t('step1Desc')}</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-navy-900 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">quiz</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{t('step2Title')}</h3>
              <p className="text-slate-500 text-sm">{t('step2Desc')}</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-navy-900 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">smart_display</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{t('step3Title')}</h3>
              <p className="text-slate-500 text-sm">{t('step3Desc')}</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-navy-900 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{t('step4Title')}</h3>
              <p className="text-slate-500 text-sm">{t('step4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">{t('courseCategories')}</h2>
              <p className="text-slate-500">{t('courseCategoriesDesc')}</p>
            </div>
            <Link to="/placement-test" className="text-primary font-bold flex items-center gap-1 hover:underline">
              {t('viewAll')} <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">HTML/CSS</h4>
              <p className="text-xs text-slate-400 mt-1">24 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-yellow-400 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">JavaScript</h4>
              <p className="text-xs text-slate-400 mt-1">32 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-blue-400 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">React</h4>
              <p className="text-xs text-slate-400 mt-1">18 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Python</h4>
              <p className="text-xs text-slate-400 mt-1">45 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-indigo-400 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">PHP</h4>
              <p className="text-xs text-slate-400 mt-1">15 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-red-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Laravel</h4>
              <p className="text-xs text-slate-400 mt-1">22 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-cyan-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">MySQL</h4>
              <p className="text-xs text-slate-400 mt-1">12 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-green-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">MongoDB</h4>
              <p className="text-xs text-slate-400 mt-1">10 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-slate-900 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Algorithm</h4>
              <p className="text-xs text-slate-400 mt-1">20 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-orange-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Git</h4>
              <p className="text-xs text-slate-400 mt-1">8 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">DevOps</h4>
              <p className="text-xs text-slate-400 mt-1">16 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Agile</h4>
              <p className="text-xs text-slate-400 mt-1">14 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Jira</h4>
              <p className="text-xs text-slate-400 mt-1">6 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-indigo-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Gantt &amp; PERT</h4>
              <p className="text-xs text-slate-400 mt-1">5 modules</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-primary shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">Projet Synthèse</h4>
              <p className="text-xs text-slate-400 mt-1">Projet final</p>
            </Link>
            <Link to="/placement-test" className="bg-white dark:bg-slate-800 p-6 rounded-xl border-t-4 border-pink-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-left">
              <h4 className="font-bold">AI Skills</h4>
              <p className="text-xs text-slate-400 mt-1">New</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('whyManara')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t('whyManaraDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">psychology</span>
              <h3 className="text-xl font-bold mb-3">{t('feat1Title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feat1Desc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">movie</span>
              <h3 className="text-xl font-bold mb-3">{t('feat2Title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feat2Desc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">translate</span>
              <h3 className="text-xl font-bold mb-3">{t('feat3Title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feat3Desc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">forum</span>
              <h3 className="text-xl font-bold mb-3">{t('feat4Title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feat4Desc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">verified</span>
              <h3 className="text-xl font-bold mb-3">{t('feat5Title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feat5Desc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">admin_panel_settings</span>
              <h3 className="text-xl font-bold mb-3">{t('feat6Title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feat6Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 dark:text-white mb-16">{t('testimonialsTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex gap-1 text-primary mb-4">
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{t('test1Quote')}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Thomas" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuEjazUY-L7G2G1MKx2V2bo2MV0Tu9z1rF27z3GXPgekLAoIji9I_1M4xVjIjLjeRkFSL5Gm5rtJCjrlpF82WUoLSj1Ql8g7rvpunHPsPD2k1Uof3IXypHbekDkvP1CRCq9a69ypyStrG1bKOVin8TJZhlsIeWRTd8bImE3i7cGdTuqE6VvXyBAINgSK-zUvjygZzR30qDFO5UiByMbTGBA_JSqFmS9NgqrhoTlWeEIQj6k3PLJPcYxCPKUg-0hVKGyyv6GQv4MA"/>
                </div>
                <div>
                  <h5 className="font-bold text-navy-900 dark:text-white">Thomas L.</h5>
                  <p className="text-xs text-slate-400">Fullstack Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex gap-1 text-primary mb-4">
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{t('test2Quote')}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Sarah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFJfRwRLLU3F54i2Q6PPSWO0RjsI-Xb4Ju-d5m5Dy0uo41FXnWiYhvcfXQoLLJC89eFWo2fDzxyETp6NxOHFh38cs7nhrr1mQ61DVRFrcTrlBu-RQ1L8YKOtgNX2nAA1pe2-hO32dSXFXOiODJkaLyiNl9g2pfxJ2effNdwHhESmZLvwyRdDmUtN9pUIjxlIsUnQ-P8I1Yfkm_XCT--KAY_vhxArsvnlLtKVmxS4C6-mWK6Sgge5nOIKRYDbHKMbGxLeIRgSZfnA"/>
                </div>
                <div>
                  <h5 className="font-bold text-navy-900 dark:text-white">Sarah M.</h5>
                  <p className="text-xs text-slate-400">Frontend Engineer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex gap-1 text-primary mb-4">
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{t('test3Quote')}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Julien" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCC0dDhIncvdfOLsk2vE2Ou5iXr73n9tgh_-dNIrTAG0m2rGbUj9YRl2NUMn2DR1GBh3-OE3a9Eay7yqbqYXGv2az1fghvxiVGjJxhDn-U4jqdevx9GUIn_uqUF7UAa8wxlBOwKV5x9V4CdvlFd-reagwZXxJcLUWwtYvj3ZSFadnFJjdlCc7EOHV1hXqiTKD_aIBHe_xlG_MlfTGP4iFVd4N1ZUOUvobdUq6LE6hUDY9Ad2ki7OtNMIFOZVawyic_W1ry78oSJg"/>
                </div>
                <div>
                  <h5 className="font-bold text-navy-900 dark:text-white">Julien D.</h5>
                  <p className="text-xs text-slate-400">Backend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] p-12 text-center text-navy-900 overflow-hidden relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <h2 className="text-4xl font-black mb-6 relative z-10">{t('ctaTitle1')}<br/>{t('ctaTitle2')}</h2>
          <p className="text-navy-900/80 mb-8 max-w-lg mx-auto font-medium relative z-10">{t('ctaDesc')}</p>
          <Link to="/register" className="bg-navy-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-navy-800 transition-colors relative z-10 shadow-xl inline-block">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
