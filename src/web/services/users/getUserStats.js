import { getRequest } from "@/web/services/request"

const getUserStats = async (token) => await getRequest("stats", token)

export default getUserStats
