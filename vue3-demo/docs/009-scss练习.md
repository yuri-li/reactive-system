# 1 css-loading-button

![](assets/css-button.gif)

## 1.1 全局设置

### 1.1.1 清除默认样式

```scss
/* src/assets/css/main.scss */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 1.1.2 定义全局变量

```scss
/* src/assets/css/variable.scss */
@mixin flexContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 1.1.3 App.vue

页面框架

```
<template>
  <LoadingButton />
</template>


<script setup lang="ts">
import LoadingButton from "@/components/pages/Loading.vue"
</script>
<style lang="scss">
@import "@/assets/css/main.scss";
body {
  @include flexContainer;
}
#app{
  @include flexContainer;
  height: 100vh;
}
</style>
```

## 1.2 Loading.vue

```
<template>
  <div class="container">
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <p>Loading...</p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include flexContainer;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;

  p {
    position: absolute;
    color: white;
    font-size: 1.5em;
    font-family: consolas, serif;
    bottom: 50px;
    letter-spacing: 0.35em;
  }

  .ring {
    position: relative;
    width: 150px;
    height: 150px;
    margin: -30px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top: 4px solid #24ecff;
    animation: forwardRotate 4s linear infinite;

    &::before {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
      top: 12px;
      right: 12px;
      border-radius: 50%;
      background-color: #24ecff;
      box-shadow: 0 0 0 5px #24ecff33,
      0 0 0 10px #24ecff22,
      0 0 0 20px #24ecff11,
      0 0 20px #24ecff,
      0 0 50px #24ecff;
    }
    &:nth-child(3) {
      animation: reverseRotate 4s linear infinite;
      animation-delay: -3s;
      border-top: 4px solid transparent;
      border-left: 4px solid #e41cf8;
      &::before {
        content: "";
        position: absolute;
        top: initial;
        width: 15px;
        height: 15px;
        bottom: 12px;
        left: 12px;
        border-radius: 50%;
        background-color: #e41cf8;
        box-shadow: 0 0 0 5px #e41cf833,
        0 0 0 10px #e41cf822,
        0 0 0 20px #e41cf811,
        0 0 20px #e41cf8,
        0 0 50px #e41cf8;
      }
    }
    &:nth-child(2) {
      position: absolute;
      top: 126.66px;
      border-top: 4px solid transparent;
      border-left: 4px solid #93ff2d;
      animation: reverseRotate 4s linear infinite;
      animation-delay: -1s;
      &::before {
        content: "";
        position: absolute;
        top: initial;
        width: 15px;
        height: 15px;
        bottom: 12px;
        left: 12px;
        border-radius: 50%;
        background-color: #93ff2d;
        box-shadow: 0 0 0 5px #93ff2d33,
        0 0 0 10px #93ff2d22,
        0 0 0 20px #93ff2d11,
        0 0 20px #93ff2d,
        0 0 50px #93ff2d;
      }
    }
  }
}

@keyframes forwardRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes reverseRotate {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
```
