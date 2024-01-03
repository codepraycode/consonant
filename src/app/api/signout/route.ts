import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import SuperBase from "@/lib/superbase";
import UserModel from "@/lib/superbase/models/user.model";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest) {

    /* 
        This covers get for admin
    */

    // const res = await UserModel.signOut();


    const url = new URL(req.nextUrl.origin);
    console.log(url.toString())

    // console.log(res);


    return NextResponse.redirect(`${url}/auth/login/`)
}
