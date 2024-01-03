
import { BucketType } from '@/types/superbase';
import BucketManager from './bucket';
import FacultyModel from './models/faculty.model';
import CourseModel from './models/course.model';
import DepartmentModel from './models/department.model';
import MaterialModel from './models/material.model';
import UserModel from './models/user.model';




export const setupSuperbase = ()=> BucketManager.setupBucket({bucket: BucketType.RESOURCES});


class SuperBase {

    // static asset = AssetModel;
    static user = UserModel;
    static faculty = FacultyModel;
    static course = CourseModel;
    static department = DepartmentModel;
    static material = MaterialModel;

}

export default SuperBase;
