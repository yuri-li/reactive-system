import {
    describe,
    test
} from "vitest"
import { TransferDto } from "@/components/transfer/model.ts"
import {
    ErrorCodeException,
    requestResponse
} from "rx-crud"

describe("测试class", () => {
    test("exception", () => {
        const exception = new ErrorCodeException("ConnectException", `RSocket connection to localhost://7001 failed`).toError()
        console.log(JSON.stringify(exception))
        console.log(exception.message)
    })
    test("json", () => {
        const dto = new TransferDto(25)
        console.log(JSON.stringify(dto))
    })
    test("fire and forget", async () => {
        await requestResponse("anonymous.cash.transfer", new TransferDto(25))
    })
})