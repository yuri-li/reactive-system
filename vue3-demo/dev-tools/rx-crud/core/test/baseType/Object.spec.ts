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
} from "~/baseType/model"

describe("对象", () => {
    test("对象", () => {
        expect(toBaseType(new Person({username: "yuri"}))).toBe(BaseType.Object)
        expect(toBaseType(new Address({postcode: "47A894"}))).toBe(BaseType.Object)
    })
})