import { NextFunction, Request, Response } from "express"
import { EquipmentModel } from "../entity/EquipmentModel"
import { createEquipmentModelService, deleteEquipmentModelService, getOneEquipmentModelService, listEquipmentModelService, updateEquipmentModelService } from "../services/equipmentModel.service"
import { IEquipmentModelCreate } from "../types/equipmentModel.types"

export const createEquipmentModel = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body
        const equipmentModel: IEquipmentModelCreate = await createEquipmentModelService(data)
        res.status(201).json(equipmentModel)
    }catch(err){
        next(err)
    }
}

export const listEquipmentModel = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const equipmentModels: EquipmentModel[] = await listEquipmentModelService()
        res.status(200).send(equipmentModels)
    }catch(err){
        next(err)
    }
}

export const getOneEquipmentModel = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const modelId = parseInt(req.params.modelId)
        const equipmentModel = await getOneEquipmentModelService(modelId)
        res.status(200).send(equipmentModel)
    }catch(err){
        next(err)
    }
}

export const updateEquipmentModel = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body
        const modelId = parseInt(req.params.modelId)
        const equipmentModelUpdated = await updateEquipmentModelService(modelId, data)
        res.status(200).send(equipmentModelUpdated)
    }catch(err){
        next(err)
    }
}

export const deleteEquipmentModel = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const modelId = req.params.modelId
        await deleteEquipmentModelService(modelId)
        res.send(204).send("")
    }catch(err){
        next(err)
    }
}
