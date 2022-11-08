<template>
  <ul class="wrap" id="mainList">
    <li class="l-card-title">
      <h1>九九乘法表</h1>
    </li>
    <li class="l-card">
      <ul class="l-card__wrap">
        <li class="l-card__wrap__title">2</li>
        <li>2x1=2</li>
        <li>2x2=4</li>
        <li>2x3=6</li>
        <li>2x4=8</li>
        <li>2x5=10</li>
        <li>2x6=12</li>
        <li>2x7=14</li>
        <li>2x8=16</li>
        <li>2x9=18</li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wrap{
  max-width: 1140px;
  width: 100%;
  margin: 32px auto;
  overflow: hidden;
}
.wrap >li{
  width: 350px;
  height: 366px;
  float: left;
  margin: 0 15px 40px 15px;
}
.row{
  width: 100%;
  height: 100%;
}

</style>