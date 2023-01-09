import { describe, expect, test } from "vitest"
import { mount } from "@vue/test-utils"
import Form from "@/components/form/Index.vue"
import type { Activity } from "@/components/form/model"

describe("新增", () => {
    test("避免重复上传",async () => {
        const wrapper = mount(Form)

        const button = wrapper.find("div > button")
        expect(button.exists()).toBeTruthy()

        const model = wrapper.vm.formData as Activity.Create
        model.delivery = false
        const clickBtnState = wrapper.vm.clickBtnState as boolean
        expect(clickBtnState).toBe(false)
        console.log(`${new Date()}, 触发事件1`)
        await button.trigger("click")

        expect(clickBtnState).toBe(false)
        console.log(`${new Date()}, 触发事件2`)
        await button.trigger("click")
    })
})