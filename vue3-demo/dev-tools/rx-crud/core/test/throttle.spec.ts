import {
    describe,
    expect
} from "vitest"
import { throttle } from "@/crud/service/throttle"
import { ThrottleConfig } from "@/crud/model/ThrottleConfig"

const config = new ThrottleConfig(3000, () => {
}, () => {
})
describe("测试throttle", () => {
    test("普通函数", () => {
        const msg = "executed"
        const fn = () => msg
        const throttledFn = throttle(fn, config)
        expect(throttledFn()).toBe(msg)

        expect(throttledFn()).toBeUndefined()
        expect(throttledFn()).toBeUndefined()

        setTimeout(() => {
            expect(throttledFn()).toBe(msg)
        }, 3000)
    })
    test("Promise函数", async () => {
        const msg = "executed"
        const fn = () => new Promise((resolve) => {
            setTimeout(() => {
                resolve(msg)
            }, 1000)
        })
        const throttledFn = throttle(fn, config)

        expect(await throttledFn()).toBe(msg)

        expect(await throttledFn()).toBeUndefined()
        expect(await throttledFn()).toBeUndefined()
        setTimeout(async () => {
            expect(await throttledFn()).toBe(msg)
        }, 4000)
    })
})