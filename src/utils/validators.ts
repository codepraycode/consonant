import { AssetDto } from "@/types/dto";


type ValidationIssues = {
    field: string,
    message: string
}

export const validateNewAsset = (assetDto: FormData): ValidationIssues | null => {
    // validate title exist

    const title = assetDto.get("title");
    let departments: string | string[]  = assetDto.get("departments") as string;
    const owner = assetDto.get("owner");
    const asset = assetDto.get("asset");


    if (!title) return {
        field: 'title',
        message: 'title is required'
    }


    if (!departments) return {
        field: 'departments',
        message: 'Departments is required'
    }
    
    departments = JSON.parse(departments as string) as Array<string>;

    if (departments.length < 1) return {
        field: 'departments',
        message: 'At least, a department is required'
    }


    if (!asset) return {
        field: 'asset',
        message: 'An asset is required'
    }


    if (owner) return {
        field: 'owner',
        message: 'owner is required'
    }
    // validate department exist
    // validate owner

    return null
}


export const validateResource = (body: FormData): ValidationIssues | null => {
    // validate title exist

    const asset = body.get("asset");

    if (!asset) return {
        field: 'asset',
        message: 'An asset is required'
    }

    // validate department exist
    // validate owner

    return null
}