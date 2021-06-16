export interface Professor {
    id:string;
    username: string;
    displayName: string;
    email: string;
    token: string;
    image?: string;
    gradaAkademike: string;
    dataRegjistrimit: string;
}

export interface ProfFormValues {
    id: string;
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    gradaAkademike?: string;
    dataRegjistrimit?: string;
}