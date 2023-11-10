import { createApp } from "vue"
import "@/style.css"
import App from "@/App.vue"
import { router } from "@/config/routes"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

const app = createApp(App)
// noinspection TypeScriptValidateTypes
app
    .use(router)
    .use(ElementPlus)
    .mount("#app")
app.config.errorHandler = (err, _, info) => {
    // report error to tracking services
    console.log(err, info)
}
