//强化后的类型
export enum BaseType {
    Empty = "Empty",
    //基本类型
    Int = "Int",
    Decimal = "Decimal",
    String = "String",
    Date = "Date",
    Boolean = "Boolean",
    //数组
    Array = "Array",
    //对象
    Object = "Object",
}
export namespace BaseType {
    export function isEmpty(baseType: BaseType) {
        return baseType === BaseType.Empty
    }
    export function isPrimitive(baseType: BaseType) {
        return [BaseType.Int, BaseType.Decimal, BaseType.String, BaseType.Date, BaseType.Boolean].includes(baseType)
    }

    export function isArray(baseType: BaseType) {
        return baseType === BaseType.Array
    }
}