import { createApp } from "vue"
import App from "@/App.vue"
import {routes} from "@/config/routes"
import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount("#app")
