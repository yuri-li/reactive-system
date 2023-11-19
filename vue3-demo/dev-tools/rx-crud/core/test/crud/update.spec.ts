import {
    describe,
    expect,
    test
} from "vitest"
import { DiffUpdate } from "@/crud/service/diff/DiffUpdate"
import {
    Address,
    Person
} from "~/model"

describe("update", () => {
    test.each([
        ["1001", "1002",`{"updated":"1002"}`],
        [
            new Person({id: "1001", username: "yuri"}),
            new Person({id: "1001", username: "lisa"}),
            `{"updated":{"username":"lisa"},"unchanged":{"id":"1001"}}`
        ],
        [
            new Person({id: "1001", username: "yuri"}),
            new Person({id: "1001", age: 18}),
            `{"added":{"age":18},"deleted":{"username":"yuri"},"unchanged":{"id":"1001"}}`
        ],
        [
            new Person({id: "1001", username: "yuri", address: new Address({postcode: "43A740", addressName: "灯草胡同"})}),
            new Person({id: "1001", age: 18}),
            `{"added":{"age":18},"deleted":{"username":"yuri","address":{"postcode":"43A740","addressName":"灯草胡同"}},"unchanged":{"id":"1001"}}`
        ],
        [
            new Person({id: "1001", username: "yuri", address: new Address({postcode: "43A740", addressName: "灯草胡同"})}),
            new Person({id: "1001", age: 18, address: new Address({postcode: "43A740"})}),
            `{"added":{"age":18},"deleted":{"username":"yuri","address":{"addressName":"灯草胡同"}},"unchanged":{"id":"1001","address":{"postcode":"43A740"}}}`
        ],
    ])("cache【%s】 formData 【%s】 => diff 【%s】", (cache, formData, diff) => {
        const diffUpdate = new DiffUpdate(cache, formData)
        expect(JSON.stringify(diffUpdate.detail)).toBe(diff)
    })
})