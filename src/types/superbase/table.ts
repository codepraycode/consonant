
interface TbRow {
    id: string,
    created_at: string | Date,
    updated_at: string | Date,
}

export interface StorageAsset {
    asset_access: string,
    asset_download: string,
    asset_id: string,
}

export interface MaterialTbRow extends TbRow, StorageAsset{
    title: string,
    course?: string,
    user: string
}


export interface CourseTbRow extends TbRow {
    name: string,
    code: string,
    title: string,
}

export interface DepartmentTbRow extends TbRow {
    name: string,
    short: string,
    faculty: string,
}

export interface FacultyTbRow extends TbRow {
    name: string,
    short: string,    
}
