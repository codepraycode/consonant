
import { BucketType } from '@/types/superbase';
import BucketManager from './bucket';
import AssetModel from './models/asset.model';
import FacultyModel from './models/faculty.model';




export const setupSuperbase = ()=> BucketManager.setupBucket({bucket: BucketType.RESOURCES});


class SuperBase {
    
    static bucket =  new BucketManager();

    static asset = AssetModel;
    static faculty = FacultyModel;

}

export default SuperBase;
