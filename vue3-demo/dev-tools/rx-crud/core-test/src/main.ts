import { createApp } from "vue"
import "@/style.css"
import App from "@/App.vue"
import { router } from "@/config/routes"
import { BusinessException } from "rx-crud"
import { ElMessageBox } from "element-plus"
import "element-plus/dist/index.css"

const app = createApp(App)
// noinspection TypeScriptValidateTypes
app
    .use(router)
    .mount("#app")
app.config.errorHandler = async (err, _, info) => {
    // report error to tracking services
    console.log(err, info)
    if (err instanceof BusinessException) {
        await ElMessageBox.alert(err.message, "警告⚠️", {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: "确认",
            type: "error",
        })
    }
}
