import { describe, test, expect } from "vitest"
import { isEmpty } from "lodash"
import { address } from "@/components/cascader/address/model"

describe("JSON", () => {
    test.skip("读取json文件", () => {
        console.log(JSON.stringify(address))
        expect(address.length).toBe(3)
    })
    test.each([
        [-1, true],
        [0, true],
        [1, true],
        [2, true],
        [true, true],
        [false, true],
        [undefined, true],
        [null, true],
        ["", true]
    ])("isEmpty(%s) -> %s", (obj, expected) => {
        expect(isEmpty(obj)).toBe(expected)
    })
})