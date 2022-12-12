import express from "express";
import { AppDataSource } from "./database";
import { routesApp } from "./routes";
import { handleError } from "../src/utils/error";
import cors from "cors"


const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use((err: any, req: any, res: any, next: any) => {
  handleError(err, res);
});

app.use(cors())

routesApp(app);

AppDataSource.initialize();

export default app;
