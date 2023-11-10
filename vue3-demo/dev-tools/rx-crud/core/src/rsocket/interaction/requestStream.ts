import type { Payload, } from "rsocket-core/dist/RSocket"
import type {
    StreamResponse,
    StreamResponseEvent
} from "@/rsocket/model/rsocketTypes"
import { buildPayload } from "@/rsocket/util/BufferUtil"
import { SingletonClient } from "@/rsocket/util/connector"

async function requestStream(route: string, data: any | null, initialRequestN: number, responderStream: StreamResponseEvent) {
    return new Promise<StreamResponse>(async (resolve, reject) => {
            const instance = await SingletonClient.getInstance()

            resolve(instance.rSocket!.requestStream(
                buildPayload(route, data),
                initialRequestN,
                {
                    onNext(payload: Payload, isComplete: boolean) {
                        responderStream.onNext(payload, isComplete)
                    },
                    onComplete() {
                        responderStream.onComplete()
                    },
                    onError(error: Error): void {
                        reject(error)
                    },
                    onExtension(): void {
                        console.log("------onExtension------")
                    },
                }))
        }
    )
}

export { requestStream }