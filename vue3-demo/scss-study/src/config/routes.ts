export const routes = [
    {path: "/", redirect: { name: "Clock" } },
    { path: "/circularMenu", name: "CircularMenu", component: () => import("@/components/circularMenu/Index.vue") },
    { path: "/clock", name: "Clock", component: () => import("@/components/clock/Index.vue") },
    { path: "/loading", name: "Loading", component: () => import("@/components/loading/Index.vue") }
]