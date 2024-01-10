import request from "./request"

const addPost = async (title, content, token) =>
  await request(`posts`, "POST", {
    title,
    content,
    token,
  })

export default addPost
