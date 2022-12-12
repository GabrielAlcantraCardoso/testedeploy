import { User } from "../entity/User"

export interface IRequestCreate {
    user: User
}

export interface IPasswordChanged {
    email: string
    password: string
}