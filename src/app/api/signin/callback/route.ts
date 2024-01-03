import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { supabase } from "@/helpers/superbase.helper";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest) {

    /* 
        This covers get for admin
    */

    const {hash:tokenHash, type} = await req.json();

    const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type})


    if (error) return ServerResponse.error(error);

    console.log(data);


    return ServerResponse.ok({
        message: "You've been authenticated",
        redirect: '/admin',
        redirectLabel: 'Go to dashboard'
    });
}
