<template>
  <ElForm ref="formRef" :model="form" label-width="120px">
    <ElFormItem label="Activity name">
      <ElInput v-model="form.name" />
    </ElFormItem>
    <ElFormItem label="Activity zone">
      <ElSelect v-model="form.region" placeholder="please select your zone">
        <ElOption label="Zone one" value="shanghai" />
        <ElOption label="Zone two" value="beijing" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="Activity time">
      <ElCol :span="11">
        <ElDatePicker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
        />
      </ElCol>
      <ElCol :span="2" class="text-center">
        <span style="color: rgba(107,114,128);">-</span>
      </ElCol>
      <ElCol :span="11">
        <ElTimePicker
            v-model="form.date2"
            placeholder="Pick a time"
            style="width: 100%"
        />
      </ElCol>
    </ElFormItem>
    <ElFormItem label="Instant delivery">
      <ElSwitch v-model="form.delivery" />
    </ElFormItem>
    <ElFormItem label="Activity type">
      <ElCheckboxGroup v-model="form.type">
        <ElCheckbox label="Online activities" name="type" />
        <ElCheckbox label="Promotion activities" name="type" />
        <ElCheckbox label="Offline activities" name="type" />
        <ElCheckbox label="Simple brand exposure" name="type" />
      </ElCheckboxGroup>
    </ElFormItem>
    <ElFormItem label="Resources">
      <ElRadioGroup v-model="form.resource">
        <ElRadio label="Sponsor" />
        <ElRadio label="Venue" />
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem label="Activity form">
      <ElInput v-model="form.desc" type="textarea" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="onSubmit">Create</ElButton>
      <ElButton>Cancel</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import {
  ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElCol, ElDatePicker, ElTimePicker, ElSwitch, ElCheckboxGroup,
  ElCheckbox, ElRadioGroup, ElRadio, ElButton,
} from "element-plus"
import type { FormInstance } from "element-plus"
import { reactive, ref } from "vue"
import { FormData } from "@/components/form/model"

const formRef = ref<FormInstance>()
const form = reactive(new FormData())

async function onSubmit() {
  await formRef.value?.validate((isValid: boolean) => {
    if (isValid) {
      alert(JSON.stringify(form))
    }
  })
}
</script>
