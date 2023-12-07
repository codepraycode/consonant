// Interact with data source
import { Content, User } from '@/types';
import users from '../data/users.json';

export async function fetchContents(): Promise<Content[]> {
    const res = await fetch('/api/asset');

    const { data, error} = await res.json();

    if (error) throw error;

    return data
}



function fetchUsers(): User[] {
    return users
}