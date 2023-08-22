import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'

interface Props {
  onClose: () => void
  onConfirm: (value: string) => void
}

const CommentEditor: FC<Props> = ({ onClose, onConfirm }) => {
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

  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onConfirm(value)
    setValue('')
  }

  const handleCancel = () => {
    setValue('')
    onClose()
  }

  return (
    <form className="pl-3 md:pl-6 mt-2 md:mt-3 relative comment-editor" onSubmit={handleConfirm}>
      <div className="rounded bg-dark p-2 md:p-3">
        <span className="absolute top-1/2 transform-y-[-50%] left-[6px] md:left-[12px] w-1.5 md:w-3 h-px bg-red"></span>
        <span className="absolute vertical-path top-[-8px] md:top-[-12px] block left-[6px] md:left-[12px] w-px h-[calc(100%+8px)] md:h-[calc(100%+12px)] bg-red"></span>
        <textarea
          className="text-neutral-200 resize-none w-full px-2 py-1.5 text-sm focus:outline focus:outline-red rounded block bg-black mb-4"
          placeholder="Your comment"
          name=""
          onInput={handleInput}
          value={value}
          ref={textareaRef}
          autoFocus
        ></textarea>
        <div className="flex justify-start gap-6">
          <button
            onClick={handleCancel}
            className="text-white bg-dark-light text-neutral-500 text-sm px-4 py-1.5 rounded"
            type="button"
          >
            Cancel
          </button>
          <button
            className={`text-white bg-dark-light text-neutral-500 text-sm px-4 py-1.5 rounded bg-red disabled:opacity-50`}
            disabled={!value.length}
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  )
}

export default CommentEditor
