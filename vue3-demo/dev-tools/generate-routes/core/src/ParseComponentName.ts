/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { readdirSync, readFileSync, } from "fs"
import { isEmpty, upperFirst, } from "lodash"

class ParseComponentName {
    _path: string | null = null
    _arr: string[] = []

    toComponentName(fileFullPath: string) {
        this._path = fileFullPath
        this._arr = this._path!.replace(/.*\/src\//, "/").split("/")

        let componentName: string | null

        componentName = this.customComponentName()
        if (isEmpty(componentName)) {
            if (this._path!.endsWith("Index.vue") || this.isContainIndexVue()) {
                componentName = this.parentDirAsComponentName()
            } else {
                componentName = this.fileNameAsComponentName()
            }
        }
        return componentName
    }

    private customComponentName() {
        const content = readFileSync(this._path!).toString()
        const match = content.match(/defineOptions\(\{\s*\n\s*name:\s*"(.+)".*/)
        if (match) {
            return match[1]
        }
        return null
    }

    private parentDirAsComponentName() {
        return this._arr.slice(2, this._arr.length)
            .filter(x => x !== "Index.vue")
            .map(x => upperFirst(x.replace(/\.vue/, ""))).join("")
    }

    private fileNameAsComponentName() {
        return upperFirst(this._arr[this._arr.length - 1].replace(/\.vue/, ""))
    }

    private isContainIndexVue(): boolean {
        return !isEmpty(readdirSync(this._path!.split("/").slice(0, -1).join("/")).filter(x => x.endsWith("Index.vue")))
    }
}

export default new ParseComponentName()