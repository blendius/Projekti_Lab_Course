export interface Professor {

    name: string,
    gradaAkademike: string,
    dataRegjistrimit:string,
    lendaId: string,
    lenda?: string | null,
    id: string,
    userName: string,
    normalizedUserName: string,
    email: string,
    token:string

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