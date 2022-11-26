import ParseComponentName from "~/routes/ParseComponentName"
import { lowerFirst } from "lodash"

export interface VueComponent {
    name: string,
    path: string,
    component: string,
}

export function toVueComponent(path: string): VueComponent {
    return {
        name: ParseComponentName.toComponentName(path),
        path: `/${ParseComponentName._arr.slice(2, ParseComponentName._arr.length)
            .filter(x => x !== "Index.vue")
            .map(x => lowerFirst(x.replace(".vue", "")))
            .join("/")}`,
        component: path.replace(/.*\/src\//, "@/"),
    } as VueComponent
}