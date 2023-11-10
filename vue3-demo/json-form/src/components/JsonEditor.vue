<template>
  <VAceEditor v-model:value="model" lang="json" theme="chrome" placeholder="--请输入JSON--" class="content" :options="{ useWorker: true }" @blur="formatValue" />
</template>

<script setup lang="ts">
import { VAceEditor } from "vue3-ace-editor"
import { ref } from "vue"
import { defineOptions } from "unplugin-vue-define-options/macros"
import { isEmpty } from "lodash"

const props = defineProps({
  data: {
    type: String, required: false, default: "",
  }
})

const model = ref(props.data)

function formatValue() {
  if (!isEmpty(model.value)) {
    try{
      model.value = JSON.stringify(JSON.parse(model.value), null, "\t")
      // eslint-disable-next-line no-empty
    }catch (e) {

    }
  }
}


defineOptions({
  name: "JsonEditor"
})
</script>

<style lang="scss" scoped>
.content {
  height: calc(50vh - 25px);
  display: flex;
  flex: 1;
}
</style>