import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { NextRequest } from "next/server";
import { SupaBaseReqError } from "@/types/superbase";
import MaterialModel from "@/lib/superbase/models/material.model";
import logger from "@/utils/logger";


type req = { params: { id: string } };

export async function GET(req: NextRequest, {params}: req) {
    const {id} = params


    if (!id) return ServerResponse.error({
        code: "BADREQUEST",
        message: 'File id is required'
    }, StatusCodes.BAD_REQUEST)


    let material:MaterialModel | null;

    try {

        material = await MaterialModel.fetchById(id);
    } catch (error) {
        logger.error("FETCH MATERIAL BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;

        return ServerResponse.error({
            code: err.code || "SERVER ERROR",
            message: err.message || 'Could not to find asset'
        }, StatusCodes.SERVER_ERROR)
    }

    if (!material) {
        return ServerResponse.error({
            code: "NOT FOUND",
            message: 'Could not find material'
        }, StatusCodes.NOT_FOUND)
    }
    

    return ServerResponse.ok(material.data)
}