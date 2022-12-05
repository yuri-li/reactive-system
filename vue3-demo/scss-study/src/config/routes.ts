export const routes = [
    { path: "/circularMenu", name: "CircularMenu", component: () => import("@/components/circularMenu/Index.vue") },
    { path: "/loading", name: "Loading", component: () => import("@/components/loading/Index.vue") }
]