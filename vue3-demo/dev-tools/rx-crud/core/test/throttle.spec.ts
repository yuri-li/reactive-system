import {
    describe,
    expect
} from "vitest"
import { throttle } from "@/crud/service/throttle"

describe("测试throttle",()=>{
    test("普通函数",()=>{
        const msg = "executed"
        const fn = () => msg
        const [throttledFn,disabledBtn] = throttle(fn)
        expect(throttledFn()).toBe(msg)
        expect(disabledBtn.value).toBe(true)

        expect(throttledFn()).toBeUndefined()
        expect(throttledFn()).toBeUndefined()
        expect(disabledBtn.value).toBe(true)

        setTimeout(()=>{
            expect(disabledBtn.value).toBe(false)
            expect(throttledFn()).toBe(msg)
            expect(disabledBtn.value).toBe(true)
        }, 3000)
    })
    test("Promise函数",async () => {
        const msg = "executed"
        const fn = () => new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(msg)
            }, 1000)
        })
        const [throttledFn, disabledBtn] = throttle(fn)

        expect(await throttledFn()).toBe(msg)
        expect(disabledBtn.value).toBe(true)

        expect(await throttledFn()).toBeUndefined()
        expect(await throttledFn()).toBeUndefined()
        expect(disabledBtn.value).toBe(true)
        setTimeout(async () => {
            expect(disabledBtn.value).toBe(false)
            expect(await throttledFn()).toBe(msg)
            expect(disabledBtn.value).toBe(true)
        }, 4000)
    })
})