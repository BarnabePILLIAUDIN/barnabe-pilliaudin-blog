import request from "./request"

const addComment = async (postId, token, content) =>
  await request(`comments`, "POST", {
    postId,
    token,
    content,
  })

export default addComment
