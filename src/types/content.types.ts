import { User } from ".";


export interface Content {
    id: string,
    title: string,
    departments: Array<string>,
    link: string,
    owner: User | undefined,
    createdAt: Date | string,
    updatedAt: Date | string,
}
