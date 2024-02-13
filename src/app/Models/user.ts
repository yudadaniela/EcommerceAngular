export interface User {
    firtName: string,
    secondName?: string,
    surtName: string,
    secondSurtname?: string,
    email: string,
    password:string,
    confirmPassword:string,
    role:string,
    gender?:string,
    location?:Location
}
export interface Location{
    region:string,
    country:string
}