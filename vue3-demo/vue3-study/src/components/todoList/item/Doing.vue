<template>
  <div class="item-container">
    <div class="item-header">
      <span class="title">正在进行</span>
      <ElTag type="success" style="min-width: 50px;" round>{{ store.doing.length }}</ElTag>
    </div>
    <ul>
      <ElCheckboxGroup v-model="store.done" @change="resetList()">
        <li v-for="item in store.doing" :key="item">
          <ElCheckbox :label="item" />
          <Delete @click="store.deleteItem(item)" />
        </li>
      </ElCheckboxGroup>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from "unplugin-vue-define-options/macros"
import { ElTag, ElCheckboxGroup, ElCheckbox } from "element-plus"
import { Delete } from "@element-plus/icons-vue"
import { last } from "lodash"
import { useTodoStore } from "@/config/store/todo"

defineOptions({
  name: "Doing",
})

const store = useTodoStore()
function resetList() {
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    store.deleteItem(last(store.done)!)
  }, 600)
}
</script>

<style lang="scss" scoped>
@import "@/components/todoList/item/style.scss";
</style>