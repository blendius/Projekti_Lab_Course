export interface Professor{
    username: string;
    displayName: string;
    token: string;
    image?:string;
    GradaAkademike?:string;
    DataRegjistrimit?:string;
}

export interface ProfFormValues{
    email: string;
    password:string;
    displayName?: string;
    username?:string;
    GradaAkademike?:string;
    DataRegjistrimit?:string;
}