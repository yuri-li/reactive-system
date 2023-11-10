// noinspection SuspiciousTypeOfGuard
import { isEmpty } from "rx-crud"

function replacer(_: string, value?: never) {
    return isEmpty(value) ? undefined : value
}

const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/

function dateParser(_: string, value?: never) {
    if (!isEmpty(value) && typeof value === "string") {
        if (reISO.exec(value))
            return new Date(value)
    }
    return value
}

export {
    replacer,
    dateParser
}