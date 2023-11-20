class ThrottleConfig {
    delay: number
    effect: () => void

    constructor(_delay: number, _effect: () => void) {
        this.delay = _delay
        this.effect = _effect
    }
}

export { ThrottleConfig }