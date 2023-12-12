import ServerResponse from "@/helpers/response.helper";
import SuperBase from "@/lib/superbase";
import { validateNewAsset } from "@/utils/validators";
import { NextRequest, NextResponse } from "next/server";
import contents from '@/data/contents.json';
// import { SuperBaseStorageError } from "@/helpers/superbase.helper";
import logger from "@/utils/logger";
import { SuperBaseStorageErrorTypes } from "@/types/superbase";
import AssetModel from "@/lib/superbase/models/asset.model";
// import users from '@/data/users.json';


// TODO: implement automatic error handler for all routes
export async function GET(req: NextRequest, res:NextResponse) {


    // const faculty_data = {
    //     "path": "THE GIFT OF HEALING.docx",
    //     "storage_id": "33cd8e83-3b58-4012-a6f4-356f5e364930",
    //     "fullPath": "test-resource/THE GIFT OF HEALING.docx",
    //     "access": "https://zxkacyqasqjoafeeabbe.supabase.co/storage/v1/object/public/test-resource/THE%20GIFT%20OF%20HEALING.docx",
    //     "download": "https://zxkacyqasqjoafeeabbe.supabase.co/storage/v1/object/public/test-resource/THE%20GIFT%20OF%20HEALING.docx?download="
    // }

    
    // const deps = await SuperBase.department.fetch({})
    // console.log(deps)

    const department_id = "56471c0c-1b0f-47ae-9b4b-8ed24e041d04"
    const department = await SuperBase.department.fetchById(department_id)
    console.log(department)
    // console.log(department?.faculty)

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
            code: error.code || SuperBaseStorageErrorTypes.DEFAULT,
            message: error.message || "Could not upload asset",
        })
    }

    logger.debug("CREATE MATERIALS::UPLOADED ASSET::", data);

    return ServerResponse.created({
        asset: data,
        ...rest
    })
}


// TODO: Implement Query manager for many to many
// TODO: Implement like interfaces for other entities
