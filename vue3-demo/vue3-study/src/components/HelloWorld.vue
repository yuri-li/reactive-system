<script setup lang="ts">
import { $ref } from "vue/macros"

defineProps<{ msg: string }>()
const count = $ref(0)
const objectOfAttrs = {
  id: "btn",
  class: "btn success"
}
</script>

<template>
  <button v-bind="objectOfAttrs">abc</button>
  <h1>{{ msg }}</h1>

  <div>
    <button class="btn success" @click="count++">count is {{ count }}</button>
  </div>
</template>
