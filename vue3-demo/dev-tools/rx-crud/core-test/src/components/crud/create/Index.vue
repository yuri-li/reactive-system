<script setup lang="ts">
import {
  reactive,
  ref
} from "vue"
import {
  Create,
  Person
} from "@/components/crud/create/Create"
import {
  FormInstance,
  FormRules
} from "element-plus"

const formData = reactive(new Person())
const formRef = ref<FormInstance>()
const create = new Create<Person>(formData)
const {onSubmit,disabledBtn} = create
async function action(person: Person) {
  console.log("action,,,,,",  person)
  console.log("btn state,,,", disabledBtn?.value)
  return new Promise<Person>(resolve => {
    resolve(person)
  })
}
const formRules = reactive<FormRules<Person>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "用户名长度3到5位字符串", trigger: "blur" },
  ],
  age: [
    {
      required: true,
      message: "请输入年龄",
      trigger: "change",
    },
    { type: "number", message: "年龄必须是数字", trigger: "blur" },
  ],
})
</script>
<template>
  <div class="main">
    <ElForm ref="formRef" :model="formData" :rules="formRules" label-width="120px">
      <ElFormItem label="用户名" prop="username">
        <ElInput v-model="formData.username" />
      </ElFormItem>
      <ElFormItem label="年龄" prop="age">
        <ElInputNumber v-model="formData.age" size="large" :min="1" :max="50" />
      </ElFormItem>
      <ElFormItem>
        <ElButton class="btn success" type="primary" size="large" style="width:100%;" @click="onSubmit(formRef as any,action)">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </div>

</template>