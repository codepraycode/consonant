import { BaseModel } from "@/helpers/superbase.helper";
import { Faculty, FetchParam, QueryFilter,
    SuperBaseData, SuperBaseDatbaseNames,
    SuperBaseDatbaseTableColumns } from "@/types/superbase";
import logger from "@/utils/logger";


/**
 * Property enumerator, just to efficiently compare values
 * and avoid errors in usage or comparison
 */
enum FacultyProps {
    NAME = 'name',
    SHORT = 'short',
    // Meta data
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}



class FacultyModel extends BaseModel implements Faculty {

    /* =============== Class attributes ================ */
    name: string;
    short: string;


    update_excludes: FacultyProps[] = [
        FacultyProps.ID, 
        FacultyProps.CREATED_AT,
        FacultyProps.UPDATED_AT
    ]


    /* =============== Static attributes ================ */
    static _cls: SuperBaseDatbaseNames = SuperBaseDatbaseNames.FACULTY;


    /* =============== Constructor ================ */
    constructor(instanceData: Faculty){        

        super();

        const {
            id,
            created_at,
            updated_at,

            name, 
            short,
        } = instanceData;

        if (!id) {
            const msg = "instanceData must be related to database row, missing id"
            logger.error("FACULTY MODEL INITIALIZATION ERROR::", msg)

            throw new Error(msg)
        }

        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;


        this.name = name;
        this.short = short;
        
    }


    /* =============== Private Methods ================ */

    private updateInstance(updated_data: SuperBaseData) {

        Object.entries(updated_data).forEach(([field, value])=>{
            
            switch (field) {
                case FacultyProps.NAME:
                    this.name = value;
                    break
                case FacultyProps.SHORT:
                    this.short = value;
                    break
                case FacultyProps.ID:
                    this.id = value;
                    break
                case FacultyProps.CREATED_AT:
                    this.created_at = value;
                    break
                case FacultyProps.UPDATED_AT:
                    this.updated_at = value;
                    break
                default:
                    logger.error("FACULTY INSTANCE UPDATE UNKNOWN FIELD", field);
                    throw new Error("Unknown field = " + field)
            }
        })
    }



    private getInstanceData(exclude?: FacultyProps[]): Faculty {

        const data = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            name: this.name,
            short: this.short
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
        // const cls = FacultyModel._cls;

        const instance_data = this.getInstanceData(this.update_excludes)

        const new_data = await FacultyModel.updateRow(this.id, instance_data)

        this.updateInstance(new_data)
    }

    /* =============== Static Methods ================ */
    /**
     * Creates instance from data
     * @param	Faculty 	instanceData	Data from database
     * @return  FacultyModel      An instance of FacultyModel 	
     */
    static createInstance(instanceData: Faculty): FacultyModel {
        return new FacultyModel(instanceData);
    }


    /**
     * Fetch data from database
     * @param	string 	column  table columns seperated by comma
     * @return 	A list of Facultys
     */
    static async fetch({column = SuperBaseDatbaseTableColumns.FACULTY}): Promise<Faculty[]> {
        const cls = FacultyModel._cls;
        // const columnName = column || '*'

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = FacultyModel.handleAllDatabaseResponse<Faculty[]>(
            await FacultyModel.db
            .from(cls)
            .select(column)
        );
        

        if (error) throw error;

        return data;
    }


    /**
     * Fetch specific row from database
     * @param	QueryFilter 	filter	filters to search by
     * @return a new instance of FacultyModel or null if data does not exist
     */
    static async fetchOne({
        filter,
        column = SuperBaseDatbaseTableColumns.FACULTY
    }: FetchParam): Promise<FacultyModel | null> {
        const cls = FacultyModel._cls;
        // const columnName = column || '*'

        logger.debug("FETCH FROM COLUMN", column, filter)
        const { data, error } = FacultyModel.handleAllDatabaseResponse<SuperBaseData[]>(
            await FacultyModel.db
            .from(cls)
            .select(column)
            .eq(filter.at, filter.is)
        );
        

        if (error) throw error;

        // console.log(data)
        if (data.length < 1) return null;
        return FacultyModel.createInstance(data[0] as Faculty);
    }


    /**
     * Fetch specific row from database by Id
     * @param	string 	id	frow id
     * @return a new instance of FacultyModel or null if data does not exist
     */
    static async fetchById(id: string) {
        return FacultyModel.fetchOne({
            filter: {
            at: FacultyProps.ID,
            is: id
        }})
    }


    /**
     * Inserts new data into database
     * @param	object 	new_data	Row data
     * @return  FacultyModel	   Instance with newly created data
     */
    static async insert(new_data: SuperBaseData): Promise<FacultyModel> {
        const cls = FacultyModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = FacultyModel.handleAllDatabaseResponse(
            await FacultyModel.db
            .from(cls)
            .upsert(new_data)
            .select()
        );
        

        if (error) throw error;

        // console.log(data)
        return FacultyModel.createInstance(data[0]);
    }


    /**
     * Synchronize instance data with database
     * @param	string          id 	    Row id to update
     * @param	SuperBaseData   upsert 	Data to update in row
     * @param	boolean     upsert 	Auto create if not exist
     * @todo    Implement upsert functionality
     * @return 	void
     */
    static async updateRow(id:string, updated_data:SuperBaseData, upsert = false): Promise<Faculty> {
        const cls = FacultyModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = FacultyModel.handleAllDatabaseResponse<Faculty[]>(
            await FacultyModel.db
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
        const cls = FacultyModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = FacultyModel.handleAllDatabaseResponse(
            await FacultyModel.db
            .from(cls)
            .delete()
            .eq(index, value)
        );
        

        if (error) throw error;
    }


    /**
     * Delete instance from database
     * @param	FacultyModel 	instance	Instance to delete
     * @return 	void
     */
    static async delete(instance: FacultyModel): Promise<void> {
        
        await FacultyModel.deleteRow(
            FacultyProps.ID,
            instance.id
        )
    }

    
}


export default FacultyModel;
