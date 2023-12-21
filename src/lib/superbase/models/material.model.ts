import { BaseModel } from "@/helpers/superbase.helper";
import { Material, Faculty, QueryFilter,
    SuperBaseData, SuperBaseDatbaseNames,
    SuperBaseDatbaseTableColumns, 
    Asset,
    Course,
    FetchParam,
    ValidData} from "@/types/superbase";
import logger from "@/utils/logger";
import AssetModel from "./asset.model";
import { MaterialTbRow } from "@/types/superbase/table";


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
    title: string;
    course: string;  // course id
    asset: string; // asset id
    created_at: string | Date;
    updated_at?: string | Date;


    update_excludes: MaterialProps[] = [
        MaterialProps.ID, 
        MaterialProps.CREATED_AT,
        MaterialProps.UPDATED_AT
    ]


    /* =============== Static attributes ================ */
    static _cls: SuperBaseDatbaseNames = SuperBaseDatbaseNames.MATERIALS;
    static assetManager = AssetModel

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

    private updateInstance(updated_data: SuperBaseData) {

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



    private getInstanceData(exclude?: MaterialProps[]): Material {

        const data = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            title: this.title,
            asset: this.asset,
            course: this.course,
        }

        if (exclude) exclude.forEach((field)=>{
            
            delete data[field]
        })

        return data
    }


    get data() {
        return this.getInstanceData()
    }


    /* =============== Instance Methods ================ */
    /**
     * Synchronize instance data with database
     * @param	boolean     upsert 	Auto create if not exist
     * @todo    Implement upsert functionality
     * @return 	void
     */
    async update(upsert = false): Promise<void> {
        // const cls = MaterialModel._cls;

        const instance_data = this.getInstanceData(this.update_excludes)

        const new_data = await MaterialModel.updateRow(this.id, instance_data)

        this.updateInstance(new_data)
    }

    /* =============== Static Methods ================ */
    /**
     * Creates instance from data
     * @param	Material 	instanceData	Data from database
     * @return  MaterialModel      An instance of MaterialModel 	
     */
    static createInstance(instanceData: MaterialTbRow): MaterialModel {
        return new MaterialModel(instanceData);
    }


    /**
     * Fetch data from database
     * @param	string 	column  table columns seperated by comma
     * @return 	A list of Materials
     */
    static async fetch({column = SuperBaseDatbaseTableColumns.MATERIALS}): Promise<MaterialTbRow[]> {
        const cls = MaterialModel._cls;
        // const columnName = column || '*'

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = MaterialModel.handleAllDatabaseResponse<MaterialTbRow[]>(
            await MaterialModel.db
            .from(cls)
            .select(column)
        );
        

        if (error) throw error;

        return data;
    }


    /**
     * Fetch specific row from database
     * @param	QueryFilter 	filter	filters to search by
     * @return a new instance of MaterialModel or null if data does not exist
     */
    static async fetchOne({
        filter,
        column = SuperBaseDatbaseTableColumns.MATERIALS
    }: FetchParam): Promise<MaterialModel> {
        const cls = MaterialModel._cls;
        // const columnName = column || '*'

        logger.debug("FETCH FROM COLUMN", column, filter)
        const { data, error } = MaterialModel.handleAllDatabaseResponse<SuperBaseData[]>(
            await MaterialModel.db
            .from(cls)
            .select(column)
            .eq(filter.at, filter.is)
        );
        

        if (error) throw error;

        // console.log(data)
        if (data.length < 1) throw ({
            code: 'NOT FOUND',
            message: "Material not found"
        });
        return MaterialModel.createInstance(data[0] as MaterialTbRow);
    }


    /**
     * Fetch specific row from database by Id
     * @param	string 	id	frow id
     * @return a new instance of MaterialModel or null if data does not exist
     */
    static async fetchById(id: string) {
        return MaterialModel.fetchOne({
            filter: {
                at: MaterialProps.ID,
                is: id
            }
        })
    }


    /**
     * Inserts new data into database
     * @param	object 	new_data	Row data
     * @return  MaterialModel	   Instance with newly created data
     */
    static async insert(new_data: ValidData): Promise<MaterialModel> {
        const cls = MaterialModel._cls;


        const {asset, ...rest} = new_data;


        // Create asset
        const assetData = await this.saveAsset(asset as File);

        const payload = {
            ...rest,
            asset: assetData.id
        }

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = MaterialModel.handleAllDatabaseResponse(
            await MaterialModel.db
            .from(cls)
            .upsert(payload)
            .select()
        );
        

        if (error) throw error;

        // console.log(data)
        return MaterialModel.createInstance(data[0]);
    }


    static async saveAsset(asset:File): Promise<AssetModel> {
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

        return this.assetManager.insert({
            path: data.path,
            fullPath: data.fullPath,
            access: data.access,
            download: data.download,
            storage_id: data.id as string,
        })
    }


    /**
     * Synchronize instance data with database
     * @param	string          id 	    Row id to update
     * @param	SuperBaseData   upsert 	Data to update in row
     * @param	boolean     upsert 	Auto create if not exist
     * @todo    Implement upsert functionality
     * @return 	void
     */
    static async updateRow(id:string, updated_data:SuperBaseData, upsert = false): Promise<Material> {
        const cls = MaterialModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = MaterialModel.handleAllDatabaseResponse<Material[]>(
            await MaterialModel.db
            .from(cls)
            .update(updated_data)
            .eq("id", id)
            .select()
        );
        

        if (error) throw error;

        return data[0];
    }


    /**
     * Delete row from database
     * @param	string 	index	Value to use to delete row
     * @param	string 	value	value to compare to delete
     * @return 	void
     */
    static async deleteRow(index:string, value:string): Promise<void> {
        const cls = MaterialModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = MaterialModel.handleAllDatabaseResponse(
            await MaterialModel.db
            .from(cls)
            .delete()
            .eq(index, value)
        );
        

        if (error) throw error;
    }


    /**
     * Delete instance from database
     * @param	MaterialModel 	instance	Instance to delete
     * @return 	void
     */
    static async delete(instance: MaterialModel): Promise<void> {
        
        await MaterialModel.deleteRow(
            MaterialProps.ID,
            instance.id
        )
    }

    
}


export default MaterialModel;
