import { getRequest } from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const getStats = (token) => () => getRequest("stats", token)
const getUserStats = async (token, router) =>
  await handleExpiredSession(getStats(token), router)

export default getUserStats
