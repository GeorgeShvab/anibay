import axios from '@/axios'
import { FC, useState, MouseEvent } from 'react'
import AuthClickProtection from '../AuthClickProtection'
import { prettyComments, prettyDislikes, prettyLikes } from '@/utils/pretty'

interface Props {
  isLiked: boolean
  isDisliked: boolean
  id: number
  likes: number
  dislikes: number
  isAuthorized: boolean
  onComment: () => void
}

interface State {
  isLiked: boolean
  isDisliked: boolean
  likes: number
  dislikes: number
}

const Actions: FC<Props> = ({ isLiked, id, isAuthorized, likes, dislikes, onComment, isDisliked }) => {
  const [state, setState] = useState<State>({
    isLiked,
    likes,
    dislikes,
    isDisliked,
  })

  const handleLike = async (e: MouseEvent) => {
    if (!isAuthorized) return
    setState((prev) => ({ ...prev, likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1, isLiked: !prev.isLiked }))

    await axios.post(`/api/comment/${id}/like`)
  }

  const handleDislike = async (e: MouseEvent) => {
    if (!isAuthorized) return
    setState((prev) => ({
      ...prev,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes + 1,
      isDisliked: !prev.isDisliked,
    }))

    await axios.post(`/api/comment/${id}/dislike`)
  }

  const handleComment = (e: MouseEvent) => {
    if (!isAuthorized) return

    onComment()
  }

  return (
    <>
      <AuthClickProtection>
        <div className="flex items-center gap-6">
          <button className="flex gap-2 items-center" onClick={handleLike} aria-label="Like comment">
            {state.isLiked ? (
              <span className="text-red">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M4 21h1V8H4a2 2 0 00-2 2v9a2 2 0 002 2zM20 8h-7l1.122-3.368A2 2 0 0012.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 00-2-2z" />
                </svg>
              </span>
            ) : (
              <span className="text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 001.873-1.298l2.757-7.351A1 1 0 0022 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0013 10h7v1.819z" />
                </svg>
              </span>
            )}
            <span className="text-white text-xs">{state.likes}</span>
          </button>
          <button className="flex gap-2 items-center" onClick={handleDislike} aria-label="Dislike comment">
            {state.isDisliked ? (
              <span className="text-red">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20 3h-1v13h1a2 2 0 002-2V5a2 2 0 00-2-2zM4 16h7l-1.122 3.368A2 2 0 0011.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 002 2z" />
                </svg>
              </span>
            ) : (
              <span className="text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20 3H6.693A2.01 2.01 0 004.82 4.298l-2.757 7.351A1 1 0 002 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 00.274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0011 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z" />
                </svg>
              </span>
            )}
            <span className="text-white text-xs">{state.dislikes}</span>
          </button>
        </div>
      </AuthClickProtection>
    </>
  )
}

export default Actions
