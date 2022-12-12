import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../database"
import { RequestToChangePassword } from "../entity/ChangePassword"
import { ErrorHandler } from "../utils/error"

export const requestExists = async (req: Request, res: Response, next: NextFunction) => {
    const requestsToChangePasswordRepository =  AppDataSource.getRepository(RequestToChangePassword)
    
    const requestId = parseInt(req.params.requestId)
    
    const request = await requestsToChangePasswordRepository.findOne({
        where: {
            id: requestId
        }
    })

    if(!request){
        next(new ErrorHandler(400, "O requestId informado não pertence a nenhum usuário cadastrado no sistema"))
    }

    next()
 
}