<template>
  <div>
    <input v-model="message" placeholder="请输入" />
    <span>{{ message }}</span>
    <button class="btn success" @click="reverseString">翻转字符串</button>
  </div>
</template>

<script setup lang="ts">
import { $ref } from "vue/macros"

let message = $ref("Hello Vue3!")

function reverseString() {
  message = message.split("").reverse().join("")
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  border: #535bf2 1px solid;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  justify-content: space-around;
}

span {
  font-weight: bold;
  font-size: xx-large;
}
</style>