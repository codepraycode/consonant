import { BaseModel } from "@/helpers/superbase.helper";
import { Asset, FetchParam, SuperBaseData, SuperBaseDatbaseNames, SuperBaseDatbaseTableColumns } from "@/types/superbase";
import logger from "@/utils/logger";
import BucketManager from "../bucket";
import { AssetTbRow } from "@/types/superbase/table";
import { AssetDto } from "@/types/dto";


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



class AssetModel extends BaseModel implements Asset {

    /* =============== Class attributes ================ */
    path: string;
    fullPath: string;
    access: string;
    download: string;
    storage_id: string;

    update_excludes: AssetProps[] = [
        AssetProps.ID, 
        AssetProps.CREATED_AT,
        AssetProps.UPDATED_AT
    ]


    /* =============== Static attributes ================ */
    static _cls: SuperBaseDatbaseNames = SuperBaseDatbaseNames.ASSET;
    static bucket =  new BucketManager();


    /* =============== Constructor ================ */
    constructor(instanceData: Asset){        

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

    private updateInstance(updated_data: SuperBaseData) {

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



    private getInstanceData(exclude?: AssetProps[]): Asset {

        const data = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            path: this.path,
            access: this.access,
            download: this.download,
            fullPath: this.fullPath,
            storage_id: this.storage_id
        }

        if (exclude) exclude.forEach((field)=>{
            
            delete data[field]
        })

        return data
    }


    /* =============== Instance Methods ================ */
    /**
     * Synchronize instance data with database
     * @param	boolean     upsert 	Auto create if not exist
     * @todo    Implement upsert functionality
     * @return 	void
     */
    async update(upsert = false): Promise<void> {
        const cls = AssetModel._cls;

        const instance_data = this.getInstanceData(this.update_excludes)

        const new_data = await AssetModel.updateRow(this.id, instance_data)

        this.updateInstance(new_data)
        // const { data, error } = this.handleDatabaseReponse(
        //     await AssetModel.db
        //     .from(cls)
        //     .update(instance_data)
        //     .eq("id", this.id)
        //     .select()
        // );
        

        // if (error) throw error;

        // console.log(data)
        // return data;
        // return null
    }

    /* =============== Static Methods ================ */
    /**
     * Creates instance from data
     * @param	Asset 	instanceData	Data from database
     * @return  AssetModel      An instance of AssetModel 	
     */
    static createInstance(instanceData: AssetTbRow): AssetModel {
        return new this(instanceData);
    }


    /**
     * Fetch data from database
     * @param	string 	column  table columns seperated by comma
     * @return 	A list of assets
     */
    static async fetch({column = SuperBaseDatbaseTableColumns.ASSET}): Promise<Asset[]> {
        const cls = AssetModel._cls;
        // const columnName = column || '*'

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = AssetModel.handleAllDatabaseResponse<Asset[]>(
            await AssetModel.db
            .from(cls)
            .select(column)
        );
        

        if (error) throw error;

        return data;
    }


    /**
     * Fetch specific row from database
     * @param	QueryFilter 	filter	filters to search by
     * @return a new instance of AssetModel or null if data does not exist
     */
    static async fetchOne({
        filter,
        column = SuperBaseDatbaseTableColumns.ASSET
    }: FetchParam): Promise<AssetModel | null> {
        const cls = AssetModel._cls;
        // const columnName = column || '*'

        logger.debug("FETCH FROM COLUMN", column, filter)
        const { data, error } = AssetModel.handleAllDatabaseResponse<SuperBaseData[]>(
            await AssetModel.db
            .from(cls)
            .select(column)
            .eq(filter.at, filter.is)
        );
        

        if (error) throw error;

        // console.log(data)
        if (data.length < 1) return null;
        return AssetModel.createInstance(data[0] as AssetTbRow);
    }


    /**
     * Fetch specific row from database by Id
     * @param	string 	id	frow id
     * @return a new instance of AssetModel or null if data does not exist
     */
    static async fetchById(id: string) {
        return AssetModel.fetchOne({
            filter: {
                at: AssetProps.ID,
                is: id
            }
        })
    }


    /**
     * Inserts new data into database
     * @param	object 	new_data	Row data
     * @return  AssetModel	   Instance with newly created data
     */
    static async insert(new_data: AssetDto): Promise<AssetModel> {
        const cls = AssetModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = this.handleAllDatabaseResponse(
            await AssetModel.db
            .from(cls)
            .upsert(new_data)
            .select()
        );
        

        if (error) throw error;

        // console.log(data)
        return this.createInstance(data[0] as AssetTbRow);
    }


    /**
     * Synchronize instance data with database
     * @param	string          id 	    Row id to update
     * @param	SuperBaseData   upsert 	Data to update in row
     * @param	boolean     upsert 	Auto create if not exist
     * @todo    Implement upsert functionality
     * @return 	void
     */
    static async updateRow(id:string, updated_data:SuperBaseData, upsert = false): Promise<Asset> {
        const cls = AssetModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = this.handleAllDatabaseResponse<Asset[]>(
            await AssetModel.db
            .from(cls)
            .update(updated_data)
            .eq("id", id)
            .select()
        );
        

        if (error) throw error;

        // console.log(data)
        // return data;
        // return null

        return data[0];
    }


    /**
     * Delete row from database
     * @param	string 	index	Value to use to delete row
     * @param	string 	value	value to compare to delete
     * @return 	void
     */
    static async deleteRow(index:string, value:string): Promise<void> {
        const cls = AssetModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = AssetModel.handleAllDatabaseResponse(
            await AssetModel.db
            .from(cls)
            .delete()
            .eq(index, value)
        );
        

        if (error) throw error;
    }


    /**
     * Delete instance from database
     * @param	AssetModel 	instance	Instance to delete
     * @return 	void
     */
    static async delete(instance: AssetModel): Promise<void> {
        
        await AssetModel.deleteRow(
            AssetProps.ID,
            instance.id
        )
    }

    
}


export default AssetModel;
