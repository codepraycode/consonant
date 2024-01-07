import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { NextRequest } from "next/server";
import contents from '@/data/contents.json';
import { SupaBaseReqError, SuperBaseStorageErrorTypes } from "@/types/superbase";
import SuperBase from "@/lib/superbase";
import MaterialModel from "@/lib/superbase/models/material.model";
import logger from "@/utils/logger";
import CourseModel from "@/lib/superbase/models/course.model";
import AssetModel from "@/lib/superbase/models/asset.model";
import { fetchDbRow } from "@/utils/supabase-table";


type req = { params: { id: string } };

export async function GET(req: NextRequest, {params}: req) {
    const {id} = params


    if (!id) return ServerResponse.error({
        code: "BADREQUEST",
        message: 'Asset id is required'
    }, StatusCodes.BAD_REQUEST)


    let asset:AssetModel | null;

    try {
        asset = await AssetModel.fetchById(id);
    } catch (error) {
        logger.error("FETCH COURSE BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;

        return ServerResponse.error({
            code: err.code || "SERVER ERROR",
            message: err.message || 'Unable to find asset'
        }, StatusCodes.SERVER_ERROR)
    }


    if (!asset) {
        return ServerResponse.error({
            code: "NOT FOUND",
            message: 'Could not find asset'
        }, StatusCodes.NOT_FOUND)
    }
    

    return ServerResponse.ok(asset.data)
}