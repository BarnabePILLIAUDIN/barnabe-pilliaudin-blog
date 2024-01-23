import request from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const updateFunction = (post, token) => async () => {
  await request(`posts/${post.id}`, "PATCH", {
    title: post.title,
    content: post.content,
    token,
  })
}
const updatePost = async (post, token, router) =>
  await handleExpiredSession(updateFunction(post, token), router)

export default updatePost
