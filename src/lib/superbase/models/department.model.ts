import { Department, FetchParam,
    SupaBaseTableNames,
    SuperBaseData } from "@/types/superbase";
import logger from "@/utils/logger";
import FacultyModel from "./faculty.model";
import { BaseModel } from "./base";
import { DepartmentTbRow } from "@/types/superbase/table";
// import { ManyToManyManger } from "./relator";


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



class DepartmentModel extends BaseModel implements DepartmentTbRow {

    /* =============== Class attributes ================ */
    id: string;
    created_at: string | Date;
    updated_at: string | Date;
    faculty: string;

    name: string;
    short: string;


    table =  SupaBaseTableNames.DEPARTMENT;


    /* =============== Constructor ================ */
    constructor(instanceData: DepartmentTbRow){

        super();

        const {
            id,
            created_at,
            updated_at,

            name, 
            short,
            faculty
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
        this.faculty = faculty
    }


    // get faculty() {
    //     if (!this.data?.faculty) return ''

    //     return new FacultyModel(this.data.faculty);
    // }



    /* =============== Private Methods ================ */

    updateInstance(updated_data: DepartmentTbRow) {

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



    getInstanceData(exclude = false ): DepartmentTbRow {

        const data: Record<string, any> = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            name: this.name,
            short: this.short,
        }

        if (exclude) this.exclude_on_update.forEach((field)=>{
            
            delete data[field]
        })

        return data as DepartmentTbRow;
    }
    
}


export default DepartmentModel;
