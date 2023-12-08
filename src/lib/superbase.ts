
import { SuperBaseError, calculateStorageSpace, handleSuperBaseResponse } from '@/helpers/superbase';
import { createClient } from '@supabase/supabase-js'
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'


const env = process.env;

type Bucket = 'test-resource';

export enum BucketType {
    RESOURCES = 'test-resource'
}


interface BucketOptions {
    bucket: BucketType,
    is_public?: boolean,
    maxSize?: number
}


const SUPERBASE_URL = env.SUPERBASE_URL || 'https://zxkacyqasqjoafeeabbe.supabase.co'
const SUPERBASE_API_KEY = env.SUPERBASE_API_KEY;


// Create a single supabase client for interacting with your database

const supabase = (()=>{

    if (!SUPERBASE_API_KEY) throw new Error("SUPERBASE api key is required!!");

    return global._superbaseInstance || createClient(SUPERBASE_URL, SUPERBASE_API_KEY);
})()




class SuperbaseMeta {
    protected instance: SupabaseClient = supabase;
}


// ? Refer to https://supabase.com/docs/reference/javascript/storage-from-upload
interface UploadConfig {
    path: string,
    asset: File,
    fileOptions?: {
        cacheControl?: string,
        contentType?: string,
        duplex?: string,
        upsert?: boolean
    }
}

interface FileAccessConfig {
    path: string,
    options?: {
        download?: string | boolean,
        // ! Not supporting transform
    }
}

class BucketManager extends SuperbaseMeta {

    static createBucket = ({
            bucket,
            is_public = true,
            maxSize = calculateStorageSpace(25) // default 25mb
        }: BucketOptions) => supabase
            .storage
            .createBucket(
                bucket,
                {
                    public: is_public,
                    fileSizeLimit: maxSize
                    // allowedMimeTypes: ['image/png'],
                }
            );

    static getBucket = (bucket: Bucket) => supabase
            .storage
            .getBucket(bucket);

    
    static setupBucket = async (options: BucketOptions) => {
        const { data, error } = handleSuperBaseResponse(await BucketManager.getBucket(BucketType.RESOURCES));

        if (data) console.log("Bucket already setup")
        if (!error) return data;

        if (error.code === SuperBaseError.FILENOTFOUND) {

            console.log("Not bucket found!")

            const {data, error} = handleSuperBaseResponse(
                await BucketManager.createBucket(options)
            )

            if (!error) return data;

            if (error) throw Error(...error);
        }

        throw new Error(...error);

    }

    async getFileLink(config:FileAccessConfig, storage:Bucket=BucketType.RESOURCES) {
        const {data} =  this.instance.storage
            .from(storage).getPublicUrl(config.path, config.options)
        
        return data.publicUrl
    }

    async upload(config: UploadConfig, storage:Bucket=BucketType.RESOURCES){

        let req;
        try {
            req = await this.instance.storage.from(storage).upload(
                config.path,
                config.asset,
                config.fileOptions || {}
            )
        } catch(err){
            console.error(err);
            return {
                data: null,
                error: {
                    code: null,
                    message: null
                }
            }
        }
        const {data, error} = handleSuperBaseResponse(req);
        
        let access:string | null = null;

        if(data?.fullPath) access = await this.getFileLink({
                path: data.path,
                options: {
                    download: false
                }
            });

        return {
            data: {...data, access},
            error
        }
    }
}


class SuperBase {
    
    static bucket =  new BucketManager();

}

export async function setupSuperbase(){

    await BucketManager.setupBucket({
        bucket: BucketType.RESOURCES
    });

    console.log("Superbase all set")

}

export default SuperBase;