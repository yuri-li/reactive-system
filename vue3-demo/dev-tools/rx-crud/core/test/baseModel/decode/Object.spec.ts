import {
    describe,
    expect,
    test,
} from "vitest"
import {
    Address,
    Person
} from "~/model"
import { toObject } from "~/baseModel/decode/model"

describe("对象", () => {
    test.each([
        [`{"value":[{"key":"username","value":"yuri","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}`,new Person({username: "yuri"})],
        [`{"value":[{"key":"postcode","value":"47A894","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}`,new Address({postcode: "47A894"})],
        [`{"value":[{"key":"username","value":"yuri","valueType":"String"},{"key":"address","value":[{"key":"postcode","value":"47A894","valueType":"String"}],"valueType":"Object","isAllPrimitives":true}],"valueType":"Object"}`,new Person({username: "yuri", address: new Address({postcode: "47A894"})})],
    ])("object【%s】 is %s", (json, obj) => {
        const decodeJson = JSON.stringify(toObject(json))
        const objJson = JSON.stringify(obj)
        expect(decodeJson).toBe(objJson)
    })
})