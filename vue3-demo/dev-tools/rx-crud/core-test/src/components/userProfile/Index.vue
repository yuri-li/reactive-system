<script setup lang="ts">
import { User } from "@/components/userProfile/model"
import { requestResponse } from "rx-crud"

const user = await requestResponse<User>("anonymous.user.profile")
</script>
<template>
  <div class="card">
    <h1>request-response</h1>
    <h2>{{ user }}</h2>
    <p>
      Edit <code>components/userProfile/Index.vue</code> to test HMR
    </p>
  </div>
</template>