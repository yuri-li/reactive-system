<template>
  <ElCascader v-model="model" :options="earlyCourse" :props="props" style="width:220px;" @change="handleChange" />
</template>

<script setup lang="ts">
import { defineOptions } from "unplugin-vue-define-options/macros"
import { ElCascader } from "element-plus"
import { earlyCourse } from "@/components/cascader/order/model"
import { ref } from "vue"

defineOptions({
  name: "CustomCascaderData",
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

<style lang="scss" scoped>

</style>