<template>
  <ElForm ref="formRef" :model="formData" label-width="120px">
    <ElFormItem label="活动名称">
      <ElInput v-model="formData.activityName" />
    </ElFormItem>
    <ElFormItem label="活动场地">
      <ElSelect v-model="formData.region" placeholder="请选择场地" :clearable="true">
        <ElOption v-for="region in enumKeys(ActivityRegion)" :key="region" :label="ActivityRegion[region]" :value="region" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="活动时间">
      <ElDatePicker
          v-model="formData.time"
          type="datetime"
          placeholder="请选择日期和时间"
      />
    </ElFormItem>
    <ElFormItem label="立即发布">
      <ElSwitch v-model="formData.delivery" />
    </ElFormItem>
    <ElFormItem label="活动类型">
      <ElCheckboxGroup v-model="formData.activityType">
        <ElCheckbox v-for="activityType in enumKeys(ActivityType)" :key="activityType" :label="activityType" name="activityType">
            {{ ActivityType[activityType] }}
        </ElCheckbox>
      </ElCheckboxGroup>
    </ElFormItem>
    <ElFormItem label="赞助资源">
      <ElRadioGroup v-model="formData.resource">
        <ElRadio v-for="resource in enumKeys(ActivityResource)" :key="resource" :label="resource">{{ ActivityResource[resource] }}</ElRadio>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem label="备注">
      <ElInput v-model="formData.description" type="textarea" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="clickBtnState" @click="onSubmit">确认</ElButton>
      <ElButton>重置</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus"
import {
  ElButton, ElCheckbox, ElCheckboxGroup, ElDatePicker, ElForm, ElFormItem, ElInput, ElOption, ElRadio, ElRadioGroup, ElSelect, ElSwitch,
} from "element-plus"
import { reactive, ref } from "vue"
// noinspection ES6UnusedImports
import { Activity, ActivityRegion, ActivityResource, ActivityType, } from "@/components/form/model"
import { defineOptions } from "unplugin-vue-define-options/macros"
import { replacer } from "@/util/JsonExtension"
import { enumKeys } from "@/util/EnumExtension"

defineOptions({
  name: "Form",
})

const formRef = ref<FormInstance>()
const formData = reactive<Activity.Create>(new Activity.Create())
const clickBtnState = ref(false)

async function onSubmit() {
  console.log(`${new Date()}, 按钮状态：${clickBtnState.value}, before --- 提交`)
  if (!clickBtnState.value) {
    clickBtnState.value = true
    await formRef.value?.validate((isValid: boolean) => {
      if (isValid) {
        console.log(`${new Date()}, 按钮状态：${clickBtnState.value}, 提交：${JSON.stringify(formData, replacer)}`)
      }
      setTimeout(() => clickBtnState.value = false, 3000)
    })
  }
}
</script>
