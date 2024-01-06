import sanitizeComment from "./sanitizeComment"

const sanitizeComments = (comments) =>
  comments.map((comment) => sanitizeComment(comment))

export default sanitizeComments
