export interface Professor{
    username: string;
    displayName: string;
    token: string;
    image?:string;
}

export interface ProfFormValues{
    email: string;
    password:string;
    displayName?: string;
    username?:string;
    roli?:number;
}