'use client'

import Comment from '@/components/Comment'
import * as types from '@/types'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import CommentEditor from './CommentEditor'
import axios from '@/axios'
import Avatar from '@/ui/Avatar'
import { useSearchParams } from 'next/navigation'
import { useQuery, useMutation } from 'react-query'

const Comments: FC = () => {
  const user = useSession()

  const episodeId = useSearchParams()?.get('episode')

  const { data, isLoading, refetch } = useQuery(
    ['comments', episodeId],
    async () => (await axios.get<types.Comment[]>(`/api/episode/${episodeId}/comments`)).data
  )

  const { mutateAsync } = useMutation(
    async (value: string) => await axios.post<types.Comment>('/api/comment', { text: value, episode: episodeId }),
    {
      onSuccess: () => {
        refetch()
      },
    }
  )

  const [commentsToShow, setCommentsToShow] = useState<number>(10)

  const handleAddComment = async (value: string) => {
    await mutateAsync(value)
  }

  return (
    <div className="flex-1 mb-6 lg:mb-0 min-h-full flex flex-col">
      <h2 className="mb-2 lg:mb-6 text-lg font-semibold md:text-2xl px-2 text-white">Comments ({data?.length || 0})</h2>
      <div className="flex gap-8 bg-dark rounded flex-1 p-2 md:p-4">
        <div className="w-full md:flex-1">
          <div>
            <CommentEditor onConfirm={handleAddComment} />
            {data?.slice(0, commentsToShow).map((item) => (
              <Comment onDelete={() => {}} key={item.id} isAuthorized={user.status === 'authenticated'} {...item} />
            ))}
            {data && data.length > commentsToShow && (
              <button
                className="rounded bg-black p-3 md:p-5 text-white w-full"
                onClick={() => setCommentsToShow((prev) => prev + 10)}
              >
                Show {data?.length - commentsToShow < 10 ? data?.length - commentsToShow : 10} more comments
              </button>
            )}
            {commentsToShow > 10 && (
              <button className="rounded bg-black p-3 md:p-5 text-white w-full" onClick={() => setCommentsToShow(10)}>
                Hide {data.length < commentsToShow ? data.length - 10 : commentsToShow - 10} comments
              </button>
            )}
            {!isLoading && data && !data.length ? (
              <div className="py-12 rounded bg-dark px-6">
                <p className="text-center text-neutral-400">
                  No comments yet. Be the first to comment on this episode.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments
