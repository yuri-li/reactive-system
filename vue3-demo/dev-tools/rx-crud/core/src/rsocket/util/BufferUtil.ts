import {
    encodeAndAddWellKnownMetadata,
    encodeBearerAuthMetadata,
    encodeCompositeMetadata,
    encodeRoute,
    WellKnownMimeType
} from "rsocket-composite-metadata"
import type { Payload, } from "rsocket-core/dist/RSocket"

function isEmpty(value: unknown): boolean {
    if (value === undefined || value === null ||
        Number.isNaN(value) || value === Infinity ||
        value === "Invalid Date" ||
        (typeof value === "string" && (value as string).trim().length === 0)) {
        return true
    }
    return Array.isArray(value) && (value as Array<unknown>).length === 0
}
function buildMetadata(route: string) {
    const routeMetadata = encodeRoute(route)
    if(route.startsWith("anonymous.")){
        return encodeAndAddWellKnownMetadata(
            Buffer.alloc(0),
            WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
            routeMetadata
        )
    }
    const token = localStorage.getItem("token")!!
    return encodeCompositeMetadata([
        [WellKnownMimeType.MESSAGE_RSOCKET_ROUTING, routeMetadata],
        [WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION, encodeBearerAuthMetadata(token)],
        // ["x.rsocket.authentication.bearer.v0", encodeBearerAuthMetadata("")],
    ])
}
function buildData(data: any | null) {
    if (isEmpty(data)) {
        return null
    }
    return Buffer.from(JSON.stringify(data), "utf8")
}

function buildPayload(route: string, data: any | null){
    return {
        data: buildData(data),
        metadata: buildMetadata(route),
    } as Payload
}
export {
    buildPayload
}