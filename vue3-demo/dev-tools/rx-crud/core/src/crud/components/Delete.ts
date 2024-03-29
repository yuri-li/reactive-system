import { Diff } from "@/crud/service/diff"
import { OperationType } from "@/crud/model/OperationType"
import { decodeDiffDetail } from "@/crud/model/DiffDetail"
import { throttle } from "@/crud/service/throttle"
import { BusinessException } from "@/globalException"
import { LastSubmittedData } from "@/crud/model/cacheData/LastSubmittedData"
import { toRaw } from "@/crud/components/Create"
import { ThrottleConfig } from "@/crud/model/ThrottleConfig"

class Delete<T> {
    private readonly cache: T | T[] | LastSubmittedData<T | T[]>
    private readonly allowDuplicate: boolean
    private readonly allowEmpty: boolean

    private validate(): void | undefined {
    }

    constructor(_cache: T | T[] | LastSubmittedData<T | T[]>, throttleConfig: ThrottleConfig, _allowDuplicate: boolean = false, _allowEmpty: boolean = false) {
        this.cache = toRaw(_cache)
        this.allowDuplicate = _allowDuplicate
        this.allowEmpty = _allowEmpty
        // @ts-ignore
        this.validate = throttle(this.validate, throttleConfig)
    }

    onSubmit = async <R>(dto: T | T[] | null, action: (t: T | T[] | null) => Promise<R>) => {
        const isValid = this.validate()
        if (isValid !== undefined) {
            return await action(this._compare(dto))
        }
    }

    private _compare = (dto: T | T[] | null): T | T[] | null => {
        const diff = new Diff(this._getCache(), dto, OperationType.Delete, this.allowDuplicate)
        const detail = diff.detail
        if (detail === null) {
            if (this.allowEmpty) {
                return null
            }
            throw new BusinessException("禁止删除全部")
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const model = decodeDiffDetail(diff.detail!)!
        this._setCache(model)
        return model
    }
    private _getCache = (): T | T[] => {
        if (this.cache instanceof LastSubmittedData) {
            return this.cache.getData()!
        }
        return this.cache
    }
    private _setCache = (model: T | T[]) => {
        if (this.cache instanceof LastSubmittedData) {
            this.cache.setData(model)
        }
    }
}

export {
    Delete
}