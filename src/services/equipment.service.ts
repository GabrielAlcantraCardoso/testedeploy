import { AppDataSource } from "../database"
import { Equipment } from "../entity/Equipment"
import { EquipmentModel } from "../entity/EquipmentModel"
import { IEquipmentData } from "../types/equipment.types"

export const listEquipmentsService = async (): Promise<Equipment[]> => {
    const equipmentRepository = AppDataSource.getRepository(Equipment)
    
    const equipments = await equipmentRepository.find()

    return equipments
}

export const getOneEquipmentService = async (equipmentId: number): Promise<Equipment> => {
    const equipmentRepository = AppDataSource.getRepository(Equipment)

    const equipment = await equipmentRepository.findOne({
        where: {
            id: equipmentId
        }
    })

    return equipment
}

export const deleteEquipmentService = async (equipmentId: number) => {
    const equipmentRepository = AppDataSource.getRepository(Equipment)
    await equipmentRepository.delete(equipmentId)
}

export const updateEquipmentService = async (equipmentId: number, data: IEquipmentData): Promise<Equipment> => {
    const equipmentRepository = AppDataSource.getRepository(Equipment)

    await equipmentRepository.update(equipmentId, data)

    const equipment = equipmentRepository.findOne({
        where: {
            id: equipmentId
        }
    })
    

    return equipment

}

export const createEquipmentService = async (data: IEquipmentData) => {
    const equipmentModelRepository = AppDataSource.getRepository(EquipmentModel)

    const equipmentModel = await equipmentModelRepository.findOne({
        where: {
            id: data.equipmentModelId
        }
    })

    const equipmentData = {
        code: data.code,
        name: data.name,
        place: data.place,
        equipmentModel: equipmentModel
    }
    
    const equipmentRepository = AppDataSource.getRepository(Equipment)
    const equipment = equipmentRepository.create(equipmentData)
    await equipmentRepository.save(equipment)
    
    return equipment
}
