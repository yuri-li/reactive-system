import type { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"

function decodeBaseModel<T>(param: BaseModel | Partial<BaseModel>): T | null {
    if (BaseType.isEmpty(param.valueType!)) {
        return null
    }
    if (BaseType.isPrimitive(param.valueType!)) {
        return _primitive(param)
    }
    if (param.valueType! === BaseType.Array) {
        return _collection(param)
    }
    return _object(param)
}

function _object<T>(param: BaseModel | Partial<BaseModel>): T {
    const obj = {}
    const arr: BaseModel[] = param.value as BaseModel[]
    // @ts-ignore
    arr.forEach(x => obj[x.key! as string] = decodeBaseModel(x))
    return obj as T
}

function _primitive<T>(param: BaseModel | Partial<BaseModel>): T {
    if (param.valueType === BaseType.Date) {
        return new Date(param.value as string) as T
    }
    return param.value as T
}

function _collection<T>(param: BaseModel | Partial<BaseModel>): T {
    if (param.isAllPrimitives) {
        return (param.value as BaseModel[]).map(x => _primitive(x)) as T
    }
    return (param.value as BaseModel[]).map(x => decodeBaseModel(x)) as T
}

export { decodeBaseModel }