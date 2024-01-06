import sanitizeComments from "@/api/utils/sanitizeComments"
import sanitizeUser from "./sanitizeUser"

const sanitizePost = ({ user, comments, ...sanitizedPost }) => ({
  user: sanitizeUser(user),
  // Reverse the comments array to get the latest comment first
  comments: sanitizeComments(comments).reverse(),
  ...sanitizedPost,
})

export default sanitizePost
