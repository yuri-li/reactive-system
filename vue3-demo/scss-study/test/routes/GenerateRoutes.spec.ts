import { describe, test, } from "vitest"
import GenerateRoute from "~/routes/GenerateRoutes"

describe("自动生成vue-router@4的路由", () => {
    test("测试fs的api", () => {
        const txt = GenerateRoute.componentRootPaths()
            .scanVueFiles()
            .toString()
        console.log(txt)
    })
})