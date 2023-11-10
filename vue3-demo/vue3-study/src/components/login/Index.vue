<template>
  <div class="container">
    <div class="main">
      <div class="logo-container">
        <div class="logo">
          <span>logo</span>
        </div>
      </div>
      <div class="title-container">
        <p class="greet">欢迎使用xxx!</p>
        <p class="message">用户登录</p>
      </div>
      <div class="form-container">
        <ElForm ref="formRef" :model="form" :rules="rules">
          <ElSpace wrap :size="20" :fill="true">
            <ElFormItem prop="email">
              <ElInput v-model="form.email" placeholder="邮箱*" maxlength="50" :suffix-icon="Message" />
            </ElFormItem>
            <ElFormItem prop="password">
              <ElInput v-model="form.password" type="password" placeholder="密码*" maxlength="20" show-password />
            </ElFormItem>
          </ElSpace>
        </ElForm>
      </div>
      <div class="btn-container">
        <button @click="submit">登录</button>
      </div>
      <div class="footer-container">
        <a href="" title="Forgot Password">忘记密码?</a>
        <a href="" title="Register">注册</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElSpace, ElFormItem, ElInput, } from "element-plus"
import type { FormInstance } from "element-plus"
import { LoginForm, rules, } from "@/components/login/model"
import { Message } from "@element-plus/icons-vue"
import { defineOptions } from "unplugin-vue-define-options/macros"

defineOptions({
  name: "Login",
})

const formRef = ref<FormInstance>()
const form = reactive<LoginForm>(new LoginForm())

async function submit() {
  await formRef.value!.validate((isValid: boolean) => {
    if (isValid) {
      alert(`email: ${form.email}, password: ${form.password}`)
    }
  })
}
</script>

<style lang="scss" scoped>
@import "@/components/login/style.scss";
</style>