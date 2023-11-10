<template>
  <ElInput v-model="item" placeholder="添加ToDo" style="width: 300px;" @keyup.enter="addDoingItem()" />
</template>

<script setup lang="ts">
import { ElInput, ElMessageBox, } from "element-plus"
import { useTodoStore } from "@/config/store/todo"
import { ref } from "vue"
import { isEmpty } from "lodash"

const item = ref("")
const store = useTodoStore()

function addDoingItem() {
  if (!isEmpty(item.value)) {
    store.addItem(item.value)
    item.value = ""
  } else {
    ElMessageBox.alert("请输入待办事项", "警告", {
      confirmButtonText: "确认",
    })
  }
}
</script>