const SEPARATOR = '_'

const memoize = (wrappedFn) => {
    const cache = {} // key: fn param, value: fn result
    return (...args) => {
        const key = args.join(SEPARATOR)
        if (!cache[key]) {
            cache[key] = wrappedFn(...args)
        }
        return cache[key]
    }
} 

module.exports = {
    memoize
}