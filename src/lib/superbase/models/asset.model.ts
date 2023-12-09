import { BaseModel } from "@/helpers/superbase.helper";
import { Asset } from "@/types/superbase";



class AssetModel extends BaseModel implements Asset {
    path: string;
    fullPath: string;
    access: string;
    download: string;


    constructor(instanceData: Asset){
        const {
            id,
            created_at,
            updated_at,

            path, 
            access,
            fullPath,
            download
        } = instanceData;


        super()

        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;


        this.path = path;
        this.access = access;
        this.fullPath = fullPath;
        this.download = download
    }
}


export default AssetModel;