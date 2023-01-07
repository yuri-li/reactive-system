import { createApp } from "vue"
import "@/assets/css/style.scss"
import App from "@/App.vue"
import { router } from "@/config/routes"
import { createPinia } from "pinia"

createApp(App)
    .use(router)
    .use(createPinia())
    .mount("#app")
