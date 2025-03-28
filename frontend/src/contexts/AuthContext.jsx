import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { 
  signUp, 
  signIn, 
  signInWithGoogle, 
  signOut, 
  getSession,
  getUser
} from '../lib/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        setError(err.message);
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setUser(session?.user ?? null);
        
        // Handle specific auth events if needed
        switch (event) {
          case 'SIGNED_IN':
            console.log('User signed in');
            break;
          case 'SIGNED_OUT':
            console.log('User signed out');
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed');
            break;
          case 'USER_UPDATED':
            console.log('User updated');
            break;
          default:
            break;
        }
      } catch (err) {
        setError(err.message);
        console.error('Auth state change error:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Enhanced auth functions with error handling
  const handleSignUp = async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signUp(email, password, name);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn(email, password);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    error,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleGoogleSignIn,
    signOut: handleSignOut,
    getUser: async () => {
      try {
        const { data: { user } } = await getUser();
        return user;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div className="loading-indicator">Loading...</div>}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}