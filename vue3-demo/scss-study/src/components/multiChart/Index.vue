<template>
  <div class="container">
    <div class="l-card">
      <div class="title">九九乘法表</div>
      <ul v-for="idx in range(2,10)" :key="idx">
        <li class="title">{{ idx }}</li>
        <li v-for="item in range(1,10)" :key="item" class="item">
          {{ idx }} x {{ item }} = {{ idx * item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { range } from "lodash"

defineOptions({
  name: "MultiChart",
})
</script>

<style lang="scss" scoped>
$bg-color: #D8D8D8;
$font-color: #2EB738;
.container{
  @include flexBox;
  background-color: $bg-color;
  color: $font-color;
  width: 100vw;
}
.l-card {
  display: grid;
  grid-template-rows: repeat(3, 150px);
  grid-template-columns: repeat(3, 150px);
  gap: 10px 10px;

  .title {
    @include flexBox;
    background-color: #ffffff;
    border-radius: 50px 0 30px 0;
    line-height: 45px;
    font-size: 28px;
    font-weight: 500;
    text-shadow: 2px 1px 0 #F0F0F0;
  }
  ul {
    list-style: none;
    background-color: #ffffff;
    border-radius: 50px 0 30px 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 25px 20px;


    .item {
      line-height: 15px;
      font-size: 12px;
      font-weight: 300;
      margin-right: 10px;
    }
  }
}
</style>