import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import SuperBase from "@/lib/superbase";
import { SupaBaseReqError } from "@/types/superbase";
import { CourseTbRow } from "@/types/superbase/table";
import logger from "@/utils/logger";



export async function GET() {

    /* 
        This covers get for admin
    */

    let courses:CourseTbRow[]

    try {

        courses = await SuperBase.course.fetch({});

    } catch (error) {
        logger.error("FETCH COURSE BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;

        return ServerResponse.error({
            code: err.code || "NOT FOUND",
            message: err.message || 'Could not find course'
        }, StatusCodes.SERVER_ERROR)
    }
    

    return ServerResponse.ok(courses)
}
