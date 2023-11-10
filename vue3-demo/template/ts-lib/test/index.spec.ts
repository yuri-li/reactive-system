import { describe, test, expect } from "vitest"
import { msg } from "@/index"

describe("src/index.ts", () => {
    test("msg", () => {
        expect(msg).toBe("hello world")
    })
})