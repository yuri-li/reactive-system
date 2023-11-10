import type { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"

function isCollectionEquals(_cache: BaseModel, _formData: BaseModel): boolean {
    if (_cache.isAllPrimitives && !_formData.isAllPrimitives) {
        return false
    }
    if (_cache.key !== _formData.key) {
        return false
    }
    if (_cache.valueType !== _formData.valueType) {
        return false
    }
    if (BaseType.isPrimitive(_cache.valueType!)) {
        return _cache.value === _formData.value
    }
    const cache = _cache.value as BaseModel[]
    const formData = _formData.value as BaseModel[]
    if (_cache.isAllPrimitives) {
        if (cache.length !== formData.length) {
            return false
        }
        if (cache.filter(x => formData.some(y => x.key === y.key && x.valueType === y.valueType && x.value === y.value)).length !== cache.length) {
            return false
        }
        // noinspection RedundantIfStatementJS
        if (formData.filter(x => cache.some(y => x.key === y.key && x.valueType === y.valueType && x.value === y.value)).length !== formData.length) {
            return false
        }
        return true
    }

    return isAllCollectionEquals(cache, formData)
}

function isAllCollectionEquals(_cache: BaseModel[], _formData: BaseModel[]) {
    if (_cache.filter(x => _formData.some(y => isCollectionEquals(x, y))).length !== _cache.length) {
        return false
    }
    // noinspection RedundantIfStatementJS
    if (_formData.filter(x => _cache.some(y => isCollectionEquals(x, y))).length !== _formData.length) {
        return false
    }
    return true
}

export { isCollectionEquals,isAllCollectionEquals, }