import request from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const updateFunction = (user, token) => async () => {
  user.isAuthor = !user.isAuthor

  return await request(`/users/${user.id}`, "PATCH", { user, token })
}
const toggleIsAuthor = async (token, router, user) =>
  await handleExpiredSession(updateFunction(user, token), router)

export default toggleIsAuthor
