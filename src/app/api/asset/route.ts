import ServerResponse from "@/helpers/response.helper";
import SuperBase from "@/lib/superbase";
import { validateNewAsset } from "@/utils/validators";
import { NextRequest, NextResponse } from "next/server";
import contents from '@/data/contents.json';
import { SuperBaseStorageError } from "@/helpers/superbase.helper";
import logger from "@/utils/logger";
// import users from '@/data/users.json';



export function GET(req: NextRequest, res:NextResponse) {
    return ServerResponse.ok(contents)
}




export async function POST(req: NextRequest) {

    const body = await req.formData();

    const validation_issues = validateNewAsset(body);

    if (validation_issues) {
        logger.error("CREATE MATERIALS::DTO VALIDATION ERROR::", validation_issues);
        return ServerResponse.error(validation_issues)
    }

    const {asset:assetFile, ...rest} = Object.fromEntries(body)

    const {data, error} = await SuperBase.bucket.upload({
        path: (assetFile as File).name,
        asset: (assetFile as File)
    });

    if (error) {
        logger.error("CREATE MATERIALS::UPLOAD ASSET ERROR::", data);
        return ServerResponse.error({
            code: error.code || SuperBaseStorageError.DEFAULT,
            message: error.message || "Could not upload asset",
        })
    }

    logger.debug("CREATE MATERIALS::UPLOADED ASSET::", data);

    return ServerResponse.created({
        asset: data,
        ...rest
    })
}
