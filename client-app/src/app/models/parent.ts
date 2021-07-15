import { Kontakti } from "./kontakti";

export interface Parent {
    id:string;
    userName: string;
    displayName: string;
    token: string;
    image?: string;
    dataLindjes:string;
    nrTel: string;
    email: string;
}

export interface ParentFormValues{
    displayName?: string;
    email: string;
    password: string;
    userName?: string;
    dataLindjes?: string;
    nrTel?: number;
}