import { describe, test, } from "vitest"
import GenerateRoutes from "generate-routes-yuri"

describe("自动生成vue-router@4的路由", () => {
    test("测试fs的api", () => {
        const txt = GenerateRoutes.componentRootPaths()
            .scanVueFiles()
            .toString()
        console.log(txt)
    })
})