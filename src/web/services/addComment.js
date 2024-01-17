import request from "./request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const add = (postId, token, content) => async () =>
  await request(`comments`, "POST", {
    postId,
    token,
    content,
  })
const addComment = async ([postId, token, content], router) =>
  await handleExpiredSession(add(postId, token, content), router)

export default addComment
