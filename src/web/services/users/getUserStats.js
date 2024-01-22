import { requestWithTokenAndNoData } from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const getStats = (token) => () => requestWithTokenAndNoData("stats", token)
const getUserStats = async (token, router) =>
  await handleExpiredSession(getStats(token), router)

export default getUserStats
