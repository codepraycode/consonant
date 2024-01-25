import {
    SuperBaseData,
    ValidData,
    SupaBaseTableNames} from "@/types/superbase";
import logger from "@/utils/logger";
import {  MaterialTbRow, StorageAsset } from "@/types/superbase/table";
import { BaseModel, fetchDbRow, fetchDbRows, fetchFilteredDbRows, insertDbRow } from "../../../utils/supabase-table";
import BucketManager from "../bucket";


/**
 * Property enumerator, just to efficiently compare values
 * and avoid errors in usage or comparison
 */
enum MaterialProps {
    TITLE = 'title',
    // COURSE = 'course',
    // ASSET = 'asset',
    // Meta data
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}



class MaterialModel extends BaseModel implements MaterialTbRow {

    /* =============== Class attributes ================ */
    id: string;
    title: string;
    course: string;  // course id
    asset_access: string; // asset id
    asset_download: string;
    asset_id: string;
    asset_type: string;
    created_at: string | Date;
    updated_at: string | Date;
    user: string;


    table = SupaBaseTableNames.MATERIALS;
    static get table() {
        return SupaBaseTableNames.MATERIALS
    }


    static bucket =  new BucketManager();

    /* =============== Static attributes ================ */

    /* =============== Constructor ================ */
    constructor(instanceData: MaterialTbRow){        

        super();

        const {
            id,
            created_at,
            updated_at,

            title, 
            asset_access,
            asset_download,
            asset_id,
            asset_type,
            user,
            course
        } = instanceData;

        if (!id) {
            const msg = "instanceData must be related to database row, missing id"
            logger.error("Material MODEL INITIALIZATION ERROR::", msg)

            throw new Error(msg)
        }

        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;


        this.title = title;
        this.asset_access = asset_access;
        this.asset_download = asset_download;
        this.asset_id = asset_id;
        this.asset_type = asset_type
        this.course = course || '';
        this.user = user
    }


    /* =============== Private Methods ================ */

    updateInstance(updated_data: SuperBaseData) {

        Object.entries(updated_data).forEach(([field, value])=>{
            
            switch (field) {
                case MaterialProps.TITLE:
                    this.title = value;
                    break

                case MaterialProps.ID:
                    this.id = value;
                    break
                case MaterialProps.CREATED_AT:
                    this.created_at = value;
                    break
                case MaterialProps.UPDATED_AT:
                    this.updated_at = value;
                    break
                default:
                    logger.error("Material INSTANCE UPDATE UNKNOWN FIELD", field);
                    throw new Error("Unknown field = " + field)
            }
        })
    }



    getInstanceData(exclude = false): MaterialTbRow {

        const data: Record<string, any> = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            title: this.title,
            asset_access: this.asset_access,
            asset_download: this.asset_download,
            asset_id: this.asset_id,
            course: this.course,
            user: this.user
        }

        if (exclude) this.exclude_on_update.forEach((field)=>{
            
            delete data[field]
        })

        return data as MaterialTbRow;
    }


    /**
     * Inserts new data into database
     * @param	object 	new_data	Row data
     * @return  MaterialModel	   Instance with newly created data
     */
    static async save(new_data: ValidData): Promise<MaterialModel> {
        const table = SupaBaseTableNames.MATERIALS;


        const {asset, ...rest} = new_data;


        // Create asset
        const assetData = await this.saveAsset(asset as File);

        const payload = {
            ...rest,
            ...assetData
        }


        const data = await insertDbRow<MaterialTbRow>(
            table,
            payload as MaterialTbRow
        )
        return new this(data);
    }


    protected static async saveAsset(asset:File): Promise<StorageAsset> {
        // First upload Asset
        // Link asset to material and upload
        const {data, error} = await this.bucket.upload({
            path: (asset as File).name,
            asset: (asset as File)
        });

        
        if (error || !data) {
            logger.error("UPLOAD ASSET ERROR::", error || data);
            throw (error);
        }


        return {
            asset_access: data.access,
            asset_download: data.download,
            asset_id: data.id,
            asset_type: data.asset_type
        }
    }


    static async fetchById(id:string) {

        const material =  await fetchDbRow<MaterialTbRow>(
            this.table,
            {
                where: 'id',
                is: id
            }
        )


        if (!material) return null;

        return new this(material);
    }

    static async fetchAll(id?:string) {

        if (!id) return fetchDbRows<MaterialTbRow>(
            this.table
        )


        return fetchFilteredDbRows<MaterialTbRow>(
            this.table,
            'user',
            id,
        )
    }
    
}


export default MaterialModel;
