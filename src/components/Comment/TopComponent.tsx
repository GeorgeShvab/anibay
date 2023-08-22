import * as types from '@/types'
import { FC, useState, MouseEvent } from 'react'
import Avatar from '@/ui/Avatar'
import Actions from './Actions'
import Dropdown from './Dropdown'
import CommentEditor from './CommentEditor'
import { getMonth, prettyTime } from '@/utils/time'
import axios from '@/axios'
import { prettyReplies } from '@/utils/pretty'

interface Props extends types.Comment {
  isAuthorized: boolean
  onDelete: (id: number) => void
}

const Comment: FC<Props> = ({
  text,
  user,
  parentId,
  comments,
  likes,
  isLiked,
  id,
  isAuthor,
  isAuthorized,
  onDelete,
  createdAt,
  updatedAt,
  episodeId,
  dislikes,
  isDisliked,
}) => {
  const [isCommentEditorOpened, setIsCommentEditorOpened] = useState<boolean>(false)

  const [commentsCount, setCommentsCount] = useState<number>(comments)

  const [childrenState, setChildrenState] = useState<{ isChildrenOpened: boolean; children: types.Comment[] }>({
    isChildrenOpened: false,
    children: [],
  })

  const handleOpenChildren = async (e: MouseEvent) => {
    if (childrenState.isChildrenOpened) {
      setChildrenState((prev) => ({ ...prev, isChildrenOpened: false }))
    } else if (!childrenState.children.length) {
      const { data } = await axios.get<types.Comment[]>(`/api/comment/${id}/replies`)

      setChildrenState({ children: data, isChildrenOpened: true })
    } else {
      setChildrenState((prev) => ({ ...prev, isChildrenOpened: true }))
    }
  }

  const handleDeleteChildren = (id: number) => {
    setChildrenState((prev) => ({ ...prev, children: prev.children.filter((item) => item.id !== id) }))

    setCommentsCount((prev) => prev - 1)
  }

  const handleAddComment = async (value: string) => {
    const { data } = await axios.post<types.Comment>('/api/comment', { text: value, parent: id, episode: episodeId })

    setChildrenState((prev) => ({ isChildrenOpened: true, children: [data, ...prev.children] }))

    setIsCommentEditorOpened(false)

    setCommentsCount((prev) => prev + 1)
  }

  const creationDate = new Date(createdAt)

  return (
    <div className={`mb-2 md:mb-3 last:mb-0 comment ${parentId ? 'pl-3 md:pl-6' : ''}`}>
      <div className="rounded bg-black p-3 md:p-4 relative">
        {parentId && (
          <span className="absolute vertical-path top-[-8px] md:top-[-12px] block left-[-6px] md:left-[-12px] w-px h-[calc(100%+8px)] md:h-[calc(100%+12px)] bg-red"></span>
        )}

        <div className="relative">
          {parentId && (
            <span className="absolute top-1/2 transform-y-[-50%] left-[-18px] md:left-[-28px] w-1.5 md:w-3 h-px bg-red"></span>
          )}
          <Dropdown onDelete={() => onDelete(id)} id={id} isAuthor={isAuthor} />
          <div className="flex gap-6 items-center mb-6">
            <div>
              <Avatar src={user.avatar} className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white text-sm">{user.name}</h4>
              <div className="text-neutral-400 text-xs flex gap-2">
                <p>@{user.username}</p> &bull;
                <p>{`${prettyTime(creationDate.getHours(), creationDate.getMinutes())}`}</p>
                <p>{`${creationDate.getDate()} ${getMonth(creationDate.getMonth())} ${creationDate.getFullYear()}`}</p>
              </div>
            </div>
          </div>
          <div className="px-1">
            <p className="text-neutral-200 text-sm mb-3 break-all">{text}</p>
            <div className="flex items-center w-full">
              <div className="w-28 md:w-64">
                <Actions
                  onComment={() => setIsCommentEditorOpened(true)}
                  isAuthorized={isAuthorized}
                  likes={likes}
                  isLiked={isLiked}
                  id={id}
                  dislikes={dislikes}
                  isDisliked={isDisliked}
                />
              </div>
              {!!commentsCount && (
                <button className="text-xs text-left text-white flex-1" onClick={handleOpenChildren}>
                  {childrenState.isChildrenOpened
                    ? 'Hide replies'
                    : `Show ${commentsCount} ${prettyReplies(commentsCount)}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCommentEditorOpened && (
        <CommentEditor onClose={() => setIsCommentEditorOpened(false)} onConfirm={handleAddComment} />
      )}
      {childrenState.isChildrenOpened && (
        <div className="mt-2 md:mt-3">
          {childrenState.children.map((item) => (
            <Comment onDelete={handleDeleteChildren} key={item.id} isAuthorized={isAuthorized} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
