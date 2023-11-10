import { describe, expect, test } from "vitest"
import { enumKeys } from "@/util/EnumExtension"

enum Direction {
    Up = "UP", Down = "DOWN", Left = "LEFT", Right = "RIGHT",
}

enum Align {
    LEFT, CENTER, RIGHT
}

describe("测试typescript enum", () => {
    test("字符串形式", () => {
        // eslint-disable-next-line quotes
        expect(JSON.stringify(Direction)).toBe(`{"Up":"UP","Down":"DOWN","Left":"LEFT","Right":"RIGHT"}`)
    })
    test("遍历所有value", () => {
        // eslint-disable-next-line quotes
        expect(JSON.stringify(Align)).toBe(`{"0":"LEFT","1":"CENTER","2":"RIGHT","LEFT":0,"CENTER":1,"RIGHT":2}`)

        enumKeys(Direction).forEach(key => console.log(`key: ${key}, value: ${Direction[key]}`))
        enumKeys(Align).forEach(key => console.log(`key: ${key}, value: ${Align[key]}`))
    })
})