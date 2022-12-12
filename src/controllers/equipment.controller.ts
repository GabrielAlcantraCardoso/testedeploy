import { NextFunction, Request, Response } from "express";
import { createEquipmentService, deleteEquipmentService, getOneEquipmentService, listEquipmentsService, updateEquipmentService } from "../services/equipment.service";

export const createEquipment = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body
        const equipment = await createEquipmentService(data)
        res.status(201).send(equipment)
    }catch(err){
        next(err)
    }
}

export const listEquipments = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const equipments = await listEquipmentsService()
        res.status(200).send(equipments)
    }catch(err){
        next(err)
    }
}

export const getOneEquipment = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const equipmentId = parseInt(req.params.equipmentId)
        const equipment = await getOneEquipmentService(equipmentId)
        res.status(200).send(equipment)
    }catch(err){
        next(err)
    }
}

export const deleteEquipment = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const equipmentId = parseInt(req.params.equipmentId)
        await deleteEquipmentService(equipmentId)
        res.status(204).send({})
    }catch(err){
        next(err)
    }

}

export const updateEquipment = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const equipmentId = parseInt(req.params.equipmentId)
        const data = req.body
        const equipment = await updateEquipmentService(equipmentId, data)
        res.status(200).send(equipment)
    }catch(err){
        next(err)
    }
}