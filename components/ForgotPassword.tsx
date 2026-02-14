
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthView } from '../types';
import AuthCard from './AuthCard';

interface ForgotPasswordProps {
  onViewChange: (view: AuthView) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onViewChange }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#update_password`,
      });

      if (error) {
        if (error.message.toLowerCase().includes('rate limit')) {
          setMessage({ 
            type: 'error', 
            text: 'Email rate limit exceeded. Please wait before requesting another link or check your Supabase dashboard settings.' 
          });
        } else {
          setMessage({ type: 'error', text: error.message });
        }
      } else {
        setMessage({ type: 'success', text: 'Password reset link sent! Check your email.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password" subtitle="Enter your email to receive a recovery link">
      <form onSubmit={handleReset} className="space-y-4">
        {message && (
          <div className={`p-3 rounded-lg text-sm font-medium border ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
          }`}>
            {message.text}
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
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
        >
          {loading ? 'Sending link...' : 'Send Recovery Link'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-slate-500">
        Remember your password?{' '}
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

export default ForgotPassword;
