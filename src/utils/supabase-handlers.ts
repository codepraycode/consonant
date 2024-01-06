import { SuperBaseData, SuperBaseDatabaseReponse, SuperBaseStorageErrorTypes, SuperBaseStorageReponse } from "@/types/superbase";
import logger from "./logger";


const supabase = global._supabaseInstance;


export function handleStorageResponse({data, error}:SuperBaseStorageReponse) {
    const _parsed_error = {code: '', message:''};

    if (error) {
        if (error.stack?.includes("Bucket not found")) {
            _parsed_error.code = SuperBaseStorageErrorTypes.BUCKETNOTFOUND
            _parsed_error.message = "Bucket does not exist"
        }
        else if (error.message === 'Payload too large'){
            _parsed_error.code = SuperBaseStorageErrorTypes.FILETOOLARGE
            _parsed_error.message = "File must not be more than 25mb"
        }
        else if (error.error === 'Duplicate'){
            _parsed_error.code = SuperBaseStorageErrorTypes.FILEALREADYEXIST
            _parsed_error.message = "File already exist"
        }
        
        else logger.error("STORAGE ERROR OBJECT::", error)
    }


    return {data, error: error && {..._parsed_error, ...error}}
}


export function handleDatabaseReponse<T= SuperBaseData[]>({data, error}: SuperBaseDatabaseReponse<T>) {
    const _parsed_error = {code: '', message:''};


    // Error object seems nice already
    if (error) {
        logger.error("DATABASE ERROR OBJECT::", error)
    }


    return {data: data as T, error: error && {..._parsed_error, ...error}}
}

/**
 * Resolve many to many relations
 * @param	string 	db	    Database table name
 * @param	string 	query	Database query string
 * @return data	whatever good it returns
 */
export async function resolve(db:string, query:string, filter:{key:string, value:string}) {

    const {data, error} = handleDatabaseReponse(
        await supabase.from(db)
        .select(query)
        .eq(filter.key, filter.value)
    );
    

    if (error) throw error;

    return data;
}

/**
 * Calculate storage size for superbase storage
 * @param number size Size in megabytes
 * @return number   Calculated size in kilobytes
 */

export function calculateStorageSpace(size: number) {

    return size * 1024 * 1024;
}