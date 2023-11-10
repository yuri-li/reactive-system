import { lowerFirst } from "lodash"
import ParseComponentName from "@/ParseComponentName"

export interface VueComponent {
    name: string,
    path: string,
    component: string,
}

export function toVueComponent(fileFullPath: string): VueComponent {
    return {
        name: ParseComponentName.toComponentName(fileFullPath),
        path: `/${ParseComponentName._arr.slice(2, ParseComponentName._arr.length)
            .filter(x => x !== "Index.vue")
            .map(x => lowerFirst(x.replace(".vue", "")))
            .join("/")}`,
        component: fileFullPath.replace(/.*\/src\//, "@/"),
    } as VueComponent
}