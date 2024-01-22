import { requestWithTokenAndNoData } from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const deleteFunction = (id, token) => async () =>
  await requestWithTokenAndNoData(`users/${id}`, token, "delete")
const deleteUser = async (id, token, router) =>
  await handleExpiredSession(deleteFunction(id, token), router)

export default deleteUser
