import {
    describe,
    expect
} from "vitest"

class Animal {
    name: string = "animal"
}

class Pig extends Animal {
    name: string = "pig"
}

describe("测试instanceof的用法", () => {
    test("Is pig Animal?", () => {
        const pig = new Pig()
        expect(pig instanceof Pig).toBeTruthy()
        expect(pig instanceof Animal).toBeTruthy()
    })
})