import { User } from ".";

export interface Asset {
    id: string,
    path: string,
    fullPath: string,
    access: string,
    download: string    
}


export interface Content {
    id?: string,
    title: string,
    departments: Array<string>,
    owner?: User | undefined,
    createdAt?: Date | string,
    updatedAt?: Date | string,
    asset?: Asset
}
