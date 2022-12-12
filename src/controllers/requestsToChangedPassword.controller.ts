import { NextFunction, Request, Response } from "express";
import { changePasswordService, createRequestService, getOneRequestService, listRequestService } from "../services/requestsToChangePassword.service";

export const changePassword = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body
        const newRequest = await changePasswordService(data)
        res.status(200).send(newRequest)
    }catch(err){
        next(err)
    }
}

export const requestChange = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.body.email
        
        await createRequestService(email)

        res.status(200).send({
            message: "Solicitação enviada"
        })

    }catch(err){
        next(err)
    }
}

export const listRequests = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const requestsToChangePassword = await listRequestService()
        res.send(requestsToChangePassword)
    }catch(err){
        next(err)
    }
}

export const getOneRequest = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const requestId = parseInt(req.params.requestId)
        const requestToChangePassword = await getOneRequestService(requestId)
        res.send(requestToChangePassword)
    }catch(err){
        next(err)
    }
}