<template>
  <div class="menu">
    <router-link to="/circularMenu">CircularMenu</router-link>
    <router-link to="/clock">Clock</router-link>
    <router-link to="/dice">Dice</router-link>
    <router-link to="/loading">Loading</router-link>
    <router-link to="/multiChart">MultiChart</router-link>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 30vw;
  height: 100vh;
  background-color: antiquewhite;
}

.main {
  display: flex;
  width: 70%;
  height: 100vh;
}
</style>