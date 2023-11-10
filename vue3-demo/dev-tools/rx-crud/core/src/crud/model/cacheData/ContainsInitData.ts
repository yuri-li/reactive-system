import {
    LastSubmittedData,
    StorageType
} from "@/crud/model/cacheData/LastSubmittedData"

/**
 * 缓存上一次提交的数据，且，设置初始值
 */
class ContainsInitData<T> extends LastSubmittedData<T> {
    constructor(_initData: T, _cacheKey: string, _storageType: StorageType) {
        super(_cacheKey, _storageType)
        this.setData(_initData)
    }
}

export { ContainsInitData }