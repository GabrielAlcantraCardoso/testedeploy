import { Router, Express } from "express"
import { changePassword, getOneRequest, listRequests, requestChange } from "../controllers/requestsToChangedPassword.controller"
import { authorization, isAdmin, requestExists } from "../middlewares"
const route = Router()

export const passwordRoute = (app: Express) => {
    route.post("/password/requested", requestChange)
    route.post("/password/change",authorization, isAdmin, changePassword)
    route.get("/password/:requestId", authorization,isAdmin, requestExists, getOneRequest)
    route.get("/password", authorization, isAdmin, listRequests)
    app.use("", route)
}