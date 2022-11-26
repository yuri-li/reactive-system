import { isEmpty } from "lodash"
import { toVueComponent, VueComponent } from "~/routes/VueComponent"
import { vueFiles, } from "~/routes/ScanVueFiles"

class GenerateRoute {
    _componentRootPaths: string[] = []
    _vueComponents: VueComponent[] = []

    /**
     * 设置组件的根目录
     * @param paths 如"/components","/pages"。默认"/components"
     */
    componentRootPaths(...paths: string[]) {
        if (isEmpty(paths)) {
            this._componentRootPaths = ["/components"]
        } else {
            this._componentRootPaths = paths
        }
        return this
    }

    /**
     * 遍历所有vue文件，转换成 VueComponent
     * @see VueComponent
     */
    scanVueFiles() {
        const vueList = vueFiles(...this._componentRootPaths)
        this._vueComponents = vueList.map(x => toVueComponent(x))
        return this
    }

    /**
     * 将VueComponent转成vue-router的写法
     */
    toString(): string {
        return `${this.toRoutes()}\n${this.toRouterLinks()}`
    }

    private toRoutes() {
        return `const routes = [\n  ${this._vueComponents.map(x =>
            `{ path: "${x.path}", name: "${x.name}", component: () => import("${x.component}") }`
        ).join(", \n  ")} \n]`
    }

    private toRouterLinks() {
        return `${this._vueComponents.map(x =>
            `<router-link to="${x.path}">${x.name}</router-link>`
        ).join(" \n")}`
    }
}

export default new GenerateRoute()