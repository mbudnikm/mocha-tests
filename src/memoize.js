const memoize = (wrappedFn) => {
    const cache = {} // key: fn param, value: fn result
    return (arg) => {
        if (!cache[arg]) {
            cache[arg] = wrappedFn(arg)
        }
        return cache[arg]
    }
} 

module.exports = {
    memoize
}