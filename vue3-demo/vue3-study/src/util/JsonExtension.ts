// noinspection SuspiciousTypeOfGuard

function replacer(key: string, value?: never){
    return isEmpty(value)? undefined : value
}
function isEmpty(value?: never){
    return  value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && (value as string).trim().length === 0)
}
export { replacer }