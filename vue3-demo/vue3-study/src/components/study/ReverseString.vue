<template>
  <div>
    <span>{{ message }}</span>
    <button class="btn success" @click="reverseString">翻转字符串</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const message = ref("Hello Vue3!")

function reverseString() {
  message.value = message.value.split("").reverse().join("")
}
</script>

<style scoped>
div {
  display: flex;
  border: #535bf2 1px solid;
  text-align: center;
  padding: 10px;
  justify-content: space-around;
}
</style>