import { Source } from '@/types'

const getHighestQuality = (sources: Source[]) => {
  let defaultQuality = sources.reduce<string>((prev, curr) => {
    if (isNaN(Number(curr.quality.replace('p', '')))) return prev
    if (isNaN(Number(prev.replace('p', '')))) return curr.quality

    if (Number(curr.quality.replace('p', '')) > Number(prev.replace('p', ''))) {
      return curr.quality
    } else {
      return prev
    }
  }, 'default')

  return defaultQuality
}

export default getHighestQuality
