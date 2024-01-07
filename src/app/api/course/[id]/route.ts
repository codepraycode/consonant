import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { NextRequest } from "next/server";
import { SupaBaseReqError } from "@/types/superbase";
import logger from "@/utils/logger";
import CourseModel from "@/lib/superbase/models/course.model";


type req = { params: { id: string } };

export async function GET(req: NextRequest, {params}: req) {
    const {id} = params


    if (!id) return ServerResponse.error({
        code: "BADREQUEST",
        message: 'Course id is required'
    }, StatusCodes.BAD_REQUEST)


    let course:CourseModel | null;

    try {

        course = await CourseModel.fetchById(id);
        // console.log(departments)
    } catch (error) {
        logger.error("FETCH COURSE BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;

        const errorObj = {
            code: err.code || "SERVER ERROR",
            message: err.message || 'Unable to find course',
        }

        return ServerResponse.error(errorObj, StatusCodes.SERVER_ERROR);
    }


    if (!course) {
        return ServerResponse.error({
            code: "NOT FOUND",
            message: 'Could not find course'
        }, StatusCodes.NOT_FOUND)
    }
    

    // try {

    //     departments = await course.departments.fetch<DepartmentTbRow[]>();
    // } catch (error) {
    //     logger.error("FETCH C DEPARTMENT ::ERROR OCCURED", error);
    //     const err = error as SupaBaseReqError;

    //     const errorObj = {
    //         code: err.code || "SERVER ERROR",
    //         message: err.message || 'Unable to find course',
    //     }

    //     return ServerResponse.error(errorObj, StatusCodes.SERVER_ERROR);
    // }


    
    

    // const payload = {
    //     ...course.data,
    //     departments
    // }

    return ServerResponse.ok(course.data);
}