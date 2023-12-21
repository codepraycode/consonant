import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { NextRequest } from "next/server";
import contents from '@/data/contents.json';
import { SupaBaseReqError, SuperBaseStorageErrorTypes } from "@/types/superbase";
import SuperBase from "@/lib/superbase";
import MaterialModel from "@/lib/superbase/models/material.model";
import logger from "@/utils/logger";


type req = { params: { id: string } };

export async function GET(req: NextRequest, {params}: req) {
    const {id} = params


    if (!id) return ServerResponse.error({
        code: "BADREQUEST",
        message: 'File id is required'
    }, StatusCodes.BAD_REQUEST)


    let material:MaterialModel

    try {

        material = await SuperBase.material.fetchById(id);
    } catch (error) {
        logger.error("FETCH MATERIAL BY ID::ERROR OCCURED", error);
        const err = error as SupaBaseReqError;

        return ServerResponse.error({
            code: err.code || "NOT FOUND",
            message: err.message || 'Could not find material'
        }, StatusCodes.SERVER_ERROR)
    }
    

    return ServerResponse.ok(material.data)
}