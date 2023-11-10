import { decodeBaseModel } from "@/crud/service/baseModel/decode/decodeBaseModel"

function toObject(text: string) {
    return decodeBaseModel(JSON.parse(text))
}

export { toObject }