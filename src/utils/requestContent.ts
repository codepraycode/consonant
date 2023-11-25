// Interact with data source
import { Content, User } from '@/types';
import contents from '../data/contents.json';
import users from '../data/users.json';

export function fetchContents(): Content[] {

    // Resolve content owners
    const users = fetchUsers();


    return contents.map((each)=>{
        const { owner } = each;

        const user = users.find((usr)=> usr.id === owner);

        return {...each, owner: user}        
    });
}



function fetchUsers(): User[] {
    return users
}