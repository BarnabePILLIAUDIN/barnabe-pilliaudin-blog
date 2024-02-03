import handleExpiredSession from "@/web/utils/handleExpiredSession"
import { requestWithTokenAndNoData } from "@/web/services/request"

const getFunction = (token, page) => async () =>
  await requestWithTokenAndNoData(`users?page=${page}`, token)
const getUsers = async (token, router, page) =>
  await handleExpiredSession(getFunction(token, page), router)

export default getUsers
