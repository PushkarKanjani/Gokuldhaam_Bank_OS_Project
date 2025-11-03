import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  account_number: string;
  balance: number;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id: string;
  user_id: string;
  contact_name: string;
  account_number: string;
  is_recent: boolean;
  last_contacted: string;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  transaction_type: 'debit' | 'credit';
  amount: number;
  recipient_name: string | null;
  recipient_account: string | null;
  description: string | null;
  status: string;
  created_at: string;
};
