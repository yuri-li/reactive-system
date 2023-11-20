import { DiffDetail } from "@/crud/model/DiffDetail"
import { OperationType } from "@/crud/model/OperationType"
import { Create } from "@/crud/components/Create"
import { Read } from "@/crud/components/Read"
import { Update } from "@/crud/components/Update"
import { Delete } from "@/crud/components/Delete"
import {
    LastSubmittedData,
    StorageType
} from "@/crud/model/cacheData/LastSubmittedData"
import { ContainsInitData } from "@/crud/model/cacheData/ContainsInitData"
import { isEmpty } from "@/crud/service/baseModel/isEmpty"
import { ThrottleConfig } from "@/crud/model/ThrottleConfig"
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
    ThrottleConfig,

    //3. 返回值
    DiffDetail,

    //4. 其他
    isEmpty,
}