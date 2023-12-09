import { BaseTb, Database,
    QueryFilter,
    SuperBaseClient, SuperBaseData,
    SuperBaseDatabaseReponse, SuperBaseDatbaseNames,
    SuperBaseStorageErrorTypes, SuperBaseStorageReponse
} from "@/types/superbase";
import logger from "@/utils/logger";
import { createClient } from "@supabase/supabase-js";



const env = process.env;
const SUPERBASE_URL = env.SUPERBASE_URL || 'https://zxkacyqasqjoafeeabbe.supabase.co'
const SUPERBASE_API_KEY = env.SUPERBASE_API_KEY;


// Create a single supabase client for interacting with your database
const supabase: SuperBaseClient = (()=>{

    if (!SUPERBASE_API_KEY) throw new Error("SUPERBASE api key is required!!");

    return global._superbaseInstance || createClient<Database>(SUPERBASE_URL, SUPERBASE_API_KEY);
})()



/**
 * Abstract class for main Superbase class main propertise
 * basically provides already initialized instance of superbase
 * 
 */
export class SuperbaseMeta {
    protected instance: SuperBaseClient = supabase;
    static db: SuperBaseClient = supabase
    
    
    handleStorageResponse({data, error}:SuperBaseStorageReponse) {
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


    static handleAllDatabaseResponse<T= SuperBaseData[]>({data, error}: SuperBaseDatabaseReponse<T>) {
        const _parsed_error = {code: '', message:''};


        // Error object seems nice already
        if (error) {
            logger.error("DATABASE ERROR OBJECT::", error)
        }


        return {data: data as T, error: error && {..._parsed_error, ...error}}
    }

    handleDatabaseReponse({data,error}: SuperBaseDatabaseReponse){
        return SuperbaseMeta.handleAllDatabaseResponse({data, error})
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

/**
 * BaseModel for all models that maps to database table
 * 
 * 
 */
export class BaseModel extends SuperbaseMeta implements BaseTb{
    id: string = ''
    created_at?: Date | string;
    updated_at?: Date | string;

    // _cls: SuperBaseDatbaseNames;
    update_excludes = ['id', 'created_at', 'updated_at']

    constructor(){
        super()
        // throw new Error("Cannot initilize this class");
    
    }


    // Get iupdate object with latest data
    // private updateInstance(update_data: SuperBaseData) {}

    // Get instance data object like that in databse
    // private getInstanceData(exclude?: string[]) {}


    /* This are just interfaces, methods to be defined in all subclasses */
    static createInstance(instanceData:any): void { }

    // Update instace and sycn with database
    static update(upsert: false) { }

    // Fetch instance data
    static fetch(column: string) { }

    // Fetch just one instance
    static fetchOne(filter:QueryFilter, column: string) { }
    
    // Fetch a specific row in database
    static fetchById(id: string) { }
    

    // Create instance data
    static insert(new_data: SuperBaseData) { }
    
    // Update data in database
    static updateRow(id: string, updated_data: SuperBaseData, upsert: false) { }
    
    // Delete data directly
    static deleteRow(index:string, value:string) { }
    
    // Delete instance from databse
    static delete(instance: any) { }
}
