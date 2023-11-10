import { DiffDetail } from "@/crud/model/DiffDetail"
import type { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { decodeBaseModel } from "@/crud/service/baseModel/decode/decodeBaseModel"

function toDetail<T>(param: DiffDetail<BaseModel>): DiffDetail<T> {
    const model = new DiffDetail<T>()
    if (param.added) {
        model.added = decodeBaseModel<T>(param.added!)!
    }
    if (param.deleted) {
        model.deleted = decodeBaseModel<T>(param.deleted!)!
    }
    if (param.updated) {
        model.updated = decodeBaseModel<T>(param.updated!)!
    }
    if (param.unchanged) {
        model.unchanged = decodeBaseModel<T>(param.unchanged!)!
    }
    return model
}

export { toDetail }