import express, { Express } from "express"
import { userRoute } from "./user.route"
import { callRoute } from "./call.route"
import { modelEquipmentRoute } from "./modelEquipment.route"
import { equipmentRoute } from "./equipment.route"
import { passwordRoute } from "./requestsToChangePassword.route"

export const routesApp = (app: Express) => {
    app.use(express.json())
    userRoute(app)
    callRoute(app)
    modelEquipmentRoute(app)
    equipmentRoute(app)
    passwordRoute(app)
}