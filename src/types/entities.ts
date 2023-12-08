import { User } from ".";


interface Tb {
    id: string,
    created_at?: Date | string,
    updated_at?: Date | string,
}



export interface Courses extends Tb{
    code: string,
    name?: string,
    title?: string,
    departments?: string[]
}

export interface Faculty extends Tb{
    name: string,
    short: string
}

export interface Department extends Tb{
    name: string,
    short: string,
    faculty: Faculty,
    courses?: Courses[]
}


export interface Asset extends Tb{
    path: string,
    fullPath: string,
    access: string,
    download: string    
}


export interface Content extends Tb{
    title: string,
    departments: Array<string>,
    owner?: User | undefined,
    asset?: Asset
}

