
import { SupaBaseTableNames, SuperBaseData } from "@/types/superbase";
import logger from "@/utils/logger";
import BucketManager from "../bucket";
import { AssetTbRow } from "@/types/superbase/table";
import { BaseModel } from "../../../utils/supabase-table";


/**
 * Property enumerator, just to efficiently compare values
 * and avoid errors in usage or comparison
 */
enum AssetProps {
    PATH = 'path',
    FULLPATH = 'fullPath',
    ACCESS = 'access',
    DOWNLOAD = 'download',
    STORAGE_ID = 'storage_id',
    // Meta data
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}



class AssetModel extends BaseModel implements AssetTbRow {

    /* =============== Class attributes ================ */
    id: string;
    created_at: string | Date;
    updated_at: string | Date;

    path: string;
    fullPath: string;
    access: string;
    download: string;
    storage_id: string;


    /* =============== Static attributes ================ */
    static bucket =  new BucketManager();
    table = SupaBaseTableNames.ASSET;

    static get table() {
        return SupaBaseTableNames.ASSET
    }


    /* =============== Constructor ================ */
    constructor(instanceData: AssetTbRow){        

        super();

        const {
            id,
            created_at,
            updated_at,

            path, 
            access,
            fullPath,
            download,
            storage_id
        } = instanceData;

        if (!id) {
            const msg = "instanceData must be related to database row, missing id"
            logger.error("ASSET MODEL INITIALIZATION ERROR::", msg)

            throw new Error(msg)
        }

        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;


        this.path = path;
        this.access = access;
        this.fullPath = fullPath;
        this.download = download
        this.storage_id = storage_id
        
    }


    /* =============== Private Methods ================ */

    updateInstance(updated_data: SuperBaseData) {

        Object.entries(updated_data).forEach(([field, value])=>{
            
            switch (field) {
                case AssetProps.PATH:
                    this.path = value;
                    break
                case AssetProps.ACCESS:
                    this.access = value;
                    break
                case AssetProps.DOWNLOAD:
                    this.download = value;
                    break
                case AssetProps.FULLPATH:
                    this.fullPath = value;
                    break
                case AssetProps.STORAGE_ID:
                    this.storage_id = value;
                    break
                case AssetProps.ID:
                    this.id = value;
                    break
                case AssetProps.CREATED_AT:
                    this.created_at = value;
                    break
                case AssetProps.UPDATED_AT:
                    this.updated_at = value;
                    break
                default:
                    logger.error("ASSET INSTANCE UPDATE UNKNOWN FIELD", field);
                    throw new Error("Unknown field = " + field)
            }
        })
    }



    getInstanceData(exclude = false): AssetTbRow {

        const data: Record<string, any> = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            path: this.path,
            access: this.access,
            download: this.download,
            fullPath: this.fullPath,
            storage_id: this.storage_id
        }

        if (exclude) this.exclude_on_update.forEach((field)=>{
            
            delete data[field]
        })

        return data as AssetTbRow;
    }

    
}


export default AssetModel;
