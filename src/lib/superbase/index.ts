
import { BucketType } from '@/types/superbase';
import BucketManager from './bucket';




export const setupSuperbase = ()=> BucketManager.setupBucket({bucket: BucketType.RESOURCES});


class SuperBase {
    
    static bucket =  new BucketManager();

}

export default SuperBase;
