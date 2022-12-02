import { readdirSync, statSync } from "fs"
import { join as joinPath } from "path"

export function vueFiles(...componentRootPaths: string[]): string[] {
    //1. 获取src的完整路径
    const _srcPath = joinPath(projectRootPath(), "src")
    //2. 得到component所在目录的完整路径
    const componentFullPaths = componentRootPaths.map(x => joinPath(_srcPath, x))
    //3. 遍历每一个目录，得到所有vue文件
    const _vueFiles: string[] = []

    function _(_path: string, list: string[]) {
        return readdirSync(_path).map(item => {
            const fullPath = joinPath(_path, item).replaceAll("\\", "/")
            if (item.endsWith(".vue")) {
                list.push(fullPath)
            }
            if (statSync(fullPath).isDirectory()) {
                _(fullPath, list)
            }
        })
    }

    componentFullPaths.forEach(x => _(x, _vueFiles))
    return _vueFiles
}

/**
 * 返回项目根目录的全路径
 * 原理：
 * 1. 寻找src或test目录
 * 2. 上一级，即，项目根目录
 */
function projectRootPath() {
    const regex = /file:\/\/(.*)[/\\]node_modules[/\\].*/
    const match = import.meta.url.match(regex)
    if (match) {
        return match[1]
    }
    throw new Error("未找到src或test目录")
}