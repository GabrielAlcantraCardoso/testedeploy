import {ErrorHandler} from "../utils/error"
import {Response, Request, NextFunction} from "express"

export const validateCreateEquipment =  async (req: Request , res: Response, next: NextFunction) => {
    
    const keys = ["name","code", "place", "equipmentModelId"]
    const userKeys = Object.keys(req.body)

    const keysMissing = []
    for(let i = 0; i < keys.length; i++){
        if(userKeys.includes(keys[i]) == false){
            keysMissing.push(keys[i])
        }
    }

    if(keysMissing.length > 0){
        next(new ErrorHandler(400, "keys missing: " + keysMissing.join(", ")))
    }

    const keysMore = []
    for(let i = 0; i < userKeys.length; i++){
        if(keys.includes(userKeys[i]) == false){
            keysMore.push(userKeys[i])
        }
    }

    if(keysMore.length > 0){
        next(new ErrorHandler(400, "keys more: " + keysMore.join(", ")))
    }

    const data = req.body
    for(let i = 0; i< userKeys.length;i++){
        if(userKeys[i] == "equipmentModelId"){
            if(typeof data["equipmentModelId"] != "number"){
                console.log(2)
                next(new ErrorHandler(400, "EquipmentModelId must be number"))
            }
        }else{
            if(typeof data[userKeys[i]] != "string"){
                next(new ErrorHandler(400, "The " + userKeys[i] + " column must be a string"))
            }
        }
    }

    next()
}
