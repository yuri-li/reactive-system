import {
    ref,
} from "vue"
import type {Ref} from "vue"

function throttle<R, A extends any[]>(fn: (...args: A) => R | Promise<R>, delay: number = 3000): [(...args: A) => R | Promise<R> | undefined, Ref<boolean>]{
    const disabledBtn:Ref<boolean> = ref(false)

    return [(...args: A) => {
        if (disabledBtn.value) return undefined
        const _fn = fn(...args)
        disabledBtn.value = true
        setTimeout(() => {
            disabledBtn.value = false
        }, delay)
        return _fn
    }, disabledBtn]
}
export { throttle }