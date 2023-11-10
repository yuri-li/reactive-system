import { toBaseModel } from "@/crud/service/baseModel/encode/toBaseModel"
import { BaseModel } from "@/crud/service/baseModel/model/BaseModel"

function toJson(value: unknown): string {
    return JSON.stringify(toBaseModel(value))
}
const emptyJson = JSON.stringify(new BaseModel())


export { toJson,emptyJson }