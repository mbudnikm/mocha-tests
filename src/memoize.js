const SEPARATOR = '_'

const stringifyArguments = (args) => JSON.stringify(args)

const memoize = (wrappedFn) => {
    const cache = {} // key: fn param, value: fn result
    return (...args) => {
      if( args.some(arg => typeof arg === 'function')){
        throw new Error('Functions are not supported as memoize parameters')
      }
      // const key = args.join(SEPARATOR)
      const key = JSON.stringify(args)
      // const key = stringifyArguments(args)
      if(!cache[key]){
        cache[key] = wrappedFn(...args)
      }
      return cache[key]
    }
  }

module.exports = {
    memoize
}