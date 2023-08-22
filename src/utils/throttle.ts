function throttle(
  fn: (args: any) => void,
  ms: number,
  lastExecution?: boolean
) {
  let throttled: boolean
  let savedArgs: any
  let savedThis: any

  return function (...args: [any]) {
    if (throttled) {
      savedArgs = args
      savedThis = null

      return
    }

    throttled = true

    fn.apply(null, args)

    setTimeout(() => {
      throttled = false

      if (savedArgs && lastExecution) {
        fn.apply(savedThis, savedArgs)

        throttled = true

        savedArgs = undefined
        savedThis = undefined

        setTimeout(() => {
          throttled = false
        }, ms)
      }
    }, ms)
  }
}

export default throttle
