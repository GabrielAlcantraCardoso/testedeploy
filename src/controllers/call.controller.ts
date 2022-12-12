import { NextFunction, Request, Response } from "express";

import { createCallService, createReportService, getOneCallService, listCallsSerivce, updateCallService } from "../services/call.service";

export const createCall = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body
        const call = await createCallService(data)
        res.status(201).send(call)
    }catch(err){
        next(err)
    }
}

export const getOneCall = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const callId = parseInt(req.params.callId)
        const call = await getOneCallService(callId)
        res.status(200).send(call)
    }catch(err){
        next(err)
    }
}

export const deleteCall = async (req: Request, res: Response, next: NextFunction) => {}

export const listCall = async (req: Request, res: Response, next: NextFunction) => {
    const calls = await listCallsSerivce()
    res.status(200).send(calls)
}

export const updateCall = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const callId = parseInt(req.params.callId)
        await updateCallService(callId)
        res.status(204).send({})
    }catch(err){
        next(err)
    }
}

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const start = req.body.date_start
        const end = req.body.date_end
        const report = await createReportService(start, end)
        res.send(report)
    }catch(err){
        next(err)
    }
}