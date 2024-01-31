import handleExpiredSession from "@/web/utils/handleExpiredSession"
import { requestWithTokenAndNoData } from "../request"
const getFunction = (id, token) => async () =>
  await requestWithTokenAndNoData(`users/${id}`, token)
const getUserById = async (id, token, router) =>
  await handleExpiredSession(getFunction(id, token), router)

export default getUserById
