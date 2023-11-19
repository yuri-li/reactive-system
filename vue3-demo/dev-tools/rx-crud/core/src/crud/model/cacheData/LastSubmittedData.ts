import { CustomException } from "@/crud/model/CustomException"
import { isEmpty } from "@/crud/service/baseModel/isEmpty"

enum StorageType {
    Session = "Session",
    Local = "Local",
}

/**
 * 缓存上一次提交的数据
 */
class LastSubmittedData<T> {
    readonly cacheKey: string
    readonly storageType: StorageType

    constructor(_cacheKey: string, _storageType: StorageType) {
        if (isEmpty(_cacheKey)) {
            throw CustomException.Required_Cache_Key
        }
        this.cacheKey = _cacheKey
        this.storageType = _storageType
    }

    public getData(): T | null {
        const _data = this.read()
        if (isEmpty(_data)) {
            return null
        } else {
            return JSON.parse(_data!) as T
        }
    }

    public clearCache() {
        if (this.storageType === StorageType.Local) {
            localStorage.removeItem(this.cacheKey)
        } else {
            sessionStorage.removeItem(this.cacheKey)
        }
    }

    private read() {
        if (this.storageType === StorageType.Local) {
            return localStorage.getItem(this.cacheKey)
        } else {
            return sessionStorage.getItem(this.cacheKey)
        }
    }

    public setData(_data: T | null) {
        const _json = this.toJson(_data)
        if (_json !== null) {
            if (this.storageType === StorageType.Local) {
                localStorage.setItem(this.cacheKey, _json)
            } else {
                sessionStorage.setItem(this.cacheKey, _json)
            }
        }
    }

    private toJson(_data: T | null) {
        if (isEmpty(_data)) {
            return null
        } else {
            return JSON.stringify(_data)
        }
    }
}

export {
    LastSubmittedData,
    StorageType,
}