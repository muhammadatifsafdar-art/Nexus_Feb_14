
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthView } from '../types';
import AuthCard from './AuthCard';

interface SignUpProps {
  onViewChange: (view: AuthView) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onViewChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) {
        if (signUpError.message.toLowerCase().includes('rate limit')) {
          setError('Email rate limit exceeded. Please wait a few minutes or increase the limit in your Supabase Dashboard (Authentication > Providers > Email).');
        } else {
          setError(signUpError.message);
        }
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthCard title="Verify your email">
        <div className="text-center py-6">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-slate-600 mb-6">
            We've sent a verification link to <span className="font-bold text-slate-800">{email}</span>. Please check your inbox.
          </p>
          <button
            onClick={() => onViewChange('sign_in')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Back to login
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create account" subtitle="Join thousands of teams on Nexus">
      <form onSubmit={handleSignUp} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
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
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="Minimum 6 characters"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Get Started'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button
          onClick={() => onViewChange('sign_in')}
          className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Sign in
        </button>
      </div>
    </AuthCard>
  );
};

export default SignUp;
