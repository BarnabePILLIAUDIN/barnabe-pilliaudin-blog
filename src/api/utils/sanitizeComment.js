import sanitizePost from "@/api/utils/sanitizePost"
import sanitizeUser from "@/api/utils/sanitizeUser"

const sanitizeComment = ({ user, post, ...sanitizedComment }) => {
  try {
    return {
      user: sanitizeUser(user),
      post: sanitizePost(post),
      ...sanitizedComment,
    }
  } catch (error) {
    return {
      user: sanitizeUser(user),
      post: {},
      ...sanitizedComment,
    }
  }
}

export default sanitizeComment
