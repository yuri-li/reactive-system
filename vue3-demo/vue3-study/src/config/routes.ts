import { createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router"

const routes = [{path: "/", redirect: {name: "TodoList"}}, {
    path: "/helloWorld", name: "HelloWorld", component: () => import("@/components/HelloWorld.vue")
}, {path: "/reverseString", name: "ReverseString", component: () => import("@/components/ReverseString.vue")}, {
    path: "/login", name: "Login", component: () => import("@/components/login/Index.vue"), meta: {title: "登录页面"},
}, {path: "/form", name: "Form", component: () => import("@/components/form/Index.vue"), meta: {title: "Form表单"},}, {
    path: "/cascader/address", name: "CascaderAddress", component: () => import("@/components/cascader/address/Index.vue"), meta: {title: "三级地址级联"},
}, {
    path: "/cascader/order", name: "CustomCascaderData", component: () => import("@/components/cascader/order/Index.vue"), meta: {title: "自定义级联数据格式"},
}, { path: "/todoList", name: "TodoList", component: () => import("@/components/todoList/Index.vue"), meta: {title: "TodoList"}, },{
    path: "/multiplicationTable", name: "MultiplicationTable", component: () => import("@/components/multiplicationTable/Index.vue")
}, {path: "/multiplicationTable/item", name: "MultiplicationTableItem", component: () => import("@/components/multiplicationTable/Item.vue")}]


const router = createRouter({
    history: createWebHashHistory(), routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    buildTitle(to.meta.title as string, to.params.pageTitle)
    next()
})

function buildTitle(title?: string, titleFromParams?: string | string[]) {
    if (title) {
        document.title = title
    }
    if (titleFromParams) {
        document.title = `${titleFromParams} - ${document.title}`
    }
}

export { router }