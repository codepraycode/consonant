
import { BucketType } from '@/types/superbase';
import BucketManager from './bucket';
import AssetModel from './models/asset.model';
import FacultyModel from './models/faculty.model';
import CourseModel from './models/course.model';
import DepartmentModel from './models/department.model';
import MaterialModel from './models/material.model';




export const setupSuperbase = ()=> BucketManager.setupBucket({bucket: BucketType.RESOURCES});


class SuperBase {
    
    static bucket =  new BucketManager();

    static asset = AssetModel;
    static faculty = FacultyModel;
    static course = CourseModel;
    static department = DepartmentModel;
    static material = MaterialModel;

}

export default SuperBase;
