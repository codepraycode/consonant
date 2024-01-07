
import { BucketType } from '@/types/superbase';
import BucketManager from './bucket';
import FacultyModel from './models/faculty.model';
import CourseModel from './models/course.model';
import DepartmentModel from './models/department.model';
import MaterialModel from './models/material.model';


import { createClient } from "@supabase/supabase-js";
import axios from "axios";



const _loadSupabase = async () =>{


    if (!global._supabaseInstance) {
        // console.log("Nothing")

        const {data:envs} = await axios.get('/api/env');
    
        const {SUPERBASE_API_KEY, SUPERBASE_URL} = envs;
    
        if (!SUPERBASE_API_KEY) throw new Error("SUPERBASE api key is required!!");
    
        global._supabaseInstance = createClient(SUPERBASE_URL, SUPERBASE_API_KEY,{
            // auth: {
            //     autoRefreshToken: false,
            //     persistSession: false,
            //     detectSessionInUrl: false
            // }
        });
    }

    // console.log("Something", global._supabaseInstance)
    return global._supabaseInstance;
}


export const loadSupabase = async()=>{

    if(!global._supabaseInstance) await _loadSupabase();

    return;
};



// export const supabase = global._supabaseInstance;


export const setupSuperbase = async ()=> BucketManager.setupBucket({bucket: BucketType.RESOURCES});


class SuperBase {

    // static asset = AssetModel;
    static faculty = FacultyModel;
    static course = CourseModel;
    static department = DepartmentModel;
    static material = MaterialModel;

}

export default SuperBase;
