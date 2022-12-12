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
import { ref } from "vue"
import { DigitalTime, DegreeTime, TimeDef, } from "@/components/clock/model"

defineOptions({
  name: "Clock",
})

let timeDef = new TimeDef()
const digitalTime = ref<DigitalTime>(timeDef.toDigitalTime())
const degreeTime = ref<DegreeTime>(timeDef.toTimeDegree())
setInterval(() => {
  timeDef = new TimeDef()
  digitalTime.value = timeDef.toDigitalTime()
  degreeTime.value = timeDef.toTimeDegree()
}, 1000)

</script>

<style lang="scss" scoped>
@import "@/components/clock/css/common.scss";
@import "@/components/clock/css/index.scss";
@import "@/components/clock/css/hand.scss";
@import "@/components/clock/css/face.scss";
@import "@/components/clock/css/secondLines.scss";
@import "@/components/clock/css/digital.scss";

</style>