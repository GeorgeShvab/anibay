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
  likes,
  dislikes,
  isDisliked,
  isLiked,
  id,
  isAuthor,
  isAuthorized,
  onDelete,
  createdAt,
}) => {
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
          <div className="flex gap-6 items-center mb-6 md:mb-8">
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
            <p className="text-neutral-200 text-sm mb-3 md:mb-5 break-all">{text}</p>
            <div className="flex items-center w-full">
              <div className="w-28 md:w-64">
                <Actions
                  onComment={() => {}}
                  isAuthorized={isAuthorized}
                  likes={likes}
                  isLiked={isLiked}
                  id={id}
                  isDisliked={isDisliked}
                  dislikes={dislikes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
