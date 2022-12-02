# generate-routes-yuri

生成vue-router的代码

# 1 示例

> 请注意： “组件名称”标记在文件路径后

```
- components
-- circularMenu
--- Index.vue               // CircularMenu
-- loading
--- css
--- Index.vue               // Loading
-- user
--- login
---- admin
----- Index.vue             // UserLoginAdmin
----- SubAccount.vue        //UserLoginAdminSubAccount
---- Index.vue              // UserLogin
--- UserInfo.vue            //UserInfo
```

## 1.1 routes

```typescript
const routes = [
  { path: "/circularMenu", name: "CircularMenu", component: () => import("@/components/circularMenu/Index.vue") }, 
  { path: "/loading", name: "Loading", component: () => import("@/components/loading/Index.vue") }, 
  { path: "/user/userInfo", name: "UserInfo", component: () => import("@/components/user/UserInfo.vue") }, 
  { path: "/user/login", name: "UserLogin", component: () => import("@/components/user/login/Index.vue") }, 
  { path: "/user/login/admin", name: "UserLoginAdmin", component: () => import("@/components/user/login/admin/Index.vue") }, 
  { path: "/user/login/admin/subAccount", name: "UserLoginAdminSubAccount", component: () => import("@/components/user/login/admin/SubAccount.vue") } 
]
```

## 1.2 router-link

```typescript
<router-link to="/circularMenu">CircularMenu</router-link> 
<router-link to="/loading">Loading</router-link> 
<router-link to="/user/userInfo">UserInfo</router-link> 
<router-link to="/user/login">UserLogin</router-link> 
<router-link to="/user/login/admin">UserLoginAdmin</router-link> 
<router-link to="/user/login/admin/subAccount">UserLoginAdminSubAccount</router-link>
```

# 2 安装与使用

```
yarn add -D generate-routes-yuri
```

demo：[github](https://github.com/yuri-li/reactive-system/tree/main/vue3-demo/dev-tools/generate-routes/core-test)

# 3 约定（组件命名方式）

| 组件命名方式    | 描述               |
| --------- | ---------------- |
| 自定义组件名称   | vue3默认不支持，需第三方依赖 |
| 目录结构为组件名称 | 最复杂              |
| 文件名为组件名称  |                  |

## 3.1 自定义组件名称

**优先级最高**。如下，component name为“Loading”

```typescript
<script setup lang="ts">
defineOptions({
  name: "Loading",
})
</script>
```

## 3.2 目录结构为组件名称

以订单组件为例，目录 `/components/order`，包含两个页面：

- 首页，显示订单列表

- 点击订单编号，显示订单详情

|      | 首页        | 详情页         |
| ---- | --------- | ----------- |
| 文件名  | Index.vue | Detail.vue  |
| 组件名称 | Order     | OrderDetail |
| 规则描述 | 目录名称      | 目录名称 + 文件名  |

## 3.3 文件名为组件名称

`/components/user/UserInfo.vue`，component name为**UserInfo**
