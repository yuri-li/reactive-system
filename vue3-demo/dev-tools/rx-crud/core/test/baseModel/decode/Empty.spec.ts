import {
    describe,
    expect,
    test,
} from "vitest"
import { BaseModel } from "@/crud/service/baseModel/model/BaseModel"
import { decodeBaseModel } from "@/crud/service/baseModel/decode/decodeBaseModel"

describe("empty", () => {
    test("Empty BaseModel对应的js object是什么？", () => {
        const json = `{"valueType":"Empty"}`

        const baseModel = new BaseModel()
        expect(JSON.stringify(baseModel)).toBe(json)
        expect(decodeBaseModel(baseModel)).toBeNull()
    })
})