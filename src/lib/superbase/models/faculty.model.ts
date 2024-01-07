import { FacultyTbRow } from "@/types/superbase/table";
import logger from "@/utils/logger";
import { BaseModel } from "../../../utils/supabase-table";
import { SupaBaseTableNames } from "@/types/superbase";


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



class FacultyModel extends BaseModel implements FacultyTbRow{

    /* =============== Class attributes ================ */
    id: string;
    created_at: string | Date;
    updated_at: string | Date;
    name: string;
    short: string;


    exclude_on_update = [
        'created_at', 'updated_at', 'id'
    ]


    /* =============== Static attributes ================ */
    table = SupaBaseTableNames.FACULTY;


    static get table() {
        return SupaBaseTableNames.FACULTY
    }


    /* =============== Constructor ================ */
    constructor(instanceData: FacultyTbRow){
        super()

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

    updateInstance(updated_data: FacultyTbRow) {

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



    getInstanceData(exclude: boolean = false): FacultyTbRow {

        const data:Record<string, any> = {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            name: this.name,
            short: this.short
        }

        if (exclude) this.exclude_on_update.forEach((field)=>{
            
            delete data[field]
        })

        return data as FacultyTbRow;
    }

}


export default FacultyModel;
