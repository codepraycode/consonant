import { SuperbaseMeta, calculateStorageSpace
} from "@/helpers/superbase.helper";

import { Asset, BucketName, BucketOptions,
        BucketType, StorageAccessConfig,
        StorageUploadConfig, SuperBaseStorageErrorTypes, SuperBaseStorageReponse
} from "@/types/superbase";
import logger from "@/utils/logger";



class BucketManager extends SuperbaseMeta {

    createBucket = ({
            bucket,
            is_public = true,
            maxSize = calculateStorageSpace(25) // default 25mb
        }: BucketOptions) => this.instance
            .storage
            .createBucket(
                bucket,
                {
                    public: is_public,
                    fileSizeLimit: maxSize
                    // allowedMimeTypes: ['image/png'],
                }
            );

    getBucket = (bucket: BucketName) => this.instance
            .storage
            .getBucket(bucket);

    async getFileLink(config:StorageAccessConfig, storage:BucketName = BucketType.RESOURCES) {
        const {data} =  this.instance.storage
            .from(storage).getPublicUrl(config.path, config.options)
        
        return data.publicUrl
    }

    async upload(config: StorageUploadConfig, storage:BucketName = BucketType.RESOURCES) {

        let req;
        try {
            req = await this.instance.storage.from(storage).upload(
                config.path,
                config.asset,
                config.fileOptions || {}
            ) as SuperBaseStorageReponse
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

        const {data, error} = this.handleStorageResponse(req);

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
            data: {...(data as Asset)},
            error
        }
    }


    private _runSetupBucket = async (options: BucketOptions) => {

        // Optimize setup
        if (global.__alreadySetupStorage) return;

        const { data, error } = this.handleStorageResponse(
            await this.getBucket(BucketType.RESOURCES) as SuperBaseStorageReponse
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

            const {data, error} = this.handleStorageResponse(
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

        bck._runSetupBucket(options)
    }
}


export default BucketManager;
