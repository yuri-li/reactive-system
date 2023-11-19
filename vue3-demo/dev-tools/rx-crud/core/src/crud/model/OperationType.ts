import { BusinessException } from "@/globalException"

class OperationType {
    public static readonly Create = new OperationType("Create", "新增")
    public static readonly Read = new OperationType("Read", "查询")
    // public static readonly Update = new OperationType("Update", "更新")
    public static readonly Delete = new OperationType("Delete", "删除")

    public readonly name: string
    public readonly description: string

    private constructor(_name: string, _description: string) {
        this.name = _name
        this.description = _description
    }

    static values(): OperationType[] {
        return [this.Create, this.Read, this.Delete]
    }

    static valueOf(_name: string): OperationType {
        if (_name == OperationType.Create.name) {
            return OperationType.Create
        } else if (_name == OperationType.Read.name) {
            return OperationType.Read
        } else if (_name == OperationType.Delete.name) {
            return OperationType.Delete
        }
        throw new BusinessException(`${_name}，错误的操作类型`)
    }
}

export { OperationType }