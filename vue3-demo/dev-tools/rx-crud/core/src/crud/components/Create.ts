import type { FormInstance } from "element-plus"
import { Diff } from "@/crud/service/diff"
import { OperationType } from "@/crud/model/OperationType"
import { decodeDiffDetail } from "@/crud/model/DiffDetail"
import type { Ref } from "vue"
import { throttle } from "@/crud/service/throttle"
import { LastSubmittedData } from "@/crud/model/cacheData/LastSubmittedData"
import type { ContainsInitData } from "@/crud/model/cacheData/ContainsInitData"

abstract class Operator<T> {
    cache: T | LastSubmittedData<T> | ContainsInitData<T>
    disabledBtn: Ref<boolean>
    allowDuplicate: boolean

    protected async validate(formRef: FormInstance) {
        return await formRef.validate(() => {
        })
    }

    public constructor(_cache: T | LastSubmittedData<T> | ContainsInitData<T>, _allowDuplicate: boolean = false) {
        this.cache = _cache
        this.allowDuplicate = _allowDuplicate
        const [_validate, _disabledBtn] = throttle(this.validate)
        this.disabledBtn = _disabledBtn
        this.validate = _validate as any
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
}