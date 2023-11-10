class Person {
    username?: string
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

export {Person, Address,}