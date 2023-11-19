import {
    describe,
    expect,
    test
} from "vitest"
import {
    Address,
    Person
} from "~/model"
import { Diff } from "@/crud/service/diff"
import { OperationType } from "@/crud/model/OperationType"

describe("create", () => {
    test.each([
        ["1001", "1001",`{"unchanged":"1001"}`],
        ["1001", "1002",`{"updated":"1002"}`],
        [
            new Person({id: "1001", username: "yuri"}),
            new Person({id: "1001", username: "lisa"}),
            `{"updated":{"id":"1001","username":"lisa"}}`
        ],
        [
            new Person({id: "1001", username: "yuri"}),
            new Person({id: "1001", age: 18}),
            `{"updated":{"id":"1001","age":18}}`
        ],
        [
            new Person({id: "1001", username: "yuri", address: new Address({postcode: "43A740", addressName: "灯草胡同"})}),
            new Person({id: "1001", age: 18}),
            `{"updated":{"id":"1001","age":18}}`
        ],
        [
            new Person({id: "1001", username: "yuri", address: new Address({postcode: "43A740", addressName: "灯草胡同"})}),
            new Person({id: "1001", age: 18, address: new Address({postcode: "43A740"})}),
            `{"updated":{"id":"1001","age":18,"address":{"postcode":"43A740"}}}`
        ],
    ])("cache【%s】 formData 【%s】 => diff 【%s】", (cache, formData, diff) => {
        const model = new Diff(cache, formData, OperationType.Create, true)
        expect(JSON.stringify(model.detail)).toBe(diff)
    })
})