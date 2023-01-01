import { createApp } from "vue"
import "@/assets/css/style.scss"
import App from "@/App.vue"
import { router } from "@/config/routes"

createApp(App)
    .use(router).mount("#app")
