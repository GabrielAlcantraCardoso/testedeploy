import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { ErrorHandler } from "../utils/error";

export const isAdmin = async(req: Request, res: Response, next: NextFunction) => {
    
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            email: req["userEmail"]
        }
    })

    if(user?.isAdmin === false){
        next(new ErrorHandler(401, "O usuário não tem permissão para utilizar esse recurso"))
    }

    next()
}