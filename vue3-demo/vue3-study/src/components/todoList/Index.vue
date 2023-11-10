<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <span>TodoList</span>
        <TodoAdd />
      </div>
      <Doing />
      <Done />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from "unplugin-vue-define-options/macros"
import TodoAdd from "@/components/todoList/TodoAdd.vue"
import Doing from "@/components/todoList/item/Doing.vue"
import Done from "@/components/todoList/item/Done.vue"

defineOptions({
  name: "TodoList",
})
</script>

<style lang="scss" scoped>
.container {
  background-color: #DBE0F9;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.main {
  width: 500px;
  min-height: 400px;
  border-radius: 20px;
  background-color: #fff;
}

.header {
  height: 50px;
  flex: 1;
  background-color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 10px;
}
</style>