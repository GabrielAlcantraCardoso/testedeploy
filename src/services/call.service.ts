import { Between } from "typeorm"
import { AppDataSource } from "../database"
import { Call } from "../entity/Call"
import { Equipment } from "../entity/Equipment"
import { User } from "../entity/User"
import { ICallCreate } from "../types/call.types"

// TODO: COLOCAR OS DADOS DO USUÁRIO VINDO DO TOKEN
export const createCallService = async (data: ICallCreate): Promise<Call> => {
    const callRepository = AppDataSource.getRepository(Call)
    const equipmentRepository = AppDataSource.getRepository(Equipment)
    const userRepository = AppDataSource.getRepository(User)

    const userRequest = await userRepository.findOne({
        where:{
            id: data.userRequestId
        }
    })

    const equipment = await equipmentRepository.findOne({
        where: {
            id: data.equipmentId
        }
    })

    const call = callRepository.create({
        description: data.description,
        responsibleLocale: data.responsibleLocale,
        status: "opening",
        equipment: equipment,
        equipmentCode: equipment.code,
        equipmentName: equipment.name,
        equipmentPlace: equipment.place,
        subject: data.subject,
        userRequester: userRequest,
        userRequesterName: userRequest.firstName + " " + userRequest.lastName,
        phoneUser: data.phoneUser
    })

    await callRepository.save(call)

    return call
}

export const getOneCallService = (callId: number): Promise<Call> => {
    const callRepository = AppDataSource.getRepository(Call)
    
    const call = callRepository.findOne({
        where: {
            id: callId
        }
    })

    return call
}

export const listCallsSerivce = (): Promise<Call[]> => {
    const callRepository = AppDataSource.getRepository(Call)
    const calls = callRepository.find()
    return calls
}

export const deleteCallService = (callId: number) => {}

export const updateCallService = async (callId: number) => {
    const callRepository = AppDataSource.getRepository(Call)
    const call = await callRepository.findOne({
        where: {
            id: callId
        }
    })

    call.status = "closed"

    await callRepository.save(call)    
}

export const createReportService = async (dateStart: Date, dataEnd: Date) => {
    const callRepository = AppDataSource.getRepository(Call)
    
    const end = new Date(dataEnd)
    const start = new Date(dateStart)

    const officeCalls = await callRepository.find({
        where: {
            date: Between(start, end),
            equipmentPlace: "Escritório"
        }
    })

    const secretaryCalls = await callRepository.find({
        where: {
            date: Between(start, end),
            equipmentPlace: "Secretaria"
        }
    })

    const developmentCalls = await callRepository.find({
        where: {
            date: Between(start, end),
            equipmentPlace: "Desenvolvimento"
        }
    })

    const attendanceCalls = await callRepository.find({
        where: {
            date: Between(start, end),
            equipmentPlace: "Atendimento"
        }
    })

    const calls ={
        office: officeCalls,
        secretary: secretaryCalls,
        development: developmentCalls,
        attendance: attendanceCalls
    }

    return calls

}