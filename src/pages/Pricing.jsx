import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <main className="mx-auto max-w-4xl px-6 py-16 lg:px-20 min-h-screen">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-black text-navy-900 lg:text-5xl dark:text-slate-100 mb-4">
                        Tarification Simple et Transparente
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">
                        Commencez gratuitement. Passez à la version payante quand vous êtes prêt.
                    </p>
                </div>

                {/* Pricing Cards Grid — 2 plans */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    {/* Free Plan */}
                    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-8 dark:bg-background-dark dark:border-slate-800 transition-transform hover:scale-[1.02]">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-navy-900 dark:text-slate-100">Free</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-navy-900 dark:text-slate-100">0€</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Parfait pour débuter</p>
                        </div>
                        <Link
                            to="/placement-test"
                            className="mb-8 w-full rounded-lg border-2 border-navy-900 px-4 py-3 text-sm font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition-colors dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-navy-900 text-center block"
                            style={{ textDecoration: 'none' }}
                        >
                            Commencer Gratuitement
                        </Link>
                        <ul className="flex-1 space-y-4">
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Test de placement
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Cours pour débutants
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Forum communautaire
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-400 dark:text-slate-500 line-through">
                                <span className="material-symbols-outlined text-[20px]">cancel</span>
                                Téléchargement de documents
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-400 dark:text-slate-500 line-through">
                                <span className="material-symbols-outlined text-[20px]">cancel</span>
                                Certificat LinkedIn
                            </li>
                        </ul>
                    </div>

                    {/* Premium Plan (Highlighted) */}
                    <div className="relative flex flex-col rounded-xl border-2 border-primary bg-white p-8 shadow-2xl shadow-primary/10 dark:bg-background-dark transition-transform hover:scale-[1.02]">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
                            Le Plus Populaire
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-navy-900 dark:text-slate-100">Premium</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-navy-900 dark:text-slate-100">100</span>
                                <span className="text-xl font-black text-navy-900 dark:text-slate-100">MAD</span>
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">/mois</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Accélérez votre apprentissage</p>
                        </div>
                        <button className="mb-8 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-navy-900 shadow-lg shadow-primary/30 hover:bg-amber-500 transition-all">
                            Passer Premium
                        </button>
                        <ul className="flex-1 space-y-4">
                            <li className="flex items-center gap-3 text-sm font-bold text-primary">
                                <span className="material-symbols-outlined text-[20px]">stars</span>
                                Tout ce qui est dans Free
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Accès à tous les niveaux
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                16 catégories de contenu
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Téléchargement de documents
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Certificat LinkedIn
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Suivi avancé
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Session de mentorat
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Pricing;