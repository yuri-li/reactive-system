import { BaseType, } from "@/crud/service/baseModel/model/BaseType"
import isPrimitive = BaseType.isPrimitive
import isArray = BaseType.isArray
import { CustomException } from "@/crud/model/CustomException"

function toBaseType(value?: unknown): BaseType {
    //1. 排除容易判断是否为空的类型
    if (isEmptyPrimitive(value)) {
        return BaseType.Empty
    }
    //数组、对象（需要递归判断），可能所有子元素都是空的，也认定为空
    const basic = checkInstance(value)
    //2. 是否基本类型
    if(isPrimitive(basic)){
        return basic
    }
    //3. 是否数组
    if(isArray(basic)){
        if(isEmptyArray(value as Array<unknown>)){
            return BaseType.Empty
        }
        return BaseType.Array
    }
    //4. 是否对象
    if (isEmptyObject(value as object)) {
        return BaseType.Empty
    }
    return BaseType.Object
}
function isEmptyArray(value: Array<unknown>){
    return value.every(v => toBaseType(v) === BaseType.Empty) || value.length === 0
}
function isEmptyObject(value: object) {
    return Object.values(value).every(v => toBaseType(v) === BaseType.Empty) || Object.keys(value).length === 0
}
function isEmptyPrimitive(value: unknown): boolean {
    if (value === undefined || value === null ||
        Number.isNaN(value) || value === Infinity ||
        value === "Invalid Date" ||
        (typeof value === "string" && (value as string).trim().length === 0)) {
        return true
    }
    if (value instanceof Map) {
        throw CustomException.Not_Supported_Map
    }
    if (value instanceof Set) {
        throw CustomException.Not_Supported_Set
    }
    return Array.isArray(value) && (value as Array<unknown>).length === 0
}

function checkInstance(value: unknown): BaseType {
    if (isDate(value)) {
        return BaseType.Date
    }
    if (isBoolean(value)) {
        return BaseType.Boolean
    }
    if (isString(value)) {
        return BaseType.String
    }
    if (isNumber(value)) {
        if (Number.isInteger(value)) {
            return BaseType.Int
        }
        return BaseType.Decimal
    }
    if (isArrayValue(value)) {
        return BaseType.Array
    }

    return BaseType.Object
}
function isDate(value: unknown){
    return value instanceof Date && Object.prototype.toString.call(value) === "[object Date]"  && !isNaN(value as any)
}

function isArrayValue(value: unknown) {
    return Array.isArray(value) && (value as Array<unknown>).length !== 0
}

function isString(value: unknown) {
    if(typeof value === "symbol"){
        throw CustomException.Not_Supported_Symbol
    }
    return typeof value === "string" && (value as string).trim().length !== 0
}

function isBoolean(value: unknown) {
    return typeof value === "boolean" && (value || !value)
}

function isNumber(value: unknown) {
    if(typeof value === "bigint"){
        throw CustomException.Not_Supported_BigInt
    }
    return typeof value === "number"
}
export { toBaseType, isEmptyPrimitive, isDate,isBoolean,isString,isNumber,isArrayValue,isEmptyObject,}