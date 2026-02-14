
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthView } from '../types';
import AuthCard from './AuthCard';

interface SignInProps {
  onViewChange: (view: AuthView) => void;
}

const SignIn: React.FC<SignInProps> = ({ onViewChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your Nexus account">
      <form onSubmit={handleSignIn} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <button
              type="button"
              onClick={() => onViewChange('forgot_password')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Forgot Password?
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button
          onClick={() => onViewChange('sign_up')}
          className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Create account
        </button>
      </div>
    </AuthCard>
  );
};

export default SignIn;
