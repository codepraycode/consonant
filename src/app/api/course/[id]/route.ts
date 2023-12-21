import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { NextRequest } from "next/server";
import contents from '@/data/contents.json';
import { SupaBaseReqError, SuperBaseStorageErrorTypes } from "@/types/superbase";
import SuperBase from "@/lib/superbase";
import MaterialModel from "@/lib/superbase/models/material.model";
import logger from "@/utils/logger";
import CourseModel from "@/lib/superbase/models/course.model";


type req = { params: { id: string } };

export async function GET(req: NextRequest, {params}: req) {
    const {id} = params


    if (!id) return ServerResponse.error({
        code: "BADREQUEST",
        message: 'Course id is required'
    }, StatusCodes.BAD_REQUEST)


    let course:CourseModel

    try {

        course = await SuperBase.course.fetchById(id);
    } catch (error) {
        logger.error("FETCH COURSE BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;

        return ServerResponse.error({
            code: err.code || "NOT FOUND",
            message: err.message || 'Could not find course'
        }, StatusCodes.SERVER_ERROR)
    }
    

    return ServerResponse.ok(course.data)
}