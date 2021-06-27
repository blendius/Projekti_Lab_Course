export interface Nxenesiuser {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    parentName: string;
    class: string;
    dateOfBirth: string;
    yearOfRegistration: string;
}

export interface NxenesiuserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    parentName?: string;
    class?: string;
    dateOfBirth?: string;
    yearOfRegistration?: number;
    fullName?: string;
}