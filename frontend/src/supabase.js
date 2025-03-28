// import { createClient } from '@supabase/supabase-js'
// import dotenv from "dotenv"


// dotenv.config()

// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)


// export default supabase

// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);


// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.SUPABASE_URL;
// const supabaseKey = import.meta.env.SUPABASE_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);


// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.SUPABASE_URL;
// const supabaseKey = import.meta.env.SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Supabase URL and Key are required.');
// }

// export const supabase = createClient(supabaseUrl, supabaseKey);


// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Supabase URL and Key are required in environment variables');
// }

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true
//   }
// });


// import { createClient } from '@supabase/supabase-js';

// // Use import.meta.env for Vite projects
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// // Debugging: Log the values to ensure they're loaded
// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase Key:', supabaseKey ? '*** loaded ***' : 'MISSING');

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error(`
//     Supabase URL and Key are required in environment variables.
//     Check that:
//     1. Your .env file exists in the project root
//     2. Variables are prefixed with VITE_
//     3. You've restarted your development server
//   `);
// }

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true
//   }
// });



import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;


// In supabase.js (temporary solution)
const supabaseUrl = "https://oavsykatyjvbpnbehybh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdnN5a2F0eWp2YnBuYmVoeWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDkxNzUsImV4cCI6MjA1ODI4NTE3NX0.99eVbMSEpWSA94KLiKOk-zkSR6_xFMuVdTGwvDp_38A";


// Debugging: Log the values to ensure they're loaded
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? '*** loaded ***' : 'MISSING');

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    Supabase URL and Key are required in environment variables.
    Check that:
    1. Your .env file exists in the project root
    2. Variables are prefixed with VITE_
    3. You've restarted your development server
  `);
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});