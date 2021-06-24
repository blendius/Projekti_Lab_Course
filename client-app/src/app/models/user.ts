export interface Admin{
    username:string;
    displayName:string;
    token:string;
    image?:string;
}
export interface AdminFormValues{
    email:string;
    password:string;
    displayName?:string;
    username?:string;
}