import { upload } from "@/lib/cloudinary";
import { validateNewAsset } from "@/utils/validators";
import { NextRequest, NextResponse } from "next/server";


export function GET(req: NextRequest, res:NextResponse) {
    return NextResponse.json({msg: 'Hello world'}, {status: 200})
}


export async function POST(req: NextRequest) {

    const body = await req.formData();

    const validation_issues = validateNewAsset(body);

    if (validation_issues) return NextResponse.json(
        { error: validation_issues },
        {status: 400}
    )


    // const asset = await upload(body.asset);



    return NextResponse.json(body, {status: 201})
}

/* 
    ? Learn superbase!
*/