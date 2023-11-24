

export interface Content {
    id: string,
    title: string,
    departments: Array<string>,
    link: string,
    owner: string,
    createdAt: Date | string,
    updatedAt: Date | string,
}
