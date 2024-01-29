import { requestWithTokenAndNoData } from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const deleteFunction = (id, token) => async () =>
  await requestWithTokenAndNoData(`users/${id}`, token, "delete")
const deleteUser = async (user, token, router) =>
  await handleExpiredSession(deleteFunction(user.id, token), router)

export default deleteUser
