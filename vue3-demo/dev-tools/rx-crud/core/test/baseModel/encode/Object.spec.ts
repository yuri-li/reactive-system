import {
    describe,
    expect,
    test,
} from "vitest"
import {
    Address,
    Person
} from "~/baseType/model"
import { toJson } from "~/baseModel/encode/model"

describe("对象", () => {
    test.each([
        [new Person({username: "yuri"}), `{"value":[{"key":"username","value":"yuri","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}`],
        [new Address({postcode: "47A894"}), `{"value":[{"key":"postcode","value":"47A894","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}`],
        [new Person({username: "yuri", address: new Address({postcode: "47A894"})}), `{"value":[{"key":"username","value":"yuri","valueType":"String"},{"key":"address","value":[{"key":"postcode","value":"47A894","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}],"valueType":"Object"}`],
    ])("object【%s】 is %s", (value, json) => {
        expect(toJson(value)).toBe(json)
    })
})