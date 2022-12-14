<template>
  <div class="container">
    <div class="clock">
      <ul class="secondLines">
        <li v-for="second in range(1,31)" :key="second"></li>
      </ul>
      <ul class="face">
        <li v-for="hour in range(1, 13)" :key="hour"><span>{{ hour }}</span></li>
      </ul>
      <ul class="hand">
        <li v-for="(degree, degreePropertyName) in degreeTime" :key="degreePropertyName" :class="degreePropertyName" :style="{transform: degree}" />
      </ul>
      <ul class="digital">
        <li v-for="(value, propertyName) in digitalTime" :key="propertyName" :class="value">{{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { range } from "lodash"
import { onBeforeMount, onUnmounted, ref } from "vue"
import { DigitalTime, DegreeTime, reset, } from "@/components/clock/model"

defineOptions({
  name: "Clock",
})

const digitalTime = ref<DigitalTime>()
const degreeTime = ref<DegreeTime>()

onBeforeMount(() => {
  reset(digitalTime, degreeTime)
})
const interval = setInterval(() => {
  reset(digitalTime, degreeTime)
}, 1000)
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style lang="scss" scoped>
@import "@/components/clock/css/common.scss";
@import "@/components/clock/css/index.scss";
@import "@/components/clock/css/hand.scss";
@import "@/components/clock/css/face.scss";
@import "@/components/clock/css/secondLines.scss";
@import "@/components/clock/css/digital.scss";

</style>