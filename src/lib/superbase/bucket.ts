

import { BucketOptions,
        StorageAccessConfig,
        StorageUploadConfig, SuperBaseStorageErrorTypes, SuperBaseStorageReponse
} from "@/types/superbase";
import logger from "@/utils/logger";
import { calculateStorageSpace, handleStorageResponse } from "@/utils/supabase-handlers";
import { supabase } from ".";



const BucketName = 'resources';
class BucketManager {

    createBucket = ({
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

    getBucket = (bucket: string) => {
        
        return supabase
            .storage
            .getBucket(bucket);}

    async getFileLink(config:StorageAccessConfig, storage:string = BucketName) {
        const {data} =  supabase.storage
            .from(storage).getPublicUrl(config.path, config.options)
        return data.publicUrl
    }

    async upload(config: StorageUploadConfig, storage:string = BucketName) {

        let req;
        try {
            req = await supabase.storage.from(storage).upload(
                config.path,
                config.asset,
                config.fileOptions || {}
            ) as SuperBaseStorageReponse
        } catch(err){
            return {
                data: null,
                error: {
                    code: 'UPLOAD ERROR',
                    message: "Could process this file to upload, processing " + config.path,
                }
            }
        }

        const {data, error} = handleStorageResponse(req);

        if (!data) return {data, error};


        let access:string;

        access = await this.getFileLink({
            path: data.path,
            options: {
                download: false
            }
        });

        const download: string = `${access}?download=`;


        data.access = access;
        data.download = download;

        return {
            data,
            error
        }
    }


    private _runSetupBucket = async (options: BucketOptions) => {

        // Optimize setup
        if (global.__alreadySetupStorage) return;

        const { data, error } = handleStorageResponse(
            await this.getBucket(BucketName) as SuperBaseStorageReponse
        );


        if (!error) {
            logger.debug("SETUP BUCKET::BUCKET EXIST::")
            global.__alreadySetupStorage = true;

            return
        }

        global.__alreadySetupStorage = false;

        logger.error("SETUP BUCKET::FETCHING BUCKET ERROR::", error);

        if (error.code === SuperBaseStorageErrorTypes.BUCKETNOTFOUND) {

            logger.debug("SETUP BUCKET::CREATING BUCKET")

            const {data, error} = handleStorageResponse(
                await this.createBucket(options) as SuperBaseStorageReponse
            )


            if (!error) {
                logger.debug("SETUP BUCKET::CREATED NEW BUCKET::", options)
                global.__alreadySetupStorage = true;
                return
            }


            throw error;
        }


        throw error;

    }

    static setupBucket(options: BucketOptions) {
        
        const bck = new BucketManager();

        return bck._runSetupBucket(options)
    }
}


export default BucketManager;


export const setupSuperbase = async ()=> BucketManager.setupBucket({bucket: BucketName});