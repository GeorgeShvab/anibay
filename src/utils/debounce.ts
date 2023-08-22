function debounce(fn: (args?: any) => void, ms: number = 250) {
  let time: NodeJS.Timeout

  return function (this: any, ...args: []) {
    if (time) {
      clearTimeout(time)

      time = setTimeout(() => {
        fn.apply(this, args)
      }, ms)
    } else {
      fn.apply(this, args)
    }
  }
}

export default debounce
