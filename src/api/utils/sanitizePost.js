import sanitizeComments from "@/api/utils/sanitizeComments"
import sanitizeUser from "./sanitizeUser"

const sanitizePost = ({ user, comments, ...sanitizedPost }) => {
  try {
    return {
      user: sanitizeUser(user),
      comments: sanitizeComments(comments),
      ...sanitizedPost,
    }
  } catch (error) {
    // If there is no comment it will raise an error as the user of the comment is undefined
    return {
      user: sanitizeUser(user),
      comments: [],
      ...sanitizedPost,
    }
  }
}

export default sanitizePost
