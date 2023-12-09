import { User } from "..";


export interface BaseTb {
    id: string,
    created_at?: Date | string,
    updated_at?: Date | string,
}



export interface Courses extends BaseTb{
    code: string,
    name?: string,
    title?: string,
    departments?: string[]
}

export interface Faculty extends BaseTb{
    name: string,
    short: string
}

export interface Department extends BaseTb{
    name: string,
    short: string,
    faculty: Faculty,
    courses?: Courses[]
}


export interface Asset extends BaseTb{
    path: string,
    fullPath: string,
    access: string,
    download: string    
}


export interface Content extends BaseTb{
    title: string,
    departments: Array<string>,
    owner?: User | undefined,
    asset?: Asset
}

