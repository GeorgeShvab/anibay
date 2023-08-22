const formatPlayerTime = (time: number): string => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor((time % 3600) % 60)

  let returnTime: string = ''

  if (hours) {
    returnTime += hours + ':'
  }

  if (minutes < 10) {
    returnTime += '0'
  }

  returnTime += minutes + ':'

  if (seconds < 10) {
    returnTime += '0'
  }

  returnTime += seconds

  return returnTime
}

export default formatPlayerTime
