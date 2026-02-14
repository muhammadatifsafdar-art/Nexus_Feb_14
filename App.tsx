
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthView, UserProfile } from './types';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<AuthView>('sign_in');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      
      // If we are handling a password recovery link, the URL will have a hash
      // Supabase automatically handles the session setting from the hash.
      if (_event === 'PASSWORD_RECOVERY') {
        setView('update_password');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (user && view !== 'update_password') {
    return <Dashboard user={user} />;
  }

  const renderAuthView = () => {
    switch (view) {
      case 'sign_up':
        return <SignUp onViewChange={setView} />;
      case 'forgot_password':
        return <ForgotPassword onViewChange={setView} />;
      case 'update_password':
        return <UpdatePassword onViewChange={setView} />;
      default:
        return <SignIn onViewChange={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">NEXUS</h1>
          <p className="text-slate-500 mt-2 font-medium">Enterprise Identity Management</p>
        </div>
        {renderAuthView()}
      </div>
    </div>
  );
};

export default App;
