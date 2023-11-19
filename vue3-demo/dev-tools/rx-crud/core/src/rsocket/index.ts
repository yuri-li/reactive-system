import type { StreamResponse } from "@/rsocket/model/rsocketTypes"
import { requestResponse } from "@/rsocket/interaction/requestResponse"
import { requestStream } from "@/rsocket/interaction/requestStream"
import { fireAndForget } from "@/rsocket/interaction/fireAndForget"
import { RSocketConfig } from "@/rsocket/util/connector"

export {
    requestResponse,
    requestStream,
    fireAndForget,

    //服务启动时，需要把配置信息存入session中
    RSocketConfig,
}

export type {
    StreamResponse,
}