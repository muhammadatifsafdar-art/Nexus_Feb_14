
import { createClient } from '@supabase/supabase-js';

// These environment variables are expected to be available in the environment.
// For this demonstration, we'll use placeholders that the user would typically provide.
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
