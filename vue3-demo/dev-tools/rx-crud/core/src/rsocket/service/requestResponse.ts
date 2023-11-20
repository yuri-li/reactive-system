import { buildPayload } from "@/rsocket/util/BufferUtil"
import { requestResponseEvent } from "@/rsocket/model/rsocketTypes"
import { SingletonClient } from "@/rsocket/util/connector"

function requestResponse<R>(route: string, data: any | null = null) {
    return new Promise<R>(async (resolve, reject) => {
            const instance = await SingletonClient.getInstance()
            instance.rSocket!.requestResponse(buildPayload(route, data), requestResponseEvent(resolve, reject))
        }
    )
}

export { requestResponse }