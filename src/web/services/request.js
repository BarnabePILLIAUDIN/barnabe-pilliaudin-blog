import webConfig from "@/web/webConfig"
import axios from "axios"

const request = async (url, method = "GET", data = {}) => {
  const { token, ...cleanData } = data

  return await axios[method.toLowerCase()](
    `${webConfig.api.url}/${url}`,
    cleanData,
    {
      headers: {
        authorization: token,
      },
    },
  )
}
export default request
