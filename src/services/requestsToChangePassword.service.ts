import { AppDataSource } from "../database"
import { RequestToChangePassword } from "../entity/ChangePassword"
import { User } from "../entity/User"
import { IPasswordChanged, IRequestCreate } from "../types/requestsToChangePassword.types"
import * as bcrypt from "bcryptjs"
import { ErrorHandler } from "../utils/error"

export const createRequestService = async (email: string) => {
    const userRepository = AppDataSource.getRepository(User)
    const requestsToChangePasswordRepository =  AppDataSource.getRepository(RequestToChangePassword)

    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })

    const data: IRequestCreate = {
        user: user
    }

    const requestToChangePassword = requestsToChangePasswordRepository.create(data)

    await requestsToChangePasswordRepository.save(requestToChangePassword)

    return requestToChangePassword

}

export const changePasswordService =  async (data: IPasswordChanged): Promise<RequestToChangePassword> => {
    const requestsToChangePasswordRepository =  AppDataSource.getRepository(RequestToChangePassword)

    const userRepository = AppDataSource.getRepository(User)
    
    const user = await userRepository.findOne({
        where: {
            email: data.email
        }
    })

    if(!user) {
        throw new ErrorHandler(400, "Usuário inexistente")
    }

    const requestToChangePassword = await requestsToChangePasswordRepository.findOne({
        where: {
            user: user,
            status: "opening"
        }
    })

    if (!requestToChangePassword) {
        throw new ErrorHandler(400, "Não existe registros abertos para esse usuário")
    }

    const requestUpdate = {
        status: "closed"
    }

    const newPassword = await bcrypt.hash(data.password, 10)
    
    const userUpdate = {
        password: newPassword
    }

    await userRepository.update(user, userUpdate)

    await requestsToChangePasswordRepository.update(requestToChangePassword.id, requestUpdate)

    const newRequest = await requestsToChangePasswordRepository.findOne({
        where: {
            id: requestToChangePassword.id
        }
    })

    return newRequest

}

export const listRequestService = async (): Promise<RequestToChangePassword[]> => {
    const requestsToChangePasswordRepository =  AppDataSource.getRepository(RequestToChangePassword)
    const requests = await requestsToChangePasswordRepository.find()
    return requests
}

export const getOneRequestService = async (requestId: number): Promise<RequestToChangePassword> => {
    const requestsToChangePasswordRepository =  AppDataSource.getRepository(RequestToChangePassword)
    const request = await requestsToChangePasswordRepository.findOne({
        where: {
            id: requestId
        }
    })
    return request
}