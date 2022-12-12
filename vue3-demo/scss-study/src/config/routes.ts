export const routes = [
    {path: "/", redirect: { name: "Dice" } },
    { path: "/circularMenu", name: "CircularMenu", component: () => import("@/components/circularMenu/Index.vue") },
    { path: "/clock", name: "Clock", component: () => import("@/components/clock/Index.vue") },
    { path: "/dice", name: "Dice", component: () => import("@/components/Dice.vue") },
    { path: "/loading", name: "Loading", component: () => import("@/components/loading/Index.vue") }
]