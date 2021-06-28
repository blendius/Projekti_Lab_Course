export interface Nxenesiuser {
    id: string;
    username: string;
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
    username?: string;
    parentName?: string;
    class?: string;
    dateOfBirth?: string | Date;
    yearOfRegistration?: number;
    fullName?: string;
}