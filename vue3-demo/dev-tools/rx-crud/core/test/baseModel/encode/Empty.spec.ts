import {
    describe,
    expect,
    test,
} from "vitest"
import {
    Address,
    Person
} from "~/model"
import { toJson,emptyJson } from "~/baseModel/encode/model"

describe("empty", () => {
    test.each([null, undefined, NaN, Infinity])("1. 特殊类型【%s】 is Empty", (value) => {
        expect(toJson(value)).toBe(emptyJson)
    })
    test("2. 有换行符的空字符串",()=>{
        console.log(emptyJson)
        expect(toJson("\t\n")).toBe(emptyJson)
        expect(toJson(`  
      `)).toBe(emptyJson)
    })
    test.each([
        "",
        "   ",
        "  ",
    ])("3. 空字符串【%s】 is Empty", (value) => {
        expect(toJson(value)).toBe(emptyJson)
    })
    test.each([
        {}, new Error(), new Person(), new Address(),
    ])("4. 空对象【%s】 is Empty", (value) => {
        expect(toJson(value)).toBe(emptyJson)
    })
    test.each([
        new Person({username:"   "}),
        new Person({address: new Address({postcode: ""})}),
    ])("5. 嵌套的空对象【%s】 is Empty", (value) => {
        expect(toJson(value)).toBe(emptyJson)
    })
    test("6. 空数组",()=>{
        expect(toJson([])).toBe(emptyJson)
        expect(toJson([{}])).toBe(emptyJson)
        expect(toJson([new Person()])).toBe(emptyJson)
        expect(toJson([new Person({address: new Address({postcode: ""})})])).toBe(emptyJson)
        expect(toJson([{}, new Person()])).toBe(emptyJson)
    })
})