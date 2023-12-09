import { BaseTb, Database, SuperBaseClient, SuperBaseStorageReponse } from "@/types/superbase";
import { createClient } from "@supabase/supabase-js";



const env = process.env;
const SUPERBASE_URL = env.SUPERBASE_URL || 'https://zxkacyqasqjoafeeabbe.supabase.co'
const SUPERBASE_API_KEY = env.SUPERBASE_API_KEY;


// Create a single supabase client for interacting with your database
const supabase: SuperBaseClient = (()=>{

    if (!SUPERBASE_API_KEY) throw new Error("SUPERBASE api key is required!!");

    return global._superbaseInstance || createClient<Database>(SUPERBASE_URL, SUPERBASE_API_KEY);
})()


export enum SuperBaseStorageError {
    DEFAULT = 'ERROR',
    TIMEOUT = 'TIME-OUT',
    BUCKETNOTFOUND = 'BUCKET-NOT-FOUND',
    FILENOTFOUND="FILE-NOT-FOUND",
    FILETOOLARGE="FILE-TOO-LARGE",
    FILEALREADYEXIST="FILE-ALREADY-EXIST",
}



/**
 * Abstract class for main Superbase class main propertise
 * basically provides already initialized instance of superbase
 * 
 */
export class SuperbaseMeta {
    protected instance: SuperBaseClient = supabase;
    
    
    handleStorageResponse({data, error}:SuperBaseStorageReponse) {
        const _parsed_error = {code: '', message:''};

        if (error) {
            if (error.stack?.includes("Bucket not found")) {
                _parsed_error.code = SuperBaseStorageError.BUCKETNOTFOUND
                _parsed_error.message = "Bucket does not exist"
            }
            else if (error.message === 'Payload too large'){
                _parsed_error.code = SuperBaseStorageError.FILETOOLARGE
                _parsed_error.message = "File must not be more than 25mb"
            }
            else if (error.error === 'Duplicate'){
                _parsed_error.code = SuperBaseStorageError.FILEALREADYEXIST
                _parsed_error.message = "File already exist"
            }
            
            else console.error("Error object:", error)
        }


        return {data, error: error && {..._parsed_error, ...error}}
    }
}




/**
 * Calculate storage size for superbase storage
 * @param number size Size in megabytes
 * @return number   Calculated size in kilobytes
 */

export function calculateStorageSpace(size: number) {

    return size * 1024 * 1024;
}


export class BaseModel implements BaseTb{
    id: string = ''
    created_at?: Date | string;
    updated_at?: Date | string;
}
