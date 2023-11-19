//数字枚举
enum Color {Red, Green, Blue}

//字符串枚举
enum Direction {
    Up = "UP", Down = "DOWN", Left = "LEFT", Right = "RIGHT",
}

//复杂的Object
class Person {
    id: string | undefined
    username?: string
    age: number | undefined
    address?: Address

    public constructor(init?: Partial<Person>) {
        Object.assign(this, init)
    }
}

class Address {
    postcode?: string
    addressName?: string

    public constructor(init?: Partial<Address>) {
        Object.assign(this, init)
    }
}
export {
    Color,
    Direction,
    Person,
    Address,
}