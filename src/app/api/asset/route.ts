import ServerResponse from "@/helpers/response";
import { SuperBaseError } from "@/helpers/superbase";
import SuperBase from "@/lib/superbase";
import { validateNewAsset } from "@/utils/validators";
import { NextRequest, NextResponse } from "next/server";


export function GET(req: NextRequest, res:NextResponse) {
    return NextResponse.json({msg: 'Hello world'}, {status: 200})
}




export async function POST(req: NextRequest) {

    const body = await req.formData();

    const validation_issues = validateNewAsset(body);

    if (validation_issues) return ServerResponse.error(validation_issues)

    const {asset:assetFile, ...rest} = Object.fromEntries(body)

    const {data, error} = await SuperBase.bucket.upload({
        path: (assetFile as File).name,
        asset: (assetFile as File)
    });

    if (error) {
        return ServerResponse.error({
            code: error.code || SuperBaseError.DEFAULT,
            message: error.message || "Could not upload asset",
        })
    }


    data.dowload = `${data.access}?download=`;


    console.log(data);

    return ServerResponse.created({
        asset: data,
        ...rest
    })
}
