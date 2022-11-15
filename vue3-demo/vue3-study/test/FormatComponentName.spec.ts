import { describe, expect } from "vitest"
import { capitalize } from "vue"

function formatComponentName(path: string): string {
    const match = path.match(/([/\\](\w+))?([/\\](\w+))\.\w+$/)
    if (match) {
        if (capitalize(match[4]) === "Index") {
            return capitalize(match[2])
        } else {
            return match[4]
        }
    }
    return ""
}

describe("format Component Name", () => {
    test.each([
        ["/components/multiplicationTable/Index.vue", "MultiplicationTable"],
        ["/components/multiplicationTable/MultiplicationTable.vue", "MultiplicationTable"],
        ["/MultiplicationTable.vue", "MultiplicationTable"],
        ["D:\\Test\\index.vue", "Test"]
    ])("formatComponentName(%s) = %s", (path, expected) => {
        expect(formatComponentName(path)).toBe(expected)
    })
})