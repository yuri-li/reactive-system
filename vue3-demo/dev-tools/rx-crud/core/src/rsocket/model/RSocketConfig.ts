/**
 * 示例: {"protocol": "ws", "host": "localhost", "port": 7001, "mappingPath": "demo"}
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

export { RSocketConfig }