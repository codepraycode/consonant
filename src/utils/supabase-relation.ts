import { supabase } from "@/lib/superbase";
import { QueryFilter } from "@/types/superbase";



export class ManyToManyManger<T> {

    constructor(private model: any, private target:any) {

        if (!this.model.table || !this.target.table) throw new Error("Each table must contain 'table'")
    }


    /* =============== Setters and Getters ================ */


    private prefix_query(query:string) {
        return this.target.table + '.' + query
    }


    private async runFetch(filter?:QueryFilter) {

        const normalFetch = () => supabase
            .from(this.model.tb)
            .select(`${this.target.table}(*)`)
            .eq('id', this.model.id)

        const filterFetch = () => supabase
        .from(this.model.tb)
        .select(`${this.target.table}(*)`)
        .eq('id', this.model.id)
        .eq(
            this.prefix_query(filter!.where),
            filter!.is
        )


        if (filter) return filterFetch();

        return normalFetch();
    }

    async fetch<R=T>() {

        const {data, error} = await this.runFetch();
        

        if (error) throw error;

        if (data.length < 1) return [];


        return data[0][this.target.table] as R;
    
    }

    async fetchOne(filter: QueryFilter) {

        const {data, error} = await this.runFetch(filter);
        

        if (error) throw error;

        if (data.length < 1) return null;

        const paylod = data[0][this.target.table]

        if (paylod.length < 1) throw({
            code: 'NOT FOUND',
            message: ''
        });

        return paylod[0] as T
    }
}