import { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import {
    isArrayValue as isArray,
    isBoolean,
    isDate,
    isEmptyPrimitive,
    isNumber,
    isString,
    isEmptyObject,
} from "@/crud/service/baseModel/encode/toBaseType"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import isPrimitive = BaseType.isPrimitive

function toBaseModel(value: unknown): BaseModel {
    const model = _toBaseModel(undefined, value)
    if (model.valueType === BaseType.Object) {
        model.value = (model.value as BaseModel[]).filter(x => x.valueType !== BaseType.Empty)
        if (_isEmptyArray(model.value)) {
            return new BaseModel()
        }
    }
    return model
}

function _toBaseModel(key: string | number | undefined, value: unknown): BaseModel {
    if (isEmptyPrimitive(value)) {
        return new BaseModel({key})
    }
    return _toPrimitive(key, value)
}

function _toPrimitive(key: string | number | undefined, value: unknown): BaseModel {
    if (isDate(value)) {
        return new BaseModel({key, value: (value as Date).toISOString(), valueType: BaseType.Date})
    }
    if (isBoolean(value)) {
        return new BaseModel({key, value: value as boolean, valueType: BaseType.Boolean})
    }
    if (isString(value)) {
        return new BaseModel({key, value: value as string, valueType: BaseType.String})
    }
    if (isNumber(value)) {
        if (Number.isInteger(value)) {
            return new BaseModel({key, value: value as number, valueType: BaseType.Int})
        }
        return new BaseModel({key, value: value as number, valueType: BaseType.Decimal})
    }
    if (isArray(value)) {
        return _toArray(key, value as Array<any>)
    }
    if (isEmptyObject(value as object)) {
        return new BaseModel({key})
    }
    return _toObject(key, value as object)
}

function _toObject(key: string | number | undefined, value: object) {
    const array = Object.entries(value).map(([__key, __value]) => _toBaseModel(__key, __value)).filter(x => x.valueType !== BaseType.Empty)
    return new BaseModel({
        key: key,
        value: array,
        valueType: BaseType.Object,
        isAllPrimitives: _isAllPrimitives(array.every(x => isPrimitive(x.valueType!))),
    })
}

function _toArray(key: string | number | undefined, value: Array<any>) {
    const array: BaseModel[] = []
    value.forEach((_value: any) => {
        _buildArrayItem(_value, array)
    })
    if (_isEmptyArray(array)) {
        return new BaseModel({key})
    }
    return new BaseModel({
        key: key,
        value: array,
        valueType: BaseType.Array,
        isAllPrimitives: _isAllPrimitives(array.every(x => isPrimitive(x.valueType!)))
    })
}

function _buildArrayItem(_value: any, array: BaseModel[]) {
    const temp = _toBaseModel(undefined, _value)
    if (temp.valueType !== BaseType.Empty) {
        array.push(temp)
    }
}

function _isEmptyArray(array: BaseModel[]) {
    return array.length === 0 || array.filter(x => x.valueType !== BaseType.Empty).length === 0
}

function _isAllPrimitives(flag: boolean) {
    if (!flag) {
        return undefined
    }
    return true
}

export { toBaseModel }