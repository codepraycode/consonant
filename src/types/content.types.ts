import { User } from ".";

export interface Asset {
    asset_id: string,
    public_id: string,
    created_at: string,
    url: string,
    secure_url: string,
    format: string
}


export interface Content {
    id: string,
    title: string,
    departments: Array<string>,
    link?: string,  // ! deprecated
    owner: User | undefined,
    createdAt: Date | string,
    updatedAt: Date | string,
    
    assetId: string,
    asset?: Asset
}
