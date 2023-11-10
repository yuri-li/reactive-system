import { toBaseType } from "@/crud/service/baseModel/encode/toBaseType"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import isEmptyValue = BaseType.isEmpty

function isEmpty(value?: unknown): boolean {
    return isEmptyValue(toBaseType(value))
}

export { isEmpty }