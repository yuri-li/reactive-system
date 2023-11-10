import {
    describe,
    expect,
    test,
} from "vitest"
import { toObject } from "~/baseModel/decode/model"
import {
    Color,
    Direction
} from "~/model"

describe("基本类型", () => {
    test.each([
        [`{"value":1,"valueType":"Int"}`, 1],
        [`{"value":0.01,"valueType":"Decimal"}`,0.01],
        [`{"value":1.01,"valueType":"Decimal"}`,1.01],
    ])("1. 数字【%s】 is %s", (json, obj) => {
        expect(toObject(json)).toBe(obj)
    })
    test.each([
        [`{"value":"a","valueType":"String"}`,"a"],
        [`{"value":"abc","valueType":"String"}`,"abc"],
        [`{"value":"😀","valueType":"String"}`,"😀"],
        [`{"value":"Hello World","valueType":"String"}`,`Hello World`],
    ])("2. 字符串【%s】 is %s", (json, obj) => {
        expect(toObject(json)).toBe(obj)
    })
    test.each([
        [`{"value":"2023-01-09T23:17:40.000Z","valueType":"String"}`, "2023-01-09T23:17:40.000Z"],
        [`{"value":"2023-01-09T23:17:40.000Z","valueType":"Date"}`, new Date("2023-01-09T23:17:40.000Z")],
    ])("3. 日期【%s】 is %s", (json, obj) => {
        expect(toObject(json)).toStrictEqual(obj)
    })
    test.each([
        [`{"value":true,"valueType":"Boolean"}`,true],
        [`{"value":false,"valueType":"Boolean"}`,false],
    ])("4. Boolean【%s】 is %s", (json, obj) => {
        expect(toObject(json)).toBe(obj)
    })
    test("5. 数字枚举", () => {
        expect(toObject(`{"value":1,"valueType":"Int"}`)).toBe(Color.Green)
    })
    test("6. 字符串枚举", () => {
        expect(toObject(`{"value":"UP","valueType":"String"}`)).toBe(Direction.Up)
    })
})