import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { ErrorHandler } from "../utils/error";

export const isActive = async  (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)

    const email = req.body.email

    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if(!user){
        next(new ErrorHandler(400, "O email informado não está associado a nenhuma conta cadastrada no sistema"))
    }

    if(user.isActive == false){
        next(new ErrorHandler(400, "O usuário não está ativo"))
    }

    next()
}