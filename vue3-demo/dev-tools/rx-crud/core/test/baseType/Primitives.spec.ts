import {
    describe,
    expect,
    test,
} from "vitest"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import { toBaseType } from "@/crud/service/baseModel/encode/toBaseType"
import {
    Color,
    Direction,
} from "~/model"

describe("基本类型", () => {
    test.each([
        [1, BaseType.Int],
        [0.01, BaseType.Decimal],
        [1.01, BaseType.Decimal],
    ])("1. 数字【%s】 is %s", (value, valueType) => {
        expect(toBaseType(value)).toBe(valueType)
    })
    test.each([
        ["a"], ["abc"], ["😀"], ["Hello\tWorld"],
    ])("2. 字符串【%s】 is String", (value) => {
        expect(toBaseType(value)).toBe(BaseType.String)
    })
    test("3. 日期", () => {
        expect(toBaseType("2023-01-09T23:17:40.000Z")).toBe(BaseType.String)
        expect(toBaseType(new Date("2023-01-09T23:17:40.000Z"))).toBe(BaseType.Date)
        expect(toBaseType(new Date())).toBe(BaseType.Date)
        expect(toBaseType(new Date("abc"))).toBe(BaseType.Empty)
    })
    test("4. Boolean", () => {
        expect(toBaseType(true)).toBe(BaseType.Boolean)
        expect(toBaseType(false)).toBe(BaseType.Boolean)
    })
    test("5. 数字枚举", () => {
        expect(toBaseType(Color.Green)).toBe(BaseType.Int)
    })
    test("6. 字符串枚举", () => {
        expect(toBaseType(Direction.Up)).toBe(BaseType.String)
    })
})