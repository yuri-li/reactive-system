// noinspection JSUnresolvedReference

import { WellKnownMimeType } from "rsocket-composite-metadata"
import { WebsocketClientTransport } from "rsocket-websocket-client"
import { RSocketConnector } from "rsocket-core"
import { ErrorCodeException } from "@/globalException"
import type { RSocket } from "rsocket-core/dist/RSocket"

/**
 *   protocol: ws
 *   host: localhost
 *   port: 7001
 *   mappingPath: demo
 */
class RSocketConfig {
    protocol: "ws" | "wss" | undefined
    host: string | undefined
    port: number | undefined
    mappingPath: string | undefined

    public constructor(init?: Partial<RSocketConfig>) {
        Object.assign(this, init)
    }
}

class SingletonClient {
    rSocket: RSocket | undefined
    private static instance: SingletonClient

    private async buildRSocket() {
        this.rSocket = await createClient()
    }

    public static async getInstance() {
        if (!SingletonClient.instance) {
            SingletonClient.instance = new SingletonClient()
            await SingletonClient.instance.buildRSocket()
        }

        return SingletonClient.instance
    }
}

async function createClient() {
    const setupOptions = {
        keepAlive: 120000,
        lifetime: 60000,
        dataMimeType: "application/json",
        metadataMimeType: WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
    }
    const config = JSON.parse(sessionStorage.getItem("RSocketConfig")!) as RSocketConfig
    const url = `${config.protocol}://${config.host}:${config.port}/${config.mappingPath}`
    const transport = new WebsocketClientTransport({
        url,
        wsCreator: (_url) => {
            const ws = new WebSocket(_url)
            ws.onopen = (_) => {
                console.log("创建链接")
            }
            ws.onerror = (_) => {
                throw new ErrorCodeException("ConnectException", `RSocket connection to ${url} failed`)
            }
            return ws
        }
    })
    const connector = new RSocketConnector({setup: setupOptions, transport})
    return await connector.connect()
}

export {
    SingletonClient,
    RSocketConfig,
}