import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm"
import { EquipmentModel } from "./EquipmentModel"

@Entity("equipments")
export class Equipment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    place: string 
    
    @ManyToOne(() => EquipmentModel)
    equipmentModel: EquipmentModel
}

