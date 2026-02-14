
import { createClient } from '@supabase/supabase-js';

// These environment variables are expected to be available in the environment.
// For this demonstration, we'll use placeholders that the user would typically provide.
const supabaseUrl = 'https://bpwwoxkttjihdwjukhdf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwd3dveGt0dGppaGR3anVraGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTcxOTcsImV4cCI6MjA4NjQ3MzE5N30.bby8YN-XX8jqu6WhWbbSICEdNe5JEhpFHtiisf2vpNw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
