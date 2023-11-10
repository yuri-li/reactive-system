import { describe, expect, test, } from "vitest"

import { address } from "@/components/cascader/address/model"

describe("JSON", () => {
    test("读取json文件", () => {
        console.log(JSON.stringify(address))
        expect(address.length).toBe(3)
    })
})