import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import SuperBase from "@/lib/superbase";
import UserModel from "@/lib/superbase/models/user.model";
import { NextRequest } from "next/server";



export async function GET(req:NextRequest) {

    /* 
        This covers get for admin
    */

    const user = await UserModel.getUser();
    

    return ServerResponse.ok(user)
}
