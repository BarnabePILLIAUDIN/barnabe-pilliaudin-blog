import request from "./request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const addFunction = (postId, token, content) => async () =>
  await request(`comments`, "POST", {
    postId,
    token,
    content,
  })
const addComment = async ([postId, token, content], router) =>
  await handleExpiredSession(addFunction(postId, token, content), router)

export default addComment
