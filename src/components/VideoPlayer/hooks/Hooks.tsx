import useKeys from './useKeys'
import useSaveEpisode from './useSaveEpisode'
import useSaveProgress from './useSaveProgress'
import useStalling from './useStalling'

const Hooks = () => {
  useSaveProgress()
  useStalling()
  useKeys()
  useSaveEpisode()

  return null
}

export default Hooks
