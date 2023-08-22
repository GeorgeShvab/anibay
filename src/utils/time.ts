const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const getMonth = (index: number) => monthNames[index]

export const prettyTime = (hours: number, minutes: number) => {
  let mins = ''
  let hour = ''

  if (minutes < 10) {
    mins = '0' + minutes
  } else {
    mins = minutes.toString()
  }

  if (hours < 10) {
    hour = '0' + hours
  } else {
    hour = hours.toString()
  }

  return hour + ':' + mins
}
