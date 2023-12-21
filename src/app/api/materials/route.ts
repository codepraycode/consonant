import ServerResponse from "@/helpers/response.helper";
import SuperBase from "@/lib/superbase";
import { NextRequest, NextResponse } from "next/server";
import contents from '@/data/contents.json';
// import { SuperBaseStorageError } from "@/helpers/superbase.helper";
import logger from "@/utils/logger";
import { Material, SupaBaseReqError, SuperBaseStorageErrorTypes } from "@/types/superbase";
import { PostMaterialDTO } from "@/utils/dto";
import MaterialModel from "@/lib/superbase/models/material.model";




// TODO: implement automatic error handler for all routes
export async function GET(req: NextRequest, res:NextResponse) {

    const departments = await SuperBase.material.fetch({});

    return ServerResponse.ok(departments)
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

        courseData = await SuperBase.course.fetchById(course as string);
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

        material = await SuperBase.material.insert(validData)
        
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

