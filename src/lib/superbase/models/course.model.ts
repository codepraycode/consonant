import { BaseModel } from "@/helpers/superbase.helper";
import { Course, FetchParam, QueryFilter,
    SuperBaseData, SuperBaseDatbaseNames,
    SuperBaseDatbaseTableColumns } from "@/types/superbase";
import logger from "@/utils/logger";


/**
 * Property enumerator, just to efficiently compare values
 * and avoid errors in usage or comparison
 */
enum CourseProps {
    NAME = 'name',
    CODE = 'code',
    TITLE = 'title',
    // DEPARTMENTS = 'departments',
    // Meta data
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}



class CourseModel extends BaseModel implements Course {

    /* =============== Class attributes ================ */
    name: string;
    code: string;
    title?: string | undefined;
    // departments?: Department[] | undefined;


    update_excludes: CourseProps[] = [
        CourseProps.ID, 
        CourseProps.CREATED_AT,
        CourseProps.UPDATED_AT
    ]


    /* =============== Static attributes ================ */
    // static _cls: SuperBaseDatbaseNames = SuperBaseDatbaseNames.COURSE;
    static tb: SuperBaseDatbaseNames = SuperBaseDatbaseNames.COURSE;


    /* =============== Constructor ================ */
    constructor(instanceData: Course){        

        super();

        const {
            id,
            created_at,
            updated_at,

            name, 
            code,
            title,
            // departments:departments_id
        } = instanceData;

        if (!id) {
            const msg = "instanceData must be related to database row, missing id"
            logger.error("COURSE MODEL INITIALIZATION ERROR::", msg)

            throw new Error(msg)
        }

        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;


        this.name = name as string;
        this.code = code as string;
        this.title = title as string;
        
    }

    get tb() {
        return CourseModel.tb
    }


    /* =============== Private Methods ================ */

    private updateInstance(updated_data: SuperBaseData) {

        Object.entries(updated_data).forEach(([field, value])=>{
            
            switch (field) {
                case CourseProps.NAME:
                    this.name = value;
                    break
                case CourseProps.CODE:
                    this.code = value;
                    break
                case CourseProps.TITLE:
                    this.title = value;
                    break

                case CourseProps.ID:
                    this.id = value;
                    break
                case CourseProps.CREATED_AT:
                    this.created_at = value;
                    break
                case CourseProps.UPDATED_AT:
                    this.updated_at = value;
                    break
                default:
                    logger.error("COURSE INSTANCE UPDATE UNKNOWN FIELD", field);
                    throw new Error("Unknown field = " + field)
            }
        })
    }



    private getInstanceData(exclude?: CourseProps[]): Course {

        const data = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            name: this.name,
            code: this.code,
            title: this.title
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
        // const cls = CourseModel._cls;

        const instance_data = this.getInstanceData(this.update_excludes)

        const new_data = await CourseModel.updateRow(this.id, instance_data)

        this.updateInstance(new_data)
    }

    /* =============== Static Methods ================ */
    /**
     * Creates instance from data
     * @param	Course 	instanceData	Data from database
     * @return  CourseModel      An instance of CourseModel 	
     */
    static createInstance(instanceData: Course): CourseModel {
        console.log(instanceData)
        return new CourseModel(instanceData);
    }


    /**
     * Fetch data from database
     * @param	string 	column  table columns seperated by comma
     * @return 	A list of Courses
     */
    static async fetch({column = SuperBaseDatbaseTableColumns.COURSE}): Promise<Course[]> {
        const cls = this.tb;
        // const columnName = column || '*'

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = CourseModel.handleAllDatabaseResponse<Course[]>(
            await CourseModel.db
            .from(cls)
            .select(column)
        );
        

        if (error) throw error;

        return data;
    }


    /**
     * Fetch specific row from database
     * @param	QueryFilter 	filter	filters to search by
     * @return a new instance of CourseModel or null if data does not exist
     */
    static async fetchOne({
        filter,
        column = SuperBaseDatbaseTableColumns.COURSE
    }: FetchParam): Promise<CourseModel | null> {
        const cls = this.tb;
        // const columnName = column || '*'

        logger.debug("FETCH FROM COLUMN", column, filter)
        const { data, error } = CourseModel.handleAllDatabaseResponse<SuperBaseData[]>(
            await CourseModel.db
            .from(cls)
            .select(column)
            .eq(filter.at, filter.is)
        );
        

        if (error) throw error;

        // console.log(data)
        if (data.length < 1) return null;
        return CourseModel.createInstance(data[0] as Course);
    }


    /**
     * Fetch specific row from database by Id
     * @param	string 	id	frow id
     * @return a new instance of CourseModel or null if data does not exist
     */
    static async fetchById(id: string) {
        return CourseModel.fetchOne({
            filter: {
                at: CourseProps.ID,
                is: id
            }
        })
    }


    /**
     * Inserts new data into database
     * @param	object 	new_data	Row data
     * @return  CourseModel	   Instance with newly created data
     */
    static async insert(new_data: SuperBaseData): Promise<CourseModel> {
        const cls = this.tb;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = CourseModel.handleAllDatabaseResponse(
            await CourseModel.db
            .from(cls)
            .upsert(new_data)
            .select()
        );
        

        if (error) throw error;

        // console.log(data)
        return CourseModel.createInstance(data[0]);
    }


    /**
     * Synchronize instance data with database
     * @param	string          id 	    Row id to update
     * @param	SuperBaseData   upsert 	Data to update in row
     * @param	boolean     upsert 	Auto create if not exist
     * @todo    Implement upsert functionality
     * @return 	void
     */
    static async updateRow(id:string, updated_data:SuperBaseData, upsert = false): Promise<Course> {
        const cls = this.tb;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = CourseModel.handleAllDatabaseResponse<Course[]>(
            await CourseModel.db
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
        const cls = this.tb;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = CourseModel.handleAllDatabaseResponse(
            await CourseModel.db
            .from(cls)
            .delete()
            .eq(index, value)
        );
        

        if (error) throw error;
    }


    /**
     * Delete instance from database
     * @param	CourseModel 	instance	Instance to delete
     * @return 	void
     */
    static async delete(instance: CourseModel): Promise<void> {
        
        await CourseModel.deleteRow(
            CourseProps.ID,
            instance.id
        )
    }

    
}


export default CourseModel;
