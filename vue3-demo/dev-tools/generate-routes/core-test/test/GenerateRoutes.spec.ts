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