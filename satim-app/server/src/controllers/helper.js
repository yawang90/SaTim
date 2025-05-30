export function stringifyBigInts(obj) {
    return JSON.parse(
        JSON.stringify(obj, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    );
}
