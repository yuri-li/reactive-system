import { describe, test, expect } from "vitest"
import { format12Hours, pan } from "@/components/clock/model"

describe("测试一些基本的函数", () => {
    test.each`
   time  | expected
   ${0}  | ${"00"}
   ${1}  | ${"01"}
   ${9}  | ${"09"}
   ${10} | ${"10"}
   ${59} | ${"59"}
`("convert $time to $expected", ({time, expected}) => {
        expect(pan(time)).toBe(expected)
    })

    test.each`
    hour | expected
    ${1} | ${1}
    ${10} | ${10}
    ${12} | ${12}
    ${23} | ${11}
    ${24} | ${12}
    `("convert hour $hour to $expected", ({hour, expected}) => {
        expect(format12Hours(hour)).toBe(expected)
    })
})