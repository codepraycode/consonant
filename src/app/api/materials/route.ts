import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/utils/logger";
import { SupaBaseReqError, SuperBaseStorageErrorTypes } from "@/types/superbase";
import { PostMaterialDTO } from "@/utils/dto";
import MaterialModel from "@/lib/superbase/models/material.model";
import { MaterialTbRow } from "@/types/superbase/table";
import CourseModel from "@/lib/superbase/models/course.model";
import { getUser } from "@/helpers/auth.helper";
import { supabase } from "@/lib/superbase";




export async function GET(req: NextRequest, res:NextResponse) {

    /* 
        This covers get for admin
    */


    const headers = req.headers;

    const isAdmin = headers.has('admin-id');


    let materials:MaterialTbRow[], userId: string | undefined;


    if (isAdmin) {
        userId = headers.get('admin-id') as (string | undefined);
        console.log("FETCHING ADMIN FILES")
    }
    
    
    try {
        materials = await MaterialModel.fetchAll(userId);
    } catch (error) {
        logger.error("FETCH MATERIAL BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;

        return ServerResponse.error({
            code: err.code || "SERVER ERROR",
            message: err.message || 'Could not load materials'
        }, StatusCodes.SERVER_ERROR)
    }
    

    return ServerResponse.ok(materials)
}




export async function POST(req: NextRequest) {

    const validator = new PostMaterialDTO();

    const body = await req.formData();

    // const validation_issues = validateNewAsset(body);

    const {issues, validData} = validator.validateFormDataFieldsPresent(body);

    if (issues) {
        logger.error("CREATE MATERIALS::DTO VALIDATION ERROR::", issues);
        return ServerResponse.error(issues)
    }

    const {course} = validData;

    // Validate if course is valid
    let courseResolveError = null, courseData;
    try {

        courseData = await CourseModel.fetchById(course as string);
    } catch(err) {
        courseResolveError = err;
    }

    if (!courseData || courseResolveError) {
        logger.error("CREATE MATERIALS::INVALID COURSE ENTRY::", course);
        return ServerResponse.error({
            code: SuperBaseStorageErrorTypes.DEFAULT,
            message: "Could not resolve course entry",
        })
    }


    let material:MaterialModel;
    try {

        material = await MaterialModel.save(validData)
        
    } catch (error) {
        logger.error("ERROR CREATING MATERIALS", error);
        const err = error as SupaBaseReqError;
        return ServerResponse.error({
            code: err?.code || SuperBaseStorageErrorTypes.DEFAULT,
            message: err.message,
        })
    }
    return ServerResponse.created(material.data);

}

