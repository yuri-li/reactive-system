import type { FormInstance } from "element-plus"
import type { DiffDetail } from "@/crud/model/DiffDetail"
import { DiffUpdate } from "@/crud/service/diff/DiffUpdate"
import { throttle } from "@/crud/service/throttle"
import { toRaw } from "@/crud/components/Create"
import { ThrottleConfig } from "@/crud/model/ThrottleConfig"

class Update<T> {
    private readonly cache: T

    constructor(_cache: T, throttleConfig: ThrottleConfig) {
        this.cache = toRaw(_cache)
        // @ts-ignore
        this.validate = throttle(this.validate,throttleConfig)
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