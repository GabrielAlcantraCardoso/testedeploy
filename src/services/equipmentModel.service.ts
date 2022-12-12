import { AppDataSource } from "../database"
import { EquipmentModel } from "../entity/EquipmentModel"
import { IEquipmentModelData, IEquipmentModelCreate } from "../types/equipmentModel.types"

export const createEquipmentModelService = async (data: IEquipmentModelData): Promise<EquipmentModel> => {
    const equipmentModelRepository = AppDataSource.getRepository(EquipmentModel)
    
    const equipmentModel = equipmentModelRepository.create(data)
    await equipmentModelRepository.save(equipmentModel)

    return equipmentModel
}

export const deleteEquipmentModelService = async (modelId: string) => {
    const equipmentModelRepository = AppDataSource.getRepository(EquipmentModel)
    await equipmentModelRepository.delete(modelId)
}

export const listEquipmentModelService = async (): Promise<EquipmentModel[]> => {
    const equipmentModelRepository = AppDataSource.getRepository(EquipmentModel)
    
    const equipmentModels = await equipmentModelRepository.find()
    
    return equipmentModels
    
}

export const getOneEquipmentModelService = async (modelId: number): Promise<EquipmentModel> => {
    const equipmentModelRepository = AppDataSource.getRepository(EquipmentModel)
    
    const equipmentModel = await equipmentModelRepository.findOne({
        where: {
            id: modelId
        }
    })

    return equipmentModel
}

export const updateEquipmentModelService = async(modelId: number, data: IEquipmentModelData): Promise<EquipmentModel> => {
    const equipmentModelRepository = AppDataSource.getRepository(EquipmentModel)
    
    const equipmentModel = await equipmentModelRepository.findOne({
        where: {
            id: modelId
        }
    })

    const keys =  Object.keys(data)
    for(let i = 0; i < Object.keys(data).length; i++){
        equipmentModel[keys[i]] = data[keys[i]]
    }

    await equipmentModelRepository.save(equipmentModel)

    return equipmentModel
}