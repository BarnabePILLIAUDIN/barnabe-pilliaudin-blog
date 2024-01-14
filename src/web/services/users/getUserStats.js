import { getRequest } from "@/web/services/request"
import axios from "axios"

const getUserStats = async (token) => await getRequest("stats", token)

export default getUserStats
