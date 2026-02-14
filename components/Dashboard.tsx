
import React from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-xl">NEXUS</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              {user.email?.split('@')[0]}
            </p>
            <p className="text-xs text-slate-500 leading-none mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 sm:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Welcome to your secure identity workspace.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-2">Auth Status</h3>
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xl font-bold text-slate-800">Secure & Verified</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Authenticated via Supabase JWT</p>
          </div>

          {/* User ID Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
            <h3 className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-2">Internal UUID</h3>
            <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm text-indigo-600 break-all select-all cursor-pointer">
              {user.id}
            </div>
            <p className="text-sm text-slate-500 mt-2">Your unique system identifier</p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Security History</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">New Session Started</td>
                  <td className="px-6 py-4 text-sm text-slate-500">Chrome / macOS</td>
                  <td className="px-6 py-4 text-sm text-slate-500 text-right">Just now</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">Profile Initialized</td>
                  <td className="px-6 py-4 text-sm text-slate-500">System Trace</td>
                  <td className="px-6 py-4 text-sm text-slate-500 text-right">2 mins ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
      <footer className="max-w-7xl mx-auto p-10 mt-10 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm">Nexus Auth Suite &copy; 2024. Powered by Supabase Auth.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
