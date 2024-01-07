import ServerResponse, { StatusCodes } from "@/helpers/response.helper";
import { searchMaterials } from "@/utils/supabase-table";
import { NextRequest } from "next/server";



export async function GET(req:NextRequest) {

    const search = req.nextUrl.searchParams.get('q');

    if (!search) {
        return ServerResponse.error({
            code:'BADREQUEST',
            message:'search query is required'
        }, StatusCodes.BAD_REQUEST)
    }


    // Search materials with the title field;
    const query = await searchMaterials('title', search);

    return ServerResponse.ok({search, query})
}
