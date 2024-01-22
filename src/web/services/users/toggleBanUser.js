import request from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const updateFunction = (user, token) => async () => {
  user.isActive = !user.isActive

  return await request(`/users/${user.id}`, "PATCH", { user, token })
}
const toggleBanUser = async (user, token, router) =>
  await handleExpiredSession(updateFunction(user, token), router)

export default toggleBanUser
