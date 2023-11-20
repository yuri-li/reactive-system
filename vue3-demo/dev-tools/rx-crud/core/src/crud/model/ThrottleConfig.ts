class ThrottleConfig {
    delay: number
    before: () => void
    after: () => void

    constructor(_delay: number, _before: () => void, _after: () => void) {
        this.delay = _delay
        this.before = _before
        this.after = _after
    }
}

export { ThrottleConfig }