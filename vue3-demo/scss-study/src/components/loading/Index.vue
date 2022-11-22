<template>
  <div class="container">
    <div class="ring">1</div>
    <div class="ring">2</div>
    <div class="ring">3</div>
    <p>Loading...</p>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "Loading",
})
</script>

<style lang="scss" scoped>
@import "@/components/loading/css/common.scss";
@import "@/components/loading/css/paragraph.scss";
@import "@/components/loading/css/index.scss";
</style>