import {
    describe,
    expect,
    test,
} from "vitest"
import { toJson } from "~/baseModel/encode/model"
import {
    Color,
    Direction,
} from "~/model"

describe("基本类型", () => {
    test.each([
        [1, `{"value":1,"valueType":"Int"}`],
        [0.01, `{"value":0.01,"valueType":"Decimal"}`],
        [1.01, `{"value":1.01,"valueType":"Decimal"}`],
    ])("1. 数字【%s】 is %s", (value, json) => {
        expect(toJson(value)).toBe(json)
    })
    test.each([
        ["a", `{"value":"a","valueType":"String"}`],
        ["abc", `{"value":"abc","valueType":"String"}`],
        ["😀", `{"value":"😀","valueType":"String"}`],
        [`Hello World`, `{"value":"Hello World","valueType":"String"}`],
    ])("2. 字符串【%s】 is %s", (value, json) => {
        expect(toJson(value)).toBe(json)
    })
    test.each([
        ["2023-01-09T23:17:40.000Z", `{"value":"2023-01-09T23:17:40.000Z","valueType":"String"}`],
        [new Date("2023-01-09T23:17:40.000Z"), `{"value":"2023-01-09T23:17:40.000Z","valueType":"Date"}`],
        [new Date("abc"), `{"valueType":"Empty"}`], //日期格式错误
    ])("3. 日期【%s】 is %s", (value, json) => {
        expect(toJson(value)).toBe(json)
    })
    test.each([
        [true, `{"value":true,"valueType":"Boolean"}`],
        [false, `{"value":false,"valueType":"Boolean"}`],
    ])("4. Boolean【%s】 is %s", (value, json) => {
        expect(toJson(value)).toBe(json)
    })
    test("5. 数字枚举", () => {
        expect(toJson(Color.Green)).toBe(`{"value":1,"valueType":"Int"}`)
    })
    test("6. 字符串枚举", () => {
        expect(toJson(Direction.Up)).toBe(`{"value":"UP","valueType":"String"}`)
    })
})