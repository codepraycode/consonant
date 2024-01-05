import { NextResponse } from "next/server";


export async function GET() {
    const env = process.env;
    const SUPERBASE_URL = env.SUPERBASE_URL || 'https://zxkacyqasqjoafeeabbe.supabase.co'
    const SUPERBASE_API_KEY = env.SUPERBASE_API_KEY;


    return NextResponse.json({SUPERBASE_API_KEY, SUPERBASE_URL});
}