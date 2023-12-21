// Interact with data source
import { Material } from '@/types/superbase';
import users from '../data/users.json';

type Content = Record<string, any>

export async function searchMaterials(query:string){
    const res = await fetch(`/api/course/search?q=${query}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data.query
}


export async function fetchContents(): Promise<Material[]> {
    const res = await fetch('/api/asset');

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}


export async function fetchContent(id:any): Promise<Content> {
    const res = await fetch(`/api/asset/${id}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}



function fetchUsers(): Content[] {
    return users
}