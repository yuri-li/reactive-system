import type { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { OperationType } from "@/crud/model/OperationType"
import { toBaseModel } from "@/crud/service/baseModel/encode/toBaseModel"
import { DiffDetail } from "@/crud/model/DiffDetail"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import { CustomException } from "@/crud/model/CustomException"
import {
    isAllCollectionEquals,
    isCollectionEquals
} from "@/crud/service/diff/isCollectionEquals"
import { diffObject } from "@/crud/service/diff/diffObject"
import { toDetail } from "@/crud/service/baseModel/decode/toDetail"

class Diff<T> {
    // @ts-ignore
    private cache: BaseModel
    // @ts-ignore
    private formData: BaseModel
    // @ts-ignore
    private operationType: OperationType
    readonly detail: DiffDetail<T> | null
    private allowDuplicate: boolean

    constructor(_cache: T | null, _formData: T, _operationType: OperationType, _allowDuplicate: boolean) {
        this.cache = toBaseModel(_cache)
        this.formData = toBaseModel(_formData)
        this.operationType = _operationType
        this.allowDuplicate = _allowDuplicate
        this.detail = this._action()
    }

    private _action = (): DiffDetail<T> | null => {
        const baseModel = this._diffBaseModel()
        if (baseModel === null) {
            return null
        }
        return toDetail(baseModel)
    }
    private _diffBaseModel = (): DiffDetail<BaseModel> | null => {
        if (this.cache.valueType === BaseType.Empty || this.formData.valueType === BaseType.Empty) {
            return this._empty()
        }
        if (this.formData.valueType !== BaseType.Object) {
            if (this.cache.valueType !== this.formData.valueType) {
                throw CustomException.Unexpected_Data_Type
            }
            if (BaseType.isPrimitive(this.formData.valueType)) {
                return this._buildDiffDetail(this.cache.value === this.formData.value)
            }
            if (BaseType.isArray(this.formData.valueType)) {
                return this._buildDiffDetail(isCollectionEquals(this.cache, this.formData))
            }
        }

        return this._object()
    }
    private _object = (): DiffDetail<BaseModel> => {
        if (this.operationType === OperationType.Update) {
            const model = diffObject(this.cache.value as BaseModel[], this.formData.value as BaseModel[])
            if (model.added === undefined && model.deleted === undefined && model.updated === undefined) {
                throw CustomException.Forbidden_Unchanged_Value
            }
            return model
        }
        if (isAllCollectionEquals(this.cache.value as BaseModel[], this.formData.value as BaseModel[])) {
            if(this.allowDuplicate){
                return new DiffDetail<BaseModel>({unchanged: this.formData})
            }
            throw CustomException.Forbidden_Unchanged_Value
        } else {
            return new DiffDetail<BaseModel>({updated: this.formData})
        }
    }
    private _buildDiffDetail = (_isEquals: boolean): DiffDetail<BaseModel> => {
        if (_isEquals) {
            if (this.operationType === OperationType.Update) {
                throw CustomException.Forbidden_Unchanged_Value
            }
            if(this.allowDuplicate){
                return new DiffDetail<BaseModel>({unchanged: this.formData})
            }
            throw CustomException.Forbidden_Unchanged_Value
        }
        return new DiffDetail<BaseModel>({updated: this.formData})
    }
    private _empty = (): DiffDetail<BaseModel> | null => {
        if (BaseType.isEmpty(this.cache.valueType) &&  BaseType.isEmpty(this.formData.valueType)) {
            if (this.operationType === OperationType.Create) {
                throw CustomException.Forbidden_Empty_Form_Data
            }
            if (this.operationType === OperationType.Read || this.operationType === OperationType.Delete) {
                return null
            }
            //Update，会先从后台加载数据，此时，cache为空，说明，加载数据失败
            throw CustomException.Load_Data_Exception
        }
        if (!BaseType.isEmpty(this.cache.valueType) && BaseType.isEmpty(this.formData.valueType)) {
            if (this.operationType === OperationType.Create) {
                throw CustomException.Forbidden_Empty_Form_Data
            }
            if (this.operationType === OperationType.Read || this.operationType === OperationType.Delete) {
                return null
            }
            return new DiffDetail<BaseModel>({deleted: this.cache})
        }

        //最后一种情况：cache为空，formData不为空
        if (this.operationType === OperationType.Update) {
            throw CustomException.Load_Data_Exception
        }
        return new DiffDetail<BaseModel>({added: this.formData})
    }
}

export { Diff }