import request from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const updateFunction = (user, token) => async () => {
  user.isAdmin = !user.isAdmin

  return await request(`/users/${user.id}`, "PATCH", { user, token })
}
const toggleIsAdmin = async (user, token, router) =>
  await handleExpiredSession(updateFunction(user, token), router)

export default toggleIsAdmin
