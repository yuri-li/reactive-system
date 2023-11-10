<template>
  <div class="item-container">
    <div class="item-header">
      <span class="title">已经完成</span>
      <ElTag type="success" style="min-width: 50px;" round>{{ store.done.length }}</ElTag>
    </div>
    <ul>
      <li v-for="item in store.done" :key="item" class="checked">
        <span>{{ item }}</span>
        <Delete @click="store.deleteDoneItem(item)" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from "unplugin-vue-define-options/macros"
import { ElTag, } from "element-plus"
import { Delete } from "@element-plus/icons-vue"
import { useTodoStore } from "@/config/store/todo"

defineOptions({
  name: "Done",
})
const store = useTodoStore()
</script>

<style lang="scss" scoped>
@import "@/components/todoList/item/style.scss";

ul {
  li {
    span {
      display: inline-block;
      padding-left: 8px;
      line-height: 1;
      font-size: 14px;
      color: #606266;
      font-weight: 500;
    }
  }
}

.checked {
  text-decoration: line-through;
}
</style>