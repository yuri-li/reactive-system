import { createRouter, createWebHashHistory } from "vue-router"

const routes = [{path: "/", redirect: {name: "Login"}},
    {
    path: "/helloWorld", name: "HelloWorld", component: () => import("@/components/HelloWorld.vue")
},
    {path: "/reverseString", name: "ReverseString", component: () => import("@/components/ReverseString.vue")},
    { path: "/login", name: "Login", component: () => import("@/components/login/Index.vue") }, {
    path: "/multiplicationTable", name: "MultiplicationTable", component: () => import("@/components/multiplicationTable/Index.vue")
}, {path: "/multiplicationTable/item", name: "MultiplicationTableItem", component: () => import("@/components/multiplicationTable/Item.vue")}]


const router = createRouter({
    history: createWebHashHistory(), routes,
})

export { router }