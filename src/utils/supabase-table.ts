import { supabase } from "@/lib/superbase";
import { QueryFilter, SupaBaseDatbaseTableColumns, SupaBaseTableNames } from "@/types/superbase";
import { MaterialTbRow } from "@/types/superbase/table";
import { handleDatabaseReponse } from "@/utils/supabase-handlers";


type SupabaseData = Record<string, any>;



/**
 * Inserts new data into database
 * @param	object 	new_data	Row data
 * @return  FacultyModel	   Instance with newly created data
 */
export async function insertDbRow<T=SupabaseData>(table:SupaBaseTableNames, doc: T): Promise<T> {

    const { data, error } =  handleDatabaseReponse(
        await supabase
        .from(table)
        .upsert(doc)
        .select()
    );
    

    if (error) throw error;

    // console.log(data)

    // if (model) new model.createInstance(data[0]);
    return data[0] as T;
}


/**
 * Fetch specific row from database by Id
 * @param	string 	id	frow id
 * @return a new instance of FacultyModel or null if data does not exist
 */
export async function fetchDbRow<T=SupabaseData>(
    table:SupaBaseTableNames,
    // column:SupaBaseDatbaseTableColumns = SupaBaseDatbaseTableColumns.ALL,
    filter:QueryFilter): Promise<T | null> {
    
        const { data, error } = handleDatabaseReponse(
        await supabase
        .from(table)
        .select()
        .eq(filter.where, filter.is)
    );
    

    if (error) throw error;

    // console.log(data)
    if (data.length < 1) return null;
    return data[0] as T;
}


/**
 * Fetch data from database
 * @param	string 	column  table columns seperated by comma
 * @return 	A list of Facultys
 */
export async function fetchDbRows<T=SupabaseData>(table:SupaBaseTableNames, column = SupaBaseDatbaseTableColumns): Promise<T[]> {
    const { data, error } = handleDatabaseReponse(
        await supabase
        .from(table)
        .select(column)
    );
    

    if (error) throw error;

    return data as T[];
}



export async function updateDbRow<T=SupabaseData>(
    table:SupaBaseTableNames,
    row_id:string,
    doc: T,
    upsert: boolean = false
    ): Promise<T> {
    const { data, error } = handleDatabaseReponse(
        await supabase
        .from(table)
        .update(doc)
        .eq("id", row_id)
        .select()
    );
    

    if (error) throw error;

    // console.log(data)
    // return data;
    // return null

    return data[0] as T;
}


/**
 * Delete row from database
 * @param	string 	index	Value to use to delete row
 * @param	string 	value	value to compare to delete
 * @return 	void
 */
export async function deleteDbRow(table:SupaBaseTableNames, index:string, value:string): Promise<void> {

    const { data, error } = handleDatabaseReponse(
        await supabase
        .from(table)
        .delete()
        .eq(index, value)
    );
    

    if (error) throw error;
}


/**
 * Fetch data from database
 * @param	string 	column  table columns seperated by comma
 * @return 	A list of Materials
 */
export async function searchMaterials(field: string, query: string): Promise<MaterialTbRow[]> {
    const table = SupaBaseTableNames.MATERIALS
    // const columnName = column || '*'
    const { data, error } = handleDatabaseReponse(
        await supabase
        .from(table)
        .select()
        .textSearch(field, query)
    );
    

    if (error) throw error;

    return data as MaterialTbRow[];
}


export abstract class BaseModel {
    abstract id: string
    abstract created_at: string | Date;
    updated_at: string | Date | undefined;

    exclude_on_update: string[] = [
        'created_at', 'updated_at', 'id'
    ]
    abstract table: SupaBaseTableNames;

    constructor() {
        // if(this.constructor === BaseModel) {
        //     throw new Error("Abstract class cannot be instantiated.");
        // }   
    }



    get data() {
        return this.getInstanceData();
    }

    abstract updateInstance(updated_data: any): void;
    abstract getInstanceData(exclude?: boolean): any;
    
    async update(): Promise<void> {
        // const cls = FacultyModel._cls;

        const updated_data = this.getInstanceData(true)

        const new_data = await updateDbRow<this>(
            this.table, this.id, updated_data
        )

        this.updateInstance(new_data)
    }

}