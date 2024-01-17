import request from "../request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const add = (title, content, token) => async () =>
  await request(`posts`, "POST", {
    title,
    content,
    token,
  })
const addPost = async ([title, content, token], router) =>
  await handleExpiredSession(add(title, content, token), router)

export default addPost
