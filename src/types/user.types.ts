export interface IUserCreate {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    terms_of_use: boolean
}

export interface ILoginData {
    email: string
    password: string
}