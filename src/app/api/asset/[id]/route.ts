import ServerResponse from "@/helpers/response";
import { NextRequest } from "next/server";



export function GET(req: NextRequest) {
    
    return ServerResponse.ok({})
}