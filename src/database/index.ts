import "reflect-metadata"
import { DataSource } from "typeorm"
import { Call } from "../entity/Call"
import { Equipment } from "../entity/Equipment"
import { EquipmentModel } from "../entity/EquipmentModel"
import { User } from "../entity/User"
import { RequestToChangePassword } from "../entity/ChangePassword"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "igor",
    password: "1234",
    database: "helpdesk_db",
    synchronize: true,
    logging: false,
    entities: [User, Call, Equipment, EquipmentModel, RequestToChangePassword],
})
