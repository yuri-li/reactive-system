import type { FormInstance } from "element-plus"
import type { DiffDetail } from "@/crud/model/DiffDetail"
import type { Ref } from "vue"
import { DiffUpdate } from "@/crud/service/diff/DiffUpdate"
import { throttle } from "@/crud/service/throttle"

class Update<T> {
    private readonly cache: T
    disabledBtn: Ref<boolean>

    constructor(_cache: T) {
        this.cache = _cache
        const [_validate, _disabledBtn] = throttle(this.validate)
        this.disabledBtn = _disabledBtn
        this.validate = _validate as any
    }

    private async validate(formRef: FormInstance) {
        return await formRef.validate(() => {
        })
    }

    onSubmit = async <R>(formRef: FormInstance, formData: T, action: (t: DiffDetail<T>) => Promise<R>) => {
        const isValid = await this.validate(formRef)
        if (isValid) {
            return await action(this._compare(formData))
        }
    }

    private _compare = (formData: T) => {
        const diff = new DiffUpdate(this.cache, formData)
        return diff.detail!
    }
}

export {
    Update,
}