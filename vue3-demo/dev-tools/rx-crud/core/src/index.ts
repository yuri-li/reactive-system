import { DiffDetail } from "@/crud/model/DiffDetail"
import { OperationType } from "@/crud/model/OperationType"
import { Create } from "@/crud/components/Create"
import { Read } from "@/crud/components/Read"
import { Update } from "@/crud/components/Update"
import { Delete } from "@/crud/components/Delete"
import type { StreamResponse } from "@/rsocket/model/rsocketTypes"
import { requestResponse } from "@/rsocket/interaction/requestResponse"
import { requestStream } from "@/rsocket/interaction/requestStream"
import { fireAndForget } from "@/rsocket/interaction/fireAndForget"
import { RSocketConfig } from "@/rsocket/util/connector"
import {
    LastSubmittedData,
    StorageType
} from "@/crud/model/cacheData/LastSubmittedData"
import { ContainsInitData } from "@/crud/model/cacheData/ContainsInitData"
import { isEmpty } from "@/crud/service/baseModel/isEmpty"
import {
    BusinessException,
    ErrorCodeException,
    Reason,
    UnknownException,
    ValidationException
} from "@/globalException"

export {
    //1. 增删改查
    Create,
    Read,
    Update,
    Delete,

    //2. 参数
    OperationType,
    LastSubmittedData,
    ContainsInitData,
    StorageType,

    //3. 返回值
    DiffDetail,

    //4. 其他
    isEmpty,

    //5. rsocket
    requestResponse,
    requestStream,
    fireAndForget,
    RSocketConfig,

    //6. global exception
    Reason,
    BusinessException,
    ErrorCodeException,
    UnknownException,
    ValidationException,
}

export type {
    StreamResponse,
}