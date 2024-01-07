import {
    SuperBaseData,
    ValidData,
    SupaBaseTableNames} from "@/types/superbase";
import logger from "@/utils/logger";
import AssetModel from "./asset.model";
import { AssetTbRow, MaterialTbRow } from "@/types/superbase/table";
import { BaseModel, fetchDbRow, fetchDbRows, insertDbRow } from "../../../utils/supabase-table";


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
    asset: string; // asset id
    created_at: string | Date;
    updated_at: string | Date;

    table = SupaBaseTableNames.MATERIALS;

    static get table() {
        return SupaBaseTableNames.MATERIALS
    }

    /* =============== Static attributes ================ */
    protected static assetManager = AssetModel

    /* =============== Constructor ================ */
    constructor(instanceData: MaterialTbRow){        

        super();

        const {
            id,
            created_at,
            updated_at,

            title, 
            asset,
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
        this.asset = asset;
        this.course = course;
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
            asset: this.asset,
            course: this.course,
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
            asset: assetData.id
        }


        const data = await insertDbRow<MaterialTbRow>(
            table,
            payload as MaterialTbRow
        )

        // console.log(data)
        return new this(data);
    }


    protected static async saveAsset(asset:File): Promise<AssetTbRow> {
        // First upload Asset
        // Link asset to material and upload
        const {data, error} = await this.assetManager.bucket.upload({
            path: (asset as File).name,
            asset: (asset as File)
        });

        
        if (error || !data) {
            logger.error("UPLOAD ASSET ERROR::", error || data);
            throw (error);
        }


        const assetTable = this.assetManager.table
        const assetData = {
            path: data.path,
            fullPath: data.fullPath,
            access: data.access,
            download: data.download,
            storage_id: data.id as string,
        }


        return await insertDbRow<AssetTbRow>(
            assetTable,
            assetData as AssetTbRow
        )
    }


    static async fetchById(id:string) {

        return fetchDbRow<MaterialModel>(
            this.table,
            {
                where: 'id',
                is: id
            }
        )
    }

    static async fetchAll() {

        return fetchDbRows<MaterialModel>(
            this.table            
        )
    }
    
}


export default MaterialModel;
