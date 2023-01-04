<template>
  <ElCascader v-model="model" :options="address" :props="props" style="width:220px;" @change="handleChange" />
</template>

<script setup lang="ts">
import { ElCascader } from "element-plus"
import { defineOptions } from "unplugin-vue-define-options/macros"
import { address } from "@/components/cascader/address/model"
import { ref } from "vue"

defineOptions({
  name: "CascaderAddress",
})

const model = ref([])
const props = {
  expandTrigger: "hover",
}

function handleChange() {
  console.log(model.value.length)
  console.log(model.value)
}
</script>