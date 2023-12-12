import { BaseModel } from "@/helpers/superbase.helper";
import { Department, FetchParam,
    SuperBaseData, SuperBaseDatbaseNames,
    SuperBaseDatbaseTableColumns } from "@/types/superbase";
import logger from "@/utils/logger";
import FacultyModel from "./faculty.model";


/**
 * Property enumerator, just to efficiently compare values
 * and avoid errors in usage or comparison
 */
enum DepartmentProps {
    NAME = 'name',
    SHORT = 'short',
    // Meta data
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}



class DepartmentModel extends BaseModel implements Department {

    /* =============== Class attributes ================ */
    name: string;
    short: string;
    // faculty?: Faculty;
    private data: Department | null

    update_excludes: DepartmentProps[] = [
        DepartmentProps.ID, 
        DepartmentProps.CREATED_AT,
        DepartmentProps.UPDATED_AT
    ]


    /* =============== Static attributes ================ */
    static _cls: SuperBaseDatbaseNames = SuperBaseDatbaseNames.DEPARTMENT;


    /* =============== Constructor ================ */
    constructor(instanceData: Department){

        super();


        this.data = instanceData;

        const {
            id,
            created_at,
            updated_at,

            name, 
            short,
        } = instanceData;

        if (!id) {
            const msg = "instanceData must be related to database row, missing id"
            logger.error("Department MODEL INITIALIZATION ERROR::", msg)

            throw new Error(msg)
        }

        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;


        this.name = name;
        this.short = short;
    }


    get faculty() {
        if (!this.data?.faculty) return undefined

        return new FacultyModel(this.data.faculty);
    }

    async load_courses () {

        if (!this.data) return []

        if (this.data.courses) return this.data.courses

        // Resolve courses

        const cls = DepartmentModel._cls;

        const resp = await this.resolve(cls, `
            course (
                id,
                title,
                code
            )
        `, {key:'id', value:this.id})


        this.data.courses = resp;

        return resp;
    }


    /* =============== Private Methods ================ */

    private updateInstance(updated_data: SuperBaseData) {

        Object.entries(updated_data).forEach(([field, value])=>{
            
            switch (field) {
                case DepartmentProps.NAME:
                    this.name = value;
                    break
                case DepartmentProps.SHORT:
                    this.short = value;
                    break

                case DepartmentProps.ID:
                    this.id = value;
                    break
                case DepartmentProps.CREATED_AT:
                    this.created_at = value;
                    break
                case DepartmentProps.UPDATED_AT:
                    this.updated_at = value;
                    break
                default:
                    logger.error("Department INSTANCE UPDATE UNKNOWN FIELD", field);
                    throw new Error("Unknown field = " + field)
            }
        })
    }



    private getInstanceData(exclude?: DepartmentProps[]): Department {

        const data = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            name: this.name,
            short: this.short,
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
        // const cls = DepartmentModel._cls;

        const instance_data = this.getInstanceData(this.update_excludes)

        const new_data = await DepartmentModel.updateRow(this.id, instance_data)

        this.updateInstance(new_data)
    }

    /* =============== Static Methods ================ */
    /**
     * Creates instance from data
     * @param	Department 	instanceData	Data from database
     * @return  DepartmentModel      An instance of DepartmentModel 	
     */
    static createInstance(instanceData: Department): DepartmentModel {
        return new DepartmentModel(instanceData);
    }


    /**
     * Fetch data from database
     * @param	string 	column  table columns seperated by comma
     * @return 	A list of Departments
     */
    static async fetch({column = SuperBaseDatbaseTableColumns.DEPARTMENT, deep = true}): Promise<Department[]> {
        const cls = DepartmentModel._cls;
        // const columnName = column || '*'

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = DepartmentModel.handleAllDatabaseResponse<Department[]>(
            await DepartmentModel.db
            .from(cls)
            .select(`
                ${column}
                ${!deep ? '': `, faculty( ${SuperBaseDatbaseTableColumns.FACULTY} )`}
            `)
        );
        

        if (error) throw error;

        return data;
    }


    /**
     * Fetch specific row from database
     * @param	QueryFilter 	filter	filters to search by
     * @return a new instance of DepartmentModel or null if data does not exist
     */
    static async fetchOne({
        filter,
        deep = true,
        column = SuperBaseDatbaseTableColumns.DEPARTMENT,
    }: FetchParam ): Promise<DepartmentModel | null> {
        const cls = DepartmentModel._cls;
        // const columnName = column || '*'

        logger.debug("FETCH FROM COLUMN", column, filter)
        const { data, error } = DepartmentModel.handleAllDatabaseResponse<SuperBaseData[]>(
            await DepartmentModel.db
            .from(cls)
            .select(`
                ${column}
                ${!deep ? '': `, faculty( ${SuperBaseDatbaseTableColumns.FACULTY} )`}
            `)
            .eq(filter.at, filter.is)
        );
        

        if (error) throw error;

        // console.log(data)
        if (data.length < 1) return null;
        return DepartmentModel.createInstance(data[0] as Department);
    }


    /**
     * Fetch specific row from database by Id
     * @param	string 	id	frow id
     * @return a new instance of DepartmentModel or null if data does not exist
     */
    static async fetchById(id: string) {
        return DepartmentModel.fetchOne({
            filter: {
                at: DepartmentProps.ID,
                is: id
            }
        })
    }


    /**
     * Inserts new data into database
     * @param	object 	new_data	Row data
     * @return  DepartmentModel	   Instance with newly created data
     */
    static async insert(new_data: SuperBaseData): Promise<DepartmentModel> {
        const cls = DepartmentModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = DepartmentModel.handleAllDatabaseResponse(
            await DepartmentModel.db
            .from(cls)
            .upsert(new_data)
            .select()
        );
        

        if (error) throw error;

        // console.log(data)
        return DepartmentModel.createInstance(data[0]);
    }


    /**
     * Synchronize instance data with database
     * @param	string          id 	    Row id to update
     * @param	SuperBaseData   upsert 	Data to update in row
     * @param	boolean     upsert 	Auto create if not exist
     * @todo    Implement upsert functionality
     * @return 	void
     */
    static async updateRow(id:string, updated_data:SuperBaseData, upsert = false): Promise<Department> {
        const cls = DepartmentModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = DepartmentModel.handleAllDatabaseResponse<Department[]>(
            await DepartmentModel.db
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
        const cls = DepartmentModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = DepartmentModel.handleAllDatabaseResponse(
            await DepartmentModel.db
            .from(cls)
            .delete()
            .eq(index, value)
        );
        

        if (error) throw error;
    }


    /**
     * Delete instance from database
     * @param	DepartmentModel 	instance	Instance to delete
     * @return 	void
     */
    static async delete(instance: DepartmentModel): Promise<void> {
        
        await DepartmentModel.deleteRow(
            DepartmentProps.ID,
            instance.id
        )
    }

    
}


export default DepartmentModel;
