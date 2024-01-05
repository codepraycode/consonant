import { createClient } from "@supabase/supabase-js";
import axios from "axios";



export const nsupabase = async () =>{


    if (!global._supabaseInstance) {
        // console.log("Nothing")

        const {data:envs} = await axios.get('/api/env');
    
        const {SUPERBASE_API_KEY, SUPERBASE_URL} = envs;
    
        if (!SUPERBASE_API_KEY) throw new Error("SUPERBASE api key is required!!");
    
        global._supabaseInstance = createClient(SUPERBASE_URL, SUPERBASE_API_KEY,{
            // auth: {
            //     autoRefreshToken: false,
            //     persistSession: false,
            //     detectSessionInUrl: false
            // }
        });
    }

    // console.log("Something", global._supabaseInstance)
    return global._supabaseInstance;
}





/**
 * Calculate storage size for superbase storage
 * @param number size Size in megabytes
 * @return number   Calculated size in kilobytes
 */

export function calculateStorageSpace(size: number) {

    return size * 1024 * 1024;
}
