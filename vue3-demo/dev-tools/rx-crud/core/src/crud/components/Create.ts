import type { FormInstance } from "element-plus"
import { Diff } from "@/crud/service/diff"
import { OperationType } from "@/crud/model/OperationType"
import { decodeDiffDetail } from "@/crud/model/DiffDetail"
import { throttle } from "@/crud/service/throttle"
import { LastSubmittedData } from "@/crud/model/cacheData/LastSubmittedData"
import { ContainsInitData } from "@/crud/model/cacheData/ContainsInitData"
import { ThrottleConfig } from "@/crud/model/ThrottleConfig"

function toRaw<T>(value: T | LastSubmittedData<T> | ContainsInitData<T>) {
    if (value instanceof LastSubmittedData || value instanceof ContainsInitData) {
        return value
    } else {
        return JSON.parse(JSON.stringify(value))
    }
}

abstract class Operator<T> {
    protected cache: T | LastSubmittedData<T> | ContainsInitData<T>
    protected allowDuplicate: boolean

    protected async validate(formRef: FormInstance) {
        return await formRef.validate(() => {
        })
    }

    public constructor(_cache: T | LastSubmittedData<T> | ContainsInitData<T>, throttleConfig: ThrottleConfig, _allowDuplicate: boolean = false) {
        this.cache = toRaw(_cache)
        this.allowDuplicate = _allowDuplicate
        // @ts-ignore
        this.validate = throttle(this.validate, throttleConfig)
    }

    public clearCache() {
        if (this.cache instanceof LastSubmittedData) {
            this.cache.clearCache()
        }
    }

    protected _getCache = () => {
        if (this.cache instanceof LastSubmittedData) {
            return this.cache.getData()
        }
        return this.cache as T
    }
    protected _setCache = (model: T) => {
        if (this.cache instanceof LastSubmittedData) {
            this.cache.setData(model as any)
        }
    }
}

class Create<T> extends Operator<T> {
    onSubmit = async <R>(formRef: FormInstance, formData: T, action: (t: T) => Promise<R>) => {
        const isValid = await this.validate(formRef)
        if (isValid) {
            return await action(this._compare(formData))
        }
    }

    private _compare = (formData: T) => {
        const diff = new Diff(this._getCache(), formData, OperationType.Create, this.allowDuplicate)
        //新增操作，提交的数据不为空
        const model = decodeDiffDetail(diff.detail!)!
        this._setCache(model)
        return model
    }
}

export {
    Create,
    Operator,
    toRaw,
}