import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserContext';
import { useTranslation } from '../hooks/useTranslation';

const ProgressTracking = () => {
    const { userLevel } = useContext(UserContext);
    const { t } = useTranslation();

    return (
        <Layout>
            <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8 min-h-screen">
                {/* Student Profile Summary */}
                <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="relative">
                            <div className="size-32 rounded-full border-4 border-primary/10 overflow-hidden bg-slate-100 flex items-center justify-center">
                                {/* Fallback since we don't have auth yet */}
                                <span className="material-symbols-outlined text-6xl text-slate-300">person</span>
                            </div>
                            <span className="absolute bottom-1 right-1 size-5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full"></span>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                                <h1 className="text-2xl font-bold text-navy-900 dark:text-slate-100">Student Profile</h1>
                                {userLevel && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-navy-900 dark:text-primary uppercase">
                                        {userLevel} Level
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 mb-4">student@manara.edu</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-6">
                                <div className="flex flex-col">
                                    <span className="text-slate-400 font-medium">Plan</span>
                                    <span className="text-navy-900 dark:text-slate-200 font-semibold uppercase">Free Basic</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 font-medium">Joined</span>
                                    <span className="text-navy-900 dark:text-slate-200 font-semibold">Today</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 font-medium">Last Active</span>
                                    <span className="text-navy-900 dark:text-slate-200 font-semibold">Just now</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-navy-900 font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md">Edit Profile</button>
                        </div>
                    </div>
                </section>

                {/* Stat Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary text-3xl mb-2">menu_book</span>
                        <p className="text-slate-500 text-sm font-medium">Enrolled Courses</p>
                        <p className="text-3xl font-bold text-navy-900 dark:text-slate-100">0</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary text-3xl mb-2">task_alt</span>
                        <p className="text-slate-500 text-sm font-medium">Completed Courses</p>
                        <p className="text-3xl font-bold text-navy-900 dark:text-slate-100">0</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary text-3xl mb-2">workspace_premium</span>
                        <p className="text-slate-500 text-sm font-medium">Certificates Earned</p>
                        <p className="text-3xl font-bold text-navy-900 dark:text-slate-100">0</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary text-3xl mb-2">forum</span>
                        <p className="text-slate-500 text-sm font-medium">Forum Posts</p>
                        <p className="text-3xl font-bold text-navy-900 dark:text-slate-100">0</p>
                    </div>
                </section>

                {/* Empty State Progress Table (Demo behavior) */}
                <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[300px] flex flex-col items-center justify-center p-8 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">analytics</span>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-slate-100 mb-2">No Course Progress Yet</h3>
                    <p className="text-slate-500 mb-6 max-w-sm">You haven't started any courses yet. Take the placement test or browse the catalog to begin learning.</p>
                    <div className="flex gap-4">
                        <Link to="/placement-test" className="px-6 py-2 bg-primary text-navy-900 font-bold rounded-lg hover:bg-amber-500 transition-colors">
                            {t('beginTest')}
                        </Link>
                        <Link to="/dashboard" className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            Browse Courses
                        </Link>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default ProgressTracking;
