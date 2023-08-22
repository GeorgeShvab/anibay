import useKeys from './useKeys'
import useSaveProgress from './useSaveProgress'
import useStalling from './useStalling'

const Hooks = () => {
  useSaveProgress()
  useStalling()
  useKeys()

  return null
}

export default Hooks
