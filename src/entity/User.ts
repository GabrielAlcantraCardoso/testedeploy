import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Call } from "./Call"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phone: string

    @Column()
    email: string
    
    @Column()
    password: string

    @Column({default: false})
    isAdmin: boolean

    @Column()
    terms_of_use: boolean

    @Column({default: false, nullable: true})
    isActive: boolean

    @OneToMany(() => Call, call => call.userSolved, {eager: false})
    solvedCalls: Call[]

    @OneToMany(() => Call, call => call.userRequester, {eager: false})
    requestedCalls: Call[]

}
