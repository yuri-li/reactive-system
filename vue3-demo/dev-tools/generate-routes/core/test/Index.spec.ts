import { describe, test, expect } from "vitest"
import GenerateRoute from "@/index"
import { diff } from "deep-object-diff"
import { isEmpty } from "lodash"

describe("测试入口文件`src/index.ts`", () => {
    test.each`
        paths                        | expected
        ${[]}                        | ${["/components"]}
        ${["/pages"]}                | ${["/pages"]}
        ${["/pages", "/components"]} | ${["/pages", "/components"]}
    `("return '$expected' when component-root-path is '$paths'", ({paths, expected}) => {
        console.log(`---- return '${expected}' when component-root-path is '${paths}'`)
        expect(_diff(paths, expected)).toBeTruthy()
    })
    // import { vueFiles } from "@/ScanVueFiles"
    // test("scan vue Files", () => {
    //     const files = vueFiles("/components")
    //     expect(_diff(files,
    //         ["/Users/yuri/workspace/idea/study/reactive-system/vue3-demo/dev-tools/generate-routes/core/src/components/Hello.vue"]))
    //         .toBeTruthy()
    // })
    // test("the result", ()=>{
    //     const componentName = GenerateRoute.componentRootPaths()
    //         .scanVueFiles()
    //         ._vueComponents[0]
    //         .name
    //     expect(componentName).toBe("Hello")
    // })
})

function _diff(paths: string[], expected: string[]): boolean {
    return isEmpty(diff(GenerateRoute.componentRootPaths(...paths)._componentRootPaths, expected))
}