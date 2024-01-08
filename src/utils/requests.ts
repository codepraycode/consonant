// Interact with data source
import { Asset, Course, Material } from '@/types/superbase';
import users from '../data/users.json';
import { MaterialTbRow } from '@/types/superbase/table';
import { getUser } from '@/helpers/auth.helper';

type Content = Record<string, any>

export async function searchMaterials(query:string){
    const res = await fetch(`/api/course/search?q=${query}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data.query
}


export async function fetchAdminMaterials(): Promise<MaterialTbRow[]> {

    const user = await getUser();

    // console.log(user);
    const res = await fetch('/api/materials', {
        headers: {
            'admin-id': user.id
        }
    });

    const { data, error} = await res.json();

    if (error) throw error;

    return data as MaterialTbRow[]
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

export async function fetchCourse(): Promise<Course[]> {
    const res = await fetch(`/api/course`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}



export async function postMaterial(formData: FormData): Promise<void> {

    const user = await getUser();

    formData.append('user', user.id);
    const res = await fetch(`/api/materials`, {
        method:'POST',
        body: formData
    });

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}



function fetchUsers(): Content[] {
    return users
}