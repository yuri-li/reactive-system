import type { FormInstance } from "element-plus"
import { Diff } from "@/crud/service/diff"
import { OperationType } from "@/crud/model/OperationType"
import { decodeDiffDetail } from "@/crud/model/DiffDetail"
import { BusinessException } from "@/globalException"
import { Operator } from "@/crud/components/Create"
import type { LastSubmittedData } from "@/crud/model/cacheData/LastSubmittedData"
import type { ContainsInitData } from "@/crud/model/cacheData/ContainsInitData"

class Read<T> extends Operator<T> {
    private readonly allowEmpty: boolean

    constructor(_cache: T | LastSubmittedData<T> | ContainsInitData<T>, _allowDuplicate: boolean = false, _allowEmpty: boolean = false) {
        super(_cache, _allowDuplicate)
        this.allowEmpty = _allowEmpty
    }

    onSubmit = async <R>(formRef: FormInstance, formData: T, action: (t: T | null) => Promise<R>) => {
        const isValid = await this.validate(formRef)
        if (isValid) {
            return await action(this._compare(formData))
        }
    }

    private _compare = (formData: T) => {
        const diff = new Diff(this._getCache(), formData, OperationType.Read, this.allowDuplicate)
        const detail = diff.detail
        if (detail === null) {
            if(this.allowEmpty){
                return null
            }
            throw new BusinessException("禁止查询全部")
        }
        const model = decodeDiffDetail(diff.detail!)!
        this._setCache(model)
        return model
    }
}

export {
    Read
}