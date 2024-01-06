import webConfig from "@/web/webConfig"
import axios from "axios"

const request = async (url, method = "GET", data = {}) =>
  await axios[method.toLowerCase()](`${webConfig.api.url}/${url}`, data)
export default request
