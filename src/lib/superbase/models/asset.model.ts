import { BaseModel } from "@/helpers/superbase.helper";
import { Asset, QueryFilter, SuperBaseData, SuperBaseDatbaseNames, SuperBaseDatbaseTableColumns } from "@/types/superbase";
import logger from "@/utils/logger";



class AssetModel extends BaseModel implements Asset {
    path: string;
    fullPath: string;
    access: string;
    download: string;


    static _cls: SuperBaseDatbaseNames = SuperBaseDatbaseNames.ASSET;


    constructor(instanceData: Asset){        

        super();

        const {
            id,
            created_at,
            updated_at,

            path, 
            access,
            fullPath,
            download
        } = instanceData;

        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;


        this.path = path;
        this.access = access;
        this.fullPath = fullPath;
        this.download = download

    }


    static createInstance(instanceData: Asset): AssetModel {
        return new AssetModel(instanceData);
    }

    static async fetch(column: string = SuperBaseDatbaseTableColumns.ASSET): Promise<SuperBaseData[]> {
        const cls = AssetModel._cls;
        // const columnName = column || '*'

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = AssetModel.handleAllDatabaseResponse(
            await AssetModel.db
            .from(cls)
            .select(column)
        );
        

        if (error) throw error;

        return data;
    }


    static async fetchOne(filter:QueryFilter, column: string = SuperBaseDatbaseTableColumns.ASSET) {
        const cls = AssetModel._cls;
        const columnName = column || '*'

        logger.debug("FETCH FROM COLUMN", columnName, filter)
        const { data, error } = AssetModel.handleAllDatabaseResponse<SuperBaseData[]>(
            await AssetModel.db
            .from(cls)
            .select(column)
            .eq(filter.at, filter.is)
        );
        

        if (error) throw error;

        // console.log(data)
        if (data.length < 1) return null;
        return data[0];
    }

    static async create(new_data: SuperBaseData | SuperBaseData[]) {
        const cls = AssetModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = AssetModel.handleAllDatabaseResponse(
            await AssetModel.db
            .from(cls)
            .insert(new_data)
        );
        

        if (error) throw error;

        // console.log(data)
        return data;
    }

    static async update(id:string, updated_data: SuperBaseData, upsert = false) {
        const cls = AssetModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = AssetModel.handleAllDatabaseResponse(
            await AssetModel.db
            .from(cls)
            .update(updated_data)
            .eq("id", id)
        );
        

        if (error) throw error;

        // console.log(data)
        return data;
    }

    static async delete(index:string, value:string) {
        const cls = AssetModel._cls;

        // logger.debug("FETCH FROM COLUMN", columnName)
        const { data, error } = AssetModel.handleAllDatabaseResponse(
            await AssetModel.db
            .from(cls)
            .delete()
            .eq(index, value)
        );
        

        if (error) throw error;

        // console.log(data)
        return data;
    }

    static async deleteById(id:string) {
        return AssetModel.delete('id', id)
    }
}


export default AssetModel;