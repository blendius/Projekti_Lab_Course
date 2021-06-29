export interface Professor {
    id:string;
    username: string;
    name: string;
    email: string;
    token: string;
    image?: string;
    gradaAkademike: string;
    dataRegjistrimit: string;
    EmriLendes: string;
}


export interface ProfFormValues {
    id: string;
    username: string;
    displayName: string;
    email: string;
    token: string;
    image?: string;
    gradaAkademike: string;
    dataRegjistrimit: string;
    LendaId?: string;

}