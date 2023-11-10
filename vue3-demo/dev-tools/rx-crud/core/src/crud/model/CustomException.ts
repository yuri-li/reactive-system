import {
    BusinessException,
    ErrorCodeException
} from "@/globalException"

class CustomException {
    public static readonly Not_Supported_Map = new ErrorCodeException("Not_Supported_Map", "不支持Map类型")
    public static readonly Not_Supported_Set = new ErrorCodeException("Not_Supported_Set", "不支持Set类型")
    public static readonly Not_Supported_BigInt = new ErrorCodeException("Not_Supported_BigInt", "不支持BigInt类型")
    public static readonly Not_Supported_Symbol = new ErrorCodeException("Not_Supported_Symbol", "不支持BigInt类型")
    public static readonly Unexpected_Data_Type = new BusinessException("未知的数据类型")

    public static readonly Required_Cache_Key = new BusinessException("请设置cache key")
    public static readonly Load_Data_Exception = new BusinessException("网络异常，加载数据失败")

    public static readonly Forbidden_Empty_Form_Data = new BusinessException("新增的数据不能为空")
    public static readonly Forbidden_Unchanged_Value = new BusinessException("数据没有变化，禁止提交")
}

export { CustomException }