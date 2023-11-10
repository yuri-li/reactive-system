import type { Ref } from "vue"

function pan(time: number) {
    return time < 10 ? `0${time}` : `${time}`
}

function formatRotate(degree: number) {
    return `rotate(${degree}deg)`
}

function format12Hours(hour: number) {
    return hour % 12 || 12
}

export interface DegreeTime {
    hour: string,
    minute: string,
    second: string,
}

export type DigitalTime = DegreeTime

export class TimeDef {
    hour: number
    minute: number
    second: number

    constructor() {
        const now = new Date()
        this.hour = now.getHours()
        this.minute = now.getMinutes()
        this.second = now.getSeconds()
    }

    toTimeDegree(): DegreeTime {
        return {
            hour: formatRotate(360 / 12 * format12Hours(this.hour)), minute: formatRotate(360 / 60 * this.minute), second: formatRotate(360 / 60 * this.second),
        } as DegreeTime
    }

    toDigitalTime(): DigitalTime {
        return {hour: pan(this.hour), minute: pan(this.minute), second: pan(this.second),}
    }
}
function reset(digitalTime: Ref<DegreeTime | undefined>, degreeTime: Ref<DegreeTime | undefined>) {
    const timeDef = new TimeDef()
    digitalTime.value = timeDef.toDigitalTime()
    degreeTime.value = timeDef.toTimeDegree()
}
export { pan, formatRotate, format12Hours, reset, }