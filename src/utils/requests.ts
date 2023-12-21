// Interact with data source
import { Asset, Material } from '@/types/superbase';
import users from '../data/users.json';
import { MaterialTbRow } from '@/types/superbase/table';

type Content = Record<string, any>

export async function searchMaterials(query:string){
    const res = await fetch(`/api/course/search?q=${query}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data.query
}


export async function fetchAdminMaterials(): Promise<Material[]> {
    const res = await fetch('/api/materials');

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}


export async function fetchMaterial(id:string): Promise<Material> {
    const res = await fetch(`/api/materials/${id}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}

export async function fetchAsset(id:string): Promise<Asset> {
    const res = await fetch(`/api/asset/${id}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}



function fetchUsers(): Content[] {
    return users
}