import AuthClickProtection from '@/components/AuthClickProtection'
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'

interface Props {
  onConfirm: (value: string) => void
}

const CommentEditor: FC<Props> = ({ onConfirm }) => {
  const [value, setValue] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    if (!textareaRef.current) return
    const textarea = textareaRef.current

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  const handleCancel = () => {
    setValue('')
  }

  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onConfirm(value)
    setValue('')
  }

  return (
    <form className="rounded bg-dark mb-6" onSubmit={handleConfirm}>
      <textarea
        className="text-neutral-200 resize-none w-full min-h-[100px] px-2 py-1.5 text-sm focus:outline focus:outline-red rounded block bg-black mb-3"
        placeholder="Your comment"
        name=""
        onInput={handleInput}
        value={value}
        ref={textareaRef}
      ></textarea>
      <div className="flex justify-between lg:justify-start gap-6">
        <button
          onClick={handleCancel}
          className="text-white bg-dark-light text-neutral-500 text-sm px-4 py-1.5 rounded"
          type="button"
        >
          Reset
        </button>
        <AuthClickProtection
          fallback={
            <button
              className={`text-white bg-dark-light text-neutral-500 text-sm px-4 py-1.5 rounded bg-red disabled:opacity-50`}
              disabled={!value.length}
              type="button"
            >
              Send
            </button>
          }
        >
          <button
            className={`text-white bg-dark-light text-neutral-500 text-sm px-4 py-1.5 rounded bg-red disabled:opacity-50`}
            disabled={!value.length}
            type="submit"
          >
            Send
          </button>
        </AuthClickProtection>
      </div>
    </form>
  )
}

export default CommentEditor
