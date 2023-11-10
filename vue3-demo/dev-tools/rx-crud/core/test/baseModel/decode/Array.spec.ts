import {
    describe,
    test,
} from "vitest"
import {
    Address,
    Person
} from "~/baseType/model"
import { toJson } from "~/baseModel/encode/model"

describe("数组", () => {
    test("数组", () => {
        expect(toJson([1, 2])).toBe(`{"value":[{"value":1,"valueType":"Int"},{"value":2,"valueType":"Int"}],"valueType":"Array","isAllPrimitives":true}`)
        expect(toJson([1, "abc"])).toBe(`{"value":[{"value":1,"valueType":"Int"},{"value":"abc","valueType":"String"}],"valueType":"Array","isAllPrimitives":true}`)
        expect(toJson([1, "abc", {}])).toBe(`{"value":[{"value":1,"valueType":"Int"},{"value":"abc","valueType":"String"}],"valueType":"Array","isAllPrimitives":true}`)
        expect(toJson(["", {}])).toBe(`{"valueType":"Empty"}`)
        expect(toJson([new Person({username: "yuri"})])).toBe(`{"value":[{"value":[{"key":"username","value":"yuri","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}],"valueType":"Array"}`)
        expect(toJson([new Address({postcode: "47A894"})])).toBe(`{"value":[{"value":[{"key":"postcode","value":"47A894","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}],"valueType":"Array"}`)
    })
})