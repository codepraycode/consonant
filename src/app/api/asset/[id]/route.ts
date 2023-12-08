import ServerResponse, { StatusCodes } from "@/helpers/response";
import { NextRequest } from "next/server";
import contents from '@/data/contents.json';
import { SuperBaseError } from "@/helpers/superbase";


export function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const {id:fileId} = params

    const file = contents.find((item)=> item.id === fileId);


    if (!file) return ServerResponse.error({
        code: SuperBaseError.FILENOTFOUND,
        message: 'File not found or missing'
    }, StatusCodes.NOT_FOUND)

    return ServerResponse.ok(file)
}