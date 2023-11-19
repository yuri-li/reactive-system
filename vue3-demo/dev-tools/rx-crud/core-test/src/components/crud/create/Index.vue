<script setup lang="ts">
import {
  reactive,
  ref,
} from "vue"
import {
  ElMessageBox,
  FormInstance,
} from "element-plus"
import {
  ContainsInitData,
  Create,
  StorageType
} from "rx-crud"
import {
  Person,
  formRules,
} from "@/components/crud/create/model"

const initData = new Person()
const formData = reactive(initData)
const formRef = ref<FormInstance>()
const {onSubmit, disabledBtn} = new Create<Person>(new ContainsInitData(initData, "CreatePerson", StorageType.Local))

async function action(person: Person) {
  await ElMessageBox.alert(JSON.stringify(person), "提示🔔️", {
    confirmButtonText: "确认",
    type: "info",
  })
  return new Promise<Person>(resolve => {
    resolve(person)
  })
}

</script>
<template>
  <div class="main">
    <ElForm ref="formRef" :model="formData" :rules="formRules" label-width="120px">
      <ElFormItem label="用户名" prop="username">
        <ElInput v-model="formData.username"/>
      </ElFormItem>
      <ElFormItem label="年龄" prop="age">
        <ElInputNumber v-model="formData.age" size="large" :min="1" :max="50"/>
      </ElFormItem>
      <ElFormItem>
        <ElButton :disabled="disabledBtn" class="btn success" type="primary" size="large" style="width:100%;"
                  @click="onSubmit(formRef as any,formData,action)">提交
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>

</template>