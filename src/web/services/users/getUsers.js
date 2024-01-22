import handleExpiredSession from "@/web/utils/handleExpiredSession"
import { requestWithTokenAndNoData } from "@/web/services/request"

const getFunction = (token) => async () =>
  await requestWithTokenAndNoData("users", token)
const getUsers = async (token, router) =>
  await handleExpiredSession(getFunction(token), router)

export default getUsers
