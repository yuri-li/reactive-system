import { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { DiffDetail } from "@/crud/model/DiffDetail"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import { CustomException } from "@/crud/model/CustomException"

function diffObject(_cache: BaseModel, _formData: BaseModel): DiffDetail<BaseModel> {
    const model = _diffCollection(_cache.value as BaseModel[], _formData.value as BaseModel[])
    if (model.added === undefined && model.deleted === undefined && model.updated === undefined) {
        throw CustomException.Forbidden_Unchanged_Value
    }
    return model
}

function diffCollection(_cache: BaseModel[], _formData: BaseModel[]): DiffDetail<BaseModel> {
    const model = _diffCollection(_cache, _formData)
    if (model.added === undefined && model.deleted === undefined && model.updated === undefined) {
        throw CustomException.Forbidden_Unchanged_Value
    }
    return model
}

function _buildElement(values: BaseModel[], x: BaseModel, result: BaseModel[]) {
    if (result.length === 0) {
        result.push(new BaseModel({key: x.key, valueType: x.valueType, value: [...values]}))
    } else {
        const _filteredArr = result.filter(s => s.key === x.key)
        if (_filteredArr.length === 0) {
            result.push(new BaseModel({key: x.key, valueType: x.valueType, value: [...values]}))
        } else {
            _filteredArr[0].value = [...values]
        }
    }
}

function _diffCollection(_cache: BaseModel[], _formData: BaseModel[]): DiffDetail<BaseModel> {
    const [added, deleted, updated, unchanged]: [BaseModel[], BaseModel[], BaseModel[], BaseModel[]] = [[], [], [], []]

    function _buildCollection(x: BaseModel, _diff: DiffDetail<BaseModel>) {
        if (_diff.added) {
            _buildElement(_diff.added.value as BaseModel[], x, added)
        }
        if (_diff.deleted) {
            _buildElement(_diff.deleted.value as BaseModel[], x, deleted)
        }
        if (_diff.updated) {
            _buildElement(_diff.updated.value as BaseModel[], x, updated)
        }
        if (_diff.unchanged) {
            _buildElement(_diff.unchanged.value as BaseModel[], x, unchanged)
        }
    }

    _cache.forEach(x => {
        const property = _formData.filter(y => y.key === x.key && y.valueType === x.valueType)
        if (property && property.length === 1) {
            if (BaseType.isPrimitive(property[0].valueType!)) {
                if (x.value === property[0].value) {
                    unchanged!.push(property[0])
                } else {
                    updated!.push(property[0])
                }
            } else {
                const _diff: DiffDetail<BaseModel> = _diffCollection(x.value as BaseModel[], property[0].value as BaseModel[])
                _buildCollection(x, _diff)
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

export {
    diffObject,
    diffCollection,
}