import { describe, expect } from "vitest"
import {mount} from "@vue/test-utils"
import MultiplicationTable from "@/components/multiplicationTable/Index.vue"

describe("九九乘法表", () => {
    test("有9个card", async () => {
        const wrapper = mount(MultiplicationTable)

        const element = wrapper.find("ul.wrap")
        expect(element.exists).toBeTruthy()
        expect(element.element.childElementCount).toBe(9)
    })
})