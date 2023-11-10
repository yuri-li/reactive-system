import { FormInstance } from "element-plus"
import {
    ref,
    Ref
} from "vue"

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
class Create<T> {
    formData: T
    disabledBtn:Ref<boolean>
    private async validate(formRef: FormInstance){
        return await formRef.validate(() => {})
    }
    public constructor(_formData: T) {
        this.formData = _formData
        const [_validate, _disabledBtn] = throttle(this.validate)
        this.disabledBtn = _disabledBtn
        this.validate = _validate as any
    }
    onSubmit = async <R>(formRef: FormInstance, action: (t: T) => Promise<R>)  => {
        const isValid = await this.validate(formRef)
        if (isValid) {
            console.log("isValid,,,",isValid)
            console.log("formData,,,",this.formData)

            return await action(this.formData)
        }
    }
}

class Person {
    id: string | undefined
    username: string | undefined
    age: number | undefined

    public constructor(init?: Partial<Person>) {
        Object.assign(this, init)
    }
}

export {
    Create,
    Person,
}