import { requestWithTokenAndNoData } from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const deleteFunction = (postId, token) => async () => {
  await requestWithTokenAndNoData(`posts/${postId}`, token, "DELETE")
}
const deletePost = async (postId, token, router) =>
  await handleExpiredSession(deleteFunction(postId, token), router)

export default deletePost
