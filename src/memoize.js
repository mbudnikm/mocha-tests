const memoize = (wrappedFn) => (arg) => wrappedFn(arg)

module.exports = {
    memoize
}