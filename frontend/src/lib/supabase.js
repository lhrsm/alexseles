import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://olpxtxcreseibkiwvlnc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jG-WP0m35Db9WvRzuCsCBQ_uTJ6oAE9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
