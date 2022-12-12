import { Router, Express} from "express";
import { createCall, createReport, deleteCall, getOneCall, listCall, updateCall } from "../controllers/call.controller";
import { authorization, isAdmin } from "../middlewares";

const route = Router()

export const callRoute = (app: Express) => {
    route.post("/calls", authorization, createCall),
    route.get("/calls", authorization, listCall),
    route.delete("/calls/:callId", authorization, deleteCall),
    route.get("/calls/:callId", authorization, getOneCall),
    route.patch("/calls/:callId", authorization, updateCall),
    route.post("/report", authorization,isAdmin, createReport )
    app.use("", route)
}