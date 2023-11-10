import {
    describe,
    expect,
    test,
} from "vitest"
import { BaseType } from "@/crud/service/baseModel/model/BaseType"
import { toBaseType } from "@/crud/service/baseModel/encode/toBaseType"

describe("数组", () => {
    test("数组",()=>{
        expect(toBaseType([1,2])).toBe(BaseType.Array)
        expect(toBaseType([1, "abc"])).toBe(BaseType.Array)
        expect(toBaseType([1, "abc", {}])).toBe(BaseType.Array)
        expect(toBaseType(["", {}])).toBe(BaseType.Empty)
    })
})