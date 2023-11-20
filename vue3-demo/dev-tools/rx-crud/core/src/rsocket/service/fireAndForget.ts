import { buildPayload } from "@/rsocket/util/BufferUtil"
import { fireAndForgetEvent } from "@/rsocket/model/rsocketTypes"
import { SingletonClient } from "@/rsocket/util/connector"

function fireAndForget(route: string, data: any | null = null) {
    return new Promise<null>(async (resolve, reject) => {
            const instance = await SingletonClient.getInstance()
            instance.rSocket!.fireAndForget(buildPayload(route, data), fireAndForgetEvent(resolve, reject))
        }
    )
}

export { fireAndForget }