class DiffDetail<T> {
    added?: Partial<T>
    deleted?: Partial<T>
    updated?: Partial<T>
    unchanged?: Partial<T>

    public constructor(init?: Partial<DiffDetail<T>>) {
        Object.assign(this, init)
    }
}

function decodeDiffDetail<T>(detail: DiffDetail<T>): T {
    let model: T
    if (detail.unchanged) {
        // @ts-ignore
        model = detail.unchanged
    }
    if (detail.added) {
        // @ts-ignore
        model = detail.added
    }
    if (detail.updated) {
        // @ts-ignore
        model = detail.updated
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return model!!
}

export {
    DiffDetail,
    decodeDiffDetail,
}