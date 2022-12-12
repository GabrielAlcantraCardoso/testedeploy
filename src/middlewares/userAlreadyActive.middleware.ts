import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { ErrorHandler } from "../utils/error";

export const userAlreadyActive = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)
    
    const userId = parseInt(req.params.userId)

    const user = await userRepository.findOne({
        where: {
            id: userId,
            isActive: false
        }
    })

    if(!user){
        next(new ErrorHandler(400, "O usuário já está ativo no sistema"))
    }



    next()    
}