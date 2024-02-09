import { NextResponse } from "next/server"

export function GET() {
    const env = process.env;

    return NextResponse.json({
        SUPERBASE_API_KEY: env['SUPERBASE_API_KEY'],
        SUPERBASE_URL: env['SUPERBASE_URL'],
    })
    
}