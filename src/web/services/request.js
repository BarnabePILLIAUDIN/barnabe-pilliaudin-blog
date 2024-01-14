import webConfig from "@/web/webConfig"
import axios from "axios"

export const getRequest = async (url, token = "") =>
  await axios.get(`/api/${url}`, {
    headers: {
      authorization: token,
    },
  })
const request = async (url, method = "GET", data = {}) => {
  const { token, ...cleanData } = data

  return await axios[method.toLowerCase()](
    `${webConfig.api.url}/${url}`,
    { ...cleanData },
    {
      headers: {
        authorization: token,
      },
    },
  )
}
export default request
