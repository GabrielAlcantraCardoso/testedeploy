import { Router, Express } from "express";
import {
  createEquipment,
  listEquipments,
  getOneEquipment,
  deleteEquipment,
  updateEquipment,
} from "../controllers/equipment.controller";
import { authorization, isAdmin } from "../middlewares";

const route = Router();

export const equipmentRoute = (app: Express) => {
    app.post("/equipments", authorization, isAdmin, createEquipment),
    app.get("/equipments", authorization, listEquipments),
    app.get("/equipments/:equipmentId", authorization, getOneEquipment),
    app.delete("/equipments/:equipmentId", authorization, isAdmin, deleteEquipment),
    app.patch("/equipments/:equipmentId", authorization, isAdmin, updateEquipment),
    app.use("", route);
};
