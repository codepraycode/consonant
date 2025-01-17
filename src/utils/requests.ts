// Interact with data source
import { CourseTbRow, MaterialTbRow } from '@/types/superbase/table';
import { getUser } from '@/helpers/auth.helper';
import MaterialModel from '@/lib/superbase/models/material.model';


export async function searchMaterials(query:string){
    const res = await fetch(`/api/course/search?q=${query}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data.query
}


export async function fetchAdminMaterials(): Promise<MaterialTbRow[]> {

    const user = await getUser();

    if (!user) throw new Error("User must be authenticated!");

    const res = await fetch('/api/materials', {
        headers: {
            'admin-id': user.id
        }
    });

    const { data, error} = await res.json();

    if (error) throw error;

    return data as MaterialTbRow[]
}


export async function fetchMaterial(id:string): Promise<MaterialModel> {
    const res = await fetch(`/api/materials/${id}`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}

export async function fetchCourse(): Promise<CourseTbRow[]> {
    const res = await fetch(`/api/course`);

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}



export async function postMaterial(formData: FormData): Promise<void> {

    const user = await getUser();

    if (!user) throw new Error("User must be authenticated!");

    formData.append('user', user.id);
    const res = await fetch(`/api/materials`, {
        method:'POST',
        body: formData
    });

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}
