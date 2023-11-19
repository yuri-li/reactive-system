import {
    describe,
    expect,
    test,
} from "vitest"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import { toBaseType } from "@/crud/service/baseModel/encode/toBaseType"
import {
    Address,
    Person
} from "~/model"
describe("empty", () => {
    test.each([null, undefined, NaN, Infinity])("1. 特殊类型【%s】 is Empty", (value) => {
        expect(toBaseType(value)).toBe(BaseType.Empty)
    })
    test("2. 有换行符的空字符串",()=>{
        expect(toBaseType("\t\n")).toBe(BaseType.Empty)
        expect(toBaseType(`  
      `)).toBe(BaseType.Empty)
    })
    test.each([
        "",
        "   ",
        "  ",
    ])("3. 空字符串【%s】 is Empty", (value) => {
        expect(toBaseType(value)).toBe(BaseType.Empty)
    })
    test.each([
        {}, new Error(), new Person(), new Address(),
    ])("4. 空对象【%s】 is Empty", (value) => {
        expect(toBaseType(value)).toBe(BaseType.Empty)
    })
    test.each([
        new Person({username:"   "}),
        new Person({address: new Address({postcode: ""})}),
    ])("5. 嵌套的空对象【%s】 is Empty", (value) => {
        expect(toBaseType(value)).toBe(BaseType.Empty)
    })
    test("6. 空数组",()=>{
        expect(toBaseType([])).toBe(BaseType.Empty)
        expect(toBaseType([{}])).toBe(BaseType.Empty)
        expect(toBaseType([new Person()])).toBe(BaseType.Empty)
        expect(toBaseType([new Person({address: new Address({postcode: ""})})])).toBe(BaseType.Empty)
        expect(toBaseType([{}, new Person()])).toBe(BaseType.Empty)
    })
})