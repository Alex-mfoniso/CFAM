import { supabase } from '../supabase';

export const signUp = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name
      }
    }
  });
  
  if (error) throw error;
  return data;
};
export const signIn = async (email, password) => {
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password.trim()
      });
  
      if (error) {
        console.error('Auth Error Details:', {
          status: error.status,
          message: error.message,
          details: error
        });
        throw new Error(error.message || 'Login failed');
      }
  
      return data;
    } catch (error) {
      console.error('SignIn Process Error:', error);
      throw error;
    }
  };

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const getUser = () => {
  return supabase.auth.getUser();
};