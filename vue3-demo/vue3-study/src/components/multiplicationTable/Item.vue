<template>
  <li class="l-card">
    <ul class="l-card__wrap">
      <li class="l-card__title">{{idx}}</li>
      <li v-for="item in 9" :key="item">
        {{idx}}x{{item}}={{idx * item}}
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
defineProps<{ idx: number }>()
</script>

<style lang="scss" scoped>
$color-pri: #2EB738;
.l-card {
  width: 100%;
  height: 366px;
  background-color: #FFF;
  border-radius: 100px 0 30px 0;
  box-shadow: 0 3px 10px #D8D8D8;

  .l-card__wrap {
    width: 100%;
    height: 60%;
    display: flex;
    padding: 64px 40px;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    li {
      margin-right: 35px;
      font-size: 24px;
      line-height: 32px;
      font-weight: 300;
      color: $color-pri;
      letter-spacing: .3em;
      display: inline-block;
    }

    .l-card__title {
      height: auto;
      padding-left: .1em;
      margin-top: 0;
      margin-right: 25px;
      font-size: 128px;
      line-height: 120px;
      font-weight: 900;
      text-shadow: 4px 3px 0 #F0F0F0;
    }
  }
}
</style>