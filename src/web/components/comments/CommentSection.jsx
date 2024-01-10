import CommentCard from "@/web/components/comments/CommentCard"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"
import { useCallback, useState } from "react"
import AddCommentForm from "./AddCommentForm"

const CommentSection = ({ comments, postId }) => {
  const [maxComments, setMaxComments] = useState(5)
  const seeMoreComments = useCallback(() => {
    setMaxComments(maxComments + 5)
  })

  return (
    <section className="mt-5">
      <h3 className=" font-medium text-3xl">Comments</h3>
      <div className="flex items-center gap-2">
        <h4 className="text-md font-medium">{comments.length} </h4>
        <ChatBubbleBottomCenterTextIcon width={20} height={20} />
      </div>
      <AddCommentForm postId={postId} />
      {comments
        .slice(
          maxComments < comments.length - 1 ? comments.length - maxComments : 0,
        )
        .map((comment) => (
          <CommentCard key={`${comment.id}`} comment={comment} />
        ))}
      {maxComments < comments.length && (
        <button className="underline" onClick={seeMoreComments}>
          See more comments
        </button>
      )}
    </section>
  )
}
export default CommentSection
