import { Kontakti } from "./kontakti";

export interface Parent {
    id:string;
    username: string;
    displayName: string;
    token: string;
    image?: string;
    dataLindjes?:string;
    nrTel: string;
    email: string;
}

export interface ParentFormValues{
    displayName?: string;
    email: string;
    password: string;
    username?: string;
    dataLindjes?: string;
    nrTel?: number;
}