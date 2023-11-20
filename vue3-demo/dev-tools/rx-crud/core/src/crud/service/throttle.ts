import { ThrottleConfig } from "@/crud/model/ThrottleConfig"

function throttle<R, A extends any[]>(
    fn: (...args: A) => R | Promise<R>,
    throttleConfig: ThrottleConfig): (...args: A) => R | Promise<R> | undefined {
    let flag = false

    return (...args: A) => {
        if (flag) return undefined
        const _fn = fn(...args)
        flag = true
        throttleConfig.before()
        setTimeout(() => {
            flag = false
            throttleConfig.after()
        }, throttleConfig.delay)
        return _fn
    }
}

export { throttle }