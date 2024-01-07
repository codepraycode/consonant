import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import CourseModel from "@/lib/superbase/models/course.model";
import { SupaBaseReqError } from "@/types/superbase";
import { CourseTbRow } from "@/types/superbase/table";
import logger from "@/utils/logger";



export async function GET() {

    /* 
        This covers get for admin
    */

    let courses:CourseTbRow[]

    try {

        courses = await CourseModel.fetchAll();

    } catch (error) {
        logger.error("FETCH COURSE BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;


        const errorObj = {
            code: err.code || "NOT FOUND",
            message: err.message || 'Could not find course'
        }

        return ServerResponse.error(errorObj, StatusCodes.SERVER_ERROR)
    }

    return ServerResponse.ok(courses)
}
