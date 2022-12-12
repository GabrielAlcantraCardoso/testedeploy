import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity("requests_to_change_password")
export class RequestToChangePassword {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    date: Date

    @ManyToOne(() => User)
    user: User

    @Column({default: "opening"})
    status: string
}
