import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, loading, error, clearError } = useAuth();

  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors,  setFieldErrors]  = useState({});

  // Clear global auth error when user starts typing
  useEffect(() => { clearError(); }, [email, password]);

  const validate = () => {
    const errs = {};
    if (!email)    errs.email    = 'Email requis';
    if (!password) errs.password = 'Mot de passe requis';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      // navigation is handled inside login()
    } catch {
      // error is displayed via context
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="size-12 bg-[#F59E0B] rounded-xl flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-slate-900 text-2xl font-bold">school</span>
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white">
          Bienvenue sur Manara
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Connectez-vous pour accéder à vos cours
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1E293B] py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-700">

          {/* Global API error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={`appearance-none block w-full px-3 py-2.5 border rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] sm:text-sm bg-slate-800 text-white transition-colors ${
                  fieldErrors.email ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="votre@email.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2.5 border rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] sm:text-sm bg-slate-800 text-white pr-20 transition-colors ${
                    fieldErrors.password ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Cacher' : 'Afficher'}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-[#F59E0B] hover:text-amber-400 transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-[#F59E0B] hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                  Connexion…
                </>
              ) : (
                'Se Connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/register" className="text-sm font-medium text-[#F59E0B] hover:text-amber-400 transition-colors">
              Pas encore de compte ? Commencer gratuitement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
