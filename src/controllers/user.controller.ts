import { NextFunction, Request, Response } from "express";
import {aceptOrRejectUsersService, createUserService, listUsersNotActiveService, loginUserService} from "../services/user.service";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data =  req.body
        const userCreated = await createUserService(data)
        res.status(201).send(userCreated)
    }catch(err){
        next(err)
    }
}

export const makeLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const token = await loginUserService(data)
        res.status(200).send(token)
    } catch(err){
        next(err)
    }
}

export const listUsersNotActive = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await listUsersNotActiveService()
        res.status(200).send(users)
    }catch(err){
        next(err)
    }
}

export const aceptOrRejectUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = parseInt(req.params.userId)
        const isActive = req.body.isActive
        await aceptOrRejectUsersService(userId, isActive)
        res.status(200).send({})
    }catch(err){
        next(err)
    }
}