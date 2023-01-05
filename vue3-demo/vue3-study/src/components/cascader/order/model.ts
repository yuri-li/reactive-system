import _earlyCourse from "@/components/cascader/order/earlyCourse.json"
import type { CascaderOption } from "element-plus"

interface EarlyCourse {
    member: Course[]
    nonMember: Course[]
}

interface Course {
    courseName: string
    /**
     * key: lesson, value: price
     */
    price: Record<string, number>
}

interface SimpleCourse {
    index: number
    courseName: string
}

interface LessonPrice {
    lesson: number //几节课
    price: number //多少钱
}

function toCascaderOption(): CascaderOption[] {
    function _convertPrices(prices: Record<string, number>): CascaderOption[] {
        return Object.keys(prices).map(x => {
            return {
                label: x, value: JSON.stringify({lesson: parseInt(x), price: prices[x]} as LessonPrice), disabled: false, leaf: true,
            } as CascaderOption
        })
    }

    function _convertCourses(courses: Course[]): CascaderOption[] {
        return courses.map((value: Course, index: number) => {
            return {
                label: value.courseName,
                value: JSON.stringify({index, courseName: value.courseName} as SimpleCourse),
                children: _convertPrices(value.price),
                disabled: false,
                leaf: false,
            } as CascaderOption
        })
    }

    function _convert(x: EarlyCourse): CascaderOption[] {
        return [{
            label: "会员", value: "member", children: _convertCourses(x.member), disabled: false, leaf: false,
        } as CascaderOption, {
            label: "非会员", value: "nonMember", children: _convertCourses(x.nonMember), disabled: false, leaf: false,
        } as CascaderOption,]
    }

    return _convert(_earlyCourse as EarlyCourse)
}

const earlyCourse = toCascaderOption()
export { earlyCourse }