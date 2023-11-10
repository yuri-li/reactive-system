# 测试 generate-routes-yuri

[generate-routes-yuri](https://www.npmjs.com/package/generate-routes-yuri)

# 1 使用自己的模板创建项目

[模板项目](https://github.com/yuri-li/reactive-system/tree/main/vue3-demo/template/vue3-basic)

```
# 1 复制到本地（不要使用degit，多学了，也没啥用）
$ git clone repo-name folder-name

# 2 进入项目根目录。删除`.git`文件夹
# 3 打开package.json，修改name、author等。示例如下
  "name": "admin",
  "private": true,
  "version": "0.0.1",
  "license": "MIT",
  "author": "yuri-li",

# 4 构建项目
$ yarn
# 5 运行
$ yarn dev
```

# 2 测试

## 2.1 依赖

```
yarn add -D generate-routes-yuri
```

## 2.2 测试代码

`test/GenerateRoutes.spec.ts`

> 分别在"/components", "/pages"，两个目录下放一些vue文件，测试`generate-routes-yuri`是否生成正确的vue-router代码

```typescript
import { describe, expect } from "vitest"
import GenerateRoutes from "generate-routes-yuri"

const msg =
`const routes = [
  { path: "/helloWorld", name: "Hello", component: () => import("@/components/HelloWorld.vue") }, 
  { path: "/welcome", name: "Welcome", component: () => import("@/pages/Welcome.vue") }, 
  { path: "/user/userInfo", name: "UserInfo", component: () => import("@/pages/user/UserInfo.vue") }, 
  { path: "/user/login", name: "UserLogin", component: () => import("@/pages/user/login/Index.vue") }, 
  { path: "/user/login/admin", name: "AdminLogin", component: () => import("@/pages/user/login/admin/Index.vue") }, 
  { path: "/user/login/admin/subAccount", name: "UserLoginAdminSubAccount", component: () => import("@/pages/user/login/admin/SubAccount.vue") } 
]
<router-link to="/helloWorld">Hello</router-link> 
<router-link to="/welcome">Welcome</router-link> 
<router-link to="/user/userInfo">UserInfo</router-link> 
<router-link to="/user/login">UserLogin</router-link> 
<router-link to="/user/login/admin">AdminLogin</router-link> 
<router-link to="/user/login/admin/subAccount">UserLoginAdminSubAccount</router-link>`

describe("测试动态生成路由", () => {
    test("hello", () => {
        expect(
            GenerateRoutes.componentRootPaths("/components", "/pages").scanVueFiles().toString()
        ).toBe(msg)
    })
})
```