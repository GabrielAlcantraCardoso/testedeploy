import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Equipment } from "./Equipment"
import { User } from "./User"

@Entity("calls")
export class Call {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subject: string

    @Column()
    phoneUser: string

    @CreateDateColumn()
    date: Date

    @Column()
    description: string

    @Column()
    responsibleLocale: string
    
    @Column()
    status: string

    @ManyToOne(() => User)
    userRequester: User

    @Column()
    userRequesterName: string

    @ManyToOne(() => User, {nullable: true})
    userSolved: User

    @Column({nullable: true})
    userSolvedName: string

    @ManyToOne(() => Equipment, {onDelete: "CASCADE"})
    equipment: Equipment

    @Column()
    equipmentCode: string

    @Column()
    equipmentPlace: string

    @Column()
    equipmentName: string
}
