import { BaseType } from "@/crud/service/baseModel/model/BaseType"

//封装解析结果
class BaseModel {
    key?: string | number
    value?: string | number | boolean | null | BaseModel[]
    valueType: BaseType = BaseType.Empty
    /**
     * 数组和对象可能嵌套多层，为了提高比对效率：
     * - 解析时，判断所有子元素是否基本类型
     * - 比对时，可以直接判断
     */
    isAllPrimitives?:true

    public constructor(init?: Partial<BaseModel>) {
        Object.assign(this, init)
    }
}

export { BaseModel }