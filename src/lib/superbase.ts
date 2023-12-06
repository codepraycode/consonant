
import { SuperBaseError, handleSuperBaseResponse } from '@/helpers/superbase';
import { createClient } from '@supabase/supabase-js'


type Bucket = 'test-resource';
interface BucketOptions {
    bucket: Bucket,
    is_public?: boolean,
    maxSize?: number
}

export enum BucketType {
    RESOURCES = 'test-resource'
}


const SUPERBASE_URL="https://ztblyojgzikyvahapmgi.supabase.co"
// Create a single supabase client for interacting with your database

const API_KEY = process.env.SUPERBASE_API_KEY;

if (!API_KEY) throw new Error("SUPERBASE api key is required!!");



const supabase = createClient(SUPERBASE_URL, API_KEY);


class BucketManager {

    static createBucket = ({
            bucket,
            is_public = true,
            maxSize = 512 // default to half of 1GB
        }: BucketOptions) => supabase
            .storage
            .createBucket(bucket, 
                // {
                //     // public: is_public,
                //     // fileSizeLimit: maxSize
                //     // allowedMimeTypes: ['image/png'],
                // }
            );

    static getBucket = (bucket: Bucket) => supabase
            .storage
            .getBucket(bucket);

    
    static setupBucket = async (options: BucketOptions) => {
        const { data, error } = handleSuperBaseResponse(await BucketManager.getBucket(BucketType.RESOURCES));

        if (!error) return data;

        if (error.code === SuperBaseError.NOTFOUND) {

            console.log("Not bucket found!")
            const {data, error} = handleSuperBaseResponse(
                await BucketManager.createBucket(options)
            )

            // if (!error) return data;

            // if (error) throw Error(...error);

            return data;
        }

        // else {
        //     throw new Error(...error);
        // }

    }

}

export async function setUp(){

    const bucket = await BucketManager.setupBucket({
        bucket: BucketType.RESOURCES
    });

    console.log(bucket)


    // const {data, error} = await BucketManager.createBucket({bucket: BucketType.RESOURCES});

    // if(error) console.error(error)
    // else console.log(data)

}

export default supabase;