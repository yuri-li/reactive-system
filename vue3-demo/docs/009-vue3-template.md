# 1 翻转字符串

初始值："Hello Vue3!" 。点击按钮，翻转字符串。

![](assets/2022-11-14-20-54-31-image.png)

## 1.1 components/study/ReverseString.vue

```typescript
<template>
  <div>
    {{ message }}
    <button class="btn success" @click="reverseString">翻转字符串</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const message = ref("Hello Vue3!")

function reverseString() {
  message.value = message.value.split("").reverse().join("")
}
</script>

<style scoped>
div {
  border: #535bf2 1px solid;
  text-align: center;
  padding: 30px;
}
</style>
```

## 1.2 测试

```typescript
import { describe } from "vitest"
import {shallowMount} from "@vue/test-utils"
import ReverseString from "@/components/study/ReverseString.vue"

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
```

![](assets/2022-11-14-20-50-16-image.png)



# 2
