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
  Create,
  LastSubmittedData,
  StorageType,
  ThrottleConfig,
} from "rx-crud"
import {
  formRules,
  Person,
} from "@/components/crud/create/model"

const formData = reactive(new Person())
const formRef = ref<FormInstance>()
const disabledBtn = ref(false)
const {onSubmit} = new Create<Person>(
    new LastSubmittedData("CreatePerson", StorageType.Local),
    new ThrottleConfig(10000, () => {
      disabledBtn.value = true
    }, () => {
      disabledBtn.value = false
    }))

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
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <ElInput v-model="formData.username"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="formData.age" size="large" :min="1" :max="50"/>
      </el-form-item>
      <el-form-item>
        <el-button class="btn success" type="primary" size="large"
                   style="width:100%" :disabled="disabledBtn"
                   @click="onSubmit(formRef as any,formData,action)">提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>