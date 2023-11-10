import { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { DiffDetail } from "@/crud/model/DiffDetail"
import { isCollectionEquals } from "@/crud/service/diff/isCollectionEquals"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"

function diffObject(_cache: BaseModel[], _formData: BaseModel[]): DiffDetail<BaseModel> {
    const [added, deleted, updated, unchanged]: [BaseModel[], BaseModel[], BaseModel[], BaseModel[]] = [[], [], [], []]

    _cache.forEach(x => {
        const property = _formData.filter(y => y.key === x.key && y.valueType === x.valueType)
        if (property && property.length === 1) {
            if (isBaseModelEquals(x, property[0])) {
                unchanged!.push(property[0])
            } else {
                updated!.push(property[0])
            }
        } else {
            deleted!.push(x)
        }
    })
    _formData.forEach(x => {
        const property = _cache.filter(y => y.key === x.key && y.valueType === x.valueType)
        if (property && property.length === 0) {
            added!.push(x)
        }
    })
    return _buildDiffDetailForObject(added, deleted, updated, unchanged)
}
function _buildDiffDetailForObject(added: BaseModel[], deleted: BaseModel[], updated: BaseModel[], unchanged: BaseModel[]) {
    const model = new DiffDetail<BaseModel>()
    if (isNotEmpty(added)) {
        model.added = new BaseModel({value: added, valueType: BaseType.Object})
    }
    if (isNotEmpty(deleted)) {
        model.deleted = new BaseModel({value: deleted, valueType: BaseType.Object})
    }
    if (isNotEmpty(updated)) {
        model.updated = new BaseModel({value: updated, valueType: BaseType.Object})
    }
    if (isNotEmpty(unchanged)) {
        model.unchanged = new BaseModel({value: unchanged, valueType: BaseType.Object})
    }
    return model
}
function isNotEmpty(arr: BaseModel[]) {
    return arr!.length > 0
}
function isBaseModelEquals(x: BaseModel, y: BaseModel) {
    if (BaseType.isPrimitive(y.valueType!)) {
        return x.value === y.value
    }
    return isCollectionEquals(x, y)
}

export { diffObject }