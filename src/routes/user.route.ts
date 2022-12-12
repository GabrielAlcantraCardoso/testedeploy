import { Router, Express} from "express";
import { aceptOrRejectUsers, createUser, listUsersNotActive, makeLogin } from "../controllers/user.controller";
import { validateCreate, emailAlreadyExists, isActive, authorization, isAdmin, userNotExists, userAlreadyActive } from "../middlewares";
const route = Router()

export const userRoute = (app: Express) => {
    route.post("/users", validateCreate, emailAlreadyExists, createUser)
    route.post("/login", isActive ,makeLogin)
    route.get("/users", authorization, isAdmin, listUsersNotActive)
    route.post("/users/acept/:userId", authorization, isAdmin, userNotExists, userAlreadyActive,aceptOrRejectUsers)
    app.use("", route)
}