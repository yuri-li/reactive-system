import { reactive } from "vue"
import { FormRules } from "element-plus"

class Person {
    id: string | undefined
    username: string | undefined
    age: number | undefined

    public constructor(init?: Partial<Person>) {
        Object.assign(this, init)
    }
}
const formRules = reactive<FormRules<Person>>({
    username: [
        {required: true, message: "请输入用户名", trigger: "blur"},
        {min: 3, max: 5, message: "用户名长度3到5位字符串", trigger: "blur"},
    ],
    age: [
        {
            required: true,
            message: "请输入年龄",
            trigger: "change",
        },
        {type: "number", message: "年龄必须是数字", trigger: "blur"},
    ],
})
export {
    Person,
    formRules,
}