import { User } from "..";


export interface BaseTb {
    id?: string,
    created_at?: Date | string,
    updated_at?: Date | string,
}



export interface Course extends BaseTb{
    code: string,
    name?: string,
    title?: string,
    departments?: Department[]
}

export interface Faculty extends BaseTb{
    name: string,
    short: string
}

export interface Department extends BaseTb{
    name: string,
    short: string,
    faculty?: Faculty,
    courses?: Course[]
}


export interface Asset extends BaseTb{
    path: string,
    fullPath: string,
    access: string,
    download: string,
    storage_id: string  
}


export interface Material extends BaseTb{
    title: string,
    course: string, // course id
    asset: string, // asset id
    owner?: User | undefined,
}

