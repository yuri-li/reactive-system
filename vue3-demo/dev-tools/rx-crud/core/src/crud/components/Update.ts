import type { FormInstance } from "element-plus"
import { Diff } from "@/crud/service/diff"
import { OperationType } from "@/crud/model/OperationType"
import { CustomException } from "@/crud/model/CustomException"
import type { DiffDetail } from "@/crud/model/DiffDetail"
import type { Ref } from "vue"
import { throttle } from "@/crud/service/throttle"
import { isEmpty } from "@/crud/service/baseModel/isEmpty"

class Update<T extends { id: string | undefined }> {
    private readonly cache: T
    disabledBtn: Ref<boolean>

    constructor(_cache: T) {
        //Update，要从后台加载数据。所以，`cache`必须有值
        if (isEmpty(_cache) || isEmpty(_cache.id)) {
            throw CustomException.Load_Data_Exception
        }
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
        if (this.cache.id !== formData.id) {
            throw CustomException.Unexpected_Data_Type
        }
        const _id = this.cache.id
        this.cache.id = undefined
        formData.id = undefined

        const diff = new Diff(this.cache, formData, OperationType.Update, false)
        const detail = diff.detail

        if (isEmpty(detail!.unchanged)) {
            detail!.unchanged = {id: _id} as any
        } else {
            detail!.unchanged!.id = _id
        }
        this.cache.id = _id
        formData.id = _id

        return detail!!
    }
}

export {
    Update
}