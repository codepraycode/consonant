import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest) {

    /* 
        This covers get for admin
    */

    const params = await req.json();

    console.log(params)

    // const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'email'})

    return ServerResponse.ok({
        message: "You've been authenticated",
        redirect: '/admin',
        redirectLabel: 'Go to dashboard'
    });
}
