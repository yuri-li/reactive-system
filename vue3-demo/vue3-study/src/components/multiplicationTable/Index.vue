<template>
  <ul class="wrap">
    <li class="l-card-title">
      <h1>九九乘法表</h1>
    </li>
    <Item v-for="idx in range" :key="idx" :idx="idx" />
  </ul>
</template>

<script setup lang="ts">
import Item from "@/components/multiplicationTable/Item.vue"
import _ from "lodash"
import { defineOptions } from "unplugin-vue-define-options/macros"

defineOptions({
  name: "MultiplicationTable",
})

const range = _.range(2, 10)
</script>

<style lang="scss" scoped>
.wrap {
  max-width: 1140px;
  width: 100%;
  margin: 32px auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  font-family: "Roboto", "微软正黑体", serif;
  li{
    width: 350px;
    height: 366px;
    margin-bottom: 30px;
  }
}

.l-card-title {
  text-align: center;
  color: #2EB738;
}
</style>