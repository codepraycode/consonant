/* A relationship relator
 Connects a model to another model
 For many to many relationships
 */

import { SuperbaseMeta } from "@/helpers/superbase.helper";
import { QueryFilter } from "@/types/superbase";


class ManyToManyManger<T> extends SuperbaseMeta {

    constructor(private model: any, private target:any) {
        super()

        if (!this.model.tb || !this.target.tb) throw new Error("Each table must contain 'tb'")
    }


    /* =============== Setters and Getters ================ */


    private prefix_query(query:string) {
        return this.target.tb + '.' + query
    }


    private async runFetch(filter?:QueryFilter) {

        const normalFetch = () => SuperbaseMeta.db
            .from(this.model.tb)
            .select(`${this.target.tb}(*)`)
            .eq('id', this.model.id)

        const filterFetch = () => SuperbaseMeta.db
        .from(this.model.tb)
        .select(`${this.target.tb}(*)`)
        .eq('id', this.model.id)
        .eq(
            this.prefix_query(filter!.at),
            filter!.is
        )


        if (filter) return filterFetch();

        return normalFetch();
    }

    async fetch<R=T>() {

        const {data, error} = await this.runFetch();
        

        if (error) throw error;

        if (data.length < 1) return [];


        return data[0][this.target.tb] as R;
    
    }

    async fetchOne(filter: QueryFilter) {

        const {data, error} = await this.runFetch(filter);
        

        if (error) throw error;

        if (data.length < 1) return null;

        const paylod = data[0][this.target.tb]

        if (paylod.length < 1) throw({
            code: 'NOT FOUND',
            message: ''
        });

        return paylod[0] as T
    }
}


export { ManyToManyManger }