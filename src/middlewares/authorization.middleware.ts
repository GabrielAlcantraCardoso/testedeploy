import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../utils/error"
import jwt from "jsonwebtoken"

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]

    const config = {
        secret: "igor",
        expiresIn: "1h"
    }

    if(!token){
        next(new ErrorHandler(400, "token is missing"))
    }else{
        jwt.verify(token, config.secret, (err: any, decoded: any) => {
            if(err){
                next(new ErrorHandler(404, "The token does not belong to any account registered in the system" ))
            }

            const email = decoded.email
            req["userEmail"] = email
            next()
        })
    }
}