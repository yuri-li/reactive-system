<template>
  <div class="container">
    <div v-for="arr in pipAreas" :key="arr.length" class="face">
      <span v-for="pipArea in arr" :key="pipArea" class="pip" :style="{gridArea: pipArea}" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Dice",
})
const pipAreas = [["g"], ["a", "b"], ["a", "b", "g"], ["a", "b", "c", "d"], ["a", "b", "c", "d", "g"], ["a", "b", "c", "d", "e", "f"],]
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100vw;
  background: #da0060;
}

.face {
  display: grid;
  grid-template-areas:
		"a . c"
		"e g f"
		"d . b";

  flex: 0 0 auto;
  padding: 10px;
  @include square(104px);
  border-radius: 10%;

  background-color: #e7e7e7;
  box-shadow: inset 0 5px white,
  inset 0 -5px #bbb,
  inset 5px 0 #d7d7d7,
  inset -5px 0 #d7d7d7;
}

.pip {
  display: block;
  align-self: center;
  justify-self: center;
  @include round(24px);
  background-color: #333;
  box-shadow: inset 0 3px #111,
  inset 0 -3px #555;
}
</style>