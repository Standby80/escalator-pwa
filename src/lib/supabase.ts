import { createClient } from '@supabase/supabase-js';

// Fallback to empty strings if env vars are missing to prevent crashing during UI dev
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
