
import { BucketType } from '@/types/superbase';
import BucketManager from './bucket';
import AssetModel from './models/asset.model';




export const setupSuperbase = ()=> BucketManager.setupBucket({bucket: BucketType.RESOURCES});


class SuperBase {
    
    static bucket =  new BucketManager();

    static asset = AssetModel;

}

export default SuperBase;
