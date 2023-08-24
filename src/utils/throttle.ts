function throttle(fn: (...args: any[]) => void, ms: number = 250) {
  let throttled: boolean = false

  let savedArgs: any
  let savedThis: any

  function wrapper(this: any, ...args: any[]) {
    if (throttled) {
      savedArgs = args
      savedThis = this

      return
    }

    fn.apply(this, args)

    throttled = true

    setTimeout(() => {
      throttled = false

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)

        throttled = true
        savedArgs = undefined
        savedThis = undefined

        setTimeout(() => {
          throttled = false
        }, ms)
      }
    }, ms)
  }

  return wrapper
}

export default throttle
