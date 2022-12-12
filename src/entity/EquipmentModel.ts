import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"
import { Equipment } from "./Equipment"

@Entity("equipment_models")
export class EquipmentModel {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string 
    
    @OneToMany(() => Equipment, equipment => equipment.id)
    equipments!: Equipment[] 
}
