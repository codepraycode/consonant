
import { SupaBaseTableNames } from "@/types/superbase";
import { CourseTbRow, DepartmentTbRow } from "@/types/superbase/table";
import logger from "@/utils/logger";
import DepartmentModel from "./department.model";
import { BaseModel } from "../../../utils/supabase-table";
import { ManyToManyManger } from "@/utils/supabase-relation";


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



class CourseModel extends BaseModel implements CourseTbRow {

    /* =============== Class attributes ================ */
    id: string;
    name: string;
    code: string;
    title: string;
    created_at: string | Date;
    updated_at: string | Date;
    // departments?: Department[] | undefined;


    /* =============== Static attributes ================ */
    // static _cls: SuperBaseDatbaseNames = SuperBaseDatbaseNames.COURSE;
    departments = new ManyToManyManger<DepartmentTbRow>(
        this,
        DepartmentModel
    )
    
    table = SupaBaseTableNames.FACULTY;

    static get table() {
        return SupaBaseTableNames.FACULTY
    }

    /* =============== Constructor ================ */
    constructor(instanceData: CourseTbRow){        

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


    /* =============== Private Methods ================ */

    updateInstance(updated_data: CourseTbRow) {

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



    getInstanceData(exclude = false): CourseTbRow {

        const data:Record<string, any> = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            name: this.name,
            code: this.code,
            title: this.title
        }

        if (exclude) this.exclude_on_update.forEach((field)=>{
            
            delete data[field]
        })

        return data as CourseTbRow
    }



    
}


export default CourseModel;
