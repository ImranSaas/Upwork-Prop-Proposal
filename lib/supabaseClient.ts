import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bffifvgoiwyikhdtftrh.supabase.co'; // TODO: Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZmlmdmdvaXd5aWtoZHRmdHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTQxNzcsImV4cCI6MjA2ODI3MDE3N30.zpxUTRV_4eC-NUa-GO9VsP2fmKhy4GhYvY5kJRihK5E'; // TODO: Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 