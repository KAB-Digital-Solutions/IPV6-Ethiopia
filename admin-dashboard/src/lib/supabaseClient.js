import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lyuqbekqidamzuvgtinu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXFiZWtxaWRhbXp1dmd0aW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODQxMjMsImV4cCI6MjA2Njk2MDEyM30.MUDIyj5tJbzYbqw9-bmo22RvmrOfHLWAG40B0jdUADk';

// Create two clients: one for public access and one for admin operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('ipv6_resources')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
    } else {
      console.log('Successfully connected to database');
    }
  } catch (error) {
    console.error('Connection test failed:', error);
  }
};

testConnection();