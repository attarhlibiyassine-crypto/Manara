import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login('/placement-test');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Créer votre compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1E293B] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Nom complet
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#F59E0B] focus:border-[#F59E0B] sm:text-sm bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#F59E0B] focus:border-[#F59E0B] sm:text-sm bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#F59E0B] focus:border-[#F59E0B] sm:text-sm bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Confirmer le mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#F59E0B] focus:border-[#F59E0B] sm:text-sm bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-900 bg-[#F59E0B] hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition-colors"
              >
                Créer mon compte
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="flex justify-center text-sm">
                <Link to="/login" className="font-medium text-[#F59E0B] hover:text-amber-400">
                  Déjà un compte? Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
