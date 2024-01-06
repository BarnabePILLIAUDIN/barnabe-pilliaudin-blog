import sanitizePost from "@/api/utils/sanitizePost"
import sanitizeUser from "@/api/utils/sanitizeUser"

const sanitizeComment = ({ user, post, ...sanitizedComment }) => ({
  user: sanitizeUser(user),
  post: sanitizePost(post),
  ...sanitizedComment,
})

export default sanitizeComment
