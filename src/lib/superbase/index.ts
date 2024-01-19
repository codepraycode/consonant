import { SupabaseClient, createClient } from "@supabase/supabase-js";



const SUPERBASE_URL="https://exetgdtuukdjprzypcsa.supabase.co"
const SUPERBASE_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZXRnZHR1dWtkanByenlwY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjM4NzE2OCwiZXhwIjoyMDE3OTYzMTY4fQ.MNxAHTrV6TrOOavYNw0-q3IC_XQoIIIshk-rjrHYvDg"
const SUPERBASE_ANON_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZXRnZHR1dWtkanByenlwY3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzODcxNjgsImV4cCI6MjAxNzk2MzE2OH0.-wbK9a6ArjYmcvoqmgRxxF9Hc_J5lIpbYHyH1c2hbpc"

export const supabase = ((): SupabaseClient =>{


    if (!global._supabaseInstance) {
        global._supabaseInstance = createClient(SUPERBASE_URL, SUPERBASE_API_KEY);
    }

    return global._supabaseInstance;
})()

