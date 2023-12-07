
import { SuperBaseError, handleSuperBaseResponse } from '@/helpers/superbase';
import { createClient } from '@supabase/supabase-js'


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

if (!SUPERBASE_API_KEY) throw new Error("SUPERBASE api key is required!!");

const supabase = createClient(SUPERBASE_URL, SUPERBASE_API_KEY);


class BucketManager {

    static createBucket = ({
            bucket,
            is_public = true,
            maxSize = 512 // default to half of 1GB
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

        if (error.code === SuperBaseError.NOTFOUND) {

            console.log("Not bucket found!")

            const {data, error} = handleSuperBaseResponse(
                await BucketManager.createBucket(options)
            )

            if (!error) return data;

            if (error) throw Error(...error);
        }

        throw new Error(...error);

    }

}

export async function setupSuperbase(){

    await BucketManager.setupBucket({
        bucket: BucketType.RESOURCES
    });

    console.log("Superbase all set")

}

export default supabase;