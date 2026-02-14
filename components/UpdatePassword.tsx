
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthView } from '../types';
import AuthCard from './AuthCard';

interface UpdatePasswordProps {
  onViewChange: (view: AuthView) => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ onViewChange }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Password updated successfully, redirect to dashboard or login
      window.location.hash = ''; // Clear hash
      onViewChange('sign_in');
    }
    setLoading(false);
  };

  return (
    <AuthCard title="Update Password" subtitle="Choose a strong new password for your account">
      <form onSubmit={handleUpdate} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
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
          {loading ? 'Updating...' : 'Set New Password'}
        </button>
      </form>
    </AuthCard>
  );
};

export default UpdatePassword;
