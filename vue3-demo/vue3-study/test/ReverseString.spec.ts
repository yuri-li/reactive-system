import { describe } from "vitest"
import {shallowMount} from "@vue/test-utils"
import ReverseString from "@/components/ReverseString.vue"

describe("翻转字符串", () => {
    test("触发button 点击事件，观察点击前后message的值", async () => {
        const message = "Hello Vue3!"
        const reverseMessage = "!3euV olleH"
        const wrapper = shallowMount(ReverseString)
        expect((wrapper.vm as any).message).toBe(message)

        const element = wrapper.find("div > button")
        await element.trigger("click")
        expect((wrapper.vm as any).message).toBe(reverseMessage)
    })
})