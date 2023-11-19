import { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { DiffDetail } from "@/crud/model/DiffDetail"
import { toBaseModel } from "@/crud/service/baseModel/encode/toBaseModel"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import { CustomException } from "@/crud/model/CustomException"
import {
    diffCollection,
    diffObject
} from "@/crud/service/diff/diffObject"
import { toDetail } from "@/crud/service/baseModel/decode/toDetail"

class DiffUpdate<T> {
    private readonly cache: BaseModel
    private readonly formData: BaseModel
    readonly detail: DiffDetail<T> | null

    constructor(_cache: T, _formData: T) {
        this.cache = toBaseModel(_cache)
        this.formData = toBaseModel(_formData)
        this.detail = this._action()
    }

    private _action = (): DiffDetail<T> => toDetail(this._diffBaseModel())
    private _diffBaseModel = (): DiffDetail<BaseModel> => {
        this._isEmpty()
        this._isSameType()
        if (this.formData.valueType !== BaseType.Object) {
            if (BaseType.isPrimitive(this.formData.valueType)) {
                if(this.cache.value === this.formData.value){
                    throw CustomException.Forbidden_Unchanged_Value
                }
                return new DiffDetail<BaseModel>({updated: this.formData})
            }
            if (BaseType.isArray(this.formData.valueType)) {
                return diffCollection(this.cache.value as BaseModel[], this.formData.value as BaseModel[])
            }
        }
        return diffObject(this.cache, this.formData)
    }
    private _isSameType = () => {
        if (this.cache.valueType !== this.formData.valueType) {
            throw CustomException.Unexpected_Data_Type
        }
    }
    private _isEmpty = () =>{
        if (BaseType.isEmpty(this.cache.valueType)) {
            throw CustomException.Load_Data_Exception
        }
        if (BaseType.isEmpty(this.formData.valueType)) {
            throw CustomException.Unexpected_Data_Type
        }
    }
}

export { DiffUpdate }