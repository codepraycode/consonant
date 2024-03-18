// deno-lint-ignore-file no-explicit-any
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// import "https://deno.land/std@0.127.0/dotenv/load.ts"
import { SupabaseClient, createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// const MB = 1024 * 1024;
const BucketName = 'materials';
const MaterialMetaTableName = 'materials_meta';


type UserId = string | null | undefined;

interface MaterialDto {
    label: string
    department: string
    code: string | number
    title: string;
    source?: string;
    asset: File;
    asset_type: string // ? Put the specific supported file types
    asset_access?:string;
}

function validator(formData: FormData, user_id: UserId): MaterialDto {
    let error: string | null = null;


    
    const department = formData.get('department') as string;
    const code = formData.get('code') as string;
    const title = formData.get('title') as string;
    const source = formData.get('source') as string;
    const asset: File = formData.get('asset') as File;
    const asset_type = formData.get('type') as string;
    
    
    if (!user_id) error = 'User is required, provide user in header';
    else if (!department) error = 'Department(short) is required';
    else if (!code) error = 'Course code(digit) is required';
    else if (!title) error = 'Material title is required';
    else if (!asset) error = 'Material object is required';
    else if (!asset_type) error = 'Material type is required';
    else {
        // good
    }

    if (error) {
        throw new Error(error);
    }

    return {
        label: `${department} ${code} - ${title} ${source ? `[${source}]` :'' }`.trim(),
        department: department,
        code: code,
        title: title,
        source: source,
        asset,
        asset_type: asset_type
    }
}



class ResponseErrorObj extends Error {
    constructor(message:string, public status: number) {
        super(message);
    }
}

async function uploadToSupabase(client: SupabaseClient, material: MaterialDto): Promise<{asset_access: string, upload_path:string}> {
    const {
        label, asset, asset_type
    } = material;

    const { data: upload, error: uploadError } = await client.storage
        .from(BucketName)
        .upload(
            `${label}.${asset_type}`,
            asset,
        );
    
    if (uploadError) {
        
        console.error(uploadError);
        let status, message;

        if (uploadError.message.includes("already exists")) {
            status = 200;
            message = "Material already exist"
        } else {
            status = (uploadError as any).statusCode || 500;
            message = `${(uploadError as any).error}: Could not upload material`
        }

        const error = new ResponseErrorObj(message, status);

        throw error;
    }

    // Get the access link

    const {data} =  client.storage
        .from(BucketName).getPublicUrl(upload.path, { download: false });

    return {asset_access: data.publicUrl, upload_path: upload.path};
}

async function saveMaterialMetaData(client: SupabaseClient, material: MaterialDto, user_id:string, upload_path:string) {
    const {
        label, department, code,
        title, source, asset_access,
        asset_type
    } = material;
        // insert record to messages table
    
    const material_data = {
        label,
        department,
        code,
        title,
        source,
        user_id,
        asset_access,
        asset_type,
        // asset_id: (upload as any).id,
    };

    const { error } = await client
        .from(MaterialMetaTableName)
        .insert(material_data)
        .select();


        if (error) {
            console.error(error)
            // Delete already saved object
        await client.storage.from(BucketName).remove([upload_path])

        const status = (error as any).statusCode || 500;
        let message:string;

        if ((error as any).message.includes("invalid input syntax for type uuid")) {
            message = `Invalid user reference: Unrecognized or invalid user id`;
        } else {
            message = `${(error as any).error}:Fail to add the record`;
        }

        
        throw new ResponseErrorObj(message, status);
    }

    return material_data

}

function RequestResponse(data: Record<string, any>, status:number = 200, headers?: Record<string, string>) {
    return new Response(
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json", ...headers }, status },
    )
}


Deno.serve(async (req) => {

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

    const user_id = req.headers.get('user-id');    
    const formData = await req.formData();
    
    let validated, response_data, response_status;


    try {
        validated = validator(formData, user_id);
    } catch (err) {
        console.error(err);

        return RequestResponse({message: (err as Error).message}, 400)
    }

    const supabaseClient = createClient(
        // Supabase API URL - env var exported by default.
        SUPABASE_URL,
        // Supabase API ANON KEY - env var exported by default.
        SUPABASE_ANON_KEY
    )

    try {
        const {asset_access, upload_path} = await uploadToSupabase(supabaseClient, validated);
        const material = {...validated, asset_access}

        const material_data = await saveMaterialMetaData(supabaseClient, material, user_id as string, upload_path)
        
        response_status = 201
        response_data = { message: 'Success!', data: material_data }

    } catch (error: any) {
        console.error(error);
        const process_error = error as ResponseErrorObj

        response_data = {message: process_error.message};
        response_status = process_error.status
    }

    return RequestResponse(response_data, response_status)
})
