import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <main className="mx-auto max-w-7xl px-6 py-16 lg:px-20 min-h-screen">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-black text-navy-900 lg:text-5xl dark:text-slate-100 mb-4">Simple Transparent Pricing</h1>
                    <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">Start free. Upgrade when you're ready.</p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    
                    {/* Free Plan */}
                    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-8 dark:bg-background-dark dark:border-slate-800 transition-transform hover:scale-[1.02]">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-navy-900 dark:text-slate-100">Free</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-navy-900 dark:text-slate-100">0€</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Perfect to get started</p>
                        </div>
                        <Link to="/placement-test" className="mb-8 w-full rounded-lg border-2 border-navy-900 px-4 py-3 text-sm font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition-colors dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-navy-900 text-center block" style={{ textDecoration: 'none'}}>
                            Get Started Free
                        </Link>
                        <ul className="flex-1 space-y-4">
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Placement test
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Beginner courses
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Community forum
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-400 dark:text-slate-500 line-through">
                                <span className="material-symbols-outlined text-[20px]">cancel</span>
                                No certificate
                            </li>
                        </ul>
                    </div>

                    {/* Premium Plan (Highlighted) */}
                    <div className="relative flex flex-col rounded-xl border-2 border-primary bg-white p-8 shadow-2xl shadow-primary/10 dark:bg-background-dark transition-transform hover:scale-[1.02]">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy-900 font-bold">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-navy-900 dark:text-slate-100">Premium</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-navy-900 dark:text-slate-100">14.99€</span>
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">/mo</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Accelerate your learning</p>
                        </div>
                        <button className="mb-8 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-navy-900 shadow-lg shadow-primary/30 hover:bg-amber-500 transition-all">
                            Start Premium
                        </button>
                        <ul className="flex-1 space-y-4">
                            <li className="flex items-center gap-3 text-sm font-bold text-primary">
                                <span className="material-symbols-outlined text-[20px]">stars</span>
                                Everything in Free
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                All levels access
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                16 content categories
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                LinkedIn certificate
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Priority badge
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Advanced tracking
                            </li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-8 dark:bg-background-dark dark:border-slate-800 transition-transform hover:scale-[1.02]">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-navy-900 dark:text-slate-100">Pro</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-navy-900 dark:text-slate-100">29.99€</span>
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">/mo</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Mastery and mentorship</p>
                        </div>
                        <button className="mb-8 w-full rounded-lg border-2 border-navy-900 px-4 py-3 text-sm font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition-colors dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-navy-900">
                            Go Pro
                        </button>
                        <ul className="flex-1 space-y-4">
                            <li className="flex items-center gap-3 text-sm font-bold text-primary">
                                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                                Everything in Premium
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Projet de Synthèse
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Mentoring session
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Early access to features
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                LinkedIn recommendation
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-navy-900 dark:text-slate-100 mb-8 text-center">Compare Plans</h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:bg-background-dark dark:border-slate-800">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="p-6 text-sm font-bold text-slate-400 uppercase dark:text-slate-500">Feature</th>
                                    <th className="p-6 text-sm font-bold text-navy-900 dark:text-slate-100 text-center">Free</th>
                                    <th className="p-6 text-sm font-bold text-navy-900 dark:text-slate-100 text-center">Premium</th>
                                    <th className="p-6 text-sm font-bold text-navy-900 dark:text-slate-100 text-center">Pro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="p-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Placement Test</td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Course Access</td>
                                    <td className="p-6 text-center text-sm font-medium text-slate-500 dark:text-slate-400">Beginner</td>
                                    <td className="p-6 text-center text-sm font-medium text-slate-500 dark:text-slate-400">All Levels</td>
                                    <td className="p-6 text-center text-sm font-medium text-slate-500 dark:text-slate-400">All Levels</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Certificates</td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-slate-300 dark:text-slate-600">close</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Mentoring</td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-slate-300 dark:text-slate-600">close</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-slate-300 dark:text-slate-600">close</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Community Access</td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Early Access</td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-slate-300 dark:text-slate-600">close</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-slate-300 dark:text-slate-600">close</span></td>
                                    <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="mt-32 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-navy-900 dark:text-slate-100 mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:bg-background-dark dark:border-slate-800">
                            <button className="flex w-full items-center justify-between text-left font-bold text-navy-900 dark:text-slate-100">
                                <span>Is Manara really free?</span>
                                <span className="material-symbols-outlined text-primary">expand_more</span>
                            </button>
                            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                Yes! Our basic access includes a comprehensive placement test and full beginner courses. You can learn the fundamentals without spending a cent.
                            </div>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:bg-background-dark dark:border-slate-800">
                            <button className="flex w-full items-center justify-between text-left font-bold text-navy-900 dark:text-slate-100">
                                <span>What level will I start at?</span>
                                <span className="material-symbols-outlined text-primary">expand_more</span>
                            </button>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:bg-background-dark dark:border-slate-800">
                            <button className="flex w-full items-center justify-between text-left font-bold text-navy-900 dark:text-slate-100">
                                <span>Are the videos in French?</span>
                                <span className="material-symbols-outlined text-primary">expand_more</span>
                            </button>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:bg-background-dark dark:border-slate-800">
                            <button className="flex w-full items-center justify-between text-left font-bold text-navy-900 dark:text-slate-100">
                                <span>Can I download my certificate?</span>
                                <span className="material-symbols-outlined text-primary">expand_more</span>
                            </button>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:bg-background-dark dark:border-slate-800">
                            <button className="flex w-full items-center justify-between text-left font-bold text-navy-900 dark:text-slate-100">
                                <span>How do I cancel my subscription?</span>
                                <span className="material-symbols-outlined text-primary">expand_more</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Pricing;
