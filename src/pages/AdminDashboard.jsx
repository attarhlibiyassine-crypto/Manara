import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    // Note: Admin dashboard is strictly English as requested.
    return (
        <div className="flex min-h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-navy-900 text-white flex flex-col shrink-0">
                <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
                    <Link to="/" className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-navy-900 font-bold">lightbulb</span>
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">Manara Admin</h1>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Overview</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-sm font-medium">Students</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">book_4</span>
                        <span className="text-sm font-medium">Courses</span>
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="size-8 rounded-full bg-slate-500 overflow-hidden flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <div className="overflow-hidden text-left">
                            <p className="text-xs font-semibold truncate">Admin User</p>
                            <p className="text-[10px] text-slate-400">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
                    <h2 className="text-lg font-bold">Dashboard Overview</h2>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-primary transition-colors">notifications</span>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Welcome, Admin</span>
                            <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">Total Students</span>
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">group</span>
                            </div>
                            <p className="text-3xl font-bold">12,840</p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+12.5%</span>
                                <span className="text-slate-400 font-normal">vs last month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">Active Premium</span>
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">star</span>
                            </div>
                            <p className="text-3xl font-bold">4,250</p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+5.2%</span>
                                <span className="text-slate-400 font-normal">vs last month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">Monthly Revenue</span>
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">euro</span>
                            </div>
                            <p className="text-3xl font-bold">€84,200</p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+18.1%</span>
                                <span className="text-slate-400 font-normal">vs last month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">New Registrations</span>
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">person_add</span>
                            </div>
                            <p className="text-3xl font-bold">142</p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+7.4%</span>
                                <span className="text-slate-400 font-normal">today</span>
                            </div>
                        </div>
                    </div>

                    {/* Students Table */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Student Management</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Level</th>
                                        <th className="px-6 py-4">Plan</th>
                                        <th className="px-6 py-4">Join Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold">Sarah Jenkins</p>
                                                <p className="text-xs text-slate-400">sarah.j@gmail.com</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold">Beginner</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-primary/10 text-amber-700 rounded text-[10px] font-bold">Premium</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">Oct 12, 2023</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">block</span></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold">Marc Dubois</p>
                                                <p className="text-xs text-slate-400">m.dubois@manara.edu</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">Advanced</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold">Free</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">Nov 05, 2023</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">block</span></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
