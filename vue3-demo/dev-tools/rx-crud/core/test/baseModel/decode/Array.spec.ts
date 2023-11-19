import {
    describe,
    test,
} from "vitest"
import {
    Address,
    Person
} from "~/model"
import { decodeBaseModel } from "@/crud/service/baseModel/decode/decodeBaseModel"
import { toBaseModel } from "@/crud/service/baseModel/encode/toBaseModel"

describe("数组", () => {
    test("数字、字符串、空对象", () => {
        expect(JSON.stringify(decodeBaseModel(toBaseModel([1, 2])))).toBe("[1,2]")
        expect(JSON.stringify(decodeBaseModel(toBaseModel([1, "abc"])))).toBe(`[1,"abc"]`)
        expect(JSON.stringify(decodeBaseModel(toBaseModel([1, "abc", {}])))).toBe(`[1,"abc"]`)
        expect(decodeBaseModel(toBaseModel(["", {}]))).toBe(null)
        expect(JSON.stringify(decodeBaseModel(toBaseModel([new Person({username: "yuri"})])))).toBe(`[{"username":"yuri"}]`)
        expect(JSON.stringify(decodeBaseModel(toBaseModel([new Address({postcode: "47A894"})])))).toBe(`[{"postcode":"47A894"}]`)
    })
})