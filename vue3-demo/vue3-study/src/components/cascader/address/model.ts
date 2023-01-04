import _address from "@/components/cascader/address/address.json"
import type { CascaderOption } from "element-plus"
import { isEmpty } from "lodash"

interface Address {
    id: string
    text: string
    order: number
    children?: Address[]
}

interface SimpleAddress {
    id: string
    text: string
}

function toCascaderOption(): CascaderOption[] {
    function _convertChildren(arr?: Address[] | null): CascaderOption[] | null {
        if (isEmpty(arr)) {
            return null
        } else {
            return arr!.map(x => _convert(x))
        }
    }

    function _convert(param: Address): CascaderOption {
        return {
            label: param.text,
            value: JSON.stringify({id: param.id, text: param.text} as SimpleAddress),
            children: _convertChildren(param.children),
            disabled: false,
            leaf: isEmpty(param.children)
        } as CascaderOption
    }

    return (_address as Address[]).map(x => _convert(x))
}

const address = toCascaderOption()
export type { Address, SimpleAddress }
export { address }