<template>
  <div class="container">
    <div class="menu" :class="{active: isActive}">
      <div class="share" @click="isActive = !isActive"><IconShareFill /></div>
      <ul>
        <li><IconFacebook /></li>
        <li><IconWhatsapp /></li>
        <li><IconTwitter /></li>
        <li><IconDribbble /></li>
        <li><IconLinkedin /></li>
        <li><IconInstagram /></li>
        <li><IconPinterest /></li>
        <li><IconYoutube /></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {
  IconDribbble, IconFacebook, IconInstagram, IconLinkedin, IconPinterest, IconShareFill, IconTwitter, IconWhatsapp, IconYoutube,
} from "@iconify-prerendered/vue-bi"
defineOptions({
  name: "CircularMenu",
})
const isActive = ref(false)
</script>

<style lang="scss" scoped>
@import "@/components/circularMenu/css/common.scss";
@import "@/components/circularMenu/css/index.scss";
@import "@/components/circularMenu/css/li.scss";
@import "@/components/circularMenu/css/active.scss";

</style>