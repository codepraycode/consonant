
interface TbRow {
    id: string,
    created_at: string | Date,
    updated_at?: string | Date,
}

export interface AssetTbRow extends TbRow {
    path: string,
    fullPath: string,
    access: string,
    download: string,
    storage_id: string,
}


export interface MaterialTbRow extends TbRow {
    title: string,
    course: string,
    asset: string,
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
