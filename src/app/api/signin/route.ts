import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import SuperBase from "@/lib/superbase";
import UserModel from "@/lib/superbase/models/user.model";
import { NextRequest } from "next/server";



export async function POST(req:NextRequest) {

    /* 
        This covers get for admin
    */

    const {authId, email} = await req.json()

    if (!authId || !email) return ServerResponse.error({
        code: "BADREQUEST",
        message: 'AuthId and Email is required'
    }, StatusCodes.BAD_REQUEST);


    const { error } = await UserModel.passwordlessSignIn(email);


    if (error) return ServerResponse.error(error);
    

    return ServerResponse.ok({
        message: "Check your email for authentication link",
        email
    })
}
