import { SuperBaseError, handleSuperBaseResponse } from "@/helpers/superbase";
import { upload } from "@/lib/cloudinary";
import SuperBase from "@/lib/superbase";
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

    const {asset:assetFile, ...rest} = Object.fromEntries(body)

    const {data, error} = await SuperBase.bucket.upload({
        path: (assetFile as File).name,
        asset: (assetFile as File)
    });

    if (error) {
        return NextResponse.json({
            code: error.code || SuperBaseError.DEFAULT,
            message: error.message || "Could not upload asset",
            // size: (assetFile as File).size / 1024
        }, { status: 500 })
    }


    data.dowload = `${data.access}?download=`;


    console.log(data);

    return NextResponse.json({
        asset: data,
        ...rest
    }, {status: 201})
}

/* 
    ? Learn superbase!
*/