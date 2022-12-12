import { Router, Express } from "express"
import { createEquipmentModel, deleteEquipmentModel, getOneEquipmentModel, listEquipmentModel, updateEquipmentModel} from "../controllers/modelEquipment.controller"
import { authorization, isAdmin } from "../middlewares"
import {validateCreateEquipmentModel} from "../middlewares/equipmentModel.validate.middleware"

const route = Router()

export const modelEquipmentRoute = (app: Express) => {
    route.get("/models",authorization,listEquipmentModel)
    route.get("/models/:modelId", authorization,getOneEquipmentModel)
    route.post("/models", authorization,isAdmin, validateCreateEquipmentModel,createEquipmentModel)
    route.patch("/models/:modelId",authorization, isAdmin,updateEquipmentModel)
    route.delete("/models/:modelId",authorization, isAdmin,deleteEquipmentModel)
    app.use("", route)
}