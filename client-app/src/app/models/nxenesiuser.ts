export interface Nxenesiuser {
    id: string;
    userName: string;
    displayName?: string;
    token: string;
    image?: string;
    parentName?: string;
    class?: string;
    dateOfBirth?: string | Date;
    yearOfRegistration?: number;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
}

export interface NxenesiuserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
    parentName?: string;
    class?: string;
    dateOfBirth?: string | Date;
    yearOfRegistration?: number;
    fullName?: string;
}