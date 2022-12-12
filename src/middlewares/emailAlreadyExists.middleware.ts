import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../database"
import { User } from "../entity/User"
import { ErrorHandler } from "../utils/error"

export const emailAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {

    const email = req.body.email
    const userRepository = AppDataSource.getRepository(User)
    
    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if(!!user){
        next(new ErrorHandler(409,"email already registed in the system"))
    }

    next()
}