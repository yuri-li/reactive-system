/* eslint-disable @typescript-eslint/no-explicit-any */
import HelloWorld from "@/components/HelloWorld.vue"
import App from "@/App.vue"
import { shallowMount, mount } from "@vue/test-utils"
import { describe } from "vitest"

const buildWrapper = (msg = "") => shallowMount(HelloWorld, {
    props: {
        msg
    }
})
describe("组件HelloWorld", () => {
    const emptyWrapper = buildWrapper()
    test("是否包含button", () => {
        const element = emptyWrapper.find("div > button")
        expect(element.exists()).toBeTruthy()
    })
    test("获取count的默认值", () => {
        expect((emptyWrapper.vm as any).count).toBe(0)
    })
    test("触发button 点击事件，观察点击前后count的值", async () => {
        expect((emptyWrapper.vm as any).count).toBe(0)

        const element = emptyWrapper.find("div > button")
        await element.trigger("click")
        expect((emptyWrapper.vm as any).count).toBe(1)
    })

    test("msg props: 有默认值", () => {
        const element = emptyWrapper.find("h1")
        expect(element.exists()).toBeTruthy()

        expect(element.text()).toBe("")
    })

    test("msg props: 给msg赋值", () => {
        const wrapper = buildWrapper("hello world")
        const element = wrapper.find("h1")

        expect(element.text()).toBe("hello world")
    })

    test("运行起来，测试真实的组件", () =>{
        const wrapper = mount(App)
        const element = wrapper.find("h1")
        expect(element.exists()).toBeTruthy()

        expect(element.text()).toBe("Vite + Vue")
    })
})