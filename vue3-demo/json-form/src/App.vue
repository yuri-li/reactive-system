<template>
  <div class="container">
    <div class="container">
      <div v-for="(item,index) in ['Schema', 'Preview', 'UI-Schema', 'Values']" :key="index" :class="item">
        <span class="title">{{ item }}</span>
        <div v-if="item === 'Preview'" class="main"></div>
        <JsonEditor v-else :key="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import JsonEditor from "@/components/JsonEditor.vue"

defineOptions({
  name: "JsonForm"
})
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 0.75fr 0.75fr 1.5fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 0;
  grid-auto-flow: row;
  grid-template-areas:
    "Schema Schema Preview"
    "UI-Schema Values Preview";
  width: 100vw;
  height: 100vh;
}

.title {
  font-family: BlinkMacSystemFont, "Segoe UI", Roboto, serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 10px;
  height: 25px;
}

@mixin split($direction) {
  padding-#{$direction}: 1px;
  border-#{$direction}: 1px solid #563D7C33;
}

.Schema {
  grid-area: Schema;
  @include split("bottom");
}

.Preview {
  grid-area: Preview;
  @include split("left");
}

.UI-Schema {
  grid-area: UI-Schema;
  @include split("right");
}

.Values {
  grid-area: Values;
}

.main {
  height: calc(100vh - 25px);
}
</style>